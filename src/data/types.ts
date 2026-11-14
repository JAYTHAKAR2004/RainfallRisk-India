export type PageRoute =
  | 'home'
  | 'methodology'
  | 'historical'
  | 'regional'
  | 'atlas'
  | 'explorer'
  | 'findings'
  | 'about';

export interface AnnualStatRow {
  Year: number;
  Annual_Rainfall_mm: number;
  Mean_Daily_Rainfall_mm: number;
  Maximum_Daily_Rainfall_mm: number;
  Minimum_Daily_Rainfall_mm: number;
  Wet_Days: number;
  Rainy_Days_2_5mm: number;
  Number_of_Days: number;
  Deviation_from_Mean_mm: number;
  Deviation_Percentage: number;
}

export interface VariabilitySummaryRow {
  'Statistical Measure': string;
  Value: number;
  Unit: string;
}

export interface MonthlyClimatologyRow {
  Month: number;
  mean: number;
  median: number;
  std: number;
  Month_Name: string;
}

export interface MonthlyTotalRow {
  Year: number;
  Month: number;
  Monthly_Rainfall_mm: number;
}

export interface SeasonalSummaryRow {
  Season: string;
  mean: number;
  median: number;
  std: number;
  min: number;
  max: number;
  Contribution_Percent: number;
}

export interface SeasonalYearRow {
  Year: number;
  Winter: number;
  'Pre-Monsoon': number;
  'Southwest Monsoon': number;
  'Post-Monsoon': number;
}

export interface SeasonalIntensitySummaryRow {
  Season: string;
  mean: number;
  median: number;
  std: number;
  min: number;
  max: number;
}

export interface FriedmanRow {
  Test: string;
  Chi_Square: number;
  Degrees_of_Freedom: number;
  P_Value: number;
  Kendalls_W: number;
  Alpha?: number;
  Years: number;
}

export interface PairwiseSeasonalRow {
  Season_1: string;
  Season_2: string;
  Statistic: number;
  Raw_P_Value: number;
  Adjusted_P_Value: number;
  Significant: boolean;
}

export interface SeasonalMannKendallRow {
  Season: string;
  Kendall_Tau: number;
  Raw_P_Value: number;
  Sen_Slope_mm_day_per_year: number;
  Sen_CI_Lower: number;
  Sen_CI_Upper: number;
  Adjusted_P_Value: number;
  Significant: boolean;
  Trend: string;
}

export interface AutocorrelationRow {
  Season: string;
  Lag_1_Autocorrelation: number;
  Lag: number;
  Ljung_Box_Statistic: number;
  P_Value: number;
  Significant: boolean;
}

export interface PrcptotSdiiAnnualRow {
  Year: number;
  PRCPTOT_Mean: number;
  PRCPTOT_Median: number;
  PRCPTOT_Std: number;
  PRCPTOT_Min: number;
  PRCPTOT_Max: number;
  PRCPTOT_P95: number;
  SDII_Mean: number;
  SDII_Median: number;
  SDII_Std: number;
  SDII_Min: number;
  SDII_Max: number;
  SDII_P95: number;
  Valid_SDII_Cells: number;
}

export interface TrendAnalysisRow {
  Index: string;
  Kendall_Tau: number;
  P_Value: number;
  Sen_Slope_Per_Year?: number;
  Sen_Slope_Days_Per_Year?: number;
  CI_Lower: number;
  CI_Upper: number;
  Lag1_Autocorrelation: number;
  Holm_Adjusted_P: number;
  Significant_After_Holm: boolean;
  Trend_Direction: string;
}

export interface CwdCddAnnualRow {
  Year: number;
  Days_In_Year: number;
  Maximum_CWD: number;
  Maximum_CDD: number;
  Cells_With_CDD_365_or_More: number;
}

export interface SensitivityYearlyRow {
  Year: number;
  Scenario: string;
  Grid_Cells: number;
  Mean_CDD_Days?: number;
  Median_CDD_Days?: number;
  Maximum_CDD_Days?: number;
  Cells_With_Full_Year_CDD?: number;
  Mean_CWD_Days?: number;
  Median_CWD_Days?: number;
  Maximum_CWD_Days?: number;
  Cells_With_Full_Year_CWD?: number;
}

export interface ZeroRainfallFlagRow {
  Latitude: number;
  Longitude: number;
  Zero_Rainfall_Years: number;
  Positive_Neighbour_Years: number;
  All_Neighbours_Zero_Years: number;
  Potential_Anomaly: boolean;
  Flag_Category: string;
}

export interface SpatialTrendSummaryRow {
  Index: string;
  Total_Cells: number;
  Increasing_FDR_05: number;
  Decreasing_FDR_05: number;
  Not_Significant: number;
  Mean_Sen_Slope: number;
  Median_Sen_Slope: number;
  Min_Sen_Slope: number;
  Max_Sen_Slope: number;
}

