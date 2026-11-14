export interface ExtremeIndexInfo {
  id: 'PRCPTOT' | 'SDII' | 'Rx1day' | 'Rx5day' | 'R10mm' | 'R20mm' | 'CDD' | 'CWD';
  name: string;
  unit: string;
  definition: string;
  hasAnimation: boolean;
  animationPath?: string;
  yearlyMapPattern?: (year: number) => string;
  senSlopeMapPath: string;
  significanceMapPath: string;
}

export const EXTREME_INDEX_CATALOG: ExtremeIndexInfo[] = [
  {
    id: 'PRCPTOT',
    name: 'Annual Wet-Day Total Precipitation',
    unit: 'mm/year',
    definition: 'Total rainfall accumulated across all wet days (daily rainfall ≥ 1.0 mm) within each calendar year.',
    hasAnimation: true,
    animationPath: '/outputs/animations/PRCPTOT_2000_2025.gif',
    yearlyMapPattern: (y) => `/outputs/figures/extreme_indices/extreme_indices/PRCPTOT/PRCPTOT_${y}.png`,
    senSlopeMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/PRCPTOT_Sen_Slope_Map.png',
    significanceMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/PRCPTOT_Significance_Map.png',
  },
  {
    id: 'SDII',
    name: 'Simple Daily Intensity Index',
    unit: 'mm/wet day',
    definition: 'Mean rainfall intensity on wet days (PRCPTOT divided by the count of days with rainfall ≥ 1.0 mm).',
    hasAnimation: true,
    animationPath: '/outputs/animations/SDII_2000_2025.gif',
    yearlyMapPattern: (y) => `/outputs/figures/extreme_indices/extreme_indices/SDII/SDII_${y}.png`,
    senSlopeMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/SDII_Sen_Slope_Map.png',
    significanceMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/SDII_Significance_Map.png',
  },
  {
    id: 'Rx1day',
    name: 'Maximum 1-Day Precipitation',
    unit: 'mm',
    definition: 'Annual maximum single-day rainfall recorded at each grid cell within the 4,885-cell common footprint.',
    hasAnimation: true,
    animationPath: '/outputs/animations/Rx1day_2000_2025.gif',
    yearlyMapPattern: (y) => `/outputs/figures/extreme_indices/Rx1day_${y}.png`,
    senSlopeMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/Rx1day_Sen_Slope_Map.png',
    significanceMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/Rx1day_Significance_Map.png',
  },
  {
    id: 'Rx5day',
    name: 'Maximum Consecutive 5-Day Precipitation',
    unit: 'mm',
    definition: 'Annual maximum cumulative rainfall over any rolling 5-day window at each grid cell.',
    hasAnimation: true,
    animationPath: '/outputs/animations/Rx5day_2000_2025.gif',
    yearlyMapPattern: (y) => `/outputs/figures/extreme_indices/Rx5day_${y}.png`,
    senSlopeMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/Rx5day_Sen_Slope_Map.png',
    significanceMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/Rx5day_Significance_Map.png',
  },
  {
    id: 'R10mm',
    name: 'Heavy Precipitation Days (≥ 10 mm)',
    unit: 'days/year',
    definition: 'Annual count of days where daily precipitation equals or exceeds 10 mm.',
    hasAnimation: true,
    animationPath: '/outputs/animations/R10mm_2000_2025.gif',
    yearlyMapPattern: (y) => `/outputs/figures/extreme_indices/R10mm/R10mm_${y}.png`,
    senSlopeMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/heavy_rainfall_frequency/R10mm_Sen_Slope_Map.png',
    significanceMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/heavy_rainfall_frequency/R10mm_Significance_Map.png',
  },
  {
    id: 'R20mm',
    name: 'Very Heavy Precipitation Days (≥ 20 mm)',
    unit: 'days/year',
    definition: 'Annual count of days where daily precipitation equals or exceeds 20 mm.',
    hasAnimation: true,
    animationPath: '/outputs/animations/R20mm_2000_2025.gif',
    yearlyMapPattern: (y) => `/outputs/figures/extreme_indices/R20mm/R20mm_${y}.png`,
    senSlopeMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/heavy_rainfall_frequency/R20mm_Sen_Slope_Map.png',
    significanceMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/heavy_rainfall_frequency/R20mm_Significance_Map.png',
  },
  {
    id: 'CDD',
    name: 'Consecutive Dry Days (< 1 mm)',
    unit: 'days',
    definition: 'Maximum length of consecutive dry days (daily rainfall < 1.0 mm) within each calendar year.',
    hasAnimation: false,
    senSlopeMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/cwd_cdd/CDD_Sen_Slope_Map.png',
    significanceMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/cwd_cdd/CDD_Significance_Map.png',
  },
  {
    id: 'CWD',
    name: 'Consecutive Wet Days (≥ 1 mm)',
    unit: 'days',
    definition: 'Maximum length of consecutive wet days (daily rainfall ≥ 1.0 mm) within each calendar year.',
    hasAnimation: false,
    senSlopeMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/cwd_cdd/CWD_Sen_Slope_Map.png',
    significanceMapPath: '/outputs/figures/extreme_indices/spatial_trend_maps/cwd_cdd/CWD_Significance_Map.png',
  },
];

