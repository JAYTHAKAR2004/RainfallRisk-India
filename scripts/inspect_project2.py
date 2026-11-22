import pandas as pd
import glob, os

print("=== PROJECT 2 TABLES ===")
for tbl in ["statewise_rainfall_summary_final.csv", "statewise_actual_vs_normal_wilcoxon_holm_corrected.csv", "extreme_rainfall_validation.csv", "extreme_rainfall_geographical_state_summary.csv"]:
    p = os.path.join("outputs_project2/tables", tbl)
    if os.path.exists(p):
        df = pd.read_csv(p)
        print(f"\n--- {tbl} (shape: {df.shape}) ---")
        print(df.head(5).to_string())

# Check Welch ANOVA and Kruskal Wallis stats
print("\n--- Check ANOVA / Kruskal in project2.ipynb ---")
import json
with open("project2.ipynb", "r", encoding="utf-8") as f:
    nb2 = json.load(f)

for idx, cell in enumerate(nb2["cells"]):
    src = "".join(cell.get("source", []))
    if any(k in src for k in ["welch", "kruskal", "epsilon", "80015.5", "44.122"]):
        print(f"Cell {idx}:")
        for line in src.split("\n"):
            if any(term in line.lower() for term in ["welch", "kruskal", "f_stat", "h_stat", "p_val", "epsilon", "w =", "wilcoxon", "44.122", "80015"]):
                print("  ", line.strip())
