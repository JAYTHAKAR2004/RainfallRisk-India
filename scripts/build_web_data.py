"""Build verified JSON and simplified GeoJSON bundles for the RainfallRisk India web platform.

Reads ONLY from existing research outputs (`outputs/`, `outputs_project2/`, and cached
LGD boundary files in `rainfallrisk-web/.cache/`) without modifying any source datasets or notebooks.
"""

from __future__ import annotations

import json
import math
import os
import re
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
PYLIBS = ROOT / "rainfallrisk-web" / ".cache" / "pylibs"
if PYLIBS.exists():
    sys.path.insert(0, str(PYLIBS))

import numpy as np
import pandas as pd
import pyarrow.parquet as pq
from shapely import from_wkb, make_valid
from shapely.geometry import GeometryCollection, MultiPolygon, Polygon, mapping

OUT_DATA_DIR = ROOT / "public" / "data"
OUT_DATA_DIR.mkdir(parents=True, exist_ok=True)


def extract_polygonal(geom: Any) -> Any:
    """Ensure geometry is Polygon or MultiPolygon after make_valid/simplify."""
    if isinstance(geom, (Polygon, MultiPolygon)):
        return geom
    if isinstance(geom, GeometryCollection):
        polys: list[Polygon] = []
        for g in geom.geoms:
            if isinstance(g, Polygon):
                polys.append(g)
            elif isinstance(g, MultiPolygon):
                polys.extend(list(g.geoms))
        if len(polys) == 1:
            return polys[0]
        if len(polys) > 1:
            return MultiPolygon(polys)
    return geom


def clean_records(df: pd.DataFrame) -> list[dict[str, Any]]:
    """Convert DataFrame to JSON-safe list of dicts replacing NaN/Inf with None."""
    records = df.to_dict(orient="records")
    cleaned: list[dict[str, Any]] = []
    for row in records:
        item: dict[str, Any] = {}
        for k, v in row.items():
            if isinstance(v, float) and (math.isnan(v) or math.isinf(v)):
                item[k] = None
            elif hasattr(v, "item"):
                val = v.item()
                if isinstance(val, float) and (math.isnan(val) or math.isinf(val)):
                    item[k] = None
                else:
                    item[k] = val
            else:
                item[k] = v
        cleaned.append(item)
    return cleaned


def round_coords(obj: Any, precision: int = 3) -> Any:
    """Recursively round GeoJSON coordinate floats to reduce file size."""
    if isinstance(obj, list):
        return [round_coords(x, precision) for x in obj]
    if isinstance(obj, tuple):
        return [round_coords(x, precision) for x in obj]
    if isinstance(obj, float):
        return round(obj, precision)
    return obj


def norm_token(text: str) -> str:
    s = str(text).upper().replace("&", "AND")
    s = re.sub(r"\(.*?\)", "", s)
    return re.sub(r"[^A-Z0-9]", "", s)


def canonical_state_key(raw_state: str) -> str:
    s = norm_token(raw_state)
    state_aliases = {
        "CHHATISGARH": "CHHATTISGARH",
        "TAMILNADU": "TAMILNADU",
        "NCTOFDELHI": "DELHI",
        "THEGOVERNMENTOFNCTOFDELHI": "DELHI",
        "ANDAMANANDNICOBAR": "ANDAMANANDNICOBARISLANDS",
        "ANDAMANANDNICOBARISLANDS": "ANDAMANANDNICOBARISLANDS",
        "DADRAANDNAGARHAVELI": "DNHDD",
        "DAMANANDDIU": "DNHDD",
        "DADRAANDNAGARHAVELIANDDAMANANDDIU": "DNHDD",
        "DADRANAGARHAVELIDAMANANDDIU": "DNHDD",
        "JAMMUANDKASHMIR": "JAMMUANDKASHMIR",
    }
    return state_aliases.get(s, s)