export interface DownloadableFile {
  title: string;
  researchPhase: 'Research 01 (2000–2025)' | 'Research 02 (Aug–Nov 2026)';
  category: string;
  path: string;
  description: string;
}

export const DOWNLOADABLE_CSV_CATALOG: DownloadableFile[] = [
  {
    title: 'Annual Rainfall Statistics (2000–2025)',
    researchPhase: 'Research 01 (2000–2025)',
    category: 'Summary Table',
    path: '/outputs/tables/annual_rainfall_statistics_2000_2025.csv',
    description: '26 yearly records of area-weighted annual totals, wet days, rainy days ≥ 2.5 mm, and deviations.',
  },
  {
    title: 'Daily Area-Weighted Rainfall Series (2000–2025)',
    researchPhase: 'Research 01 (2000–2025)',
    category: 'Processed Time Series',
    path: '/outputs/processed_data/daily_area_weighted_rainfall_2000_2025.csv',
    description: '9,497 daily cosine-latitude area-weighted rainfall values over the 4,885-cell common footprint.',
  },
  {
    title: 'Monthly Rainfall Climatology & Totals',
    researchPhase: 'Research 01 (2000–2025)',
    category: 'Climatology',
    path: '/outputs/tables/monthly_rainfall_totals_2000_2025.csv',
    description: '312 year-month rainfall totals across 2000–2025.',
  },
  {
    title: 'Seasonal Rainfall Totals & Mann–Kendall Results',
    researchPhase: 'Research 01 (2000–2025)',
    category: 'Hypothesis Testing',
    path: '/outputs/tables/seasonal_mann_kendall_sen_trend_results.csv',
    description: 'Seasonal Kendall tau, Sen slopes, raw and Holm-adjusted p-values across 4 IMD seasons.',
  },
  {
    title: 'PRCPTOT & SDII Grid-Cell Spatial Trends (4,885 cells)',
    researchPhase: 'Research 01 (2000–2025)',
    category: 'Spatial Trend Matrix',
    path: '/outputs/tables/PRCPTOT_SDII_spatial_trend_results.csv',
    description: 'Cell-wise Mann–Kendall, Sen slope, and Benjamini–Hochberg FDR significance for PRCPTOT and SDII.',
  },
  {
    title: 'Rx1day & Rx5day Grid-Cell Spatial Trends (4,885 cells)',
    researchPhase: 'Research 01 (2000–2025)',
    category: 'Spatial Trend Matrix',
    path: '/outputs/tables/Rx1day_Rx5day_spatial_trend_results.csv',
    description: 'Cell-wise spatial trends for annual 1-day and 5-day extreme rainfall maxima.',
  },
  {
    title: 'R10mm & R20mm Grid-Cell Spatial Trends (4,885 cells)',
    researchPhase: 'Research 01 (2000–2025)',
    category: 'Spatial Trend Matrix',
    path: '/outputs/tables/R10mm_R20mm_spatial_trend_results.csv',
    description: 'Cell-wise spatial trends for heavy (≥10 mm) and very heavy (≥20 mm) precipitation day counts.',
  },
  {
    title: 'CWD & CDD Grid-Cell Spatial Trends (4,885 cells)',
    researchPhase: 'Research 01 (2000–2025)',
    category: 'Spatial Trend Matrix',
    path: '/outputs/tables/CWD_CDD_spatial_trend_results.csv',
    description: 'Cell-wise spatial trends for Consecutive Wet Days and Consecutive Dry Days.',
  },
  {
    title: 'Zero-Rainfall Anomaly Flag Register (90 flagged cells)',
    researchPhase: 'Research 01 (2000–2025)',
    category: 'Sensitivity & QC',
    path: '/outputs/tables/zero_rainfall_anomaly_flag_register.csv',
    description: 'Neighbourhood audit identifying 90 grid cells with anomalous zero-rainfall years.',
  },
  {
    title: 'State-wise Rainfall Summary (36 States/UTs)',
    researchPhase: 'Research 02 (Aug–Nov 2026)',
    category: 'State Summary',
    path: '/outputs_project2/tables/statewise_rainfall_summary_final.csv',
    description: 'Complete summary across 36 reporting units and 85 dates (19 Aug – 12 Nov 2026, missing 31 Oct).',
  },
  {
    title: 'State-wise Clean Daily Panel (3,060 observations)',
    researchPhase: 'Research 02 (Aug–Nov 2026)',
    category: 'Processed Data',
    path: '/outputs_project2/processed_data/statewise_analysis_clean.csv',
    description: 'Cleaned daily actual, normal, and departure records across 36 States/UTs.',
  },
  {
    title: 'District-wise Rainfall Summary (727 balanced districts)',
    researchPhase: 'Research 02 (Aug–Nov 2026)',
    category: 'District Summary',
    path: '/outputs_project2/tables/districtwise_rainfall_summary.csv',
    description: 'District mean, median, std dev, CV%, anomaly, and rainy-day counts across 727 districts.',
  },
  {
    title: 'District-wise Balanced Daily Panel (61,795 observations)',
    researchPhase: 'Research 02 (Aug–Nov 2026)',
    category: 'Processed Data',
    path: '/outputs_project2/processed_data/districtwise_balanced_analysis.csv',
    description: 'Balanced 85-date daily dataset across 727 Indian districts (excludes incomplete Nagapattinam).',
  },
  {
    title: 'Extreme District-Day Events ≥ 100 mm (99 events)',
    researchPhase: 'Research 02 (Aug–Nov 2026)',
    category: 'Extreme Events',
    path: '/outputs_project2/processed_data/district_extreme_rainfall_events.csv',
    description: 'All 99 district-day observations recording ≥ 100 mm rainfall during Aug–Nov 2026.',
  },
  {
    title: 'State-wise Paired Wilcoxon Holm Results (28 States)',
    researchPhase: 'Research 02 (Aug–Nov 2026)',
    category: 'Hypothesis Testing',
    path: '/outputs_project2/tables/statewise_actual_vs_normal_wilcoxon_holm_corrected.csv',
    description: 'State-level paired Wilcoxon tests comparing actual vs normal district rainfall with Holm adjustment.',
  },
  {
    title: 'Pairwise Welch Holm Results (378 State Pairs)',
    researchPhase: 'Research 02 (Aug–Nov 2026)',
    category: 'Hypothesis Testing',
    path: '/outputs_project2/tables/statewise_pairwise_welch_holm_results.csv',
    description: 'Pairwise Welch t-test comparisons between 28 states with Holm multiple-testing correction.',
  },
  {
    title: 'Dunn Post-Hoc Holm Results (378 State Pairs)',
    researchPhase: 'Research 02 (Aug–Nov 2026)',
    category: 'Hypothesis Testing',
    path: '/outputs_project2/tables/statewise_dunn_holm_results.csv',
    description: 'Non-parametric Dunn post-hoc pairwise comparisons with Holm adjustment.',
  },
];

