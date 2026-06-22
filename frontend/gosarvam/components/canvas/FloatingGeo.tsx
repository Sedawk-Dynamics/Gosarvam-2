'use client';

import { useEffect, useRef } from 'react';

export default function FloatingGeo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    const palette = ['rgba(180,120,60,', 'rgba(201,160,99,', 'rgba(120,150,80,', 'rgba(210,185,130,', 'rgba(160,100,50,'];

    const COUNT = 55;
    const seeds = Array.from({ length: COUNT }, () => {
      const col = palette[Math.floor(Math.random() * palette.length)];
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        rx: 2 + Math.random() * 5,
        ry: 1 + Math.random() * 2.5,
        rot: Math.random() * Math.PI,
        drot: (Math.random() - 0.5) * 0.008,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.15 - Math.random() * 0.25,
        opacity: 0.15 + Math.random() * 0.25,
        col,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.008 + Math.random() * 0.01,
      };
    });

    let animId: number;
    let visible = false;
    let frameCount = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      if (!visible) return;
      if (frameCount++ % 2 !== 0) return; // 30 fps — background decoration doesn't need 60

      ctx.clearRect(0, 0, W, H);
      seeds.forEach(s => {
        s.sway += s.swaySpeed;
        s.vx = Math.sin(s.sway) * 0.25;
        s.y += s.vy;
        s.x += s.vx;
        s.rot += s.drot;
        if (s.y < -10) { s.y = H + 10; s.x = Math.random() * W; }
        if (s.x < -10) s.x = W + 10;
        if (s.x > W + 10) s.x = -10;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, s.rx, s.ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = `${s.col}${s.opacity})`;
        ctx.fill();
        ctx.restore();
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
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
