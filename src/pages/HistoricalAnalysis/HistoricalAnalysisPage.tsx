import { useMemo, useState } from 'react';
import { EXTREME_INDEX_CATALOG } from '../../data/catalog';
import type { HistoricalDataBundle } from '../../data/types';
import { fmtInt, fmtNum, fmtPValue, fmtSigned } from '../../utils/formatters';
import { SectionSubnav } from '../../components/navigation/SectionSubnav';
import { FigureFrame } from '../../components/research/FigureFrame';
import { StatCallout } from '../../components/research/StatCallout';
import { HypothesisTestCard } from '../../components/research/HypothesisTestCard';
import { AnnualTrendChart } from '../../components/charts/AnnualTrendChart';
import { MonthlyClimatologyChart } from '../../components/charts/MonthlyClimatologyChart';
import { SeasonalDistributionChart } from '../../components/charts/SeasonalDistributionChart';
import { ExtremeIndicesChart } from '../../components/charts/ExtremeIndicesChart';
import { SpellSensitivityChart } from '../../components/charts/SpellSensitivityChart';
import { ScientificDataTable } from '../../components/tables/ScientificDataTable';
import type { LightboxAsset } from '../../components/layout/LightboxModal';

interface HistoricalAnalysisPageProps {
  historical: HistoricalDataBundle;
  onInspectImage: (asset: LightboxAsset) => void;
}

const SUBSECTIONS = [
  { id: 'h-overview', label: 'Dataset Overview' },
  { id: 'h-qc', label: 'Preprocessing & QC' },
  { id: 'h-annual', label: 'Annual Variability' },
  { id: 'h-monthly', label: 'Monthly Climatology' },
  { id: 'h-seasonal', label: 'Seasonal Analysis' },
  { id: 'h-indices', label: 'Extreme Indices' },
  { id: 'h-spells', label: 'Dry & Wet Spells' },
  { id: 'h-spatial', label: 'Spatial Trends' },
  { id: 'h-sensitivity', label: 'Sensitivity Audit' },
  { id: 'h-conclusion', label: 'Conclusion' },
];

