import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { PrcptotSdiiAnnualRow, SpatialTrendSummaryRow } from '../../data/types';
import { fmtInt, fmtNum } from '../../utils/formatters';

interface ExtremeIndicesChartProps {
  spatialSummary: SpatialTrendSummaryRow[];
  prcptotSdiiAnnual: PrcptotSdiiAnnualRow[];
}

export function ExtremeIndicesChart({
  spatialSummary,
  prcptotSdiiAnnual,
}: ExtremeIndicesChartProps) {
  const breakdownData = spatialSummary.map((row) => ({
    Index: row.Index,
    Increasing: row.Increasing_FDR_05,
    Decreasing: row.Decreasing_FDR_05,
    NotSignificant: row.Not_Significant,
    pctSig: (((row.Increasing_FDR_05 + row.Decreasing_FDR_05) / row.Total_Cells) * 100).toFixed(1),
  }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="border border-hairline bg-parchment p-4">
        <div className="mb-3 border-b border-hairline pb-2">
          <div className="font-mono text-[10px] uppercase tracking-widest text-rainblue">
            Cell-Wise FDR Significance (N = 4,885 Grid Cells)
          </div>
          <h4 className="font-editorial text-lg font-medium text-ink">
            Significant Increasing vs Decreasing Cells per Index
          </h4>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={breakdownData} margin={{ top: 10, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="#1C3245" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="Index"
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#DCE8EF' }}
              />
              <YAxis
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
                label={{
                  value: 'Grid Cells (FDR α = 0.05)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#7F96A5' },
                }}
              />
              <Tooltip
                formatter={(val: number, name: string) => [fmtInt(val) + ' cells', name]}
                contentStyle={{
                  backgroundColor: '#0C1E2E',
                  borderColor: '#DCE8EF',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                }}
              />
              <Bar dataKey="Increasing" name="Significant Increasing" fill="#8FB6CD" isAnimationActive={false} />
              <Bar dataKey="Decreasing" name="Significant Decreasing" fill="#D9895A" isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 font-mono text-[11px] text-mutedink">
          Majority of cells across all 8 indices remain statistically non-significant after Benjamini–Hochberg FDR correction.
        </p>
      </div>

      <div className="border border-hairline bg-parchment p-4">
        <div className="mb-3 border-b border-hairline pb-2">
          <div className="font-mono text-[10px] uppercase tracking-widest text-monsoon">
            Spatial Footprint Annual Indices (2000–2025)
          </div>
          <h4 className="font-editorial text-lg font-medium text-ink">
            Mean PRCPTOT (mm) vs Mean SDII (mm/wet day)
          </h4>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={prcptotSdiiAnnual} margin={{ top: 10, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="#1C3245" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="Year"
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#A9BCC8' }}
              />
              <YAxis
                yAxisId="left"
                domain={[700, 1400]}
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#8FB6CD' }}
                label={{
                  value: 'PRCPTOT Mean (mm)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#8FB6CD' },
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[11, 15]}
                tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#D9895A' }}
                label={{
                  value: 'SDII Mean (mm/wet day)',
                  angle: 90,
                  position: 'insideRight',
                  style: { fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#D9895A' },
                }}
              />
              <Tooltip
                formatter={(val: number, name: string) => [
                  name.includes('PRCPTOT') ? `${fmtNum(val, 1)} mm` : `${fmtNum(val, 2)} mm/wet day`,
                  name,
                ]}
                contentStyle={{
                  backgroundColor: '#0C1E2E',
                  borderColor: '#DCE8EF',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                }}
              />
              <Bar yAxisId="left" dataKey="PRCPTOT_Mean" name="PRCPTOT Mean" fill="#AECBE0" isAnimationActive={false} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="SDII_Mean"
                name="SDII Mean"
                stroke="#D9895A"
                strokeWidth={2}
                dot={{ r: 2.5, fill: '#D9895A' }}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 font-mono text-[11px] text-mutedink">
          Holm-adjusted temporal trends for footprint PRCPTOT (p = 0.0892) and SDII (p = 0.3196) are not statistically significant.
        </p>
      </div>
    </div>
  );
}

