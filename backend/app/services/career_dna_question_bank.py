import json
import os
from pathlib import Path
from typing import Any
from .career_dna_questionnaire_schema import (
    CLASS10_DOMAINS,
    DOMAIN_CODE_MAP,
    CODE_TO_DOMAIN_MAP,
    Question,
    QuestionOption,
)

BASE_DIR = Path(__file__).resolve().parent.parent / "question_bank" / "class10"


def _normalize_pair(d1: str, d2: str) -> tuple[str, str]:
    """Returns canonical sorted tuple of domain names."""
    dom1 = DOMAIN_CODE_MAP.get(d1.upper(), d1.upper())
    dom2 = DOMAIN_CODE_MAP.get(d2.upper(), d2.upper())
    return (dom1, dom2) if dom1 < dom2 else (dom2, dom1)


def _pair_to_code_str(d1: str, d2: str) -> str:
    """Returns e.g. ML_LS from two domain strings."""
    c1 = CODE_TO_DOMAIN_MAP.get(d1, d1[:2])
    c2 = CODE_TO_DOMAIN_MAP.get(d2, d2[:2])
    pair = [c1, c2]
    # Check if this matches one of the 15 standard pair codes
    std_codes = [
        "ML_LS", "ML_BC", "ML_PA", "LS_PA", "BC_HU",
        "CR_HU", "ML_CR", "BC_CR", "ML_HU", "LS_HU",
        "LS_BC", "HU_PA", "BC_PA", "CR_PA", "LS_CR"
    ]
    cand1 = f"{pair[0]}_{pair[1]}"
    cand2 = f"{pair[1]}_{pair[0]}"
    if cand1 in std_codes:
        return cand1
    if cand2 in std_codes:
        return cand2
    return cand1


