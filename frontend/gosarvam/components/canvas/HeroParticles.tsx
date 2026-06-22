'use client';

import { useEffect, useRef } from 'react';

// Floating spice dust / tea mist particles for the hero
// Warm amber + gold tones — feels like morning light over an Assam tea garden
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    const COUNT = 90;
    const palette = [
      'rgba(255,210,120,', // warm gold
      'rgba(201,160,99,',  // amber
      'rgba(240,195,100,', // honey
      'rgba(180,140,80,',  // dark amber
      'rgba(255,230,160,', // pale gold
    ];

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1 + Math.random() * 3.5,
      col: palette[Math.floor(Math.random() * palette.length)],
      opacity: 0.1 + Math.random() * 0.3,
      vy: -0.2 - Math.random() * 0.4,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.005 + Math.random() * 0.01,
      swayAmp: 0.3 + Math.random() * 0.5,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    }));

    let animId: number;
    let visible = false;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      if (!visible) return;

      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.sway += p.swaySpeed;
        p.pulse += p.pulseSpeed;
        p.y += p.vy;
        p.x += Math.sin(p.sway) * p.swayAmp;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;

        // Simple circle fill instead of radialGradient per particle — ~8× faster
        const pulsedOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
        ctx.fillStyle = `${p.col}${pulsedOpacity})`;
        ctx.fill();
      });
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(canvas);
    draw();

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
    />
  );
}
