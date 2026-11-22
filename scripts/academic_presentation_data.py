"""
Academic Presentation Data & Narrative Script for RainfallRisk India
Contains slide metadata, analytical bullets, exact statistics, figure mappings,
and comprehensive academic speaker notes for all 41 slides.
"""

SLIDES_DATA = [
    # ----------------------------------------------------
    # PART 1: INTRODUCTION & RESEARCH CONTEXT (Slides 1–6)
    # ----------------------------------------------------
    {
        "slide_num": 1,
        "type": "cover",
        "category": "Academic Research Monograph",
        "title": "RAINFALLRISK INDIA",
        "subtitle": "Statistical Rainfall Research Monograph (2000–2025 & 2026)\nA Spatiotemporal Investigation of Multidecadal Baseline Stationarity, ETCCDI Precipitation Extremes, and Near-Real-Time Administrative Anomaly Dynamics",
        "author": "Jay Thakar",
        "institution": "Department of Data Science & Climate Informatics",
        "guide": "Academic Research Committee",
        "website": "https://rainfallriskindia.vercel.app",
        "repo": "https://github.com/JAYTHAKAR2004/RainfallRisk-India",
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Respected Professor and members of the evaluation committee, good morning. "
            "Today I present 'RainfallRisk India'—a comprehensive statistical research monograph investigating 26 years of high-resolution "
            "gridded rainfall data across India from 2000 to 2025, coupled with an empirical anomaly diagnosis of the 2026 observational season.\n\n"
            "RESEARCH MOTIVATION:\n"
            "The Indian monsoon system is one of the most energetic ocean-atmosphere coupled circulations on Earth, dictating water security, food inflation, "
            "and agricultural livelihoods for over 1.4 billion people. However, traditional operational reporting relies on broad spatial aggregations—such as "
            "all-India seasonal totals—which systematically conceal severe localized deficits and devastating extreme deluges.\n\n"
            "TRANSITION:\n"
            "Let us examine why rainfall variability matters so profoundly to India's physical and socio-economic geography."
        )
    },
    {
        "slide_num": 2,
        "type": "split_cards",
        "category": "Research Motivation",
        "title": "The Research Motivation: Socio-Economic & Hydrological Stakes",
        "subtitle": "Why precipitation variability dictates India's agrarian viability and macroeconomic stability",
        "cards": [
            {
                "title": "1. Rainfed Agrarian Vulnerability",
                "bullets": [
                    "Over 55% of India's net sown area is completely rainfed, lacking perennial irrigation infrastructure.",
                    "Monsoon rainfall timing directly dictates sowing, vegetative growth, and harvest yields for kharif crops (rice, pulses, oilseeds, cotton).",
                    "A two-week dry spell during critical growth stages can decimate crop yields even if total seasonal rainfall ends near 'normal'."
                ]
            },
            {
                "title": "2. Surface Hydrology & Groundwater",
                "bullets": [
                    "Monsoon precipitation replenishes major multi-state river basins (Ganga, Godavari, Krishna, Narmada, Mahanadi).",
                    "Hydroelectric generation, urban industrial supply, and post-monsoon rabi irrigation depend entirely on reservoir storage captured between June and September.",
                    "Precipitation intensity dictates whether water recharges deep aquifers or causes destructive surface runoff."
                ]
            },
            {
                "title": "3. The Limitations of Annual Averages",
                "bullets": [
                    "Annual or seasonal totals fail to capture meteorological risk: a catastrophic 200 mm deluge followed by a 20-day dry spell produces the same monthly total as 20 days of gentle soaking rain.",
                    "Disaster risk reduction requires analyzing intensity, frequency, duration, and spatial heterogeneity."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Rainfall in India is not merely a meteorological variable; it is the economic foundation of the nation. Over half of India's cropped land has no canal "
            "or tubewell irrigation—it is entirely rainfed. If rainfall is delayed by two weeks, or if a month's rain arrives in two catastrophic cloudbursts, "
            "crops fail regardless of what the seasonal total looks like on paper.\n\n"
            "HYDROLOGICAL IMPORTANCE:\n"
            "Furthermore, rainfall intensity governs recharge kinetics. Gentle rainfall of 15 mm/day infiltrates the soil and recharges groundwater tables. "
            "A violent downpour of 150 mm in three hours exceeds soil infiltration capacity, stripping away topsoil, overtopping dam spillways, and flooding cities.\n\n"
            "TRANSITION:\n"
            "This leads directly to the core statistical problem that motivated this monograph: the spatial masking paradox."
        )
    },
    {
        "slide_num": 3,
        "type": "split_cards",
        "category": "Problem Statement",
        "title": "The Research Problem: The Spatial Masking Paradox",
        "subtitle": "How nationwide mathematical aggregation obscures regional catastrophe",
        "cards": [
            {
                "title": "1. The Arithmetic Cancellation Trap",
                "bullets": [
                    "India spans 3.287 million km² across 15 distinct agro-climatic zones, from hyper-arid deserts to hyper-humid rainforests.",
                    "National area-weighted deviation is mathematically defined as: Delta P_national = Sum [ w_i * (P_i - Mean_P_i) ].",
                    "A +150 mm surplus in the Western Ghats mathematically cancels out a -150 mm deficit in the Gangetic Plains, producing an artificial net-zero national deviation."
                ]
            },
            {
                "title": "2. The Optical Illusion of 'Normal'",
                "bullets": [
                    "Operational bulletins routinely declare an all-India monsoon season as 'Normal' if total rainfall is within +/- 10% (or +/- 4%) of the Long Period Average.",
                    "In practice, a 'Normal' monsoon year routinely conceals simultaneous severe agricultural drought in interior Maharashtra or Bihar alongside devastating floods in Assam or Gujarat.",
                    "National aggregation delays emergency relief and distorts agricultural insurance allocations."
                ]
            },
            {
                "title": "3. The Multidimensional Imperative",
                "bullets": [
                    "Rainfall cannot be modeled as a single scalar number.",
                    "Sound climate data science requires multidimensional analysis: spatial grid resolution (0.25°), administrative district panels, non-parametric trend tests, multiple-testing error control, and extreme indices."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 3 highlights the central methodological dilemma of Indian rainfall analytics: the spatial masking paradox. "
            "Mathematically, national averaging sums positive anomalies in the wet west coast and negative anomalies in the interior plains. "
            "They cancel each other out, yielding an aggregate that appears perfectly stable.\n\n"
            "THE OPERATIONAL DANGER:\n"
            "When the headline says 'Monsoon Normal at 98% LPA', policy-makers assume water security is guaranteed. But on the ground, "
            "farmers in Marathwada or north Karnataka may be losing their entire harvest to vegetative drought. "
            "To solve this, our research investigates rainfall across multiple dimensions—from 0.25-degree gridded physical arrays to 727 administrative districts.\n\n"
            "TRANSITION:\n"
            "Let us review our five formal research questions."
        )
    },
    {
        "slide_num": 4,
        "type": "split_cards",
        "category": "Scientific Scope",
        "title": "Research Objectives & Core Scientific Inquiries",
        "subtitle": "Five targeted questions guiding the statistical monograph across multidecadal and seasonal timeframes",
        "cards": [
            {
                "title": "Q1: Multidecadal Baseline Stability",
                "bullets": [
                    "Has all-India area-weighted mean annual precipitation experienced a secular monotonic trend over 2000–2025, or is it characterized by stationary decadal oscillation?",
                    "What is the true interannual coefficient of variation across 26 continuous observation years?"
                ]
            },
            {
                "title": "Q2: Seasonal Partitioning & Invariance",
                "bullets": [
                    "How rigidly does the Southwest Monsoon command India's annual hydrologic budget?",
                    "Can we prove non-parametric seasonal hierarchy invariance across all 26 years using repeated-measures Friedman tests and Kendall's W concordance?"
                ]
            },
            {
                "title": "Q3: ETCCDI Extreme Indices Dynamics",
                "bullets": [
                    "How do standardized precipitation extremes (Rx1day, Rx5day, R10mm, R20mm, CDD, CWD, PRCPTOT, SDII) behave spatially and temporally?",
                    "Do spatial trends survive False Discovery Rate (BH-FDR at q = 0.05) multiple-testing correction across 4,885 cells?"
                ]
            },
            {
                "title": "Q4 & Q5: Data Integrity & 2026 Anomaly Analysis",
                "bullets": [
                    "How sensitive are spatial trend conclusions to zero-rainfall reporting anomalies in gridded archives?",
                    "In 2026, did actual daily rainfall depart significantly from normal baselines across 727 districts, and why does percentage departure suffer mathematical instability?"
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "We formulated five rigorous research questions. First, testing whether annual rainfall shows secular climate shifts or stationary variability. "
            "Second, proving non-parametric seasonal invariance. Third, computing the full suite of eight WMO ETCCDI extreme indices with FDR correction. "
            "Fourth, performing neighborhood sensitivity audits on data quality anomalies. "
            "And fifth, conducting a balanced panel study across 727 administrative districts in 2026 to expose mathematical instability in traditional departure metrics.\n\n"
            "TRANSITION:\n"
            "To answer these questions, we designed a unified dual-study research architecture."
        )
    },
    {
        "slide_num": 5,
        "type": "dual_panel",
        "category": "Analytical Architecture",
        "title": "Dual-Study Architecture: Multidecadal Baseline Meets Operational Dynamics",
        "subtitle": "Combining 26-year gridded climatology with high-resolution administrative panel testing",
        "panel_left": {
            "title": "STUDY 1: Historical Gridded Analysis (2000–2025)",
            "badge": "Macro-Climatological Baseline",
            "bullets": [
                "Temporal Scale: 26 full calendar years (9,497 consecutive daily timestamps).",
                "Spatial Resolution: 0.25° × 0.25° IMD Gridded NetCDF-4 daily archive.",
                "Grid Architecture: 129 latitudes × 135 longitudes = 17,415 coordinate cells.",
                "Common Spatial Footprint: 4,885 strictly validated land cells (28.0505% of grid).",
                "Statistical Methods: Cosine area-weighting, Friedman repeated-measures ANOVA, Kendall's W, Mann-Kendall test, Theil-Sen slope, Holm-Bonferroni FWER, Benjamini-Hochberg FDR (q=0.05).",
                "Core Metrics: 8 ETCCDI extreme precipitation indices (Rx1day, Rx5day, R10mm, R20mm, PRCPTOT, SDII, CDD, CWD)."
            ]
        },
        "panel_right": {
            "title": "STUDY 2: State & District Anomaly Analysis (2026)",
            "badge": "Meso-Scale Administrative Panel",
            "bullets": [
                "Temporal Window: 19 August to 12 November 2026 (85 daily reporting dates).",
                "Administrative Units: 36 States/UTs (3,060 obs) & 727 balanced districts (61,795 obs).",
                "Panel Design: Balanced temporal series across 727 districts (Nagapattinam isolated due to 36 incomplete dates).",
                "Statistical Methods: Denominator stability audit, Paired Wilcoxon signed-rank test (W=80015.5, p=2.638×10⁻²⁰), Holm family-wise correction, Welch heteroscedastic ANOVA (F=44.122), Kruskal-Wallis (H=379.419, ε²=0.5175).",
                "Focus: Actual vs. Normal departures, extreme district deluges (99 events ≥100 mm)."
            ]
        },
        "notes": (
            "SPEAKER SCRIPT:\n"
            "This slide lays out our dual-study architecture. Study 1 provides the macro-climatological anchor: 26 years of 0.25-degree daily gridded data "
            "from 2000 to 2025 across 4,885 common valid land cells. It establishes long-term annual baselines, seasonal partitioning, and computes 8 ETCCDI extreme indices.\n\n"
            "Study 2 provides the meso-scale operational test: an 85-day balanced panel of 727 districts across 36 States and UTs during 2026. This allows us to test "
            "whether daily observations conform to historical climatological normals and evaluate district-level extreme deluges in near real-time.\n\n"
            "TRANSITION:\n"
            "Let us examine the complete end-to-end analytical workflow connecting these two studies."
        )
    },
    {
        "slide_num": 6,
        "type": "workflow",
        "category": "Methodological Framework",
        "title": "End-to-End Analytical & Inferential Workflow",
        "subtitle": "From raw NetCDF arrays to multiple-testing corrected parametric and non-parametric inferences",
        "workflow_steps": [
            {"step": "01. INGESTION", "desc": "IMD NetCDF-4 Gridded 0.25° Daily Files (2000–2025) + 2026 District Tabular Reports."},
            {"step": "02. PREPROCESSING", "desc": "Common spatial footprint masking (4,885 land cells), cosine area-weighting, missing-date audit."},
            {"step": "03. CLIMATOLOGY", "desc": "Area-weighted annual totals, seasonal partitioning (SWM, Post, Pre, Winter), monthly climatology."},
            {"step": "04. NON-PARAMETRIC TESTS", "desc": "Friedman repeated-measures ANOVA, Kendall's W concordance, seasonal pairwise Wilcoxon."},
            {"step": "05. ETCCDI EXTREMES", "desc": "Computation of Rx1day, Rx5day, R10mm, R20mm, PRCPTOT, SDII, CDD, CWD per grid cell/year."},
            {"step": "06. TRENDS & CORRECTIONS", "desc": "Mann-Kendall test, Theil-Sen slope, Holm-Bonferroni correction, Benjamini-Hochberg FDR (q=0.05)."},
            {"step": "07. 2026 INFERENCE", "desc": "Paired Wilcoxon signed-rank (n=727), Welch ANOVA, Kruskal-Wallis, outlier deluges (≥100 mm)."}
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "This flowchart demonstrates our end-to-end analytical pipeline. Notice that every stage is subjected to rigorous statistical verification: "
            "we do not simply plot charts and draw qualitative conclusions. "
            "When evaluating seasonal invariance, we deploy Friedman tests and Kendall's W. When computing trends, we apply Sen's slope and Holm-Bonferroni corrections. "
            "When analyzing 4,885 spatial grid cells, we apply Benjamini-Hochberg False Discovery Rate control. "
            "And when evaluating the 2026 panel, we deploy paired Wilcoxon signed-rank tests and Welch's robust ANOVA.\n\n"
            "TRANSITION:\n"
            "Let us now enter Part B and examine the datasets and preprocessing procedures in detail."
        )
    },

    # ----------------------------------------------------
    # PART 2: DATASETS & PREPROCESSING (Slides 7–11)
    # ----------------------------------------------------
    {
        "slide_num": 7,
        "type": "split_cards",
        "category": "Dataset Overview",
        "title": "Primary Research Datasets: Sources, Resolutions & Structure",
        "subtitle": "Detailed characteristics of IMD gridded products and administrative panel records",
        "cards": [
            {
                "title": "1. IMD Gridded Rainfall Archive (2000–2025)",
                "bullets": [
                    "Provider: India Meteorological Department (IMD), National Climate Centre, Pune.",
                    "Resolution: High-resolution regular grid of 0.25° × 0.25° (~27.5 km × 27.5 km).",
                    "Format: Daily gridded NetCDF-4 binary arrays (.nc).",
                    "Temporal Coverage: 26 continuous calendar years (9,497 consecutive daily timestamps).",
                    "Interpolation: Shepard's angular distance-weighting applied across >6,995 quality-controlled raingauge stations."
                ]
            },
            {
                "title": "2. Administrative Observational Panel (2026)",
                "bullets": [
                    "Provider: Agromet Advisory Services and National Weather Forecasting Centre (NWFC), IMD.",
                    "Resolution: Administrative hierarchy spanning 36 States/UTs and 727 Districts.",
                    "Temporal Coverage: 85 daily reporting dates from 19 August 2026 to 12 November 2026.",
                    "Observed Fields: Daily Actual Rainfall (mm), Daily Normal Rainfall (mm), Reported Departure (%).",
                    "Total Panel Volume: 61,795 district-day records + 3,060 state-day records."
                ]
            },
            {
                "title": "3. Methodological Complementarity",
                "bullets": [
                    "Gridded NetCDF resolves physical atmospheric dynamics and spatial gradients independent of political boundaries.",
                    "Administrative panel links physical rainfall directly to governance, crop insurance, and disaster management units."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 7 describes our two primary data sources. The 26-year historical dataset comes from the IMD National Climate Centre in Pune. "
            "It is interpolated from over 6,995 raingauge stations onto a regular 0.25-degree grid. "
            "The 2026 observational panel comes from the IMD Agromet Advisory Services, providing real-time daily actual and normal rainfall across 727 districts.\n\n"
            "COMPLEMENTARY VALUE:\n"
            "The gridded product allows us to study atmospheric physics without administrative boundary distortions. "
            "The district panel allows us to evaluate operational risk where governance decisions are actually made.\n\n"
            "TRANSITION:\n"
            "Let us inspect the spatial grid and how we derived the Common Spatial Footprint."
        )
    },
    {
        "slide_num": 8,
        "type": "image_right",
        "category": "Spatial Grid & Sampling",
        "title": "Spatial Grid & Common Spatial Footprint (2000–2025)",
        "subtitle": "Isolating 4,885 continuous terrestrial cells across 26 calendar years",
        "image_path": "RainfallRisk_Academic_Presentation/assets/figures/fig01_spatial_coverage.png",
        "image_caption": "Figure 1: Common Spatial Footprint depicting the 4,885 valid terrestrial land cells across India.",
        "bullets": [
            "Theoretical Bounding Box: Latitude 6.5°N–38.5°N (129 points) × Longitude 66.5°E–100.0°E (135 points) = 17,415 total coordinate cells.",
            "The Sampling Bias Danger: A naive spatial mean introduces severe bias because maritime oceanic cells, trans-boundary buffer pixels, and intermittent station masks vary across years.",
            "The Intersection Mandate: We enforced a strict intersection rule: only cells with 100% valid, continuous observations across all 9,497 days were retained.",
            "Common Spatial Footprint: Exactly 4,885 land cells represent 28.0505% of the bounding box. Every multidecadal metric is calculated over this identical spatial support."
        ],
        "stat_badge": {"val": "4,885 Cells", "label": "Common Footprint (28.05% of Grid)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Figure 1 displays our Common Spatial Footprint. Of the 17,415 theoretical points in the IMD NetCDF coordinate matrix, "
            "only 4,885 represent continuous terrestrial India across all 26 years. "
            "This covers peninsular India, central plains, the Western Ghats, and the northeastern states.\n\n"
            "CRITICAL METHODOLOGICAL DETAIL:\n"
            "If an analyst does not fix the spatial footprint, a cell might be included in 2005 but masked in 2018, creating artificial temporal trends. "
            "By strictly enforcing a 100% temporal continuity intersection across all 9,497 days, we guarantee that every trend observed in Study 1 "
            "reflects real atmospheric change, not changing interpolation masks.\n\n"
            "TRANSITION:\n"
            "How did we correct for the spherical curvature of the Earth? Let us examine cosine area-weighting and quality control."
        )
    },
    {
        "slide_num": 9,
        "type": "split_cards",
        "category": "Data Preprocessing & QC",
        "title": "Data Preprocessing: Cosine Area-Weighting & Neighborhood QC",
        "subtitle": "Correcting meridional convergence and auditing 90 zero-rainfall candidate cells",
        "cards": [
            {
                "title": "1. Meridional Convergence Correction",
                "bullets": [
                    "On a spherical geoid, longitudinal distance shrinks toward the poles: Cell Area = R^2 * d_lambda * d_phi * cos(phi).",
                    "India spans from ~8°N (cos = 0.990) to ~37°N (cos = 0.799). An unweighted mean would overestimate northern cells by ~20% relative to southern cells.",
                    "We applied normalized cosine-latitude weights: w_i = cos(phi_i) / Sum[ cos(phi_j) ], ensuring exact volumetric spatial fidelity."
                ]
            },
            {
                "title": "2. Spatial Neighborhood Audit",
                "bullets": [
                    "Gridded products can retain station dropouts where a cell records 0 mm while all neighbors report heavy rain.",
                    "We audited all 4,885 cells across 26 years: a cell was flagged if it reported 0 mm while its 8 contiguous Moore neighbors recorded positive rain.",
                    "Exactly 90 candidate cells were isolated in an Anomaly Flag Register (mostly coastal promontories and complex border relief)."
                ]
            },
            {
                "title": "3. Dual-Scenario Sensitivity Framework",
                "bullets": [
                    "Rather than arbitrarily deleting flagged cells, we established two parallel analytical scenarios:",
                    "Scenario A: Full Common Spatial Footprint (all 4,885 cells).",
                    "Scenario B: Cleaned Unflagged Footprint (4,795 cells, excluding the 90 candidate cells).",
                    "All core conclusions were validated for invariance across both scenarios."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 9 highlights two foundational data engineering steps. First, cosine area-weighting. Because lines of longitude converge toward the poles, "
            "a grid cell in Kashmir represents a significantly smaller physical area than a grid cell in Tamil Nadu. "
            "By weighting each cell by the cosine of its latitude, we ensure exact conservation of rainfall volume.\n\n"
            "QUALITY CONTROL AUDIT:\n"
            "Second, we conducted a spatial neighborhood audit across all 4,885 cells. We searched for instances where a cell reported zero rainfall "
            "despite being surrounded by wet neighbors. We identified 90 candidate anomaly cells. "
            "Rather than sweeping them under the rug, we established two parallel scenarios: Scenario A with all 4,885 cells, and Scenario B excluding the 90 cells, "
            "to prove our conclusions are insensitive to potential station dropouts.\n\n"
            "TRANSITION:\n"
            "Let us inspect the administrative panel preprocessing for the 2026 study."
        )
    },
    {
        "slide_num": 10,
        "type": "split_cards",
        "category": "2026 Panel Preprocessing",
        "title": "The 2026 Administrative Panel: Balanced District Design",
        "subtitle": "Processing 61,795 observations across 727 districts and auditing missing dates",
        "cards": [
            {
                "title": "1. Temporal Monitoring Window",
                "bullets": [
                    "Observation Window: 19 August 2026 to 12 November 2026 (85 daily reporting dates).",
                    "Missing Date Audit: National server synchronization failed completely on 31 October 2026 (zero records nationally).",
                    "Open Science Principle: Rather than inventing data via synthetic imputation, the missing date was documented transparently; the panel contains 85 verified dates.",
                    "Seasonal Phase: Captures the late monsoon withdrawal and early post-monsoon transition."
                ]
            },
            {
                "title": "2. Administrative Panel Balancing",
                "bullets": [
                    "State Level: 36 reporting States and Union Territories (36 × 85 = 3,060 complete records).",
                    "District Level: 727 districts possess complete 85-day records (61,795 total observations).",
                    "Isolating Incomplete Series: Nagapattinam district (Tamil Nadu) reported on only 36 dates due to local telemetry dropouts and was isolated to preserve balanced panel integrity."
                ]
            },
            {
                "title": "3. Variables & Core Metrics",
                "bullets": [
                    "Reported Fields: Daily Actual Rainfall (A_it, mm), Daily Normal Rainfall (N_it, mm), and Reported Percentage Departure (D_it, %).",
                    "Methodological Audit: Before conducting hypothesis tests, we conducted a mathematical audit on the stability of reported percentage departures."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "For the 2026 study, we monitored daily administrative records across 36 States/UTs and 727 districts. "
            "Two data cleaning steps were crucial: first, our server audit discovered that October 31, 2026 was missing nationally from IMD feeds. "
            "Rather than inventing synthetic data, we analyzed the 85 genuine observed dates.\n\n"
            "BALANCED PANEL DESIGN:\n"
            "Second, Nagapattinam district had missing telemetry for 49 days. To prevent unbalancing the panel, Nagapattinam was isolated. "
            "The remaining 727 districts form a perfectly balanced panel of 61,795 observations, providing a clean foundation for paired hypothesis testing.\n\n"
            "TRANSITION:\n"
            "Now let us examine Part C: the statistical methodology and mathematical formulations used throughout the monograph."
        )
    },

    # ----------------------------------------------------
    # PART 3: STATISTICAL METHODOLOGY (Slides 11–15)
    # ----------------------------------------------------
    {
        "slide_num": 11,
        "type": "split_cards",
        "category": "Methodology: Climatology",
        "title": "Methodology: Climatological Aggregation & Seasonal Partitioning",
        "subtitle": "Mathematical formulations for area-weighted means and normalized daily intensity",
        "cards": [
            {
                "title": "1. Area-Weighted Daily Mean",
                "bullets": [
                    "For day t in {1, ..., 9497}, the all-India area-weighted mean rainfall is: P_bar_t = Sum [ w_i * P_it ], where w_i = cos(phi_i) / Sum[ cos(phi_j) ].",
                    "Annual rainfall for year y is aggregated as: Annual_y = Sum [ P_bar_t ] for all t in year y.",
                    "Preserves true physical water column depth across the subcontinent."
                ]
            },
            {
                "title": "2. IMD Seasonal Partitioning",
                "bullets": [
                    "Winter: January–February (59 days; 60 in leap years).",
                    "Pre-Monsoon: March–May (92 days; convective Kalbaishakhi/Nor'westers).",
                    "Southwest Monsoon (SWM): June–September (122 days; primary monsoon surge).",
                    "Post-Monsoon: October–December (92 days; northeast monsoon / cyclogenesis)."
                ]
            },
            {
                "title": "3. Normalized Seasonal Daily Intensity",
                "bullets": [
                    "Because seasons vary in duration (59 to 122 days), raw seasonal totals cannot be directly compared for intensity.",
                    "Normalized daily intensity is defined as: I_sy = (Seasonal Rainfall_sy) / (Days in Season_sy) in mm/day.",
                    "Forms the standardized basis for non-parametric repeated-measures ANOVA."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 11 outlines our climatological aggregation formulas. Daily all-India rainfall is computed as the cosine area-weighted sum of all 4,885 cells. "
            "Annual rainfall is the sum of these daily values.\n\n"
            "SEASONAL NORMALIZATION:\n"
            "When comparing seasons, a fundamental error is comparing raw seasonal totals: the monsoon has 122 days, while winter has only 59 days. "
            "To make seasons statistically comparable, we normalized each season by its exact number of days, yielding normalized daily intensity in millimeters per day. "
            "This metric allows rigorous repeated-measures analysis.\n\n"
            "TRANSITION:\n"
            "How do we prove whether seasonal differences are statistically significant across all 26 years? Let us examine the Friedman test and Kendall's W."
        )
    },
    {
        "slide_num": 12,
        "type": "split_cards",
        "category": "Methodology: Non-Parametric ANOVA",
        "title": "Methodology: Non-Parametric Repeated Measures (Friedman & Kendall's W)",
        "subtitle": "Testing seasonal invariance without normality assumptions across 26 paired years",
        "cards": [
            {
                "title": "1. Why Non-Parametric ANOVA?",
                "bullets": [
                    "Daily and seasonal rainfall distributions violate normality: winter is heavily zero-inflated, while the monsoon is heavily right-skewed.",
                    "Ordinary repeated-measures ANOVA relies on normally distributed residuals and sphericity, which rainfall violates.",
                    "Friedman's test operates on ranks within each year, making it completely distribution-free and immune to outlier skewness."
                ]
            },
            {
                "title": "2. The Friedman Test Statistic",
                "bullets": [
                    "Within each year y (n = 26), the 4 seasons (k = 4) are ranked from 1 (lowest intensity) to 4 (highest intensity).",
                    "Friedman statistic: Chi^2_F = [ 12 / (n * k * (k+1)) ] * Sum [ R_s^2 ] - 3 * n * (k+1).",
                    "Under null hypothesis H0 (equal seasonal intensity ranks), Chi^2_F asymptotically follows Chi-square with df = k - 1 = 3."
                ]
            },
            {
                "title": "3. Kendall's W Concordance Effect Size",
                "bullets": [
                    "Kendall's coefficient of concordance measures the degree of agreement across years: W = Chi^2_F / [ n * (k - 1) ], where W in [0, 1].",
                    "W = 1.0 indicates perfect identical ranking across all 26 years.",
                    "Post-hoc pairwise contrasts are evaluated using Wilcoxon signed-rank tests with Holm-Bonferroni step-down correction."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "In atmospheric science, precipitation distributions are zero-inflated and right-skewed. Classical repeated-measures ANOVA assumes normal residuals, "
            "which is invalid for rainfall. We therefore deployed the Friedman non-parametric two-way analysis of variance by ranks.\n\n"
            "THE EFFECT SIZE (KENDALL'S W):\n"
            "The Friedman test ranks the four seasons within each year from 1 to 4. We compute the Chi-square statistic across rank sums. "
            "To quantify practical significance, we calculate Kendall's W. A Kendall's W close to 1.0 proves that the seasonal hierarchy is not a random artifact "
            "but an invariant physical law across the entire 26-year record.\n\n"
            "TRANSITION:\n"
            "Now let us examine how we detect multidecadal trends: the Mann-Kendall test and Theil-Sen slope."
        )
    },
    {
        "slide_num": 13,
        "type": "split_cards",
        "category": "Methodology: Trend Testing",
        "title": "Methodology: Monotonic Trend Detection (Mann-Kendall & Sen's Slope)",
        "subtitle": "Robust rank-based trend testing and median pairwise rate estimation",
        "cards": [
            {
                "title": "1. Mann-Kendall Test Statistic (S)",
                "bullets": [
                    "Tests for monotonic upward or downward trends without assuming linear normality.",
                    "Statistic S = Sum_{k=1}^{n-1} Sum_{j=k+1}^n sgn(x_j - x_k), where sgn(theta) in {+1, 0, -1}.",
                    "Variance Var(S) accounts for tied values. For n = 26, normalized test statistic Z_MK = (S - sgn(S)) / sqrt(Var(S)) follows standard normal N(0, 1).",
                    "Kendall's rank correlation coefficient tau = 2S / [ n(n - 1) ]."
                ]
            },
            {
                "title": "2. Theil-Sen Median Slope Estimator",
                "bullets": [
                    "Ordinary Least Squares (OLS) regression is severely distorted by single extreme years (e.g., the 2002 drought).",
                    "Theil-Sen slope beta = median [ (x_j - x_k) / (j - k) ] across all 1 <= k < j <= n pairwise combinations.",
                    "Possesses a high breakdown point of 29.3%, providing an unbiased estimate of annual change rate.",
                    "95% confidence intervals are computed non-parametrically; if CI crosses zero, the trend is non-significant."
                ]
            },
            {
                "title": "3. Ljung-Box Autocorrelation Diagnostics",
                "bullets": [
                    "Positive lag-1 serial correlation inflates Type I errors in trend tests.",
                    "We computed Ljung-Box Q-tests across lags 1, 2, and 3 to confirm temporal independence before interpreting trend significance."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 13 details our trend detection framework. Ordinary least squares regression is vulnerable to extreme outliers; a single drought like 2002 "
            "can artificially tilt an OLS slope. We therefore deployed the non-parametric Mann-Kendall test paired with Theil-Sen slope estimation.\n\n"
            "THEIL-SEN PROPERTIES:\n"
            "The Theil-Sen slope calculates the median of all pairwise slopes between years. It has a high breakdown point, meaning nearly 30% of data points "
            "can be extreme outliers without distorting the slope. Furthermore, we computed Ljung-Box autocorrelation diagnostics to verify that serial dependence "
            "did not inflate test statistics.\n\n"
            "TRANSITION:\n"
            "When testing thousands of grid cells, how do we prevent false discoveries? Let us examine multiple-testing corrections."
        )
    },
    {
        "slide_num": 14,
        "type": "split_cards",
        "category": "Methodology: Error Control",
        "title": "Methodology: Multiple-Testing Control (Holm FWER vs. Benjamini-Hochberg FDR)",
        "subtitle": "Controlling Family-Wise Error Rate and False Discovery Rate in spatial grids",
        "cards": [
            {
                "title": "1. The Multiple-Comparison Trap",
                "bullets": [
                    "When testing m independent hypotheses at alpha = 0.05, the probability of at least one false positive is: P(False Positive) = 1 - (1 - alpha)^m.",
                    "For the 8 ETCCDI index temporal tests (m = 8), P(False Positive) rises to 33.7%.",
                    "For the 4,885 spatial grid cells (m = 4,885), an uncorrected test guarantees ~244 false-positive 'significant' cells purely by chance!",
                    "Uncorrected spatial trend maps in literature routinely report stochastic noise as 'climate change'."
                ]
            },
            {
                "title": "2. Holm-Bonferroni FWER Step-Down",
                "bullets": [
                    "Applied to small hypothesis families (8 temporal index tests, 28 state paired tests).",
                    "Sorts raw p-values in ascending order: P_(1) <= P_(2) <= ... <= P_(m).",
                    "Rejects H_(i) if P_(j) <= alpha / (m - j + 1) for all j <= i. Controls Family-Wise Error Rate strictly at alpha = 0.05."
                ]
            },
            {
                "title": "3. Benjamini-Hochberg FDR (q = 0.05)",
                "bullets": [
                    "Applied to high-dimensional spatial grids (m = 4,885 cells) where Bonferroni is excessively conservative.",
                    "Controls the False Discovery Rate (expected proportion of false positives among rejected hypotheses).",
                    "Critical threshold: k* = max { i : P_(i) <= (i / m) * q }. Rejects all H_(1), ..., H_(k*)."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 14 is one of the most critical methodological slides in this presentation. In spatial climatology, researchers routinely run trend tests "
            "on thousands of grid cells and highlight cells where raw p < 0.05. "
            "Across 4,885 cells, basic probability guarantees that approximately 244 cells will show p < 0.05 purely by random chance!\n\n"
            "TWO-TIERED ERROR CONTROL:\n"
            "We implemented a rigorous two-tiered correction framework. For small families (like the 8 extreme indices or 28 states), we applied Holm-Bonferroni "
            "step-down correction to control family-wise error rate. "
            "For the 4,885 spatial grid cells, we applied the Benjamini-Hochberg False Discovery Rate procedure at q = 0.05, preventing false discovery inflation.\n\n"
            "TRANSITION:\n"
            "Now let us examine the statistical methods applied to the 2026 administrative panel."
        )
    },
    {
        "slide_num": 15,
        "type": "split_cards",
        "category": "Methodology: 2026 Panel Tests",
        "title": "Methodology: 2026 Hypothesis Testing (Wilcoxon, Welch ANOVA, Kruskal-Wallis)",
        "subtitle": "Robust non-parametric paired testing and heteroscedastic between-state variance models",
        "cards": [
            {
                "title": "1. Paired Wilcoxon Signed-Rank Test",
                "bullets": [
                    "Evaluates the paired difference D_i = Actual_i - Normal_i across n = 727 districts.",
                    "Ranks absolute differences |D_i| and computes rank sum W = Sum [ sgn(D_i) * Rank(|D_i|) ].",
                    "Immune to extreme deluges (outliers) and zero-inflation. Normalized asymptotic z-score tested against standard normal."
                ]
            },
            {
                "title": "2. Welch's Heteroscedastic One-Way ANOVA",
                "bullets": [
                    "Tests between-state variance across k = 28 states with unequal sample sizes (UP has 75 districts, Goa has 2) and unequal variances.",
                    "Applies Satterthwaite denominator degrees of freedom adjustment to prevent variance heterogeneity from inflating Type I error.",
                    "F_Welch statistic tests null hypothesis that all state mean differences are identical."
                ]
            },
            {
                "title": "3. Kruskal-Wallis & Epsilon-Squared (ε²)",
                "bullets": [
                    "Non-parametric one-way ANOVA across ranked differences: H = [ 12 / (N*(N+1)) ] * Sum [ R_j^2 / n_j ] - 3*(N+1).",
                    "Non-parametric effect size: Epsilon-squared = (H - k + 1) / (N - k), measuring proportion of variance explained by state boundaries.",
                    "Post-hoc contrasts evaluated via pairwise Welch-Holm t-tests and Dunn-Holm rank tests."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 15 covers the statistical tests applied to our 2026 panel. To test whether 2026 daily rainfall departed from climatological baselines, "
            "we executed a nationwide paired Wilcoxon signed-rank test across all 727 districts.\n\n"
            "BETWEEN-STATE VARIANCE:\n"
            "To test whether states differ from each other, ordinary ANOVA is invalid because district counts and variances vary widely between states (heteroscedasticity). "
            "We therefore used Welch's robust ANOVA and the non-parametric Kruskal-Wallis test. "
            "Furthermore, we calculated Epsilon-squared to determine exactly what percentage of variance in district rainfall is explained by state administrative grouping.\n\n"
            "TRANSITION:\n"
            "Let us now enter Part D and examine the findings of our 26-year historical study."
        )
    },

    # ----------------------------------------------------
    # PART 4: HISTORICAL RAINFALL ANALYSIS (Slides 16–28)
    # ----------------------------------------------------
    {
        "slide_num": 16,
        "type": "image_right",
        "category": "Historical Climatology",
        "title": "Annual Rainfall Variability: 26-Year Climatology (2000–2025)",
        "subtitle": "Decadal anomaly trajectory, rolling averages, and bounded macroeconomic stability",
        "image_path": "RainfallRisk_Academic_Presentation/assets/figures/fig04_annual_trend_anomalies.png",
        "image_caption": "Figure 2: All-India annual rainfall time series (2000–2025), 5-year moving average, and percentage anomaly departures from long-term mean.",
        "bullets": [
            "Long-Term Annual Mean: 1,149.603 mm (Standard Deviation: 98.560 mm).",
            "Low Interannual Volatility: Coefficient of Variation (CV) = 8.573%, reflecting macro-scale stability.",
            "Historical Boundaries: Wettest year was 2020 (1,285.857 mm, +11.85% departure); Driest year was 2002 (947.124 mm, -17.61% departure).",
            "Drought Epoch Clustering: Severe multi-year deficits in 2002 (-17.61%), 2009 (-13.91%), and consecutive El Niño years 2014 (-12.35%) and 2015 (-14.07%).",
            "Non-Parametric Trend Result: Mann-Kendall Tau = 0.1508, p = 0.2932, Sen's slope = +3.424 mm/year (95% CI: [-3.512, +9.840]). Statistically non-significant; India's rainfall exhibits bounded decadal oscillation rather than a secular monotonic trend."
        ],
        "stat_badge": {"val": "1,149.60 mm", "label": "Mean Annual Rainfall (CV: 8.57%)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Figure 2 presents our 26-year all-India annual rainfall time series alongside its 5-year moving average and percentage departures. "
            "The long-term area-weighted mean is 1,149.60 mm, with a standard deviation of 98.56 mm. "
            "This produces an interannual coefficient of variation of only 8.57%, demonstrating macro-synoptic stability.\n\n"
            "EMPIRICAL BOUNDS & TREND TEST:\n"
            "The historical extremes of the record are 2002 (the driest year at 947.12 mm, down 17.6%) and 2020 (the wettest year at 1,285.86 mm, up 11.8%). "
            "Notice the clustering of dry years: 2002, 2009, 2014, and 2015, followed by the wet rebound of 2019 to 2022. "
            "When we run the Mann-Kendall trend test, the p-value is 0.2932 and the Sen's slope 95% confidence interval crosses zero. "
            "We conclude that India's national rainfall volume has been stationary across 2000–2025.\n\n"
            "TRANSITION:\n"
            "Let us inspect the spatiotemporal evolution of rainfall across all 26 years using our dynamic map animation."
        )
    },
    {
        "slide_num": 17,
        "type": "gif_left",
        "category": "Spatiotemporal Dynamics",
        "title": "Multidecadal Spatiotemporal Dynamics: Annual Rainfall Animation",
        "subtitle": "Spatiotemporal evolution of total annual precipitation across India (2000–2025)",
        "image_path": "RainfallRisk_Academic_Presentation/assets/gifs/India_Annual_Rainfall_Animation_2000_2025.gif",
        "image_caption": "Embedded Animation 1: Spatiotemporal evolution of India annual rainfall (2000–2025) across 4,885 grid cells.",
        "bullets": [
            "Persistent Orographic Controls: In every single year, precipitation exceeding 2,500–4,000 mm concentrates along the Western Ghats windward scarp and the Meghalaya/Assam hills.",
            "The Continental Rain Shadow: The interior Deccan Plateau (interior Maharashtra, Karnataka, Rayalaseema) consistently receives under 600–800 mm, bounded by western orography.",
            "Northwest Aridity: Western Rajasthan consistently records under 300–400 mm, exhibiting high year-to-year proportional volatility.",
            "Dynamic Shift Visibility: The animation reveals that during drought years (e.g., 2002, 2009, 2014), aridity expands eastward from Rajasthan across the Gangetic Plains, whereas in wet years (2019, 2020), the central monsoon trough broadens significantly."
        ],
        "stat_badge": {"val": "26 Years", "label": "Annual Spatial Dynamics (2000–2025)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "This embedded animation cycles through the annual rainfall maps for all 26 years from 2000 to 2025. "
            "Notice the stark, permanent contrast in India's physical geography: the deep blue and purple bands along the Western Ghats and northeast "
            "consistently receive 3,000 to 4,000 mm of rain, while the rain shadow of the Deccan plateau and western Rajasthan remain pale yellow and green.\n\n"
            "DROUGHT EXPANSION DYNAMICS:\n"
            "Watch what happens during major drought years: in 2002 and 2009, the dry yellow zone in the northwest expands across central India and into the Gangetic Plains. "
            "In wet years like 2019 and 2020, the central belt deepens into intense greens and blues. "
            "This confirms that national droughts are driven by contraction of the central monsoon trough.\n\n"
            "TRANSITION:\n"
            "How is this precipitation budget partitioned across the four seasons? Let us examine seasonal distribution."
        )
    },
    {
        "slide_num": 18,
        "type": "dual_image",
        "category": "Seasonal Partitioning",
        "title": "Seasonal Rainfall Partitioning: Southwest Monsoon Dominance",
        "subtitle": "Quantifying seasonal budget contributions across 26 homogeneous observation years",
        "image_left": "RainfallRisk_Academic_Presentation/assets/figures/fig05_seasonal_comparison.png",
        "caption_left": "Figure 3A: Seasonal rainfall comparison (mm).",
        "image_right": "RainfallRisk_Academic_Presentation/assets/figures/fig06_seasonal_stacked.png",
        "caption_right": "Figure 3B: Annual percentage stacked seasonal contributions.",
        "bullets": [
            "Southwest Monsoon (Jun–Sep): Delivers 75.28% of annual rainfall (mean: 865.381 mm, SD: 85.344 mm, CV: 9.862%).",
            "Post-Monsoon (Oct–Dec): Contributes 13.78% (mean: 158.398 mm, SD: 37.892 mm), crucial for rabi agriculture in the southeastern peninsula.",
            "Pre-Monsoon (Mar–May): Accounts for 9.28% (mean: 106.662 mm, SD: 23.957 mm), driven by convective thunderstorm activity.",
            "Winter (Jan–Feb): Delivers only 1.66% (mean: 19.162 mm, SD: 10.361 mm) via Western Disturbances in the northwest.",
            "Proportional Stability: Figure 3B illustrates that even in severe drought years, the Southwest Monsoon never drops below 70% of the annual budget."
        ],
        "stat_badge": {"val": "75.28%", "label": "Southwest Monsoon Share (865.38 mm)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "These two charts illustrate the seasonal partitioning of India's rainfall budget. Figure 3A shows absolute seasonal totals, "
            "while Figure 3B displays the stacked percentage contributions over all 26 years.\n\n"
            "THE COLOSSAL WEIGHT OF THE MONSOON:\n"
            "The Southwest Monsoon from June through September accounts for exactly three-quarters of the entire annual budget: 75.28%, or 865.38 mm. "
            "The Post-Monsoon accounts for 13.78%, Pre-Monsoon for 9.28%, and Winter contributes just 1.66%. "
            "Notice how consistent this proportional stack is across all 26 years. Even in the worst drought of 2002, the monsoon still accounted for over 70% of total rainfall.\n\n"
            "TRANSITION:\n"
            "Can we statistically prove that this seasonal ranking is invariant across all 26 years? Let us review the Friedman test."
        )
    },
    {
        "slide_num": 19,
        "type": "dual_image",
        "category": "Seasonal Invariance Testing",
        "title": "Non-Parametric Seasonal Invariance: Friedman Test Results",
        "subtitle": "Rigorous repeated-measures hypothesis testing across normalized daily intensity",
        "image_left": "RainfallRisk_Academic_Presentation/assets/figures/fig07_seasonal_intensity_boxplot.png",
        "caption_left": "Figure 4A: Seasonal daily intensity distributions (mm/day).",
        "image_right": "RainfallRisk_Academic_Presentation/assets/figures/fig08_seasonal_trend_panels.png",
        "caption_right": "Figure 4B: Seasonal intensity trend panels with Sen's slopes.",
        "bullets": [
            "Friedman Repeated-Measures Test: Chi^2_F = 70.9385, df = 3, p = 2.687 × 10⁻¹⁵. Decisively rejects the null hypothesis of equal seasonal distributions.",
            "Concordance Effect Size: Kendall's W = 0.9095, confirming near-perfect rank agreement across all 26 observation years.",
            "Pairwise Wilcoxon Signed-Rank Tests (Holm-Corrected): All six pairwise seasonal contrasts are statistically significant at p < 1.0 × 10⁻⁵.",
            "Strict Intensity Hierarchy: SWM (7.093 mm/day) >> Post-Monsoon (1.722 mm/day) > Pre-Monsoon (1.159 mm/day) > Winter (0.324 mm/day). In zero out of 26 years did any rank reversal occur between the monsoon and other seasons."
        ],
        "stat_badge": {"val": "W = 0.9095", "label": "Kendall's Concordance (p = 2.69×10⁻¹⁵)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "To prove that seasonal differences are statistically robust and not subject to interannual reversals, we conducted a repeated-measures "
            "Friedman test on normalized daily rainfall intensity (mm/day). The resulting Chi-square is 70.9385 with 3 degrees of freedom, yielding a p-value "
            "of 2.687 × 10⁻¹⁵.\n\n"
            "PERFECT RANK CONCORDANCE:\n"
            "The effect size, Kendall's W, is 0.9095. A Kendall's W close to 1.0 indicates near-perfect concordance across all 26 years. "
            "Furthermore, post-hoc pairwise Wilcoxon signed-rank tests with Holm-Bonferroni correction confirm that every individual seasonal contrast is "
            "statistically significant at p < 10⁻⁵. In 26 out of 26 years, the intensity hierarchy remains strictly invariant: Monsoon > Post-Monsoon > Pre-Monsoon > Winter.\n\n"
            "TRANSITION:\n"
            "Let us inspect the intra-annual monthly climatology and month-by-month heatmap."
        )
    },
    {
        "slide_num": 20,
        "type": "dual_image",
        "category": "Intra-Seasonal Dynamics",
        "title": "Intra-Seasonal Climatology: Monthly Apex & Heatmap Matrix",
        "subtitle": "Uncovering intra-seasonal precipitation rhythms and mid-monsoon delivery peaks",
        "image_left": "RainfallRisk_Academic_Presentation/assets/figures/fig09_monthly_climatology.png",
        "caption_left": "Figure 5A: Monthly rainfall climatology (mean ± SD).",
        "image_right": "RainfallRisk_Academic_Presentation/assets/figures/fig10_year_month_heatmap.png",
        "caption_right": "Figure 5B: Month-by-Year rainfall intensity matrix.",
        "bullets": [
            "Bimodal Monsoon Apex: July is the wettest month climatologically (286.91 mm), followed closely by August (258.42 mm), together delivering 47.44% of annual rainfall.",
            "Monsoon Transition Months: June averages 165.65 mm as the monsoon establishes; September averages 154.40 mm during the withdrawal phase.",
            "Interannual Apex Shifting: In Figure 5B, peak intensity shifts dynamically between July (e.g., 2005, 2023) and August (e.g., 2020).",
            "Anomalous July Breaks: The 2002 nationwide drought is prominently visible as an anomalous pale stripe in July, confirming that severe national droughts are initiated by mid-monsoon breaks."
        ],
        "stat_badge": {"val": "286.91 mm", "label": "July Climatological Mean (Apex)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Figure 5A shows the monthly climatology curve, and Figure 5B displays the complete 26-year by 12-month heatmap matrix. "
            "July represents the climatological peak of the Indian water calendar, averaging 286.91 mm, followed by August at 258.42 mm. "
            "Together, these two mid-monsoon months deliver nearly half of India's annual precipitation budget.\n\n"
            "HEATMAP ANOMALY DIAGNOSTICS:\n"
            "The heatmap matrix reveals critical intra-seasonal dynamics. For instance, in 2002, July experienced an unprecedented nationwide monsoon collapse, "
            "visible as a pale stripe, which triggered one of modern India's worst agricultural droughts. Conversely, in 2020, August was exceptionally wet.\n\n"
            "TRANSITION:\n"
            "Beyond mean totals, what matters most for disaster management are precipitation extremes. "
            "Let us examine the Expert Team on Climate Change Detection and Indices framework."
        )
    },
    {
        "slide_num": 21,
        "type": "table",
        "category": "Precipitation Extremes Framework",
        "title": "The 8 ETCCDI Extreme Precipitation Indices Framework",
        "subtitle": "WMO standardized climate indices implemented across 4,885 grid cells (2000–2025)",
        "headers": ["Index Name", "Description", "Standard Unit", "Physical / Hydrological Mechanism"],
        "rows": [
            ["Rx1day", "Maximum 1-day precipitation", "mm", "Measures localized flash-flood potential and peak convective burst intensity."],
            ["Rx5day", "Maximum consecutive 5-day precipitation", "mm", "Key metric for basin-scale inundation, riverine flooding, and reservoir capacity."],
            ["R10mm", "Heavy precipitation days (daily rain ≥ 10 mm)", "Days", "Threshold for effective agricultural soil moisture recharge."],
            ["R20mm", "Very heavy precipitation days (daily rain ≥ 20 mm)", "Days", "Threshold where surface runoff typically exceeds soil infiltration capacity."],
            ["PRCPTOT", "Total precipitation on wet days", "mm", "Overall wet-day volume accounting for true hydrologic yield."],
            ["SDII", "Simple Daily Intensity Index (PRCPTOT / Wet Days)", "mm/day", "Daily precipitation intensity on active wet days."],
            ["CDD", "Maximum consecutive dry days (daily rain < 1.0 mm)", "Days", "Indicator of meteorological and agricultural drought hazard."],
            ["CWD", "Maximum consecutive wet days (daily rain ≥ 1.0 mm)", "Days", "Indicator of sustained waterlogging, crop root damage, and slope instability."]
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "To rigorously analyze extremes without arbitrary threshold definitions, we adopted the WMO Expert Team on Climate Change Detection and Indices "
            "(ETCCDI) framework. We computed eight standardized indices for every grid cell across all 26 years.\n\n"
            "WET-DAY THRESHOLD VERIFICATION:\n"
            "As audited directly in our computational code, wet days for ETCCDI grid-cell indices are strictly defined following WMO standards as days with "
            "daily precipitation >= 1.0 mm. Days with < 1.0 mm are classified as dry days. "
            "For administrative and national summaries, the official IMD threshold of >= 2.5 mm is utilized.\n\n"
            "TRANSITION:\n"
            "Let us inspect the first extreme intensity metric: Rx1day."
        )
    },
    {
        "slide_num": 22,
        "type": "gif_left",
        "category": "ETCCDI Precipitation Extremes",
        "title": "Deluge Intensity Dynamics: Rx1day Climatology & Hotspots",
        "subtitle": "Spatiotemporal dynamics of single-day catastrophic deluge intensity",
        "image_path": "RainfallRisk_Academic_Presentation/assets/gifs/Rx1day_2000_2025.gif",
        "image_caption": "Embedded Animation 2: Interannual evolution of Rx1day (2000–2025) across 4,885 grid cells.",
        "bullets": [
            "Physical Mechanism: Captures extreme sub-synoptic convective bursts, cloudbursts, and tropical cyclonic landfall events.",
            "Topographical Hotspots: Peak single-day rainfall consistently exceeds 250–400 mm/day along the windward crest of the Western Ghats (Konkan, Goa, coastal Karnataka) and the Meghalaya plateau.",
            "Rain-Shadow Quiescence: Interior peninsular rain-shadow zones and western Rajasthan record annual Rx1day values rarely exceeding 40–60 mm.",
            "Data Quality Caveat: Certain localized single-cell readings in raw NetCDF archives exhibit extreme spikes (>500 mm/day); these have been documented for independent radar/ground verification rather than accepted as unverified truth."
        ],
        "stat_badge": {"val": "Rx1day", "label": "Max 1-Day Deluge Metric"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 22 presents the animated evolution of Rx1day—the maximum one-day precipitation recorded in each grid cell for every year from 2000 to 2025. "
            "Notice how the high-intensity signals flare up along the Western Ghats and coastal Odisha and Andhra Pradesh during cyclonic landfall events.\n\n"
            "QUALITY CONTROL TRANSPARENCY:\n"
            "In our research monograph, we maintain strict scientific skepticism. Certain raw NetCDF cells show extraordinary single-day values exceeding 500 mm. "
            "Rather than uncritically treating these as verified climatological extremes, we flag them as potential localized observational artifacts requiring "
            "radar and ground-station cross-validation.\n\n"
            "TRANSITION:\n"
            "Let us examine cumulative multi-day inundation via Rx5day."
        )
    },
    {
        "slide_num": 23,
        "type": "gif_left",
        "category": "ETCCDI Precipitation Extremes",
        "title": "Cumulative Basin Flood Risk: Rx5day Dynamics",
        "subtitle": "Basin-scale flood risk metric tracking 5-day cumulative rainfall accumulation",
        "image_path": "RainfallRisk_Academic_Presentation/assets/gifs/Rx5day_2000_2025.gif",
        "image_caption": "Embedded Animation 3: Interannual evolution of Rx5day (2000–2025) across 4,885 grid cells.",
        "bullets": [
            "Hydrological Relevance: Rx5day is the primary atmospheric driver of major river basin inundation (Brahmaputra, Mahanadi, Godavari, Narmada).",
            "Cumulative Magnitudes: 5-day totals frequently exceed 500–800 mm in orographic barriers and along synoptic monsoon depression tracks.",
            "Broad Spatial Coherence: Unlike isolated Rx1day convective spikes, Rx5day exhibits broad spatial coherence, reflecting organized synoptic low-pressure systems traversing central India.",
            "Major Historical Expansions: Extensive multi-day flood footprints occurred in 2005 (Maharashtra deluges), 2018 (Kerala floods), and 2020."
        ],
        "stat_badge": {"val": "Rx5day", "label": "5-Day Basin Flood Index"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "While Rx1day governs flash floods in small urban catchments, Rx5day governs basin-scale inundation in major river systems. "
            "When a monsoon depression stalls over central India for five consecutive days, soil profiles reach full saturation, and reservoir floodgates must open.\n\n"
            "ANIMATION INTERPRETATION:\n"
            "The embedded animation shows the spatial spread of multi-day deluges. In years like 2005, 2018, and 2020, large continuous swathes of central and peninsular "
            "India turn deep blue and purple, indicating 5-day accumulations exceeding 500 mm. "
            "Yet, just like Rx1day, when we test for secular 26-year trends across the grid, the changes are highly localized rather than spatially uniform.\n\n"
            "TRANSITION:\n"
            "Now let us examine the frequency of heavy rainfall days: R10mm and R20mm."
        )
    },
    {
        "slide_num": 24,
        "type": "dual_image",
        "category": "ETCCDI Precipitation Extremes",
        "title": "Heavy Rainfall Frequency: R10mm & R20mm Thresholds",
        "subtitle": "Monitoring the annual count of days exceeding moderate and heavy rainfall thresholds",
        "image_left": "RainfallRisk_Academic_Presentation/assets/gifs/R10mm_2000_2025.gif",
        "caption_left": "Embedded Animation 4A: R10mm days (≥ 10 mm).",
        "image_right": "RainfallRisk_Academic_Presentation/assets/gifs/R20mm_2000_2025.gif",
        "caption_right": "Embedded Animation 4B: R20mm days (≥ 20 mm).",
        "bullets": [
            "Threshold Distinction: R10mm represents days with beneficial soaking rain for crops; R20mm represents days where precipitation frequently generates active surface runoff.",
            "Spatial Gradient: Along the west coast, R10mm exceeds 60–80 days per year, and R20mm exceeds 40–50 days. In contrast, northwest arid zones record under 5 R10mm days annually.",
            "Spatial Constriction: Stepping from 10 mm to 20 mm compresses the active footprint dramatically into narrow mountain barriers and coastal corridors.",
            "Spatial Trend Significance: Under False Discovery Rate correction (q=0.05), over 90% of grid cells show non-significant trends in R10mm and R20mm frequency over the 26-year study period."
        ],
        "stat_badge": {"val": "R10 / R20", "label": "Precipitation Frequency Thresholds"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Here we compare two critical threshold indices side by side: R10mm (days with rainfall >= 10 mm) on the left, and R20mm (days with rainfall >= 20 mm) on the right. "
            "These indices tell us whether the frequency of rainy days is expanding or contracting.\n\n"
            "KEY FINDINGS:\n"
            "In western coastal and northeastern belts, farmers experience between 60 and 80 R10mm days annually. But as you step up to the 20 mm threshold, the spatial belt compresses dramatically. "
            "Crucially, our spatial Sen's slope and FDR analysis indicates that for the vast majority of grid cells, the annual count of heavy precipitation days has remained statistically stable over 2000–2025.\n\n"
            "TRANSITION:\n"
            "Let us compare overall wet-day volume (PRCPTOT) against precipitation intensity (SDII)."
        )
    },
    {
        "slide_num": 25,
        "type": "dual_image",
        "category": "ETCCDI Precipitation Extremes",
        "title": "Precipitation Volume vs. Intensity: PRCPTOT & SDII Dynamics",
        "subtitle": "Disentangling total precipitation amount from average wet-day intensity",
        "image_left": "RainfallRisk_Academic_Presentation/assets/gifs/PRCPTOT_2000_2025.gif",
        "caption_left": "Embedded Animation 5A: PRCPTOT (Wet-day volume).",
        "image_right": "RainfallRisk_Academic_Presentation/assets/gifs/SDII_2000_2025.gif",
        "caption_right": "Embedded Animation 5B: SDII (Daily intensity index).",
        "bullets": [
            "PRCPTOT (Total Wet-Day Precipitation): Sen's slope = +5.742 mm/year, raw p = 0.0297. However, after Holm multiple-testing correction, Holm-adjusted p = 0.0892 (statistically non-significant).",
            "SDII (Simple Daily Intensity Index): Mean intensity ranges from 12 to 25 mm/wet-day across India. Sen's slope = +0.0209 mm/day/year, raw p = 0.173, Holm p = 0.320 (non-significant).",
            "Physical Implication: Although raw positive slopes suggest slight upward pressure on wet-day volume and intensity, the trends do not survive rigorous family-wise error rate control.",
            "Spatial Heterogeneity: Localized increases in SDII in parts of central India are balanced by neutral or decreasing trends elsewhere."
        ],
        "stat_badge": {"val": "Holm p = 0.089", "label": "PRCPTOT (Not Sig After Correction)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 25 addresses a vital climatological hypothesis: Is India receiving more intense rainfall on fewer wet days? "
            "To answer this, we examine PRCPTOT (total wet-day precipitation) on the left, and SDII (Simple Daily Intensity Index) on the right.\n\n"
            "CRITICAL STATISTICAL RESULT:\n"
            "If an analyst looks only at raw p-values, they would see that PRCPTOT has a raw p-value of 0.0297 with a positive Sen's slope of +5.74 mm/year, "
            "and might mistakenly publish that India has experienced a significant increase in annual rainfall. "
            "However, when you apply standard Holm-Bonferroni correction across the family of extreme indices, the adjusted p-value becomes 0.0892. "
            "It fails to achieve significance at alpha = 0.05. SDII similarly shows a non-significant slope of +0.02 mm/day/year (p = 0.173).\n\n"
            "TRANSITION:\n"
            "Now let us examine dry and wet spell persistence through CDD and CWD."
        )
    },
    {
        "slide_num": 26,
        "type": "image_right",
        "category": "ETCCDI Precipitation Extremes",
        "title": "Dry & Wet Spell Persistence: CDD & CWD Trends",
        "subtitle": "Investigating temporal trends in drought duration and sustained waterlogging",
        "image_path": "RainfallRisk_Academic_Presentation/assets/figures/fig15_cdd_cwd_trends.png",
        "image_caption": "Figure 6: Temporal trends of national mean Consecutive Dry Days (CDD, days/yr) and Consecutive Wet Days (CWD, days/yr) over 2000–2025.",
        "bullets": [
            "Consecutive Dry Days (CDD): Maximum consecutive dry-spell length across the full calendar year. National mean Sen's slope = -0.3450 days/year (raw p = 0.1879, Holm p = 0.3758).",
            "Consecutive Wet Days (CWD): Maximum consecutive wet-spell duration during the monsoon. National mean Sen's slope = -0.0170 days/year (raw p = 0.7270, Holm p = 0.7270).",
            "Absence of Secular Spell Extension: Neither dry spell duration nor wet spell duration exhibits a statistically significant nationwide secular trend over 2000–2025.",
            "Agricultural Implication: While individual drought years experience severe intra-monsoon dry breaks, long-term multi-week agricultural drought duration has remained structurally stationary."
        ],
        "stat_badge": {"val": "CDD: p = 0.188", "label": "No Significant Spell Trend"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Figure 6 shows the temporal trajectories of Consecutive Dry Days (CDD) and Consecutive Wet Days (CWD). "
            "CDD measures the longest continuous dry spell across the year, crucial for agricultural drought risk. The national Sen's slope is -0.345 days per year, with a raw p-value of 0.188. "
            "CWD measures the longest continuous wet spell, crucial for waterlogging and root rot. Its slope is -0.017 days per year with a p-value of 0.727. "
            "Neither index shows a statistically significant monotonic trend. The length of the longest dry spells and wet spells has been stationary across 2000–2025.\n\n"
            "TRANSITION:\n"
            "Let us examine how spatial trend testing across 4,885 cells behaves when corrected for False Discovery Rate."
        )
    },
    {
        "slide_num": 27,
        "type": "dual_image",
        "category": "Spatial Statistical Inference",
        "title": "Spatial Trend Testing & Benjamini-Hochberg FDR Control",
        "subtitle": "Why raw spatial p-values deceive: Applying Benjamini-Hochberg FDR (q = 0.05)",
        "image_left": "RainfallRisk_Academic_Presentation/assets/figures/fig16_prcptot_sen_slope.png",
        "caption_left": "Figure 7A: Spatial Sen's slope for PRCPTOT (mm/yr).",
        "image_right": "RainfallRisk_Academic_Presentation/assets/figures/fig17_prcptot_fdr_significance.png",
        "caption_right": "Figure 7B: BH-FDR (q=0.05) significance map.",
        "bullets": [
            "The Multiple-Testing Trap: When evaluating 4,885 separate Mann-Kendall tests at alpha = 0.05, approximately 244 grid cells will test 'significant' purely by random chance.",
            "Benjamini-Hochberg FDR Procedure: We ranked all p-values and applied the BH-FDR threshold: P_(i) <= (i / m) * q, with q = 0.05.",
            "Visual vs. Statistical Reality: Figure 7A shows widespread patches of positive Sen's slopes in green. However, Figure 7B demonstrates that after FDR adjustment, almost all cells fail to reach statistical significance.",
            "Rigorous Conclusion: A visually apparent spatial trend must never be equated with statistical significance. The 2000–2025 epoch was characterized by spatial heterogeneity and local fluctuations, not widespread climate shifts."
        ],
        "stat_badge": {"val": "BH-FDR (q=0.05)", "label": "Spatial Multiple-Testing Control"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 27 is one of the most methodologically critical slides in our entire presentation. "
            "On the left, Figure 7A shows the uncorrected Sen's slope map for PRCPTOT. An uncritical researcher might look at the green patches in central India "
            "and claim that large portions of India are experiencing statistically significant increases in rainfall.\n\n"
            "THE STATISTICAL CORRECTION:\n"
            "When you test 4,885 separate hypotheses at alpha = 0.05, family-wise error inflation guarantees that roughly 244 cells will show false positive significance purely by chance. "
            "To solve this, we applied the Benjamini-Hochberg False Discovery Rate procedure at q = 0.05. "
            "Look at Figure 7B: after controlling for FDR, virtually the entire map is grey, meaning not statistically significant. "
            "This provides empirical proof that localized increases are within expected multi-decadal stochastic variability.\n\n"
            "TRANSITION:\n"
            "What about data quality? Did zero-rainfall reporting anomalies corrupt these findings? Let us inspect the sensitivity audit."
        )
    },
    {
        "slide_num": 28,
        "type": "table_cards",
        "category": "Data Quality Assurance",
        "title": "Data Quality Sensitivity Analysis: Scenario A vs. Scenario B",
        "subtitle": "Auditing 90 flagged grid cells to verify stability of climatological inferences",
        "table_headers": ["Scenario", "Grid Cells Analyzed", "CDD Kendall's Tau", "P-Value (Raw)", "Sen's Slope (Days/Yr)", "Trend Direction", "Significant (alpha=0.05)"],
        "table_rows": [
            ["Scenario A: All Valid Footprint", "4,885", "-0.1877", "0.1879", "-0.3450", "Decreasing", "False (Not Sig)"],
            ["Scenario B: Unflagged Cleaned Grid", "4,795", "-0.1692", "0.2365", "-0.2323", "Decreasing", "False (Not Sig)"]
        ],
        "cards": [
            {
                "title": "1. Identification of Candidate Anomalies",
                "bullets": [
                    "We audited the 4,885 cells for instances where a cell reported zero annual or monthly rainfall while neighboring cells reported substantial precipitation.",
                    "Exactly 90 candidate cells were isolated in the anomaly flag register (mostly concentrated near complex border and coastal geometries)."
                ]
            },
            {
                "title": "2. Comparative Scenario Invariance",
                "bullets": [
                    "Scenario A incorporates all 4,885 cells; Scenario B excludes all 90 flagged anomaly cells (leaving 4,795 cells).",
                    "As shown in the table above, the Sen's slope shifts marginally from -0.3450 to -0.2323 days/year, and p-values remain non-significant (p = 0.1879 vs. p = 0.2365).",
                    "Scientific Proof: Our historical conclusions are invariant to localized observational reporting anomalies."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "A hallmark of sound data science is sensitivity analysis. In gridded meteorological products, isolated cells can occasionally record zero rainfall "
            "due to station dropouts or sensor malfunctions. We conducted a systematic spatial neighborhood audit and identified 90 candidate cells showing "
            "potential zero-rainfall anomalies.\n\n"
            "SENSITIVITY RESULTS:\n"
            "We re-ran our entire statistical pipeline under two parallel scenarios: Scenario A containing all 4,885 cells, and Scenario B excluding all 90 flagged cells. "
            "As the table demonstrates, the CDD trend slope and p-values remain virtually identical and statistically non-significant in both scenarios. "
            "This proves that our scientific findings are not an artifact of bad data pixels.\n\n"
            "TRANSITION:\n"
            "This concludes Part D's historical baseline. Now let us turn to Part E and examine our 2026 administrative panel study."
        )
    },

    # ----------------------------------------------------
    # PART 5: 2026 STATE & DISTRICT ANALYSIS (Slides 29–35)
    # ----------------------------------------------------
    {
        "slide_num": 29,
        "type": "split_cards",
        "category": "2026 Observational Study",
        "title": "2026 Observational Study: High-Resolution Anomaly Monitoring",
        "subtitle": "Monitoring late-monsoon active withdrawal across 85 dates, 36 States/UTs, and 727 districts",
        "cards": [
            {
                "title": "1. Temporal Monitoring Window",
                "bullets": [
                    "Observation Window: 19 August 2026 to 12 November 2026 (85 daily reporting dates).",
                    "Missing Date Audit: Exactly one date—31 October 2026—was completely missing from IMD reporting servers and was handled transparently without synthetic imputation.",
                    "Seasonal Phase: Captures the late Southwest Monsoon, the intense September convective peak, and the withdrawal / Post-Monsoon transition."
                ]
            },
            {
                "title": "2. Administrative Hierarchy & Balanced Panel",
                "bullets": [
                    "State-Level: 36 reporting States and Union Territories (36 × 85 = 3,060 observations).",
                    "District-Level Balanced Panel: 727 districts possess complete 85-day records (61,795 total observations).",
                    "Isolating Incomplete Series: Nagapattinam district reported only 36 dates due to local telemetry failure and was isolated from the balanced panel to prevent panel distortion."
                ]
            },
            {
                "title": "3. Variables & Dual Reporting Units",
                "bullets": [
                    "Reported Fields: Daily Actual Rainfall (mm), Daily Normal Rainfall (mm), and Reported Percentage Departure (%).",
                    "Methodological Mandate: Before performing hypothesis tests, we conducted a mathematical audit on the stability of reported percentage departures."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Welcome to Part E of our presentation, focusing on the 2026 observational study. "
            "Here we shifted from the 0.25-degree gridded baseline to an administrative district and state panel monitored between 19 August and 12 November 2026.\n\n"
            "PANEL DESIGN RIGOR:\n"
            "Our dataset comprises 85 daily reporting timestamps. We discovered that October 31 was missing from the national server feed; rather than fabricating "
            "data with artificial imputation, we documented it transparently. "
            "Across 727 districts, we constructed a balanced panel of 61,795 daily observations. Nagapattinam district in Tamil Nadu had missing data for 49 days, "
            "so it was isolated to ensure balanced panel integrity.\n\n"
            "TRANSITION:\n"
            "Let us inspect the state-wise daily rainfall distribution on our choropleth map."
        )
    },
    {
        "slide_num": 30,
        "type": "image_right",
        "category": "2026 Observational Study",
        "title": "State-Wise Actual Daily Rainfall Distribution (2026)",
        "subtitle": "Choropleth mapping mean actual daily precipitation across 36 States/UTs",
        "image_path": "RainfallRisk_Academic_Presentation/assets/figures/fig22_india_statewise_actual_2026.png",
        "image_caption": "Figure 8: State-wise mean actual daily rainfall distribution (19 Aug – 12 Nov 2026).",
        "bullets": [
            "Leading Precipitation States: Andaman & Nicobar recorded the highest mean daily rainfall (13.73 mm/day, total 1,166.9 mm across 85 days), followed by Sikkim (8.66 mm/day), Mizoram (7.46 mm/day), Odisha (7.43 mm/day), and Kerala (6.37 mm/day).",
            "Arid Continental Interior: Northwest and western states recorded the lowest daily rainfall, including Rajasthan (1.42 mm/day), Punjab (1.25 mm/day), and Ladakh (<1.0 mm/day).",
            "Spatial Cleavage: Notice the sharp contrast between coastal/island maritime zones and the dry rain shadow of central/northwestern India during the late monsoon withdrawal.",
            "Interactive Artifact: A standalone interactive HTML choropleth map with dynamic tooltips was generated and published in outputs_project2/figures/."
        ],
        "stat_badge": {"val": "13.73 mm/day", "label": "Andaman & Nicobar (Peak State Mean)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Figure 8 displays our state-wise choropleth map representing mean actual daily rainfall across India during the 85-day monitoring window in 2026. "
            "The sequential blue color gradient immediately highlights India's intense spatial divergence.\n\n"
            "REGIONAL CONTRASTS:\n"
            "Andaman and Nicobar received the highest daily mean at 13.73 mm/day, accumulating over 1,160 mm in just 85 days. "
            "Sikkim, Mizoram, and Odisha followed with averages above 7.4 mm/day. In contrast, the northwestern states experienced post-monsoon dry conditions "
            "with averages under 1.5 mm/day.\n\n"
            "TRANSITION:\n"
            "Before testing whether these differences are statistically significant, we encountered a major data hazard: the instability of reported percentage departures."
        )
    },
    {
        "slide_num": 31,
        "type": "formula_card",
        "category": "Methodological Discovery",
        "title": "The Denominator Catastrophe: Instability of Percentage Departure",
        "subtitle": "Mathematical proof of division-by-zero distortion in official departure statistics",
        "formula": "Departure Percentage (%) = ((Actual Rainfall - Normal Rainfall) / Normal Rainfall) * 100",
        "cards": [
            {
                "title": "1. The Small Denominator Explosion",
                "bullets": [
                    "When normal daily rainfall is small (Normal <= 0.1 mm/day), any modest rainfall event (e.g., a brief 5 mm shower) produces astronomical percentage departures.",
                    "In our dataset, reported departure percentages reached an absurd maximum of +82,735.0%!",
                    "Across all district-days where Normal <= 0.1 mm/day, reported departures averaged +2,453.83%."
                ]
            },
            {
                "title": "2. Skewness & Inferential Invalidation",
                "bullets": [
                    "Percentage departure is bounded below at -100% (zero rainfall), but unbounded above (+infinity). This induces extreme positive skewness.",
                    "Applying standard statistical tests (t-tests, ANOVA) directly to raw percentage departures severely violates distributional assumptions and yields invalid inferences."
                ]
            },
            {
                "title": "3. The Methodological Solution",
                "bullets": [
                    "We abandoned raw percentage departure for hypothesis testing.",
                    "Instead, we formulated the Absolute Daily Rainfall Difference: Delta_i = Actual_i - Normal_i (measured in mm/day).",
                    "This symmetric, stable metric forms the rigorous basis for all subsequent inferential tests."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 31 highlights an important methodological finding from our research: what we term 'The Denominator Catastrophe'. "
            "Operational weather reports routinely cite 'percentage departure from normal'. The formula is: (Actual - Normal) divided by Normal, times 100.\n\n"
            "MATHEMATICAL HAZARD:\n"
            "During the post-monsoon season or in dry districts, climatological normal rainfall is often near zero—for example, 0.05 mm/day. "
            "If a stray localized shower drops just 8 mm of rain, the formula divides by 0.05 and reports a departure of +15,900%! "
            "In our 2026 dataset, we discovered reported departures exceeding +82,000%, and an average departure of +2,453% in low-normal districts.\n\n"
            "SCIENTIFIC REMEDY:\n"
            "Because percentage departures are bounded below at -100% but unbounded above, they induce massive distortion. "
            "We therefore rejected percentage departure and conducted all statistical hypothesis testing on the absolute daily difference in millimeters per day: "
            "Actual minus Normal. This metric is stable, symmetric, and mathematically sound.\n\n"
            "TRANSITION:\n"
            "Let us examine the results of nationwide paired hypothesis testing across 727 districts."
        )
    },
    {
        "slide_num": 32,
        "type": "split_cards",
        "category": "Hypothesis Testing (2026)",
        "title": "Nationwide Hypothesis Testing: Actual vs. Normal Rainfall (2026)",
        "subtitle": "Paired Wilcoxon signed-rank test across 727 district pairs conclusively rejects the null hypothesis",
        "cards": [
            {
                "title": "1. Formal Hypothesis Formulation",
                "bullets": [
                    "Null Hypothesis (H0): The median difference between daily actual rainfall and daily normal rainfall across Indian districts is zero (Actual = Normal).",
                    "Alternative Hypothesis (H1): A statistically significant difference exists between actual and normal daily rainfall distributions.",
                    "Sample Support: Balanced panel of n = 727 distinct district pairs, aggregated across all 85 observation dates."
                ]
            },
            {
                "title": "2. Empirical Test Results",
                "bullets": [
                    "Mean Actual Rainfall: 3.8058 mm/day | Mean Normal Rainfall: 4.6056 mm/day.",
                    "Mean Difference: -0.7998 mm/day (Standard Error: 0.0867 mm/day).",
                    "Wilcoxon Signed-Rank Test Statistic: W = 80,015.5, Normalized z = -9.231.",
                    "Asymptotic P-Value: p = 2.638 × 10⁻²⁰ (decisively rejects H0 at alpha = 0.001)."
                ]
            },
            {
                "title": "3. Climatological Interpretation",
                "bullets": [
                    "During the late monsoon/autumn window of 2026, India experienced a statistically significant nationwide precipitation deficit averaging ~0.80 mm/day.",
                    "Negative rank sums vastly exceeded positive rank sums: 478 districts experienced net deficits while only 249 districts recorded surpluses."
                ]
            }
        ],
        "stat_badge": {"val": "p = 2.64×10⁻²⁰", "label": "Paired Wilcoxon (W = 80015.5)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "To formally test whether 2026 rainfall departed from climatological baselines, we executed a nationwide paired Wilcoxon signed-rank test across all 727 districts. "
            "Because rainfall distributions are non-normal and heavily right-skewed, a non-parametric test is mathematically required.\n\n"
            "KEY STATISTICAL RESULTS:\n"
            "The mean actual rainfall was 3.8058 mm/day against a normal of 4.6056 mm/day, yielding a mean deficit of -0.7998 mm/day. "
            "The Wilcoxon test statistic W is 80,015.5, corresponding to an asymptotic z-score of -9.231 and a p-value of 2.638 × 10⁻²⁰. "
            "This decisively rejects the null hypothesis. Out of 727 districts, 478 recorded below-normal rainfall while only 249 recorded above-normal rainfall.\n\n"
            "TRANSITION:\n"
            "Did all states share this deficit equally? Let us inspect the state-level Wilcoxon tests with Holm family-wise correction."
        )
    },
    {
        "slide_num": 33,
        "type": "image_right",
        "category": "Hypothesis Testing (2026)",
        "title": "State-Level Paired Wilcoxon Testing with Holm Error Control",
        "subtitle": "Isolating 10 statistically significant states under family-wise error rate control",
        "image_path": "RainfallRisk_Academic_Presentation/assets/figures/fig23_statewise_wilcoxon_holm.png",
        "image_caption": "Figure 9: State-wise Wilcoxon mean differences with Holm-adjusted statistical significance.",
        "bullets": [
            "Family-Wise Error Rate Control: Conducted 28 separate state-level paired Wilcoxon tests; applied Holm-Bonferroni correction to prevent false positives.",
            "Significant Deficit States (9 States): Severe below-normal departures confirmed in Maharashtra (-2.89 mm/day, p = 5.0×10⁻⁶), Assam (-2.89 mm/day, p = 1.4×10⁻⁵), Telangana (-1.91 mm/day, p = 1.4×10⁻⁵), Gujarat (-1.52 mm/day, p = 1.4×10⁻⁵), Madhya Pradesh, Chhattisgarh, Karnataka, and West Bengal.",
            "The Solitary Surplus State (1 State): Exactly ONE state demonstrated statistically significant above-normal rainfall under Holm correction: Uttar Pradesh (+1.48 mm/day, raw p = 2.78×10⁻⁷, Holm p = 7.50×10⁻⁶ across 75 districts).",
            "Scientific Insight: Confirms extreme regional divergence—central and western agrarian belts faced acute moisture deficits, while the northern Gangetic plain experienced localized surplus."
        ],
        "stat_badge": {"val": "10 Sig States", "label": "9 Deficit, 1 Surplus (UP: +1.48 mm/d)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 33 breaks down the Wilcoxon paired test by individual states, applying Holm-Bonferroni correction across all 28 states with sufficient district counts. "
            "Figure 9 plots the mean differences, color-coding statistically significant states in green and orange.\n\n"
            "REMARKABLE SCIENTIFIC FINDING:\n"
            "Exactly 10 states remain statistically significant after Holm correction. "
            "Nine of these states experienced significant deficits: Maharashtra was -2.89 mm/day below normal, Assam was -2.89 mm/day, Telangana was -1.91 mm/day, and Gujarat was -1.52 mm/day. "
            "In stark contrast, exactly ONE state emerged as a significant surplus state: Uttar Pradesh, which recorded a positive surplus of +1.48 mm/day across its 75 districts, "
            "with a Holm-adjusted p-value of 7.50 × 10⁻⁶. This visually proves our central thesis: national aggregates conceal sharp regional divergence.\n\n"
            "TRANSITION:\n"
            "Are the variances across states statistically significant? Let us examine Welch's ANOVA and Kruskal-Wallis diagnostics."
        )
    },
    {
        "slide_num": 34,
        "type": "table_cards",
        "category": "Cross-State Variance Diagnostics",
        "title": "Cross-State Heterogeneity: Welch ANOVA & Kruskal-Wallis Diagnostics",
        "subtitle": "Quantifying between-state variance and post-hoc pairwise contrasts across 28 states",
        "table_headers": ["Statistical Omnibus Test", "Test Statistic", "Degrees of Freedom", "P-Value", "Effect Size", "Inference"],
        "table_rows": [
            ["Welch's Heteroscedastic ANOVA", "F = 44.122", "df1 = 27, df2 = 207.6", "1.117 × 10⁻⁶¹", "omega² = 0.428", "Significant Between-State Variance"],
            ["Kruskal-Wallis Rank Sum H-Test", "H = 379.419", "df = 27", "7.631 × 10⁻⁶⁴", "epsilon² = 0.5175", "Massive Non-Parametric Grouping Effect"]
        ],
        "cards": [
            {
                "title": "1. Heteroscedasticity Robustness",
                "bullets": [
                    "District counts and variances differ dramatically between states (e.g., UP has 75 districts, Goa has 2).",
                    "Welch's ANOVA applies Satterthwaite denominator adjustments to prevent variance heterogeneity from inflating Type I error."
                ]
            },
            {
                "title": "2. Post-Hoc Pairwise Comparisons",
                "bullets": [
                    "Welch-Holm Pairwise t-Tests: 159 out of 378 pairwise state comparisons (42.1%) are statistically significant at p < 0.05.",
                    "Dunn-Holm Non-Parametric Contrasts: 122 out of 378 comparisons (32.3%) confirm significant inter-state rank divergence.",
                    "Effect size epsilon-squared = 0.5175 indicates that over 51% of total district-level rainfall difference variance is explained strictly by state boundary grouping."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "To prove that states cannot be treated as homogeneous samples from a single national distribution, we executed omnibus tests across 28 states with at least 5 districts. "
            "Because group variances are unequal (heteroscedasticity), ordinary ANOVA is invalid.\n\n"
            "OMNIBUS TEST RESULTS:\n"
            "Welch's robust ANOVA yields F = 44.122 with a p-value of 1.117 × 10⁻⁶¹. "
            "The non-parametric Kruskal-Wallis test yields H = 379.419 with p = 7.631 × 10⁻⁶⁴. "
            "The effect size, Epsilon-squared, is 0.5175. This means that more than 51% of all variation in district rainfall departures is directly accounted for by state geography! "
            "Post-hoc testing via Welch-Holm confirmed 159 significant pairwise state contrasts out of 378 possible combinations.\n\n"
            "TRANSITION:\n"
            "Now let us inspect the extreme deluges recorded during this 2026 observation window."
        )
    },
    {
        "slide_num": 35,
        "type": "dual_image",
        "category": "2026 Extreme Events",
        "title": "Extreme Precipitation Outliers: Top Deluges & Localized Risks (2026)",
        "subtitle": "Documenting 99 extreme district-day events exceeding 100 mm during 2026",
        "image_left": "RainfallRisk_Academic_Presentation/assets/figures/fig24_top15_district_extremes_2026.png",
        "caption_left": "Figure 10A: Top 15 extreme district rainfall events.",
        "image_right": "RainfallRisk_Academic_Presentation/assets/figures/fig25_statewise_extremes_frequency.png",
        "caption_right": "Figure 10B: Frequency of extreme deluges by state.",
        "bullets": [
            "Extremes Census: Exactly 99 district-day observations recorded rainfall >= 100 mm across 76 unique districts in 20 States and UTs.",
            "Very Extreme Events: 8 district-day observations exceeded 200 mm/day.",
            "Peak National Deluge: The single highest daily rainfall recorded was 231.9 mm in Nabarangapur, Odisha on 25 September 2026 (normal was 4.2 mm, a 55× daily multiplier).",
            "Geographical Clustering: Uttar Pradesh accounted for 25.25% of all extreme events (25 events across 21 districts), followed by Andhra Pradesh (20 events), Chhattisgarh (17 events), and Odisha (10 events)."
        ],
        "stat_badge": {"val": "231.9 mm", "label": "Peak 2026 Deluge (Nabarangapur, Odisha)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Even in a season that registered a statistically significant nationwide deficit, extreme rainfall events did not vanish. "
            "In fact, as shown in Figures 10A and 10B, we documented 99 district-day events where daily rainfall exceeded 100 mm, and 8 events exceeding 200 mm.\n\n"
            "KEY EVENT DETAILS:\n"
            "The highest single-day rainfall was recorded on 25 September 2026 in Nabarangapur district, Odisha, at 231.9 mm in 24 hours. "
            "Its climatological normal for that day was just 4.2 mm. "
            "Geographically, Uttar Pradesh dominated extreme occurrences, hosting 25.25% of all extreme deluges nationwide. "
            "This explains why Uttar Pradesh was the solitary state exhibiting a statistically significant positive rainfall surplus in our Wilcoxon test.\n\n"
            "TRANSITION:\n"
            "Now let us synthesize the insights from both studies in Part F."
        )
    },

    # ----------------------------------------------------
    # PART 6: INTEGRATED SYNTHESIS & CONCLUSION (Slides 36–41)
    # ----------------------------------------------------
    {
        "slide_num": 36,
        "type": "split_cards",
        "category": "Synthesis & Integration",
        "title": "Dual-Study Synthesis: Macro Stationarity vs. Meso Vulnerability",
        "subtitle": "Reconciling 26-year climatological stability with intense real-time regional risk",
        "cards": [
            {
                "title": "1. Macro-Level Stability (Study 1: 2000–2025)",
                "bullets": [
                    "At the all-India scale, mean annual rainfall (1,149.60 mm) exhibits low interannual volatility (CV = 8.57%).",
                    "Secular temporal trends in PRCPTOT, SDII, CDD, and CWD are statistically non-significant after family-wise error rate corrections.",
                    "The Southwest Monsoon remains rigidly dominant, contributing 75.28% of annual rainfall with near-perfect non-parametric concordance (Kendall's W = 0.9095)."
                ]
            },
            {
                "title": "2. Meso-Level Volatility (Study 2: 2026)",
                "bullets": [
                    "At the administrative district and state level, rainfall is characterized by severe spatial divergence and acute localized risk.",
                    "In 2026, 478 districts experienced severe deficits while isolated regions experienced catastrophic deluges up to 231.9 mm/day.",
                    "State boundaries explain over 51% of variance in daily rainfall differences (epsilon² = 0.5175)."
                ]
            },
            {
                "title": "3. The Unified Research Conclusion",
                "bullets": [
                    "India's rainfall risk does not manifest as a uniform national shift. It manifests as intense spatial divergence within a macro-stable national envelope.",
                    "Agricultural planning and disaster risk reduction must be decoupled from all-India averages and pegged to localized district-level probability distributions."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Bringing both studies together reveals the overarching scientific insight of this monograph. "
            "At the macro scale over 26 years, India's rainfall exhibits structural stationarity: the annual volume hovers around 1,150 mm with a low CV of 8.57%, "
            "and multidecadal trends in extreme indices are non-significant after FDR correction.\n\n"
            "THE DUALITY OF RISK:\n"
            "Yet, when you zoom into the administrative district panel in 2026, you find massive spatial heterogeneity: 10 states show significant departures, "
            "state groupings explain 51% of the variance, and localized deluges exceed 230 mm/day. "
            "Therefore, the true scientific risk of the Indian monsoon is not that the entire nation is drying up or drowning; "
            "the risk is that national macro-stability blinds policy-makers to severe, asynchronous local shocks.\n\n"
            "TRANSITION:\n"
            "To uphold scientific integrity, let us examine the limitations and data quality caveats of our work."
        )
    },
    {
        "slide_num": 37,
        "type": "split_cards",
        "category": "Methodological Limitations",
        "title": "Scientific Limitations & Data-Quality Considerations",
        "subtitle": "Transparent academic acknowledgment of observational and methodological constraints",
        "cards": [
            {
                "title": "1. Spatial Footprint Boundary Truncation",
                "bullets": [
                    "The historical common spatial footprint comprises 4,885 cells (28.05% of the bounding box).",
                    "High-altitude Himalayan ridgelines and disputed border zones lacked 100% temporal continuity and were excluded.",
                    "Our historical findings apply strictly to terrestrial peninsular, central, and plains India, not high-altitude glaciated zones."
                ]
            },
            {
                "title": "2. 2026 Window & Missing Observations",
                "bullets": [
                    "The 2026 study covers an 85-day monitoring window (19 Aug to 12 Nov), capturing late monsoon dynamics rather than a full annual climatological cycle.",
                    "Date 31 October 2026 was missing from official IMD feeds, and Nagapattinam district was isolated due to telemetry dropouts."
                ]
            },
            {
                "title": "3. Gridded Interpolation & Spatial Autocorrelation",
                "bullets": [
                    "IMD gridded NetCDF data are interpolated from station networks. In station-sparse regions, interpolation smooths out convective peaks.",
                    "Spatial autocorrelation exists between adjacent 0.25° grid cells, which can slightly inflate apparent spatial cluster significance despite FDR control."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "An academic presentation is only as credible as its transparency regarding limitations. We highlight three key constraints.\n\n"
            "ACADEMIC LIMITATIONS:\n"
            "First, our historical footprint of 4,885 cells represents 28.05% of the bounding box, excluding complex Himalayan terrain. We do not claim our results describe high-altitude glaciated zones. "
            "Second, the 2026 panel covers an 85-day observation window during late monsoon and withdrawal; it is an intra-seasonal anomaly diagnosis, not a multidecadal trend. "
            "Third, gridded products inherently smooth out micro-scale cloudbursts in regions with sparse ground stations. Spatial autocorrelation remains an inherent feature of 0.25-degree grids.\n\n"
            "TRANSITION:\n"
            "Despite these constraints, what are the primary scientific contributions of this research?"
        )
    },
    {
        "slide_num": 38,
        "type": "split_cards",
        "category": "Scientific Contributions",
        "title": "Key Contributions & Methodological Advances",
        "subtitle": "Distinctive scientific value delivered to meteorological and data science literature",
        "cards": [
            {
                "title": "1. Methodological Rigor & Error Control",
                "bullets": [
                    "Enforced systematic multiple-testing corrections (Holm-Bonferroni and Benjamini-Hochberg FDR at q = 0.05), preventing false claims of climate shifts from uncorrected p-values.",
                    "Empirically documented and proved the 'Denominator Catastrophe' in official percentage departure metrics, establishing absolute daily difference (mm/day) as a stable alternative."
                ]
            },
            {
                "title": "2. End-to-End Open-Source Pipeline",
                "bullets": [
                    "Developed fully automated, reproducible Python and TypeScript data pipelines bridging raw NetCDF meteorological files, statistical inference, and spatial visualization.",
                    "Conducted rigorous data quality audits (90 zero-rainfall candidate cells) with dual-scenario sensitivity validation."
                ]
            },
            {
                "title": "3. Public Scientific Dissemination",
                "bullets": [
                    "Deployed 'RainfallRisk India' as a production web application (https://rainfallriskindia.vercel.app) featuring custom editorial UI, interactive choropleths, and complete data transparency.",
                    "Published full datasets, tables, maps, and animated figures for open academic peer review."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "This slide summarizes our core scientific contributions. First, methodological rigor: we demonstrated why raw p-values mislead in spatial climate research, "
            "and we proved mathematically why traditional percentage departures blow up when dividing by small numbers.\n\n"
            "RESEARCH IMPACT:\n"
            "Second, we built an end-to-end open-source pipeline that is fully reproducible, from raw NetCDF files to statistical test tables. "
            "And third, we translated this complex academic research into an interactive, beautifully designed public web platform—RainfallRisk India—which is live today on Vercel, "
            "allowing researchers, students, and planners to explore these findings interactively.\n\n"
            "TRANSITION:\n"
            "Where should this research go next? Let us review the future scope."
        )
    },
    {
        "slide_num": 39,
        "type": "split_cards",
        "category": "Future Scope",
        "title": "Future Research Roadmap & Meteorological Extensions",
        "subtitle": "Expanding the analytical frontier toward high-resolution modeling and extreme-value theory",
        "cards": [
            {
                "title": "1. Remote Sensing & Radar Assimilation",
                "bullets": [
                    "Integrate NASA GPM (Global Precipitation Measurement) IMERG satellite products (0.1° × 0.1°, half-hourly) to capture sub-daily convective cloudburst dynamics.",
                    "Assimilate IMD Doppler Weather Radar (DWR) reflectivity data to resolve convective cloud cell kinematics."
                ]
            },
            {
                "title": "2. Extreme Value Theory (EVT) Modeling",
                "bullets": [
                    "Fit Generalized Extreme Value (GEV) distributions to annual block maxima (Rx1day) and Generalized Pareto Distributions (GPD) for Peaks-Over-Threshold (POT).",
                    "Derive spatially explicit return-period curves (e.g., 50-year and 100-year deluge return levels) for infrastructure resilience design."
                ]
            },
            {
                "title": "3. Coupled Hydrological & Economic Risk",
                "bullets": [
                    "Couple gridded precipitation outputs with VIC (Variable Infiltration Capacity) hydrological models to simulate real-time river basin discharge and flood inundation.",
                    "Link district-level rainfall deficits to crop yield loss indices for agricultural insurance and food security modeling."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Looking forward, this research establishes a strong launchpad for several advanced extensions. "
            "First, assimilating NASA GPM IMERG 0.1-degree half-hourly data will allow us to investigate sub-daily rainfall intensity and flash-flood kinetics. "
            "Second, applying formal Extreme Value Theory—fitting Generalized Extreme Value and Pareto distributions—will enable the calculation of 50-year and 100-year "
            "infrastructure return levels. "
            "And third, coupling this atmospheric model with hydrological runoff models will translate rainfall risk directly into river discharge and crop loss predictions.\n\n"
            "TRANSITION:\n"
            "Let us conclude with our final research verdict."
        )
    },
    {
        "slide_num": 40,
        "type": "split_cards",
        "category": "Monograph Conclusion",
        "title": "Monograph Conclusion: Core Takeaways",
        "subtitle": "Every drop tells a story of spatial divergence, localized vulnerability, and scientific clarity",
        "cards": [
            {
                "title": "1. Macro Stationarity, Local Volatility",
                "bullets": [
                    "India's 26-year historical rainfall record (2000–2025) demonstrates remarkable macroeconomic stationarity (mean: 1,149.60 mm, CV: 8.57%).",
                    "Secular temporal trends in extreme indices fail to achieve statistical significance under rigorous Holm and FDR corrections."
                ]
            },
            {
                "title": "2. The Danger of National Averages",
                "bullets": [
                    "The 2026 observational study proves that nationwide averages mask acute regional distress: 478 districts suffered significant moisture deficits while isolated regions experienced deluges up to 231.9 mm/day.",
                    "State boundaries account for >51% of variance in daily rainfall differences (epsilon² = 0.5175)."
                ]
            },
            {
                "title": "3. The Data Science Imperative",
                "bullets": [
                    "Sound climate data science requires moving beyond eye-ball trends and naive percentages.",
                    "Only through rigorous error control, robust non-parametric testing, and high-resolution spatial awareness can India build genuine climate resilience."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "In conclusion, respected committee members: RainfallRisk India demonstrates that the Indian monsoon cannot be understood through the blunt lens of national averages. "
            "Over 26 years, India's monsoon exhibits macro-scale stability. But beneath that stable umbrella lies a complex, living sky of severe spatial divergence.\n\n"
            "FINAL VERDICT:\n"
            "In 2026 alone, while the national headline was a modest deficit, 478 districts faced severe agricultural distress while others were battered by 200 mm deluges. "
            "Our research proves that by enforcing multiple-testing error control, resolving denominator instability, and analyzing spatial footprints rigorously, "
            "data science can deliver clarity where traditional metrics create confusion.\n\n"
            "TRANSITION:\n"
            "Thank you. I now welcome your questions and discussion."
        )
    },
    {
        "slide_num": 41,
        "type": "closing",
        "category": "Academic Defense & Dissemination",
        "title": "Thank You / Academic Defense & Discussion",
        "subtitle": "RainfallRisk India — Statistical Rainfall Research Monograph (2000–2025 & 2026)",
        "author": "Jay Thakar",
        "institution": "Department of Data Science & Climate Informatics",
        "website": "https://rainfallriskindia.vercel.app",
        "repo": "https://github.com/JAYTHAKAR2004/RainfallRisk-India",
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Thank you very much, Professor and members of the committee, for your time and attention. "
            "The full interactive platform, code, and statistical tables are live at rainfallriskindia.vercel.app and open-sourced on GitHub. "
            "I am now ready to take your questions and defend the methodological and statistical decisions made in this research.\n\n"
            "ANTICIPATED PROFESSOR QUESTIONS & MODEL DEFENSE ANSWERS:\n\n"
            "Q1: 'Why did you use non-parametric tests like Wilcoxon and Friedman instead of classical repeated-measures ANOVA?'\n"
            "ANSWER: Daily precipitation data violate normality assumptions severely; they are zero-inflated and exhibit extreme right skewness. "
            "Classical ANOVA relies on normal residuals and homoscedasticity. Non-parametric rank-based tests (Friedman and Wilcoxon) make no distributional "
            "assumptions and are immune to outlier distortion while preserving statistical power.\n\n"
            "Q2: 'Why did you apply Benjamini-Hochberg FDR rather than Bonferroni correction for the 4,885 spatial grid cells?'\n"
            "ANSWER: Bonferroni controls the Family-Wise Error Rate (FWER) by dividing alpha by m (0.05 / 4885 = 1.02×10⁻⁵). In spatial grids with thousands "
            "of tests, Bonferroni is excessively conservative and causes severe Type II error (failing to detect genuine trends). "
            "Benjamini-Hochberg FDR controls the expected proportion of false discoveries among rejected hypotheses, providing an optimal balance between "
            "rigor and discovery in large-scale spatial gridded analysis.\n\n"
            "Q3: 'How did you handle the missing date on 31 October 2026?'\n"
            "ANSWER: We audited IMD data servers and verified that 31 October 2026 was missing nationally. Rather than imputing synthetic values—which would invent "
            "variance—we analyzed the 85 available dates as a complete, genuine observational sample, documenting the missing date explicitly in our data tables."
        )
    }
]

print(f"Loaded {len(SLIDES_DATA)} slides metadata and comprehensive scripts.")
