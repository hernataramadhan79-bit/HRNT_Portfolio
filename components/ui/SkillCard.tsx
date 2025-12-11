import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  name: string;
  level: number;
  index: number;
  icon?: LucideIcon;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, level, index, icon: Icon }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors duration-300 relative"
    >
      {Icon && (
        <div
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-4 grid place-content-center rounded-xl bg-transparent"
        >
          <Icon className="w-12 h-12 text-cyan-400 group-hover:text-purple-500 transition-colors duration-500" />
        </div>
      )}
      
      <div className="relative w-32 h-32 mb-4" style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}>
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            strokeWidth="8"
            className="stroke-white/10"
            fill="none"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            strokeWidth="8"
            className="stroke-cyan-400 group-hover:stroke-purple-500 transition-colors duration-500"
            fill="none"
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            style={{ strokeDasharray: circumference }}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 + index * 0.1 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold font-syne text-cyan-400 group-hover:text-purple-500 transition-colors duration-500">{level}</span>
          <span className="text-sm font-mono text-cyan-400 group-hover:text-purple-500 transition-colors duration-500">%</span>
        </div>
      </div>
      <h3 
        style={{
            transform: "translateZ(50px)",
          }}
        className="font-syne font-medium text-lg text-gray-200 group-hover:text-white transition-colors duration-300">{name}</h3>
    </motion.div>
  );
};

export default SkillCard;


