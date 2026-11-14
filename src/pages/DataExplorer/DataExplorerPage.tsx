import { useMemo, useState } from 'react';
import { Download, ExternalLink, Filter, RotateCcw, Search } from 'lucide-react';
import { DOWNLOADABLE_CSV_CATALOG } from '../../data/catalog';
import type {
  AnnualStatRow,
  DistrictSummaryRow,
  ExtremeDistrictEventRow,
  HistoricalDataBundle,
  MonthlyClimatologyRow,
  PairwiseWelchRow,
  RegionalDataBundle,
  SeasonalYearRow,
  SpatialTrendSummaryRow,
  StateSummaryRow,
  StateWilcoxonRow,
  ZeroRainfallFlagRow,
} from '../../data/types';
import { downloadRowsAsCsv } from '../../utils/csvExport';
import { fmtInt, fmtNum, fmtPValue, fmtSigned } from '../../utils/formatters';
import { StatCallout } from '../../components/research/StatCallout';
import { ScientificDataTable, type TableColumn } from '../../components/tables/ScientificDataTable';

interface DataExplorerPageProps {
  historical: HistoricalDataBundle;
  regional: RegionalDataBundle;
}

type DatasetKey =
  | 'hist_annual'
  | 'hist_monthly'
  | 'hist_seasonal'
  | 'hist_spatial_summary'
  | 'hist_zero_flags'
  | 'reg_state_summary'
  | 'reg_district_summary'
  | 'reg_extreme_events'
  | 'reg_state_wilcoxon'
  | 'reg_pairwise_welch';

interface DatasetOption {
  key: DatasetKey;
  phase: 'Research 01 (2000–2025)' | 'Research 02 (Aug–Nov 2026)';
  label: string;
  metricLabel: string;
  metricUnit: string;
  filename: string;
  description: string;
}

const DATASET_OPTIONS: DatasetOption[] = [
  {
    key: 'hist_annual',
    phase: 'Research 01 (2000–2025)',
    label: 'Annual Rainfall Statistics (26 years)',
    metricLabel: 'Annual Rainfall',
    metricUnit: 'mm/yr',
    filename: 'explorer_historical_annual_2000_2025.csv',
    description: 'Area-weighted yearly rainfall totals, wet/rainy day counts, and departures over the 4,885-cell common footprint.',
  },
  {
    key: 'hist_monthly',
    phase: 'Research 01 (2000–2025)',
    label: 'Monthly Climatology (12 months)',
    metricLabel: 'Mean Monthly Rainfall',
    metricUnit: 'mm',
    filename: 'explorer_historical_monthly_climatology.csv',
    description: 'Climatological monthly mean, median, and inter-annual standard deviation averaged over 2000–2025.',
  },
  {
    key: 'hist_seasonal',
    phase: 'Research 01 (2000–2025)',
    label: 'Seasonal Totals by Year (26 years)',
    metricLabel: 'SW Monsoon Rainfall',
    metricUnit: 'mm',
    filename: 'explorer_historical_seasonal_totals.csv',
    description: 'Annual breakdown across IMD seasons: Winter, Pre-Monsoon, Southwest Monsoon, and Post-Monsoon.',
  },
  {
    key: 'hist_spatial_summary',
    phase: 'Research 01 (2000–2025)',
    label: '8-Index Spatial Trend Summary',
    metricLabel: 'FDR Increasing Cells',
    metricUnit: 'cells',
    filename: 'explorer_historical_8index_spatial_summary.csv',
    description: 'Grid-cell counts with Benjamini–Hochberg FDR < 0.05 trend detection across 4,885 cells for all 8 ETCCDI indices.',
  },
  {
    key: 'hist_zero_flags',
    phase: 'Research 01 (2000–2025)',
    label: 'Zero-Rainfall Anomaly Register (90 cells)',
    metricLabel: 'Zero-Rainfall Years',
    metricUnit: 'years',
    filename: 'explorer_zero_rainfall_flag_register.csv',
    description: 'Neighbourhood spatial audit of grid cells exhibiting entire calendar years with zero recorded rainfall.',
  },
  {
    key: 'reg_state_summary',
    phase: 'Research 02 (Aug–Nov 2026)',
    label: 'State & UT Summary (36 units)',
    metricLabel: 'Mean Daily Rainfall',
    metricUnit: 'mm/day',
    filename: 'explorer_regional_36_state_summary.csv',
    description: '36 States/UTs over 85 synchronized dates (19 Aug – 12 Nov 2026, missing 31 Oct) with variability and Wilcoxon fields.',
  },
  {
    key: 'reg_district_summary',
    phase: 'Research 02 (Aug–Nov 2026)',
    label: 'Balanced District Summary (727 districts)',
    metricLabel: 'Mean Daily Rainfall',
    metricUnit: 'mm/day',
    filename: 'explorer_regional_727_district_summary.csv',
    description: 'District-level actual vs normal metrics across 727 balanced districts (Nagapattinam excluded due to partial 36-day feed).',
  },
  {
    key: 'reg_extreme_events',
    phase: 'Research 02 (Aug–Nov 2026)',
    label: 'Extreme District-Day Events ≥100 mm (99 rows)',
    metricLabel: 'Daily Actual Rainfall',
    metricUnit: 'mm',
    filename: 'explorer_regional_99_extreme_events.csv',
    description: 'Every single-day district observation recording ≥ 100 mm across 76 districts in 20 States/UTs.',
  },
  {
    key: 'reg_state_wilcoxon',
    phase: 'Research 02 (Aug–Nov 2026)',
    label: 'State Paired Wilcoxon Holm (28 States)',
    metricLabel: 'Mean Diff (Act−Norm)',
    metricUnit: 'mm/day',
    filename: 'explorer_regional_state_wilcoxon_holm.csv',
    description: 'Within-state district-paired Wilcoxon signed-rank tests with family-wise Holm correction.',
  },
  {
    key: 'reg_pairwise_welch',
    phase: 'Research 02 (Aug–Nov 2026)',
    label: 'Pairwise Welch–Holm Matrix (378 pairs)',
    metricLabel: 'Mean Difference (A−B)',
    metricUnit: 'mm/day',
    filename: 'explorer_regional_pairwise_welch_holm.csv',
    description: 'All C(28, 2) = 378 post-hoc Welch comparisons between testable multi-district Indian states.',
  },
];

