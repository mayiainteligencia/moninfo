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

  q<HTMLElement>('[data-reveal]').forEach((el) => {
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

  q('[data-split]').forEach((el) =>
    once(el, () => gsap.to(el.querySelectorAll('.w > span'), { y: 0, stagger: 0.045, duration: motion.duration.slow })),
  );

  q<HTMLElement>('[data-parallax]').forEach((el) => {
    const s = Number(el.dataset.parallax) * 50;
    gsap.fromTo(el, { yPercent: -s }, { yPercent: s, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  q<HTMLElement>('[data-counter]').forEach((el) => {
    const to = Number(el.dataset.to);
    const dec = Number(el.dataset.decimals ?? 0);
    const { prefix = '', suffix = '' } = el.dataset;
    const state = { v: 0 };
    el.textContent = `${prefix}${(0).toFixed(dec)}${suffix}`;
    once(el, () =>
      gsap.to(state, { v: to, duration: 1.6, ease: motion.ease.soft,
        onUpdate: () => (el.textContent = `${prefix}${state.v.toFixed(dec)}${suffix}`) }), 'top 92%');
  });

  q<HTMLElement>('[data-timeline]').forEach((tl) => {
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
        end: '+=130%',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
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
        y: -50,
        scale: 0.96,
        force3D: true,
        duration: 0.35,
        ease: 'power1.out',
      }, 0);
    }

    // 2. Zoom inmersivo hacia adentro de la onda de audio mientras se hace polvo
    heroTimeline.to(waveZoom, {
      scale: 3.2,
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
