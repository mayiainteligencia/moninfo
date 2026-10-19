// Unico lugar con el dominio de respaldo. Se usa tambien desde astro.config.mjs.
export const FALLBACK_SITE_URL = 'https://escucha.mayia.mx';

export function resolveSiteUrl(raw?: string): string {
  const value = (raw ?? '').trim() || FALLBACK_SITE_URL;
  return value.replace(/\/+$/, '');
}
