# MAYIA Monitoreo de Medios (MAYIA Escucha / Monitor IA)

Sitio informativo estático en Astro + Tailwind 4, islas React solo para el hero (waveform) y el tablero electoral, GSAP + ScrollTrigger + Lenis para movimiento. Deploy en Vercel.

## Comandos

- `npm run dev`: servidor local.
- `npm run build`: optimiza imágenes, valida tipos y genera `dist/`.
- `npm run check:domain`: construye con un dominio de prueba y verifica que el de respaldo no aparezca.

## Cambiar el dominio

Define `PUBLIC_SITE_URL` en `.env` (ver `.env.example`) o en las variables de entorno de Vercel. Cambia canonical, hreflang, Open Graph, sitemap.xml, robots.txt, llms.txt y JSON-LD. El valor de respaldo está en `src/config/site-url.ts`.

## Cambiar colores, tipografías y animación

- Colores, fuentes, radios y sombras: `src/styles/tokens.css` (bloque `@theme`).
- Easing, duraciones y parámetros de scroll suave: `src/config/branding.ts`.
- Las fuentes (Inter y JetBrains Mono) se sirven desde el propio sitio con `@fontsource`; para cambiarlas, reemplaza los imports en `src/styles/global.css` y las variables `--font-*`.

## Logos e imágenes

Sube los archivos a `public/assets/{logos,images,video}` y ajusta nombres en `src/config/assets.ts`.

- Foto del SOC: `public/assets/images/soc-edgenet.jpg` (1920x1280 o mayor). Mientras no exista se muestra un placeholder.
- Imagen para redes: `public/assets/images/og.jpg` (1200x630). Si no existe, no se emite `og:image`.
- `npm run build` genera variantes AVIF y WebP en `public/assets/images/_opt` (ignoradas por git).
- Los logos actuales son placeholders de texto: reemplaza los SVG en `public/assets/logos`.

## Cambiar el copy

Todo el texto está en `src/content/` (`home.ts`, `monitoreo.ts`, `campanas.ts`). Cada capacidad tiene `status: "live" | "roadmap"` que muestra la insignia "Operativo" o "En despliegue". Los claims más fuertes están como comentarios `TODO(claims)` para activarse solo si son verificables.

## SEO y GEO

- `src/lib/seo.ts`: JSON-LD (Organization, WebSite, Service, FAQPage, BreadcrumbList).
- `src/pages/robots.txt.ts`: permite GPTBot, ClaudeBot, PerplexityBot y Google-Extended.
- `src/pages/sitemap.xml.ts` y `src/pages/llms.txt.ts`: se generan desde `src/config/site.ts` y `src/content`.
- Para agregar una página, súmala a `routes` en `src/config/site.ts`.

## Pendientes

- Definir `contact.email` en `src/config/site.ts`.
- Confirmar el estado de NOC, centro de datos y desarrollo a la medida en `src/content/home.ts`.
- Subir logos reales, foto del SOC y `og.jpg`.
# moninfo
