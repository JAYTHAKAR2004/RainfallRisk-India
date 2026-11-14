# RainfallRisk India

> **Understanding India's rainfall patterns through 26 years of historical evidence and regional rainfall analysis.**

An editorial-grade scientific research platform and data exploration monograph uniting a 26-year historical gridded precipitation study (`2000–2025`) with a high-resolution State and District statistical investigation (`19 August – 12 November 2026`) using **India Meteorological Department (IMD)** archives.

> **Research Scope Disclaimer:** RainfallRisk India is strictly an exploratory retrospective statistical research project. It is **not** an operational flood forecasting system, disaster warning platform, or real-time weather prediction service.

---

## Core Synthesis

> **"The analysis indicates geographically heterogeneous rainfall behaviour rather than a uniform increase or decrease across India."**

Across two observational scales and temporal horizons, precipitation across India exhibits pronounced spatial, seasonal, and sub-national heterogeneity rather than a spatially uniform upward or downward shift.

---

## Research Overview

### Research 01 · Historical Gridded Analysis (`2000–2025`, `project.ipynb`)

A multi-decadal gridded climatology and trend investigation across **26 annual IMD NetCDF files** (`0.25° × 0.25°` resolution, `1 January 2000 – 31 December 2025`, `9,497` daily steps):

- **Common Spatial Footprint Discipline:** Out of the `17,415`-cell bounding matrix (`129 × 135`), `12,451` cells contain no valid data and `79` intermittent boundary cells are excluded, isolating **`4,885` consistently reporting cells (`28.05%` of the rectangular grid)**.
- **Annual Area-Weighted Variability:** Cosine-latitude weighted annual precipitation averages **`1,149.60 mm/year`** (`SD = 98.56 mm`, `CV = 8.57%`), spanning **`947.12 mm` in `2002`** (driest) to **`1,285.86 mm` in `2020`** (wettest).
- **Monsoon Seasonality:** The **Southwest Monsoon** accounts for **`75.28%`** (`865.38 mm`) of annual rainfall; non-parametric **Friedman testing** confirms strong inter-seasonal inequality (`χ² = 70.94`, `Kendall W = 0.9095`, `p = 2.69 × 10⁻¹⁵`).
- **8 ETCCDI Extreme Indices & Multiple-Testing Control:** Evaluates `PRCPTOT`, `SDII`, `Rx1day`, `Rx5day`, `R10mm`, `R20mm`, `CDD`, and `CWD` via Mann–Kendall trend tests, Theil–Sen slopes, **Benjamini–Hochberg FDR (`q < 0.05`)** across grid cells, **Holm–Bonferroni** family-wise adjustment, and **Ljung–Box** autocorrelation diagnostics.
- **Zero-Rainfall Sensitivity Audit:** Isolates **`90` grid cells** with anomalous zero-rainfall years through spatial-neighbour verification (`Scenario A: 4,885 cells` vs. `Scenario B: 4,795 cells`).

### Research 02 · State & District Analysis (`19 Aug – 12 Nov 2026`, `project2.ipynb`)

A sub-national late-monsoon to post-monsoon empirical audit combining **State/UT** and **District** IMD daily bulletins:

- **D1 · State-wise Panel (`36` States/UTs):** `3,060` balanced daily observations synchronized across **`85` reporting dates** (`2026-08-19` to `2026-11-12`; `2026-10-31` unrecorded).
- **D2 · Balanced District Panel & Extremes (`727` Districts):** `61,795` balanced district-day observations. **Nagapattinam, Tamil Nadu (`36` partial records)** is explicitly isolated prior to panel inference rather than imputed.
- **Extreme District-Day Tail (`≥ 100 mm`):** Catalogues **`99` extreme district-day observations** across **`76` unique districts**, **`20` States/UTs**, and **`28` calendar dates**, including **`8` events exceeding `200 mm`** and a peak of **`231.9 mm`** in **Nabarangapur, Odisha** (`2026-09-25`).
- **Denominator Instability Audit:** Demonstrates why standard percentage departures (`100 × (Actual − Normal) / Normal`) blow up near zero normals (`+2,453.83%` mean and `+82,735%` max in zero-normal state days), motivating the use of absolute differences (`Actual − Normal` in `mm/day`) for all formal hypothesis tests.
- **D3 · Formal Statistical Inference (`28` Multi-District States · `709` Districts):**
  - **Welch's Heteroscedastic ANOVA:** `F(27, 164.69) = 44.122`, `p = 1.12 × 10⁻⁶¹`
  - **Kruskal–Wallis Rank Test:** `H(27) = 379.419`, `p = 7.63 × 10⁻⁶⁴`
  - **Post-Hoc Contrasts (`378` state pairs):** **`159 / 378`** significant under pairwise **Welch–Holm** (`p < 0.05`) and **`122 / 378`** significant under non-parametric **Dunn–Holm**.
  - **Paired District Wilcoxon Signed-Rank Test (`n = 727`):** Overall mean deficit of **`−0.80 mm/day`** below normal (`W = 80,015.5`, `p = 2.64 × 10⁻²⁰`); **`10 / 28` states** remain significant after Holm correction (`9` significantly below normal, `1` significantly above normal: **Uttar Pradesh** at `+1.48 mm/day`).
  - Explicitly reports **non-causation** and **synoptic spatial dependence** caveats alongside test outputs.

---

## Interactive Web Platform

The React + TypeScript frontend translates every notebook table, statistical test, figure plate, and spatial layer into an academic editorial interface with **8 cohesive routes**:

