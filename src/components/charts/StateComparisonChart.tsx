import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { StateSummaryRow } from '../../data/types';
import { fmtNum, fmtSigned } from '../../utils/formatters';

interface StateComparisonChartProps {
  states: StateSummaryRow[];
}

export function StateComparisonChart({ states }: StateComparisonChartProps) {
  const [metric, setMetric] = useState<'mean' | 'anomaly' | 'cv'>('mean');

  const sorted = useMemo(() => {
    const copy = [...states];
    if (metric === 'mean') {
      copy.sort((a, b) => b.Mean_Actual_Rainfall - a.Mean_Actual_Rainfall);
    } else if (metric === 'anomaly') {
      copy.sort((a, b) => b.Mean_Anomaly_mm - a.Mean_Anomaly_mm);
    } else {
      copy.sort((a, b) => b.CV_Percent - a.CV_Percent);
    }
    return copy;
  }, [states, metric]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMetric('mean')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              metric === 'mean'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            Mean Actual vs Normal (mm/day)
          </button>
          <button
            type="button"
            onClick={() => setMetric('anomaly')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              metric === 'anomaly'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            Mean Anomaly (mm/day)
          </button>
          <button
            type="button"
            onClick={() => setMetric('cv')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              metric === 'cv'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            Coefficient of Variation (%)
          </button>
        </div>
        <span className="font-mono text-[11px] text-mutedink">
          All 36 State/UT reporting units · 85 dates each (19 Aug – 12 Nov 2026)
        </span>
      </div>

      <div className="h-[680px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {metric === 'mean' ? (
            <BarChart data={sorted} layout="vertical" margin={{ top: 6, right: 24, left: 16, bottom: 6 }}>
              <CartesianGrid stroke="#1C3245" strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
                unit=" mm"
              />
              <YAxis
                type="category"
                dataKey="State"
                width={205}
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#DCE8EF' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const r = payload[0].payload as StateSummaryRow;
                  return (
                    <div className="border border-ink bg-parchment p-3 font-mono text-xs shadow-md">
                      <div className="border-b border-hairline pb-1 font-semibold">{r.State}</div>
                      <div className="mt-1.5 space-y-1 text-[11px]">
                        <div>Mean Actual: {fmtNum(r.Mean_Actual_Rainfall, 2)} mm/day</div>
                        <div>Mean Normal: {fmtNum(r.Mean_Normal_Rainfall, 2)} mm/day</div>
                        <div>Anomaly: {fmtSigned(r.Mean_Anomaly_mm, 2, 'mm/day')}</div>
                        <div>Total (85 d): {fmtNum(r.Total_Observed_Rainfall, 1)} mm</div>
                      </div>
                    </div>
                  );
                }}
              />
              <Bar dataKey="Mean_Actual_Rainfall" name="Mean Actual (mm/day)" fill="#8FB6CD" barSize={9} isAnimationActive={false} />
              <Bar dataKey="Mean_Normal_Rainfall" name="Mean Normal (mm/day)" fill="#4E6475" barSize={7} isAnimationActive={false} />
            </BarChart>
          ) : metric === 'anomaly' ? (
            <BarChart data={sorted} layout="vertical" margin={{ top: 6, right: 24, left: 16, bottom: 6 }}>
              <CartesianGrid stroke="#1C3245" strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
                unit=" mm"
              />
              <YAxis
                type="category"
                dataKey="State"
                width={205}
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#DCE8EF' }}
              />
              <ReferenceLine x={0} stroke="#DCE8EF" />
              <Tooltip
                formatter={(val: number) => [fmtSigned(val, 2, 'mm/day'), 'Mean Daily Anomaly']}
                contentStyle={{
                  backgroundColor: '#0C1E2E',
                  borderColor: '#DCE8EF',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                }}
              />
              <Bar dataKey="Mean_Anomaly_mm" barSize={12} isAnimationActive={false}>
                {sorted.map((entry) => (
                  <Cell
                    key={entry.State}
                    fill={entry.Mean_Anomaly_mm >= 0 ? '#5C9B9B' : '#D9895A'}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <BarChart data={sorted} layout="vertical" margin={{ top: 6, right: 24, left: 16, bottom: 6 }}>
              <CartesianGrid stroke="#1C3245" strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
                unit="%"
              />
              <YAxis
                type="category"
                dataKey="State"
                width={205}
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#DCE8EF' }}
              />
              <Tooltip
                formatter={(val: number) => [`${fmtNum(val, 1)}%`, 'CV (%)']}
                contentStyle={{
                  backgroundColor: '#0C1E2E',
                  borderColor: '#DCE8EF',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                }}
              />
              <Bar dataKey="CV_Percent" fill="#C9A35A" barSize={12} isAnimationActive={false} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

