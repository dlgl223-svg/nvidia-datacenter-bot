'use client';
import { useState } from 'react';
import PartArt from './PartArt';

const usd = (n) => '$' + n.toLocaleString('en-US');

export default function PartCard({ part, bought, onToggle, onFocus }) {
  const [tab, setTab] = useState('specs');
  const p = part;
  const hasCurrentAlt = p.alternatives?.some((a) => a.current);

  return (
    <article
      id={`part-${p.id}`}
      className={`glass card-hover rounded-2xl overflow-hidden flex flex-col ${bought ? 'ring-1 ring-emerald-400/40' : ''}`}
      onMouseEnter={() => onFocus && onFocus(p.id)}
      style={{ scrollMarginTop: 90 }}
    >
      {/* accent edge */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />

      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="chip" style={{ borderColor: p.accent + '55', color: p.accent }}>
              {p.category}{p.quantity > 1 ? ` · ×${p.quantity}` : ''}
            </span>
            <h3 className="mt-2 text-lg font-semibold leading-tight t-text">{p.name}</h3>
            <p className="text-xs text-muted mt-0.5">{p.brand}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xl font-bold" style={{ color: p.accent }}>{usd(p.price.current)}</div>
            <div className="text-[11px] text-muted font-mono">{usd(p.price.low)}–{usd(p.price.high)}</div>
            {p.price.elevated && (
              <div className="text-[10px] text-amber-500 mt-0.5">MSRP {usd(p.price.msrp)} ↑</div>
            )}
          </div>
        </div>

        {/* animated illustration — kept dark like a screen in both themes */}
        <div
          className="relative rounded-xl border bd-line h-36 overflow-hidden"
          style={{ background: '#080a12', boxShadow: `inset 0 0 60px -30px ${p.accent}` }}
        >
          <div className="absolute inset-0 p-2">
            <PartArt art={p.art} accent={p.accent} />
          </div>
        </div>

        <p className="text-sm t-soft leading-relaxed">{p.tagline}</p>

        {/* tabs */}
        <div className="flex gap-1 text-xs">
          {['specs', 'function'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg transition ${tab === t ? 'surface2 t-text' : 'text-muted hover:opacity-80'}`}
            >
              {t === 'specs' ? 'Specs' : 'How it works'}
            </button>
          ))}
        </div>

        {tab === 'specs' ? (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            {p.specs.map((s) => (
              <div key={s.label} className="flex flex-col border-b bd-line pb-1.5">
                <dt className="text-muted">{s.label}</dt>
                <dd className="font-medium t-text">{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="text-xs space-y-3">
            <p className="t-soft leading-relaxed">{p.howItWorks.summary}</p>
            <ol className="space-y-1.5">
              {p.howItWorks.steps.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span
                    className="shrink-0 w-5 h-5 rounded-full grid place-items-center text-[10px] font-bold"
                    style={{ background: p.accent + '22', color: p.accent }}
                  >{i + 1}</span>
                  <span className="t-soft">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* alternatives, with current-gen tagging */}
        {p.alternatives?.length > 0 && (
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase tracking-wider text-muted">
              {hasCurrentAlt ? 'Alternatives & current-gen swaps' : 'Alternatives'}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p.alternatives.map((a) => (
                <span
                  key={a.name}
                  title={a.note}
                  className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border cursor-help ${
                    a.current ? 'border-emerald-400/40 text-emerald-300' : 'bd-line t-soft'
                  }`}
                  style={a.current ? { background: 'rgba(52,211,153,0.08)' } : undefined}
                >
                  {a.current && <span className="text-[8px] font-bold tracking-wide text-emerald-400">2026</span>}
                  <span>{a.name}</span>
                  {a.price && <span className="text-muted">· {usd(a.price)}</span>}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div className="flex gap-2 flex-wrap">
            {p.sources.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-muted hover:text-brand underline decoration-dotted underline-offset-2"
                title={s.label}
              >
                price source ↗
              </a>
            ))}
          </div>
          <button
            onClick={() => onToggle(p.id)}
            className={`text-xs font-medium px-3 py-2 rounded-lg transition ${
              bought
                ? 'bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/40'
                : 'surface t-text surface-hover ring-1 bd-line'
            }`}
          >
            {bought ? '✓ Owned' : 'Mark as bought'}
          </button>
        </div>
      </div>
    </article>
  );
}
