import json
import os
import pandas as pd
import glob

print("--- CHECKING NOTEBOOK 1 CALCULATIONS ---")
with open("project.ipynb", "r", encoding="utf-8") as f:
    nb1 = json.load(f)

for idx, cell in enumerate(nb1["cells"]):
    src = "".join(cell.get("source", []))
    if any(k in src for k in ["PRCPTOT", "SDII", "CWD", "CDD", "wet_day"]):
        for line in src.split("\n"):
            if any(term in line for term in ["1.0", "threshold", "Wet_Days", "PRCPTOT", "SDII", "CWD", "CDD", "cdd", "cwd"]):
                if any(op in line for op in [">=", ">", "=", "def ", "lambda"]):
                    print(f"Cell {idx}: {line.strip()}")

print("\n--- CHECKING TABLES AND EXACT STATS ---")
# Check annual rainfall stats
if os.path.exists("outputs/tables/annual_rainfall_statistics_2000_2025.csv"):
    df_ann = pd.read_csv("outputs/tables/annual_rainfall_statistics_2000_2025.csv")
    print("Annual rainfall statistics head/summary:")
    print(df_ann.head(2))
    print("Columns:", df_ann.columns.tolist())

if os.path.exists("outputs/tables/PRCPTOT_SDII_trend_analysis.csv"):
    df_ps = pd.read_csv("outputs/tables/PRCPTOT_SDII_trend_analysis.csv")
    print("\nPRCPTOT & SDII Trend analysis:")
    print(df_ps)

if os.path.exists("outputs/tables/CDD_CWD_temporal_trend_analysis.csv"):
    df_cc = pd.read_csv("outputs/tables/CDD_CWD_temporal_trend_analysis.csv")
    print("\nCDD & CWD Temporal Trend analysis:")
    print(df_cc)

if os.path.exists("outputs/tables/friedman_seasonal_test_summary.csv"):
    df_fr = pd.read_csv("outputs/tables/friedman_seasonal_test_summary.csv")
    print("\nFriedman seasonal test:")
    print(df_fr)

# Check Project 2 stats
print("\n--- CHECKING PROJECT 2 STATS ---")
for t in ["departure_reliability_summary.csv", "district_actual_vs_normal_paired_analysis.csv", "top_20_extreme_district_rainfall_events.csv"]:
    p = os.path.join("outputs_project2/tables", t)
    if os.path.exists(p):
        print(f"\n{t}:")
        df = pd.read_csv(p)
        print(df.head(3))
