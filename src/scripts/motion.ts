import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion } from '@/config/branding';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const q = <T extends Element>(sel: string) => Array.from(document.querySelectorAll<T>(sel));

function init() {
  if (reduced) return; // el contenido ya esta en su estado final; no se anima nada.

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: motion.ease.out, duration: motion.duration.base });

  const lenis = new Lenis({ ...motion.lenis, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  const once = (trigger: Element, onEnter: () => void, start = 'top 88%') =>
    ScrollTrigger.create({ trigger, start, once: true, onEnter });

  // Solo aplicar ScrollTrigger tradicional fuera del slides deck
  q<HTMLElement>('[data-reveal]:not(#slides-deck [data-reveal])').forEach((el) => {
    const delay = Number(el.dataset.delay ?? 0);
    if (el.dataset.reveal === 'stagger') {
      const kids = Array.from(el.children);
      gsap.set(kids, { opacity: 0, y: motion.revealDistance });
      once(el, () => {
        gsap.set(el, { opacity: 1, y: 0 });
        gsap.to(kids, { opacity: 1, y: 0, stagger: motion.stagger, delay });
      });
    } else {
      once(el, () => gsap.to(el, { opacity: 1, y: 0, delay }));
    }
  });

  q<HTMLElement>('[data-split]:not(#slides-deck [data-split])').forEach((el) =>
    once(el, () => gsap.to(el.querySelectorAll('.w > span'), { y: 0, stagger: 0.045, duration: motion.duration.slow })),
  );

  q<HTMLElement>('#slides-deck [data-split] .w > span').forEach((span) => {
    gsap.set(span, { y: 0 });
  });

  q<HTMLElement>('[data-parallax]:not(#slides-deck [data-parallax])').forEach((el) => {
    const s = Number(el.dataset.parallax) * 50;
    gsap.fromTo(el, { yPercent: -s }, { yPercent: s, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  q<HTMLElement>('[data-counter]:not(#slides-deck [data-counter])').forEach((el) => {
    const to = Number(el.dataset.to);
    const dec = Number(el.dataset.decimals ?? 0);
    const { prefix = '', suffix = '' } = el.dataset;
    const state = { v: 0 };
    el.textContent = `${prefix}${(0).toFixed(dec)}${suffix}`;
    once(el, () =>
      gsap.to(state, { v: to, duration: 1.6, ease: motion.ease.soft,
        onUpdate: () => (el.textContent = `${prefix}${state.v.toFixed(dec)}${suffix}`) }), 'top 92%');
  });

  q<HTMLElement>('#slides-deck [data-counter]').forEach((el) => {
    const to = Number(el.dataset.to);
    const dec = Number(el.dataset.decimals ?? 0);
    const { prefix = '', suffix = '' } = el.dataset;
    el.textContent = `${prefix}${to.toFixed(dec)}${suffix}`;
  });

  q<HTMLElement>('[data-timeline]:not(#slides-deck [data-timeline])').forEach((tl) => {
    const steps = q<HTMLElement>('[data-step]');
    ScrollTrigger.create({
      trigger: tl, start: 'top 65%', end: 'bottom 70%', scrub: true,
      onUpdate: (self) => {
        tl.style.setProperty('--p', String(self.progress));
        steps.forEach((s, i) => s.classList.toggle('is-active', self.progress >= i / (steps.length - 1) - 0.02));
      },
    });
  });

  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

  // Transición inmersiva con fijado (PIN), zoom y desintegración Thanos
  const heroSec = document.querySelector<HTMLElement>('#hero-section');
  const waveZoom = document.querySelector<HTMLElement>('[data-wave-zoom]');
  const heroContent = document.querySelector<HTMLElement>('[data-hero-content]');

  if (heroSec && waveZoom) {
    (window as any).__heroScrollProgress = 0;

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroSec,
        start: 'top top',
        end: '+=45%',
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: (self) => {
          (window as any).__heroScrollProgress = self.progress;
        },
      },
    });

    // 1. Desvanecer y elevar texto frontal suavemente (GPU puro, sin blur pesado)
    if (heroContent) {
      heroTimeline.to(heroContent, {
        opacity: 0,
        y: -40,
        scale: 0.96,
        force3D: true,
        duration: 0.3,
        ease: 'power1.out',
      }, 0);
    }

    // 2. Zoom inmersivo hacia adentro de la onda de audio mientras se hace polvo
    heroTimeline.to(waveZoom, {
      scale: 3.0,
      force3D: true,
      duration: 1.0,
      ease: 'power1.inOut',
    }, 0);

    // 3. Desvanecimiento suave al final para dar paso fluido a la siguiente sección
    heroTimeline.to(waveZoom, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    }, 0.75);
  }

  // Transición de Diapositivas 3D (Deck Horizontal con Scroll Vertical)
  const deckContainer = document.querySelector<HTMLElement>('#slides-deck');
  const slides = q<HTMLElement>('#slides-deck .deck-slide');
  const hudTitle = document.querySelector<HTMLElement>('#deck-hud-title');
  const hudIndex = document.querySelector<HTMLElement>('#deck-hud-index');
  const hudDots = q<HTMLElement>('[data-deck-dot]');

  if (deckContainer && slides.length > 1 && slides[0]) {
    // Los reveal dentro del deck no tienen ScrollTrigger propio: mostrarlos siempre.
    gsap.set('#slides-deck [data-reveal]', { opacity: 1, y: 0 });
    gsap.set('#slides-deck [data-reveal="stagger"] > *', { opacity: 1, y: 0 });
    // Estado inicial: primera diapositiva activa, las demás ocultas a la derecha
    gsap.set(slides[0], { xPercent: 0, opacity: 1, scale: 1, pointerEvents: 'auto', zIndex: 10 });
    gsap.set(slides.slice(1), { xPercent: 100, opacity: 0, scale: 0.92, pointerEvents: 'none', zIndex: 1 });

    const totalTransitions = slides.length - 1;
    const deckTimeline = gsap.timeline({
      scrollTrigger: {
        id: 'deck-scroll',
        trigger: deckContainer,
        start: 'top top',
        end: () => `+=${totalTransitions * 130}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const rawIdx = self.progress * totalTransitions;
          const activeIdx = Math.min(slides.length - 1, Math.max(0, Math.round(rawIdx)));
          const currentSlide = slides[activeIdx];
          if (currentSlide) {
            if (hudTitle) hudTitle.textContent = currentSlide.dataset.slideTitle ?? '';
            if (hudIndex) hudIndex.textContent = currentSlide.dataset.slideTag ?? '';
          }
          hudDots.forEach((dot, dIdx) => {
            const isActive = dIdx === activeIdx;
            dot.classList.toggle('bg-accent', isActive);
            dot.classList.toggle('scale-125', isActive);
            dot.classList.toggle('shadow-[0_0_8px_#22c55e]', isActive);
            dot.classList.toggle('bg-line-strong', !isActive);
          });
        },
      },
    });

    // Construir las transiciones encadenadas entre diapositivas (efecto entrada y salida 3D)
    for (let i = 0; i < totalTransitions; i++) {
      const current = slides[i];
      const next = slides[i + 1];
      if (!current || !next) continue;
      const label = `step-${i}`;

      deckTimeline.addLabel(label);

      // Salida de la diapositiva actual: se desliza a la izquierda, se reduce y desvanece
      deckTimeline.to(current, {
        xPercent: -35,
        opacity: 0,
        scale: 0.92,
        duration: 1.0,
        ease: 'power2.inOut',
        force3D: true,
        onStart: () => { gsap.set(current, { pointerEvents: 'none', zIndex: 1 }); },
        onReverseComplete: () => { gsap.set(current, { pointerEvents: 'auto', zIndex: 10 }); },
      }, label);

      // Entrada de la siguiente diapositiva: entra desde la derecha al centro
      deckTimeline.to(next, {
        xPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: 'power2.inOut',
        force3D: true,
        onStart: () => { gsap.set(next, { pointerEvents: 'auto', zIndex: 10 }); },
        onReverseComplete: () => { gsap.set(next, { pointerEvents: 'none', zIndex: 1 }); },
      }, label);
    }

    // Scroll por pasos: hero -> diapositivas -> CTA. Cada gesto salta directo al siguiente tope.
    // Lenis ignora el scroll interno de la diapositiva si hay contenido largo
    slides.forEach((sl) => sl.setAttribute('data-lenis-prevent', ''));
    const st = ScrollTrigger.getById('deck-scroll');
    const cta = document.querySelector<HTMLElement>('#contacto');
    if (st && cta) {
      const stops = () => {
        const step = (st.end - st.start) / totalTransitions;
        const deck = Array.from({ length: slides.length }, (_, i) => st.start + i * step);
        return [0, ...deck, cta.getBoundingClientRect().top + scrollY];
      };
      const zoneEnd = () => stops().at(-1)!;
      let busy = false;
      let lastInput = 0;

      const inZone = (dir: number) => (dir > 0 ? scrollY < zoneEnd() - 2 : scrollY <= zoneEnd() + 2);
      const innerScrolls = (t: EventTarget | null, dir: number) => {
        const el = (t as HTMLElement | null)?.closest?.('.deck-slide') as HTMLElement | null;
        if (!el || el.scrollHeight <= el.clientHeight + 1) return false;
        return dir > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0;
      };
      const go = (dir: number) => {
        const list = stops();
        const y = scrollY;
        // indice del tope mas cercano; avanza o retrocede uno
        let cur = 0;
        list.forEach((v, i) => { if (Math.abs(v - y) < Math.abs(list[cur]! - y)) cur = i; });
        if (dir > 0 && list[cur]! > y + 2) cur -= 1; // aun no llega al tope cercano: contarlo como siguiente
        const next = Math.min(list.length - 1, Math.max(0, cur + dir));
        busy = true;
        lenis.scrollTo(list[next]!, {
          duration: 0.8,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          lock: true,
          force: true,
          onComplete: () => {
            const unlock = () => (Date.now() - lastInput > 140 ? (busy = false) : setTimeout(unlock, 60));
            unlock();
          },
        });
      };
      const handle = (dir: number, e: Event) => {
        if (!inZone(dir) || innerScrolls(e.target, dir)) return;
        if (e.cancelable) e.preventDefault();
        lastInput = Date.now();
        if (!busy) go(dir);
      };

      addEventListener('wheel', (e) => { if (Math.abs(e.deltaY) > 4) handle(Math.sign(e.deltaY), e); }, { passive: false });
      addEventListener('keydown', (e) => {
        const down = ['ArrowDown', 'PageDown', ' '].includes(e.key);
        const up = ['ArrowUp', 'PageUp'].includes(e.key);
        if ((down || up) && !(e.target as HTMLElement).closest('input,textarea,button,summary,a')) handle(down ? 1 : -1, e);
      });
      let ty = 0;
      addEventListener('touchstart', (e) => { ty = e.touches[0]!.clientY; }, { passive: true });
      addEventListener('touchmove', (e) => {
        const dir = Math.sign(ty - e.touches[0]!.clientY);
        if (dir && inZone(dir) && !innerScrolls(e.target, dir)) e.preventDefault();
      }, { passive: false });
      addEventListener('touchend', (e) => {
        const dy = ty - e.changedTouches[0]!.clientY;
        if (Math.abs(dy) > 40 && inZone(Math.sign(dy)) && !innerScrolls(e.target, Math.sign(dy)) && !busy) go(Math.sign(dy));
      }, { passive: true });
    }

    // Clic en los dots interactivos para navegar a una diapositiva específica
    hudDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        const st = ScrollTrigger.getById('deck-scroll');
        if (st) {
          const targetScroll = st.start + (st.end - st.start) * (idx / totalTransitions);
          lenis.scrollTo(targetScroll, { duration: 1.2 });
        }
      });
    });
  }



  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    q<HTMLElement>('[data-tilt]').forEach((el) => {
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5 });
      const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5 });
      gsap.set(el, { transformPerspective: 900 });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
      });
      el.addEventListener('pointerleave', () => { rx(0); ry(0); });
    });
  }
}


init();
