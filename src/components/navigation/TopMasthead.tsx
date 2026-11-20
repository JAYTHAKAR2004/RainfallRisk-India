import { useId, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { PageRoute } from '../../data/types';

interface TopMastheadProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

const NAV_ITEMS: { id: PageRoute; label: string; code: string }[] = [
  { id: 'home', label: 'Overview', code: '00' },
  { id: 'methodology', label: 'Methodology', code: '01' },
  { id: 'historical', label: 'Research 01 (2000–2025)', code: '02' },
  { id: 'regional', label: 'Research 02 (Aug–Nov 2026)', code: '03' },
  { id: 'atlas', label: 'India Atlas', code: '04' },
  { id: 'explorer', label: 'Data Explorer', code: '05' },
  { id: 'findings', label: 'Findings & Limits', code: '06' },
  { id: 'about', label: 'About', code: '07' },
];

/* Three layered cumulus silhouettes cycled across items for natural variation */
const CLOUD_SHAPES: readonly { wisp: string; body: string }[] = [
  {
    wisp: 'M 8 54 C 3 44, 10 28, 28 24 C 36 12, 62 7, 84 12 C 102 3, 134 4, 152 13 C 174 8, 198 16, 206 30 C 218 35, 218 52, 204 58 C 154 62, 62 63, 8 54 Z',
    body: 'M 16 58 C 6 56, 4 42, 16 32 C 16 19, 32 12, 50 16 C 64 6, 94 4, 114 12 C 134 5, 162 8, 176 18 C 194 15, 210 24, 206 36 C 216 42, 214 56, 200 59 C 148 61, 68 62, 16 58 Z',
  },
  {
    wisp: 'M 12 57 C 4 47, 8 29, 26 23 C 38 11, 66 8, 88 15 C 110 4, 146 6, 166 17 C 188 14, 208 24, 212 38 C 218 47, 212 57, 198 59 C 144 62, 60 61, 12 57 Z',
    body: 'M 18 59 C 7 55, 6 39, 19 30 C 20 17, 38 11, 58 15 C 76 7, 102 9, 120 15 C 138 4, 170 7, 186 20 C 202 20, 212 31, 208 42 C 216 48, 212 58, 196 59 C 142 61, 68 62, 18 59 Z',
  },
  {
    wisp: 'M 10 56 C 4 46, 12 30, 28 24 C 42 10, 74 5, 100 13 C 122 5, 152 8, 170 18 C 192 14, 210 24, 212 39 C 217 49, 210 58, 196 59 C 140 62, 58 61, 10 56 Z',
    body: 'M 17 58 C 7 54, 7 38, 18 29 C 22 15, 44 10, 64 16 C 82 5, 118 4, 136 14 C 154 7, 182 11, 194 23 C 208 27, 214 40, 208 49 C 213 56, 206 59, 194 59 C 138 62, 66 61, 17 58 Z',
  },
];

interface CloudNavButtonProps {
  code: string;
  label: string;
  active: boolean;
  variant: number;
  fullWidth?: boolean;
  onClick: () => void;
}

function CloudNavButton({
  code,
  label,
  active,
  variant,
  fullWidth = false,
  onClick,
}: CloudNavButtonProps) {
  const uid = useId().replace(/:/g, '');
  const shape = CLOUD_SHAPES[variant % CLOUD_SHAPES.length];
  const activeGradId = `cloud-active-${uid}`;
  const hoverGradId = `cloud-hover-${uid}`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`nav-cloud-btn group relative inline-flex items-center px-3 py-1.5 text-left ${
        fullWidth ? 'w-full justify-start px-4 py-2' : 'whitespace-nowrap'
      }`}
    >
      {/* Organic monsoon cloud silhouette */}
      <svg
        viewBox="0 0 220 68"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-x-1 -inset-y-1.5 h-[calc(100%+12px)] w-[calc(100%+8px)] overflow-visible transition-all duration-300 ease-out ${
          active
            ? 'opacity-100 scale-100 [filter:drop-shadow(0_3px_10px_rgba(7,21,34,0.5))]'
            : 'opacity-0 scale-[0.97] group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100'
        }`}
      >
        <defs>
          <linearGradient id={activeGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F1F7FB" />
            <stop offset="52%" stopColor="#DCE8EF" />
            <stop offset="100%" stopColor="#B8CFE0" />
          </linearGradient>
          <linearGradient id={hoverGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#465E6F" stopOpacity="0.82" />
            <stop offset="58%" stopColor="#213D53" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10283B" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Secondary distant mist wisp */}
        <path
          d={shape.wisp}
          fill={active ? 'rgba(217, 232, 243, 0.34)' : 'rgba(114, 156, 181, 0.22)'}
        />

        {/* Primary cumulus silhouette */}
        <path
          d={shape.body}
          fill={active ? `url(#${activeGradId})` : `url(#${hoverGradId})`}
          stroke={active ? 'rgba(255, 255, 255, 0.85)' : 'rgba(217, 232, 243, 0.4)'}
          strokeWidth={active ? '1.15' : '0.9'}
          vectorEffect="non-scaling-stroke"
          className="group-focus-visible:stroke-[#D9E8F3] group-focus-visible:[stroke-width:1.8px]"
        />
      </svg>

      {/* Preserved 00-07 numbering and editorial sans label */}
      <span className="relative z-10 flex items-baseline">
        <span
          className={`mr-1.5 font-mono text-[10px] transition-colors duration-200 ${
            active
              ? 'text-[#1E4A6D]'
              : 'text-mutedink group-hover:text-lightning/80 group-focus-visible:text-lightning/90'
          }`}
        >
          {code}
        </span>
        <span
          className={`text-xs font-medium transition-colors duration-200 ${
            active
              ? 'font-semibold text-[#071522]'
              : 'text-slateink group-hover:text-ink group-focus-visible:text-ink'
          }`}
        >
          {label}
        </span>
      </span>
    </button>
  );
}

