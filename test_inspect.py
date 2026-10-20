import re
from app.services.professional_planner_service import CURATED_ROLES_DATA, LEARNING_RESOURCES_DATA

print("CURATED_ROLES_DATA length:", len(CURATED_ROLES_DATA))
for r in CURATED_ROLES_DATA:
    print("-", r["slug"], ":", r["title"], "(", r.get("industry"), ")")
print("LEARNING_RESOURCES_DATA length:", len(LEARNING_RESOURCES_DATA))
