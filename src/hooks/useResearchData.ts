import { useEffect, useState } from 'react';
import type {
  FootprintCellsBundle,
  GeoFeatureCollection,
  HistoricalDataBundle,
  RegionalDataBundle,
} from '../data/types';

export interface ResearchDatasets {
  historical: HistoricalDataBundle | null;
  regional: RegionalDataBundle | null;
  footprint: FootprintCellsBundle | null;
  statesGeo: GeoFeatureCollection | null;
  districtsGeo: GeoFeatureCollection | null;
  loading: boolean;
  error: string | null;
}

let cachedData: Omit<ResearchDatasets, 'loading' | 'error'> | null = null;

export function useResearchData(): ResearchDatasets {
  const [state, setState] = useState<ResearchDatasets>({
    historical: cachedData?.historical ?? null,
    regional: cachedData?.regional ?? null,
    footprint: cachedData?.footprint ?? null,
    statesGeo: cachedData?.statesGeo ?? null,
    districtsGeo: cachedData?.districtsGeo ?? null,
    loading: !cachedData,
    error: null,
  });

  useEffect(() => {
    if (cachedData) return;
    let active = true;

    async function loadAll() {
      try {
        const [histRes, regRes, footRes, stGeoRes, dtGeoRes] = await Promise.all([
          fetch('/data/historical_data.json'),
          fetch('/data/regional_data.json'),
          fetch('/data/footprint_cells.json'),
          fetch('/data/india_states.geojson'),
          fetch('/data/india_districts.geojson'),
        ]);

        if (!histRes.ok || !regRes.ok || !footRes.ok || !stGeoRes.ok || !dtGeoRes.ok) {
          throw new Error('Failed to load one or more verified research data bundles.');
        }

        const [historical, regional, footprint, statesGeo, districtsGeo] = await Promise.all([
          histRes.json(),
          regRes.json(),
          footRes.json(),
          stGeoRes.json(),
          dtGeoRes.json(),
        ]);

        cachedData = { historical, regional, footprint, statesGeo, districtsGeo };
        if (active) {
          setState({
            ...cachedData,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (active) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: err instanceof Error ? err.message : 'Unknown error loading research datasets.',
          }));
        }
      }
    }

    loadAll();
    return () => {
      active = false;
    };
  }, []);

  return state;
}