export interface HistoricalDataBundle {
  metadata: {
    study_period: string;
    years: number;
    netcdf_files: number;
    daily_observations: number;
    total_grid_cells: number;
    common_footprint_cells: number;
    common_footprint_coverage_pct: number;
    intermittent_cells: number;
    no_data_cells: number;
    lat_range: [number, number];
    lon_range: [number, number];
    annual_preliminary_trend: {
      ols_slope_mm_yr: number;
      ols_intercept: number;
      ols_r2: number;
      ols_p_value: number;
      ols_ci_95: [number, number];
      mk_tau: number;
      mk_p_value: number;
      sen_slope_mm_yr: number;
      sen_ci_95: [number, number];
    };
  };
  quality_control: {
    project: string;
    dataset: string;
    period: string;
    total_days: number;
    grid_cells_in_common_footprint: number;
    valid_observations: number;
    missing_observations_inside_footprint: number;
    valid_observations_outside_footprint: number;
    source_comparisons: number;
    maximum_source_difference_mm: number;
    checks: Record<string, boolean>;
    overall_status: string;
  };
  daily_distribution_stats: { Metric: string; Value: number }[];
  annual_statistics: AnnualStatRow[];
  annual_variability_summary: VariabilitySummaryRow[];
  monthly_climatology: MonthlyClimatologyRow[];
  monthly_totals: MonthlyTotalRow[];
  seasonal_summary: SeasonalSummaryRow[];
  seasonal_totals_by_year: SeasonalYearRow[];
  seasonal_intensity_summary: SeasonalIntensitySummaryRow[];
  seasonal_daily_intensity_by_year: SeasonalYearRow[];
  friedman_seasonal: FriedmanRow[];
  friedman_intensity: FriedmanRow[];
  seasonal_pairwise_wilcoxon: PairwiseSeasonalRow[];
  seasonal_intensity_pairwise: PairwiseSeasonalRow[];
  seasonal_mann_kendall: SeasonalMannKendallRow[];
  seasonal_autocorrelation: AutocorrelationRow[];
  prcptot_sdii_annual: PrcptotSdiiAnnualRow[];
  prcptot_sdii_trend: TrendAnalysisRow[];
  cwd_cdd_annual: CwdCddAnnualRow[];
  cdd_cwd_trend: TrendAnalysisRow[];
  cdd_trend_sensitivity: Record<string, unknown>[];
  cwd_trend_sensitivity: Record<string, unknown>[];
  cdd_sensitivity_yearly: SensitivityYearlyRow[];
  cwd_sensitivity_yearly: SensitivityYearlyRow[];
  zero_rainfall_annual: { Year: number; Zero_Annual_Rainfall_Cells: number; Percentage_of_Footprint: number }[];
  zero_rainfall_flags: ZeroRainfallFlagRow[];
  zero_rainfall_neighbourhood: Record<string, unknown>[];
  spatial_trend_summary: SpatialTrendSummaryRow[];
}

export interface FootprintCellsBundle {
  total_grid_cells: number;
  at_least_one_valid_cells: number;
  intermittent_cells: number;
  no_data_cells: number;
  common_footprint_cells: number;
  coverage_percent: number;
  lat: number[];
  lon: number[];
  indices: Record<
    string,
    {
      slope: (number | null)[];
      sig: number[]; // 1 = Increasing (FDR<0.05), -1 = Decreasing, 0 = Not significant
    }
  >;
}

export interface StateSummaryRow {
  State: string;
  state_key: string;
  Observation_Count: number;
  Mean_Actual_Rainfall: number;
  Median_Actual_Rainfall: number;
  Mean_Normal_Rainfall: number;
  Mean_Reported_Departure: number;
  Maximum_Daily_Rainfall: number;
  Total_Observed_Rainfall: number;
  Rainy_Days_2_5mm: number;
  Zero_Rainfall_Days: number;
  Std_Rainfall: number;
  Min_Rainfall: number;
  CV_Percent: number;
  Mean_Anomaly_mm: number;
  Rainy_Day_Percent: number;
  District_Count: number | null;
  Mean_Difference: number | null;
  Median_Difference: number | null;
  Wilcoxon_Statistic: number | null;
  Raw_P_Value: number | null;
  Holm_Adjusted_P: number | null;
  Significant: boolean | null;
  Rainfall_Status: string | null;
  Extreme_Observations: number;
  Extreme_Unique_Districts: number;
  Max_District_Extreme_mm: number | null;
}

export interface StateWilcoxonRow {
  State: string;
  District_Count: number;
  Mean_Difference: number;
  Median_Difference: number;
  Wilcoxon_Statistic: number;
  Raw_P_Value: number;
  Holm_Adjusted_P: number;
  Significant: boolean;
  Rainfall_Status: string;
}

