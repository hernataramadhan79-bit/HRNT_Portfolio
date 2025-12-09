import { useState, useEffect, useCallback, useRef } from 'react';
import { MotionValue } from 'framer-motion';

export interface Particle {
  x: number;
  y: number;
  // We need to store the document-level Y position for physics calculations
  docY: number; 
  startX: number;
  startY: number;
  initialX: number;
  initialY: number;
  radius: number;
  velocity: { x: number; y: number };
}

export const useParticles = (numParticles: number, scrollY: MotionValue<number>) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isIntro, setIsIntro] = useState(true);
  const mousePos = useRef({ x: -9999, y: -9999 });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const init = useCallback(() => {
    setIsIntro(true);
    const newParticles = Array.from({ length: numParticles }).map(() => ({
      startX: Math.random() * window.innerWidth,
      startY: Math.random() * window.innerHeight,
      x: 0,
      y: 0,
      // Start docY at the screen position
      docY: Math.random() * window.innerHeight,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * document.documentElement.scrollHeight,
      radius: Math.random() * 1.5 + 0.5,
      velocity: { x: (Math.random() - 0.5) * 0.5, y: (Math.random() - 0.5) * 0.5 },
    }));
    setTimeout(() => {
      setParticles(newParticles.map(p => ({ ...p, x: p.startX, y: p.startY, docY: p.startY })));
    }, 100);
    setTimeout(() => {
      setIsIntro(false);
    }, 4000);
  }, [numParticles]);

  useEffect(() => {
    init();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, [init]);

  useEffect(() => {
    let animationFrameId: number;

    const updateParticles = () => {
      const scrollOffset = scrollY.get();
      
      setParticles(prevParticles =>
        prevParticles.map(p => {
          let newX = p.x;
          // docY is the "true" position on the document scroll
          let newDocY = p.docY;
          let newVelX = p.velocity.x;
          let newVelY = p.velocity.y;

          if (isIntro) {
            newX += (p.initialX - newX) * 0.03;
            // Animate towards the final document position
            newDocY += (p.initialY - newDocY) * 0.03;
          } else {
            newX += newVelX;
            newDocY += newVelY;
            
            // Mouse interaction needs to use the visible Y, which is (docY - scrollOffset)
            const visibleY = newDocY - scrollOffset;
            const dx = mousePos.current.x - newX;
            const dy = mousePos.current.y - visibleY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              const force = (100 - dist) / 100;
              newX -= (dx / dist) * force * 2;
              // Affect the "true" document position
              newDocY -= (dy / dist) * force * 2;
            }

            // Gently pull back to the initial position in the document
            newX += (p.initialX - newX) * 0.0005;
            newDocY += (p.initialY - newDocY) * 0.0005;
            
            // Wall bouncing based on document coordinates
            if (newX < 0 || newX > window.innerWidth) newVelX *= -1;
            if (newDocY < 0 || newDocY > document.documentElement.scrollHeight) newVelY *= -1;
          }

          // The final rendered Y is the parallax-adjusted viewport position
          const finalY = newDocY - scrollOffset * (p.radius / 4 + 0.1);

          return { ...p, x: newX, y: finalY, docY: newDocY, velocity: { x: newVelX, y: newVelY } };
        })
      );
      animationFrameId = requestAnimationFrame(updateParticles);
    };

    animationFrameId = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isIntro, scrollY]);

  return { particles, onMouseMove };
};
