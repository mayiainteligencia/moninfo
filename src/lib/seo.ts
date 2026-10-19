import { site, absoluteUrl, routes } from '@/config/site';
import type { Faq } from '@/content/types';

const ctx = 'https://schema.org';
const orgId = `${site.url}/#organization`;

export const organization = () => ({
  '@context': ctx,
  '@type': 'Organization',
  '@id': orgId,
  name: site.legalName,
  alternateName: site.name,
  url: site.parents.mayia.url,
  sameAs: [site.parents.mayia.url, site.parents.flai.url, ...Object.values(site.social)],
  contactPoint: { '@type': 'ContactPoint', telephone: site.contact.phone, contactType: 'sales', availableLanguage: 'Spanish' },
});

export const website = () => ({
  '@context': ctx,
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  name: site.name,
  url: absoluteUrl('/'),
  inLanguage: site.locale,
  publisher: { '@id': orgId },
});

export const service = () => ({
  '@context': ctx,
  '@type': 'Service',
  name: 'Monitoreo de medios con IA (MAYIA Escucha / Monitor IA)',
  serviceType: 'Monitoreo de medios',
  description: 'Escucha de radio por internet en vivo, transcripción local con Whisper, detección de palabras clave y testigo por coincidencia.',
  url: absoluteUrl(routes.monitoreo.path),
  areaServed: { '@type': 'Country', name: 'México' },
  provider: { '@id': orgId },
});

export const faqPage = (items: Faq[]) => ({
  '@context': ctx,
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': ctx,
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
});
