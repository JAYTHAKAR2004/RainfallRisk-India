import { useMemo, useState } from 'react';
import type {
  DistrictSummaryRow,
  ExtremeDistrictEventRow,
  PairwiseDunnRow,
  PairwiseWelchRow,
  RegionalDataBundle,
  StateSummaryRow,
  StateWilcoxonRow,
} from '../../data/types';
import { fmtInt, fmtNum, fmtPValue, fmtSigned } from '../../utils/formatters';
import type { LightboxAsset } from '../../components/layout/LightboxModal';
import { SectionSubnav } from '../../components/navigation/SectionSubnav';
import { FigureFrame } from '../../components/research/FigureFrame';
import { StatCallout } from '../../components/research/StatCallout';
import { HypothesisTestCard } from '../../components/research/HypothesisTestCard';
import { StateComparisonChart } from '../../components/charts/StateComparisonChart';
import { DistrictExtremesChart } from '../../components/charts/DistrictExtremesChart';
import { ScientificDataTable, type TableColumn } from '../../components/tables/ScientificDataTable';

interface RegionalAnalysisPageProps {
  regional: RegionalDataBundle;
  onInspectImage: (asset: LightboxAsset) => void;
}

const SUBSECTIONS = [
  { id: 'r-overview', label: 'Panel Design & Overview' },
  { id: 'r-d1-state', label: 'D1 · State-wise Analysis' },
  { id: 'r-d1-departure', label: 'Departure Instability' },
  { id: 'r-d2-district', label: 'D2 · District Analysis' },
  { id: 'r-d2-extremes', label: 'Extreme Events (≥100 mm)' },
  { id: 'r-d3-omnibus', label: 'D3 · Omnibus & Paired Tests' },
  { id: 'r-d3-pairwise', label: '378-Pair State Matrix' },
];

