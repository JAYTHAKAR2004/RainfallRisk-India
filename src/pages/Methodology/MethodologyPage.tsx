import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { HistoricalDataBundle, RegionalDataBundle } from '../../data/types';
import { fmtInt } from '../../utils/formatters';

interface MethodologyPageProps {
  historical: HistoricalDataBundle;
  regional: RegionalDataBundle;
}

interface PipelineStage {
  step: string;
  title: string;
  notebookRef: string;
  summary: string;
  details: string[];
  tools: string[];
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    step: '01',
    title: 'Raw IMD Data',
    notebookRef: 'Dataset/',
    summary: 'Ingest 26 yearly IMD gridded NetCDF rainfall files (2000–2025, 0.25° × 0.25°) alongside 2026 daily state-wise and district-wise IMD reporting CSVs.',
    details: [
      '26 NetCDF files (RF25_ind2000_rfp25.nc – RF25_ind2025_rfp25.nc), 129 × 135 spatial grid (17,415 cells).',
      'State CSV: 36 State/UT units spanning 19 August – 12 November 2026.',
      'District CSV: 728 total districts initially observed across the same 2026 reporting horizon.',
    ],
    tools: ['NetCDF4 1.7.5', 'Pandas 3.1.1', 'Pathlib'],
  },
  {
    step: '02',
    title: 'Data Cleaning',
    notebookRef: 'project.ipynb §9–11 & project2',
    summary: 'Decode CF-1.0 time coordinates, preserve -999.0 fill codes as NaN rather than zero, and audit unbalanced reporting panels.',
    details: [
      'Harmonized calendar metadata: 25 NetCDF files carried "not specified" calendar while 2024 specified "GREGORIAN"; unified decoding against "days since 1900-12-31".',
      'Identified 1 missing reporting date (2026-10-31) across all 36 states and 727 districts.',
      'Isolated Nagapattinam (Tamil Nadu, 36 observations) from the balanced 727-district panel (85 dates each).',
    ],
    tools: ['netCDF4.num2date', 'Xarray 2026.9', 'Pandas'],
  },
  {
    step: '03',
    title: 'Quality Assessment',
    notebookRef: 'netcdf_quality_control_report.json',
    summary: 'Execute automated source-to-processed verification and flag zero-rainfall cell anomalies using spatial neighbourhood audits.',
    details: [
      '240 sampled value comparisons against raw yearly NetCDF files after calendar fix yielded 0.0 mm maximum absolute difference.',
      'Diagnosed 90 grid cells exhibiting full-year zero rainfall (CDD ≥ 365 d) despite high-rainfall neighbours (e.g., 26.0°N, 89.5°E vs 3,336.6 mm neighbour median).',
      'Evaluated IMD percentage-departure instability when Daily Normal ≤ 0.1 mm (+2,453.8% mean artifact).',
    ],
    tools: ['JSON QC Suite', 'NumPy 2.5.4', 'Neighbourhood Audit'],
  },
  {
    step: '04',
    title: 'Spatial / Temporal Standardization',
    notebookRef: 'project.ipynb §6–13',
    summary: 'Define an invariant 4,885-cell common spatial footprint and compute cosine-latitude area-weighted daily series.',
    details: [
      'Filtered 17,415 bounding cells down to 4,885 cells (28.0505%) with complete observations across all 9,497 days (excluding 12,451 no-data and 79 intermittent cells).',
      'Applied cos(latitude) weights to adjust grid-cell area across 8.25°N–37.25°N before computing daily footprint means.',
      'Constructed 312 year-month and 104 year-season aggregations across 4 standard IMD meteorological seasons.',
    ],
    tools: ['NumPy Masking', 'cos(φ) Weighting'],
  },
  {
    step: '05',
    title: 'Statistical Analysis',
    notebookRef: 'project.ipynb §14–18 & project2',
    summary: 'Quantify central tendency, dispersion (SD, IQR, CV%), skewness, kurtosis, daily anomalies, and seasonal intensity.',
    details: [
      'Historical annual distribution: mean 1,149.60 mm, SD 98.56 mm, CV 8.57%, range 338.73 mm (947.12 to 1,285.86 mm).',
      'Daily series right-skewed (skewness = 1.27, mean 3.15 mm/day vs median 1.63 mm/day).',
      '2026 anomaly defined strictly in mm/day (Actual − Normal) rather than unreliable percentage departure.',
    ],
    tools: ['SciPy Stats', 'Pandas GroupBy'],
  },
  {
    step: '06',
    title: 'Extreme Rainfall Indices',
    notebookRef: 'outputs/processed_data/extreme_indices/',
    summary: 'Compute eight standardized ETCCDI-style annual extreme precipitation indices at all 4,885 grid cells and audit ≥100 mm district days.',
    details: [
      'Calculated PRCPTOT, SDII, Rx1day, Rx5day, R10mm, R20mm, CDD, and CWD for each year 2000–2025.',
      'Tracked SDII both under variable spatial support and fixed valid-cell support.',
      'Isolated all 99 district-day observations ≥ 100 mm (8 exceeding 200 mm) in Aug–Nov 2026.',
    ],
    tools: ['Xarray', 'NetCDF4', 'ETCCDI Definitions'],
  },
  {
    step: '07',
    title: 'Hypothesis Testing',
    notebookRef: 'SciPy & Statsmodels',
    summary: 'Test seasonal differences, inter-state variation, paired anomalies, trends, and temporal autocorrelation with strict multiple-testing corrections.',
    details: [
      'Seasonal differences: Friedman test + pairwise Wilcoxon signed-rank with Holm correction.',
      'Trends & autocorrelation: Mann–Kendall τ, Theil–Sen slope with 95% CI, Ljung–Box (lags 1–3), Benjamini–Hochberg FDR (α = 0.05) across 4,885 cells.',
      'Regional comparisons: Welch ANOVA, Kruskal–Wallis, Pairwise Welch-Holm & Dunn-Holm (378 state pairs), and paired Wilcoxon tests.',
    ],
    tools: ['SciPy 1.18.1', 'Statsmodels 0.15', 'BH FDR & Holm'],
  },
  {
    step: '08',
    title: 'Visualization',
    notebookRef: 'outputs/figures & Annual_Rainfall_Maps',
    summary: 'Produce publication-grade maps, Sen-slope grids, heatmaps, boxplots, and 26-year temporal animations.',
    details: [
      'Generated 26 annual rainfall maps + 6 extreme-index animated GIFs across 2000–2025.',
      'Plotted Sen slope and FDR significance maps for all 8 indices plus regional Wilcoxon forest/bar charts.',
      'Integrated interactively in this platform with synchronized tables and LGD administrative vector cartography.',
    ],
    tools: ['Matplotlib 3.11.2', 'Seaborn 0.13.2', 'Recharts + d3-geo'],
  },
  {
    step: '09',
    title: 'Research Conclusions',
    notebookRef: 'Synthesis & Limitations',
    summary: 'Synthesize verified evidence while separating observed patterns from statistically established facts and explicit study limitations.',
    details: [
      'Conclude spatial heterogeneity: no uniform India-wide trend after multiple-testing correction.',
      'Document sensitivity to 90 zero-rainfall flagged cells (Scenario A vs B).',
      'Acknowledge spatial dependence among neighbouring districts and non-causality of statistical tests.',
    ],
    tools: ['Research Monograph', 'Sensitivity Audit'],
  },
];

