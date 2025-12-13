import React from 'react';
import { motion } from 'framer-motion';

const BentoCard = ({
  children,
  className = '',
  colSpan = 1,
  rowSpan = 1,
  dark = false,
  onClick
}) => {
  // Static mapping for Tailwind classes
  const colSpanClasses = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
  };

  const rowSpanClasses = {
    1: 'md:row-span-1',
    2: 'md:row-span-2',
    3: 'md:row-span-3',
    4: 'md:row-span-4',
  };

  const spanClass = `${colSpanClasses[colSpan] || 'md:col-span-1'} ${rowSpanClasses[rowSpan] || 'md:row-span-1'}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-[var(--color-surface)]
        border border-[var(--color-surface-hover)]
        hover:border-[var(--color-text-secondary)]
        flex flex-col
        ${spanClass}
        ${className}
        ${onClick ? 'cursor-pointer hover:bg-[#1f2428]' : ''}
        transition-colors duration-200
      `}
    >
      {/* Optional "Header Bar" decoration for cards */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-20"></div>

      {children}
    </motion.div>
  );
};

export default BentoCard;