export function DataExplorerPage({ historical, regional }: DataExplorerPageProps) {
  const [selectedDataset, setSelectedDataset] = useState<DatasetKey>('hist_annual');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [startYear, setStartYear] = useState<number>(2000);
  const [endYear, setEndYear] = useState<number>(2025);
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [sigFilter, setSigFilter] = useState<'all' | 'sig' | 'nonsig'>('all');
  const [extremeOnly200, setExtremeOnly200] = useState<boolean>(false);
  const [flagFilter, setFlagFilter] = useState<'all' | 'anomaly' | 'clean'>('all');
  const [catalogPhaseFilter, setCatalogPhaseFilter] = useState<string>('ALL');

  const activeMeta = useMemo(
    () => DATASET_OPTIONS.find((d) => d.key === selectedDataset)!,
    [selectedDataset]
  );

  const allRegionalStates = useMemo(() => {
    return Array.from(new Set(regional.district_summary.map((d) => d.State))).sort();
  }, [regional.district_summary]);

  const resetFilters = () => {
    setSearchQuery('');
    setStartYear(2000);
    setEndYear(2025);
    setSelectedState('ALL');
    setSigFilter('all');
    setExtremeOnly200(false);
    setFlagFilter('all');
  };

  // Apply interactive filters dynamically depending on active dataset
  const { filteredRows, metricValues } = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = (row: object) => {
      if (!q) return true;
      return Object.values(row as Record<string, unknown>).some(
        (v) => v !== null && v !== undefined && String(v).toLowerCase().includes(q)
      );
    };

    if (selectedDataset === 'hist_annual') {
      const lo = Math.min(startYear, endYear);
      const hi = Math.max(startYear, endYear);
      const rows = historical.annual_statistics.filter(
        (r) => r.Year >= lo && r.Year <= hi && matchesSearch(r)
      );
      return {
        filteredRows: rows,
        metricValues: rows.map((r) => r.Annual_Rainfall_mm),
      };
    }

    if (selectedDataset === 'hist_monthly') {
      const rows = historical.monthly_climatology.filter((r) => matchesSearch(r));
      return {
        filteredRows: rows,
        metricValues: rows.map((r) => r.mean),
      };
    }

    if (selectedDataset === 'hist_seasonal') {
      const lo = Math.min(startYear, endYear);
      const hi = Math.max(startYear, endYear);
      const rows = historical.seasonal_totals_by_year.filter(
        (r) => r.Year >= lo && r.Year <= hi && matchesSearch(r)
      );
      return {
        filteredRows: rows,
        metricValues: rows.map((r) => r['Southwest Monsoon']),
      };
    }

    if (selectedDataset === 'hist_spatial_summary') {
      const rows = historical.spatial_trend_summary.filter((r) => matchesSearch(r));
      return {
        filteredRows: rows,
        metricValues: rows.map((r) => r.Increasing_FDR_05),
      };
    }

    if (selectedDataset === 'hist_zero_flags') {
      const rows = historical.zero_rainfall_flags.filter((r) => {
        if (flagFilter === 'anomaly' && !r.Potential_Anomaly) return false;
        if (flagFilter === 'clean' && r.Potential_Anomaly) return false;
        return matchesSearch(r);
      });
      return {
        filteredRows: rows,
        metricValues: rows.map((r) => r.Zero_Rainfall_Years),
      };
    }

    if (selectedDataset === 'reg_state_summary') {
      const rows = regional.state_summary.filter((r) => {
        if (selectedState !== 'ALL' && r.State !== selectedState) return false;
        if (sigFilter === 'sig' && !r.Significant) return false;
        if (sigFilter === 'nonsig' && r.Significant) return false;
        return matchesSearch(r);
      });
      return {
        filteredRows: rows,
        metricValues: rows.map((r) => r.Mean_Actual_Rainfall),
      };
    }

    if (selectedDataset === 'reg_district_summary') {
      const rows = regional.district_summary.filter((r) => {
        if (selectedState !== 'ALL' && r.State !== selectedState) return false;
        return matchesSearch(r);
      });
      return {
        filteredRows: rows,
        metricValues: rows.map((r) => r.Mean_Actual_Rainfall),
      };
    }

    if (selectedDataset === 'reg_extreme_events') {
      const rows = regional.extreme_events_all.filter((r) => {
        if (selectedState !== 'ALL' && r.State !== selectedState) return false;
        if (extremeOnly200 && r['Daily Actual'] <= 200) return false;
        return matchesSearch(r);
      });
      return {
        filteredRows: rows,
        metricValues: rows.map((r) => r['Daily Actual']),
      };
    }

    if (selectedDataset === 'reg_state_wilcoxon') {
      const rows = regional.state_wilcoxon_holm.filter((r) => {
        if (selectedState !== 'ALL' && r.State !== selectedState) return false;
        if (sigFilter === 'sig' && !r.Significant) return false;
        if (sigFilter === 'nonsig' && r.Significant) return false;
        return matchesSearch(r);
      });
      return {
        filteredRows: rows,
        metricValues: rows.map((r) => r.Mean_Difference),
      };
    }

    // reg_pairwise_welch
    const rows = regional.pairwise_welch_holm.filter((r) => {
      if (
        selectedState !== 'ALL' &&
        r.State_A !== selectedState &&
        r.State_B !== selectedState
      ) {
        return false;
      }
      if (sigFilter === 'sig' && !r.Significant) return false;
      if (sigFilter === 'nonsig' && r.Significant) return false;
      return matchesSearch(r);
    });
    return {
      filteredRows: rows,
      metricValues: rows.map((r) => r.Mean_Difference),
    };
  }, [
    selectedDataset,
    searchQuery,
    startYear,
    endYear,
    selectedState,
    sigFilter,
    extremeOnly200,
    flagFilter,
    historical,
    regional,
  ]);

  const subsetSummary = useMemo(() => {
    if (!metricValues.length) {
      return { count: 0, mean: null, min: null, max: null };
    }
    const sum = metricValues.reduce((acc, v) => acc + v, 0);
    return {
      count: metricValues.length,
      mean: sum / metricValues.length,
      min: Math.min(...metricValues),
      max: Math.max(...metricValues),
    };
  }, [metricValues]);

  const filteredCatalog = useMemo(() => {
    if (catalogPhaseFilter === 'ALL') return DOWNLOADABLE_CSV_CATALOG;
    return DOWNLOADABLE_CSV_CATALOG.filter((item) => item.researchPhase === catalogPhaseFilter);
  }, [catalogPhaseFilter]);

  const years = useMemo(() => Array.from({ length: 26 }, (_, i) => 2000 + i), []);

  const renderTable = () => {
    switch (selectedDataset) {
      case 'hist_annual': {
        const cols: TableColumn<AnnualStatRow>[] = [
          { key: 'Year', label: 'Year' },
          { key: 'Annual_Rainfall_mm', label: 'Annual (mm)', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'Mean_Daily_Rainfall_mm', label: 'Mean Daily', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'Maximum_Daily_Rainfall_mm', label: 'Max Daily', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'Wet_Days', label: 'Wet Days', align: 'right', render: (v) => fmtInt(Number(v)) },
          { key: 'Rainy_Days_2_5mm', label: 'Rainy ≥2.5mm', align: 'right', render: (v) => fmtInt(Number(v)) },
          { key: 'Deviation_Percentage', label: 'Dev %', align: 'right', render: (v) => `${fmtSigned(Number(v), 2)}%` },
        ];
        return (
          <ScientificDataTable
            title={activeMeta.label}
            subtitle={activeMeta.description}
            data={filteredRows as AnnualStatRow[]}
            columns={cols}
            defaultSortKey="Year"
            defaultSortDir="asc"
            pageSize={15}
            searchable={false}
            exportFilename={activeMeta.filename}
          />
        );
      }

      case 'hist_monthly': {
        const cols: TableColumn<MonthlyClimatologyRow>[] = [
          { key: 'Month', label: 'Month #' },
          { key: 'Month_Name', label: 'Month' },
          { key: 'mean', label: 'Mean (mm)', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'median', label: 'Median (mm)', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'std', label: 'Std Dev (mm)', align: 'right', render: (v) => fmtNum(Number(v), 2) },
        ];
        return (
          <ScientificDataTable
            title={activeMeta.label}
            subtitle={activeMeta.description}
            data={filteredRows as MonthlyClimatologyRow[]}
            columns={cols}
            defaultSortKey="Month"
            defaultSortDir="asc"
            pageSize={12}
            searchable={false}
            exportFilename={activeMeta.filename}
          />
        );
      }

      case 'hist_seasonal': {
        const cols: TableColumn<SeasonalYearRow>[] = [
          { key: 'Year', label: 'Year' },
          { key: 'Winter', label: 'Winter (mm)', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'Pre-Monsoon', label: 'Pre-Monsoon (mm)', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'Southwest Monsoon', label: 'SW Monsoon (mm)', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'Post-Monsoon', label: 'Post-Monsoon (mm)', align: 'right', render: (v) => fmtNum(Number(v), 2) },
        ];
        return (
          <ScientificDataTable
            title={activeMeta.label}
            subtitle={activeMeta.description}
            data={filteredRows as SeasonalYearRow[]}
            columns={cols}
            defaultSortKey="Year"
            defaultSortDir="asc"
            pageSize={15}
            searchable={false}
            exportFilename={activeMeta.filename}
          />
        );
      }

      case 'hist_spatial_summary': {
        const cols: TableColumn<SpatialTrendSummaryRow>[] = [
          { key: 'Index', label: 'Index' },
          { key: 'Total_Cells', label: 'Cells', align: 'right', render: (v) => fmtInt(Number(v)) },
          { key: 'Increasing_FDR_05', label: 'Increasing (FDR)', align: 'right', render: (v) => fmtInt(Number(v)) },
          { key: 'Decreasing_FDR_05', label: 'Decreasing (FDR)', align: 'right', render: (v) => fmtInt(Number(v)) },
          { key: 'Not_Significant', label: 'Not Sig.', align: 'right', render: (v) => fmtInt(Number(v)) },
          { key: 'Mean_Sen_Slope', label: 'Mean Sen Slope', align: 'right', render: (v) => fmtSigned(Number(v), 4) },
          { key: 'Median_Sen_Slope', label: 'Median Slope', align: 'right', render: (v) => fmtSigned(Number(v), 4) },
        ];
        return (
          <ScientificDataTable
            title={activeMeta.label}
            subtitle={activeMeta.description}
            data={filteredRows as SpatialTrendSummaryRow[]}
            columns={cols}
            defaultSortKey="Increasing_FDR_05"
            defaultSortDir="desc"
            pageSize={10}
            searchable={false}
            exportFilename={activeMeta.filename}
          />
        );
      }

      case 'hist_zero_flags': {
        const cols: TableColumn<ZeroRainfallFlagRow>[] = [
          { key: 'Latitude', label: 'Lat (°N)', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'Longitude', label: 'Lon (°E)', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'Zero_Rainfall_Years', label: 'Zero Years', align: 'right', render: (v) => fmtInt(Number(v)) },
          { key: 'Positive_Neighbour_Years', label: 'Pos. Neighbour Yrs', align: 'right', render: (v) => fmtInt(Number(v)) },
          { key: 'All_Neighbours_Zero_Years', label: 'All Neighb Zero', align: 'right', render: (v) => fmtInt(Number(v)) },
          { key: 'Potential_Anomaly', label: 'Potential Anomaly', render: (v) => (v ? 'Flagged' : 'No') },
          { key: 'Flag_Category', label: 'Flag Category' },
        ];
        return (
          <ScientificDataTable
            title={activeMeta.label}
            subtitle={activeMeta.description}
            data={filteredRows as ZeroRainfallFlagRow[]}
            columns={cols}
            defaultSortKey="Zero_Rainfall_Years"
            defaultSortDir="desc"
            pageSize={12}
            searchable={false}
            exportFilename={activeMeta.filename}
          />
        );
      }

      case 'reg_state_summary': {
        const cols: TableColumn<StateSummaryRow>[] = [
          { key: 'State', label: 'State / UT' },
          { key: 'Mean_Actual_Rainfall', label: 'Mean Actual', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'Mean_Normal_Rainfall', label: 'Mean Normal', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'Mean_Anomaly_mm', label: 'Anomaly', align: 'right', render: (v) => fmtSigned(Number(v), 2) },
          { key: 'CV_Percent', label: 'CV %', align: 'right', render: (v) => fmtNum(Number(v), 1) },
          { key: 'Extreme_Observations', label: 'Extremes ≥100mm', align: 'right', render: (v) => fmtInt(Number(v)) },
          { key: 'Rainfall_Status', label: 'Wilcoxon Status', render: (v) => (v ? String(v) : '—') },
        ];
        return (
          <ScientificDataTable
            title={activeMeta.label}
            subtitle={activeMeta.description}
            data={filteredRows as StateSummaryRow[]}
            columns={cols}
            defaultSortKey="Mean_Actual_Rainfall"
            defaultSortDir="desc"
            pageSize={12}
            searchable={false}
            exportFilename={activeMeta.filename}
          />
        );
      }

      case 'reg_district_summary': {
        const cols: TableColumn<DistrictSummaryRow>[] = [
          { key: 'District', label: 'District' },
          { key: 'State', label: 'State / UT' },
          { key: 'Mean_Actual_Rainfall', label: 'Mean (mm/d)', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'Mean_Normal_Rainfall', label: 'Normal (mm/d)', align: 'right', render: (v) => fmtNum(Number(v), 2) },
          { key: 'Rainfall_Difference', label: 'Diff (mm/d)', align: 'right', render: (v) => fmtSigned(Number(v), 2) },
          { key: 'Max_Daily_Rainfall', label: 'Max Day', align: 'right', render: (v) => fmtNum(Number(v), 1) },
          { key: 'CV_Percent', label: 'CV %', align: 'right', render: (v) => fmtNum(Number(v), 1) },
        ];
        return (
          <ScientificDataTable
            title={activeMeta.label}
            subtitle={activeMeta.description}
            data={filteredRows as DistrictSummaryRow[]}
            columns={cols}
            defaultSortKey="Mean_Actual_Rainfall"
            defaultSortDir="desc"
            pageSize={12}
            searchable={false}
            exportFilename={activeMeta.filename}
          />
        );
      }

      case 'reg_extreme_events': {
        const cols: TableColumn<ExtremeDistrictEventRow>[] = [
          { key: 'Date', label: 'Date' },
          { key: 'District', label: 'District' },
          { key: 'State', label: 'State / UT' },
          { key: 'Daily Actual', label: 'Actual (mm)', align: 'right', render: (v) => fmtNum(Number(v), 1) },
          { key: 'Daily Normal', label: 'Normal (mm)', align: 'right', render: (v) => fmtNum(Number(v), 1) },
          { key: 'Daily Category', label: 'Category' },
        ];
        return (
          <ScientificDataTable
            title={activeMeta.label}
            subtitle={activeMeta.description}
            data={filteredRows as ExtremeDistrictEventRow[]}
            columns={cols}
            defaultSortKey="Daily Actual"
            defaultSortDir="desc"
            pageSize={12}
            searchable={false}
            exportFilename={activeMeta.filename}
          />
        );
      }

      case 'reg_state_wilcoxon': {
        const cols: TableColumn<StateWilcoxonRow>[] = [
          { key: 'State', label: 'State / UT' },
          { key: 'District_Count', label: 'Districts', align: 'right', render: (v) => fmtInt(Number(v)) },
          { key: 'Mean_Difference', label: 'Mean Diff', align: 'right', render: (v) => fmtSigned(Number(v), 2) },
          { key: 'Wilcoxon_Statistic', label: 'W Stat', align: 'right', render: (v) => fmtNum(Number(v), 1) },
          { key: 'Raw_P_Value', label: 'Raw p', align: 'right', render: (v) => fmtPValue(Number(v)) },
          { key: 'Holm_Adjusted_P', label: 'Holm p', align: 'right', render: (v) => fmtPValue(Number(v)) },
          { key: 'Rainfall_Status', label: 'Classification' },
        ];
        return (
          <ScientificDataTable
            title={activeMeta.label}
            subtitle={activeMeta.description}
            data={filteredRows as StateWilcoxonRow[]}
            columns={cols}
            defaultSortKey="Holm_Adjusted_P"
            defaultSortDir="asc"
            pageSize={14}
            searchable={false}
            exportFilename={activeMeta.filename}
          />
        );
      }

      case 'reg_pairwise_welch': {
        const cols: TableColumn<PairwiseWelchRow>[] = [
          { key: 'State_A', label: 'State A' },
          { key: 'State_B', label: 'State B' },
          { key: 'Mean_Difference', label: 'Diff (A−B)', align: 'right', render: (v) => fmtSigned(Number(v), 3) },
          { key: 'T_Statistic', label: 'Welch t', align: 'right', render: (v) => fmtNum(Number(v), 3) },
          { key: 'Raw_P_Value', label: 'Raw p', align: 'right', render: (v) => fmtPValue(Number(v)) },
          { key: 'Holm_Adjusted_P', label: 'Holm p', align: 'right', render: (v) => fmtPValue(Number(v)) },
          { key: 'Significant', label: 'Significant', render: (v) => (v ? 'Yes' : 'No') },
        ];
        return (
          <ScientificDataTable
            title={activeMeta.label}
            subtitle={activeMeta.description}
            data={filteredRows as PairwiseWelchRow[]}
            columns={cols}
            defaultSortKey="Holm_Adjusted_P"
            defaultSortDir="asc"
            pageSize={12}
            searchable={false}
            exportFilename={activeMeta.filename}
          />
        );
      }
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] space-y-12 px-4 py-12 sm:px-6 lg:px-10">
      {/* Header */}
      <header className="border-b border-ink pb-8">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-rainblue">
          Open Scientific Data Workbench
        </div>
        <h1 className="mt-2 font-editorial text-4xl font-semibold text-ink sm:text-5xl">
          Interactive Data Explorer &amp; CSV Archive
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slateink">
          Query, slice, sort, and export the exact processed tables underlying both RainfallRisk India studies, or download raw notebook output CSVs directly for independent verification.
        </p>
      </header>

      {/* Dataset Selector & Interactive Controls */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Selector Panel */}
          <div className="lg:col-span-4 space-y-4 border border-hairline bg-parchment p-5">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink">
              1. Select Analytical Table
            </div>

            <div className="space-y-3">
              <div>
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-rainblue">
                  Research 01 · Historical (2000–2025)
                </div>
                <div className="space-y-1">
                  {DATASET_OPTIONS.filter((d) => d.phase === 'Research 01 (2000–2025)').map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setSelectedDataset(opt.key)}
                      className={`w-full border px-3 py-2 text-left font-mono text-xs transition ${
                        selectedDataset === opt.key
                          ? 'border-ink bg-ink text-ivory'
                          : 'border-hairline bg-ivory text-slateink hover:border-ink'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-monsoon">
                  Research 02 · Regional (Aug–Nov 2026)
                </div>
                <div className="space-y-1">
                  {DATASET_OPTIONS.filter((d) => d.phase === 'Research 02 (Aug–Nov 2026)').map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setSelectedDataset(opt.key)}
                      className={`w-full border px-3 py-2 text-left font-mono text-xs transition ${
                        selectedDataset === opt.key
                          ? 'border-ink bg-ink text-ivory'
                          : 'border-hairline bg-ivory text-slateink hover:border-ink'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Filter Workbench + Live Subset Metrics */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border border-hairline bg-parchment p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-ink">
                  <Filter className="h-3.5 w-3.5 text-rainblue" />
                  2. Filter Subset &amp; Compute Live Summary
                </div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 border border-hairline bg-ivory px-2.5 py-1 font-mono text-[11px] text-slateink hover:border-ink hover:text-ink"
                >
                  <RotateCcw className="h-3 w-3" /> Reset Filters
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Free-text search */}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-mutedink">
                    Keyword / Entity Match
                  </label>
                  <div className="relative mt-1">
                    <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-mutedink" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="District, state, index..."
                      className="w-full border border-hairline bg-ivory py-1.5 pl-8 pr-3 font-mono text-xs text-ink focus:border-ink focus:outline-none"
                    />
                  </div>
                </div>

                {/* Year Range for Historical Annual / Seasonal */}
                {(selectedDataset === 'hist_annual' || selectedDataset === 'hist_seasonal') && (
                  <>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-mutedink">
                        From Year
                      </label>
                      <select
                        value={startYear}
                        onChange={(e) => setStartYear(Number(e.target.value))}
                        className="mt-1 w-full border border-hairline bg-ivory px-3 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
                      >
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-mutedink">
                        To Year
                      </label>
                      <select
                        value={endYear}
                        onChange={(e) => setEndYear(Number(e.target.value))}
                        className="mt-1 w-full border border-hairline bg-ivory px-3 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
                      >
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* Flag Filter for Zero-Rainfall Register */}
                {selectedDataset === 'hist_zero_flags' && (
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-mutedink">
                      Anomaly Classification
                    </label>
                    <select
                      value={flagFilter}
                      onChange={(e) => setFlagFilter(e.target.value as 'all' | 'anomaly' | 'clean')}
                      className="mt-1 w-full border border-hairline bg-ivory px-3 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
                    >
                      <option value="all">All 90 Audited Cells</option>
                      <option value="anomaly">Potential Anomaly Only</option>
                      <option value="clean">Not Flagged as Anomaly</option>
                    </select>
                  </div>
                )}

                {/* State Filter for Regional Views */}
                {selectedDataset.startsWith('reg_') && (
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-mutedink">
                      Filter by State / UT
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="mt-1 w-full border border-hairline bg-ivory px-3 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
                    >
                      <option value="ALL">All States &amp; UTs</option>
                      {allRegionalStates.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Significance Filter */}
                {(selectedDataset === 'reg_state_summary' ||
                  selectedDataset === 'reg_state_wilcoxon' ||
                  selectedDataset === 'reg_pairwise_welch') && (
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-mutedink">
                      Holm Significance (α = 0.05)
                    </label>
                    <select
                      value={sigFilter}
                      onChange={(e) => setSigFilter(e.target.value as 'all' | 'sig' | 'nonsig')}
                      className="mt-1 w-full border border-hairline bg-ivory px-3 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
                    >
                      <option value="all">All Records</option>
                      <option value="sig">Significant Only</option>
                      <option value="nonsig">Not Significant</option>
                    </select>
                  </div>
                )}

                {/* Extreme >200mm Toggle */}
                {selectedDataset === 'reg_extreme_events' && (
                  <div className="flex items-end pb-1">
                    <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs text-ink">
                      <input
                        type="checkbox"
                        checked={extremeOnly200}
                        onChange={(e) => setExtremeOnly200(e.target.checked)}
                        className="h-4 w-4 accent-extreme"
                      />
                      Events &gt; 200 mm only ({regional.metadata.extreme_summary.events_gt_200mm})
                    </label>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-3">
                <div className="font-mono text-xs text-slateink">
                  Active Phase: <strong className="text-ink">{activeMeta.phase}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => downloadRowsAsCsv(filteredRows as unknown as Record<string, unknown>[], activeMeta.filename)}
                  disabled={!filteredRows.length}
                  className="inline-flex items-center gap-2 border border-ink bg-ink px-3.5 py-1.5 font-mono text-xs text-ivory transition hover:bg-rainblue disabled:opacity-40"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export Filtered Subset ({filteredRows.length} rows)
                </button>
              </div>
            </div>

            {/* Live Subset Summary Readouts */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCallout
                label="Filtered Records"
                value={fmtInt(subsetSummary.count)}
                unit="rows"
                note="Current table subset."
                tone="rain"
              />
              <StatCallout
                label={`Subset Mean (${activeMeta.metricLabel})`}
                value={subsetSummary.mean !== null ? fmtNum(subsetSummary.mean, 2) : '—'}
                unit={activeMeta.metricUnit}
                note="Unweighted mean of filtered rows."
              />
              <StatCallout
                label="Subset Minimum"
                value={subsetSummary.min !== null ? fmtNum(subsetSummary.min, 2) : '—'}
                unit={activeMeta.metricUnit}
                note="Minimum across current filter."
              />
              <StatCallout
                label="Subset Maximum"
                value={subsetSummary.max !== null ? fmtNum(subsetSummary.max, 2) : '—'}
                unit={activeMeta.metricUnit}
                note="Maximum across current filter."
                tone="extreme"
              />
            </div>

            {renderTable()}
          </div>
        </div>
      </section>

      {/* Complete Original Output CSV Download Catalog */}
      <section className="space-y-5 border-t border-ink pt-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-monsoon">
              Verbatim Notebook Artifacts
            </div>
            <h2 className="mt-1 font-editorial text-3xl font-semibold text-ink">
              Direct Research Output CSV Repository
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-slateink">
              Every link below serves the unmodified output files directly from <span className="font-mono text-ink">/outputs/</span> and <span className="font-mono text-ink">/outputs_project2/</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'Research 01 (2000–2025)', 'Research 02 (Aug–Nov 2026)'].map((phase) => (
              <button
                key={phase}
                type="button"
                onClick={() => setCatalogPhaseFilter(phase)}
                className={`border px-3 py-1 font-mono text-xs transition ${
                  catalogPhaseFilter === phase
                    ? 'border-ink bg-ink text-ivory'
                    : 'border-hairline bg-parchment text-slateink hover:border-ink'
                }`}
              >
                {phase === 'ALL' ? `All Files (${DOWNLOADABLE_CSV_CATALOG.length})` : phase}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredCatalog.map((item) => (
            <div
              key={item.path}
              className="flex flex-col justify-between gap-3 border border-hairline bg-parchment p-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-mutedink">
                  <span
                    className={
                      item.researchPhase.startsWith('Research 01')
                        ? 'text-rainblue font-semibold'
                        : 'text-monsoon font-semibold'
                    }
                  >
                    {item.researchPhase}
                  </span>
                  <span>{item.category}</span>
                </div>
                <h4 className="mt-1 font-editorial text-lg font-semibold text-ink">{item.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slateink">{item.description}</p>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-hairline pt-3">
                <span className="truncate font-mono text-[11px] text-mutedink" title={item.path}>
                  {item.path}
                </span>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={item.path}
                    download
                    className="inline-flex items-center gap-1.5 border border-ink bg-ink px-2.5 py-1 font-mono text-[11px] text-ivory transition hover:bg-rainblue"
                  >
                    <Download className="h-3 w-3" /> CSV
                  </a>
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 border border-hairline bg-ivory px-2 py-1 font-mono text-[11px] text-slateink hover:border-ink hover:text-ink"
                    aria-label={`Open ${item.title} in new tab`}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