export function MethodologyPage({ historical, regional }: MethodologyPageProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = PIPELINE_STAGES[selectedIdx];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
      <div className="border-b-2 border-ink pb-6">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-rainblue">
          Section 01 · Analytical Architecture
        </span>
        <h1 className="mt-2 font-editorial text-4xl font-semibold text-ink sm:text-5xl">
          Research Methodology &amp; Verification Pipeline
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slateink sm:text-base">
          Every figure and statistical test reported in RainfallRisk India follows a reproducible nine-stage computational pipeline implemented in Python 3.12 and Jupyter Notebooks using NumPy, Pandas, Xarray, NetCDF4, SciPy, Statsmodels, Matplotlib, and Seaborn.
        </p>
      </div>

      {/* Interactive 9-Stage Pipeline */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-editorial text-2xl font-medium text-ink">
            Nine-Stage Scientific Workflow
          </h2>
          <span className="font-mono text-xs text-mutedink">
            Select any stage to inspect exact notebook methods
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-9">
          {PIPELINE_STAGES.map((stage, i) => {
            const active = i === selectedIdx;
            return (
              <button
                key={stage.step}
                type="button"
                onClick={() => setSelectedIdx(i)}
                className={`flex flex-col justify-between border p-3 text-left transition ${
                  active
                    ? 'border-ink bg-ink text-ivory'
                    : 'border-hairline bg-parchment text-ink hover:border-ink'
                }`}
              >
                <span className={`font-mono text-[10px] font-semibold ${active ? 'text-ivory/75' : 'text-rainblue'}`}>
                  STAGE {stage.step}
                </span>
                <span className="mt-2 text-xs font-semibold leading-snug">{stage.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail */}
        <div className="mt-4 border border-ink bg-parchment p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="font-mono text-xs font-semibold uppercase tracking-widest text-rainblue">
                Stage {current.step} · {current.notebookRef}
              </div>
              <h3 className="mt-1 font-editorial text-3xl font-semibold text-ink">
                {current.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slateink">{current.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {current.details.map((d, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-ink">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-rainblue" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-hairline pt-5 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-mutedink">
                Computational Tools Used
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {current.tools.map((tool) => (
                  <span
                    key={tool}
                    className="border border-hairline bg-ivory px-3 py-1 font-mono text-xs text-ink"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="mt-6 border border-hairline bg-ivory p-4">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-mutedink">
                  Core Methodological Rules
                </div>
                <ul className="mt-2 space-y-1.5 text-xs text-slateink">
                  <li>• Missing observations (<code className="font-mono">-999.0</code>) remain NaN and are never coerced to 0 mm.</li>
                  <li>• Cosine-latitude weighting adjusts grid-cell area across latitudes.</li>
                  <li>• Multiple-testing corrections (BH FDR &amp; Holm) guard against false positives.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control Certification + Technical Equations */}
      <section className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="border border-hairline bg-parchment p-6 lg:col-span-6">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-monsoon">
                netcdf_quality_control_report.json
              </span>
              <h3 className="font-editorial text-2xl font-medium text-ink">
                Combined NetCDF Quality-Control Audit
              </h3>
            </div>
            <span className="border border-monsoon bg-monsoon/10 px-2.5 py-1 font-mono text-xs font-semibold text-monsoon">
              STATUS: {historical.quality_control.overall_status}
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {Object.entries(historical.quality_control.checks).map(([check, passed]) => (
              <div
                key={check}
                className="flex items-center justify-between border-b border-hairline/70 pb-2 text-xs"
              >
                <span className="text-ink">{check}</span>
                <span className="inline-flex items-center gap-1 font-mono font-semibold text-monsoon">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {passed ? 'PASS' : 'FAIL'}
                </span>
              </div>
            ))}
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-4 bg-ivory p-4 font-mono text-xs">
            <div>
              <dt className="text-[10px] uppercase text-mutedink">Valid Footprint Obs</dt>
              <dd className="mt-0.5 font-semibold text-ink">
                {fmtInt(historical.quality_control.valid_observations)}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase text-mutedink">Missing Inside Mask</dt>
              <dd className="mt-0.5 font-semibold text-monsoon">
                {fmtInt(historical.quality_control.missing_observations_inside_footprint)}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase text-mutedink">Source Checks</dt>
              <dd className="mt-0.5 font-semibold text-ink">
                {fmtInt(historical.quality_control.source_comparisons)} samples
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase text-mutedink">Max Absolute Diff</dt>
              <dd className="mt-0.5 font-semibold text-ink">
                {historical.quality_control.maximum_source_difference_mm.toFixed(1)} mm
              </dd>
            </div>
          </dl>
        </div>

        <div className="border border-hairline bg-parchment p-6 lg:col-span-6">
          <div className="border-b border-hairline pb-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-rainblue">
              Mathematical &amp; Statistical Definitions
            </span>
            <h3 className="font-editorial text-2xl font-medium text-ink">
              Formulas &amp; Multiple-Testing Controls
            </h3>
          </div>

          <div className="mt-4 space-y-4 text-xs leading-relaxed text-slateink">
            <div className="border-l-2 border-rainblue pl-3">
              <div className="font-mono font-semibold text-ink">Cosine-Latitude Area Weighting</div>
              <p className="mt-1">
                On a regular <span className="font-mono">0.25° × 0.25°</span> grid spanning <span className="font-mono">8.25°N–37.25°N</span>, daily mean rainfall is weighted by <span className="font-mono">w_i = cos(φ_i) / Σ cos(φ_j)</span> across the 4,885 complete grid cells.
              </p>
            </div>

            <div className="border-l-2 border-monsoon pl-3">
              <div className="font-mono font-semibold text-ink">Non-Parametric Trend &amp; Multiple Testing</div>
              <p className="mt-1">
                Temporal trend significance is tested via Mann–Kendall <span className="font-mono">τ</span> and slope magnitude via Theil–Sen median slope. Grid-cell testing across 4,885 locations uses Benjamini–Hochberg FDR (<span className="font-mono">α = 0.05</span>); seasonal and pairwise state comparisons use Holm step-down correction.
              </p>
            </div>

            <div className="border-l-2 border-extreme pl-3">
              <div className="font-mono font-semibold text-ink">2026 Regional Anomaly Metric vs Percentage Departure</div>
              <p className="mt-1">
                In Research 02 (<span className="font-mono">{regional.metadata.study_period}</span>), when Daily Normal is 0 mm ({120} state-days; {4228} district-days), percentage departure diverges artificially (up to <span className="font-mono">+82,735%</span>). Statistical inference therefore evaluates absolute anomaly (<span className="font-mono">Actual − Normal</span> in mm/day).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

