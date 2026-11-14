export interface LegendStop {
  color: string;
  label: string;
}

interface MapLegendProps {
  title: string;
  unit?: string;
  stops: LegendStop[];
  note?: string;
}

export function MapLegend({ title, unit, stops, note }: MapLegendProps) {
  return (
    <div className="border border-hairline bg-parchment/95 p-3">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-ink">
          {title}
        </span>
        {unit && <span className="font-mono text-[10px] text-mutedink">{unit}</span>}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {stops.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-4 border border-ink/25"
              style={{ backgroundColor: s.color }}
            />
            <span className="font-mono text-[10px] text-slateink">{s.label}</span>
          </div>
        ))}
      </div>
      {note && <p className="mt-2 font-mono text-[10px] leading-snug text-mutedink">{note}</p>}
    </div>
  );
}

