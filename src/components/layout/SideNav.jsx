import React from 'react';
import { motion } from 'framer-motion';

const SideNav = ({ activeSection, scrollToSection }) => {
  const sections = ['hero', 'about', 'timeline', 'projects', 'contact'];

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className="group relative flex items-center justify-end"
          aria-label={`Scroll to ${section}`}
        >
          {/* Label (Only visible on hover or active) */}
          <span className={`absolute right-8 text-xs font-mono tracking-wider transition-all duration-300 ${
            activeSection === section
              ? 'text-neon-green opacity-100 translate-x-0'
              : 'text-gray-500 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
          }`}>
            {section.toUpperCase()}
          </span>

          {/* Dot */}
          <div className={`w-3 h-3 rounded-full transition-all duration-300 border border-transparent ${
            activeSection === section
              ? 'bg-neon-green shadow-[0_0_10px_#39ff14] scale-125'
              : 'bg-gray-800 border-gray-600 group-hover:border-neon-green group-hover:bg-neon-green/50'
          }`} />

          {/* Connecting Line (Optional decorator) */}
          {activeSection === section && (
             <motion.div
                layoutId="nav-glow"
                className="absolute inset-0 rounded-full blur-sm bg-neon-green"
                transition={{ duration: 0.3 }}
             />
          )}
        </button>
      ))}
    </div>
  );
};

export default SideNav;
