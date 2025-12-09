import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LIBRARY_ITEMS } from '../src/constants';
import LibraryCard from './ui/LibraryCard';
import { LibraryItem } from '../types';

type FilterType = 'all' | 'project' | 'certificate' | 'achievement';

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Projects', value: 'project' },
  { label: 'Certificates', value: 'certificate' },
  { label: 'Achievements', value: 'achievement' },
];

const Section = ({ title, items, onCardClick }: { title: string; items: LibraryItem[], onCardClick: (item: LibraryItem) => void }) => (
  <motion.div 
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-16"
  >
    <h3 className="text-2xl font-bold font-syne mb-8 border-b border-cyan-400/20 pb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <LibraryCard key={item.id} item={item} onCardClick={onCardClick} />
      ))}
    </div>
  </motion.div>
);

interface LibraryProps {
  onCardClick: (item: LibraryItem) => void;
}

const Library: React.FC<LibraryProps> = ({ onCardClick }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const projects = useMemo(() => LIBRARY_ITEMS.filter(item => item.type === 'project'), []);
  const certificates = useMemo(() => LIBRARY_ITEMS.filter(item => item.type === 'certificate'), []);
  const achievements = useMemo(() => LIBRARY_ITEMS.filter(item => item.type === 'achievement'), []);
  
  return (
    <section id="library" className="py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between md:items-end mb-16"
        >
          <div className="mb-8 md:mb-0">
            <h2 className="text-4xl md:text-6xl font-bold font-syne leading-none">
              MY<br />COLLECTION
            </h2>
            <p className="font-mono text-sm text-cyan-400 mt-2">
              A curated library of my projects, certifications, and achievements.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 w-full rounded-2xl bg-black/20 p-2 backdrop-blur-sm border border-white/10 md:w-auto md:flex md:flex-wrap md:items-center md:rounded-full">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`relative w-full md:w-auto rounded-full px-2 md:px-4 py-2 text-xs sm:text-sm font-mono transition-colors text-center ${
                  activeFilter === filter.value ? 'text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeFilter === filter.value && (
                  <motion.div
                    layoutId="filter-active"
                    className="absolute inset-0 bg-cyan-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeFilter === 'all' && (
            <motion.div key="all-sections">
              <Section title="Projects" items={projects} onCardClick={onCardClick} />
              <Section title="Certificates" items={certificates} onCardClick={onCardClick} />
              <Section title="Achievements" items={achievements} onCardClick={onCardClick} />
            </motion.div>
          )}
          {activeFilter === 'project' && (
            <motion.div key="projects" layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((item) => (
                <LibraryCard key={item.id} item={item} onCardClick={onCardClick} />
              ))}
            </motion.div>
          )}
          {activeFilter === 'certificate' && (
            <motion.div key="certificates" layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certificates.map((item) => (
                <LibraryCard key={item.id} item={item} onCardClick={onCardClick} />
              ))}
            </motion.div>
          )}
          {activeFilter === 'achievement' && (
            <motion.div key="achievements" layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((item) => (
                <LibraryCard key={item.id} item={item} onCardClick={onCardClick} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Library;
