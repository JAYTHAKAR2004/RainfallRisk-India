import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import type { AnnualStatRow, PageRoute } from '../../data/types';
import { fmtNum } from '../../utils/formatters';

interface MonsoonSkyHeroProps {
  annual: AnnualStatRow[];
  onNavigate: (route: PageRoute) => void;
}

/* ------------------------------------------------------------------ */
/* Reduced-motion preference                                           */
/* ------------------------------------------------------------------ */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
/* Procedural cloud layer (seamless, stitched fractal noise)           */
/* ------------------------------------------------------------------ */
interface CloudLayerProps {
  id: string;
  seed: number;
  baseFrequency: string;
  octaves: number;
  duration: number;
  tint: [number, number, number];
  density: number;
  threshold: number;
  opacity: number;
  top: string;
  height: string;
  mask: string;
  reverse?: boolean;
}

function CloudLayer({
  id,
  seed,
  baseFrequency,
  octaves,
  duration,
  tint,
  density,
  threshold,
  opacity,
  top,
  height,
  mask,
  reverse = false,
}: CloudLayerProps) {
  const [r, g, b] = tint;
  const matrix = `0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  ${density} 0 0 0 ${-threshold}`;

  const tile = (key: number) => (
    <svg
      key={key}
      className="h-full w-1/2 shrink-0"
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <filter id={`${id}-f${key}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={baseFrequency}
          numOctaves={octaves}
          seed={seed}
          stitchTiles="stitch"
        />
        <feColorMatrix type="matrix" values={matrix} />
      </filter>
      <rect width="1200" height="600" filter={`url(#${id}-f${key})`} />
    </svg>
  );

  return (
    <div
      className="pointer-events-none absolute inset-x-0 overflow-hidden"
      style={{
        top,
        height,
        opacity,
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    >
      <div
        className="cloud-drift flex h-full w-[200%]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {tile(0)}
        {tile(1)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Distant lightning bolt path (midpoint jitter, one optional branch)  */
/* ------------------------------------------------------------------ */
function makeBoltPath(x0: number, maxY: number): string {
  let x = x0;
  let y = 0;
  const main: [number, number][] = [[x, y]];
  while (y < maxY) {
    y += 12 + Math.random() * 24;
    x += (Math.random() - 0.5) * 34;
    main.push([x, y]);
  }
  let d = 'M' + main.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join(' L');
  const branchFrom = main[Math.floor(main.length * (0.3 + Math.random() * 0.3))];
  if (branchFrom) {
    let bx = branchFrom[0];
    let by = branchFrom[1];
    const dir = Math.random() > 0.5 ? 1 : -1;
    const branch: [number, number][] = [[bx, by]];
    for (let i = 0; i < 5; i += 1) {
      by += 10 + Math.random() * 16;
      bx += dir * (8 + Math.random() * 18);
      branch.push([bx, by]);
    }
    d += ' M' + branch.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join(' L');
  }
  return d;
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export function MonsoonSkyHero({ annual, onNavigate }: MonsoonSkyHeroProps) {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const rainRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const boltRef = useRef<SVGSVGElement>(null);
  const [boltPath, setBoltPath] = useState<string>('');

  /* ---- Gentle rain (canvas) ---- */
  useEffect(() => {
    if (reduced) return;
    const canvas = rainRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    type Drop = { x: number; y: number; len: number; speed: number; alpha: number; width: number };
    const WIND = 0.16;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let drops: Drop[] = [];
    let raf = 0;
    let inView = true;

    const spawn = (anywhere: boolean): Drop => {
      const depth = Math.random();
      return {
        x: Math.random() * (w + 160) - 120,
        y: anywhere ? Math.random() * h : -20 - Math.random() * h * 0.25,
        len: 7 + depth * 17,
        speed: 4.2 + depth * 8.5,
        alpha: 0.06 + depth * 0.2,
        width: 0.5 + depth * 0.75,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(190, (w * h) / 10000));
      drops = Array.from({ length: count }, () => spawn(true));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = 'round';
      for (const d of drops) {
        ctx.strokeStyle = `rgba(214, 229, 240, ${d.alpha})`;
        ctx.lineWidth = d.width;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * WIND, d.y - d.len);
        ctx.stroke();
        d.y += d.speed;
        d.x += d.speed * WIND;
        if (d.y - d.len > h) Object.assign(d, spawn(false));
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (inView && !document.hidden) raf = requestAnimationFrame(frame);
    };

    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      start();
    });
    io.observe(section);
    const onVis = () => start();
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduced]);

  /* ---- Occasional distant lightning ---- */
  useEffect(() => {
    if (reduced) return;
    let timer = 0;
    let cancelled = false;

    const strike = () => {
      const flash = flashRef.current;
      if (!flash || document.hidden) return;
      const x = 15 + Math.random() * 70;
      const y = 8 + Math.random() * 22;
      flash.style.background = `radial-gradient(55% 45% at ${x}% ${y}%, rgba(217, 232, 243, 0.55), rgba(114, 156, 181, 0.18) 45%, transparent 75%)`;

      const keyframes: Keyframe[] = [
        { opacity: 0 },
        { opacity: 0.55, offset: 0.04 },
        { opacity: 0.08, offset: 0.1 },
        { opacity: 0.9, offset: 0.15 },
        { opacity: 0.25, offset: 0.32 },
        { opacity: 0 },
      ];
      flash.animate(keyframes, { duration: 1500, easing: 'ease-out' });

      if (Math.random() < 0.4 && boltRef.current) {
        setBoltPath(makeBoltPath(x * 10, 160 + Math.random() * 120));
        boltRef.current.animate(
          [
            { opacity: 0 },
            { opacity: 0.5, offset: 0.04 },
            { opacity: 0.05, offset: 0.1 },
            { opacity: 0.7, offset: 0.15 },
            { opacity: 0 , offset: 0.4 },
            { opacity: 0 },
          ],
          { duration: 1500, easing: 'ease-out' }
        );
      }
    };

    const schedule = (delay: number) => {
      timer = window.setTimeout(() => {
        if (cancelled) return;
        strike();
        schedule(7000 + Math.random() * 11000);
      }, delay);
    };
    schedule(3800);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reduced]);

  /* ---- Rain-curtain data strip (26 annual totals) ---- */
  const values = annual.map((r) => r.Annual_Rainfall_mm);
  const vMin = Math.min(...values);
  const vMax = Math.max(...values);
  const mean = values.reduce((a, v) => a + v, 0) / (values.length || 1);

  const scrollOnward = () => {
    const next = sectionRef.current?.nextElementSibling as HTMLElement | null;
    next?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-[calc(100svh-5.5rem)] min-h-[660px] overflow-hidden"
      aria-label="RainfallRisk India — monsoon sky introduction"
    >
      {/* 1. Sky gradient: storm zenith → atmospheric blue → luminous horizon */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #050F19 0%, #071522 22%, #0D2233 48%, #1A3243 70%, #2C4352 86%, #0B1C2B 100%)',
        }}
      />

      {/* 2. Wandering patch of thinner cloud where diffuse light breaks through */}
      <div
        className="sky-light-wander absolute -inset-x-1/4 top-[18%] h-[55%]"
        style={{
          background:
            'radial-gradient(40% 50% at 55% 55%, rgba(114, 156, 181, 0.28), rgba(52, 70, 83, 0.12) 50%, transparent 75%)',
        }}
      />

      {/* 3. Far cloud deck — slow, broad, cool */}
      <CloudLayer
        id="cl-far"
        seed={7}
        baseFrequency="0.0032 0.0085"
        octaves={5}
        duration={240}
        tint={[0.2, 0.27, 0.32]}
        density={3.0}
        threshold={1.05}
        opacity={0.85}
        top="-4%"
        height="70%"
        mask="linear-gradient(180deg, #000 0%, #000 55%, transparent 100%)"
      />

      {/* 4. Distant lightning bolt, buried inside the cloud deck */}
      <svg
        ref={boltRef}
        className="pointer-events-none absolute inset-x-0 top-0 h-[48%] w-full opacity-0"
        viewBox="0 0 1000 300"
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
        style={{ filter: 'drop-shadow(0 0 6px rgba(217, 232, 243, 0.9)) blur(0.4px)' }}
      >
        <path d={boltPath} fill="none" stroke="#EAF3FA" strokeWidth={1.4} strokeLinejoin="round" />
      </svg>

      {/* 5. Lightning glow — illuminates the clouds from within */}
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* 6. Mid cloud layer — thundercloud grey, faster */}
      <CloudLayer
        id="cl-mid"
        seed={23}
        baseFrequency="0.0045 0.011"
        octaves={5}
        duration={150}
        tint={[0.16, 0.22, 0.27]}
        density={3.4}
        threshold={1.35}
        opacity={0.9}
        top="-8%"
        height="62%"
        mask="linear-gradient(180deg, #000 0%, #000 40%, transparent 100%)"
        reverse
      />

      {/* 7. Rain falling from the cloud base */}
      {!reduced && (
        <canvas
          ref={rainRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[14%] h-[86%] w-full"
          style={{
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%)',
            maskImage: 'linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* 8. Near cloud fringe — darkest, fastest, frames the top edge */}
      <CloudLayer
        id="cl-near"
        seed={51}
        baseFrequency="0.006 0.016"
        octaves={4}
        duration={95}
        tint={[0.03, 0.08, 0.13]}
        density={3.8}
        threshold={1.7}
        opacity={0.95}
        top="-12%"
        height="38%"
        mask="linear-gradient(180deg, #000 0%, #000 45%, transparent 100%)"
      />

      {/* 9. Ground fog near the horizon */}
      <CloudLayer
        id="cl-fog"
        seed={88}
        baseFrequency="0.0026 0.02"
        octaves={3}
        duration={180}
        tint={[0.62, 0.72, 0.78]}
        density={2.2}
        threshold={1.0}
        opacity={0.16}
        top="62%"
        height="40%"
        mask="linear-gradient(180deg, transparent 0%, #000 40%, #000 70%, transparent 100%)"
        reverse
      />

      {/* 10. Vignette + base fade into the page */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(3, 9, 15, 0.6) 100%), linear-gradient(180deg, transparent 75%, #0B1C2B 100%)',
        }}
      />

      {/* ---------------- Content ---------------- */}
      <div className="relative z-20 mx-auto flex h-full max-w-[1400px] flex-col justify-between px-4 pb-8 pt-10 sm:px-6 lg:px-10">
        {/* Instrument line */}
        <div className="hero-rise flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.32em] text-mist/60" style={{ animationDelay: '0.1s' }}>
          <span>IMD Gridded 0.25° · State &amp; District Bulletins</span>
          <span className="hidden sm:inline">Observation 00 · Under the Monsoon Sky</span>
        </div>

        {/* Title block */}
        <div className="max-w-5xl">
          <div
            className="hero-rise font-mono text-xs font-medium uppercase tracking-[0.62em] text-lightning/85 sm:text-sm"
            style={{ animationDelay: '0.3s' }}
          >
            RainfallRisk India
          </div>

          <h1
            className="hero-rise mt-6 font-editorial text-[clamp(3.1rem,9.2vw,8.75rem)] font-medium leading-[0.9] tracking-[-0.03em] text-mist"
            style={{ animationDelay: '0.55s', textShadow: '0 2px 40px rgba(7, 21, 34, 0.8)' }}
          >
            Every Drop
            <br />
            <em className="font-normal italic text-rain">Tells a Story.</em>
          </h1>

          <p
            className="hero-rise mt-7 max-w-2xl text-base leading-relaxed text-mist/75 sm:text-lg"
            style={{ animationDelay: '0.85s' }}
          >
            An exploratory statistical investigation of historical rainfall variability, extreme precipitation, seasonal
            character, and regional rainfall differences across India — read from 26 years of gridded observations and a
            season of district bulletins.
          </p>

          <div className="hero-rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ animationDelay: '1.1s' }}>
            <button
              type="button"
              onClick={() => onNavigate('historical')}
              className="group inline-flex items-center gap-3 border-b border-mist/70 pb-1.5 font-mono text-xs font-medium uppercase tracking-[0.22em] text-mist transition hover:border-lightning hover:text-lightning"
            >
              Explore the Research
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('atlas')}
              className="inline-flex items-center gap-2 pb-1.5 font-mono text-xs uppercase tracking-[0.22em] text-mist/60 transition hover:text-mist"
            >
              Enter the Atlas
            </button>
          </div>
        </div>

        {/* Lower deck: study periods · rain-curtain data · descend cue */}
        <div className="hero-rise grid grid-cols-1 items-end gap-8 border-t border-mist/15 pt-6 md:grid-cols-12" style={{ animationDelay: '1.35s' }}>
          <div className="grid grid-cols-2 gap-6 md:col-span-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-rain">Historical sky</div>
              <div className="mt-1 font-editorial text-3xl text-mist">2000–2025</div>
              <div className="mt-1 font-mono text-[11px] text-mist/55">26 years · 4,885 grid cells</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-tealsky">Recent season</div>
              <div className="mt-1 font-editorial text-3xl text-mist">19 Aug – 12 Nov 2026</div>
              <div className="mt-1 font-mono text-[11px] text-mist/55">36 States/UTs · 727 districts</div>
            </div>
          </div>

          {/* Rain curtain: each strand is one year's footprint total, hanging from the cloud base */}
          <figure className="md:col-span-5">
            <div className="flex h-20 items-start gap-[5px]" role="img" aria-label="Annual footprint rainfall 2000 to 2025 drawn as hanging rain strands">
              {annual.map((row) => {
                const t = (row.Annual_Rainfall_mm - vMin) / (vMax - vMin || 1);
                const isMax = row.Annual_Rainfall_mm === vMax;
                const isMin = row.Annual_Rainfall_mm === vMin;
                const color = isMax ? '#5C9B9B' : isMin ? '#D9895A' : row.Annual_Rainfall_mm >= mean ? 'rgba(217,232,243,0.75)' : 'rgba(114,156,181,0.55)';
                return (
                  <div
                    key={row.Year}
                    title={`${row.Year}: ${fmtNum(row.Annual_Rainfall_mm, 1)} mm`}
                    className="w-[2px] flex-1 rounded-b-full transition-opacity hover:opacity-60"
                    style={{
                      height: `${22 + t * 78}%`,
                      background: `linear-gradient(180deg, rgba(217,232,243,0.05), ${color})`,
                    }}
                  />
                );
              })}
            </div>
            <figcaption className="mt-2 flex justify-between font-mono text-[10px] text-mist/50">
              <span>2000</span>
              <span>
                Annual rainfall · mean {fmtNum(mean, 2)} mm · <span className="text-extreme">min {fmtNum(vMin, 1)}</span> ·{' '}
                <span className="text-tealsky">max {fmtNum(vMax, 1)}</span>
              </span>
              <span>2025</span>
            </figcaption>
          </figure>

          <div className="flex md:col-span-2 md:justify-end">
            <button
              type="button"
              onClick={scrollOnward}
              className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-mist/60 transition hover:text-mist"
              aria-label="Scroll to the research"
            >
              <span className="relative block h-10 w-px overflow-hidden bg-mist/15">
                <span className="cue-drop absolute inset-x-0 top-0 block h-4 bg-gradient-to-b from-transparent to-lightning" />
              </span>
              Descend
              <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