# Explicit LGD <-> IMD district alias map keyed by (canonical_state_key, norm_token(imd_district))
DISTRICT_ALIASES: dict[tuple[str, str], str] = {
    ("ANDAMANANDNICOBARISLANDS", "NICOBAR"): "NICOBARS",
    ("ANDAMANANDNICOBARISLANDS", "SOUTHANDAMAN"): "SOUTHANDAMANS",
    ("ANDHRAPRADESH", "ANANTAPURAMU"): "ANANTAPUR",
    ("ANDHRAPRADESH", "ANNAMAYYADISTRICT"): "ANNAMAYYA",
    ("ANDHRAPRADESH", "DRBRAMBEDKARKONASEEMA"): "KONASEEMA",
    ("ANDHRAPRADESH", "NTRDISTRICT"): "NTR",
    ("ANDHRAPRADESH", "SRIALLURISITHARAMARAJUDISTRICT"): "ALLURISITHARAMARAJU",
    ("ANDHRAPRADESH", "SRISATHYASAIDISTRICT"): "SRISATHYASAI",
    ("ANDHRAPRADESH", "VISHAKHAPATNAM"): "VISAKHAPATANAM",
    ("ANDHRAPRADESH", "YSRDISTRICT"): "YSR",
    ("ASSAM", "KAMRUPRURAL"): "KAMRUP",
    ("ASSAM", "KARBIANALOG"): "KARBIANGLONG",
    ("ASSAM", "MORIGAON"): "MARIGAON",
    ("ASSAM", "NCHILLS"): "DIMAHASAO",
    ("ASSAM", "SIBSAGAR"): "SIVASAGAR",
    ("BIHAR", "ARARIYA"): "ARARIA",
    ("BIHAR", "BHABUA"): "KAIMUR",
    ("BIHAR", "DRABHANGA"): "DARBHANGA",
    ("BIHAR", "JAHANABAD"): "JEHANABAD",
    ("BIHAR", "MADUBANI"): "MADHUBANI",
    ("BIHAR", "PACHIMCHAMPARAN"): "PASHCHIMCHAMPARAN",
    ("BIHAR", "PURBACHAMPARAN"): "PURBICHAMPARAN",
    ("CHHATTISGARH", "DANTEWARA"): "DANTEWADA",
    ("CHHATTISGARH", "GARIABAND"): "GARIYABAND",
    ("CHHATTISGARH", "KHAIRAGARHCHHUIKHADANGANDAI"): "KHAIRGARHCHHUIKHADANGANDAI",
    ("CHHATTISGARH", "MANENDRAGARHCHIRMIRIBHARATPUR"): "MANENDRAGARHCHIRIMIRIBHARATPUR",
    ("CHHATTISGARH", "MOHALAMANPURCHOWKI"): "MOHLAMANPURAMBAGARHCHOUKI",
    ("DNHDD", "DADARNAGARHAVELI"): "DADRAANDNAGARHAVELI",
    ("DELHI", "CENTRALDELHI"): "CENTRAL",
    ("DELHI", "EASTDELHI"): "EAST",
    ("DELHI", "NEWDELHI"): "NEWDELHI",
    ("DELHI", "NORTHDELHI"): "NORTH",
    ("DELHI", "NORTHEASTDELHI"): "NORTHEAST",
    ("DELHI", "NORTHWESTDELHI"): "NORTHWEST",
    ("DELHI", "SHAHDARA"): "SHAHDARA",
    ("DELHI", "SOUTHDELHI"): "SOUTH",
    ("DELHI", "SOUTHEASTDELHI"): "SOUTHEAST",
    ("DELHI", "SOUTHWESTDELHI"): "SOUTHWEST",
    ("DELHI", "WESTDELHI"): "WEST",
    ("GUJARAT", "ARAVALLI"): "ARVALLI",
    ("GUJARAT", "DAHOD"): "DOHAD",
    ("GUJARAT", "DANGS"): "DANG",
    ("GUJARAT", "DEVBHOOMIDWARKA"): "DEVBHUMIDWARKA",
    ("GUJARAT", "JUNAGARH"): "JUNAGADH",
    ("GUJARAT", "KHERA"): "KHEDA",
    ("GUJARAT", "PANCHMAHAL"): "PANCHMAHALS",
    ("HARYANA", "CHARKHIDADRI"): "CHARKIDADRI",
    ("HARYANA", "GURGAON"): "GURUGRAM",
    ("HIMACHALPRADESH", "BILAASPUR"): "BILASPUR",
    ("HIMACHALPRADESH", "HAMIRPURR"): "HAMIRPUR",
    ("JAMMUANDKASHMIR", "BADGAM"): "BUDGAM",
    ("JAMMUANDKASHMIR", "BANDIPORE"): "BANDIPORA",
    ("JAMMUANDKASHMIR", "BARAMULA"): "BARAMULLA",
    ("JAMMUANDKASHMIR", "GANDERWAL"): "GANDERBAL",
    ("JAMMUANDKASHMIR", "KISTWAR"): "KISHTWAR",
    ("JAMMUANDKASHMIR", "PUNCH"): "POONCH",
    ("JAMMUANDKASHMIR", "RIASI"): "REASI",
    ("JHARKHAND", "EASTSINGHBHUM"): "EASTSINGHBUM",
    ("JHARKHAND", "SARAIKELA"): "SARAIKELAKHARSAWAN",
    ("KARNATAKA", "BAGALKOT"): "BAGALKOTE",
    ("KARNATAKA", "BANGALORERURAL"): "BENGALURURURAL",
    ("KARNATAKA", "BANGLOREURBAN"): "BENGALURUURBAN",
    ("KARNATAKA", "BELGAUM"): "BELAGAVI",
    ("KARNATAKA", "BELLARY"): "BALLARI",
    ("KARNATAKA", "BIJAAPUR"): "VIJAYAPURA",
    ("KARNATAKA", "CHAMARAJANAGAR"): "CHAMARAJANAGARA",
    ("KARNATAKA", "CHIKBALLAPUR"): "CHIKKABALLAPURA",
    ("KARNATAKA", "CHIKMAGALUR"): "CHIKKAMAGALURU",
    ("KARNATAKA", "DAKSHINKANNADA"): "DAKSHINAKANNADA",
    ("KARNATAKA", "GULBARGA"): "KALABURAGI",
    ("KARNATAKA", "MANDHYA"): "MANDYA",
    ("KARNATAKA", "MYSORE"): "MYSURU",
    ("KARNATAKA", "RAMNAGAR"): "RAMANAGARA",
    ("KARNATAKA", "SHIMOGA"): "SHIVAMOGGA",
    ("KARNATAKA", "TUMKUR"): "TUMAKURU",
    ("KARNATAKA", "UTTARKANNADA"): "UTTARAKANNADA",
    ("KARNATAKA", "VIJAYANAGARA"): "VIJAYANAGAR",
    ("KERALA", "KASARGOD"): "KASARAGOD",
    ("KERALA", "KOTTYAM"): "KOTTAYAM",
    ("KERALA", "KOZIKOD"): "KOZHIKODE",
    ("KERALA", "PATTANAMITTIA"): "PATHANAMTHITTA",
    ("KERALA", "THIRUVANANTHPURAM"): "THIRUVANANTHAPURAM",
    ("KERALA", "TRISHUR"): "THRISSUR",
    ("LADAKH", "LEHANDLADAKH"): "LEHLADAKH",
    ("LAKSHADWEEP", "LAKSHADWEEP"): "LAKSHADWEEPDISTRICT",
    ("MADHYAPRADESH", "KHANDWA"): "EASTNIMAR",
    ("MADHYAPRADESH", "NARSHIMAPURA"): "NARSINGHPUR",
    ("MADHYAPRADESH", "NIMACH"): "NEEMUCH",
    ("MADHYAPRADESH", "VIDESHA"): "VIDISHA",
    ("MAHARASHTRA", "AHMADNAGAR"): "AHMEDNAGAR",
    ("MAHARASHTRA", "AMARAVATI"): "AMRAVATI",
    ("MAHARASHTRA", "BID"): "BEED",
    ("MAHARASHTRA", "CHHATRAPATISAMBHAJINAGAR"): "AURANGABAD",
    ("MAHARASHTRA", "DHARASHIV"): "OSMANABAD",
    ("MAHARASHTRA", "GONDIYA"): "GONDIA",
    ("MAHARASHTRA", "MUMBAICITY"): "MUMBAI",
    ("MAHARASHTRA", "NASIK"): "NASHIK",
    ("MAHARASHTRA", "SUBURBANMUMBAI"): "MUMBAISUBURBAN",
    ("ODISHA", "BARAGARH"): "BARGARH",
    ("ODISHA", "BAUDA"): "BOUDH",
    ("ODISHA", "GAJAPATHI"): "GAJAPATI",
    ("ODISHA", "KENDRAPARHA"): "KENDRAPARA",
    ("ODISHA", "NABARANGAPUR"): "NABARANGPUR",
    ("ODISHA", "NUAPARHA"): "NUAPADA",
    ("ODISHA", "RAYAGARHA"): "RAYAGADA",
    ("ODISHA", "SUBARNAPUR"): "SONEPUR",
    ("PUDUCHERRY", "PUDUCHERY"): "PONDICHERRY",
    ("PUNJAB", "FIROZPUR"): "FEROZEPUR",
    ("PUNJAB", "MUKTSAR"): "SRIMUKTSARSAHIB",
    ("PUNJAB", "SBSNAGAR"): "SHAHIDBHAGATSINGHNAGAR",
    ("RAJASTHAN", "CHITTAURGARH"): "CHITTORGARH",
    ("RAJASTHAN", "JAISELMER"): "JAISALMER",
    ("RAJASTHAN", "JALOR"): "JALORE",
    ("RAJASTHAN", "JHUNJHUNUN"): "JHUNJHUNU",
    ("RAJASTHAN", "PRATAAPGARH"): "PRATAPGARH",
    ("RAJASTHAN", "RAJSMAND"): "RAJSAMAND",
    ("RAJASTHAN", "SWAIMADHOPUR"): "SAWAIMADHOPUR",
    ("TAMILNADU", "DHARAMPURI"): "DHARMAPURI",
    ("TAMILNADU", "KANYAKUMARI"): "KANNIYAKUMARI",
    ("TAMILNADU", "NILGIRI"): "THENILGIRIS",
    ("TAMILNADU", "TENI"): "THENI",
    ("TAMILNADU", "TIRUPATTUR"): "TIRUPATHUR",
    ("TAMILNADU", "TIRUVALLUR"): "THIRUVALLUR",
    ("TELANGANA", "BKOTHAGUDEM"): "BHADRADRIKOTHAGUDEM",
    ("TELANGANA", "JAGTIAL"): "JAGITIAL",
    ("TELANGANA", "JANGAON"): "JANGOAN",
    ("TELANGANA", "JBHUPALPALLY"): "JAYASHANKARBHUPALAPALLY",
    ("TELANGANA", "KUMARAMBHEEM"): "KUMURAMBHEEMASIFABAD",
    ("TELANGANA", "MMALKAJGIRI"): "MEDCHALMALKAJGIRI",
    ("TELANGANA", "PEDDAPALLE"): "PEDDAPALLI",
    ("TELANGANA", "YBHUVANAGIRI"): "YADADRIBHUVANAGIRI",
    ("TRIPURA", "SIPAHIJALA"): "SEPAHIJALA",
    ("UTTARPRADESH", "BADAUN"): "BUDAUN",
    ("UTTARPRADESH", "BALARAMPUR"): "BALRAMPUR",
    ("UTTARPRADESH", "BULANDSAHAR"): "BULANDSHAHR",
    ("UTTARPRADESH", "GAUTAMBUDHNAGAR"): "GAUTAMBUDDHANAGAR",
    ("UTTARPRADESH", "GAZIPUR"): "GHAZIPUR",
    ("UTTARPRADESH", "KANPUR"): "KANPURNAGAR",
    ("UTTARPRADESH", "MUZAFARNAGAR"): "MUZAFFARNAGAR",
    ("UTTARPRADESH", "PILHIBHIT"): "PILIBHIT",
    ("UTTARPRADESH", "RAIBEARELI"): "RAEBARELI",
    ("UTTARPRADESH", "SANTKABIRNAGAR"): "SANTKABEERNAGAR",
    ("UTTARPRADESH", "SHARANPUR"): "SAHARANPUR",
    ("UTTARPRADESH", "SHRAWASTI"): "SHRAVASTI",
    ("UTTARAKHAND", "NANITAL"): "NAINITAL",
    ("UTTARAKHAND", "TEHRIGARWAL"): "TEHRIGARHWAL",
    ("UTTARAKHAND", "UDHAMSINGHNAGAR"): "UDAMSINGHNAGAR",
    ("WESTBENGAL", "DAKSHINDINAJPUR"): "DINAJPURDAKSHIN",
    ("WESTBENGAL", "EASTMEDNIPUR"): "MEDINIPUREAST",
    ("WESTBENGAL", "HAORA"): "HOWRAH",
    ("WESTBENGAL", "HUGLI"): "HOOGHLY",
    ("WESTBENGAL", "MALDA"): "MALDAH",
    ("WESTBENGAL", "MURSIDABAD"): "MURSHIDABAD",
    ("WESTBENGAL", "NORTH24PRAGANA"): "24PARAGANASNORTH",
    ("WESTBENGAL", "PASHCHIMMEDINIPUR"): "MEDINIPURWEST",
    ("WESTBENGAL", "PURULIYA"): "PURULIA",
    ("WESTBENGAL", "SOUTH24PARGANAS"): "24PARAGANASSOUTH",
    ("WESTBENGAL", "UTTARDINAJPUR"): "DINAJPURUTTAR",
}


