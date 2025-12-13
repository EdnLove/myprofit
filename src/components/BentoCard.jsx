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
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      // Updated to a stiff spring for that "Apple" snap feel
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 1
      }}
      whileHover={{
         scale: 1.02,
         transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-[30px]
        bg-[var(--color-surface)]
        border border-[var(--color-text-primary)]/5
        shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5
        flex flex-col
        ${spanClass}
        ${className}
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      {children}
    </motion.div>
  );
};

export default BentoCard;
