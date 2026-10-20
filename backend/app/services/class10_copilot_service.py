import os
import re
import json
import difflib
import logging
import urllib.request
import urllib.parse
from typing import List, Dict, Any, Optional, Tuple
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

DATA_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "seeds",
    "class10_pathway_catalog.json"
)

def load_catalog() -> List[Dict[str, Any]]:
    if not os.path.exists(DATA_PATH):
        return []
    with open(DATA_PATH, "r", encoding="utf-8") as fp:
        return json.load(fp)

CATALOG_CACHE: List[Dict[str, Any]] = load_catalog()
CATALOG_ID_MAP: Dict[str, Dict[str, Any]] = {n["id"]: n for n in CATALOG_CACHE}

# Comprehensive Synonym and Keyword Mappings with Stemming & Typo Tolerance
SYNONYM_MAP: Dict[str, List[str]] = {
    # Vehicles, Automobiles & Cars
    "vehicle": ["diploma_automobile_engineering", "iti_mechanic_auto", "diploma_mechanical_engineering", "btech_mechanical_engineering"],
    "vehicles": ["diploma_automobile_engineering", "iti_mechanic_auto", "diploma_mechanical_engineering", "btech_mechanical_engineering"],
    "car": ["diploma_automobile_engineering", "iti_mechanic_auto", "diploma_mechanical_engineering"],
    "cars": ["diploma_automobile_engineering", "iti_mechanic_auto", "diploma_mechanical_engineering"],
    "auto": ["diploma_automobile_engineering", "iti_mechanic_auto", "btech_mechanical_engineering"],
    "automobile": ["diploma_automobile_engineering", "iti_mechanic_auto", "btech_mechanical_engineering"],
    "automobiles": ["diploma_automobile_engineering", "iti_mechanic_auto", "btech_mechanical_engineering"],
    "automotive": ["diploma_automobile_engineering", "iti_mechanic_auto", "btech_mechanical_engineering"],
    "bike": ["diploma_automobile_engineering", "iti_mechanic_auto"],
    "bikes": ["diploma_automobile_engineering", "iti_mechanic_auto"],
    "ev": ["diploma_automobile_engineering", "diploma_electrical_engineering", "btech_mechanical_engineering"],
    "electric vehicle": ["diploma_automobile_engineering", "diploma_electrical_engineering"],
    "engine": ["diploma_automobile_engineering", "diploma_mechanical_engineering", "iti_mechanic_auto"],
    "engines": ["diploma_automobile_engineering", "diploma_mechanical_engineering", "iti_mechanic_auto"],

    # Mechanical & Machines
    "mechanical": ["diploma_mechanical_engineering", "btech_mechanical_engineering", "iti_fitter"],
    "mechnical": ["diploma_mechanical_engineering", "btech_mechanical_engineering", "iti_fitter"],
    "machanical": ["diploma_mechanical_engineering", "btech_mechanical_engineering", "iti_fitter"],
    "mechanics": ["diploma_mechanical_engineering", "btech_mechanical_engineering", "iti_fitter"],
    "mechanic": ["iti_mechanic_auto", "diploma_mechanical_engineering", "iti_fitter"],
    "machine": ["diploma_mechanical_engineering", "iti_fitter", "diploma_polytechnic"],
    "machines": ["diploma_mechanical_engineering", "iti_fitter", "diploma_polytechnic"],
    "fitter": ["iti_fitter", "diploma_mechanical_engineering", "iti"],
    "fitting": ["iti_fitter", "iti"],
    "welder": ["iti_welder", "iti"],
    "welding": ["iti_welder", "iti"],
    "turner": ["iti_turner", "iti"],
    "lathe": ["iti_turner", "iti_fitter"],
    "workshop": ["diploma_polytechnic", "iti", "diploma_mechanical_engineering"],
    "hands on": ["diploma_polytechnic", "iti"],
    "hands": ["diploma_polytechnic", "iti"],
    "practical": ["diploma_polytechnic", "iti"],
    "trade": ["iti", "diploma_polytechnic"],
    "trades": ["iti", "diploma_polytechnic"],
    "polytechnic": ["diploma_polytechnic"],
    "poly": ["diploma_polytechnic"],
    "diploma": ["diploma_polytechnic"],
    "iti": ["iti"],

    # Electrical & Electronics
    "electrical": ["diploma_electrical_engineering", "btech_electrical_engineering", "iti_electrician"],
    "electricals": ["diploma_electrical_engineering", "btech_electrical_engineering", "iti_electrician"],
    "electrician": ["iti_electrician", "diploma_electrical_engineering", "iti"],
    "electric": ["diploma_electrical_engineering", "btech_electrical_engineering", "iti_electrician"],
    "electronics": ["diploma_electronics_communication", "btech_electronics_communication"],
    "electronic": ["diploma_electronics_communication", "btech_electronics_communication"],
    "circuits": ["diploma_electronics_communication", "btech_electronics_communication", "diploma_electrical_engineering"],
    "chip": ["diploma_electronics_communication", "btech_electronics_communication"],

    # Civil & Construction
    "civil": ["diploma_civil_engineering", "btech_civil_engineering", "iti_draughtsman_civil"],
    "construction": ["diploma_civil_engineering", "btech_civil_engineering", "iti_draughtsman_civil"],
    "building": ["diploma_civil_engineering", "diploma_mechanical_engineering", "barch", "diploma_polytechnic"],
    "buildings": ["diploma_civil_engineering", "barch", "btech_civil_engineering"],
    "bridge": ["diploma_civil_engineering", "btech_civil_engineering"],
    "draughtsman": ["iti_draughtsman_civil", "diploma_civil_engineering"],

    # Design, Drawing, Art, Animation
    "design": ["design_bdes", "humanities", "animation_gaming", "barch"],
    "designing": ["design_bdes", "humanities", "animation_gaming", "barch"],
    "designer": ["design_bdes", "humanities", "animation_gaming"],
    "drawing": ["design_bdes", "fine_arts_bfa", "humanities", "animation_gaming", "barch"],
    "draw": ["design_bdes", "fine_arts_bfa", "humanities", "animation_gaming"],
    "sketch": ["design_bdes", "fine_arts_bfa", "barch", "humanities"],
    "sketching": ["design_bdes", "fine_arts_bfa", "barch", "humanities"],
    "art": ["fine_arts_bfa", "design_bdes", "humanities"],
    "artistic": ["fine_arts_bfa", "design_bdes", "humanities"],
    "arts": ["humanities", "fine_arts_bfa"],
    "painting": ["fine_arts_bfa", "design_bdes", "humanities"],
    "creative": ["design_bdes", "fine_arts_bfa", "animation_gaming", "humanities"],
    "creativity": ["design_bdes", "fine_arts_bfa", "animation_gaming", "humanities"],
    "animation": ["animation_gaming", "design_bdes"],
    "animating": ["animation_gaming", "design_bdes"],
    "game": ["animation_gaming", "btech_computer_science_engineering"],
    "gaming": ["animation_gaming", "btech_computer_science_engineering"],
    "games": ["animation_gaming", "btech_computer_science_engineering"],
    "video game": ["animation_gaming", "btech_computer_science_engineering"],
    "architecture": ["barch", "diploma_civil_engineering", "science_pcm"],
    "barch": ["barch", "science_pcm"],

    # Veterinary & Animals
    "veterinary": ["bvsc_veterinary", "science_pcb"],
    "vet": ["bvsc_veterinary", "science_pcb"],
    "animal": ["bvsc_veterinary", "science_pcb"],
    "animals": ["bvsc_veterinary", "science_pcb"],
    "pet": ["bvsc_veterinary", "science_pcb"],
    "pets": ["bvsc_veterinary", "science_pcb"],
    "wildlife": ["bvsc_veterinary", "science_pcb"],

    # Medical & Healthcare
    "doctor": ["mbbs", "bds", "bams", "bhms", "bvsc_veterinary", "science_pcb"],
    "medicine": ["mbbs", "bds", "bams", "bhms", "bpharm", "science_pcb"],
    "mbbs": ["mbbs", "science_pcb"],
    "dental": ["bds", "science_pcb"],
    "dentist": ["bds", "science_pcb"],
    "ayurveda": ["bams", "science_pcb"],
    "homeopathy": ["bhms", "science_pcb"],
    "pharmacy": ["bpharm", "science_pcb"],
    "pharmacist": ["bpharm", "science_pcb"],
    "pharma": ["bpharm", "science_pcb"],
    "nursing": ["bsc_nursing", "science_pcb"],
    "nurse": ["bsc_nursing", "science_pcb"],
    "physiotherapy": ["bpt", "science_pcb"],
    "physio": ["bpt", "science_pcb"],
    "agriculture": ["bsc_agriculture", "btech_agricultural_engineering", "science_pcb", "science_pcmb"],
    "farming": ["bsc_agriculture", "btech_agricultural_engineering", "science_pcb"],
    "biotechnology": ["bsc_biotechnology", "btech_biotechnology_pcmb", "science_pcb", "science_pcmb"],
    "biotech": ["bsc_biotechnology", "btech_biotechnology_pcmb", "science_pcb", "science_pcmb"],
    "biomedical": ["btech_biomedical_engineering", "science_pcmb"],
    "food technology": ["btech_food_technology", "science_pcmb"],
    "food tech": ["btech_food_technology", "science_pcmb"],
    "biophysics": ["bsc_biophysics", "science_pcmb"],

    # Computing, Software, IT & Technology
    "computer technology": ["btech_computer_science_engineering", "diploma_computer_engineering"],
    "computer science": ["btech_computer_science_engineering", "diploma_computer_engineering"],
    "cse": ["btech_computer_science_engineering", "diploma_computer_engineering"],
    "technology": ["btech_computer_science_engineering", "diploma_computer_engineering", "science_pcm"],
    "tech": ["btech_computer_science_engineering", "diploma_computer_engineering", "science_pcm"],
    "it": ["btech_computer_science_engineering", "diploma_computer_engineering"],
    "information technology": ["btech_computer_science_engineering", "diploma_computer_engineering"],
    "software": ["btech_computer_science_engineering", "bsc_data_science", "science_pcm"],
    "software engineering": ["btech_computer_science_engineering"],
    "coding": ["btech_computer_science_engineering", "bsc_data_science", "diploma_computer_engineering", "science_pcm"],
    "code": ["btech_computer_science_engineering", "bsc_data_science", "science_pcm"],
    "computer": ["btech_computer_science_engineering", "bsc_data_science", "diploma_computer_engineering", "iti_copa", "science_pcm"],
    "computers": ["btech_computer_science_engineering", "bsc_data_science", "diploma_computer_engineering", "science_pcm"],
    "cs": ["btech_computer_science_engineering", "science_pcm"],
    "developer": ["btech_computer_science_engineering", "bsc_data_science", "science_pcm"],
    "data": ["bsc_data_science", "btech_computer_science_engineering", "science_pcm"],
    "ai": ["bsc_data_science", "btech_computer_science_engineering", "science_pcm"],
    "robot": ["btech_mechanical_engineering", "btech_electronics_communication", "science_pcm"],
    "robots": ["btech_mechanical_engineering", "btech_electronics_communication", "science_pcm"],
    "robotics": ["btech_mechanical_engineering", "btech_electronics_communication", "science_pcm"],

    # Aviation & Defence
    "pilot": ["commercial_pilot", "science_pcm"],
    "flying": ["commercial_pilot", "science_pcm"],
    "plane": ["commercial_pilot", "btech_aerospace_engineering", "science_pcm"],
    "aviation": ["commercial_pilot", "btech_aerospace_engineering", "science_pcm"],
    "aerospace": ["btech_aerospace_engineering", "science_pcm"],
    "merchant navy": ["merchant_navy", "science_pcm"],
    "navy": ["nda", "merchant_navy", "science_pcm"],
    "ship": ["merchant_navy", "science_pcm"],
    "army": ["nda", "police_sub_inspector_entry"],
    "defence": ["nda", "police_sub_inspector_entry", "science_pcm"],
    "nda": ["nda", "science_pcm"],
    "air force": ["nda", "commercial_pilot", "science_pcm"],

    # Commerce, Law & Civil Services
    "upsc": ["civil_services_upsc", "civil_services_any_stream"],
    "ias": ["civil_services_upsc", "civil_services_any_stream"],
    "ips": ["civil_services_upsc", "police_sub_inspector_entry", "civil_services_any_stream"],
    "civil services": ["civil_services_upsc", "civil_services_any_stream"],
    "police": ["police_sub_inspector_entry", "civil_services_upsc"],
    "bank": ["banking_ibps_sbi", "commerce_math", "commerce_nomath"],
    "banking": ["banking_ibps_sbi", "commerce_math", "commerce_nomath"],
    "ca": ["chartered_accountancy", "commerce_math"],
    "chartered accountant": ["chartered_accountancy", "commerce_math"],
    "accounting": ["chartered_accountancy", "bcom_hons", "commerce_math"],
    "finance": ["bcom_hons", "chartered_accountancy", "commerce_math"],
    "business": ["bcom_general", "bcom_hons", "commerce_math", "commerce_nomath"],
    "law": ["law_llb", "humanities"],
    "lawyer": ["law_llb", "humanities"],
    "psychology": ["ba_psychology", "humanities"],
    "journalism": ["mass_communication_journalism", "humanities"],
    "media": ["mass_communication_journalism", "humanities"],
    "writing": ["mass_communication_journalism", "humanities"],
    "hotel": ["hotel_management_bhm"],
    "hotel management": ["hotel_management_bhm"],
    "culinary": ["hotel_management_bhm"],
}

