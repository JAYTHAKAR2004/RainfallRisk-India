import { ArrowRight, Compass, FileSpreadsheet } from 'lucide-react';
import type {
  FootprintCellsBundle,
  GeoFeatureCollection,
  HistoricalDataBundle,
  PageRoute,
  RegionalDataBundle,
} from '../../data/types';
import { fmtInt } from '../../utils/formatters';
import { MonsoonSkyHero } from '../../components/sky/MonsoonSkyHero';
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

  return (
    <div>
      <MonsoonSkyHero annual={historical.annual_statistics} onNavigate={onNavigate} />

      {/* Beneath the cloud base: four measured signals */}
      <section className="relative border-b border-hairline bg-gradient-to-b from-[#0B1C2B] to-ivory">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-hairline pb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-rainblue">
              Beneath the cloud base · Four measured signals
            </span>
            <span className="font-mono text-[11px] text-mutedink">Sources: project.ipynb · outputs_project2/</span>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

