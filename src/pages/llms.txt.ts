import type { APIRoute } from 'astro';
import { site, routes, absoluteUrl } from '@/config/site';
import { coverage } from '@/content/monitoreo';
import { statusLabel } from '@/content/types';

export const GET: APIRoute = () => {
  const body = `# ${site.name}

> MAYIA Escucha (Monitor IA) es el sistema de monitoreo de medios de MAYIA. Escucha streams de radio por internet en vivo, transcribe localmente con Whisper en español y guarda un testigo por cada palabra clave detectada (marcas, spots, frases e identificaciones de estación). Idioma: español de México.

## Páginas
- [Inicio](${absoluteUrl('/')}): divisiones de MAYIA (SOC, NOC, centro de datos, nube, desarrollo con IA y monitoreo de medios) y resumen de MAYIA Escucha.
- [${routes.monitoreo.label}](${absoluteUrl(routes.monitoreo.path)}): MAYIA Escucha en detalle: ciclo de captura de 5 s, transcripción, detección y testigo.
- [${routes.campanas.label}](${absoluteUrl(routes.campanas.path)}): Cerebro Electoral, escucha de medios y análisis de sentimiento aplicados a campañas.

## Cobertura
${coverage.map((c) => `- ${c.title}: ${statusLabel[c.status]}`).join('\n')}

## Notas
- El stream por internet puede diferir de la señal por antena.
- Cerebro Electoral mide lo que se dice en los medios monitoreados; no es una encuesta ni una predicción.

## Empresa
- [MAYIA](${site.parents.mayia.url}): centro de inteligencia artificial mexicano.
- [FLAI Nube](${site.parents.flai.url}): nube soberana mexicana.
- Contacto: ${site.contact.phone}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
