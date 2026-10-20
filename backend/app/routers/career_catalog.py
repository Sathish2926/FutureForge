import os
import json
from typing import List, Optional, Dict, Any
# pyrefly: ignore [missing-import]
from fastapi import APIRouter, HTTPException, Query

router = APIRouter(prefix="/api/career-catalog", tags=["career-catalog"])

DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "seeds", "class10_pathway_catalog.json")

def load_catalog_data() -> List[Dict[str, Any]]:
    if not os.path.exists(DATA_PATH):
        return []
    with open(DATA_PATH, "r", encoding="utf-8") as fp:
        return json.load(fp)


@router.get("/tier-a")
def get_tier_a_nodes():
    """
    Returns the 8 Tier-A categories for Class 10:
    Science (PCM), Science (PCB), Science (PCMB), Commerce (with Maths),
    Commerce (without Maths), Humanities/Arts, Diploma/Polytechnic, ITI.
    """
    nodes = load_catalog_data()
    tier_a = [n for n in nodes if n.get("tier") == "A"]
    return tier_a


@router.get("/tier-b")
def get_tier_b_nodes(
    parent_id: Optional[str] = Query(None, description="Filter by parent Tier-A id"),
    any_stream: Optional[bool] = Query(None, description="If true, returns only any-stream goals")
):
    """
    Returns Tier-B leaf pathway and goal nodes.
    Supports filtering by parent_id or any_stream flag.
    """
    nodes = load_catalog_data()
    tier_b = [n for n in nodes if n.get("tier") == "B"]
    
    if parent_id:
        tier_b = [n for n in tier_b if n.get("parent_id") == parent_id]
    
    if any_stream is True:
        tier_b = [n for n in tier_b if n.get("parent_id") is None or len(n.get("feeds_from", [])) >= 6]
    elif any_stream is False:
        tier_b = [n for n in tier_b if n.get("parent_id") is not None and len(n.get("feeds_from", [])) < 6]
        
    return tier_b


@router.get("/node/{node_id}")
def get_catalog_node(node_id: str):
    """
    Returns a specific catalog node by its permanent snake_case id.
    """
    nodes = load_catalog_data()
    for n in nodes:
        if n.get("id") == node_id:
            return n
    raise HTTPException(status_code=404, detail=f"Catalog node '{node_id}' not found")


@router.get("/all")
def get_all_catalog_nodes():
    """
    Returns the full catalog dataset.
    """
    return load_catalog_data()
