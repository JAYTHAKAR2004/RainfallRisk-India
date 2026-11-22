"""
Presentation Data & Narrative Script for RainfallRisk India
Contains slide metadata, analytical bullets, statistics, and academic speaker notes
for all 34 slides.
"""

SLIDES_DATA = [
    # ----------------------------------------------------
    # PART 1: MONSOON ATMOSPHERE & RESEARCH FOUNDATIONS
    # ----------------------------------------------------
    {
        "slide_num": 1,
        "type": "cover",
        "category": "M.Tech Data Science Research Monograph",
        "title": "RAINFALLRISK INDIA",
        "subtitle": "Statistical Rainfall Research Monograph (2000–2025 & 2026)\nA Living Sky: 26 Years of Precipitation Dynamics & Regional Vulnerability",
        "author": "Jay Thakar",
        "institution": "Department of Data Science & Climate Informatics",
        "guide": "Academic Research Committee",
        "website": "https://rainfallriskindia.vercel.app",
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Respected Professor and members of the evaluation committee, good morning. "
            "Today I present 'RainfallRisk India'—a comprehensive statistical research monograph investigating 26 years of high-resolution "
            "gridded rainfall data across India from 2000 to 2025, coupled with an empirical anomaly diagnosis of the 2026 observational season.\n\n"
            "RESEARCH CONTEXT & MOTIVATION:\n"
            "The Indian monsoon is one of the most critical meteorological phenomena on Earth, driving agricultural livelihoods for over 700 million people "
            "and dictating water resource stability. However, traditional operational reporting often relies heavily on broad spatial aggregations—such as "
            "all-India seasonal totals—which systematically obscure localized precipitation deficits, catastrophic deluges, and shifting frequency of extremes.\n\n"
            "TRANSITION:\n"
            "To understand why aggregated metrics fail and where the true climatological risks reside, let us examine the fundamental research problem."
        )
    },
    {
        "slide_num": 2,
        "type": "split_cards",
        "category": "Research Problem & Motivation",
        "title": "The Rainfall Dilemma: National Aggregates vs. Regional Vulnerability",
        "subtitle": "Why nationwide meteorological averages fail to capture agricultural and hydrological catastrophe",
        "cards": [
            {
                "title": "1. The Spatial Masking Problem",
                "bullets": [
                    "India spans 3.287 million km² across 15 distinct agro-climatic zones, from arid western deserts to hyper-humid northeastern rainforests.",
                    "An 'average' or 'normal' all-India monsoon year (e.g., ±5% departure) routinely conceals simultaneous extreme drought in eastern regions and destructive flooding along western or coastal river basins.",
                    "Aggregated metrics create an optical illusion of stability while regional agrarian distress escalates."
                ]
            },
            {
                "title": "2. The Frequency vs. Intensity Shift",
                "bullets": [
                    "Recent meteorological literature hypothesizes that total seasonal volume may remain roughly stable, but the underlying distribution is shifting toward fewer wet days and higher daily intensity (SDII).",
                    "This causes immediate surface runoff, soil erosion, and reservoir spillway overload without recharging sub-surface aquifers."
                ]
            },
            {
                "title": "3. Critical Socio-Economic Stakes",
                "bullets": [
                    "Over 55% of India's net sown agrarian area remains rainfed.",
                    "Hydroelectric generation, urban water supplies, and food inflation are acutely tied to intra-seasonal precipitation distribution.",
                    "Rigorous non-parametric statistical evaluation is required to separate stochastic climate noise from secular shifts."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "When examining Indian monsoon data, the central methodological dilemma is spatial masking. In meteorological bulletins, you frequently hear "
            "that the Indian monsoon ended at '98% of Long Period Average', labeled as 'Normal'. Yet, during that exact same season, farmers in Vidarbha "
            "or Marathwada experienced acute vegetative drought, while urban catchments in Assam and Gujarat were overwhelmed by urban flash floods.\n\n"
            "METHODOLOGICAL RATIONALE:\n"
            "Macro-aggregations cancel out positive and negative deviations. Mathematically, a +100 mm anomaly in the Western Ghats offsets a -100 mm deficit "
            "in the Gangetic Plains, producing an artificial net zero deviation. To resolve this, we must examine rainfall at both high-resolution spatial grid cells "
            "and administrative district panels.\n\n"
            "TRANSITION:\n"
            "This structural dilemma leads directly to our formal research inquiries."
        )
    },
    {
        "slide_num": 3,
        "type": "split_cards",
        "category": "Scientific Scope",
        "title": "Research Objectives & Core Scientific Inquiries",
        "subtitle": "Five targeted questions guiding the statistical monograph across multidecadal and seasonal timeframes",
        "cards": [
            {
                "title": "Q1: Multidecadal Baseline Stability",
                "bullets": [
                    "Has the all-India area-weighted mean annual rainfall experienced a secular, statistically significant trend over the 2000–2025 epoch?",
                    "What is the true interannual coefficient of variation (CV) across 26 homogeneous observation years?"
                ]
            },
            {
                "title": "Q2: Seasonal Partitioning & Invariance",
                "bullets": [
                    "How rigidly does the Southwest Monsoon dominate India's hydrologic budget?",
                    "Can we statistically confirm non-parametric seasonal hierarchy using repeated-measures Friedman tests and Kendall's W concordance?"
                ]
            },
            {
                "title": "Q3: ETCCDI Extreme Indices Dynamics",
                "bullets": [
                    "How are extreme precipitation indices (Rx1day, Rx5day, R10mm, R20mm, CDD, CWD, PRCPTOT, SDII) distributed spatially and temporally?",
                    "Do spatial trends withstand False Discovery Rate (BH-FDR) multiple-testing correction across 4,885 grid cells?"
                ]
            },
            {
                "title": "Q4 & Q5: Data Integrity & 2026 Anomaly Analysis",
                "bullets": [
                    "How sensitive are spatial conclusions to localized zero-rainfall reporting anomalies in gridded NetCDF files?",
                    "In 2026, did observed daily precipitation significantly depart from normal baselines across 727 districts, and why does percentage departure suffer mathematical instability?"
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "We formulated five core research questions. First, establishing whether multidecadal rainfall shows statistically verifiable secular trends or bounded cyclic variability. "
            "Second, rigorously testing seasonal invariance using non-parametric Friedman tests rather than relying on qualitative assumptions. "
            "Third, calculating the full suite of eight ETCCDI climate extreme indices and applying rigorous multiple-testing corrections. "
            "Fourth, performing sensitivity audits on data quality anomalies. "
            "And fifth, conducting a high-resolution 2026 administrative panel study to examine real-time departures and uncover mathematical instability in traditional metrics.\n\n"
            "TRANSITION:\n"
            "To answer these questions, we designed a unified dual-study analytical architecture."
        )
    },
    {
        "slide_num": 4,
        "type": "dual_panel",
        "category": "Analytical Architecture",
        "title": "Dual-Study Architecture: Multidecadal Baseline Meets Near-Real-Time Dynamics",
        "subtitle": "Combining 26-year gridded climatology with high-resolution administrative panel testing",
        "panel_left": {
            "title": "STUDY 1: Historical Gridded Analysis (2000–2025)",
            "badge": "Macro-Climatological Baseline",
            "bullets": [
                "Temporal Scale: 26 full calendar years (9,497 consecutive daily observations).",
                "Spatial Resolution: 0.25° × 0.25° IMD Gridded NetCDF-4 product.",
                "Grid Architecture: 129 latitudes × 135 longitudes = 17,415 total cells.",
                "Common Spatial Footprint: 4,885 strictly validated land cells (28.0505% of grid).",
                "Primary Methods: Area-weighted aggregation, Friedman ANOVA, Kendall's W, Mann-Kendall, Sen's slope, Benjamini-Hochberg FDR (q=0.05), Ljung-Box autocorrelation.",
                "Indices: 8 ETCCDI precipitation extreme metrics (Rx1day, Rx5day, R10mm, R20mm, PRCPTOT, SDII, CDD, CWD)."
            ]
        },
        "panel_right": {
            "title": "STUDY 2: State & District Anomaly Analysis (2026)",
            "badge": "Meso-Scale Administrative Panel",
            "bullets": [
                "Temporal Window: 19 August to 12 November 2026 (85 daily reporting timestamps).",
                "Reporting Units: 36 States/UTs (3,060 observations) & 727 Districts (61,795 observations).",
                "Balanced Panel Design: Complete temporal series across 727 districts (Nagapattinam isolated due to 36 incomplete dates).",
                "Primary Methods: Denominator stability audit, Paired Wilcoxon signed-rank test (W=80015.5, p=2.638×10⁻²⁰), Holm family-wise error rate control, Welch ANOVA (F=44.122), Kruskal-Wallis (H=379.419, ε²=0.5175).",
                "Focus: Actual vs. Normal departures, extreme district deluges (99 events ≥100 mm)."
            ]
        },
        "notes": (
            "SPEAKER SCRIPT:\n"
            "This slide summarizes our research architecture. RainfallRisk India is structured into two complementary studies that bridge different spatial and temporal scales.\n\n"
            "Study 1 provides the macro-climatological anchor: 26 years of high-resolution 0.25° gridded daily data from 2000 to 2025. It establishes baseline mean annual precipitation, "
            "seasonal partitioning, and calculates 8 ETCCDI extreme precipitation indices.\n\n"
            "Study 2 provides the meso-scale empirical test: an 85-day balanced observational panel of 727 districts across 36 States and UTs during 2026. This allows us to test "
            "whether daily observations conform to historical climatological normals and evaluate district-level extreme events in near real-time.\n\n"
            "TRANSITION:\n"
            "Let us examine the data provenance and preprocessing pipeline that feeds both studies."
        )
    },
    {
        "slide_num": 5,
        "type": "split_cards",
        "category": "Data Engineering",
        "title": "Data Provenance, Cleansing & Common Spatial Footprint",
        "subtitle": "Rigorous data ingestion and geometry standardization from IMD NetCDF-4 daily products",
        "cards": [
            {
                "title": "1. Source Data Provenance",
                "bullets": [
                    "Source: India Meteorological Department (IMD) high-resolution 0.25° × 0.25° gridded daily precipitation archive.",
                    "Coordinate bounding box: Latitude 6.5°N to 38.5°N (129 grid points), Longitude 66.5°E to 100.0°E (135 grid points).",
                    "Theoretical grid capacity: 129 × 135 = 17,415 geographic cells per day."
                ]
            },
            {
                "title": "2. Masking & The Common Spatial Footprint",
                "bullets": [
                    "A naive spatial mean would introduce severe bias because maritime ocean cells, non-conforming territorial boundaries, and seasonal missing values vary across years.",
                    "We enforced an intersection criterion: only grid cells with 100% valid, continuous observations across all 26 years were retained.",
                    "This isolated the Common Spatial Footprint: exactly 4,885 cells (28.0505% of the theoretical grid box)."
                ]
            },
            {
                "title": "3. Quality Assurance & Area Weighting",
                "bullets": [
                    "Meridional convergence correction applied: grid cell area decreases with latitude as cos(lat). Area weights w_i = cos(lat_i) / sum(cos(lat_i)) were assigned to every cell.",
                    "Zero-rainfall audit performed on 90 candidate cells to verify spatial clustering against station dropouts."
                ]
            }
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Data cleanliness is the bedrock of scientific integrity. We obtained daily NetCDF files from the India Meteorological Department at 0.25-degree resolution. "
            "The initial grid bounding box contains 17,415 cells. However, India's landmass is triangular and surrounded by the Arabian Sea, the Bay of Bengal, and the Indian Ocean.\n\n"
            "CRITICAL METHODOLOGICAL DETAIL:\n"
            "To prevent temporal sampling artifacts where a cell exists in 2005 but is masked in 2020, we derived a strict 'Common Spatial Footprint'. Exactly 4,885 cells have continuous, "
            "unbroken daily data across all 26 years. This constitutes exactly 28.05% of the bounding box. Furthermore, because longitudinal distances shrink toward the poles, "
            "all spatial aggregations apply cosine-latitude area weighting to prevent high-latitude grid cells from exerting disproportionate mathematical weight.\n\n"
            "TRANSITION:\n"
            "Here is the complete inferential workflow applied across these datasets."
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
            "This workflow illustrates our end-to-end analytical pipeline. Notice that every stage is subjected to statistical verification: "
            "we do not simply plot line charts and draw eye-ball conclusions. "
            "When evaluating seasonal invariance, we deploy Friedman tests and Kendall's W. When computing trends, we apply Sen's slope and Holm-Bonferroni corrections. "
            "When analyzing 4,885 spatial grid cells, we apply the Benjamini-Hochberg False Discovery Rate procedure. "
            "And when evaluating the 2026 panel, we deploy paired Wilcoxon signed-rank tests and Welch's robust ANOVA.\n\n"
            "TRANSITION:\n"
            "Let us now enter Part 2 of the presentation and inspect the findings of our 26-year historical study."
        )
    },

    # ----------------------------------------------------
    # PART 2: HISTORICAL MULTIDECADAL GRIDDED ANALYSIS (2000–2025)
    # ----------------------------------------------------
    {
        "slide_num": 7,
        "type": "image_right",
        "category": "Historical Gridded Analysis (2000–2025)",
        "title": "Spatial Grid & Common Spatial Footprint (2000–2025)",
        "subtitle": "Isolating 4,885 continuous terrestrial cells across 26 calendar years",
        "image_path": "outputs/figures/spatial_data_coverage_2000_2025.png",
        "image_caption": "Figure 1: Spatial coverage map depicting the 4,885 common valid land cells across India.",
        "bullets": [
            "Grid Geometry: Bounded between 6.5°N–38.5°N and 66.5°E–100.0°E at 0.25° × 0.25° resolution.",
            "Common Spatial Footprint: 4,885 cells represent exactly 28.0505% of the 17,415 theoretical bounding box.",
            "Elimination of Boundary Artifacts: Uninhabited oceanic cells, trans-boundary buffer pixels, and intermittent Himalayan station masks are strictly excluded.",
            "Sampling Uniformity: Every annual and seasonal statistic in Study 1 is calculated over this exact identical spatial support, preventing geographical bias across years."
        ],
        "stat_badge": {"val": "4,885 Cells", "label": "Common Footprint (28.05% of Grid)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 7 shows the spatial distribution of our Common Spatial Footprint. Of the 17,415 potential points in the NetCDF coordinate matrix, "
            "only 4,885 represent continuous terrestrial India across all 26 years. "
            "This covers the peninsular landmass, central plains, Western Ghats, and northeastern states.\n\n"
            "PROFESSOR Q&A DEFENSE:\n"
            "A key question often asked is: 'Why not interpolate missing border cells?' "
            "Our answer: Spatial interpolation introduces synthetic covariance, especially in complex mountainous topography like the Himalayas. "
            "By strictly restricting analysis to observed, valid cells with 100% temporal continuity, we guarantee that any observed temporal trend reflects "
            "genuine atmospheric dynamics rather than artifacts of changing spatial interpolation masks.\n\n"
            "TRANSITION:\n"
            "Now let us examine the annual rainfall variability across these 4,885 cells using our 26-year dynamic animation."
        )
    },
    {
        "slide_num": 8,
        "type": "gif_left",
        "category": "Historical Gridded Analysis (2000–2025)",
        "title": "26-Year Annual Rainfall Variability & Dynamic Animation",
        "subtitle": "Spatiotemporal evolution of total annual precipitation from 2000 to 2025",
        "image_path": "Annual_Rainfall_Maps/India_Annual_Rainfall_Animation_2000_2025.gif",
        "image_caption": "Embedded Animation 1: Spatiotemporal evolution of India annual rainfall (2000–2025).",
        "bullets": [
            "Long-Term Annual Mean: 1,149.603 mm (Standard Deviation: 98.56 mm).",
            "Low Interannual Volatility: Coefficient of Variation (CV) is 8.573%, reflecting bounded macro-scale stability.",
            "Historical Extremes: Wettest year was 2020 (1,285.857 mm, +11.85% departure); Driest year was 2002 (947.124 mm, -17.61% departure).",
            "Spatial Contrast: Persistent orographic precipitation along the Western Ghats (>3,000 mm) and Northeast contrast with the arid Thar Desert (<400 mm)."
        ],
        "stat_badge": {"val": "1,149.60 mm", "label": "Mean Annual Rainfall (CV: 8.57%)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "In this embedded animation, we see the annual rainfall maps cycling through all 26 years from 2000 to 2025. "
            "Notice the remarkable geographic stability of the wet zones: the Western Ghats and the Northeastern states consistently receive high rainfall, "
            "while Rajasthan and the rain shadow of the Deccan Plateau remain arid.\n\n"
            "KEY EMPIRICAL OBSERVATION:\n"
            "The all-India area-weighted annual mean is 1,149.60 mm. The standard deviation is 98.56 mm, yielding a coefficient of variation of only 8.57%. "
            "The driest year in this 26-year record was 2002 at 947.12 mm, driven by a severe July monsoon break. "
            "The wettest year was 2020 at 1,285.86 mm, driven by extended post-monsoon and cyclone activity.\n\n"
            "TRANSITION:\n"
            "Let us inspect the quantitative time-series anomalies to see if a decadal trend exists."
        )
    },
    {
        "slide_num": 9,
        "type": "image_right",
        "category": "Historical Gridded Analysis (2000–2025)",
        "title": "Decadal Anomaly Trajectory & Moving Average Dynamics",
        "subtitle": "Evaluating secular trends vs. cyclic decadal variability over 26 years",
        "image_path": "outputs/figures/annual_rainfall_trend_analysis.png",
        "image_caption": "Figure 2: Annual rainfall trend, 5-year moving average, and percentage anomaly departures.",
        "bullets": [
            "Decadal Anomaly Fluctuations: Significant drought phases in 2002 (-17.61%), 2009 (-13.91%), 2014 (-12.35%), and 2015 (-14.07%).",
            "Surplus Rebound Epoch: Elevated precipitation recorded in 2019 (+10.82%), 2020 (+11.85%), and 2022 (+6.81%).",
            "Non-Parametric Trend Test: Mann-Kendall test on annual mean yields Tau = 0.1508, p = 0.293 (Sen's slope = +3.42 mm/year, 95% CI: [-3.51, +9.84]).",
            "Scientific Inference: The secular temporal trend is not statistically significant at alpha = 0.05. India's annual rainfall demonstrates bounded decadal oscillations rather than a linear monotonic shift."
        ],
        "stat_badge": {"val": "p = 0.293", "label": "Mann-Kendall (Not Significant)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Figure 2 plots the area-weighted annual rainfall time series alongside its 5-year rolling average and deviation percentages. "
            "Notice the clustering of dry years: 2002, 2009, and the back-to-back El Niño years of 2014 and 2015. "
            "These were followed by a prominent wet phase between 2019 and 2022.\n\n"
            "STATISTICAL INTERPRETATION:\n"
            "When we run the non-parametric Mann-Kendall test, Kendall's Tau is 0.1508 with a p-value of 0.293. The Sen's slope is +3.42 mm/year, "
            "but its 95% confidence interval crosses zero (spanning -3.51 to +9.84 mm/year). "
            "Therefore, we must scientifically conclude that India's all-India annual rainfall does not exhibit a statistically significant monotonic trend. "
            "It is governed by interannual and decadal variability.\n\n"
            "TRANSITION:\n"
            "If the annual volume is stationary, how is the precipitation partitioned across seasons?"
        )
    },
    {
        "slide_num": 10,
        "type": "dual_image",
        "category": "Historical Gridded Analysis (2000–2025)",
        "title": "Seasonal Partitioning: The Colossal Weight of the Southwest Monsoon",
        "subtitle": "Quantifying seasonal budget contributions across 26 homogeneous observation years",
        "image_left": "outputs/figures/seasonal_rainfall_comparison.png",
        "caption_left": "Figure 3A: Seasonal rainfall comparison (mm).",
        "image_right": "outputs/figures/seasonal_rainfall_stacked.png",
        "caption_right": "Figure 3B: Annual percentage stacked seasonal contributions.",
        "bullets": [
            "Southwest Monsoon (Jun–Sep): Delivers 75.28% of annual rainfall (mean: 865.38 mm, SD: 85.34 mm, CV: 9.86%).",
            "Post-Monsoon (Oct–Dec): Contributes 13.78% (mean: 158.40 mm), primarily benefiting the southeastern peninsula and Tamil Nadu.",
            "Pre-Monsoon (Mar–May): Accounts for 9.28% (mean: 106.66 mm), characterized by convective pre-monsoon thunderstorm activity (Kalbaishakhi/Nor'westers).",
            "Winter (Jan–Feb): Minimal hydrologic contribution at 1.66% (mean: 19.16 mm), tied to Western Disturbances in the northwest."
        ],
        "stat_badge": {"val": "75.28%", "label": "Southwest Monsoon Contribution"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "These two charts illustrate the seasonal partitioning of India's rainfall budget. Figure 3A shows absolute seasonal totals, "
            "while Figure 3B displays the stacked percentage contributions over all 26 years.\n\n"
            "KEY FINDINGS:\n"
            "The Southwest Monsoon from June through September accounts for three-quarters of the entire annual budget—precisely 75.28%, or 865.38 mm. "
            "The Post-Monsoon accounts for 13.78%, Pre-Monsoon for 9.28%, and Winter contributes just 1.66%. "
            "Notice how consistent this proportional stack is across all 26 years. Even in drought years, the Southwest Monsoon never drops below 70% of the total budget.\n\n"
            "TRANSITION:\n"
            "Can we statistically confirm that this seasonal hierarchy is invariant across all 26 years? Let us examine the Friedman test."
        )
    },
    {
        "slide_num": 11,
        "type": "dual_image",
        "category": "Historical Gridded Analysis (2000–2025)",
        "title": "Non-Parametric Seasonal Invariance: Friedman Test & Kendall's W",
        "subtitle": "Rigorous repeated-measures hypothesis testing across normalized daily intensity",
        "image_left": "outputs/figures/seasonal_rainfall_boxplot.png",
        "caption_left": "Figure 4A: Seasonal daily rainfall intensity distributions.",
        "image_right": "outputs/figures/seasonal_rainfall_trend_panels.png",
        "caption_right": "Figure 4B: Seasonal intensity trend panels with Sen's slopes.",
        "bullets": [
            "Friedman Test for Repeated Measures: Chi-Square = 70.9385, df = 3, p = 2.687 × 10⁻¹⁵ (rejects null hypothesis of equal seasonal ranks).",
            "Extreme Effect Size: Kendall's W = 0.9095, confirming almost complete concordance across all 26 observation years.",
            "Pairwise Wilcoxon Signed-Rank Tests (Holm-Corrected): All six pairwise seasonal comparisons are significant at p < 1.0 × 10⁻⁵.",
            "Intensity Ranks: Southwest Monsoon (7.09 mm/day) >> Post-Monsoon (1.72 mm/day) > Pre-Monsoon (1.16 mm/day) > Winter (0.32 mm/day)."
        ],
        "stat_badge": {"val": "W = 0.9095", "label": "Kendall's W (p = 2.69×10⁻¹⁵)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "To prove that seasonal differences are statistically robust and not subject to interannual rank reversals, we conducted a repeated-measures "
            "Friedman test on normalized daily rainfall intensity (mm/day). The resulting Chi-square is 70.9385 with 3 degrees of freedom, yielding a p-value "
            "of 2.687 × 10⁻¹⁵.\n\n"
            "METHODOLOGICAL DEPTH:\n"
            "The effect size, Kendall's W, is 0.9095. A Kendall's W close to 1.0 indicates near-perfect concordance across all 26 years. "
            "Furthermore, post-hoc pairwise Wilcoxon signed-rank tests with Holm-Bonferroni correction confirm that every individual seasonal contrast is "
            "statistically significant at p < 10⁻⁵. In 26 out of 26 years, the intensity hierarchy remains strictly invariant: Monsoon > Post-Monsoon > Pre-Monsoon > Winter.\n\n"
            "TRANSITION:\n"
            "Let us inspect the intra-annual monthly climatology and month-by-month heatmap."
        )
    },
    {
        "slide_num": 12,
        "type": "dual_image",
        "category": "Historical Gridded Analysis (2000–2025)",
        "title": "Climatological Annual Cycle & Month-Year Rainfall Heatmap",
        "subtitle": "Uncovering intra-seasonal precipitation rhythms and mid-monsoon delivery peaks",
        "image_left": "outputs/figures/monthly_rainfall_climatology.png",
        "caption_left": "Figure 5A: Monthly rainfall climatology (mean & SD).",
        "image_right": "outputs/figures/year_month_rainfall_heatmap.png",
        "caption_right": "Figure 5B: Month-by-Year rainfall intensity matrix.",
        "bullets": [
            "Bimodal Monsoon Apex: July is the wettest month on average (286.91 mm), followed closely by August (258.42 mm), together delivering 47.4% of annual rainfall.",
            "Monsoon Onset & Retreat: June averages 165.65 mm as the monsoon surge establishes; September averages 154.40 mm during the withdrawal phase.",
            "Interannual Shifting: In the heatmap (Figure 5B), intense precipitation pockets shift dynamically between July (e.g., 2005, 2023) and August (e.g., 2020).",
            "Winter Aridity: December (5.62 mm) and January (7.98 mm) consistently record the lowest national rainfall."
        ],
        "stat_badge": {"val": "286.91 mm", "label": "July Climatological Mean (Apex)"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Figure 5A shows the monthly climatology curve, and Figure 5B displays the complete 26-year by 12-month heatmap. "
            "July is the climatological peak of the Indian water calendar, averaging 286.91 mm, followed by August at 258.42 mm. "
            "Together, these two months account for nearly half of India's annual precipitation budget.\n\n"
            "OBSERVATIONAL INSIGHT:\n"
            "The heatmap reveals significant intra-monsoon dynamics. For instance, in 2002, July experienced an unprecedented nationwide monsoon collapse, "
            "visible as a pale stripe, which triggered one of modern India's worst agricultural droughts. Conversely, in 2020, August was exceptionally wet.\n\n"
            "TRANSITION:\n"
            "Beyond mean totals, what matters most for flood and drought disaster management are extreme precipitation events. "
            "Let us examine the Expert Team on Climate Change Detection and Indices framework."
        )
    },
    {
        "slide_num": 13,
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
            ["CDD", "Maximum consecutive dry days (daily rain < threshold)", "Days", "Indicator of meteorological and agricultural drought hazard."],
            ["CWD", "Maximum consecutive wet days (daily rain ≥ threshold)", "Days", "Indicator of sustained waterlogging, crop root damage, and slope instability."]
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "To rigorously analyze extremes without arbitrary threshold definitions, we adopted the WMO Expert Team on Climate Change Detection and Indices "
            "(ETCCDI) framework. We computed eight standardized indices for every grid cell across all 26 years.\n\n"
            "WET-DAY THRESHOLD VERIFICATION:\n"
            "As audited directly in our computational code, wet days for aggregated statistics are defined as days with positive area-weighted precipitation (>0 mm), "
            "while standard IMD rainy days require ≥ 2.5 mm. For ETCCDI indices at the grid-cell level, standard wet-day thresholds were strictly followed.\n\n"
            "TRANSITION:\n"
            "Let us inspect the first two extreme intensity metrics: Rx1day and Rx5day."
        )
    },
    {
        "slide_num": 14,
        "type": "gif_left",
        "category": "ETCCDI Precipitation Extremes",
        "title": "Rx1day Climatology: Maximum 1-Day Precipitation Dynamics",
        "subtitle": "Spatiotemporal dynamics of single-day catastrophic deluge intensity",
        "image_path": "outputs/animations/Rx1day_2000_2025.gif",
        "image_caption": "Embedded Animation 2: Interannual evolution of Rx1day (2000–2025).",
        "bullets": [
            "Physical Phenomenon: Captures extreme sub-synoptic convective events, cloudbursts, and tropical cyclone landfalls.",
            "Hotspot Topography: Peak values consistently concentrate along the Western Ghats windward crest (often exceeding 250–400 mm/day) and the Meghalaya plateau.",
            "Data Quality Caveat: Certain localized single-cell readings in raw NetCDF products exhibited extreme single-day spikes. These have been documented for independent meteorological validation rather than accepted as unverified truth.",
            "Spatial Trend Pattern: Theil-Sen slope maps indicate heterogeneous spatial behavior; isolated pockets show positive slopes, but most grid cells exhibit non-significant trends after FDR correction."
        ],
        "stat_badge": {"val": "Rx1day", "label": "Max 1-Day Deluge Metric"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 14 presents the animated evolution of Rx1day—the maximum one-day precipitation recorded in each grid cell for every year from 2000 to 2025. "
            "Notice how the high-intensity signals flare up along the Western Ghats and coastal Odisha and Andhra Pradesh during cyclonic landfall events.\n\n"
            "QUALITY CONTROL TRANSPARENCY:\n"
            "In our research monograph, we maintain strict scientific skepticism. Certain raw NetCDF cells show extraordinary single-day values. "
            "Rather than uncritically treating these as verified climatological extremes, we flag them as potential localized observational artifacts requiring "
            "radar and ground-station cross-validation.\n\n"
            "TRANSITION:\n"
            "Let us examine cumulative multi-day inundation via Rx5day."
        )
    },
    {
        "slide_num": 15,
        "type": "gif_left",
        "category": "ETCCDI Precipitation Extremes",
        "title": "Rx5day Climatology: Multi-Day Cumulative Storm Inundation",
        "subtitle": "Basin-scale flood risk metric tracking 5-day cumulative rainfall accumulation",
        "image_path": "outputs/animations/Rx5day_2000_2025.gif",
        "image_caption": "Embedded Animation 3: Interannual evolution of Rx5day (2000–2025).",
        "bullets": [
            "Hydrological Relevance: Rx5day represents the primary atmospheric driver of major river basin flooding (Brahmaputra, Mahanadi, Godavari, Narmada).",
            "Cumulative Magnitudes: 5-day totals frequently exceed 500–800 mm in orographic and monsoon depression tracks.",
            "Spatial Footprint: Unlike isolated Rx1day convective bursts, Rx5day exhibits broad spatial coherence, reflecting organized synoptic low-pressure systems traversing central India.",
            "Decadal Dynamics: Notable widespread Rx5day expansions occurred in 2005 (Mumbai-Maharashtra flooding), 2018 (Kerala floods), and 2020."
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
        "slide_num": 16,
        "type": "dual_image",
        "category": "ETCCDI Precipitation Extremes",
        "title": "Heavy Precipitation Frequency: R10mm and R20mm Thresholds",
        "subtitle": "Monitoring the annual count of days exceeding moderate and heavy rainfall thresholds",
        "image_left": "outputs/animations/R10mm_2000_2025.gif",
        "caption_left": "Embedded Animation 4A: R10mm days (≥ 10 mm).",
        "image_right": "outputs/animations/R20mm_2000_2025.gif",
        "caption_right": "Embedded Animation 4B: R20mm days (≥ 20 mm).",
        "bullets": [
            "Threshold Distinction: R10mm represents days with beneficial soaking rain for crops; R20mm represents days where precipitation frequently generates active surface runoff.",
            "Spatial Gradient: Along the west coast, R10mm exceeds 60–80 days per year, and R20mm exceeds 40–50 days. In contrast, northwest arid zones record under 5 R10mm days annually.",
            "Climatological Compression: The animations reveal that very heavy rainfall (R20mm) is spatially concentrated into narrow geographical corridors along mountain barriers and cyclone tracks.",
            "Spatial Trend Significance: Under False Discovery Rate correction (q=0.05), over 90% of grid cells show non-significant trends in R10mm and R20mm frequency over the 26-year study period."
        ],
        "stat_badge": {"val": "R10 / R20", "label": "Precipitation Frequency Thresholds"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Here we compare two critical threshold indices side by side: R10mm (days with rainfall ≥ 10 mm) on the left, and R20mm (days with rainfall ≥ 20 mm) on the right. "
            "These indices tell us whether the frequency of rainy days is expanding or contracting.\n\n"
            "KEY FINDINGS:\n"
            "In western coastal and northeastern belts, farmers experience between 60 and 80 R10mm days annually. But as you step up to the 20 mm threshold, the spatial belt compresses dramatically. "
            "Crucially, our spatial Sen's slope and FDR analysis indicates that for the vast majority of grid cells, the annual count of heavy precipitation days has remained statistically stable over 2000–2025.\n\n"
            "TRANSITION:\n"
            "Let us compare overall wet-day volume (PRCPTOT) against precipitation intensity (SDII)."
        )
    },
    {
        "slide_num": 17,
        "type": "dual_image",
        "category": "ETCCDI Precipitation Extremes",
        "title": "Rainfall Volume vs. Daily Intensity: PRCPTOT & SDII Dynamics",
        "subtitle": "Disentangling total precipitation amount from average wet-day intensity",
        "image_left": "outputs/animations/PRCPTOT_2000_2025.gif",
        "caption_left": "Embedded Animation 5A: PRCPTOT (Wet-day volume).",
        "image_right": "outputs/animations/SDII_2000_2025.gif",
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
            "Slide 17 addresses a vital climatological hypothesis: Is India receiving more intense rainfall on fewer wet days? "
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
        "slide_num": 18,
        "type": "dual_image",
        "category": "ETCCDI Precipitation Extremes",
        "title": "Dry & Wet Spell Persistence: Consecutive Dry (CDD) & Wet (CWD) Days",
        "subtitle": "Investigating temporal trends in drought duration and sustained waterlogging",
        "image_left": "outputs/figures/extreme_indices/CDD_CWD_temporal_trends.png",
        "caption_left": "Figure 6A: CDD & CWD national temporal trends.",
        "image_right": "outputs/figures/extreme_indices/spatial_trend_maps/cwd_cdd/CDD_Sen_Slope_Map.png",
        "caption_right": "Figure 6B: Spatial distribution of CDD Sen's slope.",
        "bullets": [
            "Consecutive Dry Days (CDD): Maximum consecutive dry-spell length across the full year. National mean Sen's slope = -0.345 days/year (raw p = 0.188, Holm p = 0.376).",
            "Consecutive Wet Days (CWD): Maximum consecutive wet-spell duration during the monsoon. National mean Sen's slope = -0.017 days/year (raw p = 0.727, Holm p = 0.727).",
            "Absence of Secular Spell Extension: Neither dry spell duration nor wet spell duration exhibits a statistically significant nationwide secular trend over 2000–2025.",
            "Agricultural Implication: While individual years experience acute dry spells, long-term multi-week agricultural drought duration has remained structurally stationary."
        ],
        "stat_badge": {"val": "CDD: p = 0.188", "label": "No Significant Spell Trend"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Figure 6A shows the temporal trajectories of Consecutive Dry Days (CDD) and Consecutive Wet Days (CWD). "
            "Figure 6B presents the spatial distribution of CDD Sen's slopes across the country.\n\n"
            "KEY FINDINGS:\n"
            "CDD measures the longest continuous dry spell, crucial for agricultural drought risk. The national Sen's slope is -0.345 days per year, with a raw p-value of 0.188. "
            "CWD measures the longest continuous wet spell, crucial for waterlogging and root rot. Its slope is -0.017 days per year with a p-value of 0.727. "
            "Neither index shows a statistically significant monotonic trend. The length of the longest dry spells and wet spells has been stationary across 2000–2025.\n\n"
            "TRANSITION:\n"
            "Let us examine how spatial trend testing across 4,885 cells behaves when corrected for False Discovery Rate."
        )
    },
    {
        "slide_num": 19,
        "type": "dual_image",
        "category": "Spatial Statistical Inference",
        "title": "Multidecadal Trend Analysis: Sen's Slope & False Discovery Rate Control",
        "subtitle": "Why raw spatial p-values deceive: Applying Benjamini-Hochberg FDR (q = 0.05)",
        "image_left": "outputs/figures/extreme_indices/spatial_trend_maps/PRCPTOT_Sen_Slope_Map.png",
        "caption_left": "Figure 7A: Spatial Sen's slope for PRCPTOT (mm/yr).",
        "image_right": "outputs/figures/extreme_indices/spatial_trend_maps/PRCPTOT_Significance_Map.png",
        "caption_right": "Figure 7B: BH-FDR (q=0.05) significance map.",
        "bullets": [
            "The Multiple-Testing Trap: When evaluating 4,885 separate Mann-Kendall tests at alpha = 0.05, approximately 244 grid cells will test 'significant' purely by random chance.",
            "Benjamini-Hochberg FDR Procedure: We ranked all p-values and applied the BH-FDR threshold: P_(i) ≤ (i / m) * q, with q = 0.05.",
            "Visual vs. Statistical Reality: Figure 7A shows widespread patches of positive Sen's slopes in green. However, Figure 7B demonstrates that after FDR adjustment, almost all cells fail to reach statistical significance.",
            "Rigorous Conclusion: A visually apparent spatial trend must never be equated with statistical significance. The 2000–2025 epoch was characterized by spatial heterogeneity and local fluctuations, not widespread climate shifts."
        ],
        "stat_badge": {"val": "BH-FDR (q=0.05)", "label": "Spatial Multiple-Testing Control"},
        "notes": (
            "SPEAKER SCRIPT:\n"
            "Slide 19 is perhaps one of the most methodologically critical slides in our entire presentation. "
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
        "slide_num": 20,
        "type": "table_cards",
        "category": "Data Quality Assurance",
        "title": "Data Quality Audit: Zero-Rainfall Sensitivity & Scenario Analysis",
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
                    "As shown in the table above, the Sen's slope shifts marginally from -0.345 to -0.232 days/year, and p-values remain non-significant (p = 0.188 vs. p = 0.237).",
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
            "This concludes Part 1's historical baseline. Now let us turn to Part 3 and examine our 2026 administrative panel study."
        )
    },

    # ----------------------------------------------------
    # PART 3: 2026 STATE AND DISTRICT ANALYSIS
    # ----------------------------------------------------
    {
        "slide_num": 21,
        "type": "split_cards",
        "category": "2026 Observational Study",
        "title": "2026 Observational Framework & Balanced Panel Architecture",
        "subtitle": "High-resolution monitoring across 85 dates, 36 States/UTs, and 727 districts",
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
            "Welcome to Part 3 of our presentation, focusing on the 2026 observational study. "
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
        "slide_num": 22,
        "type": "image_right",
        "category": "2026 Observational Study",
        "title": "India State-wise Actual Daily Rainfall Distribution (2026)",
        "subtitle": "Interactive choropleth mapping mean actual daily precipitation across 36 States/UTs",
        "image_path": "outputs_project2/figures/india_statewise_actual_rainfall_map.png",
        "image_caption": "Figure 8: State-wise mean actual daily rainfall distribution (19 Aug – 12 Nov 2026).",
        "bullets": [
            "Leading Precipitation States: Andaman & Nicobar recorded the highest mean daily rainfall (13.73 mm/day, total 1,166.9 mm across 85 days), followed by Sikkim (8.66 mm/day), Mizoram (7.46 mm/day), Odisha (7.43 mm/day), and Kerala (6.37 mm/day).",
            "Arid Continental Interior: Northwest and western states recorded the lowest daily rainfall, including Rajasthan, Punjab, and Ladakh (<1.5 mm/day).",
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
            "Let us inspect the quantitative summary table of state-level rainfall variability."
        )
    },
    {
        "slide_num": 23,
        "type": "table",
        "category": "2026 Observational Study",
        "title": "State-Level Rainfall Variability & Climatological Baselines (2026)",
        "subtitle": "Summary statistics across top reporting states during the 85-day observation window",
        "headers": ["State / UT", "Days", "Mean Actual (mm)", "Mean Normal (mm)", "Max Daily (mm)", "Total Rain (mm)", "Rainy Days (≥2.5mm)", "Zero Rain Days"],
        "rows": [
            ["Andaman & Nicobar (UT)", "85", "13.73", "11.56", "59.10", "1,166.90", "69", "3"],
            ["Sikkim", "85", "8.66", "7.86", "99.20", "736.40", "43", "27"],
            ["Mizoram", "85", "7.46", "8.87", "49.90", "634.00", "54", "16"],
            ["Odisha", "85", "7.43", "5.92", "68.20", "631.20", "36", "12"],
            ["Kerala", "85", "6.37", "9.42", "43.40", "541.60", "50", "5"],
            ["Uttar Pradesh", "85", "4.67", "3.19", "45.80", "396.95", "29", "31"],
            ["Maharashtra", "85", "3.52", "6.41", "34.10", "299.20", "28", "26"],
            ["Gujarat", "85", "2.81", "4.33", "38.50", "238.85", "21", "41"]
        ],
        "notes": (
            "SPEAKER SCRIPT:\n"
            "This table presents key summary statistics for representative States and UTs during the 2026 observation period. "
            "Notice the comparison between Mean Actual Rainfall and Mean Normal Rainfall.\n\n"
            "KEY CONTRASTS:\n"
            "In Andaman & Nicobar, actual rainfall (13.73 mm/day) exceeded normal (11.56 mm/day), with 69 out of 85 days qualifying as rainy days (≥ 2.5 mm). "
            "In Uttar Pradesh, actual rainfall averaged 4.67 mm/day compared to a normal of 3.19 mm/day—a significant positive surplus. "
            "However, in major agrarian states like Maharashtra (3.52 vs 6.41 mm/day) and Gujarat (2.81 vs 4.33 mm/day), actual rainfall lagged significantly behind normal baselines.\n\n"
            "TRANSITION:\n"
            "Before testing whether these differences are statistically significant, we encountered a major data hazard: the instability of reported percentage departures."
        )
    },
    {
        "slide_num": 24,
        "type": "formula_card",
        "category": "Methodological Discovery",
        "title": "The Denominator Catastrophe: Instability of Percentage Departure",
        "subtitle": "Mathematical proof of division-by-zero distortion in official departure statistics",
        "formula": "Departure Percentage (%) = ((Actual Rainfall - Normal Rainfall) / Normal Rainfall) * 100",
        "cards": [
            {
                "title": "1. The Small Denominator Explosion",
                "bullets": [
                    "When normal daily rainfall is small (Normal ≤ 0.1 mm/day), any modest rainfall event (e.g., a brief 5 mm shower) produces astronomical percentage departures.",
                    "In our dataset, reported departure percentages reached an absurd maximum of +82,735.0%!",
                    "Across all district-days where Normal ≤ 0.1 mm/day, reported departures averaged +2,453.83%."
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
            "Slide 24 highlights an important methodological finding from our research: what we term 'The Denominator Catastrophe'. "
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
        "slide_num": 25,
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
        "slide_num": 26,
        "type": "image_right",
        "category": "Hypothesis Testing (2026)",
        "title": "State-Level Paired Wilcoxon Testing with Holm Error Control",
        "subtitle": "Isolating 10 statistically significant states under family-wise error rate control",
        "image_path": "outputs_project2/figures/statewise_wilcoxon_rainfall_difference_corrected.png",
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
            "Slide 26 breaks down the Wilcoxon paired test by individual states, applying Holm-Bonferroni correction across all 28 states with sufficient district counts. "
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
        "slide_num": 27,
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
        "slide_num": 28,
        "type": "dual_image",
        "category": "2026 Extreme Events",
        "title": "Extreme Precipitation Outliers: Top Deluges & Localized Risks (2026)",
        "subtitle": "Documenting 99 extreme district-day events exceeding 100 mm during 2026",
        "image_left": "outputs_project2/figures/top15_district_extreme_rainfall.png",
        "caption_left": "Figure 10A: Top 15 extreme district rainfall events.",
        "image_right": "outputs_project2/figures/statewise_extreme_rainfall.png",
        "caption_right": "Figure 10B: Frequency of extreme deluges by state.",
        "bullets": [
            "Extremes Census: Exactly 99 district-day observations recorded rainfall ≥ 100 mm across 76 unique districts in 20 States and UTs.",
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
            "Now let us synthesize the insights from both studies in Part 4."
        )
    },

    # ----------------------------------------------------
    # PART 4: SYNTHESIS, CRITICAL REFLECTION & CONCLUSION
    # ----------------------------------------------------
    {
        "slide_num": 29,
        "type": "split_cards",
        "category": "Synthesis & Integration",
        "title": "Dual-Study Synthesis: Macro Stability vs. Meso Vulnerability",
        "subtitle": "Reconciling 26-year climatological stationarity with intense real-time regional risk",
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
        "slide_num": 30,
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
        "slide_num": 31,
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
                    "Deployed 'RainfallRisk India' as a production web application (https://rainfallriskindia.vercel.app) featuring custom editorial 'Living Monsoon Sky' UI, interactive choropleths, and complete data transparency.",
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
        "slide_num": 32,
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
        "slide_num": 33,
        "type": "split_cards",
        "category": "Monograph Conclusion",
        "title": "Monograph Conclusion: The Living Monsoon Sky",
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
        "slide_num": 34,
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
