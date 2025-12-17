import React from 'react';

function Navbar({ activeSection, scrollToSection, labels, lang, setLang }) {
  const sections = Object.keys(labels.sections).filter(k => k !== 'resume'); // 'resume' in labels might be 'RESUME' button

  return (
    <>
      <nav className="fixed top-8 right-12 z-50 hidden md:flex gap-8 text-xs font-bold tracking-widest mix-blend-difference pointer-events-auto items-center">
        {sections.map((key, index) => {
            const label = labels.sections[key];
            // Adjust index to match section logic (Hero is 0)
            const isActive = activeSection === index;

            // Special handling if 'resume' key is present in labels.sections but we iterate over specific order
            // Assuming strict order: Hero, About, Skills, Work, Projects, Contact

            return (
              <button
                key={key}
                onClick={() => scrollToSection(index)}
                className={`hover:text-[#ccff00] transition-colors uppercase ${isActive ? 'text-[#ccff00]' : 'text-gray-400'}`}
              >
                <span className="text-[#ccff00] mr-1">{index}.</span> {label}
              </button>
            );
        })}

        {/* Language Toggle */}
        <div className="flex items-center gap-2 border-l border-gray-600 pl-4 ml-4">
            <button
                onClick={() => setLang('en')}
                className={`transition-colors ${lang === 'en' ? 'text-[#ccff00]' : 'text-gray-500 hover:text-white'}`}
            >
                EN
            </button>
            <span className="text-gray-600">/</span>
            <button
                onClick={() => setLang('cn')}
                className={`transition-colors ${lang === 'cn' ? 'text-[#ccff00]' : 'text-gray-500 hover:text-white'}`}
            >
                CN
            </button>
        </div>
      </nav>

      <div className="fixed top-8 left-12 z-50 text-xs font-bold tracking-widest text-gray-500 mix-blend-difference hidden md:block pointer-events-none">
        SCROLL or DRAG
      </div>
    </>
  );
}

export default Navbar;
