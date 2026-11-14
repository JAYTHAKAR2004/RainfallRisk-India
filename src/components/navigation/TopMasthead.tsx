import { useState } from 'react';
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
        <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`border px-2.5 py-1.5 text-left transition ${
                  active
                    ? 'border-ink bg-ink text-ivory'
                    : 'border-transparent text-slateink hover:border-hairline hover:bg-parchment hover:text-ink'
                }`}
              >
                <span className={`mr-1.5 font-mono text-[10px] ${active ? 'text-ivory/75' : 'text-mutedink'}`}>
                  {item.code}
                </span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Compact navigation trigger for tablet & mobile */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex items-center gap-2 border border-hairline bg-parchment px-3 py-1.5 font-mono text-xs text-ink xl:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span>{NAV_ITEMS.find((n) => n.id === activeRoute)?.label}</span>
        </button>
      </div>

      {/* Tablet / mobile dropdown */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-hairline bg-parchment px-4 py-3 sm:px-6 xl:hidden"
        >
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-4">
            {NAV_ITEMS.map((item) => {
              const active = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center gap-2 border px-3 py-2 text-left text-xs font-medium transition ${
                    active
                      ? 'border-ink bg-ink text-ivory'
                      : 'border-hairline bg-ivory text-slateink hover:border-ink hover:text-ink'
                  }`}
                >
                  <span className={`font-mono text-[10px] ${active ? 'text-ivory/70' : 'text-mutedink'}`}>
                    {item.code}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}

