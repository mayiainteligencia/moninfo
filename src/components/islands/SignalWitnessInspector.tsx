import { useState, useEffect } from 'react';
import { Radio, Volume2, ShieldCheck, FileAudio, Play, Pause, Hash, Sparkles } from 'lucide-react';

interface DetectionPattern {
  id: string;
  label: string;
  badge: string;
  station: string;
  frequency: string;
  timestamp: string;
  segmentId: string;
  confidence: string;
  highlightWord: string;
  prefixText: string;
  suffixText: string;
  sha256: string;
  duration: string;
}

const PATTERNS: DetectionPattern[] = [
  {
    id: 'marcas',
    label: 'Marcas',
    badge: 'MONITOR COMERCIAL',
    station: 'W Radio México',
    frequency: '96.9 FM',
    timestamp: '10:42:18.420 CST',
    segmentId: 'SEG-84291',
    confidence: '99.8%',
    highlightWord: 'GRUPO BIMBO',
    prefixText: '...presentamos la nueva inversión nacional en conjunto con ',
    suffixText: ' para abastecer a más de 40 centros logísticos del país...',
    sha256: '7f8b2c91a0d4e3f284c59b817d23a10e64c919a3b2',
    duration: '5.0s (Match: 2.1s - 3.8s)',
  },
  {
    id: 'spots',
    label: 'Spots Comerciales',
    badge: 'PAUTA PUBLICITARIA',
    station: 'Los 40 Principales',
    frequency: '101.7 FM',
    timestamp: '10:45:02.115 CST',
    segmentId: 'SEG-84305',
    confidence: '99.4%',
    highlightWord: 'SPOT BANORTE',
    prefixText: '...corte comercial pautado número 04: ',
    suffixText: ' - Tu banco fuerte de México. Consulta términos en banorte.com...',
    sha256: '9a31b4c7e2d1f08964c502b7481e93ca71d248b1c4',
    duration: '20.0s (Identificado en 0.28s)',
  },
  {
    id: 'candidatos',
    label: 'Candidatos',
    badge: 'CEREBRO ELECTORAL',
    station: 'Radio Fórmula',
    frequency: '103.3 FM',
    timestamp: '10:50:33.890 CST',
    segmentId: 'SEG-84342',
    confidence: '99.9%',
    highlightWord: 'CANDIDATO GOBERNADOR',
    prefixText: '...en la mesa de debate el periodista cuestiona las propuestas del ',
    suffixText: ' sobre la descentralización fiscal y obras de movilidad urbana...',
    sha256: '3e41c9b882f0a14d59e720cb41982a51f083d917ca',
    duration: '5.0s (Match: 1.4s - 3.9s)',
  },
  {
    id: 'frases',
    label: 'Frases Clave',
    badge: 'RASTREO NARRATIVO',
    station: 'MVS Noticias',
    frequency: '102.5 FM',
    timestamp: '10:54:19.010 CST',
    segmentId: 'SEG-84368',
    confidence: '99.6%',
    highlightWord: 'SOBERANÍA DIGITAL DE DATOS',
    prefixText: '...el titular de telecomunicaciones reiteró el mandato de ',
    suffixText: ' como prioridad de seguridad nacional en los servidores públicos...',
    sha256: '81c4e902a7b3d1f564e819b023ca74f519d832a10e',
    duration: '5.0s (Match: 0.8s - 3.2s)',
  },
  {
    id: 'estacion',
    label: 'Identificación de Estación',
    badge: 'TELEMETRÍA RF',
    station: 'Horizonte Jazz',
    frequency: '107.9 FM',
    timestamp: '11:00:00.005 CST',
    segmentId: 'SEG-84400',
    confidence: '100.0%',
    highlightWord: 'XHIMR-FM 107.9 FM',
    prefixText: '...transmite el Instituto Mexicano de la Radio: ',
    suffixText: ' con cincuenta mil watts de potencia radiada...',
    sha256: '5b83d1c0e9a74f2861e902c381da47f2019b83c21a',
    duration: '5.0s (Corte horario legal)',
  },
  {
    id: 'cortinillas',
    label: 'Cortinillas',
    badge: 'ESTRUCTURA DE EMISIÓN',
    station: 'Imagen Radio',
    frequency: '90.5 FM',
    timestamp: '11:05:14.220 CST',
    segmentId: 'SEG-84428',
    confidence: '99.2%',
    highlightWord: 'RÚBRICA DE CORTE',
    prefixText: '...pausa de señal identificada: ',
    suffixText: ' regresamos a la transmisión continua con más análisis...',
    sha256: 'a1b2c3d4e5f67890123456789abcdef0123456789a',
    duration: '3.5s (Separador detectado)',
  },
  {
    id: 'menciones',
    label: 'Menciones',
    badge: 'MONITOR ORGÁNICO',
    station: 'El Heraldo Radio',
    frequency: '98.5 FM',
    timestamp: '11:11:45.310 CST',
    segmentId: 'SEG-84461',
    confidence: '99.5%',
    highlightWord: 'EDGENET SOC & NOC',
    prefixText: '...especialistas de la industria destacan la infraestructura de ',
    suffixText: ' por su capacidad de operación 24/7 en territorio nacional...',
    sha256: '2d4f6a8c0e1b3d5f7a9c1e3b5d7f9a1c3e5b7d9f1a',
    duration: '5.0s (Match: 2.0s - 4.1s)',
  },
  {
    id: 'slogans',
    label: 'Slogans',
    badge: 'CAMPAÑAS DE IMPACTO',
    station: 'Exa FM',
    frequency: '104.9 FM',
    timestamp: '11:15:20.940 CST',
    segmentId: 'SEG-84490',
    confidence: '99.7%',
    highlightWord: 'PONTE EXA EN TODAS PARTES',
    prefixText: '...acompañándote con la mejor selección musical y los mejores éxitos: ',
    suffixText: ' transmitiendo en vivo para todo el cuadrante...',
    sha256: '4c7e2d1f08964c502b7481e93ca71d248b1c49a31b',
    duration: '5.0s (Frecuencia identificada)',
  },
];

