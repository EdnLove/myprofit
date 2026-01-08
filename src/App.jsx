import React, { useState, useEffect, useRef, useCallback } from 'react';
import { resumeData } from './data/resumeData';

// Components
import HeroSection from './components/Neon/HeroSection';
import AboutSection from './components/Neon/AboutSection';
import SkillsSection from './components/Neon/SkillsSection';
import WorkSection from './components/Neon/WorkSection';
import ProjectsSection from './components/Neon/ProjectsSection';
import ContactSection from './components/Neon/ContactSection';
import Navbar from './components/Neon/Navbar';
import ScrollDots from './components/Neon/ScrollDots';
import IntroScreen from './components/Neon/IntroScreen';

/**
 * 缓动函数
 */
const easeInOutCubic = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
};

function App() {
  const [lang, setLang] = useState('en');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Intro Screen State
  const [showIntro, setShowIntro] = useState(true);

  const scrollContainerRef = useRef(null);
  const touchStartY = useRef(0);

  const SECTIONS = ['hero', 'about', 'skills', 'work', 'projects', 'contact'];
  const currentData = resumeData[lang];

  useEffect(() => {
    // Check session storage for previous visit
    const hasVisited = sessionStorage.getItem('hasVisitedPortfolio');
    if (hasVisited) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    sessionStorage.setItem('hasVisitedPortfolio', 'true');
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = useCallback((targetIndex, duration = 1000) => {
    const container = scrollContainerRef.current;
    if (!container || targetIndex < 0 || targetIndex >= SECTIONS.length) return;

    const targetSection = document.getElementById(SECTIONS[targetIndex]);
    if (!targetSection) return;

    const startPosition = container.scrollTop;
    const targetPosition = targetSection.offsetTop;
    const distance = targetPosition - startPosition;
    let startTime = null;

    setIsScrolling(true);
    setActiveSection(targetIndex);

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      container.scrollTop = run;

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        container.scrollTop = targetPosition;
        setIsScrolling(false);
      }
    };

    requestAnimationFrame(animation);
  }, [SECTIONS]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling) return;
      const direction = e.deltaY > 0 ? 1 : -1;
      scrollToSection(activeSection + direction);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [activeSection, isScrolling, scrollToSection]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isScrolling) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      if (Math.abs(diff) > 50) {
        const direction = diff > 0 ? 1 : -1;
        scrollToSection(activeSection + direction);
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, isScrolling, scrollToSection]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isScrolling) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(activeSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(activeSection - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isScrolling, scrollToSection]);

  return (
    <div className="h-screen w-full bg-[#050505] text-gray-300 font-mono relative overflow-hidden selection:bg-[#ccff00] selection:text-black">

      {/* Intro Screen */}
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}

      <div className={`h-full transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(204, 255, 0, 0.06), transparent 80%)`
          }}
        />

        <Navbar
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          labels={currentData}
          lang={lang}
          setLang={setLang}
        />

        <ScrollDots
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          totalSections={SECTIONS.length}
        />

        <main ref={scrollContainerRef} className="h-full w-full overflow-hidden relative z-10">
          <HeroSection
              scrollToContact={() => scrollToSection(5)}
              scrollToAbout={() => scrollToSection(1)}
              data={currentData.hero}
          />
          <AboutSection
              data={currentData}
              labels={currentData.sections}
          />
          <SkillsSection
              data={currentData}
              labels={currentData.sections}
          />
          <WorkSection
              data={currentData}
              labels={currentData.sections}
          />
          <ProjectsSection
              data={currentData}
              labels={currentData.sections}
          />
          <ContactSection
              data={currentData}
              labels={currentData.sections}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
