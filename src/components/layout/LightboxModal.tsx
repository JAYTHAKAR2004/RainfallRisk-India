import { useEffect } from 'react';
import { X, Download } from 'lucide-react';

export interface LightboxAsset {
  src: string;
  title: string;
  caption?: string;
  figureNumber?: string;
}

interface LightboxModalProps {
  asset: LightboxAsset | null;
  onClose: () => void;
}

export function LightboxModal({ asset, onClose }: LightboxModalProps) {
  useEffect(() => {
    if (!asset) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [asset, onClose]);

  if (!asset) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={asset.title}
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden border border-ink bg-parchment shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-hairline bg-ivory px-5 py-3">
          <div>
            {asset.figureNumber && (
              <span className="mr-3 font-mono text-xs font-semibold uppercase tracking-widest text-rainblue">
                {asset.figureNumber}
              </span>
            )}
            <span className="font-editorial text-lg font-medium text-ink">{asset.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={asset.src}
              download
              className="inline-flex items-center gap-1.5 border border-hairline bg-parchment px-3 py-1.5 font-mono text-xs text-ink transition hover:border-ink"
            >
              <Download className="h-3.5 w-3.5" />
              Save Image
            </a>
            <button
              type="button"
              onClick={onClose}
              className="border border-hairline bg-parchment p-1.5 text-ink transition hover:border-ink"
              aria-label="Close figure viewer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex max-h-[74vh] items-center justify-center overflow-auto bg-white p-4">
          <img src={asset.src} alt={asset.title} className="max-h-[68vh] w-auto object-contain" />
        </div>
        {asset.caption && (
          <div className="border-t border-hairline bg-ivory px-5 py-3 text-xs leading-relaxed text-slateink">
            {asset.caption}
            <span className="ml-2 font-mono text-[11px] text-mutedink">Source: {asset.src}</span>
          </div>
        )}
      </div>
    </div>
  );
}

