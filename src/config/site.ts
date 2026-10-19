import { resolveSiteUrl } from './site-url';

export const site = {
  name: 'MAYIA Monitoreo de Medios',
  brand: 'MAYIA Escucha',
  product: 'Monitor IA',
  legalName: 'MAYIA',
  locale: 'es-MX',
  // Cambia con PUBLIC_SITE_URL en .env (o en las variables de entorno de Vercel).
  url: resolveSiteUrl(import.meta.env.PUBLIC_SITE_URL),
  parents: {
    mayia: { name: 'MAYIA', url: 'https://www.mayia.mx/' },
    flai: { name: 'FLAI Nube', url: 'https://www.flainube.mx/' },
  },
  contact: {
    phone: '+52 55 5331 5526',
    phoneHref: 'tel:+525553315526',
    // TODO: definir correo de contacto; si se deja vacio no se muestra.
    email: '',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/mayia-edgenet/',
    x: 'https://x.com/EdgenetData',
    instagram: 'https://www.instagram.com/mayia.inteligencia.artificial/',
    facebook: 'https://www.facebook.com/MAYiaInteligenciaArtificial',
    youtube: 'https://www.youtube.com/@MAYIAInteligenciaArtificial',
  },
} as const;

export const routes = {
  home: { path: '/', label: 'Inicio' },
  monitoreo: { path: '/monitoreo-de-medios', label: 'Monitoreo de medios' },
  campanas: { path: '/campanas-politicas', label: 'Campañas políticas' },
} as const;

export const absoluteUrl = (path = '/') => `${site.url}${path === '/' ? '' : path}`;
