from typing import Literal
from .career_dna_questionnaire_schema import (
    CLASS10_DOMAINS,
    DOMAIN_CODE_MAP,
    CODE_TO_DOMAIN_MAP,
    Question,
    QuestionOption,
    AnswerRecord,
    QuestionnaireSession,
)
from .career_dna_question_bank import QuestionBank

# Configurable constants specified in requirements
MIN_VISIBLE_QUESTIONS: int = 13
MAX_VISIBLE_QUESTIONS: int = 17
NARROWING_GAP_THRESHOLD: float = 2.0
PHASE1_5_TIE_MARGIN_PCT: float = 0.18
HIDDEN_VERIFICATION_CONFIDENCE_THRESHOLD: float = 0.90
HIDDEN_VERIFICATION_MAX_DOMAINS_AUDITED: int = 2


def count_visible_questions(session: QuestionnaireSession) -> int:
    """Returns number of visible (non-hidden) questions answered so far."""
    return sum(1 for a in session.answer_log if a.tier != "hidden_verification")


def get_ranked_domains(session: QuestionnaireSession) -> list[str]:
    """Returns domain names sorted by domain_scores descending."""
    return sorted(CLASS10_DOMAINS, key=lambda d: session.domain_scores.get(d, 0.0), reverse=True)


def build_contradiction_checks(
    session: QuestionnaireSession,
    bank: QuestionBank,
    stated_career_goal: str | None = None
) -> list[Question]:
    """
    Builds visible Phase 3 contradiction check questions based on:
    1. Confidence gap: High domain score + explicit low self-rated confidence in u5.
    2. Stated goal conflict: Stated aspiration vs low domain score.
    3. Near-tie: Close gap between top-2 contenders after narrowing.
    4. Flat profile: No domain meaningfully ahead.
    """
    checks: list[Question] = []
    ranked = get_ranked_domains(session)
    top1 = ranked[0]
    top2 = ranked[1]
    top3 = ranked[2]
    scores = session.domain_scores
    answered_ids = set(session.answered_question_ids)

    # 1. Confidence gap check
    u5_ans = next((a for a in session.answer_log if a.question_id == "u5"), None)
    if u5_ans:
        # Check if top1 has significant score (>= 2.5) but u5 had LOW_CONFIDENCE_SIGNAL or picked another domain
        top1_code = CODE_TO_DOMAIN_MAP.get(top1, top1[:2])
        u5_opt = u5_ans.option_id
        # u5a: Math, u5b: LS, u5c: HU, u5d: None
        opt_matches_top = (
            (top1 == "MATH_LOGICAL" and u5_opt == "u5a") or
            (top1 == "LIFE_SCIENCES_CARE" and u5_opt == "u5b") or
            (top1 == "HUMANITIES_SOCIAL" and u5_opt == "u5c")
        )
        if scores.get(top1, 0.0) >= 2.2 and not opt_matches_top:
            # Check if narrowing reinforcement was not overwhelming
            narrowing_top_wins = sum(
                1 for a in session.answer_log
                if a.tier == "narrowing" and a.domain_weights_applied.get(top1, 0.0) > 0.5
            )
            if narrowing_top_wins < 4:
                q_conf = bank.build_contradiction_question("confidence_gap", top1)
                if q_conf and q_conf.question_id not in answered_ids:
                    checks.append(q_conf)

    # 2. Stated goal conflict
    goal_text = stated_career_goal or ""
    if not goal_text:
        for a in session.answer_log:
            if "goal" in str(a.prompt or "").lower() or "career" in str(a.prompt or "").lower():
                goal_text = a.selected_label or ""
                break
    
    if goal_text:
        gt = goal_text.lower()
        if any(w in gt for w in ["doctor", "medicine", "mbbs", "healthcare", "surgeon", "clinic"]):
            if scores.get("LIFE_SCIENCES_CARE", 0.0) < 2.0 or ranked.index("LIFE_SCIENCES_CARE") >= 2:
                q_med = Question(
                    question_id="v_goal_med_mismatch",
                    stage="class10",
                    tier="verification",
                    prompt="You mentioned an interest in healthcare/medicine, but your responses showed stronger interest in other areas. Is your curiosity more in the daily reality of medical work, or the appeal of the profession/outcome?",
                    options=[
                        QuestionOption(option_id="a", label="I'm genuinely drawn to medical & biological study daily", domain_weights={"LIFE_SCIENCES_CARE": 0.8}),
                        QuestionOption(option_id="b", label="I like the prestige and career outcome more than daily biology study", domain_weights={}),
                    ],
                    contradiction_check_for="LIFE_SCIENCES_CARE",
                )
                if q_med.question_id not in answered_ids:
                    checks.append(q_med)

    # 3. Flat profile check
    if scores[top1] < 2.2 or (scores[top1] - scores[top3]) < 0.9:
        q_flat = bank.build_contradiction_question("flat_profile")
        if q_flat and q_flat.question_id not in answered_ids:
            checks.append(q_flat)

    # 4. Near-tie check
    if abs(scores[top1] - scores[top2]) <= 1.2:
        q_tie = bank.build_visible_tiebreaker(top1, top2)
        if q_tie and q_tie.question_id not in answered_ids:
            checks.append(q_tie)

    return checks


