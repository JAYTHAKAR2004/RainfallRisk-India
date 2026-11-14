import type { ReactNode } from 'react';
import { Maximize2 } from 'lucide-react';
import type { LightboxAsset } from '../layout/LightboxModal';

interface FigureFrameProps {
  figureNumber: string;
  title: string;
  subtitle?: string;
  caption: string;
  sourceLabel?: string;
  imageSrc?: string;
  onInspectImage?: (asset: LightboxAsset) => void;
  children?: ReactNode;
  accent?: 'blue' | 'teal' | 'extreme' | 'neutral';
}

export function FigureFrame({
  figureNumber,
  title,
  subtitle,
  caption,
  sourceLabel,
  imageSrc,
  onInspectImage,
  children,
  accent = 'blue',
}: FigureFrameProps) {
  const accentBorder = {
    blue: 'border-t-rainblue',
    teal: 'border-t-monsoon',
    extreme: 'border-t-extreme',
    neutral: 'border-t-ink',
  }[accent];

  return (
    <figure className={`border border-hairline border-t-2 ${accentBorder} bg-parchment`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hairline px-5 py-3.5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-rainblue">
              {figureNumber}
            </span>
            {subtitle && (
              <span className="font-mono text-[11px] text-mutedink">/ {subtitle}</span>
            )}
          </div>
          <h4 className="mt-0.5 font-editorial text-xl font-medium text-ink">{title}</h4>
        </div>
        {imageSrc && onInspectImage && (
          <button
            type="button"
            onClick={() =>
              onInspectImage({
                src: imageSrc,
                title,
                caption,
                figureNumber,
              })
            }
            className="inline-flex items-center gap-1.5 border border-hairline bg-ivory px-2.5 py-1 font-mono text-[11px] text-slateink transition hover:border-ink hover:text-ink"
          >
            <Maximize2 className="h-3 w-3" />
            Inspect Full Res
          </button>
        )}
      </div>

      <div className="p-4 sm:p-5">
        {children ? (
          children
        ) : imageSrc ? (
          <div className="flex justify-center border border-hairline/60 bg-white p-2">
            <img
              src={imageSrc}
              alt={title}
              loading="lazy"
              className="max-h-[460px] w-auto cursor-zoom-in object-contain"
              onClick={() =>
                onInspectImage?.({
                  src: imageSrc,
                  title,
                  caption,
                  figureNumber,
                })
              }
            />
          </div>
        ) : null}
      </div>

      <figcaption className="border-t border-hairline bg-ivory/60 px-5 py-3 text-xs leading-relaxed text-slateink">
        <span>{caption}</span>
        {sourceLabel && (
          <span className="mt-1 block font-mono text-[11px] text-mutedink">
            Provenance: {sourceLabel}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
