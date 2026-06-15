'use client';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { PARTS, TOTALS, META, PRICE_AS_OF } from '../lib/build';
import PartCard from './components/PartCard';

// three.js scene is client-only
const Build3D = dynamic(() => import('./components/Build3D'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center text-muted text-sm font-mono animate-pulse">
      loading 3D build…
    </div>
  ),
});

const usd = (n) => '$' + Math.round(n).toLocaleString('en-US');
const STORAGE_KEY = 'apex-build-owned-v1';

export default function Page() {
  const [bought, setBought] = useState(() => new Set());
  const [hydrated, setHydrated] = useState(false);
  const [explode, setExplode] = useState(0);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBought(new Set(JSON.parse(raw)));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify([...bought]));
  }, [bought, hydrated]);

  const toggle = (id) =>
    setBought((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const ownedCost = useMemo(
    () => PARTS.filter((p) => bought.has(p.id)).reduce((s, p) => s + p.price.current, 0),
    [bought]
  );
  const ownedCount = bought.size;
  const pct = Math.round((ownedCount / PARTS.length) * 100);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      {/* ───── HERO ───── */}
      <header className="pt-16 sm:pt-24 pb-10 text-center">
        <div className="chip mx-auto mb-5 animate-floaty">⚡ Flagship build showcase · Updated {PRICE_AS_OF}</div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          <span className="text-gradient">{META.name}</span>
        </h1>
        <p className="mt-4 text-slate-300/90 max-w-2xl mx-auto text-base sm:text-lg">
          {META.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Stat label="Build cost (now)" value={usd(TOTALS.current)} accent="#7df9ff" />
          <Stat label="Range" value={`${usd(TOTALS.low)} – ${usd(TOTALS.high)}`} accent="#b6ff6b" />
          <Stat label="Parts" value={`${PARTS.length}`} accent="#f4c042" />
        </div>
        <p className="mt-3 text-[11px] text-muted">
          Prices are US street estimates researched {PRICE_AS_OF}; click “price source” on any card to verify.
        </p>
      </header>

      {/* ───── 3D VIEWER ───── */}
      <section className="glass rounded-3xl overflow-hidden mb-14">
        <div className="relative h-[420px] sm:h-[520px]">
          <Build3D explode={explode} selectedId={focused} boughtIds={bought} onSelect={setFocused} />
          <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-start justify-between">
            <div>
              <p className="text-xs font-mono text-brand/80">
                {explode < 0.05 ? 'COMPLETED BUILD' : explode > 0.9 ? 'EXPLODED VIEW' : 'DISASSEMBLING…'}
              </p>
              <p className="text-[10px] text-muted mt-0.5">drag to orbit · scroll to zoom · click a part</p>
            </div>
            {focused && (
              <span className="chip">{PARTS.find((p) => p.id === focused)?.name || focused}</span>
            )}
          </div>
        </div>

        <div className="px-5 sm:px-8 py-5 border-t border-line/60 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setExplode(0)}
              className={`text-xs px-3 py-2 rounded-lg ring-1 transition ${explode < 0.05 ? 'bg-brand/15 text-brand ring-brand/40' : 'bg-white/5 text-slate-300 ring-white/10 hover:bg-white/10'}`}
            >Assembled</button>
            <button
              onClick={() => setExplode(1)}
              className={`text-xs px-3 py-2 rounded-lg ring-1 transition ${explode > 0.95 ? 'bg-brand/15 text-brand ring-brand/40' : 'bg-white/5 text-slate-300 ring-white/10 hover:bg-white/10'}`}
            >Exploded</button>
          </div>
          <div className="flex-1 flex items-center gap-3">
            <span className="text-[11px] text-muted font-mono shrink-0">EXPLODE</span>
            <input
              type="range" min="0" max="1" step="0.01" value={explode}
              onChange={(e) => setExplode(parseFloat(e.target.value))}
              className="w-full accent-cyan-300"
              aria-label="Explode amount"
            />
          </div>
        </div>
      </section>

      {/* ───── BUILD TRACKER ───── */}
      <section className="glass rounded-2xl p-5 sm:p-6 mb-12 sticky top-3 z-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-200">Build tracker</h2>
            <p className="text-xs text-muted mt-0.5">
              {ownedCount} / {PARTS.length} parts owned · {usd(ownedCost)} spent · {usd(TOTALS.current - ownedCost)} to go
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gradient">{pct}%</div>
          </div>
        </div>
        <div className="mt-3 h-2.5 rounded-full bg-white/5 overflow-hidden">
          <div className="bar-fill h-full rounded-full" style={{ width: `${pct}%` }} />
        </div>
        {ownedCount > 0 && (
          <button
            onClick={() => setBought(new Set())}
            className="mt-3 text-[11px] text-muted hover:text-red-300 transition"
          >reset tracker</button>
        )}
      </section>

      {/* ───── PARTS GRID ───── */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PARTS.map((p) => (
          <PartCard
            key={p.id}
            part={p}
            bought={bought.has(p.id)}
            onToggle={toggle}
            onFocus={setFocused}
          />
        ))}
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="mt-16 text-center text-xs text-muted space-y-2">
        <p>
          Estimated total: <span className="text-slate-200 font-semibold">{usd(TOTALS.current)}</span>{' '}
          (range {usd(TOTALS.low)}–{usd(TOTALS.high)}) · prices as of {PRICE_AS_OF}.
        </p>
        <p className="max-w-xl mx-auto">
          Illustrations are original schematic art, not product photos. GPU & SSD prices are elevated above MSRP
          due to 2025–26 AI-demand and NAND shortages. Your “owned” selections are saved in this browser only.
        </p>
      </footer>
    </main>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="glass rounded-xl px-4 py-2.5 text-left">
      <div className="text-[10px] uppercase tracking-wider text-muted">{label}</div>
      <div className="text-lg font-bold" style={{ color: accent }}>{value}</div>
    </div>
  );
}
