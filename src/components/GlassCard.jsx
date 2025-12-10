import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 40px -10px rgba(0, 243, 255, 0.15)",
        borderColor: "rgba(255, 255, 255, 0.3)"
      }}
      className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl transition-colors duration-300 overflow-hidden ${className}`}
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:animate-shine bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
