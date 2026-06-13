'use client';

import { useEffect, useRef } from 'react';

// Animated trade-route arcs — dots traveling from farm (left) to port (right)
// Represents goods in transit: the physical journey of every shipment
export default function FlowLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    const ROUTES = 8;
    const gold = 'rgba(201,160,99,';

    type Route = {
      x1: number; y1: number;
      x2: number; y2: number;
      cx: number; cy: number; // control point
      t: number; speed: number;
      trailLen: number;
      dotSize: number;
    };

    const makeRoute = (): Route => ({
      x1: W * 0.04 + Math.random() * W * 0.12,
      y1: H * 0.2 + Math.random() * H * 0.6,
      x2: W * 0.84 + Math.random() * W * 0.12,
      y2: H * 0.2 + Math.random() * H * 0.6,
      cx: W * 0.3 + Math.random() * W * 0.4,
      cy: H * 0.05 + Math.random() * H * 0.35,
      t: Math.random(),
      speed: 0.0015 + Math.random() * 0.002,
      trailLen: 0.06 + Math.random() * 0.06,
      dotSize: 2.5 + Math.random() * 2,
    });

    const routes: Route[] = Array.from({ length: ROUTES }, makeRoute);

    const bezier = (t: number, p0: number, p1: number, p2: number) =>
      (1 - t) ** 2 * p0 + 2 * (1 - t) * t * p1 + t ** 2 * p2;

    let animId: number;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);

      routes.forEach(r => {
        r.t += r.speed;
        if (r.t > 1) { r.t = 0; Object.assign(r, makeRoute(), { t: 0 }); }

        // Draw faint arc path
        ctx.beginPath();
        ctx.moveTo(r.x1, r.y1);
        ctx.quadraticCurveTo(r.cx, r.cy, r.x2, r.y2);
        ctx.strokeStyle = `${gold}0.07)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw glowing trail along the arc
        const steps = 24;
        for (let i = 0; i < steps; i++) {
          const st = r.t - r.trailLen * (i / steps);
          if (st < 0) continue;
          const px = bezier(st, r.x1, r.cx, r.x2);
          const py = bezier(st, r.y1, r.cy, r.y2);
          const alpha = (1 - i / steps) * 0.55;
          const size = r.dotSize * (1 - i / steps * 0.6);
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `${gold}${alpha})`;
          ctx.fill();
        }

        // Leading dot (the "cargo")
        const lx = bezier(r.t, r.x1, r.cx, r.x2);
        const ly = bezier(r.t, r.y1, r.cy, r.y2);
        ctx.beginPath();
        ctx.arc(lx, ly, r.dotSize + 1, 0, Math.PI * 2);
        ctx.fillStyle = `${gold}0.9)`;
        ctx.fill();

        // Glow ring
        const grd = ctx.createRadialGradient(lx, ly, 0, lx, ly, r.dotSize + 8);
        grd.addColorStop(0, `${gold}0.3)`);
        grd.addColorStop(1, `${gold}0)`);
        ctx.beginPath();
        ctx.arc(lx, ly, r.dotSize + 8, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });
    };
    draw();

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
      routes.forEach((r, i) => { routes[i] = { ...makeRoute(), t: r.t }; });
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
