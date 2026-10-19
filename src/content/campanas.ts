import type { Capability, Faq } from './types';

export const meta = {
  title: 'Cerebro Electoral: escucha de medios para campañas políticas | MAYIA',
  description: 'Cerebro Electoral aplica la escucha de medios y el análisis de sentimiento de MAYIA Escucha a campañas: menciones de candidatos, tendencias de narrativa y tablero de seguimiento.',
};

export const hero = {
  eyebrow: 'Campañas políticas',
  title: 'Cerebro Electoral: lo que se dice en los medios, convertido en seguimiento.',
  lead: 'Cerebro Electoral es la aplicación de MAYIA Escucha a campañas políticas. Combina la escucha de medios con análisis de sentimiento para seguir menciones de candidatos, tendencias de narrativa y un tablero de seguimiento.',
};

export const capabilities: Capability[] = [
  { id: 'escucha', title: 'Escucha de medios', icon: 'radio', status: 'live',
    description: 'Radio por internet en vivo, transcrita localmente con Whisper, como fuente de información pública.' },
  { id: 'menciones', title: 'Menciones de candidatos', icon: 'at-sign', status: 'live',
    description: 'Detección de nombres, frases y consignas sobre el texto transcrito, con testigo por coincidencia.' },
  { id: 'sentimiento', title: 'Análisis de sentimiento', icon: 'gauge', status: 'roadmap',
    description: 'Clasificación del tono con el que se menciona a cada candidatura, con modelos de lenguaje.' },
  { id: 'narrativa', title: 'Tendencias de narrativa', icon: 'trending-up', status: 'roadmap',
    description: 'Temas y mensajes que se repiten en los medios a lo largo del tiempo.' },
  { id: 'tablero', title: 'Tablero de seguimiento', icon: 'layout-dashboard', status: 'roadmap',
    description: 'Vista diaria de menciones, tono y temas por medio y por plaza.' },
  { id: 'cobertura', title: 'TV e impresos', icon: 'tv', status: 'roadmap',
    description: 'Ampliación a televisión abierta y de paga e impresos, con el mismo registro de testigos.' },
];

export const how = {
  eyebrow: 'Cómo funciona',
  title: 'De la transmisión a la lectura de la campaña.',
  steps: [
    { title: 'Escucha', text: 'Se monitorean las estaciones definidas para la campaña.' },
    { title: 'Transcripción', text: 'El audio se convierte a texto en español de forma local.' },
    { title: 'Menciones', text: 'Se detectan candidatos, frases y consignas, y se guarda el testigo.' },
    { title: 'Análisis', text: 'Un modelo de lenguaje clasifica sentimiento y temas sobre las transcripciones.' },
  ],
};

export const dashboard = {
  eyebrow: 'Tablero de seguimiento',
  title: 'Así se vería la lectura de una campaña.',
  note: 'Datos ilustrativos de demostración. No corresponden a ninguna campaña ni medición real.',
  tabs: [
    { id: 'menciones', label: 'Menciones' },
    { id: 'sentimiento', label: 'Sentimiento' },
    { id: 'narrativas', label: 'Narrativas' },
  ],
  mentions: [
    { name: 'Candidatura A', value: 62 },
    { name: 'Candidatura B', value: 48 },
    { name: 'Candidatura C', value: 27 },
  ],
  sentiment: [
    { name: 'Candidatura A', pos: 46, neu: 34, neg: 20 },
    { name: 'Candidatura B', pos: 31, neu: 42, neg: 27 },
    { name: 'Candidatura C', pos: 38, neu: 45, neg: 17 },
  ],
  narratives: [
    { name: 'Seguridad', value: 74 },
    { name: 'Economía', value: 58 },
    { name: 'Servicios públicos', value: 41 },
    { name: 'Educación', value: 29 },
  ],
};

export const principles = {
  title: 'Información de medios, no encuestas.',
  body: 'Cerebro Electoral mide lo que se dice en los medios monitoreados. No es una encuesta ni una predicción de resultados, y no emite recomendaciones de voto. Su uso es de seguimiento y análisis de la conversación pública.',
};

export const faq: Faq[] = [
  { q: '¿Qué es Cerebro Electoral?',
    a: 'Cerebro Electoral es la aplicación de MAYIA Escucha a campañas políticas. Usa la escucha de medios y el análisis de sentimiento para seguir menciones de candidatos, tendencias de narrativa y un tablero de seguimiento.' },
  { q: '¿Cómo se miden las menciones de un candidato?',
    a: 'El audio de las estaciones monitoreadas se transcribe y se compara contra los nombres, frases y consignas definidos para la campaña. Cada coincidencia se registra con su testigo.' },
  { q: '¿Cerebro Electoral es una encuesta?',
    a: 'No. Mide lo que se dice en los medios monitoreados, no la intención de voto, y no predice resultados electorales.' },
  { q: '¿Qué funciones están operativas?',
    a: 'La escucha de radio por internet y la detección de menciones por palabra clave están operativas. El análisis de sentimiento, las tendencias de narrativa y el tablero están en despliegue.' },
  { q: '¿Se puede ampliar a televisión e impresos?',
    a: 'Es parte del despliegue de MAYIA Escucha: televisión abierta y de paga, e impresos con testigo, en Ciudad de México, Guadalajara y Monterrey.' },
];
