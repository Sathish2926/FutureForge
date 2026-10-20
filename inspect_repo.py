import re

files = [
    'frontend/src/data/degree_guidance/certificationsRegistry.ts',
    'frontend/src/data/degree_guidance/examRegistry.ts',
    'frontend/src/data/degree_guidance/govtPostsRegistry.ts',
    'frontend/src/data/degree_guidance/higherStudiesRegistry.ts',
    'frontend/src/data/degree_guidance/schemesRegistry.ts',
]

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        c = f.read()
    ids = re.findall(r'id:\s*["\']([^"\']+)["\']', c)
    print(f"{fpath}: {len(ids)} items found")
    print(f"  sample: {ids[:5]}")
