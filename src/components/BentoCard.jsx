import React from 'react';
import { motion } from 'framer-motion';

const BentoCard = ({
  children,
  className = '',
  colSpan = 1,
  rowSpan = 1,
  dark = false
}) => {
  // Static mapping for Tailwind classes
  const colSpanClasses = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
  };

  const rowSpanClasses = {
    1: 'md:row-span-1',
    2: 'md:row-span-2',
    3: 'md:row-span-3',
  };

  const spanClass = `${colSpanClasses[colSpan] || 'md:col-span-1'} ${rowSpanClasses[rowSpan] || 'md:row-span-1'}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} // Apple ease
      className={`
        relative overflow-hidden rounded-[30px]
        ${dark ? 'bg-black' : 'bg-[#1d1d1f]'}
        group hover:bg-[#2d2d2f] transition-colors duration-500
        flex flex-col
        ${spanClass}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default BentoCard;
