import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import HeroSection from '../sections/HeroSection';
import TimelineSection from '../sections/TimelineSection';
import ProjectsSection from '../sections/ProjectsSection';

const SinglePageLayout = ({ lang, data, onUnlockRequest, isUnlocked, decryptedData }) => {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <>
      <SideNav activeSection={activeSection} scrollToSection={scrollToSection} />

      <main className="relative z-10 w-full">
        <HeroSection
            data={data.hero}
            onUnlockRequest={onUnlockRequest}
            isUnlocked={isUnlocked}
            decryptedData={decryptedData}
        />

        {/* About / Intro Section */}
        <section id="about" className="min-h-[60vh] flex items-center justify-center pointer-events-auto py-20">
             <div className="max-w-3xl text-center px-4">
                 <h2 className="text-neon-green text-sm tracking-widest mb-6 font-bold uppercase">
                    // {data.sections.intro}
                 </h2>
                 <p className="text-lg md:text-xl text-gray-300 leading-loose font-light">
                    {data.introText}
                 </p>

                 {/* Basic Info Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left border-t border-gray-800 pt-8">
                    <div>
                        <h3 className="text-neon-yellow text-xs mb-2 uppercase tracking-widest">Major</h3>
                        <p className="text-white font-mono text-sm">{data.basicInfo.major}</p>
                    </div>
                    <div>
                        <h3 className="text-neon-yellow text-xs mb-2 uppercase tracking-widest">GPA</h3>
                        <p className="text-white font-mono text-sm">{data.basicInfo.gpa}</p>
                    </div>
                 </div>
             </div>
        </section>

        <TimelineSection data={data.work} title={data.sections.work} />
        <ProjectsSection
            projects={data.research}
            awards={data.competitions}
            titles={{ projects: "PROJECTS", awards: data.sections.competitions }}
        />

        {/* Contact/Footer Placeholder */}
        <section id="contact" className="min-h-[50vh] flex flex-col items-center justify-center pointer-events-auto pb-20">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-8">
                    {isUnlocked ? "TRANSMISSION OPEN" : "SECURE CHANNEL"}
                </h2>

                {isUnlocked ? (
                    <div className="flex flex-col gap-4 font-mono text-neon-green border border-neon-green p-8 bg-black/80">
                         <p>EMAIL: {decryptedData.email}</p>
                         <p>PHONE: {decryptedData.phone}</p>
                    </div>
                ) : (
                    <button
                        onClick={onUnlockRequest}
                        className="px-8 py-4 bg-transparent border border-neon-green text-neon-green font-mono hover:bg-neon-green hover:text-black transition-all duration-300"
                    >
                        {data.hero.unlockBtn}
                    </button>
                )}
            </div>

            <footer className="mt-20 text-gray-600 text-xs font-mono">
                © {new Date().getFullYear()} YAN YUQI. SYSTEM_STATUS: ONLINE.
            </footer>
        </section>
      </main>
    </>
  );
};

export default SinglePageLayout;
