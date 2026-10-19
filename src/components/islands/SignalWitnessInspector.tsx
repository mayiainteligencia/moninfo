import { useState, useEffect } from 'react';
import { Radio, Volume2, ShieldCheck, FileAudio, Play, Pause, Hash, Cpu, Sparkles } from 'lucide-react';

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
    highlightWord: 'SPOT OFICIAL BANORTE',
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
    highlightWord: 'XHIMR-FM 107.9 FM MÉXICO',
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
    highlightWord: 'RÚBRICA: RESUMEN DE MEDIA HORA',
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
    <div className="relative overflow-hidden rounded-3xl border border-line-strong/80 bg-surface-2/60 p-6 md:p-8 backdrop-blur-2xl shadow-2xl shadow-black/80">
      {/* Luz ambiental sutil esmeralda */}
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-accent/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 -bottom-32 size-96 rounded-full bg-accent/5 blur-[100px]" />

      {/* Barra superior de la consola */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              CONSOLA DE MONITOREO Y TESTIGOS
            </span>
          </div>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-white md:text-2xl">
            Inspección Forense de Audio en Tiempo Real
          </h3>
          <p className="text-xs text-muted/90 sm:text-sm">
            Selecciona una entidad para verificar cómo MAYIA Escucha transcribe la señal, aísla la coincidencia y genera su testigo inmutable.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[0.7rem] text-subtle bg-surface/80 rounded-xl px-3 py-1.5 border border-line/50 self-start sm:self-center">
          <Cpu className="size-3.5 text-accent" />
          <span>WHISPER ON-PREMISE</span>
          <span className="text-line-strong">|</span>
          <span className="text-accent-bright">0.3s INFERENCIA</span>
        </div>
      </div>

      {/* Grid: Selector de Entidades (Izquierda) + Consola de Testigo (Derecha) */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12 items-stretch">
        {/* Selector de Chips de Detección (5 columnas) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-wider text-muted mb-3 flex items-center gap-1.5">
              <Sparkles className="size-3 text-accent" />
              <span>PATRONES AUDITABLES EN CUADRANTE</span>
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
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
                    className={`group relative flex flex-col items-start rounded-xl p-3 text-left transition-all duration-200 border ${
                      isSelected
                        ? 'border-accent bg-accent/10 shadow-[0_0_20px_rgba(34,197,94,0.18)] scale-[1.02]'
                        : 'border-line/60 bg-surface/50 hover:border-line-strong hover:bg-surface-3/70'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className={`text-[0.65rem] font-mono tracking-wider uppercase font-semibold ${
                        isSelected ? 'text-accent-bright' : 'text-subtle'
                      }`}>
                        {p.badge}
                      </span>
                      <span className={`size-1.5 rounded-full ${
                        isSelected ? 'bg-accent shadow-[0_0_8px_#22c55e]' : 'bg-line-strong'
                      }`} />
                    </div>
                    <span className={`mt-1 text-xs sm:text-sm font-medium ${
                      isSelected ? 'text-white font-semibold' : 'text-fg/80 group-hover:text-white'
                    }`}>
                      {p.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-line/40 bg-surface/30 p-3.5">
            <div className="flex items-center gap-2 text-xs text-muted">
              <ShieldCheck className="size-4 text-accent shrink-0" />
              <span>
                Cero fuga de audio a la nube pública. Cada detección genera un archivo <strong className="text-white">.WAV</strong> y transcripción con hash de autenticidad.
              </span>
            </div>
          </div>
        </div>

        {/* Tarjeta de Inspección Forense / Visualizador de Audio (7 columnas) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-line-strong/80 bg-surface/90 p-5 md:p-6 shadow-inner">
          {/* Header del segmento capturado */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/40 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="flex items-center gap-1.5 text-accent font-semibold">
                  <Radio className="size-3.5" />
                  <span>{activePattern.station}</span>
                </span>
                <span className="rounded bg-surface-3 px-1.5 py-0.5 text-[0.7rem] text-subtle">
                  {activePattern.frequency}
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[0.7rem] text-subtle">
                <span>{activePattern.timestamp}</span>
                <span className="rounded bg-accent/15 px-2 py-0.5 font-semibold text-accent-bright">
                  CONF. {activePattern.confidence}
                </span>
              </div>
            </div>

            {/* Simulador de Onda de Audio / Spectrogram Intercept */}
            <div className="mt-4 rounded-xl border border-line/50 bg-black/60 p-4">
              <div className="flex items-center justify-between font-mono text-[0.7rem] text-subtle mb-2">
                <div className="flex items-center gap-2">
                  <Volume2 className="size-3.5 text-accent" />
                  <span className="text-muted">SEÑAL RECORTADA · 16 kHz WAV</span>
                </div>
                <span className="text-accent">{activePattern.duration}</span>
              </div>

              {/* Barras de espectro audio */}
              <div className="flex h-12 items-end justify-between gap-1 px-1 py-1">
                {Array.from({ length: 36 }).map((_, i) => {
                  const isMatchZone = i >= 12 && i <= 24;
                  const dynamicHeight = Math.max(
                    15,
                    Math.sin((i + waveSeed * 0.3) * 0.6) * 35 +
                      (isMatchZone ? 45 : 20) +
                      ((i * 13) % 15)
                  );
                  return (
                    <div
                      key={i}
                      className="group/bar relative flex-1 flex flex-col justify-end h-full"
                    >
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

              {/* Rango de coincidencia marcado */}
              <div className="mt-2 flex items-center justify-between text-[0.65rem] font-mono">
                <span className="text-subtle">0.0s</span>
                <span className="rounded bg-accent/20 px-2 py-0.5 text-accent-bright font-semibold">
                  VENTANA DE COINCIDENCIA IDENTIFICADA
                </span>
                <span className="text-subtle">5.0s</span>
              </div>
            </div>

            {/* Texto Transcrito con Whisper */}
            <div className="mt-4 rounded-xl border border-line/60 bg-surface-2/70 p-4">
              <div className="font-mono text-[0.7rem] uppercase tracking-wider text-muted mb-1 flex items-center gap-1.5">
                <FileAudio className="size-3 text-accent" />
                <span>TRANSCRIPCIÓN EN ESPAÑOL (WHISPER LOCAL)</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-fg/90">
                <span>{activePattern.prefixText}</span>
                <mark className="rounded-md bg-accent/25 px-1.5 py-0.5 font-semibold text-accent-bright border border-accent/40 shadow-[0_0_12px_rgba(34,197,94,0.3)]">
                  {activePattern.highlightWord}
                </mark>
                <span>{activePattern.suffixText}</span>
              </p>
            </div>
          </div>

          {/* Sello Criptográfico & Acciones */}
          <div className="mt-5 pt-4 border-t border-line/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-[0.65rem] text-subtle truncate max-w-sm">
              <Hash className="size-3 text-accent shrink-0" />
              <span className="truncate">SHA-256: {activePattern.sha256}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/15 px-3 py-1.5 text-xs font-mono font-semibold text-accent-bright hover:bg-accent hover:text-bg transition-all"
              >
                {isPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
                <span>{isPlaying ? 'PAUSAR' : 'REPRODUCIR TESTIGO'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
