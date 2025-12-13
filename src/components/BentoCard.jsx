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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} // Apple ease
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-[30px]
        bg-[var(--color-surface)]
        group hover:bg-[var(--color-surface-hover)] transition-colors duration-500
        flex flex-col
        ${spanClass}
        ${className}
        ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}
      `}
    >
      {children}
    </motion.div>
  );
};

export default BentoCard;
