import pandas as pd
import glob, os

print("=== PRCPTOT & SDII TRENDS ===")
df_ps = pd.read_csv("outputs/tables/PRCPTOT_SDII_trend_analysis.csv")
print(df_ps.to_string())

print("\n=== CDD & CWD TEMPORAL TRENDS ===")
df_cc = pd.read_csv("outputs/tables/CDD_CWD_temporal_trend_analysis.csv")
print(df_cc.to_string())

print("\n=== SPATIAL TREND SUMMARIES ===")
for tbl in ["PRCPTOT_SDII_spatial_trend_results.csv", "R10mm_R20mm_spatial_trend_results.csv", "Rx1day_Rx5day_spatial_trend_results.csv", "CWD_CDD_spatial_trend_results.csv"]:
    p = os.path.join("outputs/tables", tbl)
    if os.path.exists(p):
        df = pd.read_csv(p)
        print(f"\n--- {tbl} ---")
        print("Shape:", df.shape)
        print("Columns:", df.columns.tolist())
        print(df.head(2).to_string())
        # Check percentage of significant cells if available
        sig_cols = [c for c in df.columns if "sig" in c.lower() or "p_" in c.lower() or "fdr" in c.lower()]
        print("Significance columns:", sig_cols)

print("\n=== ZERO RAINFALL ANOMALY REGISTERS ===")
if os.path.exists("outputs/tables/zero_rainfall_anomaly_flag_register.csv"):
    df_z = pd.read_csv("outputs/tables/zero_rainfall_anomaly_flag_register.csv")
    print("Zero rainfall anomaly flag register shape:", df_z.shape)
    print("Columns:", df_z.columns.tolist())
    print(df_z.head(2).to_string())

if os.path.exists("outputs/tables/CDD_trend_sensitivity_analysis.csv"):
    df_sens = pd.read_csv("outputs/tables/CDD_trend_sensitivity_analysis.csv")
    print("\nCDD Sensitivity Analysis:")
    print(df_sens.to_string())
