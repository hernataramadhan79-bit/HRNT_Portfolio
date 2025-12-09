import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { NAV_ITEMS } from '../src/constants'; // Pastikan path benar
import { Menu, X, Send } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  isVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, isVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  
  // --- LOGIKA 1: Manual Click Lock (Anti-Sendat) ---
  const isManualScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // --- LOGIKA 2: Sliding Box Position ---
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [isInitialized, setIsInitialized] = useState(false); 

  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // --- MOUSE MOVE HANDLER (Spotlight) ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // --- UPDATE POSISI PILL ---
  const updatePillPosition = (targetHref: string) => {
    const activeIndex = NAV_ITEMS.findIndex(item => item.href.substring(1) === targetHref);
    
    if (activeIndex !== -1 && itemsRef.current[activeIndex]) {
      const currentItem = itemsRef.current[activeIndex];
      
      if (currentItem) {
        setPillStyle({
          left: currentItem.offsetLeft,
          width: currentItem.offsetWidth,
          opacity: 1
        });
        
        if (!isInitialized) setIsInitialized(true);
      }
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  };

  // --- EFFECT HANDLERS ---
  useEffect(() => {
    updatePillPosition(activeSection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    if (!isManualScrolling.current) {
      updatePillPosition(activeSection);
    }
  }, [activeSection]);

  useEffect(() => {
    const handleResize = () => {
       updatePillPosition(activeSection);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  // --- CLICK HANDLER ---
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);

    isManualScrolling.current = true;
    updatePillPosition(targetId);
    
    setIsOpen(false);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    const element = document.querySelector(href);
    // PERBAIKAN: Mengubah kalkulasi offset agar pendaratan lebih presisi.
    // Setiap seksi sudah memiliki padding atas (py-32), jadi offset tambahan tidak diperlukan.
    if (element) { 
      const elementPosition = element.getBoundingClientRect().top; 
      const offset = 0; // Atur offset ke 0
      const offsetPosition = elementPosition + window.pageYOffset - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }

    scrollTimeout.current = setTimeout(() => {
      isManualScrolling.current = false;
      updatePillPosition(targetId);
    }, 1000);
  };

  const logoLetters = "HRNT".split(""); 

  // Transisi Active Pill
  const pillTransition = {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 0.8
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            key="navbar-header"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              mass: 1,
            }}
            className="fixed top-7 inset-x-0 z-50 flex justify-center pointer-events-none px-4"
          >
            <motion.div 
              className="pointer-events-auto relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              onMouseEnter={() => setIsHoveringNav(true)}
              onMouseLeave={() => setIsHoveringNav(false)}
              onMouseMove={handleMouseMove}
            >
              
              <nav 
                ref={navRef}
                className="relative flex items-center gap-2 p-2 rounded-full border border-white/10 shadow-2xl overflow-hidden"
                style={{ 
                  backgroundColor: 'rgba(10, 15, 30, 0.8)', 
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                {/* Spotlight Effect */}
                <motion.div
                  className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 z-0"
                  style={{ 
                    background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(34, 211, 238, 0.15), transparent 40%)`,
                    opacity: isHoveringNav ? 1 : 0
                  }}
                />

                {/* --- LOGO START --- */}
                <motion.a 
                  href="#home" 
                  initial="initial"
                  whileHover="hovered"
                  onClick={(e) => handleNavClick(e, '#home')}
                  // PERBAIKAN: Ditambahkan '-mt-0.5' (atau ganti -mt-1 jika kurang tinggi)
                  className="pl-4 pr-2 flex items-center gap-1 group cursor-pointer overflow-hidden h-6 z-10 -mt-0.5"
                >
                  <div className="flex items-center font-bold font-syne text-lg tracking-tight">
                    {logoLetters.map((letter, i) => (
                      <motion.div
                        key={i}
                        className="relative flex flex-col"
                        variants={{
                          initial: { y: 0 },
                          hovered: { y: "-100%" },
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.33, 1, 0.68, 1],
                          delay: 0.025 * i,
                        }}
                      >
                        <span className="block text-white h-6">{letter}</span>
                        <span className="absolute top-full left-0 block text-cyan-400 h-6">{letter}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Titik Pojok Kanan Bawah */}
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-0.5 self-end mb-1" />
                </motion.a>
                {/* --- LOGO END --- */}

                <div className="relative z-10 hidden md:block w-[1px] h-4 bg-white/10 mx-2" />

                {/* Desktop Navigation Group */}
                <div className="relative z-10 hidden md:flex items-center gap-1">
                  
                  {/* Ghost Pill (Active Only) */}
                  {isInitialized && (
                    <motion.div
                      className="absolute top-0 bottom-0 rounded-full bg-cyan-500/15 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.15)] z-0"
                      animate={{
                        left: pillStyle.left,
                        width: pillStyle.width,
                        opacity: pillStyle.opacity
                      }}
                      initial={false} 
                      transition={pillTransition}
                    />
                  )}

                  {NAV_ITEMS.map((item, index) => {
                    const isActive = activeSection === item.href.substring(1);
                    
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        ref={(el) => { itemsRef.current[index] = el; }}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer select-none ${
                          isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <span className="relative z-10">{item.label}</span>
                      </a>
                    )
                  })}
                </div>

                {/* Action Button */}
                <div className="relative z-10 hidden md:block pl-2">
                   <motion.a 
                     href="#contact" 
                     onClick={(e) => handleNavClick(e, '#contact')}
                     className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold relative overflow-hidden group"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     transition={pillTransition}
                   >
                     <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                     <span>Let's Talk</span>
                     <Send size={14} className="-mt-0.5 group-hover:translate-x-1 transition-transform" />
                   </motion.a>
                </div>

                {/* Mobile Toggle */}
                <motion.button 
                  className="relative z-10 md:hidden p-3 text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors ml-auto"
                  onClick={() => setIsOpen(!isOpen)}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                        <X size={20} />
                      </motion.div>
                    ) : (
                      <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                        <Menu size={20} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

              </nav>
            </motion.div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-4 top-24 z-40 p-4 bg-[#0a0f1e]/95 backdrop-blur-3xl border border-white/10 rounded-3xl md:hidden shadow-2xl"
          >
              <nav className="flex flex-col gap-2">
               {NAV_ITEMS.map((item, i) => {
                 const isActive = activeSection === item.href.substring(1);
                 return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`relative p-4 text-center text-lg font-medium rounded-xl transition-all ${isActive ? "text-white" : "text-gray-400"}`}
                  >
                    {isActive && (
                       <motion.div 
                         layoutId="mobile-active"
                         className="absolute inset-0 bg-white/10 rounded-xl"
                         transition={pillTransition}
                       />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </motion.a>
                 )
                })}
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.05 }}
                  className="relative p-4 text-center text-lg font-medium rounded-xl transition-all bg-cyan-500/10 text-cyan-200 mt-2"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Let's Talk
                    <Send size={16} className="ml-2" />
                  </span>
                </motion.a>
              </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;