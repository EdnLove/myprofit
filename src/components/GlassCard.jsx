import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:bg-white/10 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