1. **Overview (`HomePage`):** Dual-period synthesis (`2000–2025` & `Aug–Nov 2026`), headline KPIs, research pathways, and live embedded map preview.
2. **Methodology:** 9-stage reproducible pipeline (`Raw IMD Data → Statistical Conclusions`), NetCDF calendar harmonization, QC certificate, area-weighting math, and statistical test documentation.
3. **Research 01 (`2000–2025`):** 10 analytical subsections combining interactive Recharts figures, annual `2000–2025` spatial map switcher, ETCCDI animations (`GIF`), Sen-slope/FDR significance plates, and sensitivity audits.
4. **Research 02 (`Aug–Nov 2026`):** Interactive State/District distributions, Nagapattinam exclusion record, `99`-event extreme table, departure-instability audit, Holm-corrected/uncorrected Wilcoxon figure switcher, and `378`-pair Welch–Holm / Dunn–Holm contrast explorer.
5. **Interactive India Atlas:** Multi-layer vector choropleth and grid explorer built with **D3-Geo** over official **LGD** State (`36`) and District (`727` matched + `1` incomplete + explicit unshaded unreported polygons) boundaries plus the **`4,885`-cell** historical common footprint (`28.05%` coverage).
6. **Data Explorer:** Filterable workbench across `10` historical and regional tables with live subset KPIs (`Count`, `Mean`, `Min`, `Max`), client-side filtered `.csv` export, and direct downloads from the verbatim notebook output repository.
7. **Findings & Limits:** Structured epistemic separation into *What Is Observed*, *What Is Statistically Established*, *What Remains Uncertain*, and *Study Limitations*.
8. **About:** IMD data attribution, Python scientific stack (`xarray`, `netCDF4`, `pandas`, `numpy`, `scipy`, `statsmodels`, `matplotlib`, `seaborn`), and non-operational scope statement.

---

## Repository Structure

```text
RainfallRisk-India/
├── project.ipynb                  # Historical gridded NetCDF analysis notebook (2000–2025)
├── project2.ipynb                 # State & District regional rainfall notebook (Aug–Nov 2026)
├── Dataset/
│   ├── rainfall_statewise_daily_imd.csv
│   └── rainfall_districtwise_daily_imd.csv   # (Raw *.nc files excluded via .gitignore)
├── outputs/
│   ├── animations/                # PRCPTOT, SDII, Rx1day, Rx5day, R10mm, R20mm, annual GIFs
│   ├── figures/                   # High-resolution annual, seasonal, spatial & extreme plates
│   ├── processed_data/            # Daily & annual processed CSV summaries
│   └── tables/                    # QC report JSON, Mann–Kendall, FDR, Friedman & sensitivity CSVs
├── outputs_project2/
│   ├── figures/                   # Extreme event & paired Wilcoxon state comparison PNGs
│   ├── processed_data/            # Clean state panel, balanced 727-district panel & 99 extremes CSV
│   └── tables/                    # Welch ANOVA, Kruskal–Wallis, Dunn–Holm & Welch–Holm CSVs
├── Annual_Rainfall_Maps/          # Annual spatial rainfall plates (2000–2025)
├── scripts/
│   └── build_web_data.py          # Compiles CSV/JSON/Parquet sources into frontend JSON/GeoJSON
├── public/data/
│   ├── footprint_cells.json       # 4,885 common-footprint coordinates & 8-index Sen slopes
│   ├── historical_data.json       # Serialized Research 01 metrics & statistical tables
│   ├── regional_data.json         # Serialized Research 02 state/district metrics & hypothesis tests
│   ├── india_states.geojson       # 36 simplified LGD State/UT boundaries merged with Research 02
│   └── india_districts.geojson    # 785 LGD District polygons (727 matched + incomplete isolation)
└── src/
    ├── components/                # Charts, D3-Geo India Atlas, editorial layout & sortable tables
    ├── data/                      # TypeScript schemas & verified catalog definitions
    ├── hooks/                     # Asynchronous dataset loader
    ├── pages/                     # 8 route views
    └── utils/                     # Statistical formatters & filtered CSV export
```

> **Note on NetCDF (`*.nc`) Files:** Raw annual IMD binary NetCDF files (`Dataset/RF25_ind2000_rfp25.nc` through `Dataset/RF25_ind2025_rfp25.nc`, ~24 MB each) and `outputs/processed_data/IMD_Rainfall_2000_2025_Common_Footprint.nc` (`74.49 MB`) are excluded from Git version control via `.gitignore` to keep the repository lightweight. All derived statistical tables, JSON summaries, GeoJSON geometries, figures, and animations are tracked in full so the frontend and statistical tables run out of the box.

---

## Local Setup & Running the Web Platform

### Prerequisites

- **Node.js** `18+` and **npm**
- *(Optional)* **Python `3.10+`** (`pandas`, `pyarrow`, `shapely`) only if regenerating `public/data/*` via `scripts/build_web_data.py`

### Installation & Development Server

```bash
# 1. Clone the repository
git clone https://github.com/JAYTHAKAR2004/RainfallRisk-India.git
cd RainfallRisk-India

# 2. Install frontend dependencies
npm install

# 3. Start the Vite development server (serves src/, public/data/, outputs/, outputs_project2/, and Annual_Rainfall_Maps/)
npm run dev
```

Open **`http://localhost:5173/`** in your browser.

### Production Type-Check & Build

```bash
npm run build
npm run preview
```

---

## Attribution

- **Source Meteorological Archives:** India Meteorological Department (IMD) gridded daily rainfall data (`0.25° × 0.25°`, `2000–2025`) and IMD daily State/District bulletins (`19 Aug – 12 Nov 2026`).
- **Administrative Geometries:** Local Government Directory (LGD) State/UT and District shapefiles.
