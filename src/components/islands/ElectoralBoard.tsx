import { useId, useState } from 'react';
import { dashboard } from '@/content/campanas';

type Tab = (typeof dashboard.tabs)[number]['id'];

const Bar = ({ label, value, max = 100 }: { label: string; value: number; max?: number }) => (
  <li className="grid grid-cols-[8.5rem_1fr_3.5rem] items-center gap-3 text-sm">
    <span className="truncate text-muted font-medium">{label}</span>
    <span className="h-3 overflow-hidden rounded-full bg-surface-3 p-0.5 border border-line/40">
      <span
        className="block h-full rounded-full bg-gradient-to-r from-accent/80 to-accent-bright shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-[width] duration-700"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </span>
    <span className="text-right font-mono text-accent-bright font-semibold">{value}</span>
  </li>
);

export default function ElectoralBoard() {
  const [tab, setTab] = useState<Tab>('menciones');
  const id = useId();
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line-strong/60 bg-surface-2/70 p-6 shadow-card backdrop-blur-xl md:p-8">
      {/* Luz ambiental sutil */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-accent/10 blur-3xl" />

      <div role="tablist" aria-label="Vistas del tablero" className="mb-8 flex flex-wrap gap-2.5">
        {dashboard.tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`${id}-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`${id}-panel`}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              tab === t.id
                ? 'bg-accent text-bg font-semibold shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-105'
                : 'border border-line bg-surface/50 text-muted hover:border-line-strong hover:text-fg'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${tab}`} className="min-h-48">
        {tab === 'menciones' && <ul className="grid gap-4">{dashboard.mentions.map((m) => <Bar key={m.name} label={m.name} value={m.value} />)}</ul>}
        {tab === 'narrativas' && <ul className="grid gap-4">{dashboard.narratives.map((m) => <Bar key={m.name} label={m.name} value={m.value} />)}</ul>}
        {tab === 'sentimiento' && (
          <ul className="grid gap-5">
            {dashboard.sentiment.map((s) => (
              <li key={s.name} className="grid gap-2 text-sm">
                <span className="text-fg font-medium">{s.name}</span>
                <span className="flex h-3.5 overflow-hidden rounded-full border border-line/40 bg-surface-3 p-0.5" role="img" aria-label={`Positivo ${s.pos}%, neutral ${s.neu}%, negativo ${s.neg}%`}>
                  <span className="rounded-l-full bg-live shadow-[0_0_10px_rgba(34,197,94,0.4)] transition-all duration-700" style={{ width: `${s.pos}%` }} />
                  <span className="bg-subtle transition-all duration-700" style={{ width: `${s.neu}%` }} />
                  <span className="rounded-r-full bg-signal shadow-[0_0_10px_rgba(239,68,68,0.4)] transition-all duration-700" style={{ width: `${s.neg}%` }} />
                </span>
                <div className="flex items-center justify-between font-mono text-xs text-subtle">
                  <span className="text-live">Positivo {s.pos}%</span>
                  <span>Neutral {s.neu}%</span>
                  <span className="text-signal">Negativo {s.neg}%</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="mt-8 border-t border-line/60 pt-4 text-xs font-mono text-subtle">{dashboard.note}</p>
    </div>
  );
}

