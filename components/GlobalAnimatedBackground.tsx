import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GlobalAnimatedBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Membuat efek parallax "terhempas": Latar belakang akan bergerak ke atas saat scroll ke bawah.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Membuat efek gelap: Opasitas gradien gelap akan meningkat saat scroll ke bawah (dihapus sesuai permintaan sebelumnya)
  const darknessOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0.5, 0.9]);

  return (
    <>
      <motion.div 
        style={{ y }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 will-change-transform"
      >
        {/* Kontainer animasi diperluas agar terasa lebih luas */}
        <div className="relative w-[1200px] h-[1200px] opacity-30 md:opacity-40 scale-[0.4] sm:scale-[0.7] md:scale-100">
          {/* Ring 1: Organic Outer Shell - Cyan */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[2px] border-cyan-500/30 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] shadow-[0_0_80px_rgba(34,211,238,0.2)] will-change-transform"
          />
          
          {/* Ring 2: Organic Outer Shell - Purple Offset */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[50px] border-[1px] border-purple-500/30 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] will-change-transform"
          />

          {/* Ring 3: Technical Dashed Ring */}
          <motion.div 
            animate={{ rotate: 180 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[150px] border border-dashed border-white/20 rounded-full will-change-transform"
          />

          {/* Ring 4: Elliptical Orbit */}
          <motion.div 
            animate={{ rotateX: [0, 360], rotateY: [0, 180], rotateZ: [0, 90] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[200px] border-[2px] border-cyan-400/40 rounded-full will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          />

          {/* Ring 5: Inner Core Pulse */}
          <motion.div 
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[300px] bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-full blur-2xl will-change-transform"
          ></motion.div>
        </div>
    
      </motion.div>
    </>
  );
};

export default GlobalAnimatedBackground;