export function RegionalAnalysisPage({
  regional,
  onInspectImage,
}: RegionalAnalysisPageProps) {
  const [districtStateFilter, setDistrictStateFilter] = useState<string>('ALL');
  const [extremeStateFilter, setExtremeStateFilter] = useState<string>('ALL');
  const [pairwiseMethod, setPairwiseMethod] = useState<'welch' | 'dunn'>('welch');
  const [pairwiseSigFilter, setPairwiseSigFilter] = useState<'all' | 'sig' | 'nonsig'>('all');
  const [pairwiseStateFilter, setPairwiseStateFilter] = useState<string>('ALL');
  const [wilcoxonFigureMode, setWilcoxonFigureMode] = useState<'corrected' | 'uncorrected'>('corrected');

  const meta = regional.metadata;
  const omnibus = meta.omnibus_tests_28_states;
  const pairedOverall = meta.paired_district_wilcoxon;
  const extMeta = meta.extreme_summary;
  const nag = regional.nagapattinam_incomplete as Record<string, string | number>;

  const highestMeanState = useMemo(() => {
    return [...regional.state_summary].sort(
      (a, b) => b.Mean_Actual_Rainfall - a.Mean_Actual_Rainfall
    )[0];
  }, [regional.state_summary]);

  const lowestMeanState = useMemo(() => {
    return [...regional.state_summary].sort(
      (a, b) => a.Mean_Actual_Rainfall - b.Mean_Actual_Rainfall
    )[0];
  }, [regional.state_summary]);

  const highestMeanDistrict = useMemo(() => {
    return [...regional.district_summary].sort(
      (a, b) => b.Mean_Actual_Rainfall - a.Mean_Actual_Rainfall
    )[0];
  }, [regional.district_summary]);

  const allDistrictStates = useMemo(() => {
    return Array.from(new Set(regional.district_summary.map((d) => d.State))).sort();
  }, [regional.district_summary]);

  const allExtremeStates = useMemo(() => {
    return Array.from(new Set(regional.extreme_events_all.map((e) => e.State))).sort();
  }, [regional.extreme_events_all]);

  const allTestStates = useMemo(() => {
    return Array.from(new Set(regional.state_wilcoxon_holm.map((s) => s.State))).sort();
  }, [regional.state_wilcoxon_holm]);

  const filteredDistricts = useMemo(() => {
    if (districtStateFilter === 'ALL') return regional.district_summary;
    return regional.district_summary.filter((d) => d.State === districtStateFilter);
  }, [regional.district_summary, districtStateFilter]);

  const filteredExtremes = useMemo(() => {
    if (extremeStateFilter === 'ALL') return regional.extreme_events_all;
    return regional.extreme_events_all.filter((e) => e.State === extremeStateFilter);
  }, [regional.extreme_events_all, extremeStateFilter]);

  const filteredWelchPairs = useMemo(() => {
    return regional.pairwise_welch_holm.filter((row) => {
      if (pairwiseSigFilter === 'sig' && !row.Significant) return false;
      if (pairwiseSigFilter === 'nonsig' && row.Significant) return false;
      if (
        pairwiseStateFilter !== 'ALL' &&
        row.State_A !== pairwiseStateFilter &&
        row.State_B !== pairwiseStateFilter
      ) {
        return false;
      }
      return true;
    });
  }, [regional.pairwise_welch_holm, pairwiseSigFilter, pairwiseStateFilter]);

  const filteredDunnPairs = useMemo(() => {
    return regional.pairwise_dunn_holm.filter((row) => {
      if (pairwiseSigFilter === 'sig' && !row.Significant) return false;
      if (pairwiseSigFilter === 'nonsig' && row.Significant) return false;
      if (
        pairwiseStateFilter !== 'ALL' &&
        row.State_A !== pairwiseStateFilter &&
        row.State_B !== pairwiseStateFilter
      ) {
        return false;
      }
      return true;
    });
  }, [regional.pairwise_dunn_holm, pairwiseSigFilter, pairwiseStateFilter]);

  const wilcoxonCounts = useMemo(() => {
    const sig = regional.state_wilcoxon_holm.filter((r) => r.Significant);
    const below = sig.filter((r) => r.Mean_Difference < 0).length;
    const above = sig.filter((r) => r.Mean_Difference > 0).length;
    return { total: regional.state_wilcoxon_holm.length, sigCount: sig.length, below, above };
  }, [regional.state_wilcoxon_holm]);

  const stateColumns: TableColumn<StateSummaryRow>[] = [
    { key: 'State', label: 'State / UT' },
    {
      key: 'Mean_Actual_Rainfall',
      label: 'Mean Actual',
      align: 'right',
      render: (v) => fmtNum(Number(v), 2),
    },
    {
      key: 'Mean_Normal_Rainfall',
      label: 'Mean Normal',
      align: 'right',
      render: (v) => fmtNum(Number(v), 2),
    },
    {
      key: 'Mean_Anomaly_mm',
      label: 'Anomaly (mm/d)',
      align: 'right',
      render: (v) => fmtSigned(Number(v), 2),
    },
    {
      key: 'Total_Observed_Rainfall',
      label: 'Total (mm)',
      align: 'right',
      render: (v) => fmtNum(Number(v), 1),
    },
    {
      key: 'CV_Percent',
      label: 'CV (%)',
      align: 'right',
      render: (v) => fmtNum(Number(v), 1),
    },
    {
      key: 'Rainy_Day_Percent',
      label: 'Rainy Days %',
      align: 'right',
      render: (v) => `${fmtNum(Number(v), 1)}%`,
    },
    {
      key: 'Extreme_Observations',
      label: 'District ≥100mm',
      align: 'right',
      render: (v) => fmtInt(Number(v)),
    },
  ];

  const districtColumns: TableColumn<DistrictSummaryRow>[] = [
    { key: 'District', label: 'District' },
    { key: 'State', label: 'State / UT' },
    {
      key: 'Mean_Actual_Rainfall',
      label: 'Mean (mm/d)',
      align: 'right',
      render: (v) => fmtNum(Number(v), 2),
    },
    {
      key: 'Mean_Normal_Rainfall',
      label: 'Normal (mm/d)',
      align: 'right',
      render: (v) => fmtNum(Number(v), 2),
    },
    {
      key: 'Rainfall_Difference',
      label: 'Diff (mm/d)',
      align: 'right',
      render: (v) => fmtSigned(Number(v), 2),
    },
    {
      key: 'Max_Daily_Rainfall',
      label: 'Max Day (mm)',
      align: 'right',
      render: (v) => fmtNum(Number(v), 1),
    },
    {
      key: 'Total_Observed_Rainfall',
      label: 'Total (mm)',
      align: 'right',
      render: (v) => fmtNum(Number(v), 1),
    },
    {
      key: 'CV_Percent',
      label: 'CV (%)',
      align: 'right',
      render: (v) => fmtNum(Number(v), 1),
    },
    {
      key: 'Rainy_Days_2_5mm',
      label: 'Rainy Days',
      align: 'right',
      render: (v) => fmtInt(Number(v)),
    },
  ];

  const extremeColumns: TableColumn<ExtremeDistrictEventRow>[] = [
    { key: 'Date', label: 'Date' },
    { key: 'District', label: 'District' },
    { key: 'State', label: 'State / UT' },
    {
      key: 'Daily Actual',
      label: 'Daily Actual (mm)',
      align: 'right',
      render: (v) => fmtNum(Number(v), 1),
    },
    {
      key: 'Daily Normal',
      label: 'Daily Normal (mm)',
      align: 'right',
      render: (v) => fmtNum(Number(v), 1),
    },
    {
      key: 'Daily Departure Per',
      label: 'Reported Dep (%)',
      align: 'right',
      render: (v) => `${fmtSigned(Number(v), 0)}%`,
    },
    { key: 'Daily Category', label: 'IMD Category' },
  ];

  const stateWilcoxonColumns: TableColumn<StateWilcoxonRow>[] = [
    { key: 'State', label: 'State / UT' },
    {
      key: 'District_Count',
      label: 'Districts',
      align: 'right',
      render: (v) => fmtInt(Number(v)),
    },
    {
      key: 'Mean_Difference',
      label: 'Mean Diff (mm/d)',
      align: 'right',
      render: (v) => fmtSigned(Number(v), 2),
    },
    {
      key: 'Median_Difference',
      label: 'Median Diff',
      align: 'right',
      render: (v) => fmtSigned(Number(v), 2),
    },
    {
      key: 'Wilcoxon_Statistic',
      label: 'W Statistic',
      align: 'right',
      render: (v) => fmtNum(Number(v), 1),
    },
    {
      key: 'Raw_P_Value',
      label: 'Raw p-value',
      align: 'right',
      render: (v) => fmtPValue(Number(v)),
    },
    {
      key: 'Holm_Adjusted_P',
      label: 'Holm Adj. p',
      align: 'right',
      render: (v) => fmtPValue(Number(v)),
    },
    {
      key: 'Significant',
      label: 'Holm Sig.',
      render: (v) => (v ? 'Significant' : 'Not sig.'),
    },
    { key: 'Rainfall_Status', label: 'Interpretation' },
  ];

  const welchPairColumns: TableColumn<PairwiseWelchRow>[] = [
    { key: 'State_A', label: 'State A' },
    { key: 'State_B', label: 'State B' },
    {
      key: 'Mean_Difference',
      label: 'Mean Diff (A−B)',
      align: 'right',
      render: (v) => fmtSigned(Number(v), 3),
    },
    {
      key: 'T_Statistic',
      label: 'Welch t',
      align: 'right',
      render: (v) => fmtNum(Number(v), 3),
    },
    {
      key: 'CI_Lower',
      label: '95% CI Low',
      align: 'right',
      render: (v) => fmtNum(Number(v), 2),
    },
    {
      key: 'CI_Upper',
      label: '95% CI High',
      align: 'right',
      render: (v) => fmtNum(Number(v), 2),
    },
    {
      key: 'Raw_P_Value',
      label: 'Raw p',
      align: 'right',
      render: (v) => fmtPValue(Number(v)),
    },
    {
      key: 'Holm_Adjusted_P',
      label: 'Holm Adj. p',
      align: 'right',
      render: (v) => fmtPValue(Number(v)),
    },
    {
      key: 'Significant',
      label: 'Decision',
      render: (v) => (v ? 'Significant' : 'Not sig.'),
    },
  ];

  const dunnPairColumns: TableColumn<PairwiseDunnRow>[] = [
    { key: 'State_A', label: 'State A' },
    { key: 'State_B', label: 'State B' },
    {
      key: 'Mean_Rank_Difference',
      label: 'Mean Rank Diff',
      align: 'right',
      render: (v) => fmtSigned(Number(v), 2),
    },
    {
      key: 'Z_Statistic',
      label: 'Dunn z',
      align: 'right',
      render: (v) => fmtNum(Number(v), 3),
    },
    {
      key: 'Raw_P_Value',
      label: 'Raw p',
      align: 'right',
      render: (v) => fmtPValue(Number(v)),
    },
    {
      key: 'Holm_Adjusted_P',
      label: 'Holm Adj. p',
      align: 'right',
      render: (v) => fmtPValue(Number(v)),
    },
    {
      key: 'Significant',
      label: 'Decision',
      render: (v) => (v ? 'Significant' : 'Not sig.'),
    },
  ];

  return (
    <div>
      <SectionSubnav title="RESEARCH 02 SECTIONS" sections={SUBSECTIONS} />

      <div className="mx-auto max-w-[1400px] space-y-16 px-4 py-12 sm:px-6 lg:px-10">
        {/* Overview Banner */}
        <section id="r-overview" className="scroll-mt-24">
          <div className="border-b border-ink pb-8">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-monsoon">
              Research Track 02 · State &amp; District Analysis (Late Monsoon – Post-Monsoon Transition)
            </div>
            <h1 className="mt-2 font-editorial text-4xl font-semibold text-ink sm:text-5xl">
              Regional Sub-National Disparities &amp; Hypothesis Testing
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slateink">
              Following the 26-year historical baseline, Research 02 evaluates fine-grained administrative rainfall bulletins from the India Meteorological Department (IMD) between <strong className="text-ink">19 August and 12 November 2026</strong>. The pipeline enforces balanced temporal panel audits, isolates incomplete records, critiques percentage-departure math near zero normals, and conducts formal parametric and non-parametric multi-state inference.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCallout
                label="State-Level Panel"
                value={fmtInt(meta.state_units)}
                unit="States/UTs"
                note={`${fmtInt(meta.state_total_observations)} balanced observations across ${meta.reporting_dates_per_unit} reporting dates (missing ${meta.missing_date}).`}
                tone="monsoon"
              />
              <StatCallout
                label="Balanced District Panel"
                value={fmtInt(meta.balanced_districts)}
                unit="districts"
                note={`${fmtInt(meta.district_balanced_observations)} complete district-day rows; excludes incomplete ${nag.District ?? 'Nagapattinam'} (${nag.Observation_Count ?? 36} rows).`}
                tone="rain"
              />
              <StatCallout
                label="Extreme District-Days"
                value={fmtInt(extMeta.total_events_ge_100mm)}
                unit="events ≥ 100 mm"
                note={`Across ${extMeta.unique_districts} unique districts in ${extMeta.unique_states} States/UTs over ${extMeta.unique_dates} dates; ${extMeta.events_gt_200mm} events exceed 200 mm.`}
                tone="extreme"
              />
              <StatCallout
                label="Paired District Deficit"
                value={fmtSigned(pairedOverall.mean_difference_mm_day, 2)}
                unit="mm/day"
                note={`Overall actual minus normal mean across ${meta.balanced_districts} districts (Wilcoxon W = ${fmtNum(pairedOverall.wilcoxon_statistic, 1)}, p = ${fmtPValue(pairedOverall.p_value)}).`}
              />
            </div>
          </div>
        </section>

        {/* D1: State-wise Analysis */}
        <section id="r-d1-state" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col justify-between gap-4 border-b border-hairline pb-4 md:flex-row md:items-end">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-monsoon">
                D1 · Macro-Administrative Scale (36 Units)
              </div>
              <h2 className="mt-1 font-editorial text-3xl font-semibold text-ink">
                State &amp; Union Territory Rainfall Profiles
              </h2>
            </div>
            <div className="font-mono text-xs text-mutedink">
              85 common dates · 2026-08-19 to 2026-11-12 (missing {meta.missing_date})
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-4">
              <div className="border border-hairline bg-parchment p-5 space-y-3 text-sm leading-relaxed text-slateink">
                <p>
                  Across the {meta.state_units} reporting States and Union Territories, daily rainfall ranged dramatically between humid tropical island / coastal regimes and arid trans-Himalayan zones.
                </p>
                {highestMeanState && (
                  <p>
                    <strong className="text-ink">{highestMeanState.State}</strong> recorded the highest mean daily rainfall at{' '}
                    <span className="font-mono font-semibold text-rainblue">
                      {fmtNum(highestMeanState.Mean_Actual_Rainfall, 2)} mm/day
                    </span>{' '}
                    ({fmtNum(highestMeanState.Total_Observed_Rainfall, 1)} mm cumulative over 85 dates).
                  </p>
                )}
                {lowestMeanState && (
                  <p>
                    <strong className="text-ink">{lowestMeanState.State}</strong> recorded the lowest mean rainfall at{' '}
                    <span className="font-mono font-semibold text-ink">
                      {fmtNum(lowestMeanState.Mean_Actual_Rainfall, 2)} mm/day
                    </span>{' '}
                    and the highest relative dispersion (<span className="font-mono">CV = {fmtNum(lowestMeanState.CV_Percent, 2)}%</span>).
                  </p>
                )}
              </div>

              <div className="border-l-2 border-monsoon bg-parchment p-4 text-xs leading-relaxed text-slateink">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-monsoon">
                  Missing Date Audit
                </div>
                <p className="mt-1">
                  All 36 state series and 727 balanced district series share exactly 85 synchronized reporting dates. No bulletin was available for <span className="font-mono text-ink">{meta.missing_date}</span>, so panel means reflect the 85 observed days rather than interpolated infill.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <FigureFrame
                figureNumber="FIG 2.1"
                title="State & UT Actual vs. Normal Rainfall, Anomalies & Relative Variability"
                subtitle="36 reporting units · Interactive view switcher"
                caption="Switch between Mean Actual vs. Normal rainfall (mm/day), Mean Anomaly (Actual minus Normal in mm/day), and Coefficient of Variation (%). Notice how high-mean island/coastal states contrast with extreme relative variability in arid states."
                sourceLabel="outputs_project2/tables/statewise_rainfall_summary_final.csv"
                accent="teal"
              >
                <StateComparisonChart states={regional.state_summary} />
              </FigureFrame>
            </div>
          </div>

          <ScientificDataTable
            title="Table D1.1 · Complete State & Union Territory Rainfall Summary (36 Units)"
            subtitle="Merged panel of 85 reporting dates (3,060 observations) with variability metrics and extreme district-day counts."
            data={regional.state_summary}
            columns={stateColumns}
            defaultSortKey="Mean_Actual_Rainfall"
            defaultSortDir="desc"
            pageSize={12}
            exportFilename="rainfallrisk_36_state_summary.csv"
          />
        </section>

        {/* D1 Methodological Diagnostic: Percentage Departure Instability */}
        <section id="r-d1-departure" className="scroll-mt-24 space-y-6">
          <div className="border-b border-hairline pb-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-extreme">
              Methodological Diagnostic · Denominator Instability
            </div>
            <h2 className="mt-1 font-editorial text-3xl font-semibold text-ink">
              Why Reported Percentage Departure Breaks Near Zero Normal
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slateink">
              Conventional meteorological summaries often rank regions using percentage departure from normal: <span className="font-mono text-ink">100 × (Actual − Normal) / Normal</span>. As normal daily rainfall approaches zero during the post-monsoon dry transition, minute rainfall events inflate percentage departures by orders of magnitude. Because of this structural instability, Research 02 conducts all formal hypothesis tests on absolute rainfall difference (<span className="font-mono text-ink">Actual − Normal</span> in mm/day).
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="border border-hairline bg-parchment p-5">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink">
                State-Level Normal-Class Diagnostic (3,060 Observations)
              </div>
              <p className="mt-1 text-xs text-mutedink">
                Source: <span className="font-mono">outputs_project2/tables/departure_reliability_summary.csv</span>
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-ink text-[10px] uppercase text-mutedink">
                      <th className="py-2 pr-3">Normal Class</th>
                      <th className="py-2 px-2 text-right">Obs</th>
                      <th className="py-2 px-2 text-right">Mean Norm</th>
                      <th className="py-2 px-2 text-right">Mean Act</th>
                      <th className="py-2 px-2 text-right">Mean Dep %</th>
                      <th className="py-2 pl-2 text-right">Max Dep %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {regional.departure_reliability_state.map((row, idx) => (
                      <tr key={idx} className={String(row.Normal_Class).includes('Zero') ? 'bg-extreme/10' : ''}>
                        <td className="py-2 pr-3 font-sans font-medium text-ink">
                          {String(row.Normal_Class)}
                        </td>
                        <td className="py-2 px-2 text-right tabular-nums">{fmtInt(Number(row.Observations))}</td>
                        <td className="py-2 px-2 text-right tabular-nums">{fmtNum(Number(row.Mean_Normal), 2)}</td>
                        <td className="py-2 px-2 text-right tabular-nums">{fmtNum(Number(row.Mean_Actual), 2)}</td>
                        <td className="py-2 px-2 text-right font-semibold tabular-nums text-extreme">
                          {fmtSigned(Number(row.Mean_Reported_Departure), 2)}%
                        </td>
                        <td className="py-2 pl-2 text-right tabular-nums">
                          {fmtNum(Number(row.Maximum_Reported_Departure), 0)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border border-hairline bg-parchment p-5">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink">
                District-Level Normal-Range Instability (61,795 Observations)
              </div>
              <p className="mt-1 text-xs text-mutedink">
                Source: <span className="font-mono">outputs_project2/tables/district_departure_reliability_by_normal_range.csv</span>
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-ink text-[10px] uppercase text-mutedink">
                      <th className="py-2 pr-3">Normal Range</th>
                      <th className="py-2 px-2 text-right">Obs</th>
                      <th className="py-2 px-2 text-right">Mean Dep %</th>
                      <th className="py-2 px-2 text-right">&gt; 500%</th>
                      <th className="py-2 pl-2 text-right">&gt; 1,000%</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {regional.departure_reliability_district.map((row, idx) => (
                      <tr key={idx} className={String(row.Normal_Rainfall_Range) === 'Zero' ? 'bg-extreme/10' : ''}>
                        <td className="py-2 pr-3 font-sans font-medium text-ink">
                          {String(row.Normal_Rainfall_Range)}
                        </td>
                        <td className="py-2 px-2 text-right tabular-nums">{fmtInt(Number(row.Observation_Count))}</td>
                        <td className="py-2 px-2 text-right font-semibold tabular-nums text-extreme">
                          {fmtSigned(Number(row.Mean_Reported_Departure), 2)}%
                        </td>
                        <td className="py-2 px-2 text-right tabular-nums">{fmtInt(Number(row.Extreme_Above_500))}</td>
                        <td className="py-2 pl-2 text-right tabular-nums">{fmtInt(Number(row.Extreme_Above_1000))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* D2: District-wise Analysis */}
        <section id="r-d2-district" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col justify-between gap-4 border-b border-hairline pb-4 md:flex-row md:items-end">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rainblue">
                D2 · Meso-Scale Panel Audit (727 Balanced Districts)
              </div>
              <h2 className="mt-1 font-editorial text-3xl font-semibold text-ink">
                District-Level Variability &amp; Data Completeness Isolation
              </h2>
            </div>
            <div className="font-mono text-xs text-mutedink">
              61,795 balanced records + 36 excluded incomplete records
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-4">
              {highestMeanDistrict && (
                <div className="border border-hairline bg-parchment p-5">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-rainblue">
                    Wettest Balanced District
                  </div>
                  <div className="mt-1 font-editorial text-2xl font-semibold text-ink">
                    {highestMeanDistrict.District}
                  </div>
                  <div className="font-mono text-xs text-mutedink">{highestMeanDistrict.State}</div>
                  <div className="mt-3 grid grid-cols-2 gap-3 border-t border-hairline pt-3 font-mono text-xs">
                    <div>
                      <span className="text-mutedink">Mean Daily:</span>{' '}
                      <strong className="text-rainblue">{fmtNum(highestMeanDistrict.Mean_Actual_Rainfall, 2)} mm</strong>
                    </div>
                    <div>
                      <span className="text-mutedink">Total:</span>{' '}
                      <strong className="text-ink">{fmtNum(highestMeanDistrict.Total_Observed_Rainfall, 1)} mm</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Explicit Nagapattinam Isolation Callout */}
              <div className="border border-extreme/50 bg-parchment p-5">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-extreme">
                  Panel Exclusion · Incomplete District Record
                </div>
                <h4 className="mt-1 font-editorial text-xl font-semibold text-ink">
                  {String(nag.District ?? 'NAGAPATTINAM')} ({String(nag.State ?? 'TAMIL NADU')})
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slateink">
                  Instead of silently imputing missing dates or mixing unequal time spans, Nagapattinam&apos;s partial feed was segregated prior to balanced district modeling.
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-hairline pt-3 font-mono text-[11px]">
                  <div>
                    <dt className="text-mutedink">Available Dates</dt>
                    <dd className="font-semibold text-ink">{fmtInt(Number(nag.Observation_Count ?? 36))} of 85</dd>
                  </div>
                  <div>
                    <dt className="text-mutedink">Observed Window</dt>
                    <dd className="font-semibold text-ink">{String(nag.First_Date ?? '—')} → {String(nag.Last_Date ?? '—')}</dd>
                  </div>
                  <div>
                    <dt className="text-mutedink">Mean Daily Actual</dt>
                    <dd className="font-semibold text-ink">{fmtNum(Number(nag.Mean_Actual_Rainfall), 2)} mm</dd>
                  </div>
                  <div>
                    <dt className="text-mutedink">Max Daily Recorded</dt>
                    <dd className="font-semibold text-ink">{fmtNum(Number(nag.Max_Daily_Rainfall), 1)} mm</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="lg:col-span-8">
              <FigureFrame
                figureNumber="FIG 2.2"
                title="District Heterogeneity, Daily Synchronized Progression & State Extreme Burden"
                subtitle="727 balanced districts × 85 dates"
                caption="Switch views between the Mean vs. Standard Deviation scatter across 727 districts, the all-India 85-day synchronized daily rainfall envelope, and extreme event counts by State/UT."
                sourceLabel="outputs_project2/tables/districtwise_rainfall_summary.csv & districtwise_daily_temporal_summary.csv"
                accent="blue"
              >
                <DistrictExtremesChart
                  districts={regional.district_summary}
                  dailyTemporal={regional.district_daily_temporal}
                  extremeGeoState={regional.extreme_geo_state}
                />
              </FigureFrame>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border border-hairline bg-parchment px-4 py-3">
              <div className="flex flex-wrap items-center gap-3">
                <label
                  htmlFor="district-state-filter"
                  className="font-mono text-[11px] font-semibold uppercase tracking-wider text-mutedink"
                >
                  Filter 727 Districts by State / UT
                </label>
                <select
                  id="district-state-filter"
                  value={districtStateFilter}
                  onChange={(e) => setDistrictStateFilter(e.target.value)}
                  className="border border-hairline bg-ivory px-3 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
                >
                  <option value="ALL">All States &amp; UTs ({regional.district_summary.length} districts)</option>
                  {allDistrictStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
              <span className="font-mono text-xs text-slateink">
                Showing <strong className="text-ink">{filteredDistricts.length}</strong> balanced districts
              </span>
            </div>

            <ScientificDataTable
              title="Table D2.1 · Balanced District Rainfall Summary"
              subtitle="85 reporting dates per district (19 Aug – 12 Nov 2026); Diff = Mean Actual − Mean Normal (mm/day)."
              data={filteredDistricts}
              columns={districtColumns}
              defaultSortKey="Mean_Actual_Rainfall"
              defaultSortDir="desc"
              pageSize={12}
              exportFilename="rainfallrisk_district_summary_filtered.csv"
            />
          </div>
        </section>

        {/* D2 Extreme District-Day Events */}
        <section id="r-d2-extremes" className="scroll-mt-24 space-y-6">
          <div className="border-b border-hairline pb-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-extreme">
              D2 · Extreme Precipitation Tails (≥ 100 mm/day)
            </div>
            <h2 className="mt-1 font-editorial text-3xl font-semibold text-ink">
              {extMeta.total_events_ge_100mm} Extreme District-Day Events Across {extMeta.unique_districts} Districts
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slateink">
              Across 61,795 district-day observations, <strong className="text-ink">{extMeta.total_events_ge_100mm} events reached or exceeded 100 mm/day</strong> across <strong className="text-ink">{extMeta.unique_states} States/UTs</strong>, <strong className="text-ink">{extMeta.unique_districts} unique districts</strong>, and <strong className="text-ink">{extMeta.unique_dates} calendar dates</strong>. Eight episodes exceeded 200 mm in a single day, peaking at{' '}
              <strong className="text-extreme">
                {fmtNum(extMeta.max_event.actual_mm, 1)} mm
              </strong>{' '}
              in <strong className="text-ink">{extMeta.max_event.district}, {extMeta.max_event.state}</strong> on{' '}
              <span className="font-mono text-ink">{extMeta.max_event.date}</span> (normal: {fmtNum(extMeta.max_event.normal_mm, 1)} mm).
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FigureFrame
              figureNumber="FIG 2.3"
              title="Top 15 Extreme District Rainfall Episodes"
              subtitle="Research 02 static plate · Notebook output"
              caption="Ranking of the highest single-day district precipitation totals (≥ 100 mm) observed across the balanced Aug–Nov 2026 record, led by Nabarangapur, Odisha (231.9 mm)."
              sourceLabel="outputs_project2/figures/top15_district_extreme_rainfall.png"
              imageSrc="/outputs_project2/figures/top15_district_extreme_rainfall.png"
              onInspectImage={onInspectImage}
              accent="extreme"
            />
            <FigureFrame
              figureNumber="FIG 2.4"
              title="State-wise Concentration of Extreme Rainfall Events"
              subtitle="Research 02 static plate · Notebook output"
              caption="Distribution of extreme ≥ 100 mm district-day occurrences and peak observed magnitudes across the 20 affected States and Union Territories."
              sourceLabel="outputs_project2/figures/statewise_extreme_rainfall.png"
              imageSrc="/outputs_project2/figures/statewise_extreme_rainfall.png"
              onInspectImage={onInspectImage}
              accent="extreme"
            />
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border border-hairline bg-parchment px-4 py-3">
              <div className="flex flex-wrap items-center gap-3">
                <label
                  htmlFor="extreme-state-filter"
                  className="font-mono text-[11px] font-semibold uppercase tracking-wider text-mutedink"
                >
                  Filter Extreme Events by State
                </label>
                <select
                  id="extreme-state-filter"
                  value={extremeStateFilter}
                  onChange={(e) => setExtremeStateFilter(e.target.value)}
                  className="border border-hairline bg-ivory px-3 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
                >
                  <option value="ALL">All Affected States ({regional.extreme_events_all.length} events)</option>
                  {allExtremeStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
              <span className="font-mono text-xs text-slateink">
                Showing <strong className="text-ink">{filteredExtremes.length}</strong> district-day events ≥ 100 mm
              </span>
            </div>

            <ScientificDataTable
              title="Table D2.2 · Complete Register of District-Day Extreme Events (≥ 100 mm)"
              subtitle="Verified register of all 99 extreme district-day observations recorded during 19 Aug – 12 Nov 2026."
              data={filteredExtremes}
              columns={extremeColumns}
              defaultSortKey="Daily Actual"
              defaultSortDir="desc"
              pageSize={12}
              exportFilename="rainfallrisk_99_extreme_district_events.csv"
            />
          </div>
        </section>

        {/* D3: Statistical Hypothesis Investigation */}
        <section id="r-d3-omnibus" className="scroll-mt-24 space-y-6">
          <div className="border-b border-hairline pb-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rainblue">
              D3 · Formal Statistical Inference (28 Multi-District States · 709 Districts)
            </div>
            <h2 className="mt-1 font-editorial text-3xl font-semibold text-ink">
              Omnibus Inter-State Heterogeneity &amp; Actual-vs-Normal Wilcoxon Tests
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slateink">
              Formal multi-state inference spans the <strong className="text-ink">{omnibus.n_states} States/UTs</strong> containing multiple balanced districts (<strong className="text-ink">{omnibus.n_districts} districts</strong>), ensuring within-state variance estimation for Welch&apos;s heteroscedastic ANOVA and valid signed-rank power within states. Both parametric Welch and non-parametric Kruskal–Wallis tests strongly reject equal state mean/rank distributions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <HypothesisTestCard
              testName="Welch's Heteroscedastic ANOVA"
              scope={`${omnibus.n_states} States · ${omnibus.n_districts} Districts`}
              statisticLabel={`F(${omnibus.welch_df1}, ${fmtNum(omnibus.welch_df2, 2)})`}
              statisticValue={fmtNum(omnibus.welch_anova_f, 3)}
              pValue={fmtPValue(omnibus.welch_p_value)}
              decision="Reject H₀"
              significant={true}
              interpretation="Mean district rainfall differs strongly across the 28 states without assuming equal variance across states."
            />
            <HypothesisTestCard
              testName="Kruskal–Wallis Rank Test"
              scope={`${omnibus.n_states} States · Non-Parametric`}
              statisticLabel={`H (df = ${omnibus.kruskal_df})`}
              statisticValue={fmtNum(omnibus.kruskal_h, 3)}
              pValue={fmtPValue(omnibus.kruskal_p_value)}
              decision="Reject H₀"
              significant={true}
              interpretation="Non-parametric confirmation that state-level rainfall distributions do not share a common median/rank location."
            />
            <HypothesisTestCard
              testName="All-India Paired Wilcoxon Test"
              scope={`${pairedOverall.n_districts} Balanced Districts (Actual − Normal)`}
              statisticLabel="Wilcoxon W"
              statisticValue={fmtNum(pairedOverall.wilcoxon_statistic, 1)}
              pValue={fmtPValue(pairedOverall.p_value)}
              decision="Significant Deficit"
              significant={true}
              interpretation={`Paired differences average ${fmtSigned(pairedOverall.mean_difference_mm_day, 2)} mm/day (median ${fmtSigned(pairedOverall.median_difference_mm_day, 2)} mm/day) below normal.`}
            />
          </div>

          {/* State-wise Wilcoxon Plate + Toggle */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-4">
              <div className="border border-hairline bg-parchment p-5 space-y-3 text-sm leading-relaxed text-slateink">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-rainblue">
                  Multiple-Testing Correction Impact
                </div>
                <p>
                  After Holm–Bonferroni correction across all <strong className="text-ink">{wilcoxonCounts.total} testable states</strong>, exactly{' '}
                  <strong className="text-ink">{wilcoxonCounts.sigCount} states remain statistically significant</strong> (adjusted p &lt; 0.05):{' '}
                  <strong className="text-extreme">{wilcoxonCounts.below} states significantly below normal</strong> and{' '}
                  <strong className="text-monsoon">{wilcoxonCounts.above} state significantly above normal</strong>{' '}
                  (<strong className="text-ink">Uttar Pradesh</strong>: +1.48 mm/day, Holm p = 7.50 × 10⁻⁶).
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setWilcoxonFigureMode('corrected')}
                    className={`border px-2.5 py-1 font-mono text-[11px] transition ${
                      wilcoxonFigureMode === 'corrected'
                        ? 'border-ink bg-ink text-ivory'
                        : 'border-hairline bg-ivory text-slateink hover:border-ink'
                    }`}
                  >
                    Holm-Corrected (Primary)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWilcoxonFigureMode('uncorrected')}
                    className={`border px-2.5 py-1 font-mono text-[11px] transition ${
                      wilcoxonFigureMode === 'uncorrected'
                        ? 'border-ink bg-ink text-ivory'
                        : 'border-hairline bg-ivory text-slateink hover:border-ink'
                    }`}
                  >
                    Uncorrected (Exploratory)
                  </button>
                </div>
              </div>

              <div className="border-l-2 border-extreme bg-parchment p-4 text-xs leading-relaxed text-slateink">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-extreme">
                  Statistical Caution · Non-Causation &amp; Spatial Dependence
                </div>
                <p className="mt-1">
                  1. <strong className="text-ink">Non-causation:</strong> Administrative borders do not cause meteorological differences; tests quantify observed geographical heterogeneity across latitude, orography, and monsoon withdrawal tracks.
                </p>
                <p className="mt-1.5">
                  2. <strong className="text-ink">Spatial dependence:</strong> Adjacent districts experience correlated synoptic storm systems, violating strict i.i.d. independence assumptions. Holm adjustment and non-parametric checks mitigate — but do not eliminate — effective sample-size inflation.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <FigureFrame
                figureNumber={wilcoxonFigureMode === 'corrected' ? 'FIG 2.5A' : 'FIG 2.5B'}
                title={
                  wilcoxonFigureMode === 'corrected'
                    ? 'State-wise Paired Wilcoxon Rainfall Difference (Holm-Bonferroni Corrected)'
                    : 'State-wise Paired Wilcoxon Rainfall Difference (Uncorrected Exploratory View)'
                }
                subtitle="28 multi-district States · Paired district Act − Norm"
                caption={
                  wilcoxonFigureMode === 'corrected'
                    ? 'Mean paired Actual − Normal rainfall difference across districts within each tested state, highlighting the 10 states surviving family-wise Holm correction.'
                    : 'Exploratory uncorrected Wilcoxon significance plot shown for side-by-side comparison with the stricter Holm-Bonferroni corrected result.'
                }
                sourceLabel={
                  wilcoxonFigureMode === 'corrected'
                    ? 'outputs_project2/figures/statewise_wilcoxon_rainfall_difference_corrected.png'
                    : 'outputs_project2/figures/statewise_wilcoxon_rainfall_difference.png'
                }
                imageSrc={
                  wilcoxonFigureMode === 'corrected'
                    ? '/outputs_project2/figures/statewise_wilcoxon_rainfall_difference_corrected.png'
                    : '/outputs_project2/figures/statewise_wilcoxon_rainfall_difference.png'
                }
                onInspectImage={onInspectImage}
                accent="blue"
              />
            </div>
          </div>

          <ScientificDataTable
            title="Table D3.1 · State-wise Paired Wilcoxon Signed-Rank Results (Holm-Corrected, 28 States)"
            subtitle="Within-state district-paired comparisons of Actual vs. Normal daily rainfall during 19 Aug – 12 Nov 2026."
            data={regional.state_wilcoxon_holm}
            columns={stateWilcoxonColumns}
            defaultSortKey="Holm_Adjusted_P"
            defaultSortDir="asc"
            pageSize={14}
            exportFilename="rainfallrisk_state_wilcoxon_holm_28states.csv"
          />
        </section>

        {/* D3: Pairwise State Matrix (378 pairs) */}
        <section id="r-d3-pairwise" className="scroll-mt-24 space-y-6">
          <div className="border-b border-hairline pb-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-monsoon">
              D3 · Post-Hoc Inter-State Contrasts ({omnibus.pairwise_total} Unique State Pairs)
            </div>
            <h2 className="mt-1 font-editorial text-3xl font-semibold text-ink">
              Pairwise Welch–Holm &amp; Dunn–Holm Contrast Explorer
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slateink">
              Every pair among the {omnibus.n_states} states (<span className="font-mono text-ink">C(28,2) = {omnibus.pairwise_total}</span> contrasts) is evaluated using both parametric Games–Howell/Welch t-tests and non-parametric Dunn rank tests with Holm correction. Parametric Welch–Holm identifies{' '}
              <strong className="text-ink">{omnibus.pairwise_welch_significant} / {omnibus.pairwise_total} significant pairs</strong>, whereas non-parametric Dunn–Holm identifies{' '}
              <strong className="text-ink">{omnibus.pairwise_dunn_significant} / {omnibus.pairwise_total} significant pairs</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border border-hairline bg-parchment p-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setPairwiseMethod('welch')}
                className={`border px-3 py-1.5 font-mono text-xs transition ${
                  pairwiseMethod === 'welch'
                    ? 'border-ink bg-ink text-ivory'
                    : 'border-hairline bg-ivory text-slateink hover:border-ink'
                }`}
              >
                Pairwise Welch–Holm ({omnibus.pairwise_welch_significant} sig)
              </button>
              <button
                type="button"
                onClick={() => setPairwiseMethod('dunn')}
                className={`border px-3 py-1.5 font-mono text-xs transition ${
                  pairwiseMethod === 'dunn'
                    ? 'border-ink bg-ink text-ivory'
                    : 'border-hairline bg-ivory text-slateink hover:border-ink'
                }`}
              >
                Pairwise Dunn–Holm ({omnibus.pairwise_dunn_significant} sig)
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={pairwiseSigFilter}
                onChange={(e) => setPairwiseSigFilter(e.target.value as 'all' | 'sig' | 'nonsig')}
                aria-label="Filter pairwise tests by Holm significance"
                className="border border-hairline bg-ivory px-3 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
              >
                <option value="all">All Pairs (378)</option>
                <option value="sig">Significant Only (Holm &lt; 0.05)</option>
                <option value="nonsig">Not Significant</option>
              </select>

              <select
                value={pairwiseStateFilter}
                onChange={(e) => setPairwiseStateFilter(e.target.value)}
                aria-label="Filter pairwise tests involving state"
                className="border border-hairline bg-ivory px-3 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
              >
                <option value="ALL">Any State (All 28)</option>
                {allTestStates.map((st) => (
                  <option key={st} value={st}>
                    Involving {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {pairwiseMethod === 'welch' ? (
            <ScientificDataTable
              title="Table D3.2 · Pairwise Welch t-Test Matrix with Holm Correction"
              subtitle={`Showing ${filteredWelchPairs.length} of ${regional.pairwise_welch_holm.length} inter-state comparisons.`}
              data={filteredWelchPairs}
              columns={welchPairColumns}
              defaultSortKey="Holm_Adjusted_P"
              defaultSortDir="asc"
              pageSize={12}
              exportFilename="rainfallrisk_pairwise_welch_holm_filtered.csv"
            />
          ) : (
            <ScientificDataTable
              title="Table D3.2 · Pairwise Dunn Rank-Sum Matrix with Holm Correction"
              subtitle={`Showing ${filteredDunnPairs.length} of ${regional.pairwise_dunn_holm.length} non-parametric state comparisons.`}
              data={filteredDunnPairs}
              columns={dunnPairColumns}
              defaultSortKey="Holm_Adjusted_P"
              defaultSortDir="asc"
              pageSize={12}
              exportFilename="rainfallrisk_pairwise_dunn_holm_filtered.csv"
            />
          )}
        </section>
      </div>
    </div>
  );
}

