# RainfallRisk India — Presentation Data Audit & Scientific Validation Report

**Status:** PASSED (100% Verified against Research Monograph & Jupyter Notebooks)

## 1. Study 1: Multidecadal Gridded Climatology (2000–2025)

| Parameter | Notebook / Paper Value | Slide Presentation Value | Audit Status |
|---|---|---|---|
| Temporal Span | 2000–2025 (26 complete calendar years) | 2000–2025 (26 complete calendar years) | MATCH |
| Daily Observations | 9,497 consecutive dates | 9,497 consecutive dates | MATCH |
| Raw Grid Cells | 17,415 cells (129 lat x 135 lon @ 0.25 deg) | 17,415 cells (129 lat x 135 lon @ 0.25 deg) | MATCH |
| Common Valid Cells | 4,885 cells (28.0505% coverage) | 4,885 cells (28.0505% coverage) | MATCH |
| Mean Annual Rainfall | 1,149.603 mm (SD: 98.56 mm) | 1,149.603 mm (SD: 98.56 mm) | MATCH |
| Annual CV | 8.573% (interannual stability) | 8.573% (interannual stability) | MATCH |
| Wettest Year | 2020 (1,285.86 mm, +11.85%) | 2020 (1,285.86 mm, +11.85%) | MATCH |
| Driest Year | 2002 (947.12 mm, -17.61%) | 2002 (947.12 mm, -17.61%) | MATCH |
| Southwest Monsoon Share | 75.28% (865.38 mm) | 75.28% (865.38 mm) | MATCH |
| Seasonal Friedman Test | chi^2 = 70.9385, p = 2.687e-15, W = 0.9095 | chi^2 = 70.9385, p = 2.687e-15, W = 0.9095 | MATCH |
| PRCPTOT Sen's Slope | +5.74 mm/yr (p = 0.0297; Holm p = 0.0892) | +5.74 mm/yr (p = 0.0297; Holm p = 0.0892) | MATCH |
| Spatial FDR (BH q=0.05) | 0 of 4,885 cells significant | 0 of 4,885 cells significant | MATCH |
| CDD Sen's Slope | -0.345 d/yr (p = 0.188, non-significant) | -0.345 d/yr (p = 0.188, non-significant) | MATCH |
| CWD Sen's Slope | -0.017 d/yr (p = 0.727, non-significant) | -0.017 d/yr (p = 0.727, non-significant) | MATCH |
| 90 Zero-Rainfall Cells Audit | Scenario A (-0.345 d/yr) vs Scenario B (-0.232 d/yr) | Scenario A (-0.345 d/yr) vs Scenario B (-0.232 d/yr) | MATCH |

## 2. Study 2: Operational Monitoring Panel (2026)

| Parameter | Notebook / Paper Value | Slide Presentation Value | Audit Status |
|---|---|---|---|
| Window | 19 Aug 2026 – 12 Nov 2026 (85 dates; 31 Oct missing) | 19 Aug 2026 – 12 Nov 2026 (85 dates; 31 Oct missing) | MATCH |
| Administrative Scope | 36 States/UTs, 727 Balanced Districts | 36 States/UTs, 727 Balanced Districts | MATCH |
| Total Balanced Records | 61,795 observations (Nagapattinam isolated: 82 dates) | 61,795 observations (Nagapattinam isolated: 82 dates) | MATCH |
| Denominator Catastrophe | Max dep: +82,735%; Mean +2,453.8% when norm <= 0.1mm | Max dep: +82,735%; Mean +2,453.8% when norm <= 0.1mm | MATCH |
| Nationwide Paired Wilcoxon | W = 80,015.5, z = -9.231, p = 2.638e-20 | W = 80,015.5, z = -9.231, p = 2.638e-20 | MATCH |
| Mean Daily Deficit | -0.7998 mm/day | -0.7998 mm/day | MATCH |
| Significant States (Holm) | 10 of 36 (9 persistent deficits, 1 surplus) | 10 of 36 (9 persistent deficits, 1 surplus) | MATCH |
| Significant Surplus State | Uttar Pradesh (+1.477 mm/day, p = 7.50e-06) | Uttar Pradesh (+1.477 mm/day, p = 7.50e-06) | MATCH |
| Welch's Heteroscedastic F | F = 44.122, p = 1.117e-61 | F = 44.122, p = 1.117e-61 | MATCH |
| Kruskal-Wallis H Test | H = 379.419, p = 7.631e-64, epsilon^2 = 0.5175 | H = 379.419, p = 7.631e-64, epsilon^2 = 0.5175 | MATCH |
| Extreme Deluges >= 100mm | 99 district-days | 99 district-days | MATCH |
| Extreme Deluges >= 200mm | 8 district-days | 8 district-days | MATCH |
| Highest Single-Day Deluge | 231.9 mm (Nabarangapur, Odisha, 25 Sep 2026) | 231.9 mm (Nabarangapur, Odisha, 25 Sep 2026) | MATCH |

## 3. Visual & Typographic Quality Checks
- **Palette Compliance:** Deep navy background (`#0B192C`), slate containers (`#142A44`), subtle slate borders (`#334B68`), pure white typography (`#F8FAFC`), and refined teal/gold accents (`#2DD4BF`, `#FBBF24`).
- **Prohibited Elements Check:** Zero cartoon weather graphics, zero decorative gradient blobs, zero moving cloud/rain animations. Pure scientific editorial presentation.
- **Editable Native Elements:** All cards, stat boxes, and tables are native PowerPoint shapes with complete formatting.
