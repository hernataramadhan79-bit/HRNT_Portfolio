import React from 'react';
import { motion } from 'framer-motion';

interface GaugeProps {
  name: string;
  level: number;
  index: number;
}

const Gauge: React.FC<GaugeProps> = ({ name, level, index }) => {
  const rotation = -90 + (level / 100) * 180;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center group"
    >
      <div className="relative w-32 h-20 mb-4">
        <svg className="w-full h-full" viewBox="0 0 128 64">
          <path
            d="M 4 60 A 60 60 0 0 1 124 60"
            strokeWidth="8"
            className="stroke-white/10"
            fill="none"
          />
          <motion.path
            d="M 4 60 A 60 60 0 0 1 124 60"
            strokeWidth="8"
            className="stroke-cyan-400 group-hover:stroke-purple-500 transition-colors duration-500"
            fill="none"
            strokeLinecap="round"
            style={{ pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - level/100 }}
            initial={{ strokeDashoffset: 1 }}
            whileInView={{ strokeDashoffset: 1 - level/100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 + index * 0.1 }}
          />
        </svg>
        <motion.div
          className="absolute bottom-0 left-1/2"
          style={{ transformOrigin: 'bottom center' }}
          initial={{ rotate: -90 }}
          whileInView={{ rotate: rotation }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 + index * 0.1 }}
        >
            <div className="w-1 h-8 bg-cyan-400 group-hover:bg-purple-500 rounded-t-full transition-colors duration-500" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold font-syne text-cyan-400 group-hover:text-purple-500 transition-colors duration-500">{level}</span>
          <span className="text-sm font-mono text-cyan-400 group-hover:text-purple-500 transition-colors duration-500">%</span>
        </div>
      </div>
      <h3 className="font-syne font-medium text-lg text-gray-200 group-hover:text-white transition-colors duration-300">{name}</h3>
    </motion.div>
  );
};

export default Gauge;
