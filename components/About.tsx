import React, { useRef, useState, useEffect } from 'react';
import { motion, useIsomorphicLayoutEffect } from 'framer-motion';

// 1. Impor gambar profil Anda dari folder assets
import profileImage from '/src/profile.jpg'; // <-- Ganti 'profile.jpg' dengan nama file Anda

const About: React.FC = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    setOpacity(0);
  };


  return (
    <section id="about" className="py-32 relative z-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-mono text-cyan-400 mb-6 tracking-widest uppercase">
              // Who I Am?
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold font-syne leading-tight mb-8">
              More than just<br/>
              <span className="text-gray-500">lines of code.</span>
            </h3>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
              <p>
                My name is <strong className="text-white">Hernata Ramadhan</strong>. I'm a developer passionate about creating digital experiences that feel organic and alive.
              </p>
              <p>
                I don't just build websites; I craft ecosystems where design meets functionality in perfect harmony. With a background in both technical engineering and creative design, I bridge the gap between "it works" and "it feels right."
              </p>
              <p>
                Currently creating liquid interfaces and high-performance applications that push the web forward.
              </p>
            </div>
          </motion.div>

          {/* Abstract Visual / Stats */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative" // This will be the main container for mouse events
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative aspect-[4/5] bg-[#0a0f1e]/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 p-6 flex flex-col justify-end shadow-2xl shadow-purple-900/10 group/image transition-all duration-300 md:group-hover/image:border-cyan-500/30">
               
               {/* Spotlight Effect */}
               <div
                 className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 md:group-hover/image:opacity-100 z-20"
                 style={{
                   opacity,
                   background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(34,211,238,0.15), transparent 40%)`,
                 }}
               />

               {/* User Image Background */}
               <div className="absolute inset-0 z-0">
                 {/* 2. Gunakan variabel gambar yang sudah diimpor di sini */}
                 <img 
                    src={profileImage} 
                    alt="Hernata Ramadhan"
                    className="w-full h-full object-cover transition-all duration-700 md:group-hover/image:scale-105 grayscale md:group-hover/image:grayscale-0"
                 />
                 {/* Gradient Overlays for readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent" />
               </div>

               <div className="absolute top-4 right-4 z-10">
                  <div className="text-6xl font-syne font-bold text-white/20 select-none drop-shadow-lg">
                    01
                  </div>
               </div>

               <div className="relative z-10 grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={isDesktop ? { scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.1)" } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 cursor-default transition-colors duration-300 md:hover:border-cyan-500/40 md:hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                  >
                    <span className="block text-2xl font-bold text-white mb-1">3+</span>
                    <span className="text-xs font-mono text-cyan-200">YEARS EXP.</span>
                  </motion.div>
                  
                  <motion.div
                    whileHover={isDesktop ? { scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.1)" } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 cursor-default transition-colors duration-300 md:hover:border-purple-500/40 md:hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                  >
                    <span className="block text-2xl font-bold text-white mb-1">20+</span>
                    <span className="text-xs font-mono text-purple-200">PROJECTS</span>
                  </motion.div>
                  
                  <motion.div
                    whileHover={isDesktop ? { scale: 1.02, backgroundColor: "rgba(34, 211, 238, 0.15)" } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 col-span-2 cursor-default transition-colors duration-300 md:hover:border-cyan-400/50 md:hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]"
                  >
                    <span className="block text-2xl font-bold text-cyan-400 mb-1">100%</span>
                    <span className="text-xs font-mono text-gray-300">COMMITTED</span>
                  </motion.div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;