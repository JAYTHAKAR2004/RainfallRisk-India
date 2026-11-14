import { ArrowRight, CheckCircle2, Eye, HelpCircle, ShieldAlert } from 'lucide-react';
import type { HistoricalDataBundle, PageRoute, RegionalDataBundle } from '../../data/types';
import { fmtInt, fmtNum, fmtPValue, fmtSigned } from '../../utils/formatters';

interface FindingsPageProps {
  historical: HistoricalDataBundle;
  regional: RegionalDataBundle;
  onNavigate: (route: PageRoute) => void;
}

export function FindingsPage({ historical, regional, onNavigate }: FindingsPageProps) {
  const histMeta = historical.metadata;
  const regMeta = regional.metadata;
  const friedman = historical.friedman_seasonal[0];
  const omnibus = regMeta.omnibus_tests_28_states;
  const paired = regMeta.paired_district_wilcoxon;
  const maxExt = regMeta.extreme_summary.max_event;

  const wettestYear = [...historical.annual_statistics].sort(
    (a, b) => b.Annual_Rainfall_mm - a.Annual_Rainfall_mm
  )[0];
  const driestYear = [...historical.annual_statistics].sort(
    (a, b) => a.Annual_Rainfall_mm - b.Annual_Rainfall_mm
  )[0];
  const swMonsoon = historical.seasonal_summary.find(
    (s) => s.Season === 'Southwest Monsoon'
  );
  const totalSpatialSigUp = historical.spatial_trend_summary.find(
    (r) => r.Index === 'PRCPTOT'
  );

  return (
    <div className="mx-auto max-w-[1400px] space-y-14 px-4 py-12 sm:px-6 lg:px-10">
      {/* Header & Central Thesis */}
      <header className="border-b border-ink pb-10">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-rainblue">
          Integrated Synthesis · Epistemic Audit
        </div>
        <h1 className="mt-2 font-editorial text-4xl font-semibold text-ink sm:text-5xl">
          Findings, Statistical Certainty &amp; Limitations
        </h1>

        <blockquote className="mt-6 border-l-4 border-rainblue bg-parchment px-6 py-5 font-editorial text-2xl italic leading-snug text-ink sm:text-[1.75rem]">
          &ldquo;The analysis indicates geographically heterogeneous rainfall behaviour rather than a uniform increase or decrease across India.&rdquo;
        </blockquote>

        <p className="mt-5 max-w-3xl text-base leading-relaxed text-slateink">
          Separating descriptive observations from formally tested statistical conclusions, unresolved physical questions, and explicit scope boundaries preserves analytical rigor across both the 26-year gridded record ({histMeta.study_period}) and the 85-date regional panel ({regMeta.study_period}).
        </p>
      </header>

      {/* Four Epistemic Pillars */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 1. What Is Observed */}
        <article className="border border-hairline border-t-2 border-t-rainblue bg-parchment p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-hairline pb-3">
            <Eye className="h-4 w-4 text-rainblue" />
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-rainblue">
                Category 01 · Empirical Record
              </div>
              <h2 className="font-editorial text-2xl font-semibold text-ink">
                What Is Observed
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-slateink">
            <div>
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
                Research 01 · Historical Gridded (2000–2025)
              </h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  Harmonized <strong className="text-ink">{histMeta.netcdf_files} annual NetCDF files</strong> spanning <strong className="text-ink">{fmtInt(histMeta.daily_observations)} consecutive days</strong> over a consistent <strong className="text-ink">{fmtInt(histMeta.common_footprint_cells)}-cell common footprint</strong> ({fmtNum(histMeta.common_footprint_coverage_pct, 2)}% of the {fmtInt(histMeta.total_grid_cells)}-cell grid).
                </li>
                <li>
                  Area-weighted annual rainfall averaged <strong className="text-ink">1,149.60 mm/year</strong> (SD 98.56 mm, CV 8.57%), spanning a range from <strong className="text-ink">{fmtNum(driestYear.Annual_Rainfall_mm, 2)} mm ({driestYear.Year})</strong> to <strong className="text-ink">{fmtNum(wettestYear.Annual_Rainfall_mm, 2)} mm ({wettestYear.Year})</strong>.
                </li>
                {swMonsoon && (
                  <li>
                    The Southwest Monsoon delivered <strong className="text-ink">{fmtNum(swMonsoon.Contribution_Percent, 2)}%</strong> ({fmtNum(swMonsoon.mean, 2)} mm) of annual precipitation.
                  </li>
                )}
              </ul>
            </div>

            <div className="border-t border-hairline pt-4">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
                Research 02 · State &amp; District Panel (Aug–Nov 2026)
              </h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  Observed <strong className="text-ink">{regMeta.state_units} States/UTs</strong> ({fmtInt(regMeta.state_total_observations)} records) and <strong className="text-ink">{fmtInt(regMeta.balanced_districts)} balanced districts</strong> ({fmtInt(regMeta.district_balanced_observations)} records) across {regMeta.reporting_dates_per_unit} synchronized dates (missing {regMeta.missing_date}).
                </li>
                <li>
                  Segregated {regMeta.incomplete_district} cleanly prior to inferential modeling.
                </li>
                <li>
                  Catalogued <strong className="text-ink">{regMeta.extreme_summary.total_events_ge_100mm} extreme district-day events ≥ 100 mm</strong> across {regMeta.extreme_summary.unique_districts} districts in {regMeta.extreme_summary.unique_states} States/UTs ({regMeta.extreme_summary.events_gt_200mm} exceeding 200 mm; peak <strong className="text-extreme">{fmtNum(maxExt.actual_mm, 1)} mm</strong> in {maxExt.district}, {maxExt.state} on {maxExt.date}).
                </li>
              </ul>
            </div>
          </div>
        </article>

        {/* 2. What Is Statistically Established */}
        <article className="border border-hairline border-t-2 border-t-monsoon bg-parchment p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-hairline pb-3">
            <CheckCircle2 className="h-4 w-4 text-monsoon" />
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-monsoon">
                Category 02 · Verified Inference
              </div>
              <h2 className="font-editorial text-2xl font-semibold text-ink">
                What Is Statistically Established
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-slateink">
            <div>
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
                Research 01 · Temporal &amp; Spatial Trends
              </h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  Inter-seasonal variance is highly structured: Friedman test confirms strong seasonal inequality (<span className="font-mono text-ink">χ² = {fmtNum(friedman.Chi_Square, 2)}, Kendall W = {fmtNum(friedman.Kendalls_W, 4)}, p = {fmtPValue(friedman.P_Value)}</span>).
                </li>
                <li>
                  Preliminary all-footprint annual slope yields <strong className="text-ink">Sen = {fmtSigned(histMeta.annual_preliminary_trend.sen_slope_mm_yr, 2)} mm/yr</strong> (Mann–Kendall p = {fmtPValue(histMeta.annual_preliminary_trend.mk_p_value)}), while cell-level FDR testing shows spatial patchwork rather than nationwide monotonicity
                  {totalSpatialSigUp
                    ? ` (for PRCPTOT, ${fmtInt(totalSpatialSigUp.Increasing_FDR_05)} cells increasing and ${fmtInt(totalSpatialSigUp.Decreasing_FDR_05)} decreasing at FDR < 0.05 out of ${fmtInt(totalSpatialSigUp.Total_Cells)}).`
                    : '.'}
                </li>
              </ul>
            </div>

            <div className="border-t border-hairline pt-4">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
                Research 02 · Multi-State &amp; Paired Hypotheses
              </h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  Both Welch&apos;s heteroscedastic ANOVA (<span className="font-mono text-ink">F = {fmtNum(omnibus.welch_anova_f, 2)}, p = {fmtPValue(omnibus.welch_p_value)}</span>) and Kruskal–Wallis (<span className="font-mono text-ink">H = {fmtNum(omnibus.kruskal_h, 2)}, p = {fmtPValue(omnibus.kruskal_p_value)}</span>) decisively establish inter-state differences across the {omnibus.n_states} tested states ({omnibus.pairwise_welch_significant}/{omnibus.pairwise_total} significant Welch–Holm pairs; {omnibus.pairwise_dunn_significant}/{omnibus.pairwise_total} significant Dunn–Holm pairs).
                </li>
                <li>
                  Paired district actual-minus-normal comparisons average <strong className="text-ink">{fmtSigned(paired.mean_difference_mm_day, 2)} mm/day</strong> (<span className="font-mono text-ink">W = {fmtNum(paired.wilcoxon_statistic, 1)}, p = {fmtPValue(paired.p_value)}</span>). Under Holm adjustment, <strong className="text-ink">10 of 28 states differ significantly from normal</strong> (9 Below Normal; 1 Above Normal: <strong className="text-monsoon">Uttar Pradesh at +1.48 mm/day</strong>, Holm p = 7.50 × 10⁻⁶).
                </li>
              </ul>
            </div>
          </div>
        </article>

        {/* 3. What Remains Uncertain */}
        <article className="border border-hairline border-t-2 border-t-ink bg-parchment p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-hairline pb-3">
            <HelpCircle className="h-4 w-4 text-ink" />
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-mutedink">
                Category 03 · Open Scientific Questions
              </div>
              <h2 className="font-editorial text-2xl font-semibold text-ink">
                What Remains Uncertain
              </h2>
            </div>
          </div>

          <ul className="list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-slateink">
            <li>
              <strong className="text-ink">26-Year Horizon vs. Multi-Decadal Oscillation:</strong> A 26-year span captures multi-year ENSO/IOD variability well but carries limited power to separate secular anthropogenic trends from ~30–60 year natural monsoon cycles in heavy tail indices (Rx1day, Rx5day, R20mm).
            </li>
            <li>
              <strong className="text-ink">Zero-Rainfall Cell Physical Attribution:</strong> Sensitivity analysis isolates <strong className="text-ink">90 cells</strong> with anomalous zero-rainfall years (comparing 4,885 vs. 4,795 cell scenarios). Distinguishing extreme hyper-aridity from localized rain-gauge missingness requires station metadata unavailable in gridded NetCDF summaries.
            </li>
            <li>
              <strong className="text-ink">Seasonal Window Transferability:</strong> Whether the specific Aug–Nov 2026 sub-national anomalies (e.g., positive anomaly in Uttar Pradesh vs. negative deficits across 9 southern/central states) reflect persistent shifts or single-season synoptic tracks cannot be inferred from an 85-day window alone.
            </li>
          </ul>
        </article>

        {/* 4. Study Limitations */}
        <article className="border border-hairline border-t-2 border-t-extreme bg-parchment p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-hairline pb-3">
            <ShieldAlert className="h-4 w-4 text-extreme" />
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-extreme">
                Category 04 · Methodological Boundaries
              </div>
              <h2 className="font-editorial text-2xl font-semibold text-ink">
                Study Limitations &amp; Proper Scope
              </h2>
            </div>
          </div>

          <ul className="list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-slateink">
            <li>
              <strong className="text-ink">Footprint Extent (28.05% of Bounding Matrix):</strong> The 4,885 common-footprint cells cover the active IMD gridded land domain ({fmtNum(histMeta.common_footprint_coverage_pct, 2)}% of the 17,415-cell lat-lon matrix), excluding 12,451 no-data cells and 79 intermittent edge cells.
            </li>
            <li>
              <strong className="text-ink">Spatial Autocorrelation &amp; Non-Causation:</strong> Contiguous districts experience coherent storm systems, inflating effective degrees of freedom in standard hypothesis tests. Administrative state tests characterize geographic variation without attributing causal physical effect to state boundaries.
            </li>
            <li>
              <strong className="text-ink">Percentage Departure Distortion:</strong> Small daily normals amplify percentage departures up to <strong className="text-extreme">+82,735%</strong> in zero-normal state classes; all formal tests deliberately rely on absolute differences in mm/day.
            </li>
            <li>
              <strong className="text-ink">Non-Operational Statistical Scope:</strong> RainfallRisk India is strictly an exploratory retrospective research platform. It does not perform hydrological routing, flood forecasting, or real-time operational weather prediction.
            </li>
          </ul>
        </article>
      </section>

      {/* Navigation Footer Actions */}
      <section className="flex flex-wrap items-center justify-between gap-4 border-t border-ink pt-8">
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-mutedink">
            Continue Exploring the Evidence
          </div>
          <p className="mt-1 text-sm text-slateink">
            Inspect raw interactive tables or verify spatial clustering directly in the India Atlas.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('atlas')}
            className="inline-flex items-center gap-2 border border-hairline bg-parchment px-4 py-2 font-mono text-xs text-ink transition hover:border-ink"
          >
            Open Interactive Atlas <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('explorer')}
            className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2 font-mono text-xs text-ivory transition hover:bg-rainblue"
          >
            Open Data Explorer <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}

