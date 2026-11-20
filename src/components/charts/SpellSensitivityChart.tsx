import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { SensitivityYearlyRow } from '../../data/types';
import { fmtNum } from '../../utils/formatters';

interface SpellSensitivityChartProps {
  cddYearly: SensitivityYearlyRow[];
  cwdYearly: SensitivityYearlyRow[];
}

export function SpellSensitivityChart({ cddYearly, cwdYearly }: SpellSensitivityChartProps) {
  const [indexMode, setIndexMode] = useState<'CDD' | 'CWD'>('CDD');

  const mergedData = useMemo(() => {
    const src = indexMode === 'CDD' ? cddYearly : cwdYearly;
    const byYear = new Map<number, { Year: number; scenarioA?: number; scenarioB?: number }>();
    src.forEach((row) => {
      const entry = byYear.get(row.Year) ?? { Year: row.Year };
      const val = indexMode === 'CDD' ? row.Mean_CDD_Days : row.Mean_CWD_Days;
      if (row.Scenario.startsWith('A_')) entry.scenarioA = val;
      else entry.scenarioB = val;
      byYear.set(row.Year, entry);
    });
    return Array.from(byYear.values()).sort((a, b) => a.Year - b.Year);
  }, [cddYearly, cwdYearly, indexMode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIndexMode('CDD')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              indexMode === 'CDD'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            Consecutive Dry Days (CDD)
          </button>
          <button
            type="button"
            onClick={() => setIndexMode('CWD')}
            className={`border px-3 py-1 font-mono text-xs transition ${
              indexMode === 'CWD'
                ? 'border-ink bg-ink text-ivory'
                : 'border-hairline bg-ivory text-slateink hover:border-ink'
            }`}
          >
            Consecutive Wet Days (CWD)
          </button>
        </div>

        <div className="font-mono text-[11px] text-slateink">
          Scenario A: All 4,885 footprint cells · Scenario B: 4,795 unflagged cells (90 anomalous zero-rain cells excluded)
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mergedData} margin={{ top: 10, right: 20, left: 6, bottom: 8 }}>
            <CartesianGrid stroke="#1C3245" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="Year"
              tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
            />
            <YAxis
              tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
              label={{
                value: `Mean ${indexMode} (days/year)`,
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#7F96A5' },
              }}
            />
            <Tooltip
              formatter={(val: number, name: string) => [`${fmtNum(val, 2)} days`, name]}
              contentStyle={{
                backgroundColor: '#0C1E2E',
                borderColor: '#DCE8EF',
                fontFamily: 'JetBrains Mono',
                fontSize: '11px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
            <Line
              type="monotone"
              dataKey="scenarioA"
              name="Scenario A (All 4,885 cells)"
              stroke="#D9895A"
              strokeWidth={2}
              dot={{ r: 2.5 }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="scenarioB"
              name="Scenario B (4,795 unflagged cells)"
              stroke="#8FB6CD"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={{ r: 2.5 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

