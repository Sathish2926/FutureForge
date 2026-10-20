import pandas as pd

f = "data/FutureForge_College_Recommendation_500_CrossWeb_Enriched_2026.xlsx"
x = pd.ExcelFile(f)

for sheet in x.sheet_names:
    df = pd.read_excel(f, sheet_name=sheet, nrows=0)
    print("\n---", sheet, "---")
    for col in df.columns:
        print("  ", col)
