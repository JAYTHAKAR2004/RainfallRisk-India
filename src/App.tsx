import { useCallback, useEffect, useState } from 'react';
import type { PageRoute } from './data/types';
import { useResearchData } from './hooks/useResearchData';
import { EditorialShell } from './components/layout/EditorialShell';
import type { LightboxAsset } from './components/layout/LightboxModal';
import { HomePage } from './pages/Home/HomePage';
import { MethodologyPage } from './pages/Methodology/MethodologyPage';
import { HistoricalAnalysisPage } from './pages/HistoricalAnalysis/HistoricalAnalysisPage';
import { RegionalAnalysisPage } from './pages/RegionalAnalysis/RegionalAnalysisPage';
import { InteractiveAtlasPage } from './pages/InteractiveAtlas/InteractiveAtlasPage';
import { DataExplorerPage } from './pages/DataExplorer/DataExplorerPage';
import { FindingsPage } from './pages/Findings/FindingsPage';
import { AboutPage } from './pages/About/AboutPage';

const VALID_ROUTES: readonly PageRoute[] = [
  'home',
  'methodology',
  'historical',
  'regional',
  'atlas',
  'explorer',
  'findings',
  'about',
];

function parseRouteFromLocation(): PageRoute {
  const hash = window.location.hash;
  if (hash.startsWith('#/')) {
    const candidate = hash.slice(2).split('/')[0] as PageRoute;
    if (VALID_ROUTES.includes(candidate)) {
      return candidate;
    }
  }
  return 'home';
}

export function App() {
  const [activeRoute, setActiveRoute] = useState<PageRoute>(() => parseRouteFromLocation());
  const [lightboxAsset, setLightboxAsset] = useState<LightboxAsset | null>(null);

  const {
    historical,
    regional,
    footprint,
    statesGeo,
    districtsGeo,
    loading,
    error,
  } = useResearchData();

  useEffect(() => {
    const onHashChange = () => {
      if (!window.location.hash || window.location.hash.startsWith('#/')) {
        setActiveRoute(parseRouteFromLocation());
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = useCallback((route: PageRoute) => {
    setActiveRoute(route);
    const nextHash = `#/${route}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <EditorialShell
      activeRoute={activeRoute}
      onNavigate={handleNavigate}
      lightboxAsset={lightboxAsset}
      onCloseLightbox={() => setLightboxAsset(null)}
    >
      {loading && (
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-10">
          <div className="border border-hairline bg-parchment p-10">
            <div className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-rainblue">
              Loading Research Archives
            </div>
            <h2 className="mt-2 font-editorial text-2xl font-semibold text-ink">
              Assembling Verified Historical &amp; Regional Rainfall Datasets…
            </h2>
            <p className="mt-2 text-sm text-slateink">
              Loading 26-year NetCDF summaries (4,885 footprint cells) and Aug–Nov 2026 administrative vectors (36 States/UTs &amp; 727 districts).
            </p>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-10">
          <div className="border border-extreme bg-parchment p-8">
            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-extreme">
              Dataset Load Error
            </div>
            <h2 className="mt-2 font-editorial text-2xl font-semibold text-ink">
              Unable to load serialized research artifacts
            </h2>
            <p className="mt-2 font-mono text-xs text-slateink">{error}</p>
          </div>
        </div>
      )}

      {!loading &&
        !error &&
        historical &&
        regional &&
        footprint &&
        statesGeo &&
        districtsGeo && (
          <>
            {activeRoute === 'home' && (
              <HomePage
                historical={historical}
                regional={regional}
                footprint={footprint}
                statesGeo={statesGeo}
                districtsGeo={districtsGeo}
                onNavigate={handleNavigate}
              />
            )}

            {activeRoute === 'methodology' && (
              <MethodologyPage historical={historical} regional={regional} />
            )}

            {activeRoute === 'historical' && (
              <HistoricalAnalysisPage
                historical={historical}
                onInspectImage={setLightboxAsset}
              />
            )}

            {activeRoute === 'regional' && (
              <RegionalAnalysisPage
                regional={regional}
                onInspectImage={setLightboxAsset}
              />
            )}

            {activeRoute === 'atlas' && (
              <InteractiveAtlasPage
                regional={regional}
                footprint={footprint}
                statesGeo={statesGeo}
                districtsGeo={districtsGeo}
                onNavigate={handleNavigate}
              />
            )}

            {activeRoute === 'explorer' && (
              <DataExplorerPage historical={historical} regional={regional} />
            )}

            {activeRoute === 'findings' && (
              <FindingsPage
                historical={historical}
                regional={regional}
                onNavigate={handleNavigate}
              />
            )}

            {activeRoute === 'about' && <AboutPage onNavigate={handleNavigate} />}
          </>
        )}
    </EditorialShell>
  );
}

export default App;

