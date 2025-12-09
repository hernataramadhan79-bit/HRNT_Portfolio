import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS, SKILLS_DETAILED } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-32 border-y border-white/5 overflow-hidden relative group">
      <div className="mb-12 text-center container mx-auto px-4">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
         >
            <h2 className="text-4xl md:text-5xl font-bold font-syne mb-4">THE ARSENAL</h2>
            <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase">Tools & Technologies</p>
         </motion.div>
      </div>
      
      {/* Marquee Row 1 (Left) */}
      <div className="relative flex w-full overflow-hidden py-4 border-b border-white/5 bg-[#020617]/50 hover:bg-[#03081e]/80 transition-colors duration-500 backdrop-blur-sm">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-16 md:hover:[animation-play-state:paused]"
        >
          {[...SKILLS, ...SKILLS].map((skill, i) => (
            <div key={`${skill}-${i}`} className="flex items-center gap-4 group/item cursor-default">
              <span className="text-5xl md:text-7xl font-bold font-syne text-transparent text-outline md:hover:text-white transition-all duration-300 opacity-50 md:hover:opacity-100 md:hover:scale-110 transform">
                {skill}
              </span>
              <div className="w-2 h-2 bg-cyan-400 rounded-full opacity-50 shadow-[0_0_10px_rgba(34,211,238,0.8)] group-hover/item:scale-150 transition-transform" />
            </div>
          ))}
        </motion.div>
      </div>

       {/* Marquee Row 2 (Right) */}
       <div className="relative flex w-full overflow-hidden py-4 border-b border-white/5 bg-[#020617]/50 mb-16 md:hover:bg-[#03081e]/80 transition-colors duration-500 backdrop-blur-sm">
        <motion.div
          initial={{ x: "-50%" }}
          animate={{ x: 0 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-16 md:hover:[animation-play-state:paused]"
        >
          {[...SKILLS.reverse(), ...SKILLS].map((skill, i) => (
             <div key={`${skill}-r-${i}`} className="flex items-center gap-4 group/item cursor-default">
               <span className="text-5xl md:text-7xl font-bold font-syne text-gray-800 md:hover:text-cyan-400 transition-all duration-300 md:hover:scale-110 transform">
                 {skill}
               </span>
               <div className="w-2 h-2 border border-gray-700 rounded-full group-hover/item:bg-purple-500 group-hover/item:border-purple-500 transition-colors" />
             </div>
          ))}
        </motion.div>
      </div>

      {/* Proficiency Graph */}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {SKILLS_DETAILED.map((skill, index) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group md:cursor-pointer"
              >
                <div className="flex justify-between items-end mb-2 md:group-hover:translate-x-2 transition-transform duration-300">
                  <span className="font-syne font-medium text-lg text-gray-200 md:group-hover:text-cyan-300 transition-colors">{skill.name}</span>
                  <span className="font-mono text-xs text-cyan-400 md:group-hover:text-white transition-colors">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-transparent md:group-hover:border-white/10 transition-colors">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full md:group-hover:from-cyan-400 md:group-hover:to-purple-500 transition-all duration-500 shadow-[0_0_15px_rgba(34,211,238,0.3)] md:group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] relative"
                  >
                     <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

    </section>
  );
};

export default Skills;