def build_historical_json() -> None:
    tdir = ROOT / "outputs" / "tables"
    with open(tdir / "netcdf_quality_control_report.json", encoding="utf-8") as f:
        qc_report = json.load(f)

    # Compact footprint + spatial trends summary across the 8 extreme indices
    prcp_sdii_sp = pd.read_csv(tdir / "PRCPTOT_SDII_spatial_trend_results.csv")
    r10_r20_sp = pd.read_csv(tdir / "R10mm_R20mm_spatial_trend_results.csv")
    rx_sp = pd.read_csv(tdir / "Rx1day_Rx5day_spatial_trend_results.csv")
    cwd_cdd_sp = pd.read_csv(tdir / "CWD_CDD_spatial_trend_results.csv")
    all_sp = pd.concat([prcp_sdii_sp, r10_r20_sp, rx_sp, cwd_cdd_sp], ignore_index=True)

    spatial_summary_rows = []
    for idx_name, grp in all_sp.groupby("Index", sort=False):
        counts = grp["Significant_Trend"].value_counts().to_dict()
        spatial_summary_rows.append({
            "Index": idx_name,
            "Total_Cells": int(len(grp)),
            "Increasing_FDR_05": int(counts.get("Increasing", 0)),
            "Decreasing_FDR_05": int(counts.get("Decreasing", 0)),
            "Not_Significant": int(counts.get("Not Significant", 0)),
            "Mean_Sen_Slope": round(float(grp["Sen_Slope_Per_Year"].mean()), 5),
            "Median_Sen_Slope": round(float(grp["Sen_Slope_Per_Year"].median()), 5),
            "Min_Sen_Slope": round(float(grp["Sen_Slope_Per_Year"].min()), 4),
            "Max_Sen_Slope": round(float(grp["Sen_Slope_Per_Year"].max()), 4),
        })

    # Compact array-based encoding of 4,885 footprint cells + 8-index Sen slopes & sig codes
    coords_df = pd.read_csv(tdir / "common_spatial_footprint_coordinates.csv")
    coords_df["key"] = coords_df["Latitude"].round(3).astype(str) + "_" + coords_df["Longitude"].round(3).astype(str)
    sig_code = {"Not Significant": 0, "Increasing": 1, "Decreasing": -1}

    indices_grid: dict[str, dict[str, list[Any]]] = {}
    for idx_name, grp in all_sp.groupby("Index"):
        g = grp.copy()
        g["key"] = g["Latitude"].round(3).astype(str) + "_" + g["Longitude"].round(3).astype(str)
        merged = coords_df[["key"]].merge(g[["key", "Sen_Slope_Per_Year", "Significant_Trend", "Kendall_Tau", "FDR_Adjusted_P"]], on="key", how="left")
        indices_grid[idx_name] = {
            "slope": [None if pd.isna(x) else round(float(x), 4) for x in merged["Sen_Slope_Per_Year"]],
            "sig": [0 if pd.isna(x) else sig_code.get(str(x), 0) for x in merged["Significant_Trend"]],
        }

    footprint_bundle = {
        "total_grid_cells": 17415,
        "at_least_one_valid_cells": 4964,
        "intermittent_cells": 79,
        "no_data_cells": 12451,
        "common_footprint_cells": int(len(coords_df)),
        "coverage_percent": 28.0505,
        "lat": [float(x) for x in coords_df["Latitude"]],
        "lon": [float(x) for x in coords_df["Longitude"]],
        "indices": indices_grid,
    }
    with open(OUT_DATA_DIR / "footprint_cells.json", "w", encoding="utf-8") as f:
        json.dump(footprint_bundle, f, separators=(",", ":"))

    historical_bundle = {
        "metadata": {
            "study_period": "2000-01-01 to 2025-12-31",
            "years": 26,
            "netcdf_files": 26,
            "daily_observations": 9497,
            "total_grid_cells": 17415,
            "common_footprint_cells": 4885,
            "common_footprint_coverage_pct": 28.0505,
            "intermittent_cells": 79,
            "no_data_cells": 12451,
            "lat_range": [8.25, 37.25],
            "lon_range": [69.25, 97.25],
            "annual_preliminary_trend": {
                "ols_slope_mm_yr": 6.2089,
                "ols_intercept": -11345.9062,
                "ols_r2": 0.2322,
                "ols_p_value": 0.012685,
                "ols_ci_95": [1.4519, 10.9660],
                "mk_tau": 0.3231,
                "mk_p_value": 0.020791,
                "sen_slope_mm_yr": 5.8588,
                "sen_ci_95": [0.8953, 11.5426],
            },
        },
        "quality_control": qc_report,
        "daily_distribution_stats": clean_records(pd.read_csv(tdir / "daily_rainfall_distribution_statistics.csv")),
        "annual_statistics": clean_records(pd.read_csv(tdir / "annual_rainfall_statistics_2000_2025.csv")),
        "annual_variability_summary": clean_records(pd.read_csv(tdir / "annual_rainfall_variability_summary.csv")),
        "monthly_climatology": clean_records(pd.read_csv(tdir / "monthly_rainfall_climatology.csv")),
        "monthly_totals": clean_records(pd.read_csv(tdir / "monthly_rainfall_totals_2000_2025.csv")),
        "seasonal_summary": clean_records(pd.read_csv(tdir / "seasonal_rainfall_summary.csv")),
        "seasonal_totals_by_year": clean_records(pd.read_csv(tdir / "seasonal_rainfall_totals_by_year.csv")),
        "seasonal_intensity_summary": clean_records(pd.read_csv(tdir / "seasonal_intensity_summary.csv")),
        "seasonal_daily_intensity_by_year": clean_records(pd.read_csv(tdir / "seasonal_daily_rainfall_intensity.csv")),
        "friedman_seasonal": clean_records(pd.read_csv(tdir / "friedman_seasonal_test_summary.csv")),
        "friedman_intensity": clean_records(pd.read_csv(tdir / "friedman_normalized_intensity_test.csv")),
        "seasonal_pairwise_wilcoxon": clean_records(pd.read_csv(tdir / "seasonal_pairwise_wilcoxon_results.csv")),
        "seasonal_intensity_pairwise": clean_records(pd.read_csv(tdir / "pairwise_seasonal_intensity_tests.csv")),
        "seasonal_mann_kendall": clean_records(pd.read_csv(tdir / "seasonal_mann_kendall_sen_trend_results.csv")),
        "seasonal_autocorrelation": clean_records(pd.read_csv(tdir / "seasonal_autocorrelation_diagnostics.csv")),
        "prcptot_sdii_annual": clean_records(pd.read_csv(tdir / "PRCPTOT_SDII_annual_spatial_summary.csv")),
        "prcptot_sdii_trend": clean_records(pd.read_csv(tdir / "PRCPTOT_SDII_trend_analysis.csv")),
        "cwd_cdd_annual": clean_records(pd.read_csv(tdir / "CWD_CDD_annual_summary.csv")),
        "cdd_cwd_trend": clean_records(pd.read_csv(tdir / "CDD_CWD_temporal_trend_analysis.csv")),
        "cdd_trend_sensitivity": clean_records(pd.read_csv(tdir / "CDD_trend_sensitivity_analysis.csv")),
        "cwd_trend_sensitivity": clean_records(pd.read_csv(tdir / "CWD_trend_sensitivity_analysis.csv")),
        "cdd_sensitivity_yearly": clean_records(pd.read_csv(tdir / "CDD_sensitivity_analysis_zero_rainfall_flags.csv")),
        "cwd_sensitivity_yearly": clean_records(pd.read_csv(tdir / "CWD_sensitivity_analysis_zero_rainfall_flags.csv")),
        "zero_rainfall_annual": clean_records(pd.read_csv(tdir / "zero_rainfall_annual_summary.csv")),
        "zero_rainfall_flags": clean_records(pd.read_csv(tdir / "zero_rainfall_anomaly_flag_register.csv")),
        "zero_rainfall_neighbourhood": clean_records(pd.read_csv(tdir / "zero_rainfall_neighbourhood_summary.csv")),
        "spatial_trend_summary": spatial_summary_rows,
    }
    with open(OUT_DATA_DIR / "historical_data.json", "w", encoding="utf-8") as f:
        json.dump(historical_bundle, f, separators=(",", ":"))
    print("Saved historical_data.json and footprint_cells.json")


