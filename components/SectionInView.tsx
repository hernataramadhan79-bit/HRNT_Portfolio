import React, { ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface SectionInViewProps {
  children: ReactNode;
  id: string;
  setActiveSection: (id: string) => void;
  className?: string;
}

const SectionInView: React.FC<SectionInViewProps> = ({ children, id, setActiveSection, className = '' }) => {
  const { ref, inView } = useInView({
    // Menggunakan rootMargin untuk memastikan hanya section di tengah layar yang aktif.
    // Ini mencegah beberapa section aktif secara bersamaan.
    // Format: 'top right bottom left'
    rootMargin: '-50% 0px -50% 0px',
  });

  // Efek untuk memperbarui section yang aktif di Navbar
  useEffect(() => {
    if (inView) {
      setActiveSection(id);
    }
  }, [inView, id, setActiveSection]);

  return (
    <section
      id={id}
      ref={ref}
      className={className}
    >
      {children}
    </section>
  );
};

export default SectionInView;