import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS, SKILLS_DETAILED } from '../src/constants';
import { Code, Brush, Server, Film, Bot } from 'lucide-react';

const icons: { [key: string]: React.FC<any> } = {
  "Frontend Development": Code,
  "UI/UX Design": Brush,
  "Backend Architecture": Server,
  "Motion & Animation": Film,
  "Web Developer": Bot,
};

const Skills: React.FC = () => {
  const reversedSkills = [...SKILLS].reverse();
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
          {[...reversedSkills, ...reversedSkills].map((skill, i) => (
             <div key={`${skill}-r-${i}`} className="flex items-center gap-4 group/item cursor-default">
               <span className="text-5xl md:text-7xl font-bold font-syne text-gray-800 md:hover:text-cyan-400 transition-all duration-300 md:hover:scale-110 transform">
                 {skill}
               </span>
               <div className="w-2 h-2 border border-gray-700 rounded-full group-hover/item:bg-purple-500 group-hover/item:border-purple-500 transition-colors" />
             </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-syne mb-4">My Expertise</h2>
          <p className="font-mono text-cyan-400 text-sm tracking-widest uppercase">A showcase of my abilities</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS_DETAILED.map((skill, index) => {
            const Icon = icons[skill.name];
            const cardVariants = {
              initial: { opacity: 0, y: 30 },
              inView: { opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.1, ease: 'easeOut' } },
              hover: { scale: 1.05, y: -10 }
            };
            return (
              <motion.div
                key={skill.name}
                variants={cardVariants}
                initial="initial"
                whileInView="inView"
                whileHover="hover"
                viewport={{ once: true }}
                className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/80 shadow-lg backdrop-blur-sm group"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    {Icon && <Icon className="w-8 h-8 text-cyan-400" />}
                    <span className="font-syne font-semibold text-xl text-slate-100">{skill.name}</span>
                  </div>
                  <span className="font-mono text-lg text-cyan-300">{skill.level}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full group-hover:from-purple-400 group-hover:to-cyan-300 transition-colors duration-300 relative"
                    style={{
                      boxShadow: '0 0 8px rgba(56, 189, 248, 0.5), 0 0 16px rgba(168, 85, 247, 0.5)',
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0 h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)`,
                        backgroundSize: '200% 100%',
                      }}
                      animate={{
                        backgroundPosition: ['-200%', '200%']
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;