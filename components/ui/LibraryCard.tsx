import React, { useRef, useState } from 'react';
import { motion, Variants, useIsomorphicLayoutEffect } from 'framer-motion';
import { ArrowUpRight, Award, FileText as CertificateIcon } from 'lucide-react';
import { LibraryItem, Certificate } from '../types';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 } 
  },
  hover: { 
    y: -8,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } 
  }
};

const imageVariants: Variants = {
  visible: { scale: 1, filter: "grayscale(80%)" },
  hover: { scale: 1.05, filter: "grayscale(0%)" }
};

interface LibraryCardProps {
  item: LibraryItem;
  onCardClick: (item: LibraryItem) => void;
}

const LibraryCard = ({ item, onCardClick }: LibraryCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
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
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    setOpacity(0);
  };

  const isCertificateWithImage = item.type === 'certificate' && (item as Certificate).certificateImage;
  
  const handleClick = (e: React.MouseEvent) => {
    if (isCertificateWithImage) {
      e.preventDefault();
      onCardClick(item);
    }
  };

  const link = item.type === 'project' ? item.link : (item.type === 'certificate' ? item.link : '#');

  const Tag = () => {
    let icon;
    let text;
    switch (item.type) {
      case 'project':
        text = item.category;
        break;
      case 'certificate':
        icon = <CertificateIcon size={12} className="mr-1.5" />;
        text = item.issuer;
        break;
      case 'achievement':
        icon = <Award size={12} className="mr-1.5" />;
        text = item.award;
        break;
    }
    return (
      <div className="absolute top-6 left-6 z-20">
        <div className="px-3 py-1 text-[10px] font-mono uppercase bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-full text-cyan-200 flex items-center">
         {icon} {text}
        </div>
      </div>
    );
  };

  const cursorStyle = isCertificateWithImage || item.type === 'project' ? 'cursor-pointer' : '';

  return (
    <motion.a
      href={link}
      target={isCertificateWithImage ? '_self' : '_blank'}
      rel="noopener noreferrer"
      ref={divRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout // This is key for the filter animation
      initial="hidden"
      animate="visible"
      exit="hidden"
      whileHover={isDesktop ? "hover" : ""}
      variants={cardVariants}
      className={`group relative rounded-3xl overflow-hidden bg-[#0a0f1e] border border-white/10 ${isDesktop ? cursorStyle : ''} ${item.span} shadow-lg shadow-black/50`}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 md:group-hover:opacity-100 z-30"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34,211,238,0.15), transparent 40%)`,
        }}
      />
      {/* Border Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 md:group-hover:opacity-100 z-30"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34,211,238,0.4), transparent 40%)`,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px' // Border width
        }}
      />

      <Tag />

      <div className="aspect-[4/3] md:aspect-auto md:h-[400px] w-full overflow-hidden relative z-10">
        <motion.img
          src={item.image}
          alt={item.title}
          variants={imageVariants}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020617]/90 opacity-60 md:group-hover:opacity-40 transition-opacity duration-500" />
      </div>
      
      {/* Container for bottom content: Title, Description, and Link Icon */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex justify-between items-end">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold font-syne text-white mb-2 md:group-hover:text-cyan-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 max-w-md group-hover:text-white transition-colors">
            {item.description}
          </p>
        </div>
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-400 text-black flex items-center justify-center transform scale-0 md:group-hover:scale-100 transition-transform duration-300 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          <ArrowUpRight size={20} />
        </div>
      </div>

      {/* Tech stack for projects only - positioned above the bottom content */}
      {item.type === 'project' && (
        <div className="absolute bottom-28 left-8 w-full pr-8 z-20">
          <div className="flex flex-wrap gap-2 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 md:group-hover:translate-y-0">
            {item.tech.map((t: string) => (
              <span key={t} className="px-3 py-1 text-[10px] font-mono uppercase bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-full text-cyan-200">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.a>
  );
};

export default LibraryCard;
