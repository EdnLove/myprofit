import React from 'react';

function ScrollDots({ activeSection, scrollToSection, totalSections }) {
  return (
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 hidden md:flex pointer-events-auto">
        {Array.from({ length: totalSections }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 border border-gray-600 ${
              activeSection === idx ? 'bg-[#ccff00] border-[#ccff00] scale-125' : 'bg-transparent hover:bg-gray-700'
            }`}
          />
        ))}
      </div>
  );
}

export default ScrollDots;
