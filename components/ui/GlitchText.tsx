import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to generate random characters
const getRandomChars = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

interface GlitchTextProps {
  mottos: string[];
  interval?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({ mottos, interval = 4000 }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(mottos[0]);
  const [isGlitching, setIsGlitching] = useState(false);

  const scrambleText = useCallback((text: string) => {
    let count = 0;
    setIsGlitching(true);
    const intervalId = setInterval(() => {
      if (count > 10) { // Number of glitch steps
        clearInterval(intervalId);
        setDisplayText(text);
        setIsGlitching(false);
      } else {
        setDisplayText(getRandomChars(text.length));
        count++;
      }
    }, 50); // Speed of the glitch effect
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (index + 1) % mottos.length;
      scrambleText(mottos[nextIndex]);
      setIndex(nextIndex);
    }, interval);

    return () => clearTimeout(timer);
  }, [index, mottos, interval, scrambleText]);

  // Find the longest motto to set a fixed width, preventing layout shifts
  const longestMotto = useMemo(() => mottos.reduce((a, b) => (a.length > b.length ? a : b)), [mottos]);

  return (
    <h2 className="text-xl md:text-3xl font-light tracking-[0.3em] text-gray-400 inline-block px-4 py-2 rounded-lg bg-black/10 backdrop-blur-sm border border-white/5 relative overflow-hidden text-center">
      {/* Invisible placeholder to reserve space for the longest motto */}
      <span className="font-serif italic font-semibold invisible" aria-hidden="true">{longestMotto}</span>
      
      <AnimatePresence>
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 w-full"
        >
          {/* During glitch, use a monospaced font to keep width consistent */}
          <span className={isGlitching ? 'font-mono' : ''}>
            {isGlitching ? displayText : mottos[index]}
          </span>
        </motion.span>
      </AnimatePresence>
    </h2>
  );
};

export default GlitchText;