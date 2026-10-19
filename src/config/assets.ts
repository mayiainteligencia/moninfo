// Mapa unico de recursos. Sube los archivos a public/assets/* y ajusta aqui si cambia el nombre.
// Si un archivo de imagen no existe, <Img> usa el placeholder automaticamente.
export const logos = {
  mayia: { src: '/assets/logos/mayia.svg', alt: 'MAYIA' },
  flai: { src: '/assets/logos/flai.svg', alt: 'FLAI Nube' },
  escucha: { src: '/assets/logos/escucha.svg', alt: 'MAYIA Escucha' },
} as const;

export const images = {
  soc: {
    src: '/assets/images/soc-edgenet.jpg',
    alt: 'Centro de operaciones de seguridad (SOC) de Edgenet con pantallas de monitoreo y estaciones de trabajo',
    width: 1920,
    height: 1280,
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