export function HistoricalAnalysisPage({
  historical,
  onInspectImage,
}: HistoricalAnalysisPageProps) {
  const [selectedYearMap, setSelectedYearMap] = useState<number>(2020);
  const [selectedIndexId, setSelectedIndexId] = useState<(typeof EXTREME_INDEX_CATALOG)[number]['id']>('PRCPTOT');
  const [indexYear, setIndexYear] = useState<number>(2020);
  const [spatialMapIndex, setSpatialMapIndex] = useState<(typeof EXTREME_INDEX_CATALOG)[number]['id']>('PRCPTOT');

  const activeIndexInfo = useMemo(
    () => EXTREME_INDEX_CATALOG.find((x) => x.id === selectedIndexId)!,
    [selectedIndexId]
  );

  const activeSpatialInfo = useMemo(
    () => EXTREME_INDEX_CATALOG.find((x) => x.id === spatialMapIndex)!,
    [spatialMapIndex]
  );

  const friedman = historical.friedman_seasonal[0];
  const prelim = historical.metadata.annual_preliminary_trend;

  return (
    <div>
      <SectionSubnav title="RESEARCH 01 SECTIONS" sections={SUBSECTIONS} />

      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="border-b-2 border-ink pb-6">
          <div className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-rainblue">
            Section 02 · Research 01 (project.ipynb · 2000–2025)
          </div>
          <h1 className="mt-2 font-editorial text-4xl font-semibold text-ink sm:text-5xl">
            Historical Gridded Rainfall Analysis Across India (2000–2025)
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slateink sm:text-base">
            A 26-year daily statistical investigation of 9,497 continuous days across 4,885 invariant IMD grid cells (0.25° × 0.25°), spanning annual variability, seasonal dominance, eight extreme precipitation indices, and cell-wise trend heterogeneity.
          </p>
        </div>

        {/* 1. Dataset Overview */}
        <section id="h-overview" className="scroll-mt-28 border-b border-hairline py-10">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-mutedink">
            01 · Dataset Overview
          </div>
          <h2 className="mt-1 font-editorial text-3xl font-medium text-ink">
            26 Yearly NetCDF Archives &amp; Spatial Grid Inventory
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCallout
              label="Yearly NetCDF Files"
              value="26"
              unit="files"
              note="RF25_ind2000_rfp25.nc through RF25_ind2025_rfp25.nc; 0 missing years."
              tone="rain"
            />
            <StatCallout
              label="Daily Time Steps"
              value="9,497"
              unit="days"
              note="Continuous daily sequence from 1 Jan 2000 to 31 Dec 2025 (7 leap years)."
              tone="default"
            />
            <StatCallout
              label="Full Bounding Grid"
              value="17,415"
              unit="cells"
              note="129 latitudes (6.5°N–38.5°N) × 135 longitudes (66.5°E–100.0°E)."
              tone="default"
            />
            <StatCallout
              label="Common Footprint"
              value="4,885"
              unit="cells (28.05%)"
              note="Grid cells with 100% completeness across all 9,497 days; 79 intermittent, 12,451 empty."
              tone="monsoon"
            />
          </div>
        </section>

        {/* 2. Data Preprocessing and Quality Control */}
        <section id="h-qc" className="scroll-mt-28 border-b border-hairline py-10">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-mutedink">
            02 · Preprocessing &amp; Quality Control
          </div>
          <h2 className="mt-1 font-editorial text-3xl font-medium text-ink">
            Common Spatial Footprint &amp; Source Integrity Certification
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slateink">
            Across 165,390,255 raw grid-time slots, 71.50% represent ocean or outside-domain fill values (<code className="font-mono">-999.0</code>) and 79 land-edge cells contain intermittent gaps (notably in 2023). Restricting analysis to the 4,885 complete cells yields 46,392,845 verified observations with zero missing values inside the mask, and resolves calendar-attribute discrepancies between 2024 (<code className="font-mono">GREGORIAN</code>) and other years (<code className="font-mono">not specified</code>).
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <FigureFrame
                figureNumber="FIG. 1.1"
                title="Spatial Data Availability & Common Footprint (2000–2025)"
                subtitle="129 × 135 Grid Audit"
                imageSrc="/outputs/figures/spatial_data_coverage_2000_2025.png"
                onInspectImage={onInspectImage}
                caption="Classification of all 17,415 grid cells into Complete (4,885 cells, 28.05%), Intermittent (79 cells), and No Data (12,451 cells). Note that the common footprint does not cover every peripheral administrative boundary of India."
                sourceLabel="outputs/figures/spatial_data_coverage_2000_2025.png"
              />
            </div>

            <div className="space-y-4 lg:col-span-5">
              <div className="border border-hairline bg-parchment p-5">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-rainblue">
                  Daily Area-Weighted Distribution (9,497 Days)
                </div>
                <h4 className="mt-1 font-editorial text-xl font-medium text-ink">
                  Daily Summary Statistics (cos φ weighted)
                </h4>
                <dl className="mt-4 divide-y divide-hairline font-mono text-xs">
                  {historical.daily_distribution_stats.map((row) => (
                    <div key={row.Metric} className="flex justify-between py-1.5">
                      <dt className="text-mutedink">{row.Metric}</dt>
                      <dd className="font-semibold text-ink">{fmtNum(row.Value, 4)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <FigureFrame
              figureNumber="FIG. 1.2A"
              title="Daily Area-Weighted Rainfall Histogram"
              imageSrc="/outputs/figures/daily_distribution/daily_rainfall_histogram.png"
              onInspectImage={onInspectImage}
              caption="Right-skewed daily rainfall distribution (skewness = 1.27, mean 3.15 mm/day vs median 1.63 mm/day, max 19.27 mm/day)."
              sourceLabel="outputs/figures/daily_distribution/daily_rainfall_histogram.png"
            />
            <FigureFrame
              figureNumber="FIG. 1.2B"
              title="Daily Rainfall Rolling Average & Boxplot"
              imageSrc="/outputs/figures/daily_distribution/daily_rainfall_rolling_average.png"
              onInspectImage={onInspectImage}
              caption="Multi-year daily trajectory across 9,497 continuous observations over the 4,885-cell common spatial footprint."
              sourceLabel="outputs/figures/daily_distribution/daily_rainfall_rolling_average.png"
            />
          </div>
        </section>

        {/* 3. Annual Rainfall Variability */}
        <section id="h-annual" className="scroll-mt-28 border-b border-hairline py-10">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-mutedink">
            03 · Annual Rainfall Variability
          </div>
          <h2 className="mt-1 font-editorial text-3xl font-medium text-ink">
            Interannual Fluctuations &amp; Yearly Spatial Maps (2000–2025)
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCallout
              label="Mean Annual Rainfall"
              value="1,149.60"
              unit="mm/year"
              note="Median: 1,161.13 mm/yr; Std Dev: 98.56 mm/yr; CV: 8.57%."
              tone="rain"
            />
            <StatCallout
              label="Wettest Year (2020)"
              value="1,285.86"
              unit="mm"
              note="+11.85% above long-term mean; 2025 closely followed at 1,285.75 mm."
              tone="monsoon"
            />
            <StatCallout
              label="Driest Year (2002)"
              value="947.12"
              unit="mm"
              note="−17.61% below long-term mean; annual range across 26 years is 338.73 mm."
              tone="extreme"
            />
            <StatCallout
              label="Unadjusted Sen's Slope"
              value="+5.86"
              unit="mm/yr"
              note={`95% CI: [0.90, 11.54]; MK τ = ${fmtNum(prelim.mk_tau, 4)} (p = ${fmtNum(prelim.mk_p_value, 4)}, preliminary footprint mean).`}
              tone="default"
            />
          </div>

          <div className="mt-6">
            <FigureFrame
              figureNumber="FIG. 1.3"
              title="Interactive Annual Rainfall Series & Trend Fits (2000–2025)"
              subtitle="9,497 Days Aggregated to 26 Years"
              caption="Area-weighted annual rainfall over the 4,885-cell common footprint. While the aggregate footprint mean exhibits a positive unadjusted slope (+5.86 mm/yr Sen's slope), grid-cell and extreme-index trend tests with multiple-testing correction show heterogeneous behaviour rather than uniform increase."
              sourceLabel="outputs/tables/annual_rainfall_statistics_2000_2025.csv"
            >
              <AnnualTrendChart
                data={historical.annual_statistics}
                olsSlope={prelim.ols_slope_mm_yr}
                olsIntercept={prelim.ols_intercept}
                senSlope={prelim.sen_slope_mm_yr}
              />
            </FigureFrame>
          </div>

          {/* Interactive Year Map Scrubber from Annual_Rainfall_Maps/ */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="border border-hairline bg-parchment p-5 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3">
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-rainblue">
                    Annual Spatial Atlas Scrubber
                  </span>
                  <h4 className="font-editorial text-xl font-medium text-ink">
                    Annual Rainfall Map — Year {selectedYearMap}
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={2000}
                    max={2025}
                    value={selectedYearMap}
                    onChange={(e) => setSelectedYearMap(Number(e.target.value))}
                    aria-label="Select year map"
                    className="w-36 accent-rainblue sm:w-48"
                  />
                  <span className="border border-ink bg-ivory px-2.5 py-1 font-mono text-xs font-semibold">
                    {selectedYearMap}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-center bg-white p-2">
                <img
                  src={`/Annual_Rainfall_Maps/Rainfall_Map_${selectedYearMap}.png`}
                  alt={`Annual rainfall spatial map for ${selectedYearMap}`}
                  className="max-h-[420px] w-auto cursor-zoom-in object-contain"
                  onClick={() =>
                    onInspectImage({
                      src: `/Annual_Rainfall_Maps/Rainfall_Map_${selectedYearMap}.png`,
                      title: `Annual Rainfall Spatial Map (${selectedYearMap})`,
                      figureNumber: `MAP-${selectedYearMap}`,
                      caption: `Spatial distribution of annual rainfall in ${selectedYearMap} from Annual_Rainfall_Maps/.`,
                    })
                  }
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <FigureFrame
                figureNumber="FIG. 1.4"
                title="Annual Trend Regression & Residual Diagnostics"
                imageSrc="/outputs/figures/annual_rainfall_trend_analysis.png"
                onInspectImage={onInspectImage}
                caption="Original notebook OLS & Mann–Kendall diagnostic chart comparing annual totals and confidence intervals across 2000–2025."
                sourceLabel="outputs/figures/annual_rainfall_trend_analysis.png"
              />
            </div>
          </div>
        </section>

        {/* 4. Monthly Rainfall Climatology */}
        <section id="h-monthly" className="scroll-mt-28 border-b border-hairline py-10">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-mutedink">
            04 · Monthly Rainfall Climatology
          </div>
          <h2 className="mt-1 font-editorial text-3xl font-medium text-ink">
            Monthly Cycle &amp; 312-Record Year–Month Matrix
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slateink">
            Rainfall concentrates sharply between June and September. July records the highest climatological mean (279.05 mm, median 288.20 mm, SD 36.58 mm), followed by August (246.00 mm), September (172.54 mm), and June (167.79 mm), whereas December is driest (13.20 mm).
          </p>

          <div className="mt-6">
            <FigureFrame
              figureNumber="FIG. 1.5"
              title="Monthly Climatology Profile & 26 × 12 Rainfall Matrix"
              subtitle="312 Year-Month Records"
              caption="Switch between the 26-year monthly mean/median climatology curve and the full interactive 2000–2025 monthly heatmap."
              sourceLabel="outputs/tables/monthly_rainfall_climatology.csv & monthly_rainfall_totals_2000_2025.csv"
            >
              <MonthlyClimatologyChart
                climatology={historical.monthly_climatology}
                monthlyTotals={historical.monthly_totals}
              />
            </FigureFrame>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <FigureFrame
              figureNumber="FIG. 1.6A"
              title="Notebook Monthly Climatology Plot"
              imageSrc="/outputs/figures/monthly_rainfall_climatology.png"
              onInspectImage={onInspectImage}
              caption="Original climatology profile generated in project.ipynb."
              sourceLabel="outputs/figures/monthly_rainfall_climatology.png"
            />
            <FigureFrame
              figureNumber="FIG. 1.6B"
              title="Notebook Year-Month Heatmap"
              imageSrc="/outputs/figures/year_month_rainfall_heatmap.png"
              onInspectImage={onInspectImage}
              caption="Original 26 × 12 monthly rainfall heatmap generated in project.ipynb."
              sourceLabel="outputs/figures/year_month_rainfall_heatmap.png"
            />
          </div>
        </section>

        {/* 5. Seasonal Rainfall Analysis */}
        <section id="h-seasonal" className="scroll-mt-28 border-b border-hairline py-10">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-mutedink">
            05 · Seasonal Rainfall Analysis
          </div>
          <h2 className="mt-1 font-editorial text-3xl font-medium text-ink">
            Monsoon Dominance, Friedman Test &amp; Autocorrelation Diagnostics
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <FigureFrame
                figureNumber="FIG. 1.7"
                title="Seasonal Contribution, Normalized Intensity & 26-Year Trends"
                subtitle="Winter · Pre-Monsoon · SW Monsoon · Post-Monsoon"
                caption="Southwest Monsoon contributes 75.28% (865.38 mm/yr; 7.093 mm/day intensity), followed by Pre-Monsoon (11.83%), Post-Monsoon (9.98%), and Winter (2.91%)."
                sourceLabel="outputs/tables/seasonal_rainfall_summary.csv & seasonal_intensity_summary.csv"
                accent="teal"
              >
                <SeasonalDistributionChart
                  summary={historical.seasonal_summary}
                  intensitySummary={historical.seasonal_intensity_summary}
                  yearlyTotals={historical.seasonal_totals_by_year}
                  yearlyIntensity={historical.seasonal_daily_intensity_by_year}
                />
              </FigureFrame>
            </div>

            <div className="space-y-4 lg:col-span-5">
              <HypothesisTestCard
                testName="Friedman Non-Parametric Seasonal Test"
                scope="26 Years × 4 Meteorological Seasons"
                statisticLabel="Friedman χ² (df = 3) · Kendall's W"
                statisticValue={`${fmtNum(friedman.Chi_Square, 2)} · W = ${fmtNum(friedman.Kendalls_W, 4)}`}
                pValue={fmtPValue(friedman.P_Value)}
                decision="Reject H₀ (p < 0.001)"
                significant
                interpretation="Both seasonal totals and normalized daily intensities differ profoundly across seasons. All 6 pairwise Wilcoxon tests remain significant after Holm correction (p_adj = 0.0079 for Pre- vs Post-Monsoon; 1.79 × 10⁻⁷ for all other pairs)."
              />
              <HypothesisTestCard
                testName="Seasonal Mann–Kendall (Holm-Corrected)"
                scope="Seasonal Daily Intensity Trends (2000–2025)"
                statisticLabel="Raw p < 0.05 vs Holm-Adjusted p"
                statisticValue="SW Monsoon τ = +0.28 · Pre-Monsoon τ = +0.32"
                pValue="p_Holm = 0.0832 – 0.4844"
                decision="No Significant Trend"
                significant={false}
                interpretation="Although raw p-values for Pre-Monsoon (0.0208) and SW Monsoon (0.0465) were < 0.05, none remain statistically significant after Holm multiple-testing correction. Ljung–Box tests (lags 1–3) confirm zero serial autocorrelation (all p > 0.41)."
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ScientificDataTable
              title="Seasonal Mann–Kendall & Sen's Slope Results"
              subtitle="outputs/tables/seasonal_mann_kendall_sen_trend_results.csv"
              data={historical.seasonal_mann_kendall}
              columns={[
                { key: 'Season', label: 'Season' },
                { key: 'Kendall_Tau', label: 'Tau', align: 'right', render: (v) => fmtNum(v as number, 3) },
                {
                  key: 'Sen_Slope_mm_day_per_year',
                  label: 'Sen Slope (mm/d/yr)',
                  align: 'right',
                  render: (v) => fmtSigned(v as number, 4),
                },
                { key: 'Raw_P_Value', label: 'Raw p', align: 'right', render: (v) => fmtPValue(v as number) },
                { key: 'Adjusted_P_Value', label: 'Holm p', align: 'right', render: (v) => fmtPValue(v as number) },
                { key: 'Trend', label: 'Conclusion' },
              ]}
              searchable={false}
              exportFilename="seasonal_mann_kendall_results.csv"
            />
            <ScientificDataTable
              title="Seasonal Ljung–Box Autocorrelation Diagnostics (Lags 1–3)"
              subtitle="outputs/tables/seasonal_autocorrelation_diagnostics.csv"
              data={historical.seasonal_autocorrelation}
              columns={[
                { key: 'Season', label: 'Season' },
                { key: 'Lag', label: 'Lag', align: 'right' },
                { key: 'Lag_1_Autocorrelation', label: 'ACF(1)', align: 'right', render: (v) => fmtNum(v as number, 4) },
                { key: 'Ljung_Box_Statistic', label: 'LB Stat', align: 'right', render: (v) => fmtNum(v as number, 4) },
                { key: 'P_Value', label: 'p-value', align: 'right', render: (v) => fmtNum(v as number, 4) },
                { key: 'Significant', label: 'Sig (α=0.05)', render: (v) => (v ? 'Yes' : 'No') },
              ]}
              pageSize={6}
              searchable={false}
              exportFilename="seasonal_autocorrelation_diagnostics.csv"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <FigureFrame
              figureNumber="FIG. 1.8A"
              title="Seasonal Distribution Boxplots"
              imageSrc="/outputs/figures/seasonal_rainfall_boxplot.png"
              onInspectImage={onInspectImage}
              caption="Distribution of seasonal rainfall totals across all 26 years."
              sourceLabel="outputs/figures/seasonal_rainfall_boxplot.png"
            />
            <FigureFrame
              figureNumber="FIG. 1.8B"
              title="Four-Panel Seasonal Intensity Trends"
              imageSrc="/outputs/figures/seasonal_rainfall_trend_panels.png"
              onInspectImage={onInspectImage}
              caption="Individual seasonal time series with Theil–Sen trend overlays."
              sourceLabel="outputs/figures/seasonal_rainfall_trend_panels.png"
            />
          </div>
        </section>

        {/* 6. Extreme Rainfall Indices */}
        <section id="h-indices" className="scroll-mt-28 border-b border-hairline py-10">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-mutedink">
            06 · Extreme Rainfall Indices (ETCCDI Framework)
          </div>
          <h2 className="mt-1 font-editorial text-3xl font-medium text-ink">
            Eight Standardized Extreme Indices Across 2000–2025
          </h2>

          <div className="mt-6">
            <ExtremeIndicesChart
              spatialSummary={historical.spatial_trend_summary}
              prcptotSdiiAnnual={historical.prcptot_sdii_annual}
            />
          </div>

          {/* Interactive 8-Index Animation & Yearly Map Workbench */}
          <div className="mt-8 border border-ink bg-parchment p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-rainblue">
                  Interactive Extreme Index Workbench
                </div>
                <h4 className="font-editorial text-2xl font-medium text-ink">
                  {activeIndexInfo.id} — {activeIndexInfo.name} ({activeIndexInfo.unit})
                </h4>
                <p className="mt-1 text-xs text-slateink">{activeIndexInfo.definition}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {EXTREME_INDEX_CATALOG.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIndexId(item.id)}
                    className={`border px-2.5 py-1 font-mono text-xs transition ${
                      selectedIndexId === item.id
                        ? 'border-ink bg-ink text-ivory'
                        : 'border-hairline bg-ivory text-slateink hover:border-ink'
                    }`}
                  >
                    {item.id}
                  </button>
                ))}
              </div>
            </div>

            {activeIndexInfo.hasAnimation ? (
              <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="border border-hairline bg-white p-3">
                  <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-slateink">
                    <span>2000–2025 Time-Lapse Animation</span>
                    <span className="text-rainblue">{activeIndexInfo.id}_2000_2025.gif</span>
                  </div>
                  <img
                    src={activeIndexInfo.animationPath}
                    alt={`${activeIndexInfo.id} 2000–2025 animation`}
                    className="mx-auto max-h-[380px] w-auto cursor-zoom-in object-contain"
                    onClick={() =>
                      onInspectImage({
                        src: activeIndexInfo.animationPath!,
                        title: `${activeIndexInfo.id} Animated Spatial Time Series (2000–2025)`,
                        caption: activeIndexInfo.definition,
                      })
                    }
                  />
                </div>

                <div className="border border-hairline bg-white p-3">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-slateink">
                    <span>Single-Year Spatial Snapshot ({indexYear})</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={2000}
                        max={2025}
                        value={indexYear}
                        onChange={(e) => setIndexYear(Number(e.target.value))}
                        aria-label="Extreme index year"
                        className="w-32 accent-rainblue"
                      />
                      <span className="border border-ink bg-ivory px-2 py-0.5 font-semibold">{indexYear}</span>
                    </div>
                  </div>
                  <img
                    src={activeIndexInfo.yearlyMapPattern!(indexYear)}
                    alt={`${activeIndexInfo.id} map for ${indexYear}`}
                    className="mx-auto max-h-[380px] w-auto cursor-zoom-in object-contain"
                    onClick={() =>
                      onInspectImage({
                        src: activeIndexInfo.yearlyMapPattern!(indexYear),
                        title: `${activeIndexInfo.id} Spatial Map (${indexYear})`,
                        caption: activeIndexInfo.definition,
                      })
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="mt-5 border border-hairline bg-ivory p-4 text-xs text-slateink">
                Yearly spatial animations were generated for PRCPTOT, SDII, Rx1day, Rx5day, R10mm, and R20mm. For {activeIndexInfo.id}, see the temporal trend analysis and spatial Sen&apos;s slope / significance maps in Subsections 07 and 08 below.
              </div>
            )}
          </div>
        </section>

        {/* 7. Dry and Wet Spell Analysis */}
        <section id="h-spells" className="scroll-mt-28 border-b border-hairline py-10">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-mutedink">
            07 · Dry &amp; Wet Spell Analysis
          </div>
          <h2 className="mt-1 font-editorial text-3xl font-medium text-ink">
            Consecutive Dry Days (CDD) &amp; Consecutive Wet Days (CWD)
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <FigureFrame
                figureNumber="FIG. 1.9"
                title="CDD & CWD Temporal Trends (2000–2025)"
                imageSrc="/outputs/figures/extreme_indices/CDD_CWD_temporal_trends.png"
                onInspectImage={onInspectImage}
                caption="Footprint-mean Consecutive Dry Days (CDD: τ = -0.1877, Sen slope -0.35 d/yr, Holm p = 0.3758) and Consecutive Wet Days (CWD: τ = -0.0523, Sen slope -0.02 d/yr, Holm p = 0.7270) exhibit no statistically significant temporal trend."
                sourceLabel="outputs/figures/extreme_indices/CDD_CWD_temporal_trends.png"
              />
            </div>

            <div className="lg:col-span-6">
              <ScientificDataTable
                title="Footprint-Level Temporal Trend Tests (Extreme Indices)"
                subtitle="PRCPTOT, SDII, CDD, and CWD after Holm multiple-testing correction"
                data={[...historical.prcptot_sdii_trend, ...historical.cdd_cwd_trend]}
                columns={[
                  { key: 'Index', label: 'Index' },
                  { key: 'Kendall_Tau', label: 'Kendall τ', align: 'right', render: (v) => fmtNum(v as number, 3) },
                  {
                    key: 'Sen_Slope_Per_Year',
                    label: 'Sen Slope / yr',
                    align: 'right',
                    render: (v, row) =>
                      fmtSigned((v ?? row.Sen_Slope_Days_Per_Year) as number, 3),
                  },
                  { key: 'P_Value', label: 'Raw p', align: 'right', render: (v) => fmtPValue(v as number) },
                  { key: 'Holm_Adjusted_P', label: 'Holm p', align: 'right', render: (v) => fmtPValue(v as number) },
                  {
                    key: 'Significant_After_Holm',
                    label: 'Sig. (Holm)',
                    render: (v) => (v ? 'Yes' : 'No (Not Sig.)'),
                  },
                ]}
                searchable={false}
                exportFilename="footprint_extreme_temporal_trends.csv"
              />
            </div>
          </div>
        </section>

        {/* 8. Spatial Trend Analysis */}
        <section id="h-spatial" className="scroll-mt-28 border-b border-hairline py-10">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-mutedink">
            08 · Spatial Trend Analysis (4,885 Grid Cells)
          </div>
          <h2 className="mt-1 font-editorial text-3xl font-medium text-ink">
            Heterogeneous Local Trends Across the Common Footprint
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slateink">
            While aggregate footprint-mean trends in PRCPTOT, SDII, CDD, and CWD are non-significant after Holm correction, cell-wise Mann–Kendall tests with Benjamini–Hochberg FDR control (α = 0.05) reveal geographically heterogeneous clusters of statistically significant increases and decreases.
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {EXTREME_INDEX_CATALOG.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSpatialMapIndex(item.id)}
                className={`border px-3 py-1.5 font-mono text-xs transition ${
                  spatialMapIndex === item.id
                    ? 'border-ink bg-ink text-ivory'
                    : 'border-hairline bg-parchment text-slateink hover:border-ink'
                }`}
              >
                {item.id} Spatial Maps
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
            <FigureFrame
              figureNumber={`MAP-SEN · ${activeSpatialInfo.id}`}
              title={`${activeSpatialInfo.id} Sen's Slope Magnitude Map`}
              imageSrc={activeSpatialInfo.senSlopeMapPath}
              onInspectImage={onInspectImage}
              caption={`Cell-wise Theil–Sen trend slope (${activeSpatialInfo.unit}/yr) across 4,885 common-footprint grid cells (2000–2025).`}
              sourceLabel={activeSpatialInfo.senSlopeMapPath}
            />
            <FigureFrame
              figureNumber={`MAP-FDR · ${activeSpatialInfo.id}`}
              title={`${activeSpatialInfo.id} Benjamini–Hochberg FDR Significance Map`}
              imageSrc={activeSpatialInfo.significanceMapPath}
              onInspectImage={onInspectImage}
              caption={`Grid cells showing statistically significant increasing or decreasing ${activeSpatialInfo.id} trends after FDR correction (α = 0.05).`}
              sourceLabel={activeSpatialInfo.significanceMapPath}
            />
          </div>

          <div className="mt-6">
            <ScientificDataTable
              title="Spatial Trend Summary Across All 8 Extreme Indices (4,885 Common Footprint Cells)"
              subtitle="Benjamini–Hochberg FDR α = 0.05"
              data={historical.spatial_trend_summary}
              columns={[
                { key: 'Index', label: 'Index' },
                { key: 'Increasing_FDR_05', label: 'Sig. Increasing', align: 'right', render: (v) => fmtInt(v as number) },
                { key: 'Decreasing_FDR_05', label: 'Sig. Decreasing', align: 'right', render: (v) => fmtInt(v as number) },
                { key: 'Not_Significant', label: 'Not Significant', align: 'right', render: (v) => fmtInt(v as number) },
                { key: 'Mean_Sen_Slope', label: 'Mean Sen Slope', align: 'right', render: (v) => fmtSigned(v as number, 4) },
                { key: 'Min_Sen_Slope', label: 'Min Slope', align: 'right', render: (v) => fmtSigned(v as number, 2) },
                { key: 'Max_Sen_Slope', label: 'Max Slope', align: 'right', render: (v) => fmtSigned(v as number, 2) },
              ]}
              searchable={false}
              exportFilename="spatial_trend_summary_8_indices.csv"
            />
          </div>
        </section>

        {/* 9. Sensitivity Analysis */}
        <section id="h-sensitivity" className="scroll-mt-28 border-b border-hairline py-10">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-mutedink">
            09 · Sensitivity Analysis &amp; Zero-Rainfall Flag Audit
          </div>
          <h2 className="mt-1 font-editorial text-3xl font-medium text-ink">
            Testing Robustness Against 90 Anomalous Zero-Rainfall Grid Cells
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slateink">
            Neighbourhood auditing revealed 90 grid cells within the 4,885-cell footprint that reported entire calendar years with 0.0 mm rainfall (CDD = 365–366 days) despite high-rainfall surrounding neighbours (for example, (26.0°N, 89.5°E) recorded 25 zero-rainfall years while adjacent cells averaged 3,143 mm/yr). Re-running CDD and CWD trend tests excluding those 90 flagged cells (Scenario B: 4,795 cells) confirms that non-significance is robust.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <FigureFrame
                figureNumber="FIG. 1.10"
                title="Scenario A (4,885 Cells) vs Scenario B (4,795 Unflagged Cells)"
                subtitle="CDD & CWD Sensitivity Comparison"
                caption="Mean annual CDD and CWD computed with and without the 90 anomalous zero-rainfall cells. CDD p-value changes slightly from 0.1879 (Scenario A) to 0.2365 (Scenario B); CWD remains non-significant (0.7270 vs 0.5702)."
                sourceLabel="outputs/tables/CDD_sensitivity_analysis_zero_rainfall_flags.csv"
                accent="extreme"
              >
                <SpellSensitivityChart
                  cddYearly={historical.cdd_sensitivity_yearly}
                  cwdYearly={historical.cwd_sensitivity_yearly}
                />
              </FigureFrame>
            </div>
            <div className="lg:col-span-5">
              <FigureFrame
                figureNumber="FIG. 1.11"
                title="Spatial Location of Zero-Rainfall Flagged Cells"
                imageSrc="/outputs/figures/extreme_indices/extreme_indices/zero_rainfall_frequency_map.png"
                onInspectImage={onInspectImage}
                caption="Frequency of full-year zero-rainfall flags across the 4,885-cell footprint."
                sourceLabel="outputs/figures/extreme_indices/extreme_indices/zero_rainfall_frequency_map.png"
                accent="extreme"
              />
            </div>
          </div>
        </section>

        {/* 10. Final Conclusion */}
        <section id="h-conclusion" className="scroll-mt-28 pt-10">
          <div className="border-2 border-ink bg-parchment p-6 sm:p-8">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-rainblue">
              10 · Research 01 Synthesis (2000–2025)
            </div>
            <h2 className="mt-2 font-editorial text-3xl font-semibold text-ink">
              Historical Evidence Summary
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slateink">
              Across 2000–2025 over the 4,885-cell common spatial footprint (28.05% of the bounding grid), Indian rainfall exhibits pronounced seasonal asymmetry (75.28% in Southwest Monsoon, Friedman χ² = 70.94, p = 2.69 × 10⁻¹⁵) and substantial interannual variation around a 1,149.60 mm/year mean (ranging from 947.12 mm in 2002 to 1,285.86 mm in 2020). After applying Holm and Benjamini–Hochberg multiple-testing corrections, aggregate temporal trends in seasonal intensities and in PRCPTOT, SDII, CDD, and CWD are not statistically significant. Instead, local grid-cell trend tests demonstrate geographically heterogeneous rainfall behaviour, with distinct regional pockets experiencing statistically significant increases or decreases.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

