// Mapa unico de recursos. Sube los archivos a public/assets/* y ajusta aqui si cambia el nombre.
// Si un archivo de imagen no existe, <Img> usa el placeholder automaticamente.
export const logos = {
  mayia: { src: '/assets/logos/mayiaLogoBlanco.png', alt: 'MAYIA' },
  flai: { src: '/assets/logos/flai.png', alt: 'FLAI Nube' },
  escucha: { src: '/assets/logos/mayiaEscuchaTrim.png', alt: 'MAYIA Escucha / Monitor IA' },
} as const;

export const images = {
  soc: {
    src: '/assets/images/edgenet.jpg',
    alt: 'Centro de operaciones de seguridad (SOC) de Edgenet con monitoreo de medios en tiempo real',
    width: 1536,
    height: 1024,
  },
  og: {
    src: '/assets/images/og.jpg',
    alt: 'MAYIA Monitoreo de Medios',
    width: 1200,
    height: 630,
  },
} as const;

export const placeholder = '/assets/images/placeholder.svg';

export const video = {
  // reservado: public/assets/video/
} as const;