def select_next_batch(session: QuestionnaireSession, bank: QuestionBank) -> list[Question]:
    """
    Pure selector function implementing the multi-tiered state machine:
    - universal
    - narrowing
    - cross_check
    - verification (Phase 3 visible)
    - hidden_verification (Phase 4 invisible)
    - complete
    """
    visible_count = count_visible_questions(session)

    # ----------------------------------------------------
    # TIER: universal (Phase 1)
    # ----------------------------------------------------
    if session.tier == "universal":
        univ_qs = bank.get_universal_questions()
        for q in univ_qs:
            if q.question_id not in session.answered_question_ids:
                return [q]

        # All 5 universal questions are answered.
        # Evaluate Phase 1.5 tiebreaker condition
        ranked = get_ranked_domains(session)
        s1 = session.domain_scores[ranked[0]]
        s2 = session.domain_scores[ranked[1]]
        s3 = session.domain_scores[ranked[2]]

        gap_pct = (s2 - s3) / s2 if s2 > 0 else 1.0
        # If domains #2 and #3 are within 15-20% and both close to #1 (s2 >= 0.5 * s1)
        if not session.phase1_5_tiebreaker_asked and gap_pct <= PHASE1_5_TIE_MARGIN_PCT and s2 >= (0.5 * s1) and s3 > 0:
            tb_q = bank.build_phase1_5_tiebreaker(ranked[1], ranked[2])
            if tb_q.question_id not in session.answered_question_ids:
                return [tb_q]

        # Transition to narrowing tier
        session.tier = "narrowing"
        ranked = get_ranked_domains(session)
        session.initial_top_domain = ranked[0]
        session.current_pair = (ranked[0], ranked[1])
        # Fall through to narrowing tier

    # ----------------------------------------------------
    # TIER: narrowing (Phase 2)
    # ----------------------------------------------------
    if session.tier == "narrowing":
        # Check hard cap for visible questions
        if visible_count >= MAX_VISIBLE_QUESTIONS:
            session.tier = "hidden_verification"
        else:
            if not session.current_pair:
                ranked = get_ranked_domains(session)
                session.current_pair = (ranked[0], ranked[1])

            dom_a, dom_b = session.current_pair
            pair_qs = bank.get_pair_questions(dom_a, dom_b)
            unanswered_pair_qs = [q for q in pair_qs if q.question_id not in session.answered_question_ids]

            # Information-gain heuristic ranking
            score_a = session.domain_scores.get(dom_a, 0.0)
            score_b = session.domain_scores.get(dom_b, 0.0)
            pair_gap = abs(score_a - score_b)

            # Check if pair resolved or capped
            pair_answered_count = sum(
                1 for a in session.answer_log
                if a.tier == "narrowing" and a.question_id in [q.question_id for q in pair_qs]
            )

            need_repivot = (
                pair_gap >= NARROWING_GAP_THRESHOLD
                and pair_answered_count >= 3
                and session.narrowing_count < 7
            )

            if need_repivot or not unanswered_pair_qs:
                # Find dominant domain in current pair
                dom_leader = dom_a if score_a >= score_b else dom_b
                ranked_all = get_ranked_domains(session)
                # Find next highest domain that is not already resolved with dom_leader
                next_dom = None
                for d in ranked_all:
                    if d != dom_leader:
                        cand_pair = (dom_leader, d) if dom_leader < d else (d, dom_leader)
                        if cand_pair not in session.narrowing_pair_history and cand_pair != session.current_pair:
                            next_dom = d
                            break

                if next_dom and session.narrowing_count < 7:
                    # Re-pivot to new pair
                    old_pair = session.current_pair
                    session.narrowing_pair_history.append(old_pair)
                    session.current_pair = (dom_leader, next_dom)
                    dom_a, dom_b = session.current_pair
                    pair_qs = bank.get_pair_questions(dom_a, dom_b)
                    unanswered_pair_qs = [q for q in pair_qs if q.question_id not in session.answered_question_ids]

            # If still have narrowing questions and haven't exceeded cap (7-8 questions)
            if unanswered_pair_qs and session.narrowing_count < 7:
                # Heuristic: sort candidate questions to test the lagging domain first if gap is widening
                def info_gain_key(q: Question) -> float:
                    # Give higher priority to questions that offer balanced weight or test the follower
                    lagging = dom_b if score_a >= score_b else dom_a
                    has_lagging = any(opt.domain_weights.get(lagging, 0.0) > 0.5 for opt in q.options)
                    return 0.0 if has_lagging else 1.0

                unanswered_pair_qs.sort(key=info_gain_key)
                return [unanswered_pair_qs[0]]

            # Narrowing exhausted or capped! Advance to cross_check
            session.tier = "cross_check"
            # Fall through to cross_check

    # ----------------------------------------------------
    # TIER: cross_check
    # ----------------------------------------------------
    if session.tier == "cross_check":
        init_top = session.initial_top_domain or get_ranked_domains(session)[0]
        cc_q = bank.get_cross_check(init_top)
        if cc_q and cc_q.question_id not in session.answered_question_ids:
            return [cc_q]

        session.cross_check_done = True
        session.tier = "verification"
        # Fall through to verification

    # ----------------------------------------------------
    # TIER: verification (Phase 3 visible)
    # ----------------------------------------------------
    if session.tier == "verification":
        # Check hard cap for visible questions
        if visible_count >= MAX_VISIBLE_QUESTIONS:
            session.tier = "hidden_verification"
        else:
            # Check if contradiction checks or tiebreaker are needed
            # We allow up to 2 verification questions, and ensure at least MIN_VISIBLE_QUESTIONS (13)
            # are answered before exiting visible phase.
            can_ask_more = session.verification_count < 2 or visible_count < MIN_VISIBLE_QUESTIONS
            if can_ask_more:
                c_checks = build_contradiction_checks(session, bank)
                for q in c_checks:
                    if q.question_id not in session.answered_question_ids:
                        return [q]

                # If no pattern fired or exhausted, ask visible tiebreaker between top 2
                ranked = get_ranked_domains(session)
                tb_q = bank.build_visible_tiebreaker(ranked[0], ranked[1])
                if tb_q.question_id not in session.answered_question_ids:
                    return [tb_q]

            # Verification complete
            session.tier = "hidden_verification"
            # Fall through to hidden_verification

    # ----------------------------------------------------
    # TIER: hidden_verification (Phase 4 silent)
    # ----------------------------------------------------
    if session.tier == "hidden_verification":
        # Find eligible domains for audit:
        # Domains with 2+ independent answers where domain_weights_applied[domain] / max_possible_weight >= 0.90
        if not session.hidden_audit_domains and session.hidden_audit_index == 0:
            qualifying_counts: dict[str, int] = {d: 0 for d in CLASS10_DOMAINS}
            for a in session.answer_log:
                if a.max_possible_weight > 0:
                    for d, w in a.domain_weights_applied.items():
                        if (w / a.max_possible_weight) >= HIDDEN_VERIFICATION_CONFIDENCE_THRESHOLD:
                            qualifying_counts[d] = qualifying_counts.get(d, 0) + 1

            ranked_all = get_ranked_domains(session)
            eligible = [d for d in ranked_all if qualifying_counts.get(d, 0) >= 2]
            session.hidden_audit_domains = eligible[:HIDDEN_VERIFICATION_MAX_DOMAINS_AUDITED]

        if session.hidden_audit_index < len(session.hidden_audit_domains):
            audit_dom = session.hidden_audit_domains[session.hidden_audit_index]
            ranked = get_ranked_domains(session)
            opp_dom = ranked[1] if ranked[0] == audit_dom else ranked[0]

            step = session.hidden_check_step
            q_hid = bank.build_hidden_commitment_question(audit_dom, opp_dom, step=step)
            if q_hid.question_id not in session.answered_question_ids:
                return [q_hid]

        # All hidden verification resolved
        session.tier = "complete"

    return []


