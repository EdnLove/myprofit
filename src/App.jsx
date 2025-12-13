import React, { useState } from 'react';
import { resumeData } from './data/resumeData';
import IdentityScene from './components/IdentityScene';
import { BentoGrid } from './components/BentoGrid';
import BentoCard from './components/BentoCard';
import VerificationModal from './components/VerificationModal';
import ScrollProgress from './components/ScrollProgress';
import TypewriterText from './components/TypewriterText';
import { Mail, Phone, Globe, Lock, ArrowRight, Star, Cpu, Award, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CryptoJS from 'crypto-js';

function App() {
  const [lang, setLang] = useState('cn');
  const [isLocked, setIsLocked] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Expanded card state
  const [expandedCard, setExpandedCard] = useState(null);

  // Decrypted contact info
  const [decryptedPhone, setDecryptedPhone] = useState('');
  const [decryptedEmail, setDecryptedEmail] = useState('');

  const t = resumeData[lang];

  const handleUnlock = () => {
    setIsLocked(false);
    // Decrypt data using the known password "123456"
    // In a real app, the password would come from the modal input,
    // but here we know the correct password is strictly '123456'.
    try {
        const bytesPhone = CryptoJS.AES.decrypt(resumeData.cn.hero.phone, '123456');
        const bytesEmail = CryptoJS.AES.decrypt(resumeData.cn.hero.email, '123456');
        setDecryptedPhone(bytesPhone.toString(CryptoJS.enc.Utf8));
        setDecryptedEmail(bytesEmail.toString(CryptoJS.enc.Utf8));
    } catch (e) {
        console.error("Decryption failed", e);
    }
  };

  // Helper to open details
  const openDetail = (content) => {
    setExpandedCard(content);
  };

  return (
    <div className="min-h-screen pb-20 transition-colors duration-300">
      <ScrollProgress />

      {/* Navbar (Glass Strip) */}
      <nav className="fixed top-0 w-full z-50 bg-[var(--color-bg)]/70 backdrop-blur-xl border-b border-[var(--color-text-primary)]/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex justify-between items-center">
          <span className="font-semibold tracking-tight text-sm text-[var(--color-text-secondary)]">
             Yan Yuqi <span className="text-[#2997ff]">.Pro</span>
          </span>
          <div className="flex items-center gap-6 text-xs font-medium">
            <button
              onClick={() => setLang('cn')}
              className={`transition-colors ${lang === 'cn' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
            >
              中文
            </button>
            <button
              onClick={() => setLang('en')}
              className={`transition-colors ${lang === 'en' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
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
             <div className="relative z-10 mt-auto p-8 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/50 to-transparent">
                <div className="text-[#2997ff] font-medium tracking-wide text-sm mb-2 h-6">
                   <TypewriterText text={t.hero.role} delay={0.5} />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
                  {isLocked ? t.hero.lockedTitle : t.hero.unlockedTitle}
                </h1>

                {isLocked && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
                    className="flex items-center gap-2 bg-[#2997ff] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0077ED] transition-colors shadow-lg shadow-blue-500/20"
                  >
                    <Lock size={14} /> {t.hero.unlockBtn}
                  </button>
                )}
             </div>
          </BentoCard>

          {/* 2. Intro Card (1x1) */}
          <BentoCard
            colSpan={1} rowSpan={1} className="p-8"
            onClick={() => openDetail({ title: t.sections.intro, content: t.introText })}
          >
             <Globe className="text-[#2997ff] mb-4" size={28} />
             <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">{t.sections.intro}</h3>
             <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-6">
               {t.introText}
             </p>
          </BentoCard>

          {/* 3. Stats Card (1x1) */}
          <BentoCard colSpan={1} rowSpan={1} className="p-8 flex flex-col justify-center items-center text-center">
             <div className="text-5xl font-bold text-[var(--color-text-primary)] mb-2">90.06</div>
             <div className="text-[var(--color-text-secondary)] text-sm font-medium uppercase tracking-wider">Average GPA</div>
             <div className="mt-4 px-3 py-1 bg-[#2997ff]/10 text-[#2997ff] rounded-full text-xs font-bold">
               Rank 1 / 94
             </div>
          </BentoCard>

          {/* 4. Contact/Privacy Card (Horizontal) */}
          <BentoCard colSpan={2} rowSpan={1} className="p-8 flex flex-col justify-center">
             <h3 className="text-[var(--color-text-secondary)] text-xs font-bold uppercase tracking-widest mb-6">Contact Information</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`flex items-center gap-4 ${isLocked ? 'opacity-50 blur-[4px]' : 'opacity-100'}`}>
                   <div className="w-10 h-10 rounded-full bg-[#2997ff]/10 flex items-center justify-center text-[#2997ff]">
                     <Phone size={18} />
                   </div>
                   <div>
                     <div className="text-xs text-[var(--color-text-secondary)]">Mobile</div>
                     <div className="text-lg font-medium font-mono text-[var(--color-text-primary)]">
                        {isLocked ? '189-****-****' : decryptedPhone}
                     </div>
                   </div>
                </div>
                <div className={`flex items-center gap-4 ${isLocked ? 'opacity-50 blur-[4px]' : 'opacity-100'}`}>
                   <div className="w-10 h-10 rounded-full bg-[#2997ff]/10 flex items-center justify-center text-[#2997ff]">
                     <Mail size={18} />
                   </div>
                   <div>
                     <div className="text-xs text-[var(--color-text-secondary)]">Email</div>
                     <div className="text-lg font-medium font-mono text-[var(--color-text-primary)]">
                        {isLocked ? '****@qq.com' : decryptedEmail}
                     </div>
                   </div>
                </div>
             </div>
          </BentoCard>
        </BentoGrid>

        {/* RESEARCH GRID */}
        <div className="max-w-7xl mx-auto px-6 mt-12 mb-4">
           <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">{t.sections.research}</h2>
        </div>

        <BentoGrid>
           {t.research.map((item, i) => (
             <BentoCard
                key={i}
                colSpan={i === 2 ? 2 : 1}
                rowSpan={1}
                className="p-8"
                onClick={() => openDetail({ title: item.title, content: item.desc, subtitle: item.period })}
             >
                <div className="text-xs font-mono text-[var(--color-text-secondary)] mb-4">{item.period}</div>
                <h3 className="text-xl font-bold mb-3 leading-snug text-[var(--color-text-primary)]">{item.title}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-4">{item.desc}</p>
             </BentoCard>
           ))}
        </BentoGrid>

        {/* AWARDS & SKILLS GRID */}
        <div className="max-w-7xl mx-auto px-6 mt-12 mb-4">
           <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">{t.sections.competitions}</h2>
        </div>

        <BentoGrid>
            {/* Awards List */}
            <BentoCard
                colSpan={2}
                rowSpan={2}
                className="p-8"
                onClick={() => openDetail({
                    title: t.sections.competitions,
                    list: [...t.competitions.national, ...t.competitions.provincial, ...t.competitions.school]
                })}
            >
               <div className="space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-[#2997ff] font-bold mb-4">
                       <Award size={18} /> National
                    </h4>
                    <ul className="space-y-3">
                       {t.competitions.national.map((c, i) => (
                          <li key={i} className="text-sm text-[var(--color-text-secondary)] border-b border-[var(--color-text-primary)]/5 pb-2">{c}</li>
                       ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 text-purple-400 font-bold mb-4">
                       <Star size={18} /> Provincial Highlight
                    </h4>
                     <ul className="space-y-3">
                       {t.competitions.provincial.slice(0, 3).map((c, i) => (
                          <li key={i} className="text-sm text-[var(--color-text-secondary)] border-b border-[var(--color-text-primary)]/5 pb-2">{c}</li>
                       ))}
                    </ul>
                  </div>
               </div>
            </BentoCard>

            {/* Work */}
            <BentoCard colSpan={1} rowSpan={2} className="p-8">
               <h3 className="text-lg font-bold mb-6 text-[var(--color-text-primary)]">{t.sections.work}</h3>
               <div className="space-y-8 relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[var(--color-text-secondary)]/20"></div>

                  {t.work.map((w, i) => (
                    <div key={i} className="relative pl-8">
                       <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[var(--color-surface)] border-2 border-[#2997ff]"></div>
                       <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{w.title}</h4>
                       <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">{w.desc}</p>
                    </div>
                  ))}
               </div>
            </BentoCard>

            {/* Volunteer */}
            <BentoCard colSpan={1} rowSpan={1} className="p-8 flex flex-col justify-between">
               <div>
                  <h3 className="text-lg font-bold mb-2 text-[var(--color-text-primary)]">{t.sections.volunteer}</h3>
                  <div className="text-4xl font-bold text-[#2997ff]">150h+</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">Total Service Hours</div>
               </div>
               <div className="mt-4 text-xs text-[var(--color-text-secondary)]">
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

        <footer className="text-center text-[var(--color-text-secondary)] text-xs py-12">
            <p>Designed by Yan Yuqi. Inspired by Apple.</p>
        </footer>
      </main>

      {/* Modal for Verification */}
      <VerificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUnlock={handleUnlock}
        lang={lang}
      />

      {/* Expanded Detail Modal */}
      <AnimatePresence>
        {expandedCard && (
           <motion.div
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
             onClick={() => setExpandedCard(null)}
           >
              <motion.div
                 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                 className="bg-[var(--color-surface)] w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 shadow-2xl relative"
                 onClick={(e) => e.stopPropagation()}
              >
                  <button
                     onClick={() => setExpandedCard(null)}
                     className="absolute top-6 right-6 p-2 rounded-full bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                     <X size={20} />
                  </button>

                  <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">{expandedCard.title}</h2>
                  {expandedCard.subtitle && <p className="text-[#2997ff] font-mono text-sm mb-6">{expandedCard.subtitle}</p>}

                  <div className="text-[var(--color-text-primary)] leading-relaxed space-y-4">
                     {expandedCard.content && <p>{expandedCard.content}</p>}
                     {expandedCard.list && (
                        <ul className="space-y-3 mt-4">
                           {expandedCard.list.map((item, i) => (
                              <li key={i} className="border-b border-[var(--color-text-primary)]/10 pb-2">{item}</li>
                           ))}
                        </ul>
                     )}
                  </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
