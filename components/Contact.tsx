import React, { useRef, useState } from 'react';
import { motion, useIsomorphicLayoutEffect } from 'framer-motion';
import { SOCIALS } from '../src/constants';
import { ArrowUpRight, Copy } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

const SocialCard = ({ social, index }: { social: any, index: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isDesktop) return;
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;
    setRotate({ x, y });
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: -rotate.y,
        rotateY: rotate.x,
      }}
      className="group relative flex items-center justify-between p-6 rounded-2xl bg-[#0a0f1e] border border-white/5 overflow-hidden md:perspective-1000 transform transition-transform duration-100"
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full md:group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      
      <div className="relative z-10 flex items-center gap-4">
        <div className="p-2 bg-white/5 rounded-full text-gray-400 md:group-hover:text-white md:group-hover:bg-cyan-500 transition-all duration-300">
          <social.icon size={20} />
        </div>
        <span className="font-syne font-bold text-xl text-gray-300 md:group-hover:text-white transition-colors">{social.platform}</span>
      </div>
      <span className="relative z-10 text-gray-600 md:group-hover:text-cyan-400 transition-colors md:group-hover:translate-x-1 md:group-hover:-translate-y-1">
        <ArrowUpRight />
      </span>
    </motion.a>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 relative z-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-bold font-syne leading-[0.9]"
            >
              LET'S<br />
              <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">CREATE.</span>
            </motion.h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              I am currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="pt-8">
              <MagneticButton>
                 <a href="mailto:hernataramadhan79@gmail.com" className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full font-bold text-lg md:hover:bg-cyan-400 transition-colors duration-300 shadow-lg shadow-white/10 md:hover:shadow-cyan-400/50">
                   <span>hernataramadhan79@gmail.com</span> 
                   <Copy size={18} className="md:group-hover:rotate-12 transition-transform" />
                 </a>
              </MagneticButton>
            </div>
          </div>

          <div className="flex flex-col justify-end h-full pt-12 md:pt-0">
             <div className="grid grid-cols-1 gap-4 w-full perspective-container">
                {SOCIALS.map((social, index) => (
                  <SocialCard key={social.platform} social={social} index={index} />
                ))}
             </div>
          </div>

        </div>

        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm font-mono">
          <p className="hover:text-white transition-colors cursor-pointer">HERNATA © {new Date().getFullYear()}</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span className="animate-pulse text-cyan-500/50">●</span>
            <span>LOCAL TIME: {new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit', timeZone: 'Asia/Jakarta'})}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;