import { ArrowRight, Code2, Database, FileCode2, Info, ShieldCheck } from 'lucide-react';
import type { PageRoute } from '../../data/types';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

const PYTHON_STACK = [
  { name: 'xarray & netCDF4', role: 'CF-compliant NetCDF ingestion, time-axis alignment & common-footprint masking' },
  { name: 'pandas & numpy', role: 'Panel balancing, cosine-latitude area weighting & departure stability audits' },
  { name: 'scipy.stats & statsmodels', role: 'Friedman, Wilcoxon signed-rank, Welch ANOVA, Kruskal–Wallis, Ljung–Box & FDR/Holm' },
  { name: 'matplotlib & seaborn', role: 'Static publication-grade cartographic plates, trend maps & GIF frame synthesis' },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="mx-auto max-w-[1400px] space-y-12 px-4 py-12 sm:px-6 lg:px-10">
      {/* Header */}
      <header className="border-b border-ink pb-8">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-rainblue">
          Project Documentation · Provenance &amp; Scope
        </div>
        <h1 className="mt-2 font-editorial text-4xl font-semibold text-ink sm:text-5xl">
          About RainfallRisk India
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slateink">
          RainfallRisk India unites two reproducible Python/Jupyter meteorological investigations into a single interactive research platform: a 26-year historical gridded analysis (<span className="font-mono text-ink">2000–2025</span>) and a contemporary state-and-district statistical audit (<span className="font-mono text-ink">19 Aug – 12 Nov 2026</span>).
        </p>
      </header>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Attribution & Reproducibility */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border border-hairline bg-parchment p-6 space-y-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-rainblue">
              <Database className="h-4 w-4" />
              Source Data Attribution (IMD Archives)
            </div>
            <p className="text-sm leading-relaxed text-slateink">
              All precipitation measurements originate from the <strong className="text-ink">India Meteorological Department (IMD)</strong> datasets archived within the workspace <span className="font-mono text-ink">Dataset/</span> directory:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slateink">
              <li>
                <strong className="text-ink">Research 01 Gridded Archive:</strong> 26 yearly NetCDF files at <span className="font-mono">0.25° × 0.25°</span> resolution spanning 1 January 2000 through 31 December 2025 (9,497 daily time steps).
              </li>
              <li>
                <strong className="text-ink">Research 02 Sub-National Bulletins:</strong> Daily State/UT and District actual vs. normal rainfall tables spanning 19 August to 12 November 2026 (85 reporting dates; 31 October 2026 unrecorded).
              </li>
              <li>
                <strong className="text-ink">Cartographic Geometry:</strong> Official Local Government Directory (LGD) State/UT and District vector boundaries paired strictly against reporting units without synthetic interpolation for unreported jurisdictions.
              </li>
            </ul>
          </div>

          <div className="border border-hairline bg-parchment p-6 space-y-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-monsoon">
              <Code2 className="h-4 w-4" />
              Reproducible Python Analytical Stack
            </div>
            <p className="text-sm leading-relaxed text-slateink">
              Statistical tables, extreme indices, and plates were computed in reproducible Python notebooks before being serialized verbatim for this web visualization platform:
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PYTHON_STACK.map((item) => (
                <div key={item.name} className="border border-hairline bg-ivory p-3.5">
                  <div className="font-mono text-xs font-semibold text-ink">{item.name}</div>
                  <p className="mt-1 text-xs leading-relaxed text-slateink">{item.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-hairline bg-parchment p-6 space-y-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-ink">
              <FileCode2 className="h-4 w-4 text-rainblue" />
              Researcher &amp; Project Record
            </div>
            <p className="text-sm leading-relaxed text-slateink">
              Developed as an independent statistical and meteorological data science project (<span className="font-mono text-ink">RainfallRisk India</span>) built directly around verified notebook workflows (<span className="font-mono text-ink">project.ipynb</span>), serialized statistical outputs (<span className="font-mono text-ink">outputs/</span> and <span className="font-mono text-ink">outputs_project2/</span>), and reproducible data preparation scripts (<span className="font-mono text-ink">scripts/build_web_data.py</span>).
            </p>
            <p className="text-xs leading-relaxed text-mutedink">
              Note: Original notebooks, raw datasets, and statistical output CSVs/figures remain untouched; every statistic displayed in the interface traces directly to serialized computation artifacts.
            </p>
          </div>
        </div>

        {/* Right Column: Scientific Disclaimer & Quick Navigation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-extreme/50 border-t-2 border-t-extreme bg-parchment p-6 space-y-3">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-extreme">
              <ShieldCheck className="h-4 w-4" />
              Research Scope &amp; Non-Operational Disclaimer
            </div>
            <h2 className="font-editorial text-2xl font-semibold text-ink">
              Statistical Analysis, Not Forecasting
            </h2>
            <p className="text-sm leading-relaxed text-slateink">
              RainfallRisk India is strictly an <strong className="text-ink">exploratory retrospective statistical investigation</strong>. It is NOT an operational flood warning platform, disaster response system, or real-time weather prediction service.
            </p>
            <p className="text-sm leading-relaxed text-slateink">
              For official real-time weather warnings, nowcasts, or civil flood advisories across India, consult the official India Meteorological Department (IMD) and Central Water Commission (CWC) portals.
            </p>
          </div>

          <div className="border border-hairline bg-parchment p-6 space-y-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-ink">
              <Info className="h-4 w-4 text-rainblue" />
              Frontend Presentation Stack
            </div>
            <p className="text-xs leading-relaxed text-slateink">
              This research publication interface is built with React, TypeScript, Tailwind CSS, Recharts, and D3-Geo using a deterministic editorial typography system (Newsreader, IBM Plex Sans, and IBM Plex Mono).
            </p>
            <div className="space-y-2 border-t border-hairline pt-4">
              <button
                type="button"
                onClick={() => onNavigate('methodology')}
                className="flex w-full items-center justify-between border border-hairline bg-ivory px-3.5 py-2.5 font-mono text-xs text-ink transition hover:border-ink"
              >
                <span>Inspect 9-Stage Methodology Pipeline</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('findings')}
                className="flex w-full items-center justify-between border border-hairline bg-ivory px-3.5 py-2.5 font-mono text-xs text-ink transition hover:border-ink"
              >
                <span>Review Limitations &amp; Epistemic Audit</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('explorer')}
                className="flex w-full items-center justify-between border border-ink bg-ink px-3.5 py-2.5 font-mono text-xs text-ivory transition hover:bg-rainblue"
              >
                <span>Download Verbatim Output CSVs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

