import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import { resolveSiteUrl } from './src/config/site-url.ts';

// El dominio sale de PUBLIC_SITE_URL (ver src/config/site.ts).
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'PUBLIC_');

export default defineConfig({
  site: resolveSiteUrl(process.env.PUBLIC_SITE_URL ?? env.PUBLIC_SITE_URL),
  output: 'static',
  trailingSlash: 'never',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
