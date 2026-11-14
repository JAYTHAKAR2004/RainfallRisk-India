import { ArrowRight, Layers, MapPin, ShieldAlert } from 'lucide-react';
import type {
  FootprintCellsBundle,
  GeoFeatureCollection,
  PageRoute,
  RegionalDataBundle,
} from '../../data/types';
import { fmtInt, fmtNum } from '../../utils/formatters';
import { InteractiveIndiaMap } from '../../components/maps/InteractiveIndiaMap';

interface InteractiveAtlasPageProps {
  regional: RegionalDataBundle;
  footprint: FootprintCellsBundle;
  statesGeo: GeoFeatureCollection;
  districtsGeo: GeoFeatureCollection;
  onNavigate: (route: PageRoute) => void;
}

export function InteractiveAtlasPage({
  regional,
  footprint,
  statesGeo,
  districtsGeo,
  onNavigate,
}: InteractiveAtlasPageProps) {
  const meta = regional.metadata;

  return (
    <div className="mx-auto max-w-[1400px] space-y-10 px-4 py-10 sm:px-6 lg:px-10">
      {/* Editorial Atlas Header */}
      <header className="border-b border-ink pb-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-rainblue">
              Cartographic Plate · Multi-Resolution Spatial Explorer
            </div>
            <h1 className="mt-2 font-editorial text-4xl font-semibold text-ink sm:text-5xl">
              Interactive Rainfall Atlas of India
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slateink">
              Examine Indian precipitation across two observational architectures: official Local Government Directory (LGD) administrative boundaries from Research 02 (Aug–Nov 2026) and the high-resolution <span className="font-mono text-ink">0.25° × 0.25°</span> gridded common spatial footprint from Research 01 (2000–2025).
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('historical')}
              className="inline-flex items-center gap-2 border border-hairline bg-parchment px-3.5 py-2 font-mono text-xs text-ink transition hover:border-ink"
            >
              Read Research 01 <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('regional')}
              className="inline-flex items-center gap-2 border border-ink bg-ink px-3.5 py-2 font-mono text-xs text-ivory transition hover:bg-rainblue"
            >
              Read Research 02 <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Three Spatial Layers Explanation */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="border border-hairline bg-parchment p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-monsoon">
              <Layers className="h-3.5 w-3.5" />
              Layer 01 · State Choropleth
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slateink">
              Covers <strong className="text-ink">{fmtInt(meta.state_units)} States &amp; UTs</strong> ({fmtInt(meta.state_total_observations)} balanced observations across {meta.reporting_dates_per_unit} dates, missing {meta.missing_date}). Toggle between Mean Actual Rainfall, Anomaly, CV%, Extreme District Counts, and Holm-adjusted Wilcoxon direction.
            </p>
          </div>

          <div className="border border-hairline bg-parchment p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-rainblue">
              <MapPin className="h-3.5 w-3.5" />
              Layer 02 · District Choropleth
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slateink">
              Matches <strong className="text-ink">{fmtInt(meta.balanced_districts)} balanced IMD districts</strong> plus the incomplete <strong className="text-extreme">Nagapattinam</strong> feed ({regional.nagapattinam_incomplete.Observation_Count ? fmtInt(Number(regional.nagapattinam_incomplete.Observation_Count)) : '36'} days) and overlays all <strong className="text-ink">{fmtInt(meta.extreme_summary.total_events_ge_100mm)} extreme events ≥ 100 mm</strong>. Unreported newer LGD polygons remain explicitly unshaded.
            </p>
          </div>

          <div className="border border-extreme/40 bg-parchment p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-extreme">
              <ShieldAlert className="h-3.5 w-3.5" />
              Layer 03 · Historical 4,885-Cell Grid
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slateink">
              Displays only the <strong className="text-ink">{fmtInt(footprint.common_footprint_cells)} valid grid cells</strong> (<strong className="text-ink">{fmtNum(footprint.coverage_percent, 2)}%</strong> of the {fmtInt(footprint.total_grid_cells)}-cell matrix), not 100% Indian land coverage. {fmtInt(footprint.no_data_cells)} exterior ocean/non-domain cells and {fmtInt(footprint.intermittent_cells)} intermittent edge cells are masked out.
            </p>
          </div>
        </div>
      </header>

      {/* Main Full-Width Interactive Map Workbench */}
      <InteractiveIndiaMap
        statesGeo={statesGeo}
        districtsGeo={districtsGeo}
        footprint={footprint}
        extremeEvents={regional.extreme_events_all}
        initialLayer="states"
        compact={false}
      />

      {/* Cartographic Reading Guide */}
      <section className="grid grid-cols-1 gap-6 border-t border-hairline pt-8 md:grid-cols-2">
        <div className="border border-hairline bg-parchment p-5">
          <h3 className="font-editorial text-xl font-semibold text-ink">
            Boundary Alignment &amp; Missingness Discipline
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slateink">
            LGD administrative shapefiles contain {districtsGeo.features.length} official polygons, whereas IMD daily district bulletins reported {meta.balanced_districts} balanced districts and 1 incomplete district (Nagapattinam). Rather than synthesizing spatial averages for unmapped or split jurisdictions, missing polygons remain neutral parchment with clear tooltip disclosure.
          </p>
        </div>

        <div className="border border-hairline bg-parchment p-5">
          <h3 className="font-editorial text-xl font-semibold text-ink">
            Interpreting Grid-Cell Trends vs. Administrative Means
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slateink">
            The 2000–2025 common footprint grid encodes multi-decadal Sen slopes and Benjamini–Hochberg FDR significance across 8 ETCCDI indices, whereas the State/District layers summarize the 85-date Aug–Nov 2026 sub-national panel. These represent distinct temporal windows and observational products combined under one atlas for spatial synthesis.
          </p>
        </div>
      </section>
    </div>
  );
}

