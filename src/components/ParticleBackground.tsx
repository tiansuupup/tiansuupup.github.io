import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

// Weighted: more cyan than pink to match the design language
const PARTICLE_COLORS = ['#00FFD1', '#00FFD1', '#00FFD1', '#FF2E97'];
const CONNECTION_DIST = 130;
const CONNECTION_ALPHA = 0.25;

function createParticles(width: number, height: number): Particle[] {
  // Scale particle count to screen area, capped for performance
  const count = Math.min(110, Math.max(40, Math.floor((width * height) / 11000)));
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    radius: Math.random() * 1.8 + 0.4,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    alpha: Math.random() * 0.55 + 0.25,
  }));
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    particlesRef.current = createParticles(canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const tick = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap at edges
        if (p.x < 0) p.x += width;
        else if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        else if (p.y > height) p.y -= height;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw connecting lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          // Skip sqrt for performance: compare squared distances
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECTION_DIST * CONNECTION_DIST) {
            const ratio = 1 - Math.sqrt(distSq) / CONNECTION_DIST;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = '#00FFD1';
            ctx.globalAlpha = ratio * CONNECTION_ALPHA;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  );
}