class QuestionBank:
    def __init__(self, data_dir: Path | str | None = None):
        self.data_dir = Path(data_dir) if data_dir else BASE_DIR
        self.universal_questions: list[Question] = []
        self.pairs_map: dict[tuple[str, str], list[Question]] = {}
        self.cross_checks: dict[str, Question] = {}
        self.visible_tiebreaker_template: dict[str, Any] = {}
        self.phase1_5_template: dict[str, Any] = {}
        self.hidden_commitment_template: dict[str, Any] = {}
        self.contradiction_templates: dict[str, Any] = {}
        self.config: dict[str, Any] = {
            "MIN_VISIBLE_QUESTIONS": 13,
            "MAX_VISIBLE_QUESTIONS": 17,
            "NARROWING_GAP_THRESHOLD": 2.0,
            "PHASE1_5_TIE_MARGIN_PCT": 0.18,
            "HIDDEN_VERIFICATION_CONFIDENCE_THRESHOLD": 0.90,
            "HIDDEN_VERIFICATION_MAX_DOMAINS_AUDITED": 2,
        }
        self.load()

    def load(self):
        # 1. Load universal questions
        univ_file = self.data_dir / "universal.json"
        if univ_file.exists():
            with open(univ_file, "r", encoding="utf-8") as f:
                raw_u = json.load(f)
                items = raw_u.get("universal", [])
                for it in items:
                    it["stage"] = "class10"
                    it["tier"] = "universal"
                    opts = [QuestionOption(**o) for o in it.get("options", [])]
                    q = Question(
                        question_id=it["question_id"],
                        stage="class10",
                        tier="universal",
                        domain_pair=None,
                        prompt=it["prompt"],
                        options=opts,
                        flavor_tags=it.get("flavor_tags", []),
                    )
                    self.universal_questions.append(q)

        # 2. Load pairs
        pairs_dir = self.data_dir / "pairs"
        if pairs_dir.exists():
            for pf in pairs_dir.glob("*.json"):
                pair_name = pf.stem.upper()  # e.g. ML_LS
                parts = pair_name.split("_")
                if len(parts) == 2:
                    d1 = DOMAIN_CODE_MAP.get(parts[0], parts[0])
                    d2 = DOMAIN_CODE_MAP.get(parts[1], parts[1])
                    canon_key = _normalize_pair(d1, d2)
                    with open(pf, "r", encoding="utf-8") as f:
                        raw_p = json.load(f)
                        q_list = []
                        for it in raw_p.get("questions", []):
                            opts = [QuestionOption(**o) for o in it.get("options", [])]
                            pair_tuple = (it["domain_pair"][0], it["domain_pair"][1])
                            q = Question(
                                question_id=it["question_id"],
                                stage="class10",
                                tier="narrowing",
                                domain_pair=pair_tuple,
                                prompt=it["prompt"],
                                options=opts,
                                flavor_tags=it.get("flavor_tags", []),
                            )
                            q_list.append(q)
                        self.pairs_map[canon_key] = q_list

        # 3. Load templates and config
        tpl_file = self.data_dir / "templates.json"
        if tpl_file.exists():
            with open(tpl_file, "r", encoding="utf-8") as f:
                tpls = json.load(f)
                self.visible_tiebreaker_template = tpls.get("visible_verification_tiebreaker_template", {})
                self.phase1_5_template = tpls.get("phase1_5_tiebreaker_template", {})
                self.hidden_commitment_template = tpls.get("hidden_verification_commitment_questions", {})
                self.contradiction_templates = tpls.get("contradiction_pattern_templates", {})
                if "config" in tpls:
                    self.config.update(tpls["config"])

                # Cross-checks by domain
                cc_raw = tpls.get("cross_check_template", {}).get("by_domain", {})
                for dom, it in cc_raw.items():
                    opts = [QuestionOption(**o) for o in it.get("options", [])]
                    q = Question(
                        question_id=it["question_id"],
                        stage="class10",
                        tier="cross_check",
                        domain_pair=None,
                        prompt=it["prompt"],
                        options=opts,
                    )
                    self.cross_checks[dom] = q

    def get_universal_questions(self) -> list[Question]:
        return list(self.universal_questions)

    def get_pair_questions(self, domain_a: str, domain_b: str) -> list[Question]:
        key = _normalize_pair(domain_a, domain_b)
        return list(self.pairs_map.get(key, []))

    def get_cross_check(self, domain: str) -> Question | None:
        dom = DOMAIN_CODE_MAP.get(domain.upper(), domain.upper())
        return self.cross_checks.get(dom)

    def build_phase1_5_tiebreaker(self, domain_b: str, domain_c: str) -> Question:
        dom_b = DOMAIN_CODE_MAP.get(domain_b.upper(), domain_b.upper())
        dom_c = DOMAIN_CODE_MAP.get(domain_c.upper(), domain_c.upper())
        club_map = self.visible_tiebreaker_template.get("domain_club_names", {})
        label_b = club_map.get(dom_b, dom_b.replace("_", " ").title())
        label_c = club_map.get(dom_c, dom_c.replace("_", " ").title())
        
        prompt_tmpl = self.phase1_5_template.get("prompt_template", "Which interests you more right now: {optionB} or {optionC}?")
        prompt = prompt_tmpl.format(optionB=label_b, optionC=label_c)

        options = [
            QuestionOption(
                option_id="opt_b",
                label=f"Exploring {label_b}",
                domain_weights={dom_b: 0.8}
            ),
            QuestionOption(
                option_id="opt_c",
                label=f"Exploring {label_c}",
                domain_weights={dom_c: 0.8}
            ),
        ]

        canon = _normalize_pair(dom_b, dom_c)
        code_b = CODE_TO_DOMAIN_MAP.get(dom_b, dom_b[:2]).lower()
        code_c = CODE_TO_DOMAIN_MAP.get(dom_c, dom_c[:2]).lower()
        
        return Question(
            question_id=f"tb_p15_{code_b}_{code_c}",
            stage="class10",
            tier="universal",
            domain_pair=canon,
            prompt=prompt,
            options=options,
            flavor_tags=["phase1_5_tiebreaker"],
        )

    def build_visible_tiebreaker(self, domain_a: str, domain_b: str) -> Question:
        dom_a = DOMAIN_CODE_MAP.get(domain_a.upper(), domain_a.upper())
        dom_b = DOMAIN_CODE_MAP.get(domain_b.upper(), domain_b.upper())
        club_map = self.visible_tiebreaker_template.get("domain_club_names", {})
        label_a = club_map.get(dom_a, dom_a.replace("_", " ").title())
        label_b = club_map.get(dom_b, dom_b.replace("_", " ").title())

        prompt_tmpl = self.visible_tiebreaker_template.get("prompt_template", "One free elective period today — do you join the {A} club or the {B} club?")
        prompt = prompt_tmpl.format(A=label_a, B=label_b)

        options = [
            QuestionOption(
                option_id="opt_a",
                label=f"Join the {label_a} club",
                domain_weights={dom_a: 1.0}
            ),
            QuestionOption(
                option_id="opt_b",
                label=f"Join the {label_b} club",
                domain_weights={dom_b: 1.0}
            ),
        ]

        canon = _normalize_pair(dom_a, dom_b)
        code_a = CODE_TO_DOMAIN_MAP.get(dom_a, dom_a[:2]).lower()
        code_c = CODE_TO_DOMAIN_MAP.get(dom_b, dom_b[:2]).lower()

        return Question(
            question_id=f"v_tb_{code_a}_{code_c}",
            stage="class10",
            tier="verification",
            domain_pair=canon,
            prompt=prompt,
            options=options,
            flavor_tags=["visible_tiebreaker"],
        )

    def build_hidden_commitment_question(self, domain_a: str, domain_b: str, step: int = 1) -> Question:
        """
        Step 1 uses primary elective prompt template.
        Step 2 (corroborating check) uses secondary club prompt template.
        """
        dom_a = DOMAIN_CODE_MAP.get(domain_a.upper(), domain_a.upper())
        dom_b = DOMAIN_CODE_MAP.get(domain_b.upper(), domain_b.upper())
        
        cfg = self.hidden_commitment_template
        if step == 1:
            elective_map = cfg.get("domain_elective_names", {})
            name_a = elective_map.get(dom_a, dom_a.replace("_", " ").title())
            name_b = elective_map.get(dom_b, dom_b.replace("_", " ").title())
            tmpl = cfg.get("prompt_template", "If you had to pick one elective for the rest of the year — {A} or {B} — which would you actually pick?")
            prompt = tmpl.format(A=name_a, B=name_b)
            qid_prefix = "hid_commit_1"
        else:
            club_map = cfg.get("domain_club_long_names", {})
            name_a = club_map.get(dom_a, dom_a.replace("_", " ").title())
            name_b = club_map.get(dom_b, dom_b.replace("_", " ").title())
            tmpl = cfg.get("secondary_commitment_prompt_template", "A new club is starting — {A} Club or {B} Club — which do you sign up for?")
            prompt = tmpl.format(A=name_a, B=name_b)
            qid_prefix = "hid_commit_2"

        options = [
            QuestionOption(
                option_id="opt_a",
                label=name_a,
                domain_weights={dom_a: 1.0}
            ),
            QuestionOption(
                option_id="opt_b",
                label=name_b,
                domain_weights={dom_b: 1.0}
            ),
        ]

        canon = _normalize_pair(dom_a, dom_b)
        code_a = CODE_TO_DOMAIN_MAP.get(dom_a, dom_a[:2]).lower()
        code_b = CODE_TO_DOMAIN_MAP.get(dom_b, dom_b[:2]).lower()

        return Question(
            question_id=f"{qid_prefix}_{code_a}_{code_b}",
            stage="class10",
            tier="hidden_verification",
            domain_pair=canon,
            prompt=prompt,
            options=options,
            contradiction_check_for=dom_a,
        )

    def build_contradiction_question(self, pattern_type: str, domain: str | None = None) -> Question | None:
        if pattern_type == "confidence_gap" and domain:
            dom = DOMAIN_CODE_MAP.get(domain.upper(), domain.upper())
            cfg = self.contradiction_templates.get("confidence_gap", {})
            tmpl = cfg.get("prompt_template", "You've shown a lot of interest in {domain_label}, but rated your confidence in it lower. Which feels more true: you enjoy it but don't feel confident yet, or you like the idea of it more than the actual coursework?")
            label = dom.replace("_", " ").title()
            prompt = tmpl.format(domain_label=label)
            raw_opts = cfg.get("options", [])
            options = []
            for ro in raw_opts:
                options.append(QuestionOption(
                    option_id=ro["option_id"],
                    label=ro["label"],
                    domain_weights={},
                    effect=ro.get("effect"),
                ))
            code = CODE_TO_DOMAIN_MAP.get(dom, dom[:2]).lower()
            return Question(
                question_id=f"v_conf_gap_{code}",
                stage="class10",
                tier="verification",
                prompt=prompt,
                options=options,
                contradiction_check_for=dom,
            )

        elif pattern_type == "flat_profile":
            cfg = self.contradiction_templates.get("flat_profile", {})
            prompt = cfg.get("prompt_template", "A few different areas seem to interest you fairly equally — which would you be most disappointed to not explore at all: technology, business, healthcare, arts, or social sciences?")
            raw_opts = cfg.get("options", [])
            options = [QuestionOption(**ro) for ro in raw_opts]
            return Question(
                question_id="v_flat_profile",
                stage="class10",
                tier="verification",
                prompt=prompt,
                options=options,
            )

        return None
