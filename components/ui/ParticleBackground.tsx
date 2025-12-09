import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Particle } from '../../hooks/useParticles';

interface ParticleBackgroundProps {
  particles: Particle[];
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ particles }) => {
  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400/50"
          style={{
            x: p.x,
            y: p.y,
            width: p.radius * 2,
            height: p.radius * 2,
          }}
        />
      ))}
    </motion.div>
  );
};

export default ParticleBackground;