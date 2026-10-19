import type { Capability, Faq } from './types';

export const meta = {
  title: 'Monitoreo de medios con IA | MAYIA Escucha (Monitor IA)',
  description: 'MAYIA Escucha es el sistema de monitoreo de medios de MAYIA: escucha radio por internet en vivo, transcribe con Whisper y guarda un testigo por cada mención detectada.',
};

export const hero = {
  eyebrow: 'Monitor IA',
  title: 'MAYIA Escucha: monitoreo de medios con inteligencia artificial.',
  lead: 'MAYIA Escucha es un sistema que escucha streams de radio por internet en vivo, transcribe el audio localmente con Whisper en español y detecta palabras clave como marcas, spots, frases e identificaciones de estación. Por cada coincidencia guarda un testigo.',
  definition: 'Definición: el monitoreo de medios es el seguimiento sistemático de radio, televisión e impresos para detectar menciones y conservar evidencia de ellas.',
};

export const performance = {
  eyebrow: 'Rendimiento medido',
  title: 'Más rápido que el tiempo real.',
  body: 'En las pruebas realizadas, el sistema transcribe 5 segundos de audio en aproximadamente 0.3 segundos, lo que equivale a un factor de tiempo real (RTF) cercano a 0.06. La escala se logra por procesos de transcripción: se estima uno por cada 8 a 10 radios.',
  // TODO(claims): precisión por medio (p. ej. 97.5%) solo si se mide y se puede sustentar.
};

export const stackItems = [
  { name: 'Whisper', text: 'Reconocimiento de voz ejecutado de forma local.' },
  { name: 'Node.js', text: 'Orquestación de captura, ciclo y detección.' },
  { name: 'SQLite', text: 'Registro de menciones y testigos.' },
  { name: 'Interfaz web', text: 'Consulta de menciones y testigos.' },
];

export const coverage: Capability[] = [
  { id: 'radio-internet', title: 'Radio por internet en vivo', icon: 'radio', status: 'live',
    description: 'Escucha continua de streams, transcripción local y testigo por coincidencia.' },
  { id: 'radio-antena', title: 'Radio AM / FM por antena', icon: 'antenna', status: 'roadmap',
    description: 'Captura de la señal abierta para igualar lo que escucha la audiencia por antena.' },
  { id: 'tv', title: 'TV abierta y de paga', icon: 'tv', status: 'roadmap',
    description: 'Spoteo y verificación de programación las 24 horas, todos los días.' },
  { id: 'impresos', title: 'Impresos', icon: 'newspaper', status: 'roadmap',
    description: 'Registro de inserciones con testigo.' },
  { id: 'plazas', title: 'Ciudad de México, Guadalajara y Monterrey', icon: 'map-pin', status: 'roadmap',
    description: 'Plazas objetivo de la cobertura.' },
  { id: 'tablero', title: 'Tablero con precisión por medio', icon: 'layout-dashboard', status: 'roadmap',
    description: 'Vista consolidada de menciones y de la calidad de detección en cada medio.' },
  { id: 'analisis', title: 'Análisis de sentimiento y temas', icon: 'brain', status: 'roadmap',
    description: 'Las transcripciones sirven de base para analizar sentimiento y temas con modelos de lenguaje.' },
];

export const caveat = 'Nota: el stream por internet puede diferir de la señal por antena.';

export const faq: Faq[] = [
  { q: '¿Qué es MAYIA Escucha?',
    a: 'MAYIA Escucha, o Monitor IA, es un sistema de monitoreo de medios que escucha radio por internet en vivo, transcribe localmente con Whisper y registra un testigo por cada palabra clave detectada.' },
  { q: '¿Cómo se detecta una mención en radio?',
    a: 'Se captura el audio en segmentos de 5 segundos, se transcribe a texto y se busca en el texto una lista de palabras clave. Cada coincidencia queda registrada con su testigo.' },
  { q: '¿Qué es un testigo?',
    a: 'Es la evidencia de que una mención ocurrió: el registro de la coincidencia con su texto y momento. Sirve para comprobar que un spot, una marca o una frase salió al aire.' },
  { q: '¿Qué palabras clave se pueden detectar?',
    a: 'Marcas, spots, frases e identificaciones de estación. La lista se define según lo que cada organización necesite seguir.' },
  { q: '¿Cuántas radios soporta?',
    a: 'El sistema escala por procesos de transcripción. Como referencia, se estima un proceso por cada 8 a 10 radios.' },
  { q: '¿Qué tan rápida es la transcripción?',
    a: 'En las mediciones realizadas, transcribe 5 segundos de audio en aproximadamente 0.3 segundos, con un RTF cercano a 0.06.' },
  { q: '¿Cubre televisión e impresos?',
    a: 'Están en despliegue. El objetivo es cubrir radio AM/FM, televisión abierta y de paga, e impresos con testigo en Ciudad de México, Guadalajara y Monterrey.' },
];