STOP_WORDS = {
    "i", "want", "to", "go", "into", "become", "be", "a", "an", "the", "in", "for", "and", "or",
    "of", "my", "is", "am", "are", "after", "10th", "career", "study", "path", "pathway", "option",
    "options", "please", "tell", "me", "about", "how", "what", "which", "can", "do", "like", "over",
    "prefer", "stuff", "things", "good", "bad", "not", "very", "much", "bro", "dude", "sir", "too",
    "also", "no", "yes", "yeah", "actually", "really", "kind", "kinda", "help", "department", "departments",
    "mean", "meaning", "explain"
}


def normalize_tokens(query: str) -> List[str]:
    cleaned = query.lower().replace("-", " ").replace("?", " ").replace("!", " ").replace(".", " ").strip()
    raw_words = [w for w in re.findall(r"[a-z0-9_]+", cleaned) if w not in STOP_WORDS and len(w) > 1]
    
    tokens = []
    all_keys = list(SYNONYM_MAP.keys())
    
    for w in raw_words:
        tokens.append(w)
        # Handle simple plural stemming
        if w.endswith("s") and len(w) > 3 and w[:-1] not in STOP_WORDS:
            tokens.append(w[:-1])
        if w.endswith("ing") and len(w) > 5 and w[:-3] not in STOP_WORDS:
            tokens.append(w[:-3])

        # Strict fuzzy matching strictly for typos (not substrings)
        if len(w) >= 4:
            fuzzy_matches = difflib.get_close_matches(w, all_keys, n=2, cutoff=0.82)
            for fm in fuzzy_matches:
                if abs(len(fm) - len(w)) <= 2 and fm not in tokens:
                    tokens.append(fm)

    return list(set(tokens))