def select_next_question(session: QuestionnaireSession, bank: QuestionBank) -> Question | None:
    """Returns the next single Question, or None if complete."""
    batch = select_next_batch(session, bank)
    return batch[0] if batch else None


def record_answer(
    session: QuestionnaireSession,
    question: Question,
    option_id: str,
    bank: QuestionBank,
) -> QuestionnaireSession:
    """
    Applies the chosen option to the session:
    - calculates confidence ratio
    - updates domain scores
    - transitions tiers if appropriate
    - executes hidden verification audit logic
    """
    # Find matching option
    chosen_opt = next((o for o in question.options if o.option_id == option_id), None)
    if not chosen_opt:
        raise ValueError(f"Option '{option_id}' not found in question '{question.question_id}'.")

    # Calculate max possible single-domain weight among options
    max_weight = 0.0
    for opt in question.options:
        for w in opt.domain_weights.values():
            if w > max_weight:
                max_weight = w
    if max_weight <= 0.0:
        max_weight = 1.0  # default to avoid div by zero

    # Record Answer
    ans_record = AnswerRecord(
        question_id=question.question_id,
        option_id=option_id,
        domain_weights_applied=chosen_opt.domain_weights,
        max_possible_weight=max_weight,
        selected_label=chosen_opt.label,
        prompt=question.prompt,
        tier=question.tier,
    )
    session.answer_log.append(ans_record)
    session.answered_question_ids.append(question.question_id)

    # Apply domain weights to domain_scores (except for hidden verification, which doesn't alter domain scores)
    if question.tier != "hidden_verification":
        for d, weight in chosen_opt.domain_weights.items():
            session.domain_scores[d] = round(session.domain_scores.get(d, 0.0) + weight, 3)

    # Accumulate flavor tags if any
    for ft in question.flavor_tags:
        if ft not in session.flavor_tags:
            session.flavor_tags.append(ft)

    # Update tier-specific counters
    if question.tier == "narrowing":
        session.narrowing_count += 1
    elif question.tier == "verification":
        session.verification_count += 1
    elif question.flavor_tags and "phase1_5_tiebreaker" in question.flavor_tags:
        session.phase1_5_tiebreaker_asked = True

    # ----------------------------------------------------
    # Hidden verification processing
    # ----------------------------------------------------
    if question.tier == "hidden_verification":
        session.hidden_verification_count += 1
        audit_dom = question.contradiction_check_for or session.hidden_audit_domains[session.hidden_audit_index]
        ranked = get_ranked_domains(session)
        opp_dom = ranked[1] if ranked[0] == audit_dom else ranked[0]

        # Calculate confidence for the chosen option
        applied_w = chosen_opt.domain_weights.get(opp_dom, 0.0)
        opp_conf = applied_w / max_weight if max_weight > 0 else 0.0
        audit_w = chosen_opt.domain_weights.get(audit_dom, 0.0)
        audit_conf = audit_w / max_weight if max_weight > 0 else 0.0

        qualifying_refs = [
            a.question_id for a in session.answer_log
            if a.tier != "hidden_verification" and a.max_possible_weight > 0
            and (a.domain_weights_applied.get(audit_dom, 0.0) / a.max_possible_weight) >= HIDDEN_VERIFICATION_CONFIDENCE_THRESHOLD
        ]

        if session.hidden_check_step == 1:
            # Check if clean flip to opposing domain >= threshold
            if opp_conf >= HIDDEN_VERIFICATION_CONFIDENCE_THRESHOLD:
                # Step 1 flipped! Prepare for corroborating check step 2
                session.hidden_pending_contradiction = {
                    "audited_domain": audit_dom,
                    "opposing_domain": opp_dom,
                    "original_qualifying_answers": qualifying_refs,
                    "check_1": {
                        "question_id": question.question_id,
                        "selected_option": option_id,
                        "opposing_confidence": opp_conf,
                    },
                }
                session.hidden_check_step = 2
            else:
                # Did not flip on check 1
                verdict = "confirmed" if audit_conf >= HIDDEN_VERIFICATION_CONFIDENCE_THRESHOLD else "inconclusive"
                if verdict == "confirmed" and audit_dom not in session.cross_verified_domains:
                    session.cross_verified_domains.append(audit_dom)

                session.verification_log.append({
                    "audited_domain": audit_dom,
                    "opposing_domain": opp_dom,
                    "original_answers_tested": qualifying_refs,
                    "new_question_id": question.question_id,
                    "selected_option": option_id,
                    "audited_confidence": audit_conf,
                    "opposing_confidence": opp_conf,
                    "verdict": verdict,
                })
                # Move to next audit domain
                session.hidden_audit_index += 1
                session.hidden_check_step = 1

        elif session.hidden_check_step == 2:
            # Corroborating check
            if opp_conf >= HIDDEN_VERIFICATION_CONFIDENCE_THRESHOLD:
                # Dual corroboration confirmed! Flag contradiction
                verdict = "contradicted"
                label_audit = audit_dom.replace("_", " ").title()
                label_opp = opp_dom.replace("_", " ").title()
                session.flagged_contradiction = {
                    "audited_domain": audit_dom,
                    "opposing_domain": opp_dom,
                    "original_qualifying_answers": session.hidden_pending_contradiction.get("original_qualifying_answers", []),
                    "check_1": session.hidden_pending_contradiction.get("check_1", {}),
                    "check_2": {
                        "question_id": question.question_id,
                        "selected_option": option_id,
                        "opposing_confidence": opp_conf,
                    },
                    "verdict": verdict,
                    "explanation": (
                        f"Your earlier exploratory answers consistently pointed toward {label_audit}, "
                        f"but in direct forced-choice commitments between real-world options, you decisively selected "
                        f"{label_opp} instead. This is completely natural at Class 10 and reflects two genuine, competing inclinations."
                    ),
                    "suggested_next_step": (
                        f"Take a 5-minute head-to-head exploration challenge between {label_audit} and {label_opp} "
                        f"or complete a targeted retake to clarify your priority."
                    ),
                }
                session.profile_status = "unresolved_contradiction"
            else:
                verdict = "inconclusive"

            session.verification_log.append({
                "audited_domain": audit_dom,
                "opposing_domain": opp_dom,
                "original_answers_tested": qualifying_refs,
                "check_1": session.hidden_pending_contradiction.get("check_1", {}),
                "check_2": {
                    "question_id": question.question_id,
                    "selected_option": option_id,
                    "opposing_confidence": opp_conf,
                },
                "verdict": verdict,
            })
            session.hidden_pending_contradiction = None
            session.hidden_audit_index += 1
            session.hidden_check_step = 1

    return session
