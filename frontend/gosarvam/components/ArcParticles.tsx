'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  alpha: number; decay: number;
  r: number; color: string;
}
interface Wave {
  x: number; y: number;
  radius: number; alpha: number; color: string; width: number;
}
interface Flare {
  x: number; y: number; alpha: number; r: number; color: string;
}

export interface ArcParticlesRef {
  burst: (x: number, y: number, glowRgb: string) => void;
}

const ArcParticles = forwardRef<ArcParticlesRef>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef<{ p: Particle[]; w: Wave[]; f: Flare[]; raf: number | null }>({
    p: [], w: [], f: [], raf: null,
  });

  function loop() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const s = state.current;

    /* ── Flare (central flash) ── */
    s.f = s.f.filter(f => f.alpha > 0.01);
    for (const f of s.f) {
      f.alpha *= 0.88;
      f.r     *= 1.06;
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
      g.addColorStop(0,   `rgba(${f.color},${f.alpha})`);
      g.addColorStop(0.4, `rgba(${f.color},${f.alpha * 0.4})`);
      g.addColorStop(1,   `rgba(${f.color},0)`);
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    /* ── Shockwave rings ── */
    s.w = s.w.filter(w => w.alpha > 0.01);
    for (const w of s.w) {
      w.radius += 5;
      w.alpha  *= 0.91;
      ctx.beginPath();
      ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${w.color},${w.alpha})`;
      ctx.lineWidth   = w.width;
      ctx.stroke();
    }

    /* ── Particles ── */
    s.p = s.p.filter(p => p.alpha > 0.01);
    for (const p of s.p) {
      p.x     += p.vx;
      p.y     += p.vy;
      p.vy    += 0.06;     // gravity
      p.vx    *= 0.98;     // air resistance
      p.alpha *= p.decay;
      p.r     *= 0.97;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.r), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    }

    if (s.p.length || s.w.length || s.f.length) {
      s.raf = requestAnimationFrame(loop);
    } else {
      s.raf = null;
    }
  }

  useImperativeHandle(ref, () => ({
    burst(x: number, y: number, glowRgb: string) {
      const s = state.current;

      /* Central flare */
      s.f.push({ x, y, alpha: 0.9, r: 18, color: '255,230,160' });
      s.f.push({ x, y, alpha: 0.6, r: 8,  color: glowRgb });


      /* Spark particles */
      const count = 48;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.25;
        const speed = 1.8 + Math.random() * 4.5;
        const isBig = Math.random() > 0.72;
        s.p.push({
          x, y,
          vx:    Math.cos(angle) * speed,
          vy:    Math.sin(angle) * speed - 0.5,
          alpha: 0.85 + Math.random() * 0.15,
          decay: 0.91 + Math.random() * 0.05,
          r:     isBig ? 2.8 + Math.random() * 1.8 : 1 + Math.random() * 1.2,
          color: Math.random() > 0.45 ? '201,160,99' : glowRgb,
        });
      }

      /* Slow drifting ember trail (upward) */
      for (let i = 0; i < 12; i++) {
        s.p.push({
          x: x + (Math.random() - 0.5) * 30,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -1.5 - Math.random() * 2.5,
          alpha: 0.7,
          decay: 0.96,
          r: 1.2 + Math.random() * 1.4,
          color: '255,220,140',
        });
      }

      if (!s.raf) s.raf = requestAnimationFrame(loop);
    },
  }));

  /* Resize canvas to match container */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
    ro.observe(canvas.parentElement!);
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 15,
      }}
    />
  );
});

ArcParticles.displayName = 'ArcParticles';
export default ArcParticles;