export function TopMasthead({ activeRoute, onNavigate }: TopMastheadProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-ivory/95 backdrop-blur-sm">
      {/* Top scientific provenance & disclaimer strip */}
      <div className="border-b border-hairline bg-atlas px-4 py-1.5 text-[11px] text-slateink sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono">
            <span className="font-semibold text-ink">CLIMATE STATISTICAL RESEARCH MONOGRAPH</span>
            <span className="hidden text-mutedink sm:inline">|</span>
            <span>SOURCE: INDIA METEOROLOGICAL DEPARTMENT (IMD)</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-extreme">
            Statistical Investigation Only — Not an Operational Flood Forecast or Real-Time Weather Service
          </div>
        </div>
      </div>

      {/* Main masthead bar */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={() => {
            onNavigate('home');
            setMobileOpen(false);
          }}
          className="group flex items-baseline gap-3 text-left"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-ink">
            RainfallRisk India
          </span>
          <span className="hidden font-editorial text-sm italic text-mutedink md:inline">
            26-Year Gridded &amp; 2026 Regional Evidence
          </span>
        </button>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1.5 xl:flex">
          {NAV_ITEMS.map((item, idx) => (
            <CloudNavButton
              key={item.id}
              code={item.code}
              label={item.label}
              active={activeRoute === item.id}
              variant={idx}
              onClick={() => onNavigate(item.id)}
            />
          ))}
        </nav>

        {/* Compact navigation trigger for tablet & mobile */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="nav-cloud-btn group relative inline-flex items-center gap-2 px-4 py-2 font-mono text-xs text-ink xl:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            viewBox="0 0 220 68"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-1 -inset-y-1 h-[calc(100%+8px)] w-[calc(100%+8px)] overflow-visible"
          >
            <path
              d={CLOUD_SHAPES[1].body}
              fill={mobileOpen ? 'rgba(220, 232, 239, 0.92)' : 'rgba(33, 61, 83, 0.85)'}
              stroke={mobileOpen ? 'rgba(255, 255, 255, 0.85)' : 'rgba(114, 156, 181, 0.45)'}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className={`relative z-10 inline-flex items-center gap-2 ${mobileOpen ? 'text-[#071522]' : 'text-ink'}`}>
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span>{NAV_ITEMS.find((n) => n.id === activeRoute)?.label}</span>
          </span>
        </button>
      </div>

      {/* Tablet / mobile dropdown */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-hairline bg-parchment px-4 py-3 sm:px-6 xl:hidden"
        >
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
            {NAV_ITEMS.map((item, idx) => (
              <CloudNavButton
                key={item.id}
                code={item.code}
                label={item.label}
                active={activeRoute === item.id}
                variant={idx}
                fullWidth
                onClick={() => {
                  onNavigate(item.id);
                  setMobileOpen(false);
                }}
              />
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
