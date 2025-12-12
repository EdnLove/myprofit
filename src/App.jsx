import React, { useState } from 'react';
import { resumeData } from './data/resumeData';
import IdentityScene from './components/IdentityScene';
import { BentoGrid } from './components/BentoGrid';
import BentoCard from './components/BentoCard';
import VerificationModal from './components/VerificationModal';
import ScrollProgress from './components/ScrollProgress';
import TypewriterText from './components/TypewriterText';
import { Mail, Phone, Globe, Lock, ArrowRight, Star, Cpu, Award } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [lang, setLang] = useState('cn');
  const [isLocked, setIsLocked] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const t = resumeData[lang];

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] selection:bg-[#2997ff] selection:text-white pb-20">
      <ScrollProgress />

      {/* Navbar (Glass Strip) */}
      <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex justify-between items-center">
          <span className="font-semibold tracking-tight text-sm text-gray-400">
             Yan Yuqi <span className="text-[#2997ff]">.Pro</span>
          </span>
          <div className="flex items-center gap-6 text-xs font-medium">
            <button
              onClick={() => setLang('cn')}
              className={`transition-colors ${lang === 'cn' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
            >
              中文
            </button>
            <button
              onClick={() => setLang('en')}
              className={`transition-colors ${lang === 'en' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
            >
              English
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="pt-24 space-y-6">

        {/* HERO GRID */}
        <BentoGrid>
          {/* 1. Identity Card (Large, 2x2) */}
          <BentoCard colSpan={2} rowSpan={2} className="min-h-[500px] flex flex-col justify-between p-0">
             <div className="absolute inset-0 z-0">
               <IdentityScene
                  isLocked={isLocked}
                  text={isLocked ? "LOCKED" : "YAN YUQI"}
               />
             </div>

             {/* Text Overlay */}
             <div className="relative z-10 mt-auto p-8 bg-gradient-to-t from-black via-black/50 to-transparent">
                <div className="text-[#2997ff] font-medium tracking-wide text-sm mb-2">
                   <TypewriterText text={t.hero.role} delay={0.5} />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                  {isLocked ? t.hero.lockedTitle : t.hero.unlockedTitle}
                </h1>

                {isLocked && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-[#2997ff] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0077ED] transition-colors"
                  >
                    <Lock size={14} /> {t.hero.unlockBtn}
                  </button>
                )}
             </div>
          </BentoCard>

          {/* 2. Intro Card (1x1) */}
          <BentoCard colSpan={1} rowSpan={1} className="p-8 bg-[#1d1d1f]">
             <Globe className="text-[#2997ff] mb-4" size={28} />
             <h3 className="text-xl font-bold mb-2">{t.sections.intro}</h3>
             <p className="text-gray-400 text-sm leading-relaxed line-clamp-6">
               {t.introText}
             </p>
          </BentoCard>

          {/* 3. Stats Card (1x1) */}
          <BentoCard colSpan={1} rowSpan={1} className="p-8 flex flex-col justify-center items-center text-center bg-[#1d1d1f]">
             <div className="text-5xl font-bold text-white mb-2">90.06</div>
             <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Average GPA</div>
             <div className="mt-4 px-3 py-1 bg-[#2997ff]/10 text-[#2997ff] rounded-full text-xs font-bold">
               Rank 3 / 94
             </div>
          </BentoCard>

          {/* 4. Contact/Privacy Card (Horizontal) */}
          <BentoCard colSpan={2} rowSpan={1} className="p-8 flex flex-col justify-center bg-[#161617]">
             <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Contact Information</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`flex items-center gap-4 ${isLocked ? 'opacity-50 blur-[4px]' : 'opacity-100'}`}>
                   <div className="w-10 h-10 rounded-full bg-[#2997ff]/10 flex items-center justify-center text-[#2997ff]">
                     <Phone size={18} />
                   </div>
                   <div>
                     <div className="text-xs text-gray-500">Mobile</div>
                     <div className="text-lg font-medium font-mono">{isLocked ? '189-****-****' : t.hero.phone}</div>
                   </div>
                </div>
                <div className={`flex items-center gap-4 ${isLocked ? 'opacity-50 blur-[4px]' : 'opacity-100'}`}>
                   <div className="w-10 h-10 rounded-full bg-[#2997ff]/10 flex items-center justify-center text-[#2997ff]">
                     <Mail size={18} />
                   </div>
                   <div>
                     <div className="text-xs text-gray-500">Email</div>
                     <div className="text-lg font-medium font-mono">{isLocked ? '****@qq.com' : t.hero.email}</div>
                   </div>
                </div>
             </div>
          </BentoCard>
        </BentoGrid>

        {/* RESEARCH GRID */}
        <div className="max-w-7xl mx-auto px-6 mt-12 mb-4">
           <h2 className="text-3xl font-bold tracking-tight">{t.sections.research}</h2>
        </div>

        <BentoGrid>
           {t.research.map((item, i) => (
             <BentoCard key={i} colSpan={i === 2 ? 2 : 1} rowSpan={1} className="p-8">
                <div className="text-xs font-mono text-gray-500 mb-4">{item.period}</div>
                <h3 className="text-xl font-bold mb-3 leading-snug">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
             </BentoCard>
           ))}
        </BentoGrid>

        {/* AWARDS & SKILLS GRID */}
        <div className="max-w-7xl mx-auto px-6 mt-12 mb-4">
           <h2 className="text-3xl font-bold tracking-tight">{t.sections.competitions}</h2>
        </div>

        <BentoGrid>
            {/* Awards List */}
            <BentoCard colSpan={2} rowSpan={2} className="p-8">
               <div className="space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-[#2997ff] font-bold mb-4">
                       <Award size={18} /> National
                    </h4>
                    <ul className="space-y-3">
                       {t.competitions.national.map((c, i) => (
                          <li key={i} className="text-sm text-gray-300 border-b border-white/5 pb-2">{c}</li>
                       ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 text-purple-400 font-bold mb-4">
                       <Star size={18} /> Provincial Highlight
                    </h4>
                     <ul className="space-y-3">
                       {t.competitions.provincial.slice(0, 3).map((c, i) => (
                          <li key={i} className="text-sm text-gray-300 border-b border-white/5 pb-2">{c}</li>
                       ))}
                    </ul>
                  </div>
               </div>
            </BentoCard>

            {/* Tech Stack / Work */}
            <BentoCard colSpan={1} rowSpan={2} className="p-8 bg-[#161617]">
               <h3 className="text-lg font-bold mb-6">{t.sections.work}</h3>
               <div className="space-y-8 relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#333]"></div>

                  {t.work.map((w, i) => (
                    <div key={i} className="relative pl-8">
                       <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#1d1d1f] border-2 border-[#2997ff]"></div>
                       <h4 className="text-sm font-bold text-white mb-1">{w.title}</h4>
                       <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
                    </div>
                  ))}
               </div>
            </BentoCard>

            {/* Volunteer */}
            <BentoCard colSpan={1} rowSpan={1} className="p-8 flex flex-col justify-between">
               <div>
                  <h3 className="text-lg font-bold mb-2">{t.sections.volunteer}</h3>
                  <div className="text-4xl font-bold text-[#2997ff]">150h+</div>
                  <div className="text-xs text-gray-500">Total Service Hours</div>
               </div>
               <div className="mt-4 text-xs text-gray-400">
                  {t.volunteers[0]}
               </div>
            </BentoCard>

            <BentoCard colSpan={1} rowSpan={1} className="p-8 flex items-center justify-center bg-[#2997ff] group cursor-pointer">
               <div className="text-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-white font-bold text-lg mb-1">Download PDF</div>
                  <div className="text-white/70 text-xs">Full Resume</div>
               </div>
            </BentoCard>

        </BentoGrid>

        <footer className="text-center text-gray-600 text-xs py-12">
            <p>Designed by Yan Yuqi. Inspired by Apple.</p>
        </footer>
      </main>

      {/* Modal */}
      <VerificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUnlock={() => setIsLocked(false)}
        lang={lang}
      />
    </div>
  );
}

export default App;
