import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Download, Search } from 'lucide-react';
import { downloadRowsAsCsv } from '../../utils/csvExport';

export interface TableColumn<T> {
  key: keyof T & string;
  label: string;
  align?: 'left' | 'right';
  render?: (value: unknown, row: T) => string;
}

interface ScientificDataTableProps<T extends Record<string, any>> {
  title: string;
  subtitle?: string;
  data: T[];
  columns: TableColumn<T>[];
  defaultSortKey?: keyof T & string;
  defaultSortDir?: 'asc' | 'desc';
  pageSize?: number;
  exportFilename?: string;
  searchable?: boolean;
}

export function ScientificDataTable<T extends Record<string, any>>({
  title,
  subtitle,
  data,
  columns,
  defaultSortKey,
  defaultSortDir = 'desc',
  pageSize = 12,
  exportFilename,
  searchable = true,
}: ScientificDataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(defaultSortKey ?? null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(defaultSortDir);
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key];
        return val !== null && val !== undefined && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, columns, query]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va === null || va === undefined) return 1;
      if (vb === null || vb === undefined) return -1;
      if (typeof va === 'number' && typeof vb === 'number') {
        return sortDir === 'asc' ? va - vb : vb - va;
      }
      const sa = String(va);
      const sb = String(vb);
      return sortDir === 'asc' ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const slice = sorted.slice(safePage * pageSize, (safePage + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
    setPage(0);
  };

  return (
    <div className="border border-hairline bg-parchment">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-ivory/70 px-4 py-3">
        <div>
          <h4 className="font-editorial text-lg font-medium text-ink">{title}</h4>
          {subtitle && <p className="font-mono text-[11px] text-mutedink">{subtitle}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {searchable && (
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-2 h-3.5 w-3.5 text-mutedink" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(0);
                }}
                placeholder="Filter rows..."
                className="w-48 border border-hairline bg-parchment py-1 pl-8 pr-2.5 font-mono text-xs text-ink placeholder:text-mutedink focus:border-ink focus:outline-none"
              />
            </div>
          )}
          {exportFilename && (
            <button
              type="button"
              onClick={() => downloadRowsAsCsv(sorted, exportFilename)}
              className="inline-flex items-center gap-1.5 border border-hairline bg-parchment px-2.5 py-1 font-mono text-xs text-ink transition hover:border-ink"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV ({sorted.length})
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-ink bg-atlas/70">
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                return (
                  <th
                    key={col.key}
                    className={`whitespace-nowrap px-3.5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink ${
                      col.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className={`inline-flex items-center gap-1 hover:text-rainblue ${
                        col.align === 'right' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span>{col.label}</span>
                      {isSorted ? (
                        sortDir === 'asc' ? (
                          <ArrowUp className="h-3 w-3 text-rainblue" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-rainblue" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-mutedink/60" />
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {slice.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center font-mono text-xs text-mutedink">
                  No matching observations found.
                </td>
              </tr>
            ) : (
              slice.map((row, idx) => (
                <tr key={idx} className="transition-colors hover:bg-ivory/90">
                  {columns.map((col) => {
                    const raw = row[col.key];
                    const formatted = col.render
                      ? col.render(raw, row)
                      : raw === null || raw === undefined
                      ? '—'
                      : String(raw);
                    return (
                      <td
                        key={col.key}
                        className={`whitespace-nowrap px-3.5 py-2 ${
                          col.align === 'right' ? 'text-right font-mono tabular-nums text-ink' : 'text-slateink'
                        }`}
                      >
                        {formatted}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline bg-ivory/60 px-4 py-2 font-mono text-[11px] text-mutedink">
        <span>
          Showing {sorted.length === 0 ? 0 : safePage * pageSize + 1}–
          {Math.min((safePage + 1) * pageSize, sorted.length)} of {sorted.length} records
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safePage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="border border-hairline bg-parchment px-2 py-0.5 text-ink disabled:opacity-40"
            >
              Prev
            </button>
            <span>
              Page {safePage + 1} / {totalPages}
            </span>
            <button
              type="button"
              disabled={safePage >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className="border border-hairline bg-parchment px-2 py-0.5 text-ink disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

