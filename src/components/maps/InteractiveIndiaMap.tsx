import { useMemo, useRef, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import type {
  ExtremeDistrictEventRow,
  FootprintCellsBundle,
  GeoFeatureCollection,
} from '../../data/types';
import { fmtNum, fmtSigned } from '../../utils/formatters';
import { MapInspectorPanel } from './MapInspectorPanel';
import { MapLegend, type LegendStop } from './MapLegend';

type MapLayer = 'states' | 'districts' | 'footprint';
type StateMetric = 'meanActual' | 'anomaly' | 'cv' | 'extremes' | 'wilcoxon';
type DistrictMetric = 'meanActual' | 'anomaly' | 'maxDaily' | 'cv' | 'rainyDays';
type FootprintIndex = 'PRCPTOT' | 'SDII' | 'Rx1day' | 'Rx5day' | 'R10mm' | 'R20mm' | 'CDD' | 'CWD';

interface InteractiveIndiaMapProps {
  statesGeo: GeoFeatureCollection;
  districtsGeo: GeoFeatureCollection;
  footprint: FootprintCellsBundle;
  extremeEvents: ExtremeDistrictEventRow[];
  initialLayer?: MapLayer;
  compact?: boolean;
}

const WIDTH = 780;
const HEIGHT = 840;

function colorMeanRainfall(val: number | null | undefined): string {
  if (val === null || val === undefined || Number.isNaN(val)) return '#0F2232';
  if (val >= 10) return '#DCE8EF';
  if (val >= 7) return '#93BAD0';
  if (val >= 4.5) return '#5A90B0';
  if (val >= 2.5) return '#33698A';
  if (val >= 1) return '#1F4560';
  return '#14293A';
}

function colorAnomaly(val: number | null | undefined): string {
  if (val === null || val === undefined || Number.isNaN(val)) return '#0F2232';
  if (val >= 3) return '#A5D6D2';
  if (val >= 1) return '#5C9B9B';
  if (val > 0) return '#2C5555';
  if (val > -1.5) return '#5A3F33';
  if (val > -3.5) return '#B06A45';
  return '#E8A27A';
}

function colorCv(val: number | null | undefined): string {
  if (val === null || val === undefined || Number.isNaN(val)) return '#0F2232';
  if (val >= 300) return '#EBD39A';
  if (val >= 220) return '#C9A35A';
  if (val >= 160) return '#8A6E3C';
  if (val >= 120) return '#4A4430';
  return '#14293A';
}

function colorExtremes(val: number | null | undefined): string {
  if (!val) return '#14293A';
  if (val >= 20) return '#F2BC95';
  if (val >= 10) return '#D9895A';
  if (val >= 3) return '#9A5F40';
  return '#4F3A30';
}

function colorMaxDaily(val: number | null | undefined): string {
  if (val === null || val === undefined) return '#0F2232';
  if (val >= 180) return '#F2BC95';
  if (val >= 100) return '#D9895A';
  if (val >= 60) return '#B87A4E';
  if (val >= 30) return '#33698A';
  return '#1F4560';
}

function colorWilcoxon(props: Record<string, any>): string {
  if (!props.District_Count) return '#0F2232';
  if (!props.Significant) return '#3A4D5B';
  return props.Rainfall_Status === 'Above Normal' ? '#5C9B9B' : '#D9895A';
}

export function InteractiveIndiaMap({
  statesGeo,
  districtsGeo,
  footprint,
  extremeEvents,
  initialLayer = 'states',
  compact = false,
}: InteractiveIndiaMapProps) {
  const [layer, setLayer] = useState<MapLayer>(initialLayer);
  const [stateMetric, setStateMetric] = useState<StateMetric>('meanActual');
  const [districtMetric, setDistrictMetric] = useState<DistrictMetric>('meanActual');
  const [footprintIndex, setFootprintIndex] = useState<FootprintIndex>('PRCPTOT');
  const [footprintView, setFootprintView] = useState<'sig' | 'slope'>('sig');
  const [stateFilter, setStateFilter] = useState<string>('ALL');

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const [hoveredInfo, setHoveredInfo] = useState<{
    title: string;
    subtitle: string;
    valueText: string;
    x: number;
    y: number;
  } | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<Record<string, any> | null>(null);

  const projection = useMemo(() => {
    return geoMercator().fitExtent(
      [
        [28, 22],
        [WIDTH - 28, HEIGHT - 22],
      ],
      statesGeo as any
    );
  }, [statesGeo]);

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);

  const statePaths = useMemo(() => {
    return statesGeo.features.map((feat, i) => ({
      id: feat.properties.state_key || String(i),
      d: pathGenerator(feat as any) || '',
      props: feat.properties,
      bounds: pathGenerator.bounds(feat as any),
    }));
  }, [statesGeo, pathGenerator]);

  const districtPaths = useMemo(() => {
    return districtsGeo.features.map((feat, i) => ({
      id: `${feat.properties.lgd_state}-${feat.properties.lgd_district}-${i}`,
      d: pathGenerator(feat as any) || '',
      props: feat.properties,
      stateKey: String(feat.properties.lgd_state || '').toUpperCase(),
    }));
  }, [districtsGeo, pathGenerator]);

  const footprintDots = useMemo(() => {
    const idxData = footprint.indices[footprintIndex];
    const points: { x: number; y: number; sig: number; slope: number | null }[] = [];
    for (let i = 0; i < footprint.lat.length; i += 1) {
      const coords = projection([footprint.lon[i], footprint.lat[i]]);
      if (!coords) continue;
      points.push({
        x: coords[0],
        y: coords[1],
        sig: idxData?.sig[i] ?? 0,
        slope: idxData?.slope[i] ?? null,
      });
    }
    return points;
  }, [footprint, footprintIndex, projection]);

  const stateOptions = useMemo(() => {
    return Array.from(new Set(districtsGeo.features.map((f) => String(f.properties.lgd_state)))).sort();
  }, [districtsGeo]);

  const selectedExtremeEvents = useMemo(() => {
    if (!selectedFeature || layer !== 'districts') return [];
    const distName = String(selectedFeature.District || '').toUpperCase();
    const stName = String(selectedFeature.State || '').toUpperCase();
    return extremeEvents.filter(
      (ev) =>
        ev.District.toUpperCase() === distName &&
        (ev.State.toUpperCase() === stName || stName.startsWith(ev.State.slice(0, 5).toUpperCase()))
    );
  }, [selectedFeature, layer, extremeEvents]);

  const getStateColor = (props: Record<string, any>) => {
    if (stateMetric === 'meanActual') return colorMeanRainfall(props.Mean_Actual_Rainfall);
    if (stateMetric === 'anomaly') return colorAnomaly(props.Mean_Anomaly_mm);
    if (stateMetric === 'cv') return colorCv(props.CV_Percent);
    if (stateMetric === 'extremes') return colorExtremes(props.Extreme_Observations);
    return colorWilcoxon(props);
  };

  const getDistrictColor = (props: Record<string, any>) => {
    if (props.status === 'unreported') return '#0D1F2E';
    if (districtMetric === 'meanActual') return colorMeanRainfall(props.Mean_Actual_Rainfall);
    if (districtMetric === 'anomaly') return colorAnomaly(props.Mean_Anomaly_mm);
    if (districtMetric === 'maxDaily') return colorMaxDaily(props.Max_Daily_Rainfall);
    if (districtMetric === 'cv') return colorCv(props.CV_Percent);
    return colorMeanRainfall((props.Rainy_Days_2_5mm ?? 0) / 6);
  };

  const formatHoverMetric = (props: Record<string, any>, currentLayer: MapLayer): string => {
    if (currentLayer === 'states') {
      if (stateMetric === 'meanActual') return `Mean: ${fmtNum(props.Mean_Actual_Rainfall, 2)} mm/day`;
      if (stateMetric === 'anomaly') return `Anomaly: ${fmtSigned(props.Mean_Anomaly_mm, 2, 'mm/day')}`;
      if (stateMetric === 'cv') return `CV: ${fmtNum(props.CV_Percent, 1)}%`;
      if (stateMetric === 'extremes') return `Extremes ≥100mm: ${props.Extreme_Observations ?? 0}`;
      return props.District_Count
        ? `${props.Rainfall_Status} (p_Holm = ${fmtNum(props.Holm_Adjusted_P, 4)})`
        : 'Excluded (< 8 districts)';
    }
    if (props.status === 'unreported') return 'Unmatched / Newly formed LGD unit';
    if (districtMetric === 'meanActual') return `Mean: ${fmtNum(props.Mean_Actual_Rainfall, 2)} mm/day`;
    if (districtMetric === 'anomaly') return `Anomaly: ${fmtSigned(props.Mean_Anomaly_mm, 2, 'mm/day')}`;
    if (districtMetric === 'maxDaily') return `Max Daily: ${fmtNum(props.Max_Daily_Rainfall, 1)} mm`;
    if (districtMetric === 'cv') return `CV: ${fmtNum(props.CV_Percent, 1)}%`;
    return `Rainy Days: ${props.Rainy_Days_2_5mm ?? '—'} / 85`;
  };

  const legendConfig: { title: string; unit?: string; stops: LegendStop[]; note?: string } = useMemo(() => {
    if (layer === 'footprint') {
      if (footprintView === 'sig') {
        return {
          title: `${footprintIndex} Cell-Wise Trend (BH FDR α = 0.05)`,
          unit: '4,885 cells',
          stops: [
            { color: '#93BAD0', label: 'Significant Increasing' },
            { color: '#3A4D5B', label: 'Not Statistically Significant' },
            { color: '#D9895A', label: 'Significant Decreasing' },
          ],
          note: 'Historical common footprint covers 28.05% of the 17,415-cell bounding grid (2000–2025).',
        };
      }
      return {
        title: `${footprintIndex} Sen's Slope Direction`,
        unit: 'per year',
        stops: [
          { color: '#DCE8EF', label: 'Strong Positive Slope' },
          { color: '#729CB5', label: 'Moderate Positive' },
          { color: '#2C3F4E', label: 'Near Zero / Neutral' },
          { color: '#B87A4E', label: 'Moderate Negative' },
          { color: '#E8A27A', label: 'Strong Negative Slope' },
        ],
      };
    }

    const activeMetric = layer === 'states' ? stateMetric : districtMetric;
    if (activeMetric === 'meanActual') {
      return {
        title: 'Mean Daily Actual Rainfall',
        unit: 'mm/day (Aug–Nov 2026)',
        stops: [
          { color: '#14293A', label: '< 1.0' },
          { color: '#1F4560', label: '1.0 – 2.5' },
          { color: '#33698A', label: '2.5 – 4.5' },
          { color: '#5A90B0', label: '4.5 – 7.0' },
          { color: '#93BAD0', label: '7.0 – 10.0' },
          { color: '#DCE8EF', label: '≥ 10.0' },
        ],
      };
    }
    if (activeMetric === 'anomaly') {
      return {
        title: 'Mean Daily Anomaly (Actual − Normal)',
        unit: 'mm/day',
        stops: [
          { color: '#E8A27A', label: '≤ -3.5' },
          { color: '#B06A45', label: '-3.5 to -1.5' },
          { color: '#5A3F33', label: '-1.5 to 0' },
          { color: '#2C5555', label: '0 to +1.0' },
          { color: '#5C9B9B', label: '+1.0 to +3.0' },
          { color: '#A5D6D2', label: '≥ +3.0' },
        ],
      };
    }
    if (activeMetric === 'cv') {
      return {
        title: 'Coefficient of Variation (CV)',
        unit: '%',
        stops: [
          { color: '#14293A', label: '< 120%' },
          { color: '#4A4430', label: '120 – 160%' },
          { color: '#8A6E3C', label: '160 – 220%' },
          { color: '#C9A35A', label: '220 – 300%' },
          { color: '#EBD39A', label: '≥ 300%' },
        ],
      };
    }
    if (activeMetric === 'extremes') {
      return {
        title: 'District-Day Extreme Events (≥ 100 mm)',
        unit: 'count',
        stops: [
          { color: '#14293A', label: '0' },
          { color: '#4F3A30', label: '1 – 2' },
          { color: '#9A5F40', label: '3 – 9' },
          { color: '#D9895A', label: '10 – 19' },
          { color: '#F2BC95', label: '≥ 20' },
        ],
      };
    }
    if (activeMetric === 'maxDaily') {
      return {
        title: 'Maximum Single-Day Rainfall',
        unit: 'mm',
        stops: [
          { color: '#1F4560', label: '< 30' },
          { color: '#33698A', label: '30 – 60' },
          { color: '#B87A4E', label: '60 – 100' },
          { color: '#D9895A', label: '100 – 180' },
          { color: '#F2BC95', label: '≥ 180' },
        ],
      };
    }
    if (activeMetric === 'wilcoxon') {
      return {
        title: 'Paired Actual vs Normal (Wilcoxon Holm)',
        unit: '28 states (n≥8)',
        stops: [
          { color: '#5C9B9B', label: 'Significant Above Normal' },
          { color: '#D9895A', label: 'Significant Below Normal' },
          { color: '#3A4D5B', label: 'Not Significant (Holm)' },
          { color: '#0F2232', label: 'Excluded (< 8 districts)' },
        ],
      };
    }
    return {
      title: 'Rainy Days (≥ 2.5 mm/day)',
      unit: 'out of 85 days',
      stops: [
        { color: '#14293A', label: '< 6 d' },
        { color: '#1F4560', label: '6 – 15 d' },
        { color: '#33698A', label: '15 – 27 d' },
        { color: '#5A90B0', label: '27 – 42 d' },
        { color: '#93BAD0', label: '42 – 60 d' },
        { color: '#DCE8EF', label: '≥ 60 d' },
      ],
    };
  }, [layer, stateMetric, districtMetric, footprintIndex, footprintView]);

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setStateFilter('ALL');
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.18 : 0.85;
    setZoom((z) => Math.min(7, Math.max(1, Number((z * factor).toFixed(2)))));
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragging) return;
    setPan({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    });
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div className="space-y-4">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border border-hairline bg-parchment p-3.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-mutedink">
            Map Layer:
          </span>
          <button
            type="button"
            onClick={() => {
              setLayer('states');
              setSelectedFeature(null);
            }}
            className={`border px-3 py-1.5 font-mono text-xs transition ${
              layer === 'states'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            36 States &amp; UTs (2026)
          </button>
          <button
            type="button"
            onClick={() => {
              setLayer('districts');
              setSelectedFeature(null);
            }}
            className={`border px-3 py-1.5 font-mono text-xs transition ${
              layer === 'districts'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            727 Districts (2026)
          </button>
          <button
            type="button"
            onClick={() => {
              setLayer('footprint');
              setSelectedFeature(null);
            }}
            className={`border px-3 py-1.5 font-mono text-xs transition ${
              layer === 'footprint'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            Historical 4,885-Cell Grid (2000–2025)
          </button>
        </div>

        {/* Variable / Metric selector */}
        <div className="flex flex-wrap items-center gap-2">
          {layer === 'states' && (
            <select
              aria-label="State map metric"
              value={stateMetric}
              onChange={(e) => setStateMetric(e.target.value as StateMetric)}
              className="border border-hairline bg-ivory px-2.5 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
            >
              <option value="meanActual">Metric: Mean Actual Rainfall (mm/day)</option>
              <option value="anomaly">Metric: Mean Daily Anomaly (mm/day)</option>
              <option value="cv">Metric: Coefficient of Variation (%)</option>
              <option value="extremes">Metric: Extreme Events ≥ 100 mm</option>
              <option value="wilcoxon">Metric: Paired Wilcoxon Holm Status</option>
            </select>
          )}

          {layer === 'districts' && (
            <>
              <select
                aria-label="Filter districts by state"
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="border border-hairline bg-ivory px-2.5 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
              >
                <option value="ALL">All States &amp; UTs (785 LGD Polygons)</option>
                {stateOptions.map((st) => (
                  <option key={st} value={st.toUpperCase()}>
                    {st}
                  </option>
                ))}
              </select>
              <select
                aria-label="District map metric"
                value={districtMetric}
                onChange={(e) => setDistrictMetric(e.target.value as DistrictMetric)}
                className="border border-hairline bg-ivory px-2.5 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
              >
                <option value="meanActual">Metric: Mean Actual Rainfall (mm/day)</option>
                <option value="anomaly">Metric: Mean Daily Anomaly (mm/day)</option>
                <option value="maxDaily">Metric: Max Daily Rainfall (mm)</option>
                <option value="cv">Metric: Coefficient of Variation (%)</option>
                <option value="rainyDays">Metric: Rainy Days (≥ 2.5 mm)</option>
              </select>
            </>
          )}

          {layer === 'footprint' && (
            <>
              <select
                aria-label="Extreme index selector"
                value={footprintIndex}
                onChange={(e) => setFootprintIndex(e.target.value as FootprintIndex)}
                className="border border-hairline bg-ivory px-2.5 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
              >
                {(['PRCPTOT', 'SDII', 'Rx1day', 'Rx5day', 'R10mm', 'R20mm', 'CDD', 'CWD'] as FootprintIndex[]).map((idx) => (
                  <option key={idx} value={idx}>
                    Index: {idx}
                  </option>
                ))}
              </select>
              <select
                aria-label="Footprint view mode"
                value={footprintView}
                onChange={(e) => setFootprintView(e.target.value as 'sig' | 'slope')}
                className="border border-hairline bg-ivory px-2.5 py-1.5 font-mono text-xs text-ink focus:border-ink focus:outline-none"
              >
                <option value="sig">Show: BH FDR Significance (α=0.05)</option>
                <option value="slope">Show: Sen&apos;s Slope Magnitude</option>
              </select>
            </>
          )}
        </div>
      </div>

      {/* Main Map + Side Inspector */}
      <div className={`grid grid-cols-1 gap-5 ${compact ? 'lg:grid-cols-12' : 'xl:grid-cols-12'}`}>
        <div className={`relative border border-hairline bg-cartographic-tint ${compact ? 'lg:col-span-7' : 'xl:col-span-8'}`}>
          {/* Map Controls */}
          <div className="absolute right-3 top-3 z-20 flex flex-col gap-1 border border-hairline bg-parchment/95 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(7, Number((z * 1.3).toFixed(2))))}
              className="p-1.5 text-ink hover:bg-atlas"
              aria-label="Zoom in"
              title="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, Number((z / 1.3).toFixed(2))))}
              className="p-1.5 text-ink hover:bg-atlas"
              aria-label="Zoom out"
              title="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="border-t border-hairline p-1.5 text-ink hover:bg-atlas"
              aria-label="Reset map view"
              title="Reset zoom and pan"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Coordinate Header Badge */}
          <div className="pointer-events-none absolute left-3 top-3 z-10 border border-hairline bg-parchment/90 px-2.5 py-1 font-mono text-[10px] text-slateink">
            {layer === 'footprint'
              ? 'COMMON SPATIAL FOOTPRINT · 4,885 CELLS (28.05% OF GRID) · 2000–2025'
              : layer === 'states'
              ? 'IMD STATE-WISE DAILY RAINFALL · 36 UNITS · 19 AUG – 12 NOV 2026'
              : 'IMD DISTRICT-WISE BALANCED PANEL · 727 DISTRICTS + NAGAPATTINAM · 2026'}
          </div>

          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className={`w-full select-none ${compact ? 'h-[480px]' : 'h-[620px] sm:h-[700px]'} ${
              dragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              handleMouseUp();
              setHoveredInfo(null);
            }}
            role="img"
            aria-label="Interactive cartographic map of India rainfall"
          >
            <g transform={`translate(${pan.x}, ${pan.y}) translate(${WIDTH / 2}, ${HEIGHT / 2}) scale(${zoom}) translate(${-WIDTH / 2}, ${-HEIGHT / 2})`}>
              {layer === 'states' &&
                statePaths.map((sp) => {
                  const isSelected = selectedFeature?.state_key === sp.props.state_key;
                  return (
                    <path
                      key={sp.id}
                      d={sp.d}
                      fill={getStateColor(sp.props)}
                      stroke={isSelected ? '#D9E8F3' : '#071522'}
                      strokeWidth={isSelected ? 1.8 / zoom : 0.7 / zoom}
                      className="cursor-pointer transition-opacity hover:opacity-85"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFeature(sp.props);
                      }}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                        if (!rect) return;
                        setHoveredInfo({
                          title: sp.props.State || sp.props.lgd_name,
                          subtitle: `Total: ${fmtNum(sp.props.Total_Observed_Rainfall, 1)} mm`,
                          valueText: formatHoverMetric(sp.props, 'states'),
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                        });
                      }}
                      onMouseLeave={() => setHoveredInfo(null)}
                    />
                  );
                })}

              {layer === 'districts' && (
                <>
                  {districtPaths.map((dp) => {
                    const dimmed = stateFilter !== 'ALL' && dp.stateKey !== stateFilter;
                    const isSelected =
                      selectedFeature?.lgd_district === dp.props.lgd_district &&
                      selectedFeature?.lgd_state === dp.props.lgd_state;
                    return (
                      <path
                        key={dp.id}
                        d={dp.d}
                        fill={getDistrictColor(dp.props)}
                        fillOpacity={dimmed ? 0.14 : 1}
                        stroke={isSelected ? '#D9E8F3' : '#3A5163'}
                        strokeWidth={isSelected ? 1.5 / zoom : 0.3 / zoom}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFeature(dp.props);
                        }}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                          if (!rect) return;
                          setHoveredInfo({
                            title: dp.props.District || dp.props.lgd_district,
                            subtitle: dp.props.State || dp.props.lgd_state,
                            valueText: formatHoverMetric(dp.props, 'districts'),
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                          });
                        }}
                        onMouseLeave={() => setHoveredInfo(null)}
                      />
                    );
                  })}
                  {statePaths.map((sp) => (
                    <path
                      key={`outline-${sp.id}`}
                      d={sp.d}
                      fill="none"
                      stroke="#D9E8F3"
                      strokeOpacity={0.35}
                      strokeWidth={0.75 / zoom}
                      className="pointer-events-none"
                    />
                  ))}
                </>
              )}

              {layer === 'footprint' && (
                <>
                  {statePaths.map((sp) => (
                    <path
                      key={`base-${sp.id}`}
                      d={sp.d}
                      fill="#14293A"
                      stroke="#3A5163"
                      strokeWidth={0.7 / zoom}
                    />
                  ))}
                  {footprintDots.map((pt, i) => {
                    let fill = '#3A4D5B';
                    if (footprintView === 'sig') {
                      if (pt.sig === 1) fill = '#93BAD0';
                      else if (pt.sig === -1) fill = '#D9895A';
                    } else {
                      const s = pt.slope ?? 0;
                      if (s > 0.25) fill = '#DCE8EF';
                      else if (s > 0.02) fill = '#729CB5';
                      else if (s < -0.25) fill = '#E8A27A';
                      else if (s < -0.02) fill = '#B87A4E';
                      else fill = '#2C3F4E';
                    }
                    return (
                      <rect
                        key={i}
                        x={pt.x - 2.1}
                        y={pt.y - 2.1}
                        width={4.2}
                        height={4.2}
                        fill={fill}
                        fillOpacity={0.9}
                      />
                    );
                  })}
                </>
              )}
            </g>
          </svg>

          {/* Hover Tooltip */}
          {hoveredInfo && (
            <div
              className="pointer-events-none absolute z-30 border border-ink bg-parchment px-3 py-2 font-mono text-xs shadow-md"
              style={{
                left: Math.min(hoveredInfo.x + 14, 480),
                top: Math.max(hoveredInfo.y - 12, 46),
              }}
            >
              <div className="font-semibold text-ink">{hoveredInfo.title}</div>
              <div className="text-[10px] text-mutedink">{hoveredInfo.subtitle}</div>
              <div className="mt-1 font-semibold text-rainblue">{hoveredInfo.valueText}</div>
            </div>
          )}

          <div className="border-t border-hairline bg-parchment/90 px-3 py-1.5 font-mono text-[10px] text-mutedink">
            Scroll to zoom ({zoom.toFixed(1)}×) · Drag to pan · Click any State or District to lock inspector
          </div>
        </div>

        {/* Right Side Panel: Legend + Inspector */}
        <div className={`space-y-4 ${compact ? 'lg:col-span-5' : 'xl:col-span-4'}`}>
          <MapLegend
            title={legendConfig.title}
            unit={legendConfig.unit}
            stops={legendConfig.stops}
            note={legendConfig.note}
          />
          <MapInspectorPanel
            layer={layer}
            selectedFeature={selectedFeature}
            selectedExtremeEvents={selectedExtremeEvents}
            footprintIndex={footprintIndex}
            onExploreDistrictsOfState={(stateKey) => {
              const matchingLgd = stateOptions.find(
                (s) => s.replace(/[^A-Z]/gi, '').toUpperCase().includes(stateKey.slice(0, 6))
              );
              setLayer('districts');
              setSelectedFeature(null);
              if (matchingLgd) setStateFilter(matchingLgd.toUpperCase());
            }}
          />
        </div>
      </div>
    </div>
  );
}

