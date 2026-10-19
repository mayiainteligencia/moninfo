import { useEffect, useRef } from 'react';

// Texto de transcripción continua con detección inteligente
const TEXT = '  ...MAYIA ESCUCHA detecta y transcribe transmisiones de radio en vivo en tiempo real con Whisper en servidor propio generando evidencia verificable sin costo por minuto...  ';
const KEY = 'MAYIA ESCUCHA';
const keyStart = TEXT.indexOf(KEY);
const COL = 13; // px por carácter/columna
const SPEED = 34; // px por segundo (dinámico, fluido y con buen ritmo)


interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export default function HeroWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    let offset = keyStart * COL - 280;
    let visible = true;
    let mouse = { x: -1000, y: -1000, active: false };

    // Partículas adaptativas según dispositivo (más ligero en móviles para 60fps fluidos)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 75;
    const particles: Particle[] = [];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * (w || 1200),
          y: Math.random() * (h || 600),
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 2.0 + 0.6,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const resize = () => {
      // Limitar DPR a 1.25 para evitar sobrecarga en pantallas Retina / 4K
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) initParticles();
    };

    // Amplitud acústica dinámica
    const amp = (i: number, t: number) => {
      const s1 = Math.sin(i * 0.24 + t * 0.0022);
      const s2 = Math.sin(i * 0.09 - t * 0.0016);
      return (0.16 + 0.84 * Math.abs(s1 * s2)) * 0.85;
    };

    const draw = (now: number) => {
      const snapProgress = typeof window !== 'undefined' ? (window as any).__heroScrollProgress || 0 : 0;
      
      // Si la sección ya pasó completamente, no renderizar nada para ahorrar 100% de CPU
      if (snapProgress >= 0.98) return;

      ctx.clearRect(0, 0, w, h);
      const mid = h * 0.52;
      const cursor = w * 0.5;

      // 1. Resplandor volumétrico central cyber lime
      const glow = ctx.createRadialGradient(cursor, mid, 15, cursor, mid, Math.min(w, h) * 0.85);
      glow.addColorStop(0, 'rgba(219, 242, 133, 0.22)');
      glow.addColorStop(0.35, 'rgba(114, 144, 19, 0.12)');
      glow.addColorStop(0.7, 'rgba(14, 22, 6, 0.04)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // 2. Partículas cinemáticas en BATCH (un solo draw call para máximo rendimiento)
      ctx.beginPath();
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.moveTo(p.x + p.size, p.y);
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      }
      ctx.fillStyle = 'rgba(219, 242, 133, 0.38)';
      ctx.fill();

      // 3. Guía sutil de frecuencia
      ctx.strokeStyle = 'rgba(219, 242, 133, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 8]);
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(w, mid);
      ctx.stroke();
      ctx.setLineDash([]);

      // 4. Ondas acústicas (derecha) y transcripción decodificada (izquierda)
      // Efecto Thanos: desintegración progresiva en partículas de polvo con el scroll
      const snap = Math.min(1, Math.max(0, (snapProgress - 0.12) / 0.78));

      const first = Math.floor((offset - w) / COL) - 2;
      const lastCol = Math.ceil(offset / COL) + 2;

      for (let c = first; c <= lastCol; c++) {
        const x = w + c * COL - offset;
        const charIdx = ((c % TEXT.length) + TEXT.length) % TEXT.length;
        const inKey = charIdx >= keyStart && charIdx < keyStart + KEY.length;

        // Umbral orgánico
        const randSeed = Math.abs(Math.sin(c * 12.9898 + 78.233));
        const colThreshold = randSeed * 0.65;

        const isDisintegrating = snap > colThreshold;
        const dissolve = isDisintegrating ? Math.min(1, (snap - colThreshold) / (1 - colThreshold + 0.001)) : 0;

        if (isDisintegrating && dissolve > 0.02) {
          // Polvo Thanos optimizado sin shadowBlur (GPU-friendly)
          const dustCount = 6;
          const baseHeight = amp(c, now) * (h * 0.36);
          const dustAlpha = Math.max(0, (1 - dissolve) * 0.75);

          ctx.fillStyle = inKey ? `rgba(219, 242, 133, ${dustAlpha})` : `rgba(237, 251, 193, ${dustAlpha})`;
          ctx.beginPath();
          for (let p = 0; p < dustCount; p++) {
            const pSeed = (p * 0.33 + randSeed) % 1;
            const pAngle = pSeed * Math.PI * 2;
            const pSpeed = (0.5 + pSeed * 1.5) * (1 + dissolve * 2);

            const driftX = Math.cos(pAngle) * dissolve * 60 * pSpeed + (dissolve * 30);
            const driftY = Math.sin(pAngle) * dissolve * 40 * pSpeed - (dissolve * 35);
            const dustX = x + driftX;
            const dustY = mid + (pSeed - 0.5) * (x > cursor ? baseHeight * 1.5 : 20) + driftY;
            const dustSize = Math.max(0.5, (1 - dissolve * 0.7) * 1.6);

            ctx.moveTo(dustX + dustSize, dustY);
            ctx.arc(dustX, dustY, dustSize, 0, Math.PI * 2);
          }
          ctx.fill();
          continue;
        }

        const intactAlpha = 1 - snap * 0.25;

        if (x > cursor) {
          // Audio crudo
          const barHeight = amp(c, now) * (h * 0.36);
          const distToCursor = x - cursor;
          const alphaFade = Math.min(1, Math.max(0.15, 1 - distToCursor / (w * 0.52))) * intactAlpha;

          ctx.fillStyle = 'rgba(219, 242, 133, 0.85)';
          ctx.globalAlpha = alphaFade;
          ctx.fillRect(x - 1.5, mid - barHeight, 3, barHeight * 2);

          // Punta brillante
          ctx.fillStyle = '#EDFBC1';
          ctx.fillRect(x - 1, mid - barHeight - 2, 2, 2);
        } else {
          // Texto transcrito
          const distLeft = cursor - x;
          const textFade = Math.min(1, Math.max(0.12, 1 - distLeft / (cursor * 0.96))) * intactAlpha;

          ctx.globalAlpha = textFade;
          ctx.fillStyle = inKey ? '#DBF285' : '#e2e8f0';
          ctx.font = '600 13px ui-monospace, SFMono-Regular, Menlo, monospace';
          ctx.textAlign = 'center';
          const ch = TEXT[charIdx] ?? '';
          if (ch !== ' ') {
            ctx.fillText(ch, x, mid + 5);
          }
        }
      }

      // 5. Cabezal de escaneo luminoso vertical (haz láser estilo screenshot)
      const headAlpha = Math.max(0, 1 - snap * 1.5);
      if (headAlpha > 0.01) {
        ctx.globalAlpha = headAlpha;
        const beamGrad = ctx.createLinearGradient(0, 0, 0, h);
        beamGrad.addColorStop(0, 'rgba(219, 242, 133, 0)');
        beamGrad.addColorStop(0.2, 'rgba(219, 242, 133, 0.3)');
        beamGrad.addColorStop(0.5, 'rgba(219, 242, 133, 0.95)');
        beamGrad.addColorStop(0.8, 'rgba(219, 242, 133, 0.3)');
        beamGrad.addColorStop(1, 'rgba(219, 242, 133, 0)');

        ctx.fillStyle = beamGrad;
        ctx.fillRect(cursor - 1, 0, 2, h);

        // Halo luminoso en el centro del haz acústico
        const beamGlow = ctx.createRadialGradient(cursor, mid, 1, cursor, mid, 30);
        beamGlow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        beamGlow.addColorStop(0.35, 'rgba(219, 242, 133, 0.5)');
        beamGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = beamGlow;
        ctx.beginPath();
        ctx.arc(cursor, mid, 30, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      offset += ((t - last) / 1000) * SPEED;
      last = t;
      draw(t);
    };


    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      last = performance.now();
    });
    io.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    if (reduced) {
      offset = w * 0.5 + (keyStart + KEY.length) * COL;
      draw(0);
    } else {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="relative h-full w-full pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        role="img"
        aria-label="Visualizador acústico y transcripción en tiempo real con inteligencia artificial"
      />
    </div>
  );
}



