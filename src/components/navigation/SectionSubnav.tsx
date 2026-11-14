export interface SubnavSection {
  id: string;
  label: string;
}

interface SectionSubnavProps {
  title: string;
  sections: SubnavSection[];
}

export function SectionSubnav({ title, sections }: SectionSubnavProps) {
  return (
    <div className="border-b border-hairline bg-parchment">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-10">
        <span className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mutedink">
          {title}
        </span>
        <div className="flex items-center gap-1.5">
          {sections.map((sec, idx) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="shrink-0 border border-hairline bg-ivory px-2.5 py-1 font-mono text-[11px] text-slateink transition hover:border-ink hover:text-ink"
            >
              <span className="mr-1 text-mutedink">{String(idx + 1).padStart(2, '0')}.</span>
              {sec.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

