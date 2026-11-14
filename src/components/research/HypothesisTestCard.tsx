interface HypothesisTestCardProps {
  testName: string;
  scope: string;
  statisticLabel: string;
  statisticValue: string;
  pValue: string;
  decision: string;
  significant: boolean;
  interpretation: string;
}

export function HypothesisTestCard({
  testName,
  scope,
  statisticLabel,
  statisticValue,
  pValue,
  decision,
  significant,
  interpretation,
}: HypothesisTestCardProps) {
  return (
    <div className="border border-hairline bg-parchment p-5">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-hairline pb-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-mutedink">
            {scope}
          </span>
          <h4 className="mt-0.5 font-editorial text-lg font-semibold text-ink">{testName}</h4>
        </div>
        <span
          className={`border px-2 py-0.5 font-mono text-[11px] font-medium ${
            significant
              ? 'border-rainblue/40 bg-rainblue/10 text-rainblue'
              : 'border-hairline bg-atlas text-slateink'
          }`}
        >
          {decision}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-4 border-b border-hairline pb-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-mutedink">
            {statisticLabel}
          </div>
          <div className="mt-0.5 font-mono text-base font-semibold tabular-nums text-ink">
            {statisticValue}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-mutedink">
            p-value
          </div>
          <div className="mt-0.5 font-mono text-base font-semibold tabular-nums text-ink">
            {pValue}
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slateink">{interpretation}</p>
    </div>
  );
}

