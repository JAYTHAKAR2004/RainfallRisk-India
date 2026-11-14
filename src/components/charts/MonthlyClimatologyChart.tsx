import { useMemo, useState } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { MonthlyClimatologyRow, MonthlyTotalRow } from '../../data/types';
import { fmtNum } from '../../utils/formatters';

interface MonthlyClimatologyChartProps {
  climatology: MonthlyClimatologyRow[];
  monthlyTotals: MonthlyTotalRow[];
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function cellColor(mm: number): string {
  if (mm < 15) return '#F2EFE8';
  if (mm < 40) return '#DCE8F0';
  if (mm < 90) return '#AECBE0';
  if (mm < 160) return '#6FA3C7';
  if (mm < 230) return '#2F79A8';
  if (mm < 300) return '#1D5B86';
  return '#113A58';
}

export function MonthlyClimatologyChart({
  climatology,
  monthlyTotals,
}: MonthlyClimatologyChartProps) {
  const [view, setView] = useState<'profile' | 'heatmap'>('profile');
  const [hoveredCell, setHoveredCell] = useState<{ year: number; month: number; mm: number } | null>(null);

  const years = useMemo(() => {
    return Array.from(new Set(monthlyTotals.map((r) => r.Year))).sort((a, b) => a - b);
  }, [monthlyTotals]);

  const lookup = useMemo(() => {
    const map = new Map<string, number>();
    monthlyTotals.forEach((r) => {
      map.set(`${r.Year}-${r.Month}`, r.Monthly_Rainfall_mm);
    });
    return map;
  }, [monthlyTotals]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setView('profile')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              view === 'profile'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            Climatological Profile (Mean &amp; Median)
          </button>
          <button
            type="button"
            onClick={() => setView('heatmap')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              view === 'heatmap'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            26 × 12 Year-Month Matrix (312 records)
          </button>
        </div>

        {view === 'heatmap' && hoveredCell && (
          <div className="font-mono text-xs text-ink">
            <span className="text-mutedink">Selected Cell:</span>{' '}
            <span className="font-semibold">
              {MONTH_NAMES[hoveredCell.month - 1]} {hoveredCell.year}
            </span>{' '}
            — <span className="font-semibold text-rainblue">{fmtNum(hoveredCell.mm, 2)} mm</span>
          </div>
        )}
      </div>

      {view === 'profile' ? (
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={climatology} margin={{ top: 14, right: 20, left: 6, bottom: 8 }}>
              <CartesianGrid stroke="#E4DFD4" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="Month_Name"
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#3E4C59' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#3E4C59' }}
                tickLine={false}
                label={{
                  value: 'Monthly Rainfall (mm)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#667480' },
                }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const r = payload[0].payload as MonthlyClimatologyRow;
                  return (
                    <div className="border border-ink bg-parchment p-3 font-mono text-xs shadow-md">
                      <div className="border-b border-hairline pb-1 font-semibold text-ink">
                        {r.Month_Name} (2000–2025)
                      </div>
                      <div className="mt-1.5 space-y-1 text-[11px]">
                        <div className="flex justify-between gap-4">
                          <span className="text-mutedink">Mean:</span>
                          <span className="font-semibold text-rainblue">{fmtNum(r.mean, 2)} mm</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-mutedink">Median:</span>
                          <span className="font-semibold text-monsoon">{fmtNum(r.median, 2)} mm</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-mutedink">Std Dev:</span>
                          <span>±{fmtNum(r.std, 2)} mm</span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <Bar dataKey="mean" name="Mean (mm)" fill="#1D5B86" maxBarSize={32} isAnimationActive={false} />
              <Line
                type="monotone"
                dataKey="median"
                name="Median (mm)"
                stroke="#C85A28"
                strokeWidth={2}
                dot={{ r: 3, fill: '#C85A28' }}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-[10px]">
            <thead>
              <tr>
                <th className="border border-hairline bg-atlas px-2 py-1 text-left text-ink">Year</th>
                {MONTH_NAMES.map((m) => (
                  <th key={m} className="border border-hairline bg-atlas px-1.5 py-1 text-center text-ink">
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {years.map((yr) => (
                <tr key={yr}>
                  <td className="border border-hairline bg-ivory px-2 py-1 font-semibold text-ink">
                    {yr}
                  </td>
                  {MONTH_NAMES.map((_, idx) => {
                    const month = idx + 1;
                    const val = lookup.get(`${yr}-${month}`) ?? 0;
                    const darkBg = val >= 160;
                    return (
                      <td
                        key={month}
                        onMouseEnter={() => setHoveredCell({ year: yr, month, mm: val })}
                        style={{ backgroundColor: cellColor(val) }}
                        className={`cursor-crosshair border border-hairline/70 px-1.5 py-1 text-right tabular-nums transition ${
                          darkBg ? 'text-ivory' : 'text-ink'
                        }`}
                        title={`${MONTH_NAMES[idx]} ${yr}: ${fmtNum(val, 2)} mm`}
                      >
                        {Math.round(val)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

