'use client';
import { useEffect, useRef } from 'react';

export default function SpaceBackground({ intensity = 1, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let nebulae = [];
    let asteroids = [];
    let comet = { x: -2000, y: 0, size: 3, length: 800, speed: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const count = Math.floor(200 * intensity);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.8 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        parallax: Math.random() * 0.3 + 0.1, // Added parallax for stars too
      }));
      nebulae = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 300 * intensity, color: [0, 102, 255], drift: 0 },
        { x: canvas.width * 0.8, y: canvas.height * 0.6, r: 250 * intensity, color: [139, 92, 246], drift: Math.PI },
        { x: canvas.width * 0.5, y: canvas.height * 0.8, r: 200 * intensity, color: [0, 229, 255], drift: Math.PI / 2 },
      ];
      
      const asteroidCount = Math.floor(20 * intensity);
      asteroids = Array.from({ length: asteroidCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1, // Reduced size (1 to 4 radius)
        speed: Math.random() * 2 + 0.5, // falling speed
        parallax: Math.random() * 1.2 + 0.4, // scroll multiplier
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        opacity: Math.random() * 0.4 + 0.15,
        vertices: Math.floor(Math.random() * 4) + 5, // 5 to 8 vertices
        offsets: Array.from({ length: 8 }, () => Math.random() * 0.5 + 0.7) // irregular shape
      }));
    };

    const drawNebula = (n, time) => {
      const offsetX = Math.sin(time * 0.0003 + n.drift) * 30;
      const offsetY = Math.cos(time * 0.0002 + n.drift) * 20;
      const grad = ctx.createRadialGradient(
        n.x + offsetX, n.y + offsetY, 0,
        n.x + offsetX, n.y + offsetY, n.r
      );
      grad.addColorStop(0, `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, 0.06)`);
      grad.addColorStop(0.5, `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, 0.02)`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    let lastScrollY = window.scrollY || 0;

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentScrollY = window.scrollY || 0;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Nebulae
      nebulae.forEach(n => drawNebula(n, time));

      // Comet (Dashes gracefully on scroll)
      if (Math.abs(deltaY) > 0) {
        comet.speed += Math.abs(deltaY) * 0.02; // Very gentle acceleration
      }
      if (comet.speed > 3) comet.speed = 3; // Majestic, realistic cruising speed
      comet.speed *= 0.98; // Glides smoothly
      comet.x += comet.speed;

      if (comet.x > canvas.width + 2000) {
        comet.x = -2000;
        comet.y = Math.random() * (canvas.height * 0.6); 
      }

      if (comet.speed > 0.05) {
        ctx.save();
        ctx.translate(comet.x, comet.y);
        ctx.rotate(Math.PI / 14); // Slight angle

        // Realistic Ion Tail (Cyan/Purple to match background nebulae)
        const tailGrad = ctx.createLinearGradient(0, 0, -comet.length, 0);
        tailGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        tailGrad.addColorStop(0.1, 'rgba(0, 229, 255, 0.2)');
        tailGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)'); // Blends into space
        tailGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-comet.length, -comet.size * 6); // Tail widens as it fades
        ctx.lineTo(-comet.length, comet.size * 6);
        ctx.closePath();
        
        ctx.fillStyle = tailGrad;
        ctx.shadowBlur = 30; // Soften the edges to make it look gaseous
        ctx.shadowColor = 'rgba(0, 229, 255, 0.2)';
        ctx.fill();

        // Bright Core (Nucleus)
        ctx.beginPath();
        ctx.arc(0, 0, comet.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(0, 229, 255, 0.8)';
        ctx.fill();

        // Glowing Coma (Atmosphere around nucleus)
        ctx.beginPath();
        ctx.arc(0, 0, comet.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
        ctx.fill();

        ctx.restore();
      }

      // Stars
      stars.forEach(s => {
        s.pulse += s.pulseSpeed;
        const flicker = Math.sin(s.pulse) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * flicker})`;
        ctx.fill();

        // Drift up naturally, plus scroll parallax
        s.y -= s.speed; 
        s.y -= deltaY * s.parallax;
        
        if (s.y < -5) {
          s.y = canvas.height + 5;
          s.x = Math.random() * canvas.width;
        } else if (s.y > canvas.height + 5) {
          s.y = -5;
          s.x = Math.random() * canvas.width;
        }
      });

      // Asteroids
      asteroids.forEach(a => {
        // Falling down naturally, plus scroll parallax
        a.y += a.speed;
        a.y -= deltaY * a.parallax;
        a.rotation += a.rotationSpeed;

        if (a.y > canvas.height + 50) {
          a.y = -50;
          a.x = Math.random() * canvas.width;
        } else if (a.y < -50) {
          a.y = canvas.height + 50;
          a.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.rotation);
        
        ctx.beginPath();
        for (let j = 0; j < a.vertices; j++) {
          const angle = (j / a.vertices) * Math.PI * 2;
          const r = a.size * a.offsets[j];
          if (j === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
          else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        }
        ctx.closePath();
        
        // Blend with background (deep purple/blue tint)
        ctx.fillStyle = `rgba(100, 116, 139, ${a.opacity})`; // slate color
        ctx.strokeStyle = `rgba(139, 92, 246, ${a.opacity * 0.8})`; // purple edge glow
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}
