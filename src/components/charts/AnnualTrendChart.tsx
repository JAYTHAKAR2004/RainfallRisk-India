import { useMemo, useState } from 'react';
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { AnnualStatRow } from '../../data/types';
import { fmtNum, fmtSigned } from '../../utils/formatters';

interface AnnualTrendChartProps {
  data: AnnualStatRow[];
  olsSlope: number;
  olsIntercept: number;
  senSlope: number;
  longTermMean?: number;
}

export function AnnualTrendChart({
  data,
  olsSlope,
  olsIntercept,
  senSlope,
  longTermMean = 1149.603,
}: AnnualTrendChartProps) {
  const [mode, setMode] = useState<'total' | 'deviation'>('total');
  const [showOls, setShowOls] = useState(true);
  const [showSen, setShowSen] = useState(true);

  const chartData = useMemo(() => {
    const midYear = 2012.5;
    const medianAnnual = 1161.127;
    return data.map((row) => ({
      ...row,
      olsFit: olsIntercept + olsSlope * row.Year,
      senFit: medianAnnual + senSlope * (row.Year - midYear),
    }));
  }, [data, olsIntercept, olsSlope, senSlope]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMode('total')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              mode === 'total'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            Annual Total (mm/yr)
          </button>
          <button
            type="button"
            onClick={() => setMode('deviation')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              mode === 'deviation'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            Departure from Mean (%)
          </button>
        </div>

        {mode === 'total' && (
          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-slateink">
            <label className="inline-flex cursor-pointer items-center gap-1.5">
              <input
                type="checkbox"
                checked={showOls}
                onChange={(e) => setShowOls(e.target.checked)}
                className="accent-extreme"
              />
              <span className="inline-block h-0.5 w-4 bg-extreme" />
              OLS Fit (+6.21 mm/yr, p = 0.0127)
            </label>
            <label className="inline-flex cursor-pointer items-center gap-1.5">
              <input
                type="checkbox"
                checked={showSen}
                onChange={(e) => setShowSen(e.target.checked)}
                className="accent-monsoon"
              />
              <span className="inline-block h-0.5 w-4 border-b-2 border-dashed border-monsoon" />
              Sen&apos;s Slope (+5.86 mm/yr, p = 0.0208)
            </label>
          </div>
        )}
      </div>

      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {mode === 'total' ? (
            <ComposedChart data={chartData} margin={{ top: 16, right: 20, left: 6, bottom: 8 }}>
              <CartesianGrid stroke="#1C3245" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="Year"
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
                tickLine={false}
                axisLine={{ stroke: '#2A4053' }}
              />
              <YAxis
                domain={[800, 1400]}
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
                tickLine={false}
                axisLine={{ stroke: '#2A4053' }}
                label={{
                  value: 'Annual Rainfall (mm)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#7F96A5' },
                }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const row = payload[0].payload as AnnualStatRow;
                  return (
                    <div className="border border-ink bg-parchment p-3 font-mono text-xs shadow-md">
                      <div className="border-b border-hairline pb-1 font-semibold text-ink">
                        Year {row.Year}
                      </div>
                      <div className="mt-1.5 space-y-1 text-[11px]">
                        <div className="flex justify-between gap-4">
                          <span className="text-mutedink">Annual Total:</span>
                          <span className="font-semibold text-rainblue">
                            {fmtNum(row.Annual_Rainfall_mm, 2)} mm
                          </span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-mutedink">Mean Daily:</span>
                          <span>{fmtNum(row.Mean_Daily_Rainfall_mm, 3)} mm/day</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-mutedink">Departure:</span>
                          <span className={row.Deviation_from_Mean_mm >= 0 ? 'text-monsoon' : 'text-extreme'}>
                            {fmtSigned(row.Deviation_from_Mean_mm, 2, 'mm')} ({fmtSigned(row.Deviation_Percentage, 2, '%')})
                          </span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-mutedink">Rainy Days (≥2.5mm):</span>
                          <span>{row.Rainy_Days_2_5mm} d</span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <ReferenceLine
                y={longTermMean}
                stroke="#DCE8EF"
                strokeDasharray="4 4"
                label={{
                  value: `26-yr Mean: ${fmtNum(longTermMean, 1)} mm`,
                  position: 'insideTopLeft',
                  fill: '#DCE8EF',
                  fontSize: 10,
                  fontFamily: 'JetBrains Mono',
                }}
              />
              <Bar dataKey="Annual_Rainfall_mm" maxBarSize={24} isAnimationActive={false}>
                {chartData.map((entry) => {
                  let fill = '#3E6A86';
                  if (entry.Year === 2020) fill = '#5C9B9B';
                  else if (entry.Year === 2002) fill = '#D9895A';
                  else if (entry.Annual_Rainfall_mm >= longTermMean) fill = '#8FB6CD';
                  return <Cell key={entry.Year} fill={fill} />;
                })}
              </Bar>
              {showOls && (
                <Line
                  type="linear"
                  dataKey="olsFit"
                  stroke="#D9895A"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              )}
              {showSen && (
                <Line
                  type="linear"
                  dataKey="senFit"
                  stroke="#5C9B9B"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  dot={false}
                  isAnimationActive={false}
                />
              )}
            </ComposedChart>
          ) : (
            <ComposedChart data={chartData} margin={{ top: 16, right: 20, left: 6, bottom: 8 }}>
              <CartesianGrid stroke="#1C3245" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="Year"
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
                tickLine={false}
              />
              <YAxis
                domain={[-22, 16]}
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
                tickLine={false}
                label={{
                  value: 'Departure (%)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#7F96A5' },
                }}
              />
              <ReferenceLine y={0} stroke="#DCE8EF" />
              <Tooltip
                formatter={(val: number) => [`${fmtSigned(val, 2)}%`, 'Departure from Mean']}
                contentStyle={{
                  backgroundColor: '#0C1E2E',
                  borderColor: '#DCE8EF',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="Deviation_Percentage" maxBarSize={24} isAnimationActive={false}>
                {chartData.map((entry) => (
                  <Cell
                    key={entry.Year}
                    fill={entry.Deviation_Percentage >= 0 ? '#8FB6CD' : '#D9895A'}
                  />
                ))}
              </Bar>
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