export interface DistrictSummaryRow {
  State: string;
  District: string;
  Observation_Count: number;
  Mean_Actual_Rainfall: number;
  Median_Actual_Rainfall: number;
  Std_Actual_Rainfall: number;
  Min_Daily_Rainfall: number;
  Max_Daily_Rainfall: number;
  Mean_Normal_Rainfall: number;
  Total_Observed_Rainfall: number;
  Rainy_Days_2_5mm: number;
  Zero_Rainfall_Days: number;
  CV_Percent: number;
  Mean_Anomaly_mm: number;
  Rainy_Day_Percent: number;
  Rainfall_Difference: number;
}

export interface ExtremeDistrictEventRow {
  State: string;
  District: string;
  Date: string;
  'Daily Actual': number;
  'Daily Normal': number;
  'Daily Departure Per': number;
  'Daily Category': string;
  'Monthly Acutual'?: number;
  'Monthly Normal'?: number;
}

export interface Top20ExtremeRow {
  Rank: number;
  State: string;
  District: string;
  Date: string;
  'Daily Actual': number;
  'Daily Normal': number;
  'Daily Category': string;
}

export interface DistrictDailyTemporalRow {
  Date: string;
  Mean_Rainfall: number;
  Median_Rainfall: number;
  Maximum_Rainfall: number;
  Minimum_Rainfall: number;
  Rainfall_Std: number;
  Mean_Normal: number;
  Total_District_Rainfall: number;
  Rainy_Districts: number;
  Zero_Rainfall_Districts: number;
  District_Count: number;
  Rainy_District_Percent: number;
}

export interface PairwiseDunnRow {
  State_A: string;
  State_B: string;
  Mean_Rank_Difference: number;
  Z_Statistic: number;
  Raw_P_Value: number;
  Holm_Adjusted_P: number;
  Significant: boolean;
}

export interface PairwiseWelchRow {
  State_A: string;
  State_B: string;
  Mean_Difference: number;
  T_Statistic: number;
  Raw_P_Value: number;
  CI_Lower: number;
  CI_Upper: number;
  Holm_Adjusted_P: number;
  Significant: boolean;
}

export interface RegionalDataBundle {
  metadata: {
    study_period: string;
    missing_date: string;
    reporting_dates_per_unit: number;
    state_units: number;
    state_total_observations: number;
    balanced_districts: number;
    district_balanced_observations: number;
    incomplete_district: string;
    paired_district_wilcoxon: {
      n_districts: number;
      mean_difference_mm_day: number;
      median_difference_mm_day: number;
      wilcoxon_statistic: number;
      p_value: number;
    };
    omnibus_tests_28_states: {
      n_states: number;
      n_districts: number;
      welch_anova_f: number;
      welch_df1: number;
      welch_df2: number;
      welch_p_value: number;
      kruskal_h: number;
      kruskal_df: number;
      kruskal_p_value: number;
      pairwise_total: number;
      pairwise_welch_significant: number;
      pairwise_dunn_significant: number;
    };
    extreme_summary: {
      total_events_ge_100mm: number;
      events_gt_200mm: number;
      unique_states: number;
      unique_districts: number;
      unique_dates: number;
      max_event: {
        state: string;
        district: string;
        date: string;
        actual_mm: number;
        normal_mm: number;
      };
    };
  };
  state_summary: StateSummaryRow[];
  state_wilcoxon_holm: StateWilcoxonRow[];
  departure_reliability_state: Record<string, unknown>[];
  departure_reliability_district: Record<string, unknown>[];
  district_summary: DistrictSummaryRow[];
  nagapattinam_incomplete: Record<string, unknown>;
  nagapattinam_records: Record<string, unknown>[];
  district_daily_temporal: DistrictDailyTemporalRow[];
  extreme_events_all: ExtremeDistrictEventRow[];
  extreme_top_20: Top20ExtremeRow[];
  extreme_by_date: {
    Date: string;
    Extreme_Event_Count: number;
    Maximum_Rainfall: number;
    Affected_States: number;
    Affected_Districts: number;
  }[];
  extreme_by_state: {
    State: string;
    Extreme_Event_Count: number;
    Maximum_Rainfall: number;
    Mean_Extreme_Rainfall: number;
    District_Count: number;
  }[];
  extreme_geo_state: {
    State: string;
    Extreme_Observations: number;
    Unique_Districts: number;
    Mean_Extreme_Rainfall: number;
    Maximum_Rainfall: number;
    Minimum_Rainfall: number;
    Percentage_of_Extremes: number;
  }[];
  extreme_geo_district: {
    State: string;
    District: string;
    Extreme_Observations: number;
    Mean_Extreme_Rainfall: number;
    Maximum_Rainfall: number;
    First_Extreme_Date: string;
    Last_Extreme_Date: string;
  }[];
  pairwise_dunn_holm: PairwiseDunnRow[];
  pairwise_welch_holm: PairwiseWelchRow[];
}

export interface GeoFeatureCollection {
  type: 'FeatureCollection';
  features: {
    type: 'Feature';
    properties: Record<string, any>;
    geometry: {
      type: 'Polygon' | 'MultiPolygon';
      coordinates: any;
    };
  }[];
}