export default function SignalWitnessInspector() {
  const [activeId, setActiveId] = useState('marcas');
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveSeed, setWaveSeed] = useState(0);

  const activePattern = PATTERNS.find((p) => p.id === activeId) ?? PATTERNS[0]!;

  useEffect(() => {
    const timer = setInterval(() => {
      setWaveSeed((s) => (s + 1) % 100);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid gap-3 lg:grid-cols-12 items-stretch w-full">
      {/* Columna Izquierda: Patrones de Detección (5 columnas) */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
              <Sparkles className="size-3" />
              <span>PATRONES AUDITABLES</span>
            </span>
            <span className="font-mono text-[0.62rem] text-subtle">WHISPER ON-PREMISE</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {PATTERNS.map((p) => {
              const isSelected = p.id === activeId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setActiveId(p.id);
                    setIsPlaying(false);
                  }}
                  className={`group relative flex flex-col items-start rounded-xl p-2.5 text-left transition-all duration-200 border ${
                    isSelected
                      ? 'border-accent bg-accent/15 shadow-[0_0_15px_rgba(34,197,94,0.2)] scale-[1.01]'
                      : 'border-line-strong/60 bg-surface-2/60 hover:border-accent/50 hover:bg-surface-2/90'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className={`text-[0.6rem] font-mono tracking-wider uppercase font-semibold ${
                      isSelected ? 'text-accent-bright' : 'text-subtle'
                    }`}>
                      {p.badge}
                    </span>
                    <span className={`size-1.5 rounded-full ${
                      isSelected ? 'bg-accent shadow-[0_0_8px_#22c55e]' : 'bg-line-strong'
                    }`} />
                  </div>
                  <span className={`mt-0.5 text-xs font-medium truncate w-full ${
                    isSelected ? 'text-white font-semibold' : 'text-fg/80 group-hover:text-white'
                  }`}>
                    {p.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-line-strong/60 bg-surface-2/40 px-3 py-2 flex items-center gap-2 text-[0.68rem] text-muted">
          <ShieldCheck className="size-3.5 text-accent shrink-0" />
          <span>
            Cero fuga a terceros. Audio <strong className="text-white">.WAV</strong> recortado y transcripción local inmutable.
          </span>
        </div>
      </div>

      {/* Columna Derecha: Tarjeta de Inspección Forense en Vivo (7 columnas) */}
      <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-line-strong/70 bg-surface-2/60 p-3.5 sm:p-4 backdrop-blur-xl shadow-card transition-all hover:border-accent/50">
        <div>
          {/* Header de la señal capturada */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-line/50 pb-2">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="flex items-center gap-1.5 text-accent font-semibold">
                <Radio className="size-3.5" />
                <span>{activePattern.station}</span>
              </span>
              <span className="rounded bg-surface-3 px-1.5 py-0.2 text-[0.65rem] text-subtle">
                {activePattern.frequency}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[0.65rem] text-subtle">
              <span>{activePattern.timestamp}</span>
              <span className="rounded bg-accent/15 px-1.5 py-0.2 font-semibold text-accent-bright">
                CONF. {activePattern.confidence}
              </span>
            </div>
          </div>

          {/* Simulador de Onda de Audio en Vivo */}
          <div className="mt-2.5 rounded-lg border border-line/40 bg-surface/50 p-2.5">
            <div className="flex items-center justify-between font-mono text-[0.62rem] text-subtle mb-1">
              <div className="flex items-center gap-1.5">
                <Volume2 className="size-3 text-accent" />
                <span className="text-muted">16 kHz WAV · BUFFER 5.0s</span>
              </div>
              <span className="text-accent">{activePattern.duration}</span>
            </div>

            {/* Barras dinámicas de audio */}
            <div className="flex h-8 sm:h-9 items-end justify-between gap-1 px-1 py-0.5">
              {Array.from({ length: 36 }).map((_, i) => {
                const isMatchZone = i >= 12 && i <= 24;
                const dynamicHeight = Math.max(
                  15,
                  Math.sin((i + waveSeed * 0.3) * 0.6) * 35 +
                    (isMatchZone ? 45 : 20) +
                    ((i * 13) % 15)
                );
                return (
                  <div key={i} className="flex-1 flex flex-col justify-end h-full">
                    <div
                      className={`w-full rounded-full transition-all duration-150 ${
                        isMatchZone
                          ? 'bg-accent shadow-[0_0_8px_rgba(34,197,94,0.7)]'
                          : 'bg-accent/25 hover:bg-accent/60'
                      }`}
                      style={{ height: `${Math.min(100, dynamicHeight)}%` }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-1 flex items-center justify-between text-[0.58rem] font-mono">
              <span className="text-subtle">0.0s</span>
              <span className="rounded bg-accent/20 px-1.5 py-0.2 text-accent-bright font-semibold">
                COINCIDENCIA IDENTIFICADA
              </span>
              <span className="text-subtle">5.0s</span>
            </div>
          </div>

          {/* Transcripción Whisper */}
          <div className="mt-2.5 rounded-lg border border-line/40 bg-surface/40 p-2.5">
            <div className="font-mono text-[0.62rem] uppercase tracking-wider text-muted mb-1 flex items-center gap-1.5">
              <FileAudio className="size-3 text-accent" />
              <span>TRANSCRIPCIÓN EN ESPAÑOL (WHISPER LOCAL)</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-fg/90">
              <span>{activePattern.prefixText}</span>
              <mark className="rounded bg-accent/25 px-1 py-0.2 font-semibold text-accent-bright border border-accent/40 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                {activePattern.highlightWord}
              </mark>
              <span>{activePattern.suffixText}</span>
            </p>
          </div>
        </div>

        {/* Footer con SHA-256 y Botón de Audio */}
        <div className="mt-2.5 pt-2 border-t border-line/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-mono text-[0.6rem] text-subtle truncate max-w-xs">
            <Hash className="size-3 text-accent shrink-0" />
            <span className="truncate">SHA-256: {activePattern.sha256}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1 rounded-full border border-accent/50 bg-accent/15 px-2.5 py-1 text-[0.68rem] font-mono font-semibold text-accent-bright hover:bg-accent hover:text-bg transition-all"
            >
              {isPlaying ? <Pause className="size-2.5" /> : <Play className="size-2.5" />}
              <span>{isPlaying ? 'PAUSAR' : 'REPRODUCIR TESTIGO'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