def tool_search_catalog(query: str, catalog: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    if not query:
        return []
    raw_q = query.lower().replace("-", " ").strip()
    tokens = normalize_tokens(query)

    scored_nodes: Dict[str, Tuple[int, Dict[str, Any]]] = {}

    for node in catalog:
        nid = node.get("id", "")
        nname = node.get("name", "").lower()
        ndesc = (node.get("one_line_description") or "").lower()
        exam = (node.get("eligibility", {}).get("entrance_exam") or "").lower()
        stream_req = (node.get("eligibility", {}).get("stream_required") or "").lower()
        qual = (node.get("typical_qualification") or "").lower()

        score = 0

        # Exact multi-word match
        if raw_q in nname:
            score += 25
        if raw_q in nid:
            score += 20
        if raw_q in ndesc:
            score += 15

        # Token-level matching
        for t in tokens:
            if t in nid:
                score += 12
            if t in nname:
                score += 14
            if t in ndesc:
                score += 6
            if exam and t in exam:
                score += 8
            if stream_req and t in stream_req:
                score += 6
            if qual and t in qual:
                score += 6

            # Check synonyms
            if t in SYNONYM_MAP:
                target_ids = SYNONYM_MAP[t]
                if nid in target_ids:
                    score += 18

        # Multi-word synonym phrases
        for syn_phrase, target_ids in SYNONYM_MAP.items():
            if " " in syn_phrase and syn_phrase in raw_q:
                if nid in target_ids:
                    score += 20

        if score > 0:
            scored_nodes[nid] = (score, node)

    sorted_results = sorted(scored_nodes.values(), key=lambda x: x[0], reverse=True)
    return [r[1] for r in sorted_results[:8]]


def tool_get_node(node_id: str, catalog: List[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    for n in catalog:
        if n.get("id") == node_id:
            return n
    return None

def tool_get_children(parent_id: str, catalog: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    return [n for n in catalog if n.get("parent_id") == parent_id]

def tool_get_cross_stream_goals(catalog: List[Dict[str, Any]], query: Optional[str] = None) -> List[Dict[str, Any]]:
    cross = [n for n in catalog if n.get("tier") == "B" and (n.get("parent_id") is None or len(n.get("feeds_from", [])) >= 6)]
    if query:
        q = query.lower()
        filtered = [n for n in cross if q in n["name"].lower() or (n.get("one_line_description") and q in n["one_line_description"].lower())]
        if filtered:
            return filtered
    return cross

CROSS_STREAM_KEYWORDS = [
    "police", "upsc", "ias", "ips", "civil services", "nda", "army", "navy", "air force", "defence",
    "bank", "banking", "ssc", "railway", "railways", "govt", "government exam", "law", "lawyer", "clat",
    "journalism", "mass communication", "animation", "game design", "hotel management", "culinary",
    "fashion design", "merchant navy", "pilot", "commercial pilot"
]

def check_for_cross_stream_mention(text: str) -> bool:
    t = text.lower()
    return any(k in t for k in CROSS_STREAM_KEYWORDS)


def validate_and_sanitize_response(
    raw_response: Dict[str, Any],
    injected_node_ids: List[str],
    tool_grounded_ids: List[str],
    catalog_map: Dict[str, Dict[str, Any]],
    audit_log: Dict[str, Any]
) -> Dict[str, Any]:
    all_grounded_ids = set(injected_node_ids).union(set(tool_grounded_ids))
    validation_errors = []

    # 1. Validate UI Action
    ui_action = raw_response.get("ui_action") or {"type": "NONE"}
    tier_a_id = ui_action.get("tier_a_id")
    leaf_id = ui_action.get("leaf_id")
    highlight_ids = ui_action.get("highlight_ids") or []

    ui_action_valid = True

    if tier_a_id:
        if tier_a_id not in catalog_map:
            validation_errors.append(f"Invalid tier_a_id '{tier_a_id}' not found in catalog")
            ui_action_valid = False
        elif catalog_map[tier_a_id].get("tier") != "A":
            validation_errors.append(f"tier_a_id '{tier_a_id}' is not a Tier A node")
            ui_action_valid = False

    if leaf_id:
        if leaf_id not in catalog_map:
            validation_errors.append(f"Invalid leaf_id '{leaf_id}' not found in catalog")
            ui_action_valid = False

    if highlight_ids:
        sanitized_highlights = []
        for hid in highlight_ids:
            if hid in catalog_map:
                sanitized_highlights.append(hid)
            else:
                validation_errors.append(f"Invalid highlight_id '{hid}' dropped")
        highlight_ids = sanitized_highlights

    if not ui_action_valid:
        ui_action = {
            "type": "NONE",
            "screen": None,
            "tier_a_id": None,
            "leaf_id": None,
            "highlight_ids": []
        }
    else:
        ui_action["highlight_ids"] = highlight_ids

    # 2. Validate Candidate Nodes Grounding
    candidate_nodes = raw_response.get("candidate_nodes") or []
    sanitized_candidates = []
    for cand in candidate_nodes:
        cid = cand.get("id") if isinstance(cand, dict) else cand
        if cid in catalog_map:
            node_obj = catalog_map[cid]
            sanitized_candidates.append({
                "id": cid,
                "name": node_obj.get("name", cid),
                "detail_status": node_obj.get("detail_status", "verified")
            })
        else:
            validation_errors.append(f"Candidate node '{cid}' not found in catalog")

    # 3. Check Detail Status Honesty in Message
    message = raw_response.get("message", "").strip()
    partial_or_pending = [c for c in sanitized_candidates if c.get("detail_status") in ("partial", "pending")]
    if partial_or_pending:
        msg_lower = message.lower()
        has_honesty_callout = any(word in msg_lower for word in ["verif", "partial", "pending", "research underway", "confirm", "authority"])
        if not has_honesty_callout:
            pending_names = ", ".join([c["name"] for c in partial_or_pending])
            message += f"\n\n*(Worth noting: full details on {pending_names} are still being verified with official bodies.)*"

    # 4. Quick Replies
    quick_replies = raw_response.get("quick_replies") or []
    if raw_response.get("next_question"):
        if not quick_replies:
            quick_replies = ["Yes, tell me more", "Show me other options", "I have a specific career in mind", "Something else — I'll type it"]
        elif "Something else — I'll type it" not in quick_replies:
            quick_replies.append("Something else — I'll type it")

    audit_log["validation_errors"] = validation_errors
    audit_log["grounded_node_count"] = len(all_grounded_ids)

    return {
        "message": message,
        "ui_action": ui_action,
        "candidate_nodes": sanitized_candidates,
        "next_question": raw_response.get("next_question", ""),
        "quick_replies": quick_replies,
        "audit_log": audit_log
    }


def search_web_for_career_knowledge(query: str) -> Optional[str]:
    """
    Fetches real-time educational / career facts or eligibility requirements for specialized or out-of-catalog careers.
    Uses Wikipedia Summary API with fallback to DuckDuckGo search snippets.
    """
    if not query or len(query.strip()) < 3:
        return None

    clean_q = re.sub(r"[^\w\s]", " ", query).strip()
    # 1. Try Wikipedia Summary API for authoritative concept/discipline overview
    try:
        wiki_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(clean_q)}"
        req = urllib.request.Request(wiki_url, headers={"User-Agent": "CareerPathAI-EducationBot/1.0"})
        with urllib.request.urlopen(req, timeout=2) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            extract = data.get("extract")
            if extract and len(extract) > 40:
                return f"Wikipedia Overview: {extract}"
    except Exception:
        pass

    # 2. DuckDuckGo search snippets fallback
    try:
        ddg_url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(clean_q + ' career eligibility india after 10th 12th')}"
        req = urllib.request.Request(ddg_url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
        with urllib.request.urlopen(req, timeout=2) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
            snippets = re.findall(r'<a[^>]+class=[\'"]result__snippet[\'"][^>]*>(.*?)</a>', html, re.DOTALL)
            if snippets:
                cleaned = [re.sub(r"<[^>]+>", "", s).strip() for s in snippets[:2]]
                return f"Web Search Insights: {' '.join(cleaned)}"
    except Exception:
        pass

    return None


def try_groq_generation(
    user_message: str,
    grounded_nodes: List[Dict[str, Any]],
    current_screen: Optional[str] = "landing",
    current_tier_a_id: Optional[str] = None,
    current_leaf_id: Optional[str] = None,
    marks_profile: Optional[Dict[str, Any]] = None,
    web_context: Optional[str] = None
) -> Optional[Dict[str, Any]]:
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return None

    try:
        from groq import Groq
        client = Groq(api_key=api_key, timeout=7.0)

        # Build concise catalog overview to stay well within Groq TPM limits
        if grounded_nodes:
            catalog_summary = [
                {"id": n["id"], "name": n.get("name"), "stream": n.get("eligibility", {}).get("stream_required"), "exam": n.get("eligibility", {}).get("entrance_exam")}
                for n in grounded_nodes
            ]
        else:
            catalog = load_catalog()
            catalog_summary = [
                {"id": n["id"], "name": n.get("name"), "parent": n.get("parent_id")}
                for n in catalog
            ]

        system_prompt = (
            "You are the Class 10 Career Pathway AI Mentor & Co-Pilot for CareerPath AI.\n"
            "Your purpose is to deeply understand the student, listen to their questions, doubts, interests, and emotional state, and give insightful, empathetic, factual guidance grounded in the official Class 10 pathway catalog.\n\n"
            "STUDENT UNDERSTANDING & DECISION-MAKING GUIDELINES:\n"
            "1. DIRECT ANSWERS & REAL-WORLD INSIGHT:\n"
            "   - If they ask 'is X worth studying?', explain why it is or isn't worth it (real market demand, job roles, learning curve, salary potential, and required aptitude).\n"
            "   - If they ask 'what is [field/branch]?', explain what they study, daily work, and how to enter after 10th (Diploma vs 11-12 degree).\n"
            "   - If they express an interest ('I like cars', 'I like coding and AI', 'I like biology and animals', 'I like drawing'), match them immediately to the relevant pathways.\n\n"
            "2. STREAM-SPECIFIC JOB PROSPECTS & SALARY SCOPE:\n"
            "   - If the student asks about 'job prospects', 'scope', 'career options', 'salary', or 'placements', DO NOT give a vague general answer.\n"
            "   - Tailor the answer specifically to the stream or course in context (e.g. Science PCM vs Science PCB vs Science PCMB vs Commerce vs Humanities vs Diploma vs ITI):\n"
            "     * Science PCM: Software Engineer, Cloud Architect, AI Specialist, Mechanical/Robotics Engineer, Defense, Commercial Pilot. Starting ₹4.5L-₹12L PA, 5-yr growth ₹15L-₹35L+ PA.\n"
            "     * Science PCB: Doctor (MBBS/BDS), Pharmacologist, Clinical Research, Biomedical Scientist, Veterinarian, Physiotherapist. Starting ₹4L-₹10L PA, 5-yr growth ₹12L-₹30L+ PA.\n"
            "     * Science PCMB: Dual-Domain Powerhouse! Eligible for 100% Engineering (JEE) + 100% Medical/Life Sciences (NEET) + Interdisciplinary (Biomedical Engg, Bioinformatics, Food Tech, Biophysics). Starting ₹5L-₹12L PA.\n"
            "     * Commerce: Chartered Accountant (CA), Investment Banking Analyst, Corporate Finance (CFA), Company Secretary (CS), FinTech Consultant. Starting ₹5L-₹11L PA, 5-yr growth ₹15L-₹30L+ PA.\n"
            "     * Humanities/Arts: Corporate Lawyer (CLAT), Civil Services (IAS/IPS), UX/UI Design Researcher & Content Strategist, Policy Analyst, Brand Communications Director. Starting ₹4L-₹9L PA, 5-yr growth ₹12L-₹25L+ PA.\n"
            "     * Polytechnic Diploma: Junior Engineer (Railways, PSUs, State Govt), CAD/CAM Design Specialist, Automation Technician + Lateral Entry to 2nd year B.Tech.\n"
            "     * ITI Vocational Trades: Certified Industrial Electrician, CNC Machinist, Automotive/EV Technician, Welder/Fabricator. High domestic & overseas demand.\n\n"
            "3. OUT-OF-CATALOG CAREERS & REASONING (e.g. Ethical Hacking, Merchant Navy, Commercial Pilot, Animation & VFX, Game Dev, Fashion Design, Marine Biology, Sports Science, Culinary Arts, Astrobiology):\n"
            "   - If a career or concept is NOT explicitly one of the catalog nodes, USE YOUR COMPREHENSIVE REASONING (and any web search context provided) to explain:\n"
            "     * Exactly what the career entails in real life.\n"
            "     * Class 11-12 stream required (e.g., Pilot -> Physics + Math; Merchant Navy -> PCM 60%+; Fashion Design -> Any stream + NIFT; Ethical Hacking -> PCM or Computer Diploma).\n"
            "     * Relevant undergraduate degrees, certifications, or specialized institutes.\n"
            "     * Career scope, demand, and earnings.\n"
            "     * Map it to the closest foundational stream in the catalog (e.g. tier_a_science_pcm, diploma_polytechnic, tier_a_humanities) for the UI action.\n\n"
            "4. SPECIAL SCENARIO RULES:\n"
            "   - Cross-Stream Goals (UPSC, IPS, IAS, Civil Services, Banking, Police, Law): State clearly that UPSC and Civil Services works from any stream (Science, Commerce, Humanities) because any graduate degree qualifies. Explain how Humanities gives GS synergy while Science/Commerce provides career fallbacks. Navigate to screen: 'goals'.\n"
            "   - Practical Trades (Diploma / Polytechnic / ITI): Always treat them with high respect. Emphasize hands-on workshop mastery and lateral entry into 2nd year B.Tech.\n\n"
            "5. UI NAVIGATION & ACTION:\n"
            "   - When discussing a specific pathway node, navigate to it (type: 'NAVIGATE_TO', screen: 'detail', tier_a_id: '<parent_id>', leaf_id: '<id>', highlight_ids: ['<id>']).\n"
            "   - When discussing a stream (Science PCM, PCB, PCMB, Commerce, Humanities, Diploma, ITI), navigate to 'drill_in' or 'landing'.\n"
            "   - When discussing cross-stream public exams (UPSC, NDA, Police, Banking), navigate to 'goals'.\n\n"
            "OUTPUT FORMAT:\n"
            "You must respond strictly with a valid JSON object matching the following structure:\n"
            "{\n"
            '  "message": "Direct, insightful, empathetic answer formatted in clean Markdown with emojis and bold key takeaways.",\n'
            '  "quick_replies": ["Actionable Option 1", "Actionable Option 2", "Something else — I\'ll type it"],\n'
            '  "suggested_filters": {"stream": null, "min_duration": null, "max_duration": null, "entrance_required": null},\n'
            '  "ui_action": {"type": "NAVIGATE_TO", "screen": "detail", "tier_a_id": "tier_a_science_pcm", "leaf_id": "btech_cse", "highlight_ids": ["btech_cse"]},\n'
            '  "candidate_nodes": ["btech_cse"],\n'
            '  "next_question": "Helpful follow-up question"\n'
            "}\n\n"
            f"CURRENT SCREEN: {current_screen or 'landing'}\n"
            f"CURRENT STREAM IN FOCUS: {current_tier_a_id or 'None'}\n"
            f"CURRENT PATHWAY IN FOCUS: {current_leaf_id or 'None'}\n"
            f"STUDENT'S MARKS PROFILE: {json.dumps(marks_profile) if marks_profile else 'None provided'}\n"
            f"LIVE WEB / EXTERNAL KNOWLEDGE CONTEXT:\n{web_context or 'None needed'}\n\n"
            f"RELEVANT PATHWAY NODES:\n{json.dumps(catalog_summary, indent=1)}\n"
        )

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]

        candidate_list = [
            os.getenv("GROQ_MODEL", "qwen/qwen3.8-27b"),
            "qwen/qwen3.8-27b",
            "openai/gpt-oss-120b",
            "openai/gpt-oss-20b"
        ]
        model_candidates = []
        for m in candidate_list:
            if m and m not in model_candidates:
                model_candidates.append(m)

        for model_name in model_candidates:
            try:
                chat_completion = client.chat.completions.create(
                    messages=messages,
                    model=model_name,
                    response_format={"type": "json_object"},
                    temperature=0.3,
                    max_tokens=600,
                )
                content = chat_completion.choices[0].message.content
                if content:
                    parsed = json.loads(content)
                    if isinstance(parsed, dict) and "message" in parsed:
                        return parsed
            except Exception as e:
                logger.warning(f"Groq model {model_name} attempt error: {e}")
                continue
    except Exception as e:
        logger.warning(f"Groq generation error: {e}")

    return None


def try_gemini_generation(
    user_message: str,
    grounded_nodes: List[Dict[str, Any]],
    current_screen: Optional[str] = "landing",
    current_tier_a_id: Optional[str] = None,
    current_leaf_id: Optional[str] = None,
    marks_profile: Optional[Dict[str, Any]] = None,
    web_context: Optional[str] = None
) -> Optional[Dict[str, Any]]:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None

    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)

        catalog = load_catalog()
        catalog_compact = [
            {
                "id": n.get("id"),
                "tier": n.get("tier"),
                "name": n.get("name"),
                "parent_id": n.get("parent_id"),
                "stream_required": n.get("eligibility", {}).get("stream_required"),
                "entrance_exam": n.get("eligibility", {}).get("entrance_exam"),
                "duration": n.get("duration"),
                "reversibility_note": n.get("reversibility_note"),
                "keeps_open": n.get("keeps_open"),
                "detail_status": n.get("detail_status")
            }
            for n in catalog
        ]

        prompt = (
            "You are the Class 10 Career Pathway AI Mentor & Co-Pilot for CareerPath AI.\n"
            "Your purpose is to deeply understand the student, listen to their questions, doubts, interests, and emotional state, and give insightful, empathetic, factual guidance grounded in the official Class 10 pathway catalog.\n\n"
            "STUDENT UNDERSTANDING & DECISION-MAKING GUIDELINES:\n"
            "1. DIRECT ANSWERS & REAL-WORLD INSIGHT:\n"
            "   - If they ask 'is X worth studying?', explain why it is or isn't worth it (real market demand, job roles, learning curve, salary potential, and required aptitude).\n"
            "   - If they ask 'what is [field/branch]?', explain what they study, daily work, and how to enter after 10th (Diploma vs 11-12 degree).\n"
            "   - If they express an interest ('I like cars', 'I like coding and AI', 'I like biology and animals', 'I like drawing'), match them immediately to the relevant pathways.\n\n"
            "2. STREAM-SPECIFIC JOB PROSPECTS & SALARY SCOPE:\n"
            "   - When asked about job prospects or scope, provide exact job roles, top hiring industries, and starting to 5-year salary scale for that particular stream/pathway.\n\n"
            "3. OUT-OF-CATALOG CAREERS & REASONING:\n"
            "   - If a career or concept is NOT in the catalog nodes, use your learned knowledge (and web search insights) to explain the career, 11-12 stream required, college degree, salary, and map it to the closest foundational stream in the UI.\n\n"
            "4. SPECIAL SCENARIO RULES:\n"
            "   - Cross-Stream Goals (UPSC, IPS, IAS, Civil Services): Always state clearly that UPSC / Civil Services works from any stream (Science, Commerce, Humanities) because any graduate degree qualifies. Navigate to screen: 'goals'.\n"
            "   - Practical Trades (Diploma / Polytechnic / ITI): Always treat them with high respect. Emphasize hands-on workshop mastery and lateral entry into 2nd year B.Tech.\n\n"
            f"CURRENT SCREEN: {current_screen or 'landing'}\n"
            f"CURRENT STREAM IN FOCUS: {current_tier_a_id or 'None'}\n"
            f"CURRENT PATHWAY IN FOCUS: {current_leaf_id or 'None'}\n"
            f"STUDENT'S MARKS PROFILE: {json.dumps(marks_profile) if marks_profile else 'None provided'}\n"
            f"LIVE WEB / EXTERNAL KNOWLEDGE CONTEXT:\n{web_context or 'None needed'}\n\n"
            f"CATALOG PATHWAYS:\n{json.dumps(catalog_compact, indent=1)}\n\n"
            f"STUDENT MESSAGE: \"{user_message}\"\n\n"
            "Respond strictly with a valid JSON object matching this schema:\n"
            "{\n"
            '  "message": "Direct, empathetic, highly informative answer to the student\'s specific question, with clear facts, career scope, and pathway guidance.",\n'
            '  "ui_action": {\n'
            '    "type": "NAVIGATE_TO",\n'
            '    "screen": "landing" | "drill_in" | "detail" | "goals",\n'
            '    "tier_a_id": "valid_tier_a_id_or_null",\n'
            '    "leaf_id": "valid_leaf_id_or_null",\n'
            '    "highlight_ids": ["valid_id_1"]\n'
            "  },\n"
            '  "candidate_nodes": [{"id": "valid_node_id", "detail_status": "verified"}],\n'
            '  "next_question": "A focused diagnostic follow-up question",\n'
            '  "quick_replies": ["Actionable option 1", "Actionable option 2", "Something else — I\'ll type it"]\n'
            "}\n"
        )

        for model_candidate in ["gemini-3.8-flash", "gemini-3.5-flash", "gemini-flash-latest", "gemini-2.5-flash"]:
            try:
                model = genai.GenerativeModel(
                    model_name=model_candidate,
                    generation_config={"response_mime_type": "application/json"}
                )
                res = model.generate_content(prompt)
                if res and res.text:
                    parsed = json.loads(res.text)
                    if isinstance(parsed, dict) and "message" in parsed:
                        return parsed
            except Exception:
                continue
    except Exception as e:
        logger.warning(f"Gemini generation fallback: {e}")

    return None


def process_copilot_turn(
    user_message: str,
    current_screen: Optional[str] = "landing",
    current_tier_a_id: Optional[str] = None,
    current_leaf_id: Optional[str] = None,
    marks_profile: Optional[Dict[str, Any]] = None,
    event: Optional[Dict[str, Any]] = None,
    disable_grounding: bool = False
) -> Dict[str, Any]:
    catalog = load_catalog()
    catalog_map = {n["id"]: n for n in catalog}

    injected_node_ids = []
    tool_calls = []
    tool_grounded_ids = []

    if disable_grounding:
        return {
            "message": "I cannot provide specific factual details about pathways right now because my pathway catalog connection is offline. Please browse the catalog directly.",
            "ui_action": {"type": "NONE", "screen": None, "tier_a_id": None, "leaf_id": None, "highlight_ids": []},
            "candidate_nodes": [],
            "next_question": "",
            "quick_replies": [],
            "audit_log": {"injected_node_ids": [], "tool_calls": [], "grounded_ids": []}
        }

    # 1. Proactive Local Context Injection
    if current_tier_a_id and current_tier_a_id in catalog_map:
        injected_node_ids.append(current_tier_a_id)
        for child in tool_get_children(current_tier_a_id, catalog):
            injected_node_ids.append(child["id"])

    if current_leaf_id and current_leaf_id in catalog_map:
        injected_node_ids.append(current_leaf_id)
        node = catalog_map[current_leaf_id]
        for target_id in node.get("keeps_open", []):
            if target_id in catalog_map:
                injected_node_ids.append(target_id)

    # 2. Event-Driven Context Injection
    if event and event.get("type") == "USER_CLICKED_NODE":
        clicked_id = event.get("node_id")
        if clicked_id in catalog_map:
            injected_node_ids.append(clicked_id)
            for target_id in catalog_map[clicked_id].get("keeps_open", []):
                if target_id in catalog_map:
                    injected_node_ids.append(target_id)

    injected_node_ids = list(set(injected_node_ids))

    # 3. Dynamic Tool Calls based on Query
    query_text = (user_message or "").strip()
    search_hits = []
    if query_text and not query_text.startswith("clicked_"):
        search_hits = tool_search_catalog(query_text, catalog)
        tool_calls.append({
            "tool": "search_catalog",
            "params": {"query": query_text},
            "returned_ids": [h["id"] for h in search_hits]
        })
        tool_grounded_ids.extend([h["id"] for h in search_hits])

    if check_for_cross_stream_mention(user_message):
        cross_goals = tool_get_cross_stream_goals(catalog, user_message)
        tool_calls.append({
            "tool": "get_cross_stream_goals",
            "params": {"query": user_message},
            "returned_ids": [g["id"] for g in cross_goals]
        })
        tool_grounded_ids.extend([g["id"] for g in cross_goals])

    tool_grounded_ids = list(set(tool_grounded_ids))
    all_grounded_nodes = [catalog_map[nid] for nid in list(set(injected_node_ids).union(set(tool_grounded_ids))) if nid in catalog_map]

    audit_log = {
        "injected_node_ids": injected_node_ids,
        "tool_calls": tool_calls,
        "grounded_ids": list(set(injected_node_ids).union(set(tool_grounded_ids)))
    }

    # Check if query needs external web knowledge (e.g. 0 tool grounded ids, or specific niche terms)
    web_context = None
    if user_message and not event:
        niche_keywords = ["pilot", "aviation", "navy", "merchant navy", "ethical hacking", "hacker", "game dev", "animation", "vfx", "fashion", "marine biology", "sports science", "astronomy", "forensic", "actuary", "actuarial", "culinary", "hotel management", "psychology", "scope", "job", "salary"]
        msg_lower = user_message.lower()
        if len(tool_grounded_ids) == 0 or any(k in msg_lower for k in niche_keywords):
            web_context = search_web_for_career_knowledge(user_message)
            if web_context:
                tool_calls.append({
                    "tool": "search_web_career_knowledge",
                    "params": {"query": user_message},
                    "summary_length": len(web_context)
                })

    # 4. Try Groq (Qwen) LLM first, then Gemini LLM
    raw_response = None
    if user_message and not event:
        raw_response = try_groq_generation(
            user_message=user_message,
            grounded_nodes=all_grounded_nodes,
            current_screen=current_screen,
            current_tier_a_id=current_tier_a_id,
            current_leaf_id=current_leaf_id,
            marks_profile=marks_profile,
            web_context=web_context
        )
        if not raw_response:
            try:
                raw_response = try_gemini_generation(
                    user_message=user_message,
                    grounded_nodes=all_grounded_nodes,
                    current_screen=current_screen,
                    current_tier_a_id=current_tier_a_id,
                    current_leaf_id=current_leaf_id,
                    marks_profile=marks_profile,
                    web_context=web_context
                )
            except Exception as e:
                logger.warning(f"Error in try_gemini_generation: {e}")
                raw_response = None

    # 5. Semantic & Sympathy Fallback Engine
    if not raw_response:
        raw_response = analyze_and_generate_grounded_decision(
            user_message=user_message,
            event=event,
            search_hits=search_hits,
            current_screen=current_screen,
            current_tier_a_id=current_tier_a_id,
            current_leaf_id=current_leaf_id,
            marks_profile=marks_profile,
            catalog_map=catalog_map,
            audit_log=audit_log
        )

    # 6. Server-Side Validation & Honesty Sanitize
    final_payload = validate_and_sanitize_response(
        raw_response=raw_response,
        injected_node_ids=injected_node_ids,
        tool_grounded_ids=tool_grounded_ids,
        catalog_map=catalog_map,
        audit_log=audit_log
    )

    return final_payload


def has_word(text: str, words: List[str]) -> bool:
    pattern = r'\b(' + '|'.join(re.escape(w) for w in words) + r')\b'
    return bool(re.search(pattern, text, re.IGNORECASE))


def analyze_and_generate_grounded_decision(
    user_message: str,
    event: Optional[Dict[str, Any]],
    search_hits: List[Dict[str, Any]],
    current_screen: Optional[str],
    current_tier_a_id: Optional[str],
    current_leaf_id: Optional[str],
    marks_profile: Optional[Dict[str, Any]],
    catalog_map: Dict[str, Dict[str, Any]],
    audit_log: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Empathetic Student Profile & Semantic Intent Analyzer:
    Understands student mindset, questions about departments, passions for cars/design/building/animals,
    and maps them to verified catalog nodes.
    """
    msg = (user_message or "").lower().strip()
    tokens = normalize_tokens(user_message or "")

    # --- Event-Driven Proactive Comment ---
    if event and event.get("type") == "USER_CLICKED_NODE":
        node_id = event.get("node_id")
        node = catalog_map.get(node_id)
        if node:
            name = node.get("name", node_id)
            desc = node.get("one_line_description", "")
            keeps = node.get("keeps_open", [])
            rev = node.get("reversibility_note")
            
            comment = f"I see you opened **{name}**."
            if desc:
                comment += f" {desc}"
            if keeps:
                linked_names = [catalog_map[k]["name"] for k in keeps[:3] if k in catalog_map]
                if linked_names:
                    comment += f"\n\n💡 **Future Pathways Kept Open**: {', '.join(linked_names)}."
            if rev:
                comment += f"\n\n⚠️ **Switchability & Reversibility**: {rev}"

            return {
                "message": comment,
                "ui_action": {"type": "NONE"},
                "candidate_nodes": [{"id": node_id, "detail_status": node.get("detail_status", "verified")}],
                "next_question": "Would you like to explore entrance exams, cost ranges, or compare with other streams?",
                "quick_replies": ["Check Entrance Exams & Duration", "Compare with other streams", "What are the job prospects?", "Something else — I'll type it"]
            }

    # =========================================================================
    # 1. CROSS-STREAM GOALS (UPSC, IPS, IAS, NDA, Police, Banking, SSC, Railways)
    # Must precede keyword-based domain checks so "become an IPS officer or clear UPSC" doesn't hit partial word matches.
    # =========================================================================
    if any(k in msg for k in ["upsc", "ias", "ips", "civil services", "nda", "police", "sub inspector", "ssc cgl", "railway", "bank po", "banking", "defence exam", "army", "air force"]):
        cross_goals = tool_get_cross_stream_goals(list(catalog_map.values()), user_message)
        message = (
            "Great aspiration! In India, premier competitive public careers like **Civil Services (IAS / IPS / IFS)**, "
            "**State Police & Armed Forces**, and **Banking Exams** can be entered from **any undergraduate stream**.\n\n"
            "💡 **Key Facts & Strategy**:\n"
            "• **Works from any stream**: You can choose Humanities, Commerce, or Science in 11th-12th and graduate with any recognized Bachelor's degree (BA, B.Com, B.Sc, B.Tech, LL.B).\n"
            "• **Eligibility**: Class 12 pass for NDA; Bachelor's degree + minimum 21 years for UPSC CSE & State PSCs.\n"
            "• **Flexibility**: Many students choose Humanities or Commerce to build strong foundations in Polity, History, and Economics while preparing."
        )
        return {
            "message": message,
            "ui_action": {
                "type": "NAVIGATE_TO",
                "screen": "goals",
                "tier_a_id": None,
                "leaf_id": None,
                "highlight_ids": [g["id"] for g in cross_goals[:4]] if cross_goals else ["civil_services_any_stream", "police_sub_inspector_entry", "nda"]
            },
            "candidate_nodes": [
                {"id": g["id"], "detail_status": g.get("detail_status", "verified")} for g in cross_goals[:4]
            ] if cross_goals else [{"id": "civil_services_any_stream", "detail_status": "verified"}],
            "next_question": "Which specific service are you aiming for? Civil Services (IAS/IPS), Defence (NDA), or Banking?",
            "quick_replies": [
                "Civil Services (IAS / IPS)",
                "National Defence Academy (NDA)",
                "State Police & Sub-Inspector",
                "Banking & Financial Services (PO)",
                "Something else — I'll type it"
            ]
        }

    # =========================================================================
    # 2. EXPLANATIONS OF DEPARTMENTS / DISCIPLINES ("What is Mechanical?", "What is CS?", etc.)
    # =========================================================================
    if any(k in msg for k in ["what is mechanical", "what is mechnical", "what does mechanical", "tell me about mechanical", "explain mechanical", "mechanical branch"]):
        message = (
            "**Mechanical Engineering** is all about designing, building, and maintaining physical machines, engines, power systems, and moving mechanisms!\n\n"
            "🔧 **What You Actually Study & Do**:\n"
            "• Machine Design & CAD drafting\n"
            "• Thermodynamics, internal combustion engines & electric drivetrains\n"
            "• Manufacturing, workshop fabrication, hydraulics & robotics\n\n"
            "🚀 **How You Can Pursue It After 10th**:\n"
            "1. **3-Year Polytechnic Diploma in Mechanical Engineering**: Starts right after 10th with heavy workshop training (and allows **Lateral Entry directly into 2nd year B.Tech**).\n"
            "2. **Science (PCM) in 11th-12th → 4-Year B.Tech in Mechanical Engineering** (via JEE / State CETs).\n"
            "3. **ITI Fitter / Turner (1–2 Years)**: Practical machinist trade certification."
        )

        return {
            "message": message,
            "ui_action": {
                "type": "NAVIGATE_TO",
                "screen": "detail",
                "tier_a_id": "diploma_polytechnic",
                "leaf_id": "diploma_mechanical_engineering",
                "highlight_ids": ["diploma_mechanical_engineering", "btech_mechanical_engineering", "iti_fitter"]
            },
            "candidate_nodes": [
                {"id": "diploma_mechanical_engineering", "detail_status": "verified"},
                {"id": "btech_mechanical_engineering", "detail_status": "verified"}
            ],
            "next_question": "Do you prefer the hands-on 3-Year Polytechnic Diploma route or standard 11-12 PCM + B.Tech degree route?",
            "quick_replies": [
                "3-Year Polytechnic Diploma in Mechanical",
                "Standard 11-12 Science (PCM) + B.Tech",
                "Tell me about Automobile Engineering",
                "Something else — I'll type it"
            ]
        }

    # =========================================================================
    # 3. COMPUTING, SOFTWARE & COMPUTER TECHNOLOGY ("Is B.Tech Computer Technology worth studying?", "What is CSE?", etc.)
    # =========================================================================
    if any(k in msg for k in [
        "computer technology", "computer science", "cse", "coding", "software engineer",
        "data science", "information technology", "b.tech computer", "btech computer", "btech cse", "b.tech cs", "btech cs"
    ]) or (has_word(msg, ["computer", "computers", "coding", "software", "cse", "cs", "programming"]) and any(w in msg for w in ["worth", "good", "scope", "study", "studying", "career", "salary", "what", "how", "btech", "degree", "diploma"])):
        is_worth_query = any(w in msg for w in ["worth", "good", "scope", "value", "future", "salary", "package", "job", "career", "roi"])
        
        if is_worth_query:
            message = (
                "**B.Tech in Computer Science & Engineering (CSE) / Computer Technology is definitely one of the highest-ROI, most in-demand technical degrees today!**\n\n"
                "🚀 **Why It Is Worth Studying**:\n"
                "• **Massive Career Scope**: Enormous global hiring across Software Engineering, Cloud Architecture, AI & Machine Learning, Cybersecurity, and High-Frequency FinTech.\n"
                "• **Top Placement & Compensation**: Consistently commands the highest starting campus placement packages across Indian engineering institutions.\n"
                "• **High Flexibility**: Enables global remote careers, freelancing, and rapid tech entrepreneurship/startups.\n\n"
                "💡 **How You Can Enter It After 10th**:\n"
                "1. **Class 11-12 with Science (PCM)** → 4-Year B.Tech CSE (Admission via JEE Main, BITSAT, State CETs).\n"
                "2. **3-Year Polytechnic Diploma in Computer Engineering** → Direct **Lateral Entry into 2nd year B.Tech CSE**!\n\n"
                "⚠️ *Key Reality Check*: You need strong mathematical logic, algorithmic problem-solving aptitude, and continuous curiosity for coding to truly excel."
            )
        else:
            message = (
                "**Computer Science & Engineering** focuses on the design, development, and architecture of software systems, algorithms, AI models, and computational platforms.\n\n"
                "🔧 **What You Actually Study & Build**:\n"
                "• Programming (Python, C++, Java, Rust), Data Structures & Algorithms\n"
                "• Operating Systems, Database Architecture & Cloud Networks\n"
                "• Machine Learning, Web Technologies & Cyber Defense\n\n"
                "🚀 **How to Pursue After 10th**:\n"
                "1. **Science (PCM) in 11-12th** → 4-Year B.Tech CSE (via JEE Main/Advanced, State CETs).\n"
                "2. **3-Year Polytechnic Diploma in Computer Engineering** (Starts right after 10th with Lateral Entry to 2nd year B.Tech)."
            )

        return {
            "message": message,
            "ui_action": {
                "type": "NAVIGATE_TO",
                "screen": "detail",
                "tier_a_id": "science_pcm",
                "leaf_id": "btech_computer_science_engineering",
                "highlight_ids": ["btech_computer_science_engineering", "diploma_computer_engineering", "bsc_data_science"]
            },
            "candidate_nodes": [
                {"id": "btech_computer_science_engineering", "detail_status": "verified"},
                {"id": "diploma_computer_engineering", "detail_status": "verified"},
                {"id": "bsc_data_science", "detail_status": "verified"}
            ],
            "next_question": "Do you want to explore the 4-Year B.Tech CSE degree route (via 11-12 PCM) or the direct 3-Year Polytechnic Diploma route?",
            "quick_replies": [
                "4-Year B.Tech CSE (11-12 PCM)",
                "3-Year Diploma in Computer Engineering",
                "Explore B.Sc Data Science & AI",
                "Something else — I'll type it"
            ]
        }

    # =========================================================================
    # 3. VEHICLES, CARS, AUTOMOBILES, ENGINES & EV
    # Examples: "i like vehicles and cars", "i love cars", "automobile engineer"
    # =========================================================================
    if has_word(msg, [
        "car", "cars", "vehicle", "vehicles", "automobile", "automobiles", "automotive",
        "bike", "bikes", "motorcycle", "motorcycles", "engine", "engines", "ev", "electric vehicle"
    ]) or any(t in ["vehicle", "vehicles", "car", "cars", "automobile", "automobiles"] for t in tokens):
        message = (
            "If you are fascinated by **cars, motorbikes, engines, and vehicle technology**, here are the exact pathways to become an automotive specialist:\n\n"
            "1. **Diploma in Automobile Engineering (3 Years)**:\n"
            "• Direct study of vehicle suspension, chassis, engine tuning, EV battery systems, and transmission.\n"
            "• Eligible for direct **Lateral Entry into 2nd Year B.Tech Automobile / Mechanical**!\n\n"
            "2. **Diploma in Mechanical Engineering (3 Years)**:\n"
            "• Broadest foundation covering both automotive systems and industrial machinery.\n\n"
            "3. **ITI Mechanic (Automobile / Diesel) (1–2 Years)**:\n"
            "• Certified technician trade for vehicle assembly, diagnosis, and authorized dealership servicing."
        )

        return {
            "message": message,
            "ui_action": {
                "type": "NAVIGATE_TO",
                "screen": "detail",
                "tier_a_id": "diploma_polytechnic",
                "leaf_id": "diploma_automobile_engineering",
                "highlight_ids": ["diploma_automobile_engineering", "diploma_mechanical_engineering", "iti_mechanic_auto"]
            },
            "candidate_nodes": [
                {"id": "diploma_automobile_engineering", "detail_status": "verified"},
                {"id": "diploma_mechanical_engineering", "detail_status": "verified"},
                {"id": "iti_mechanic_auto", "detail_status": "verified"}
            ],
            "next_question": "Would you like to explore Diploma in Automobile Engineering, Mechanical Engineering, or ITI Auto Mechanic?",
            "quick_replies": [
                "Diploma in Automobile Engineering",
                "Diploma in Mechanical Engineering",
                "ITI Auto Mechanic Certification",
                "How does B.Tech Lateral Entry work?",
                "Something else — I'll type it"
            ]
        }

    # =========================================================================
    # 4. CREATIVE / VISUAL / DRAWING / DESIGNING PASSION
    # Examples: "i like designing", "no bro i like drawing too", "i love sketch and art"
    # =========================================================================
    if has_word(msg, [
        "design", "designing", "drawing", "draw", "sketch", "sketching", "art", "creative",
        "painting", "visual", "animation", "animating", "game design", "video game", "gaming", "craft", "fashion"
    ]) or any(t in ["drawing", "draw", "design", "designing", "sketch", "art"] for t in tokens):
        message = (
            "Got it! Having a passion for **drawing, visual design, and creative creation** opens up high-growth professional careers! "
            "You do not have to follow conventional theory-heavy routes to build a successful career.\n\n"
            "Here are the top direct design & visual pathways available after Class 10/12:\n\n"
            "1. **Bachelor of Design (B.Des – 4 Years)**: Specialized in Industrial Product Design, UI/UX Digital Design, Fashion, and Visual Communication. "
            "*(Admission via national design entrance exams like UCEED, NID DAT, NIFT)*.\n\n"
            "2. **Animation, VFX & Game Art**: 3D character design, game level creation, and visual storytelling.\n\n"
            "3. **Fine Arts (BFA)**: Applied illustration, sculpture, digital painting, and visual arts.\n\n"
            "4. **Architecture (B.Arch – 5 Years)**: Combines creative architectural drafting with structural physics (Requires PCM + NATA exam)."
        )

        return {
            "message": message,
            "ui_action": {
                "type": "NAVIGATE_TO",
                "screen": "drill_in",
                "tier_a_id": "humanities",
                "leaf_id": None,
                "highlight_ids": ["humanities", "design_bdes", "fine_arts_bfa"]
            },
            "candidate_nodes": [
                {"id": "humanities", "detail_status": "verified"},
                {"id": "design_bdes", "detail_status": "verified"},
                {"id": "fine_arts_bfa", "detail_status": "verified"}
            ],
            "next_question": "Which area of design excites you most? Digital UI/UX & Products, 3D Game Art & Animation, or Building Architecture?",
            "quick_replies": [
                "Digital UI/UX & Product Design (B.Des)",
                "3D Animation & Video Game Art",
                "Architecture & Building Design (B.Arch)",
                "Fine Arts & Illustration (BFA)",
                "Something else — I'll type it"
            ]
        }

    # =========================================================================
    # 5. HANDS-ON / PRACTICAL MAKERS vs ROTE THEORY
    # Example: "I like building things, but not good in theoretical stuff"
    # =========================================================================
    if any(phrase in msg for phrase in [
        "not good in theoretical", "not good at theory", "hate theory", "hate memorizing",
        "prefer practical", "dislike theory", "boring theory", "making things", "hands on", "hands-on", "workshop"
    ]) or has_word(msg, ["building", "build", "fitter", "welder", "lathe", "mechanic", "machinist"]):
        diploma_node = catalog_map["diploma_polytechnic"]
        iti_node = catalog_map["iti"]

        message = (
            "It sounds like you thrive when working with **real physical systems, building, and hands-on application**, "
            "rather than memorizing abstract textbooks. That is a major strength in the engineering and industrial world!\n\n"
            "Here are the two best direct practical pathways designed specifically for students like you:\n\n"
            "1. **Diploma / Polytechnic (3 Years)**: Direct technical training in workshops and labs (Mechanical, Automobile, Electrical, Computer, Civil). "
            "💡 *Huge Advantage*: You get **Lateral Entry directly into the 2nd year of B.Tech degree**, so you never lose academic time if you decide to get an engineering degree later!\n\n"
            "2. **ITI Vocational Trades (1–2 Years)**: Quick, certified hands-on skill training (Electrician, Fitter, Mechanic, Draughtsman) with direct industry apprenticeship."
        )

        return {
            "message": message,
            "ui_action": {
                "type": "NAVIGATE_TO",
                "screen": "drill_in",
                "tier_a_id": "diploma_polytechnic",
                "leaf_id": None,
                "highlight_ids": ["diploma_polytechnic", "iti"]
            },
            "candidate_nodes": [
                {"id": "diploma_polytechnic", "detail_status": "verified"},
                {"id": "iti", "detail_status": "verified"}
            ],
            "next_question": "Let's explore the branches inside Polytechnic Diploma. Are you drawn to Automobile/Mechanical, Electrical/Electronics, or Software/Computer engineering?",
            "quick_replies": [
                "Automobile & Mechanical Diploma",
                "Electrical & Electronics Diploma",
                "Computer Engineering Diploma",
                "Tell me about ITI Trade Certifications",
                "Something else — I'll type it"
            ]
        }

    # =========================================================================
    # 6. CARING FOR ANIMALS / VETERINARY / LIVING BIOLOGY
    # Example: "i want to go veterinary", "i love pets and animals"
    # =========================================================================
    if has_word(msg, ["veterinary", "animal", "animals", "pet", "pets", "vet", "wildlife", "zoology"]) or any(t in ["veterinary", "vet", "animal", "animals"] for t in tokens):
        vet_node = catalog_map["bvsc_veterinary"]
        pcb_node = catalog_map["science_pcb"]

        message = (
            "Veterinary medicine is a wonderful, highly respected profession! "
            "To become a certified veterinary doctor (**B.V.Sc & AH – Bachelor of Veterinary Science & Animal Husbandry**), here is how the path works:\n\n"
            "• **Class 11-12 Stream Required**: **Science (PCB)** with Physics, Chemistry, Biology, and English (minimum 50% aggregate marks).\n"
            "• **Entrance Exam**: **NEET-UG** (for 15% All-India Quota via Veterinary Council of India - VCI) plus State Veterinary Entrance CETs.\n"
            "• **Course Duration**: 5.5 years (4.5 years of clinical academic coursework + 1-year mandatory rotating internship).\n"
            "• **Reversibility Note**: Highly specialized clinical training; switching late to non-bio fields requires fresh enrollment."
        )

        return {
            "message": message,
            "ui_action": {
                "type": "NAVIGATE_TO",
                "screen": "detail",
                "tier_a_id": "science_pcb",
                "leaf_id": "bvsc_veterinary",
                "highlight_ids": ["bvsc_veterinary", "science_pcb"]
            },
            "candidate_nodes": [
                {"id": "bvsc_veterinary", "detail_status": "verified"},
                {"id": "science_pcb", "detail_status": "verified"}
            ],
            "next_question": "Would you like to see how Veterinary compares to MBBS, Agricultural Sciences, or Biotechnology in terms of entrance competition?",
            "quick_replies": [
                "Compare Veterinary with MBBS & BDS",
                "Explore B.Sc Agriculture & Biotech",
                "Show Science PCB Stream Overview",
                "Something else — I'll type it"
            ]
        }

    # =========================================================================
    # 7. STREAM-SPECIFIC JOB PROSPECTS & SALARY SCOPE ENGINE
    # =========================================================================
    if any(k in msg for k in [
        "job prospect", "job prospects", "job scope", "future scope", "career scope",
        "what jobs", "job opportunities", "career opportunities", "salary in", "scope of",
        "salary", "placement", "package", "earning potential", "what can i become"
    ]):
        target_stream = current_tier_a_id or ""
        if "commerce" in msg or "account" in msg or "finance" in msg or "ca" in msg:
            target_stream = "commerce"
        elif "pcmb" in msg or "biotech" in msg or "biomedical" in msg:
            target_stream = "science_pcmb"
        elif "pcb" in msg or "medical" in msg or "doctor" in msg or "biology" in msg:
            target_stream = "science_pcb"
        elif "pcm" in msg or "engineering" in msg or "software" in msg or "tech" in msg:
            target_stream = "science_pcm"
        elif "humanities" in msg or "arts" in msg or "law" in msg:
            target_stream = "humanities"
        elif "diploma" in msg or "polytechnic" in msg:
            target_stream = "diploma_polytechnic"
        elif "iti" in msg or "trade" in msg:
            target_stream = "iti"

        if target_stream in ("commerce", "tier_a_commerce"):
            message = (
                "📈 **Career Scope & Job Prospects in Commerce**:\n\n"
                "• **Top Professional Roles**: Chartered Accountant (CA), Investment Banking Analyst, Corporate Financial Analyst (CFA), Company Secretary (CS), Management Consultant, Risk & Tax Advisor.\n"
                "• **Top Hiring Industries**: Big 4 Accounting Firms (Deloitte, PwC, EY, KPMG), Investment Banks (Goldman Sachs, Morgan Stanley), Multi-National Corporations, FinTech startups.\n"
                "• **Realistic Compensation**: Starting ₹5L – ₹11L PA for fresh graduates/CAs, growing to ₹18L – ₹35L+ PA after 5 years with advanced credentials (CA / CFA / MBA Finance).\n"
                "• **Key Advantage**: Immediate integration with the corporate business engine and rapid leadership progression."
            )
            ui_tier = "commerce"
        elif target_stream in ("science_pcmb", "tier_a_science_pcmb"):
            message = (
                "🔬 **Career Scope & Job Prospects in Science (PCMB)**:\n\n"
                "• **Top Interdisciplinary Roles**: Biomedical Engineer, Bioinformatics Scientist, Genetic Data Specialist, Food & Beverage Technologist, Computational Biologist, Biophysics Researcher.\n"
                "• **Dual-Domain Access**: You retain **100% eligibility for JEE Engineering** AND **100% eligibility for NEET Medical / Healthcare**, plus specialized hybrid sectors.\n"
                "• **Top Hiring Industries**: MedTech & Medical Devices (Siemens Healthineers, GE Healthcare), Genomic Research Labs, Agri-Tech & Food Giants, Pharmaceutical R&D.\n"
                "• **Realistic Compensation**: Starting ₹5L – ₹12L PA, scaling to ₹18L – ₹40L+ PA in specialized clinical AI & biomedical development."
            )
            ui_tier = "science_pcmb"
        elif target_stream in ("science_pcb", "tier_a_science_pcb"):
            message = (
                "🩺 **Career Scope & Job Prospects in Science (PCB)**:\n\n"
                "• **Top Healthcare & Bio Roles**: Medical Doctor (MBBS / MD), Dental Surgeon (BDS), Clinical Research Associate, Pharmacologist, Veterinary Doctor (BVSc), Physiotherapist (BPT), Nursing Officer.\n"
                "• **Top Hiring Industries**: Multi-Specialty Hospital Chains (Apollo, Fortis, AIIMS), Global Pharmaceutical Companies (Sun Pharma, Pfizer, Cipla), Diagnostic & Clinical Trials Networks.\n"
                "• **Realistic Compensation**: Starting ₹4.5L – ₹10L PA (junior resident / clinical specialist), growing significantly with MD/MS clinical specialization or pharma leadership."
            )
            ui_tier = "science_pcb"
        elif target_stream in ("science_pcm", "tier_a_science_pcm"):
            message = (
                "💻 **Career Scope & Job Prospects in Science (PCM)**:\n\n"
                "• **Top Technical Roles**: Software Architect, AI/ML Engineer, Cloud & DevOps Specialist, Robotics & Autonomous Systems Engineer, Aerospace / Defense Specialist, Commercial Pilot.\n"
                "• **Top Hiring Industries**: Global Tech Giants (Google, Microsoft, Amazon), Aerospace & Defense (ISRO, DRDO, Boeing), High-Tech Automotive (Tata, Tesla, Mahindra), FinTech.\n"
                "• **Realistic Compensation**: Starting ₹4.5L – ₹14L PA from top institutes, scaling rapidly to ₹20L – ₹45L+ PA after 4-5 years of specialized engineering experience."
            )
            ui_tier = "science_pcm"
        elif target_stream in ("humanities", "humanities_arts", "tier_a_humanities"):
            message = (
                "⚖️ **Career Scope & Job Prospects in Humanities & Social Sciences**:\n\n"
                "• **Top Modern Roles**: Corporate Lawyer (via 5-Year Integrated BA LLB / CLAT), Civil Servant (IAS / IPS / IFS), UI/UX Content Strategist & Design Researcher, Public Policy Analyst, Brand Communications Director, Clinical Psychologist.\n"
                "• **Top Hiring Sectors**: Tier-1 Law Firms (Shardul Amarchand, AZB, Trilegal), Government Administration, Think Tanks, Tech Companies (UX & Policy teams), Global Media Networks.\n"
                "• **Realistic Compensation**: Corporate Law starts at ₹9L – ₹18L PA; UX/Policy/Media roles start at ₹4.5L – ₹9L PA, scaling to ₹15L – ₹30L+ PA."
            )
            ui_tier = "humanities"
        elif target_stream in ("diploma_polytechnic", "tier_a_diploma"):
            message = (
                "🔧 **Career Scope & Job Prospects in Polytechnic Diploma**:\n\n"
                "• **Top Technical Roles**: Junior Engineer (JE in Indian Railways, PSUs like BHEL/NTPC/ONGC, State Public Works), CAD/CAM Design Specialist, Automation & PLC Programmer, Field Maintenance Supervisor.\n"
                "• **Lateral Entry Degree Advantage**: Direct entry into **2nd Year B.Tech**, achieving full parity with standard 4-year engineering graduates while having superior hands-on lab experience.\n"
                "• **Realistic Compensation**: Starting Diploma JE roles: ₹2.5L – ₹5L PA; after completing Lateral Entry B.Tech: ₹7L – ₹18L+ PA."
            )
            ui_tier = "diploma_polytechnic"
        else:
            message = (
                "🛠️ **Career Scope & Job Prospects in ITI Trades**:\n\n"
                "• **Certified Roles**: Industrial Electrician, CNC Machine Programmer, Automotive / EV Service Technician, Precision Fitter, Heavy Machinery Fabricator.\n"
                "• **Top Hiring Sectors**: Railway Workshops, Metro Rail Corporations, Automobile Assembly Lines (Maruti, Hyundai, Tata), Power Utilities, and Overseas Contracting (Gulf & Europe).\n"
                "• **Realistic Compensation**: Starting ₹2L – ₹4.5L PA + overtime and independent freelancing/contracting opportunities."
            )
            ui_tier = "iti"

        return {
            "message": message,
            "ui_action": {
                "type": "NAVIGATE_TO",
                "screen": "drill_in",
                "tier_a_id": ui_tier,
                "leaf_id": None,
                "highlight_ids": [ui_tier]
            },
            "candidate_nodes": [
                {"id": ui_tier, "detail_status": "verified"}
            ],
            "next_question": "Would you like to explore the specific degree courses or entrance exam pathways for this stream?",
            "quick_replies": [
                "Show Specific Degree Pathways",
                "Compare Salaries with Other Streams",
                "Check Minimum Marks Needed",
                "Something else — I'll type it"
            ]
        }

    # =========================================================================
    # 8. OUT-OF-CATALOG CAREERS GUIDANCE & REASONING (Specialized / Modern Fields)
    # =========================================================================
    if any(k in msg for k in ["pilot", "commercial pilot", "aviation", "flying", "fly plane"]):
        return {
            "message": (
                "✈️ **How to Become a Commercial Pilot in India**:\n\n"
                "• **Class 11-12 Stream Required**: **Science (PCM)** — You must pass Class 12 with **Physics and Mathematics** (minimum 50% aggregate marks).\n"
                "• **Training Route**: Commercial Pilot License (CPL) through a DGCA-approved Flying Training Organization (e.g., IGRUA Amethi, National Flying Training Institute - NFTI).\n"
                "• **Exams & Medicals**: Class 2 and Class 1 DGCA Medical Examination + DGCA Theory exams (Air Navigation, Meteorology, Air Regulations, Technical General/Specific).\n"
                "• **Career Scope & Compensation**: Starting First Officer salaries range from **₹1.5L – ₹3L per month (₹18L – ₹36L PA)**, growing to Captain packages (₹60L – ₹90L+ PA).\n\n"
                "💡 *Foundation in Catalog*: In Class 11-12, enroll in **Science (PCM)**."
            ),
            "ui_action": {
                "type": "NAVIGATE_TO",
                "screen": "drill_in",
                "tier_a_id": "science_pcm",
                "leaf_id": None,
                "highlight_ids": ["science_pcm"]
            },
            "candidate_nodes": [{"id": "science_pcm", "detail_status": "verified"}],
            "next_question": "Would you like to explore Science (PCM) courses or other aerospace technical routes?",
            "quick_replies": ["Explore Science (PCM) Stream", "Tell me about Aerospace Engineering", "Something else — I'll type it"]
        }

    if any(k in msg for k in ["merchant navy", "nautical science", "marine engineering", "ship captain"]):
        return {
            "message": (
                "🚢 **How to Join Merchant Navy in India**:\n\n"
                "• **Class 11-12 Stream Required**: **Science (PCM)** with minimum 60% aggregate in PCM and 50% in English in Class 12.\n"
                "• **Degree Routes**:\n"
                "  1. **B.Sc in Nautical Science (3 Years)** → Deck Officer / Navigation route leading to Ship Captain.\n"
                "  2. **B.Tech in Marine Engineering (4 Years)** → Ship Engine & Power Systems Officer.\n"
                "• **Entrance Exam**: **IMU-CET** (Indian Maritime University Common Entrance Test) + mandatory DG Shipping Medical Fitness (6/6 eyesight without color blindness).\n"
                "• **Career Scope & Compensation**: High international tax-free salaries: Starting Junior Officers earn **₹50,000 – ₹1.5L/month**, growing to **₹6L – ₹12L/month** for Chief Engineers and Captains."
            ),
            "ui_action": {
                "type": "NAVIGATE_TO",
                "screen": "drill_in",
                "tier_a_id": "science_pcm",
                "leaf_id": None,
                "highlight_ids": ["science_pcm"]
            },
            "candidate_nodes": [{"id": "science_pcm", "detail_status": "verified"}],
            "next_question": "Do you prefer the Navigation Deck Officer route (B.Sc Nautical Science) or Machine Engineering route (B.Tech Marine)?",
            "quick_replies": ["B.Sc Nautical Science (Deck)", "B.Tech Marine Engineering", "Show Science (PCM) Overview", "Something else — I'll type it"]
        }

    if any(k in msg for k in ["ethical hack", "cyber security", "cyber defense", "penetration test", "hacker"]):
        return {
            "message": (
                "🛡️ **How to Become an Ethical Hacker / Cybersecurity Specialist**:\n\n"
                "• **Stream Options After 10th**:\n"
                "  1. **Class 11-12 Science (PCM)** → 4-Year B.Tech in CSE (Cybersecurity / Information Security specialization).\n"
                "  2. **3-Year Polytechnic Diploma in Computer Engineering** → Lateral Entry to B.Tech CSE.\n"
                "• **Key Professional Certifications**: CEH (Certified Ethical Hacker), OSCP (Offensive Security Certified Professional), CompTIA Security+, CISSP.\n"
                "• **Career Roles**: Penetration Tester, Incident Response Specialist, SOC Analyst, Security Architect, Cyber Forensic Investigator.\n"
                "• **Compensation**: Starting **₹5L – ₹12L PA**, scaling rapidly to **₹20L – ₹45L+ PA** as cybersecurity skills face acute worldwide talent shortages."
            ),
            "ui_action": {
                "type": "NAVIGATE_TO",
                "screen": "detail",
                "tier_a_id": "science_pcm",
                "leaf_id": "btech_computer_science_engineering",
                "highlight_ids": ["btech_computer_science_engineering", "diploma_computer_engineering"]
            },
            "candidate_nodes": [
                {"id": "btech_computer_science_engineering", "detail_status": "verified"},
                {"id": "diploma_computer_engineering", "detail_status": "verified"}
            ],
            "next_question": "Would you like to see the B.Tech Computer Science pathway or the hands-on 3-Year Diploma route?",
            "quick_replies": ["B.Tech Computer Science & Engineering", "Diploma in Computer Engineering", "Something else — I'll type it"]
        }

    # =========================================================================
    # 9. DYNAMIC FUZZY SEARCH MATCH (e.g. Biotechnology, Pilot, CA, Law, Electronics, etc.)
    # =========================================================================
    if search_hits and len(search_hits) > 0:
        top_node = search_hits[0]
        node_name = top_node.get("name", top_node["id"])
        node_tier = top_node.get("tier", "B")
        parent_id = top_node.get("parent_id")
        parent_node = catalog_map.get(parent_id) if parent_id else None

        elig = top_node.get("eligibility", {})
        stream_req = elig.get("stream_required") or (parent_node.get("name") if parent_node else "Specific stream required")
        exam = elig.get("entrance_exam")
        duration = top_node.get("duration")
        rev = top_node.get("reversibility_note")

        message = f"To pursue **{node_name}**, here are the exact verified requirements:\n\n"
        message += f"• **Class 11-12 Stream Required**: {stream_req}\n"
        if exam:
            message += f"• **Entrance Exam**: {exam}\n"
        if duration:
            message += f"• **Program Duration**: {duration}\n"
        if elig.get("min_marks_note"):
            message += f"• **Marks Eligibility**: {elig['min_marks_note']}\n"
        if rev:
            message += f"• **Switchability / Reversibility**: {rev}\n"

        if marks_profile and (marks_profile.get("math_performance") == "Struggling" or marks_profile.get("science_performance") == "Struggling"):
            if parent_id in ("science_pcm", "science_pcb", "science_pcmb"):
                message += "\n📌 *This pathway typically requires consistently strong Math/Science performance — based on what you entered, this may take extra dedication, but it is by no means blocked.*"

        ui_action = {
            "type": "NAVIGATE_TO",
            "screen": "detail" if node_tier == "B" else "drill_in",
            "tier_a_id": parent_id if node_tier == "B" else top_node["id"],
            "leaf_id": top_node["id"] if node_tier == "B" else None,
            "highlight_ids": [top_node["id"]]
        }

        candidates = [{"id": top_node["id"], "detail_status": top_node.get("detail_status", "verified")}]
        if parent_node:
            candidates.append({"id": parent_node["id"], "detail_status": "verified"})

        return {
            "message": message,
            "ui_action": ui_action,
            "candidate_nodes": candidates,
            "next_question": f"Would you like to explore alternative pathways in {parent_node['name'] if parent_node else 'related streams'} or check entrance exams?",
            "quick_replies": [
                f"Show {parent_node['name'] if parent_node else 'Stream Details'}",
                "Check Career Specializations",
                "Compare with other streams",
                "Something else — I'll type it"
            ]
        }

    # =========================================================================
    # 7. OPEN COMPILATION ORIENTATION
    # =========================================================================
    return {
        "message": (
            "I'm here to help you navigate your options after 10th! Tell me about what excites you or how you like to learn:\n\n"
            "• **Building & Hands-on**: Making physical things, machines, vehicles, electronics (Diploma / ITI)\n"
            "• **Logic & Technology**: Coding, computers, problem solving, mathematics (Science PCM)\n"
            "• **Life Sciences & Healthcare**: Animals, biology, medicine, healing people (Science PCB)\n"
            "• **Business & Commerce**: Finance, startups, economics, accounting (Commerce)\n"
            "• **Creative & Human Sciences**: Drawing, visual design, law, writing, public policy (Humanities / Arts)"
        ),
        "ui_action": {
            "type": "HIGHLIGHT_CARDS",
            "screen": "landing",
            "tier_a_id": None,
            "leaf_id": None,
            "highlight_ids": ["science_pcm", "commerce_math", "diploma_polytechnic", "humanities"]
        },
        "candidate_nodes": [
            {"id": "science_pcm", "detail_status": "verified"},
            {"id": "commerce_math", "detail_status": "verified"},
            {"id": "diploma_polytechnic", "detail_status": "verified"},
            {"id": "humanities", "detail_status": "verified"}
        ],
        "next_question": "Which of these learning styles fits you best?",
        "quick_replies": [
            "Hands-on building & machines",
            "Vehicles, cars & engines",
            "Creative visual design & drawing",
            "Biology & animal sciences",
            "Logic, computing & tech",
            "Something else — I'll type it"
        ]
    }
