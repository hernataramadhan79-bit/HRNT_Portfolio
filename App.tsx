import React, { Suspense, useState } from 'react';
import { motion, useIsomorphicLayoutEffect, useScroll } from 'framer-motion';
import FluidBackground from './components/FluidBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GlobalAnimatedBackground from './components/GlobalAnimatedBackground';
import Cursor from './components/ui/Cursor';
import SectionInView from './components/SectionInView';
import { NAV_ITEMS } from './constants';
import { useParticles } from './hooks/useParticles';
import ParticleBackground from './components/ui/ParticleBackground';
import ImageModal from './components/ui/ImageModal';
import { LibraryItem, Certificate } from './types';

// Lazy load components that are not immediately visible
const About = React.lazy(() => import('./components/About'));
const Library = React.lazy(() => import('./components/Library'));
const Skills = React.lazy(() => import('./components/Skills'));
const Contact = React.lazy(() => import('./components/Contact'));

const App: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  
  const { scrollY } = useScroll();
  const { particles, onMouseMove } = useParticles(200, scrollY);

  useIsomorphicLayoutEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsNavbarVisible(true);
  };

  const handleCardClick = (item: LibraryItem) => {
    if (item.type === 'certificate' && (item as Certificate).certificateImage) {
      setSelectedImage((item as Certificate).certificateImage!);
      setIsNavbarVisible(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={`relative min-h-screen bg-[#020617] text-white select-none`}
      onMouseMove={onMouseMove}
    >
      {isDesktop && <Cursor />}
      <FluidBackground />
      <GlobalAnimatedBackground />
      <ParticleBackground particles={particles} />

      <div className="relative z-10 flex flex-col">
        <Navbar activeSection={activeSection} isVisible={isNavbarVisible} />
        <SectionInView id="home" setActiveSection={setActiveSection}>
          <Hero />
        </SectionInView>
        <Suspense fallback={<div className="h-screen"></div>}>
          <SectionInView id={NAV_ITEMS[0].href.substring(1)} setActiveSection={setActiveSection}>
            <About />
          </SectionInView>
          <SectionInView id={NAV_ITEMS[1].href.substring(1)} setActiveSection={setActiveSection}>
            <Skills />
          </SectionInView>
          <SectionInView id={NAV_ITEMS[2].href.substring(1)} setActiveSection={setActiveSection}>
            <Library onCardClick={handleCardClick} />
          </SectionInView>
          <SectionInView id="contact" setActiveSection={setActiveSection}>
            <Contact />
          </SectionInView>
        </Suspense>
      </div>
      <ImageModal imageUrl={selectedImage} onClose={handleCloseModal} />
    </motion.main>
  );
};

export default App;