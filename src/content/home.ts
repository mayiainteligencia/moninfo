import type { Capability, Faq } from './types';

export const hero = {
  eyebrow: 'MAYIA Escucha / Monitor IA',
  title: 'Monitoreo de medios que escucha, transcribe y deja testigo.',
  lead: 'MAYIA Escucha es un sistema de monitoreo de medios con inteligencia artificial. Está diseñado para escuchar radio en vivo, transcribirla en servidor propio y registrar cada mención de marcas, spots y frases con su testigo.',
  primary: { label: 'Conocer MAYIA Escucha', href: '/monitoreo-de-medios' },
  secondary: { label: 'Cerebro Electoral', href: '/campanas-politicas' },
  // TODO(claims): activar solo si son ciertos y verificables.
  // - "Más de X años monitoreando medios en México"
  // - "El monitoreo de medios más completo de Latinoamérica"
  // - Clientes y casos de éxito (logos, nombres)
};

export const divisions: Capability[] = [
  { id: 'soc', title: 'SOC', icon: 'shield', status: 'live',
    description: 'Centro de operaciones de seguridad para vigilar, detectar y responder a incidentes de forma continua. Visitable por clientes.' },
  { id: 'noc', title: 'NOC', icon: 'activity', status: 'live', // TODO: confirmar estado operativo
    description: 'Centro de operaciones de red para supervisar disponibilidad y desempeño de la infraestructura de los clientes.' },
  { id: 'datacenter', title: 'Centro de datos', icon: 'server', status: 'live', // TODO: confirmar estado operativo
    description: 'Infraestructura en México para alojar cargas críticas, con operación y soporte en español.' },
  { id: 'cloud', title: 'Nube', icon: 'cloud', status: 'live',
    description: 'Nube soberana con datos en territorio mexicano, a través de FLAI.' },
  { id: 'ia', title: 'Desarrollo de soluciones a la medida con IA', icon: 'cpu', status: 'live', // TODO: confirmar estado operativo
    description: 'Diseño e implementación de soluciones de inteligencia artificial adaptadas al proceso de cada organización.' },
  { id: 'medios', title: 'Monitoreo de medios', icon: 'radio', status: 'live',
    description: 'MAYIA Escucha: monitoreo de radio por internet en vivo con transcripción local y testigo por mención. TV e impresos están en despliegue.' },
];

export const soc = {
  eyebrow: 'Centro de operaciones',
  title: 'Un SOC real, que puedes visitar.',
  body: 'El SOC de Edgenet es el centro de operaciones desde el que se vigilan los servicios. Los clientes pueden visitarlo para conocer cómo se monitorea su infraestructura.',
  overlay: [
    { label: 'Vigilancia', value: 'Continua' },
    { label: 'Ubicación', value: 'México' },
    { label: 'Visitas de clientes', value: 'Sí' },
  ],
};

export const flowIntro = {
  eyebrow: 'Flujo de trabajo',
  title: 'De la señal al testigo, en cuatro pasos.',
  lead: 'Cada segmento de audio recorre el mismo ciclo de forma automática, sin intervención manual.',
};

export const flow = [
  { id: 'captura', title: 'Captura', icon: 'radio',
    text: 'Se toma el stream de la estación en segmentos de 5 segundos (WAV, 16 kHz, mono).' },
  { id: 'transcripcion', title: 'Transcripción', icon: 'audio-lines',
    text: 'Whisper transcribe el segmento en español, de forma local y sin costo por minuto de transcripción.' },
  { id: 'deteccion', title: 'Detección', icon: 'search',
    text: 'El texto se compara contra palabras clave: marcas, spots, frases e identificaciones de estación.' },
  { id: 'testigo', title: 'Testigo', icon: 'file-check',
    text: 'Cada coincidencia se registra con su testigo y el segmento se limpia del disco.' },
];

export const stats = [
  { to: 5, decimals: 0, suffix: ' s', label: 'por segmento de captura' },
  { to: 16, decimals: 0, suffix: ' kHz', label: 'audio mono para transcribir' },
  { to: 0.3, decimals: 1, suffix: ' s', label: 'en transcribir 5 s de audio (medido)' },
  { to: 0.06, decimals: 2, prefix: '≈ ', label: 'factor de tiempo real (RTF, medido)' },
];

export const marquee = {
  detections: ['Marcas', 'Spots', 'Frases', 'Identificaciones de estación', 'Candidatos', 'Cortinillas', 'Menciones', 'Slogans'],
  media: [
    { label: 'Radio por internet', status: 'live' as const },
    { label: 'Radio AM / FM por antena', status: 'roadmap' as const },
    { label: 'TV abierta', status: 'roadmap' as const },
    { label: 'TV de paga', status: 'roadmap' as const },
    { label: 'Impresos', status: 'roadmap' as const },
  ],
  note: 'Ejemplo visual de los tipos de detección y de medios contemplados.',
};

export const faqHome: Faq[] = [
  { q: '¿Qué es el monitoreo de medios?',
    a: 'El monitoreo de medios es el seguimiento sistemático de lo que se transmite o publica en radio, televisión e impresos para detectar menciones de marcas, personas, spots o temas. Su resultado es un registro con evidencia, o testigo, de cada mención.' },
  { q: '¿Qué es MAYIA Escucha?',
    a: 'MAYIA Escucha, también llamado Monitor IA, es el sistema de monitoreo de medios de MAYIA. Escucha streams de radio por internet en vivo, los transcribe localmente con Whisper y guarda un testigo por cada palabra clave detectada.' },
  { q: '¿Cómo se detecta una mención en radio?',
    a: 'El audio se captura en segmentos de 5 segundos y se transcribe a texto en español. El texto se compara contra una lista de palabras clave y, cuando hay coincidencia, se registra la mención con su testigo.' },
  { q: '¿Qué medios cubre hoy?',
    a: 'Hoy opera el monitoreo de radio por internet en vivo. La cobertura de radio AM/FM por antena, televisión abierta y de paga e impresos está en despliegue, con objetivo en Ciudad de México, Guadalajara y Monterrey.' },
  { q: '¿La transcripción tiene costo por minuto?',
    a: 'No. La transcripción se hace de forma local con Whisper, por lo que no hay un cargo por minuto de transcripción de terceros.' },
  { q: '¿El stream por internet es igual a la señal por antena?',
    a: 'No siempre. El stream por internet puede diferir de la señal que se emite por antena, por ejemplo en retardo o en el contenido comercial insertado. Por eso la cobertura por antena se trata como una etapa distinta.' },
  { q: '¿Qué se hace con las transcripciones?',
    a: 'Son la base para análisis posteriores, como sentimiento y temas, con modelos de lenguaje. Ese análisis es parte de lo que está en despliegue.' },
];

export const cta = {
  title: 'Hablemos de lo que necesitas escuchar.',
  body: 'Cuéntanos qué marcas, spots, personas o temas quieres seguir y te explicamos cómo MAYIA Escucha puede cubrirlo.',
};
