import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type {
  SeasonalIntensitySummaryRow,
  SeasonalSummaryRow,
  SeasonalYearRow,
} from '../../data/types';
import { fmtNum } from '../../utils/formatters';

interface SeasonalDistributionChartProps {
  summary: SeasonalSummaryRow[];
  intensitySummary: SeasonalIntensitySummaryRow[];
  yearlyTotals: SeasonalYearRow[];
  yearlyIntensity: SeasonalYearRow[];
}

const SEASON_COLORS: Record<string, string> = {
  Winter: '#3E6A86',
  'Pre-Monsoon': '#C9A35A',
  'Southwest Monsoon': '#8FB6CD',
  'Post-Monsoon': '#5C9B9B',
};

export function SeasonalDistributionChart({
  summary,
  intensitySummary,
  yearlyTotals,
  yearlyIntensity,
}: SeasonalDistributionChartProps) {
  const [tab, setTab] = useState<'share' | 'intensity' | 'series'>('share');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setTab('share')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              tab === 'share'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            Annual Contribution (%)
          </button>
          <button
            type="button"
            onClick={() => setTab('intensity')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              tab === 'intensity'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            Normalized Intensity (mm/day)
          </button>
          <button
            type="button"
            onClick={() => setTab('series')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              tab === 'series'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            26-Year Seasonal Intensity Series
          </button>
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {tab === 'share' ? (
            <BarChart data={summary} layout="vertical" margin={{ top: 10, right: 32, left: 32, bottom: 10 }}>
              <CartesianGrid stroke="#1C3245" strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 85]}
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
                unit="%"
              />
              <YAxis
                type="category"
                dataKey="Season"
                width={140}
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#DCE8EF' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const r = payload[0].payload as SeasonalSummaryRow;
                  return (
                    <div className="border border-ink bg-parchment p-3 font-mono text-xs shadow-md">
                      <div className="border-b border-hairline pb-1 font-semibold">{r.Season}</div>
                      <div className="mt-1.5 space-y-1 text-[11px]">
                        <div>Share: {fmtNum(r.Contribution_Percent, 2)}%</div>
                        <div>Mean Total: {fmtNum(r.mean, 2)} mm</div>
                        <div>Range: {fmtNum(r.min, 2)} – {fmtNum(r.max, 2)} mm</div>
                      </div>
                    </div>
                  );
                }}
              />
              <Bar dataKey="Contribution_Percent" maxBarSize={32} isAnimationActive={false}>
                {summary.map((s) => (
                  <Cell key={s.Season} fill={SEASON_COLORS[s.Season] || '#8FB6CD'} />
                ))}
              </Bar>
            </BarChart>
          ) : tab === 'intensity' ? (
            <BarChart data={intensitySummary} margin={{ top: 12, right: 20, left: 10, bottom: 8 }}>
              <CartesianGrid stroke="#1C3245" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="Season"
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#DCE8EF' }}
              />
              <YAxis
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
                label={{
                  value: 'Mean Daily Intensity (mm/day)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#7F96A5' },
                }}
              />
              <Tooltip
                formatter={(val: number) => [`${fmtNum(val, 3)} mm/day`, 'Mean Daily Intensity']}
                contentStyle={{
                  backgroundColor: '#0C1E2E',
                  borderColor: '#DCE8EF',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="mean" maxBarSize={48} isAnimationActive={false}>
                {intensitySummary.map((s) => (
                  <Cell key={s.Season} fill={SEASON_COLORS[s.Season] || '#8FB6CD'} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <LineChart data={yearlyIntensity} margin={{ top: 12, right: 20, left: 10, bottom: 8 }}>
              <CartesianGrid stroke="#1C3245" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="Year"
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
              />
              <YAxis
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
                label={{
                  value: 'Seasonal Intensity (mm/day)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#7F96A5' },
                }}
              />
              <Tooltip
                formatter={(val: number, name: string) => [`${fmtNum(val, 3)} mm/day`, name]}
                contentStyle={{
                  backgroundColor: '#0C1E2E',
                  borderColor: '#DCE8EF',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                }}
              />
              <Line type="monotone" dataKey="Southwest Monsoon" stroke="#8FB6CD" strokeWidth={2} dot={{ r: 2 }} isAnimationActive={false} />
              <Line type="monotone" dataKey="Pre-Monsoon" stroke="#C9A35A" strokeWidth={1.8} dot={{ r: 2 }} isAnimationActive={false} />
              <Line type="monotone" dataKey="Post-Monsoon" stroke="#5C9B9B" strokeWidth={1.8} dot={{ r: 2 }} isAnimationActive={false} />
              <Line type="monotone" dataKey="Winter" stroke="#3E6A86" strokeWidth={1.8} dot={{ r: 2 }} isAnimationActive={false} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Silent fallback check to satisfy TS unused prop rule while supporting future drilldown */}
      <div className="hidden">{yearlyTotals.length}</div>
    </div>
  );
}

