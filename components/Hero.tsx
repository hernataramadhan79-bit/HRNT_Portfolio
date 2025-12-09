import React, { useRef, useState, useEffect } from 'react';
import { motion, Variants, useAnimation } from 'framer-motion';
import { Play, Pause, ArrowDown } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import GlitchText from './ui/GlitchText';
import { MOTTO_TEXT } from '../src/constants';
import GlobalAnimatedBackground from './GlobalAnimatedBackground';
const backgroundMusic = new URL('../src/background-music.mp3', import.meta.url).href;

const Hero: React.FC = () => {
  const letterControls = useAnimation();
  const mainControls = useAnimation();

  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  // --- Animation Choreography ---
  useEffect(() => {
    const sequence = async () => {
      await mainControls.start("visible");
      await letterControls.start("visible");
    };
    sequence();
  }, [mainControls, letterControls]);

  const titleLetters = "HRNT".split("");
  const letterVariant: Variants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'tween', ease: 'easeOut', duration: 0.8, delay: 1 + i * 0.1 },
    }),
  };

  // --- Music Controls ---
  const fadeOut = (onComplete?: () => void) => {
    if (fadeIntervalRef.current) window.clearInterval(fadeIntervalRef.current);
    fadeIntervalRef.current = window.setInterval(() => {
      if (audioRef.current && audioRef.current.volume > 0.05) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.05);
      } else if (audioRef.current) {
        audioRef.current.volume = 0;
        if (fadeIntervalRef.current) window.clearInterval(fadeIntervalRef.current);
        if (onComplete) onComplete();
      }
    }, 50);
  };

  const fadeIn = () => {
    if (fadeIntervalRef.current) window.clearInterval(fadeIntervalRef.current);
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    fadeIntervalRef.current = window.setInterval(() => {
      if (audioRef.current && audioRef.current.volume < 0.95) {
        audioRef.current.volume = Math.min(1, audioRef.current.volume + 0.05);
      } else if (audioRef.current) {
        audioRef.current.volume = 1;
        if (fadeIntervalRef.current) window.clearInterval(fadeIntervalRef.current);
      }
    }, 50);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      fadeOut(() => audioRef.current?.pause());
    } else {
      fadeIn();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => { fadeIn(); setIsPlaying(true); }).catch(() => { setIsPlaying(false); });
    }
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // --- Scroll Handler ---
  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector('#about');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      // Offset 0 memastikan pendaratan tepat di awal seksi,
      // karena setiap seksi sudah memiliki padding atas (py-32).
      const offset = 0; 
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  return (
    <motion.section 
      id="home" 
      className="h-screen w-full relative flex flex-col overflow-hidden text-white"
    >
      <GlobalAnimatedBackground />
      
      <audio ref={audioRef} src={backgroundMusic} loop preload="auto" />
      
      {/* Main Content Grid */}
      <motion.div 
        className="relative z-20 flex-grow w-full grid grid-cols-12 grid-rows-6 p-4 md:p-8"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } } }}
        initial="hidden"
        animate={mainControls}
      >
        {/* ---- Center Content Block ---- */}
        <div className="col-start-1 col-span-12 row-start-2 row-span-4 flex h-full flex-col items-center justify-center gap-4 text-center">

          {/* WELCOME BADGE */}
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
            <span className="font-mono text-sm tracking-[0.2em] text-purple-300/80">WELCOME TO MY PORTFOLIO</span>
          </div>

          {/* MAIN TITLE */}
          <motion.h1
            className="flex items-center justify-center text-center text-[18vw] sm:text-[16vw] md:text-[12vw] leading-[0.8] font-bold font-syne tracking-tighter"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate={letterControls}
          >
            {titleLetters.map((letter, i) => (
              <motion.span key={i} custom={i} variants={letterVariant} className="inline-block origin-bottom p-1 cursor-default">
                {letter}
              </motion.span>
            ))}
            <motion.span 
              variants={letterVariant} custom={4}
              className="text-purple-400 transition-all duration-300"
            >
              .
            </motion.span>
          </motion.h1>

          {/* SUBTITLE */}
          <div className="h-12">
            <GlitchText mottos={MOTTO_TEXT} />
          </div>
        </div>
        
        {/* BOTTOM CONTROL PANEL */}
        <div className="col-span-full row-start-6 flex items-end justify-between self-end">
          <div className="font-mono text-xs text-gray-400 backdrop-blur-sm p-2 rounded">
            BASED IN INDONESIA<br />
            &copy; 2025
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#about"
              className="font-mono text-xs flex items-center gap-2 text-gray-300 hover:text-cyan-300 transition-colors"
              onClick={handleScrollToAbout}
            >
              SCROLL <ArrowDown size={14}/>
            </a>
            <MagneticButton>
              <button
                onClick={toggleMusic}
                className="flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-gray-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-950/30 transition-all duration-300 shadow-lg cursor-pointer group"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                <motion.div
                  key={isPlaying ? 'pause' : 'play'}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                </motion.div>
              </button>
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
