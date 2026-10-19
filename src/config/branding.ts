// Valores de animacion y utilidades de marca. Colores/fuentes/radios/sombras: src/styles/tokens.css.
export const motion = {
  duration: { fast: 0.3, base: 0.7, slow: 1.1 },
  ease: { out: 'expo.out', inOut: 'power3.inOut', soft: 'power2.out' },
  stagger: 0.08,
  revealDistance: 28,
  lenis: { duration: 1.15, wheelMultiplier: 1 },
} as const;

/** Lee un token CSS en runtime (para canvas). Ej: token('--color-accent'). */
export const token = (name: string, root: Element = document.documentElement) =>
  getComputedStyle(root).getPropertyValue(name).trim();
