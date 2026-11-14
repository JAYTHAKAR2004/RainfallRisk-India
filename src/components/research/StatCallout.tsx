interface StatCalloutProps {
  label: string;
  value: string;
  unit?: string;
  note: string;
  tone?: 'default' | 'rain' | 'monsoon' | 'extreme';
}

export function StatCallout({ label, value, unit, note, tone = 'default' }: StatCalloutProps) {
  const toneClass = {
    default: 'text-ink',
    rain: 'text-rainblue',
    monsoon: 'text-monsoon',
    extreme: 'text-extreme',
  }[tone];

  return (
    <div className="border-t border-hairline pt-3.5">
      <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-mutedink">
        {label}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className={`font-editorial text-3xl font-semibold tabular-nums sm:text-4xl ${toneClass}`}>
          {value}
        </span>
        {unit && <span className="font-mono text-xs text-slateink">{unit}</span>}
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-slateink">{note}</p>
    </div>
  );
}

