import type { ReactNode } from 'react';
import type { PageRoute } from '../../data/types';
import { TopMasthead } from '../navigation/TopMasthead';
import { LightboxModal, type LightboxAsset } from './LightboxModal';

interface EditorialShellProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  lightboxAsset: LightboxAsset | null;
  onCloseLightbox: () => void;
  children: ReactNode;
}

export function EditorialShell({
  activeRoute,
  onNavigate,
  lightboxAsset,
  onCloseLightbox,
  children,
}: EditorialShellProps) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <TopMasthead activeRoute={activeRoute} onNavigate={onNavigate} />

      <main>{children}</main>

      <footer className="mt-20 border-t-2 border-ink bg-atlas">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                RainfallRisk India
              </div>
              <p className="mt-2 font-editorial text-lg italic text-slateink">
                Understanding India&apos;s rainfall patterns through 26 years of historical evidence and regional rainfall analysis.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-mutedink">
                This platform presents verified statistical analyses compiled from the project&apos;s Jupyter Notebooks and India Meteorological Department (IMD) rainfall archives. It is an exploratory statistical study and is not designed for operational flood forecasting or real-time weather prediction.
              </p>
            </div>

            <div className="md:col-span-4">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-mutedink">
                Research Components
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-slateink">
                <li>
                  <button type="button" onClick={() => onNavigate('historical')} className="hover:text-ink hover:underline">
                    Research 01 — 2000–2025 Historical Gridded Analysis (4,885 cells)
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('regional')} className="hover:text-ink hover:underline">
                    Research 02 — Aug–Nov 2026 State (36) &amp; District (727) Analysis
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('atlas')} className="hover:text-ink hover:underline">
                    Interactive Cartographic Atlas of India
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('explorer')} className="hover:text-ink hover:underline">
                    Data Explorer &amp; Verified CSV Archive
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-mutedink">
                Data Provenance
              </div>
              <dl className="mt-3 space-y-1.5 font-mono text-[11px] text-slateink">
                <div className="flex justify-between border-b border-hairline pb-1">
                  <dt className="text-mutedink">Gridded Period</dt>
                  <dd>2000–2025 (9,497 d)</dd>
                </div>
                <div className="flex justify-between border-b border-hairline pb-1">
                  <dt className="text-mutedink">Regional Period</dt>
                  <dd>19 Aug–12 Nov 2026</dd>
                </div>
                <div className="flex justify-between border-b border-hairline pb-1">
                  <dt className="text-mutedink">Missing Date (2026)</dt>
                  <dd>2026-10-31</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-mutedink">Computing Stack</dt>
                  <dd>Python 3.12 · SciPy</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </footer>

      <LightboxModal asset={lightboxAsset} onClose={onCloseLightbox} />
    </div>
  );
}

