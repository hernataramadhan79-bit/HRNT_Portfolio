import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FluidBackground: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms - moving slower than scroll
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden bg-[#020617] pointer-events-none">
      {/* Background gradients - New Theme: Cyan, Purple, Deep Blue */}
      <motion.div 
        style={{ y: y1 }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 10, -10, 0] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[20%] w-[60vw] h-[60vw] bg-cyan-500/10 rounded-full blur-[80px] mix-blend-screen"
      />
      
      <motion.div 
        style={{ y: y2 }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] -right-[20%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[90px] mix-blend-screen"
      />

      <motion.div 
        style={{ y: y3 }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] left-[10%] w-[80vw] h-[80vw] bg-blue-700/5 rounded-full blur-[90px] mix-blend-screen"
      />

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] z-[1]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      ></div>
    </div>
  );
};

export default FluidBackground;