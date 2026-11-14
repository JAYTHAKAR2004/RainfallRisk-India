import type { ExtremeDistrictEventRow } from '../../data/types';
import { fmtNum, fmtPValue, fmtSigned } from '../../utils/formatters';

interface MapInspectorPanelProps {
  layer: 'states' | 'districts' | 'footprint';
  selectedFeature: Record<string, any> | null;
  selectedExtremeEvents: ExtremeDistrictEventRow[];
  footprintIndex: string;
  onExploreDistrictsOfState?: (stateName: string) => void;
}

export function MapInspectorPanel({
  layer,
  selectedFeature,
  selectedExtremeEvents,
  footprintIndex,
  onExploreDistrictsOfState,
}: MapInspectorPanelProps) {
  if (layer === 'footprint') {
    return (
      <div className="border border-hairline bg-parchment p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-rainblue">
          Historical Grid Layer · 2000–2025
        </div>
        <h4 className="mt-1 font-editorial text-xl font-medium text-ink">
          Common Spatial Footprint ({footprintIndex})
        </h4>
        <p className="mt-2 text-xs leading-relaxed text-slateink">
          Each square represents a <span className="font-mono">0.25° × 0.25°</span> IMD grid cell with complete daily observations across all 9,497 days (2000–2025). Out of 17,415 bounding cells, 4,885 cells (28.05%) meet completeness criteria; 79 intermittent cells and 12,451 ocean/masked cells are excluded.
        </p>
        <div className="mt-4 border-t border-hairline pt-3 font-mono text-[11px] text-slateink">
          <div className="flex justify-between py-1">
            <span className="text-mutedink">Extent Latitude:</span>
            <span>8.25°N – 37.25°N</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-mutedink">Extent Longitude:</span>
            <span>69.25°E – 97.25°E</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-mutedink">Significance Control:</span>
            <span>BH FDR (α = 0.05)</span>
          </div>
        </div>
        <div className="mt-4 border border-ochre/40 bg-ochre/10 p-3 text-[11px] leading-relaxed text-ink">
          Methodological boundary: This 4,885-cell common footprint does not represent complete administrative Indian land coverage; peripheral cells with intermittent missing data are deliberately excluded to avoid trend bias.
        </div>
      </div>
    );
  }

  if (!selectedFeature) {
    return (
      <div className="border border-hairline bg-parchment p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-mutedink">
          Region Inspector
        </div>
        <h4 className="mt-1 font-editorial text-xl font-medium text-ink">
          Select a {layer === 'states' ? 'State or UT' : 'District'}
        </h4>
        <p className="mt-2 text-xs leading-relaxed text-slateink">
          Hover over any polygon on the India map for a live statistical readout, or click any boundary to pin its complete Aug–Nov 2026 observations, anomaly versus normal rainfall, variability, and extreme rainfall records here.
        </p>
        <div className="mt-4 space-y-2 border-t border-hairline pt-3 font-mono text-[11px] text-slateink">
          <div className="flex justify-between">
            <span className="text-mutedink">Study Window:</span>
            <span>19 Aug – 12 Nov 2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-mutedink">Missing Date:</span>
            <span className="text-extreme">2026-10-31</span>
          </div>
          <div className="flex justify-between">
            <span className="text-mutedink">Reporting Dates:</span>
            <span>85 per balanced unit</span>
          </div>
        </div>
      </div>
    );
  }

  if (layer === 'states') {
    return (
      <div className="border border-hairline border-t-2 border-t-ink bg-parchment p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-rainblue">
          State / Union Territory · 85 Dates
        </div>
        <h4 className="mt-1 font-editorial text-2xl font-medium text-ink">
          {selectedFeature.State || selectedFeature.lgd_name}
        </h4>

        <dl className="mt-4 divide-y divide-hairline border-y border-hairline font-mono text-xs">
          <div className="flex justify-between py-2">
            <dt className="text-mutedink">Mean Actual Rainfall</dt>
            <dd className="font-semibold text-rainblue">
              {fmtNum(selectedFeature.Mean_Actual_Rainfall, 2)} mm/day
            </dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-mutedink">Mean Normal Rainfall</dt>
            <dd>{fmtNum(selectedFeature.Mean_Normal_Rainfall, 2)} mm/day</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-mutedink">Mean Daily Anomaly</dt>
            <dd className={selectedFeature.Mean_Anomaly_mm >= 0 ? 'font-semibold text-monsoon' : 'font-semibold text-extreme'}>
              {fmtSigned(selectedFeature.Mean_Anomaly_mm, 2, 'mm/day')}
            </dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-mutedink">Total Observed (85 d)</dt>
            <dd>{fmtNum(selectedFeature.Total_Observed_Rainfall, 1)} mm</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-mutedink">Max Daily Rainfall</dt>
            <dd>{fmtNum(selectedFeature.Maximum_Daily_Rainfall, 1)} mm</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-mutedink">CV (%)</dt>
            <dd>{fmtNum(selectedFeature.CV_Percent, 1)}%</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-mutedink">Rainy Days (≥ 2.5 mm)</dt>
            <dd>{selectedFeature.Rainy_Days_2_5mm} / 85 ({fmtNum(selectedFeature.Rainy_Day_Percent, 1)}%)</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-mutedink">District Extreme Events (≥100 mm)</dt>
            <dd className="font-semibold text-extreme">{selectedFeature.Extreme_Observations ?? 0}</dd>
          </div>
        </dl>

        {selectedFeature.District_Count ? (
          <div className="mt-4 border border-hairline bg-ivory p-3 text-xs">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-mutedink">
              State-Wise Paired Wilcoxon Test ({selectedFeature.District_Count} Districts)
            </div>
            <div className="mt-1.5 flex items-baseline justify-between font-mono text-xs">
              <span>{selectedFeature.Rainfall_Status}</span>
              <span>
                p<sub>Holm</sub> = {fmtPValue(selectedFeature.Holm_Adjusted_P)} (
                {selectedFeature.Significant ? 'Significant' : 'Not Sig.'})
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 border border-hairline bg-ivory p-3 font-mono text-[11px] text-mutedink">
            Excluded from 28-state paired Wilcoxon comparison (&lt; 8 districts in unit).
          </div>
        )}

        {onExploreDistrictsOfState && selectedFeature.state_key && (
          <button
            type="button"
            onClick={() => onExploreDistrictsOfState(selectedFeature.state_key)}
            className="mt-4 w-full border border-ink bg-ink px-3 py-2 font-mono text-xs text-ivory transition hover:bg-rainblue"
          >
            Inspect Districts in {selectedFeature.State || selectedFeature.lgd_name} →
          </button>
        )}
      </div>
    );
  }

  // District inspector
  const status = selectedFeature.status;
  return (
    <div className="border border-hairline border-t-2 border-t-ink bg-parchment p-5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-rainblue">
        {selectedFeature.State || selectedFeature.lgd_state}
      </div>
      <h4 className="mt-1 font-editorial text-2xl font-medium text-ink">
        {selectedFeature.District || selectedFeature.lgd_district}
      </h4>

      {status === 'unreported' ? (
        <div className="mt-4 border border-hairline bg-ivory p-3 text-xs leading-relaxed text-slateink">
          This LGD administrative polygon did not match an entry in the 727-district balanced IMD dataset or the Nagapattinam incomplete register (for example, recently carved administrative sub-units). No values are fabricated.
        </div>
      ) : (
        <>
          {status === 'incomplete' && (
            <div className="mt-3 border border-extreme/40 bg-extreme/10 p-2.5 font-mono text-[11px] text-extreme">
              Incomplete series: {selectedFeature.Observation_Count} records ({selectedFeature.First_Date} to {selectedFeature.Last_Date}). Excluded from 727-district balanced panel.
            </div>
          )}

          <dl className="mt-4 divide-y divide-hairline border-y border-hairline font-mono text-xs">
            <div className="flex justify-between py-2">
              <dt className="text-mutedink">Mean Actual Rainfall</dt>
              <dd className="font-semibold text-rainblue">
                {fmtNum(selectedFeature.Mean_Actual_Rainfall, 2)} mm/day
              </dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-mutedink">Mean Normal Rainfall</dt>
              <dd>{fmtNum(selectedFeature.Mean_Normal_Rainfall, 2)} mm/day</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-mutedink">Mean Daily Anomaly</dt>
              <dd className={selectedFeature.Mean_Anomaly_mm >= 0 ? 'font-semibold text-monsoon' : 'font-semibold text-extreme'}>
                {fmtSigned(selectedFeature.Mean_Anomaly_mm, 2, 'mm/day')}
              </dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-mutedink">Total Observed</dt>
              <dd>{fmtNum(selectedFeature.Total_Observed_Rainfall, 1)} mm</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-mutedink">Max Daily Rainfall</dt>
              <dd className="font-semibold">{fmtNum(selectedFeature.Max_Daily_Rainfall, 1)} mm</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-mutedink">Std Dev / CV</dt>
              <dd>
                {fmtNum(selectedFeature.Std_Actual_Rainfall, 2)} mm · {fmtNum(selectedFeature.CV_Percent, 1)}%
              </dd>
            </div>
            {selectedFeature.Rainy_Days_2_5mm !== undefined && (
              <div className="flex justify-between py-2">
                <dt className="text-mutedink">Rainy Days (≥ 2.5 mm)</dt>
                <dd>
                  {selectedFeature.Rainy_Days_2_5mm} / 85 ({fmtNum(selectedFeature.Rainy_Day_Percent, 1)}%)
                </dd>
              </div>
            )}
          </dl>

          {selectedExtremeEvents.length > 0 && (
            <div className="mt-4">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-extreme">
                Extreme Events ≥ 100 mm ({selectedExtremeEvents.length})
              </div>
              <div className="mt-2 max-h-40 space-y-1.5 overflow-y-auto">
                {selectedExtremeEvents.map((ev, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border border-extreme/30 bg-extreme/5 px-2.5 py-1.5 font-mono text-[11px]"
                  >
                    <span>{ev.Date}</span>
                    <span className="font-semibold text-extreme">
                      {fmtNum(ev['Daily Actual'], 1)} mm{' '}
                      <span className="font-normal text-mutedink">(norm {fmtNum(ev['Daily Normal'], 1)})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

