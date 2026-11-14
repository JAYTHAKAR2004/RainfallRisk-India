import { ArrowRight, Compass, Database, FileSpreadsheet, Map } from 'lucide-react';
import type {
  FootprintCellsBundle,
  GeoFeatureCollection,
  HistoricalDataBundle,
  PageRoute,
  RegionalDataBundle,
} from '../../data/types';
import { fmtInt, fmtNum } from '../../utils/formatters';
import { StatCallout } from '../../components/research/StatCallout';
import { InteractiveIndiaMap } from '../../components/maps/InteractiveIndiaMap';

interface HomePageProps {
  historical: HistoricalDataBundle;
  regional: RegionalDataBundle;
  footprint: FootprintCellsBundle;
  statesGeo: GeoFeatureCollection;
  districtsGeo: GeoFeatureCollection;
  onNavigate: (route: PageRoute) => void;
}

export function HomePage({
  historical,
  regional,
  footprint,
  statesGeo,
  districtsGeo,
  onNavigate,
}: HomePageProps) {
  const maxAnnual = Math.max(...historical.annual_statistics.map((r) => r.Annual_Rainfall_mm));
  const minAnnual = Math.min(...historical.annual_statistics.map((r) => r.Annual_Rainfall_mm));

  return (
    <div>
      {/* Editorial Hero Section */}
      <section className="bg-atlas-grid border-b border-ink">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left Editorial Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 border border-ink bg-parchment px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
                <span>RainfallRisk India</span>
                <span className="text-mutedink">·</span>
                <span className="text-rainblue">Research Edition</span>
              </div>

              <h1 className="mt-6 font-editorial text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
                Reading India&apos;s Rainfall.{' '}
                <span className="italic text-rainblue">Beyond the Numbers.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slateink sm:text-lg">
                An exploratory statistical investigation of historical rainfall variability, extreme precipitation, seasonal characteristics, and regional rainfall differences across India.
              </p>

              {/* Prominent Dual Study Periods */}
              <div className="mt-7 grid grid-cols-1 gap-4 border-y border-ink bg-parchment/85 p-4 sm:grid-cols-2">
                <div className="border-l-2 border-rainblue pl-3.5">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-rainblue">
                    Study Horizon 01 · Historical Gridded
                  </div>
                  <div className="mt-1 font-editorial text-2xl font-semibold text-ink">
                    2000 – 2025
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-slateink">
                    26 yearly IMD NetCDF files · 9,497 continuous days · 4,885 common-footprint cells
                  </div>
                </div>

                <div className="border-l-2 border-extreme pl-3.5">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-extreme">
                    Study Horizon 02 · Recent Regional
                  </div>
                  <div className="mt-1 font-editorial text-2xl font-semibold text-ink">
                    19 Aug – 12 Nov 2026
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-slateink">
                    36 States/UTs (3,060 obs) · 727 balanced districts (61,795 obs) · missing 31 Oct
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('historical')}
                  className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-ivory transition hover:bg-rainblue"
                >
                  <span>Explore the Research</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('atlas')}
                  className="inline-flex items-center gap-2 border border-ink bg-parchment px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider text-ink transition hover:bg-atlas"
                >
                  <Map className="h-4 w-4 text-rainblue" />
                  <span>Interactive India Atlas</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('explorer')}
                  className="inline-flex items-center gap-2 border border-hairline bg-parchment px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider text-slateink transition hover:border-ink hover:text-ink"
                >
                  <Database className="h-4 w-4" />
                  <span>Data Explorer</span>
                </button>
              </div>
            </div>

            {/* Right Visual Composition: Actual Annual Map Animation + Hyetograph Barcode */}
            <div className="lg:col-span-5">
              <div className="border border-ink bg-parchment shadow-sm">
                <div className="flex items-center justify-between border-b border-hairline bg-ivory px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-slateink">
                  <span>FIG. 0.1 · 2000–2025 ANNUAL SPATIAL SERIES</span>
                  <span className="text-rainblue">0.25° × 0.25° IMD</span>
                </div>
                <div className="bg-white p-3">
                  <img
                    src="/Annual_Rainfall_Maps/India_Annual_Rainfall_Animation_2000_2025.gif"
                    alt="Animated annual rainfall maps across India 2000–2025"
                    className="mx-auto max-h-[300px] w-auto object-contain"
                  />
                </div>
                {/* 26-Year Hyetograph Strip built from exact annual statistics */}
                <div className="border-t border-hairline bg-ivory/75 p-4">
                  <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-wider text-mutedink">
                    <span>Footprint Mean Annual Rainfall (2000–2025)</span>
                    <span className="text-ink">Mean: 1,149.60 mm/yr</span>
                  </div>
                  <div className="mt-2.5 flex h-16 items-end gap-[3px]" role="img" aria-label="2000 to 2025 annual rainfall sparkline">
                    {historical.annual_statistics.map((row) => {
                      const pct = ((row.Annual_Rainfall_mm - minAnnual * 0.85) / (maxAnnual - minAnnual * 0.85)) * 100;
                      let color = '#6FA3C7';
                      if (row.Year === 2020) color = '#1E7A6E';
                      else if (row.Year === 2002) color = '#C85A28';
                      else if (row.Annual_Rainfall_mm >= 1149.603) color = '#1D5B86';
                      return (
                        <div
                          key={row.Year}
                          title={`${row.Year}: ${fmtNum(row.Annual_Rainfall_mm, 1)} mm`}
                          className="flex-1 transition-opacity hover:opacity-75"
                          style={{
                            height: `${Math.max(18, pct)}%`,
                            backgroundColor: color,
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="mt-1.5 flex justify-between font-mono text-[10px] text-mutedink">
                    <span>2000</span>
                    <span className="text-extreme">2002 (947.1 mm min)</span>
                    <span className="text-monsoon">2020 (1,285.9 mm max)</span>
                    <span>2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Headline Evidence Strip */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCallout
              label="26-Year Footprint Mean"
              value="1,149.60"
              unit="mm/year"
              note="Area-weighted average across 4,885 complete grid cells (28.05% of the 17,415-cell grid)."
              tone="rain"
            />
            <StatCallout
              label="SW Monsoon Concentration"
              value="75.28"
              unit="% share"
              note="865.38 mm mean during June–September; Friedman χ² = 70.94 (p = 2.69 × 10⁻¹⁵)."
              tone="monsoon"
            />
            <StatCallout
              label="2026 Paired Anomaly"
              value="-0.80"
              unit="mm/day"
              note="Mean actual minus normal across 727 districts (Aug–Nov 2026); Wilcoxon p = 2.64 × 10⁻²⁰."
              tone="extreme"
            />
            <StatCallout
              label="2026 Peak District Event"
              value="231.9"
              unit="mm/day"
              note="Nabarangapur, Odisha on 25 Sep 2026; 99 district-days ≥ 100 mm (8 exceeded 200 mm)."
              tone="extreme"
            />
          </div>
        </div>
      </section>

      {/* Two Research Pathways Section */}
      <section className="border-b border-hairline bg-parchment py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink pb-4">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rainblue">
                Unified Architecture
              </span>
              <h2 className="mt-1 font-editorial text-3xl font-semibold text-ink">
                Two Complementary Research Pathways
              </h2>
            </div>
            <p className="max-w-xl text-xs leading-relaxed text-slateink">
              The 2000–2025 gridded NetCDF investigation and the Aug–Nov 2026 administrative unit study examine distinct datasets and horizons, united under one rigorous statistical framework.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Pathway 1 */}
            <article className="flex flex-col justify-between border border-ink bg-ivory p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between border-b border-hairline pb-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-rainblue">
                    Research 01 · project.ipynb
                  </span>
                  <span className="font-mono text-xs text-mutedink">2000–2025</span>
                </div>
                <h3 className="mt-4 font-editorial text-2xl font-semibold text-ink sm:text-3xl">
                  Historical Gridded Rainfall Analysis
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slateink">
                  Constructed from 26 yearly IMD NetCDF archives (17,415 grid points), harmonized onto a strict 4,885-cell common spatial footprint to preserve temporal comparability without treating missing cells as zero.
                </p>

                <ul className="mt-5 space-y-2 border-t border-hairline pt-4 text-xs text-ink">
                  <li className="flex items-baseline justify-between border-b border-hairline/70 pb-1.5">
                    <span>Continuous Daily Observations</span>
                    <span className="font-mono font-semibold">{fmtInt(historical.metadata.daily_observations)} days</span>
                  </li>
                  <li className="flex items-baseline justify-between border-b border-hairline/70 pb-1.5">
                    <span>Common-Footprint Grid Coverage</span>
                    <span className="font-mono font-semibold">4,885 cells (28.05%)</span>
                  </li>
                  <li className="flex items-baseline justify-between border-b border-hairline/70 pb-1.5">
                    <span>Standardized Extreme Indices</span>
                    <span className="font-mono font-semibold">8 ETCCDI metrics</span>
                  </li>
                  <li className="flex items-baseline justify-between">
                    <span>Spatial Trend Assessment</span>
                    <span className="font-mono font-semibold">Mann–Kendall + BH FDR</span>
                  </li>
                </ul>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('historical')}
                  className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 font-mono text-xs text-ivory transition hover:bg-rainblue"
                >
                  <span>Open Research 01</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('methodology')}
                  className="inline-flex items-center gap-2 border border-hairline bg-parchment px-4 py-2.5 font-mono text-xs text-ink transition hover:border-ink"
                >
                  <Compass className="h-3.5 w-3.5" />
                  <span>Inspect Methodology</span>
                </button>
              </div>
            </article>

            {/* Pathway 2 */}
            <article className="flex flex-col justify-between border border-ink bg-ivory p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between border-b border-hairline pb-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-extreme">
                    Research 02 · outputs_project2
                  </span>
                  <span className="font-mono text-xs text-mutedink">19 Aug – 12 Nov 2026</span>
                </div>
                <h3 className="mt-4 font-editorial text-2xl font-semibold text-ink sm:text-3xl">
                  State &amp; District Rainfall Analysis
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slateink">
                  Administrative-scale investigation comparing daily actual rainfall against IMD normal baselines across 36 States/UTs and 727 balanced districts, diagnosing percentage-departure instability and extreme event clustering.
                </p>

                <ul className="mt-5 space-y-2 border-t border-hairline pt-4 text-xs text-ink">
                  <li className="flex items-baseline justify-between border-b border-hairline/70 pb-1.5">
                    <span>State/UT Panel (85 dates, missing 31 Oct)</span>
                    <span className="font-mono font-semibold">36 units (3,060 obs)</span>
                  </li>
                  <li className="flex items-baseline justify-between border-b border-hairline/70 pb-1.5">
                    <span>Balanced District Panel (+ Nagapattinam isolated)</span>
                    <span className="font-mono font-semibold">727 districts (61,795 obs)</span>
                  </li>
                  <li className="flex items-baseline justify-between border-b border-hairline/70 pb-1.5">
                    <span>Extreme District-Days (≥ 100 mm / &gt; 200 mm)</span>
                    <span className="font-mono font-semibold">99 events / 8 events</span>
                  </li>
                  <li className="flex items-baseline justify-between">
                    <span>Non-Parametric Group &amp; Paired Tests</span>
                    <span className="font-mono font-semibold">Welch · KW · Dunn · Wilcoxon</span>
                  </li>
                </ul>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('regional')}
                  className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 font-mono text-xs text-ivory transition hover:bg-extreme"
                >
                  <span>Open Research 02</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('explorer')}
                  className="inline-flex items-center gap-2 border border-hairline bg-parchment px-4 py-2.5 font-mono text-xs text-ink transition hover:border-ink"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  <span>Query 727 Districts</span>
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Embedded Interactive Atlas Preview */}
      <section className="py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-4">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-monsoon">
                Cartographic Interface
              </span>
              <h2 className="mt-1 font-editorial text-3xl font-semibold text-ink">
                Interactive Geographical Exploration
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('atlas')}
              className="inline-flex items-center gap-1.5 border border-ink bg-parchment px-3.5 py-2 font-mono text-xs text-ink transition hover:bg-ink hover:text-ivory"
            >
              <span>Full-Screen Atlas &amp; Controls</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <InteractiveIndiaMap
            statesGeo={statesGeo}
            districtsGeo={districtsGeo}
            footprint={footprint}
            extremeEvents={regional.extreme_events_all}
            initialLayer="states"
            compact
          />
        </div>
      </section>
    </div>
  );
}

