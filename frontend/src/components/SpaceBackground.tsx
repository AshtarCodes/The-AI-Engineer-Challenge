'use client';

import { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star data
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      brightness: number;
    }> = [];

    // Generate stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        brightness: Math.random() * 0.5 + 0.5,
      });
    }

    // Celestial bodies
    const celestialBodies = [
      {
        x: canvas.width * 0.8,
        y: canvas.height * 0.2,
        radius: 30,
        color: '#4A90E2',
        name: 'Earth',
        glow: true,
      },
      {
        x: canvas.width * 0.15,
        y: canvas.height * 0.7,
        radius: 15,
        color: '#F5A623',
        name: 'Mars',
        glow: false,
      },
    ];

    let animationId: number;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#0B0E14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(230, 241, 255, ${star.brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Move stars slowly
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw celestial bodies
      celestialBodies.forEach((body) => {
        if (body.glow) {
          // Draw glow effect
          const gradient = ctx.createRadialGradient(
            body.x, body.y, 0,
            body.x, body.y, body.radius * 2
          );
          gradient.addColorStop(0, `${body.color}40`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(body.x, body.y, body.radius * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw body
        ctx.fillStyle = body.color;
        ctx.beginPath();
        ctx.arc(body.x, body.y, body.radius, 0, Math.PI * 2);
        ctx.fill();

        // Add some surface detail
        ctx.fillStyle = `${body.color}80`;
        ctx.beginPath();
        ctx.arc(body.x - body.radius * 0.3, body.y - body.radius * 0.3, body.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Add some nebula-like effects
      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.4, 0,
        canvas.width * 0.3, canvas.height * 0.4, 300
      );
      nebulaGradient.addColorStop(0, 'rgba(0, 224, 255, 0.1)');
      nebulaGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default SpaceBackground;
