import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import type {
  DistrictDailyTemporalRow,
  DistrictSummaryRow,
} from '../../data/types';
import { fmtNum, fmtSigned } from '../../utils/formatters';

interface DistrictExtremesChartProps {
  districts: DistrictSummaryRow[];
  dailyTemporal: DistrictDailyTemporalRow[];
  extremeGeoState: {
    State: string;
    Extreme_Observations: number;
    Unique_Districts: number;
    Maximum_Rainfall: number;
    Percentage_of_Extremes: number;
  }[];
}

export function DistrictExtremesChart({
  districts,
  dailyTemporal,
  extremeGeoState,
}: DistrictExtremesChartProps) {
  const [view, setView] = useState<'scatter' | 'daily' | 'states'>('scatter');

  const scatterData = useMemo(() => {
    return districts.map((d) => ({
      name: `${d.District}, ${d.State}`,
      mean: d.Mean_Actual_Rainfall,
      std: d.Std_Actual_Rainfall,
      max: d.Max_Daily_Rainfall,
      anomaly: d.Mean_Anomaly_mm,
    }));
  }, [districts]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setView('scatter')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              view === 'scatter'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            727 Districts: Mean vs Std Dev
          </button>
          <button
            type="button"
            onClick={() => setView('daily')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              view === 'daily'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            85-Day Temporal Profile (Actual vs Normal)
          </button>
          <button
            type="button"
            onClick={() => setView('states')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              view === 'states'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            Concentration of 99 Extreme Events (≥ 100 mm)
          </button>
        </div>
      </div>

      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {view === 'scatter' ? (
            <ScatterChart margin={{ top: 14, right: 24, left: 6, bottom: 16 }}>
              <CartesianGrid stroke="#E4DFD4" strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="mean"
                name="Mean Rainfall"
                unit=" mm"
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#3E4C59' }}
                label={{
                  value: 'District Mean Actual Rainfall (mm/day)',
                  position: 'insideBottom',
                  offset: -8,
                  style: { fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#667480' },
                }}
              />
              <YAxis
                type="number"
                dataKey="std"
                name="Std Dev"
                unit=" mm"
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#3E4C59' }}
                label={{
                  value: 'Daily Std Deviation (mm/day)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#667480' },
                }}
              />
              <ZAxis type="number" dataKey="max" range={[18, 120]} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as (typeof scatterData)[number];
                  return (
                    <div className="border border-ink bg-parchment p-3 font-mono text-xs shadow-md">
                      <div className="border-b border-hairline pb-1 font-semibold">{p.name}</div>
                      <div className="mt-1.5 space-y-1 text-[11px]">
                        <div>Mean: {fmtNum(p.mean, 2)} mm/day</div>
                        <div>Std Dev: {fmtNum(p.std, 2)} mm/day</div>
                        <div>Max Single Day: {fmtNum(p.max, 1)} mm</div>
                        <div>Mean Anomaly: {fmtSigned(p.anomaly, 2, 'mm/day')}</div>
                      </div>
                    </div>
                  );
                }}
              />
              <Scatter
                name="Balanced Districts (727)"
                data={scatterData}
                fill="#1D5B86"
                fillOpacity={0.55}
                isAnimationActive={false}
              />
            </ScatterChart>
          ) : view === 'daily' ? (
            <ComposedChart data={dailyTemporal} margin={{ top: 14, right: 20, left: 6, bottom: 8 }}>
              <CartesianGrid stroke="#E4DFD4" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="Date"
                minTickGap={24}
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#3E4C59' }}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#1D5B86' }}
                label={{
                  value: '727-District Mean (mm/day)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#1D5B86' },
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#C85A28' }}
                label={{
                  value: 'Daily District Max (mm)',
                  angle: 90,
                  position: 'insideRight',
                  style: { fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#C85A28' },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FCFBF8',
                  borderColor: '#141E28',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                }}
              />
              <Bar yAxisId="left" dataKey="Mean_Rainfall" name="Mean Actual (mm/day)" fill="#6FA3C7" isAnimationActive={false} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Mean_Normal"
                name="Mean Normal (mm/day)"
                stroke="#141E28"
                strokeWidth={1.8}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Maximum_Rainfall"
                name="Max District Day (mm)"
                stroke="#C85A28"
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
            </ComposedChart>
          ) : (
            <BarChart
              data={extremeGeoState.slice(0, 12)}
              layout="vertical"
              margin={{ top: 8, right: 24, left: 24, bottom: 8 }}
            >
              <CartesianGrid stroke="#E4DFD4" strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#3E4C59' }}
              />
              <YAxis
                type="category"
                dataKey="State"
                width={150}
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#141E28' }}
              />
              <Tooltip
                formatter={(val: number, name: string) => [val, name]}
                contentStyle={{
                  backgroundColor: '#FCFBF8',
                  borderColor: '#141E28',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                }}
              />
              <Bar dataKey="Extreme_Observations" name="Events ≥ 100 mm" fill="#C85A28" barSize={15} isAnimationActive={false} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