def build_regional_and_geo() -> None:
    tdir = ROOT / "outputs_project2" / "tables"
    pdir = ROOT / "outputs_project2" / "processed_data"

    state_summary = pd.read_csv(tdir / "statewise_rainfall_summary_final.csv")
    state_var = pd.read_csv(tdir / "statewise_rainfall_variability.csv")
    state_wilcoxon = pd.read_csv(tdir / "statewise_actual_vs_normal_wilcoxon_holm_corrected.csv")
    state_ext = pd.read_csv(tdir / "extreme_rainfall_geographical_state_summary.csv")

    district_summary = pd.read_csv(tdir / "districtwise_rainfall_summary.csv")
    district_paired = pd.read_csv(tdir / "district_actual_vs_normal_paired_analysis.csv")
    district_ext = pd.read_csv(pdir / "district_extreme_rainfall_events.csv")
    district_inc = pd.read_csv(pdir / "districtwise_incomplete_records.csv")
    district_daily = pd.read_csv(pdir / "districtwise_daily_temporal_statistics.csv")
    top20 = pd.read_csv(tdir / "top_20_extreme_district_rainfall_events.csv")
    ext_by_date = pd.read_csv(tdir / "extreme_rainfall_by_date.csv")
    ext_by_state = pd.read_csv(tdir / "extreme_rainfall_by_state.csv")
    ext_by_dist = pd.read_csv(tdir / "extreme_rainfall_geographical_district_summary.csv")
    dep_state = pd.read_csv(tdir / "departure_reliability_summary.csv")
    dep_dist = pd.read_csv(tdir / "district_departure_reliability_by_normal_range.csv")
    dunn_holm = pd.read_csv(tdir / "statewise_dunn_holm_results.csv")
    welch_holm = pd.read_csv(tdir / "statewise_pairwise_welch_holm_results.csv")

    # Merge state summary + variability + wilcoxon + extreme counts cleanly
    st_merged = state_summary.merge(
        state_var[["State", "Std_Rainfall", "Min_Rainfall", "CV_Percent", "Mean_Anomaly_mm", "Rainy_Day_Percent"]],
        on="State",
        how="left",
    )
    st_merged["state_key"] = st_merged["State"].apply(canonical_state_key)

    w_copy = state_wilcoxon.copy()
    w_copy["state_key"] = w_copy["State"].apply(canonical_state_key)
    st_merged = st_merged.merge(
        w_copy[["state_key", "District_Count", "Mean_Difference", "Median_Difference", "Wilcoxon_Statistic", "Raw_P_Value", "Holm_Adjusted_P", "Significant", "Rainfall_Status"]],
        on="state_key",
        how="left",
    )

    # Aggregate extreme events per canonical state key (since district CSV splits DNH / DD)
    ext_s = state_ext.copy()
    ext_s["state_key"] = ext_s["State"].apply(canonical_state_key)
    ext_agg = ext_s.groupby("state_key", as_index=False).agg(
        Extreme_Observations=("Extreme_Observations", "sum"),
        Extreme_Unique_Districts=("Unique_Districts", "sum"),
        Max_District_Extreme_mm=("Maximum_Rainfall", "max"),
    )
    st_merged = st_merged.merge(ext_agg, on="state_key", how="left")
    st_merged["Extreme_Observations"] = st_merged["Extreme_Observations"].fillna(0).astype(int)
    st_merged["Extreme_Unique_Districts"] = st_merged["Extreme_Unique_Districts"].fillna(0).astype(int)

    # Compute Nagapattinam incomplete summary
    nag_summary = {
        "State": "TAMIL NADU",
        "District": "NAGAPATTINAM",
        "Observation_Count": int(len(district_inc)),
        "Mean_Actual_Rainfall": round(float(district_inc["Daily Actual"].mean()), 4),
        "Median_Actual_Rainfall": round(float(district_inc["Daily Actual"].median()), 4),
        "Std_Actual_Rainfall": round(float(district_inc["Daily Actual"].std()), 4),
        "Min_Daily_Rainfall": round(float(district_inc["Daily Actual"].min()), 4),
        "Max_Daily_Rainfall": round(float(district_inc["Daily Actual"].max()), 4),
        "Mean_Normal_Rainfall": round(float(district_inc["Daily Normal"].mean()), 4),
        "Total_Observed_Rainfall": round(float(district_inc["Daily Actual"].sum()), 2),
        "Mean_Anomaly_mm": round(float((district_inc["Daily Actual"] - district_inc["Daily Normal"]).mean()), 4),
        "First_Date": str(district_inc["Date"].min()),
        "Last_Date": str(district_inc["Date"].max()),
        "Status": "Incomplete (excluded from 727-district balanced analysis)",
    }

    # Build simplified State GeoJSON
    st_parquet = pq.read_table(ROOT / "rainfallrisk-web" / ".cache" / "LGD_States.parquet").to_pandas()
    st_lookup = {row["state_key"]: row for row in clean_records(st_merged)}
    state_features = []
    for _, row in st_parquet.iterrows():
        geom = from_wkb(row["geometry"])
        if not geom.is_valid:
            geom = make_valid(geom)
        simp = extract_polygonal(geom.simplify(0.03, preserve_topology=True))
        sk = canonical_state_key(row["STNAME"])
        stats_row = st_lookup.get(sk, {})
        props = {
            "lgd_name": row["STNAME"],
            "state_key": sk,
            **stats_row,
        }
        geo_dict = mapping(simp)
        if "coordinates" in geo_dict:
            geo_dict["coordinates"] = round_coords(geo_dict["coordinates"], 3)
        state_features.append({"type": "Feature", "properties": props, "geometry": geo_dict})

    with open(OUT_DATA_DIR / "india_states.geojson", "w", encoding="utf-8") as f:
        json.dump({"type": "FeatureCollection", "features": state_features}, f, separators=(",", ":"))
    print(f"Saved india_states.geojson with {len(state_features)} features")

    # Build simplified District GeoJSON with complete matching
    dist_parquet = pq.read_table(ROOT / "rainfallrisk-web" / ".cache" / "LGD_Districts.parquet").to_pandas()
    ds_full = district_summary.merge(
        district_paired[["State", "District", "Rainfall_Difference"]],
        on=["State", "District"],
        how="left",
    )
    ext_d = ext_by_dist.copy()
    ext_d["state_key"] = ext_d["State"].apply(canonical_state_key)
    ext_d["dist_key"] = ext_d["District"].apply(norm_token)
    ext_d_lookup = {
        (r["state_key"], r["dist_key"]): r for r in clean_records(ext_d)
    }

    imd_lookup: dict[tuple[str, str], dict[str, Any]] = {}
    for rec in clean_records(ds_full):
        sk = canonical_state_key(rec["State"])
        dk = norm_token(rec["District"])
        target_dk = DISTRICT_ALIASES.get((sk, dk), dk)
        ext_info = ext_d_lookup.get((sk, dk), {})
        rec["Extreme_Observations"] = int(ext_info.get("Extreme_Observations", 0) or 0)
        rec["First_Extreme_Date"] = ext_info.get("First_Extreme_Date")
        rec["Last_Extreme_Date"] = ext_info.get("Last_Extreme_Date")
        rec["status"] = "balanced"
        imd_lookup[(sk, target_dk)] = rec

    # Include Nagapattinam incomplete record
    imd_lookup[("TAMILNADU", "NAGAPATTINAM")] = {
        **nag_summary,
        "Extreme_Observations": 0,
        "status": "incomplete",
    }

    district_features = []
    matched_count = 0
    for _, row in dist_parquet.iterrows():
        geom = from_wkb(row["geometry"])
        if not geom.is_valid:
            geom = make_valid(geom)
        simp = extract_polygonal(geom.simplify(0.015, preserve_topology=True))
        sk = canonical_state_key(row["stname"])
        dk = norm_token(row["dtname"])
        rec = imd_lookup.get((sk, dk))
        if rec is None:
            # Handle KAIMUR (Bhabua)
            if sk == "BIHAR" and dk.startswith("KAIMUR"):
                rec = imd_lookup.get(("BIHAR", "KAIMUR"))
        if rec is not None:
            matched_count += 1
            props = {
                "lgd_district": row["dtname"],
                "lgd_state": row["stname"],
                "dist_lgd": int(row["dist_lgd"]) if pd.notna(row["dist_lgd"]) else None,
                **rec,
            }
        else:
            props = {
                "lgd_district": row["dtname"],
                "lgd_state": row["stname"],
                "dist_lgd": int(row["dist_lgd"]) if pd.notna(row["dist_lgd"]) else None,
                "State": row["stname"],
                "District": row["dtname"],
                "status": "unreported",
            }
        geo_dict = mapping(simp)
        if "coordinates" in geo_dict:
            geo_dict["coordinates"] = round_coords(geo_dict["coordinates"], 3)
        district_features.append({"type": "Feature", "properties": props, "geometry": geo_dict})

    with open(OUT_DATA_DIR / "india_districts.geojson", "w", encoding="utf-8") as f:
        json.dump({"type": "FeatureCollection", "features": district_features}, f, separators=(",", ":"))
    print(f"Saved india_districts.geojson: {matched_count} matched of {len(district_features)} LGD polygons")

    # Regional JSON bundle
    regional_bundle = {
        "metadata": {
            "study_period": "2026-08-19 to 2026-11-12",
            "missing_date": "2026-10-31",
            "reporting_dates_per_unit": 85,
            "state_units": 36,
            "state_total_observations": 3060,
            "balanced_districts": 727,
            "district_balanced_observations": 61795,
            "incomplete_district": "NAGAPATTINAM (TAMIL NADU, 36 records)",
            "paired_district_wilcoxon": {
                "n_districts": 727,
                "mean_difference_mm_day": -0.799765,
                "median_difference_mm_day": -0.789412,
                "wilcoxon_statistic": 80015.5,
                "p_value": 2.6380198400866936e-20,
            },
            "omnibus_tests_28_states": {
                "n_states": 28,
                "n_districts": 709,
                "welch_anova_f": 44.122351,
                "welch_df1": 27,
                "welch_df2": 164.687366,
                "welch_p_value": 1.117090e-61,
                "kruskal_h": 379.419227,
                "kruskal_df": 27,
                "kruskal_p_value": 7.630904e-64,
                "pairwise_total": 378,
                "pairwise_welch_significant": int(welch_holm["Significant"].sum()),
                "pairwise_dunn_significant": int(dunn_holm["Significant"].sum()),
            },
            "extreme_summary": {
                "total_events_ge_100mm": int(len(district_ext)),
                "events_gt_200mm": int((district_ext["Daily Actual"] > 200).sum()),
                "unique_states": int(ext_by_state["State"].nunique()),
                "unique_districts": int(ext_by_dist.shape[0]),
                "unique_dates": int(ext_by_date.shape[0]),
                "max_event": {
                    "state": "ODISHA",
                    "district": "NABARANGAPUR",
                    "date": "2026-09-25",
                    "actual_mm": 231.9,
                    "normal_mm": 4.2,
                },
            },
        },
        "state_summary": clean_records(st_merged),
        "state_wilcoxon_holm": clean_records(state_wilcoxon),
        "departure_reliability_state": clean_records(dep_state),
        "departure_reliability_district": clean_records(dep_dist),
        "district_summary": clean_records(ds_full),
        "nagapattinam_incomplete": nag_summary,
        "nagapattinam_records": clean_records(district_inc[["State", "District", "Date", "Daily Actual", "Daily Normal", "Daily Departure Per", "Daily Category"]]),
        "district_daily_temporal": clean_records(district_daily),
        "extreme_events_all": clean_records(district_ext[["State", "District", "Date", "Daily Actual", "Daily Normal", "Daily Departure Per", "Daily Category", "Monthly Acutual", "Monthly Normal"]]),
        "extreme_top_20": clean_records(top20),
        "extreme_by_date": clean_records(ext_by_date),
        "extreme_by_state": clean_records(ext_by_state),
        "extreme_geo_state": clean_records(state_ext),
        "extreme_geo_district": clean_records(ext_by_dist),
        "pairwise_dunn_holm": clean_records(dunn_holm),
        "pairwise_welch_holm": clean_records(welch_holm),
    }
    with open(OUT_DATA_DIR / "regional_data.json", "w", encoding="utf-8") as f:
        json.dump(regional_bundle, f, separators=(",", ":"))
    print("Saved regional_data.json")


if __name__ == "__main__":
    build_historical_json()
    build_regional_and_geo()
