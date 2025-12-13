import React, { useState, useEffect } from 'react';
import { resumeData } from './data/resumeData';
import IdentityScene from './components/IdentityScene';
import { BentoGrid } from './components/BentoGrid';
import BentoCard from './components/BentoCard';
import VerificationModal from './components/VerificationModal';
import TerminalIntro from './components/TerminalIntro';
import TypewriterText from './components/TypewriterText';
import { Mail, Phone, Globe, Lock, ArrowRight, Star, Cpu, Award, X, Terminal, Code, GitBranch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CryptoJS from 'crypto-js';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [lang, setLang] = useState('en');
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
    try {
        const bytesPhone = CryptoJS.AES.decrypt(resumeData.cn.hero.phone, '123456');
        const bytesEmail = CryptoJS.AES.decrypt(resumeData.cn.hero.email, '123456');
        setDecryptedPhone(bytesPhone.toString(CryptoJS.enc.Utf8));
        setDecryptedEmail(bytesEmail.toString(CryptoJS.enc.Utf8));
    } catch (e) {
        console.error("Decryption failed", e);
    }
  };

  const openDetail = (content) => {
    setExpandedCard(content);
  };

  // Helper to count awards
  const awardCount = {
    national: t.competitions.national.length,
    provincial: t.competitions.provincial.length,
    school: t.competitions.school.length,
    total: t.competitions.national.length + t.competitions.provincial.length + t.competitions.school.length
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100]">
             <TerminalIntro onComplete={() => setShowIntro(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen pb-20 bg-[var(--color-bg)] font-mono">

        {/* Top Bar (VS Code Status Bar Style) */}
        <nav className="fixed top-0 w-full z-50 bg-[#161b22] border-b border-[#30363d] h-10 flex items-center justify-between px-4 text-xs">
          <div className="flex items-center gap-4 text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1 text-[var(--color-accent)]"><Terminal size={12}/> yanyuqi@portfolio</span>
            <span className="hidden md:inline">main*</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex bg-[#0d1117] border border-[#30363d] rounded overflow-hidden">
                <button
                  onClick={() => setLang('cn')}
                  className={`px-3 py-1 transition-colors ${lang === 'cn' ? 'bg-[#30363d] text-white' : 'text-gray-500 hover:text-white'}`}
                >
                  CN
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 transition-colors ${lang === 'en' ? 'bg-[#30363d] text-white' : 'text-gray-500 hover:text-white'}`}
                >
                  EN
                </button>
             </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-20 space-y-6">

          <BentoGrid>
            {/* 1. Identity Card (Wireframe 3D) */}
            <BentoCard colSpan={2} rowSpan={2} className="min-h-[500px] p-0 border-[#30363d] bg-[#0d1117]">
               <div className="absolute inset-0 z-0">
                 <IdentityScene isLocked={isLocked} />
               </div>

               <div className="relative z-10 mt-auto p-6 bg-[#0d1117]/80 backdrop-blur-sm border-t border-[#30363d]">
                  <div className="text-[var(--color-accent)] mb-2 font-bold flex items-center gap-2">
                     <span className="text-pink-400">const</span> role = <span className="text-yellow-300">"{t.hero.role}"</span>;
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-4">
                    {isLocked ? <span className="text-red-500 animate-pulse">{t.hero.lockedTitle}</span> : t.hero.unlockedTitle}
                  </h1>

                  {isLocked && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
                      className="flex items-center gap-2 bg-[#238636] text-white px-4 py-2 text-sm font-bold hover:bg-[#2ea043] transition-colors border border-[rgba(255,255,255,0.1)]"
                    >
                      <Lock size={14} /> sudo unlock_identity
                    </button>
                  )}
               </div>
            </BentoCard>

            {/* 2. Intro Card */}
            <BentoCard
              colSpan={1} rowSpan={1} className="p-6"
              onClick={() => openDetail({ title: t.sections.intro, content: t.introText })}
            >
               <div className="text-[var(--color-text-secondary)] mb-2 text-xs">README.md</div>
               <h3 className="text-xl font-bold mb-4 text-white border-b border-[#30363d] pb-2">{t.sections.intro}</h3>
               <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed line-clamp-6 font-mono">
                 {t.introText}
               </p>
            </BentoCard>

            {/* 3. Stats Card */}
            <BentoCard colSpan={1} rowSpan={1} className="p-6 flex flex-col justify-center items-center text-center">
               <div className="text-6xl font-bold text-white mb-2 font-mono">90.06</div>
               <div className="text-[var(--color-text-secondary)] text-xs uppercase tracking-wider">GPA.float</div>
               <div className="mt-4 px-2 py-1 bg-[#238636]/20 text-[#238636] border border-[#238636]/50 text-xs">
                 ranking_index: 0
               </div>
            </BentoCard>

            {/* 4. Contact Card */}
            <BentoCard colSpan={2} rowSpan={1} className="p-6 flex flex-col justify-center">
               <h3 className="text-[var(--color-text-secondary)] text-xs font-bold uppercase tracking-widest mb-6">./contact_info</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`flex items-center gap-4 ${isLocked ? 'opacity-50 blur-[2px]' : 'opacity-100'}`}>
                     <Phone size={18} className="text-[var(--color-accent)]" />
                     <div className="font-mono text-sm">
                        <span className="text-pink-400">var</span> mobile = <span className="text-yellow-300">"{isLocked ? 'ENCRYPTED' : decryptedPhone}"</span>
                     </div>
                  </div>
                  <div className={`flex items-center gap-4 ${isLocked ? 'opacity-50 blur-[2px]' : 'opacity-100'}`}>
                     <Mail size={18} className="text-[var(--color-accent)]" />
                     <div className="font-mono text-sm">
                        <span className="text-pink-400">var</span> email = <span className="text-yellow-300">"{isLocked ? 'ENCRYPTED' : decryptedEmail}"</span>
                     </div>
                  </div>
               </div>
            </BentoCard>
          </BentoGrid>

          {/* Research Section Header */}
          <div className="max-w-7xl mx-auto px-6 mt-12 mb-4 flex items-center gap-2">
             <GitBranch className="text-[var(--color-text-secondary)]" />
             <h2 className="text-xl font-bold text-white">git log --grep="research"</h2>
          </div>

          <BentoGrid>
             {t.research.map((item, i) => (
               <BentoCard
                  key={i} colSpan={i === 2 ? 2 : 1} rowSpan={1} className="p-6"
                  onClick={() => openDetail({ title: item.title, content: item.desc, subtitle: item.period })}
               >
                  <div className="text-xs text-[var(--color-accent)] mb-2 font-mono">{item.period}</div>
                  <h3 className="text-lg font-bold mb-3 leading-snug text-white">{item.title}</h3>
                  <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed line-clamp-4">{item.desc}</p>
               </BentoCard>
             ))}
          </BentoGrid>

          {/* Awards Section Header */}
          <div className="max-w-7xl mx-auto px-6 mt-12 mb-4 flex items-center gap-2">
             <Award className="text-[var(--color-text-secondary)]" />
             <h2 className="text-xl font-bold text-white">cat awards.json</h2>
          </div>

          <BentoGrid>
              {/* Awards Summary Grid */}
              <BentoCard
                  colSpan={2} rowSpan={2} className="p-6 bg-[#0d1117]"
                  onClick={() => openDetail({
                      title: t.sections.competitions,
                      list: [...t.competitions.national, ...t.competitions.provincial, ...t.competitions.school]
                  })}
              >
                 <div className="h-full flex flex-col">
                    <div className="mb-6">
                         <div className="text-yellow-300 mb-1 text-sm">"status": "exceptional"</div>
                         <div className="text-[var(--color-text-secondary)] text-xs">
                             // {lang === 'cn' ? '屡获殊荣，卓越表现' : 'Award-winning excellence.'}
                         </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 flex-1">
                        <div className="p-4 bg-[#161b22] border border-[#30363d] flex flex-col justify-center">
                            <div className="text-2xl font-bold text-white">{awardCount.national}</div>
                            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase mt-1">National</div>
                        </div>
                        <div className="p-4 bg-[#161b22] border border-[#30363d] flex flex-col justify-center">
                            <div className="text-2xl font-bold text-white">{awardCount.provincial}</div>
                            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase mt-1">Provincial</div>
                        </div>
                        <div className="p-4 bg-[#161b22] border border-[#30363d] flex flex-col justify-center">
                            <div className="text-2xl font-bold text-white">{awardCount.school}</div>
                            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase mt-1">School</div>
                        </div>
                        <div className="p-4 bg-[#161b22] border border-[#238636]/30 flex flex-col justify-center items-center">
                             <div className="text-3xl font-bold text-[var(--color-accent)]">{awardCount.total}</div>
                             <div className="text-[10px] text-[var(--color-accent)] uppercase mt-1">Total</div>
                        </div>
                    </div>
                 </div>
              </BentoCard>

              {/* Work */}
              <BentoCard colSpan={1} rowSpan={2} className="p-6">
                 <h3 className="text-lg font-bold mb-6 text-white border-b border-[#30363d] pb-2">{t.sections.work}</h3>
                 <div className="space-y-6 font-mono text-xs">
                    {t.work.map((w, i) => (
                      <div key={i}>
                         <div className="text-[var(--color-accent)] mb-1">def {w.title.split(' ')[0].toLowerCase()}():</div>
                         <p className="text-[var(--color-text-secondary)] pl-4 border-l border-[#30363d]">{w.desc}</p>
                      </div>
                    ))}
                 </div>
              </BentoCard>

              {/* Volunteer */}
              <BentoCard colSpan={2} rowSpan={1} className="p-6 flex items-center justify-between">
                 <div>
                    <h3 className="text-lg font-bold mb-1 text-white">{t.sections.volunteer}</h3>
                    <div className="text-3xl font-bold text-[var(--color-accent)]">150h+</div>
                 </div>
                 <div className="text-right text-xs text-[var(--color-text-secondary)] font-mono">
                     <span className="text-pink-400">while</span>(true) {'{'} <br/>
                     &nbsp;&nbsp;serve_community(); <br/>
                     {'}'}
                 </div>
              </BentoCard>

          </BentoGrid>

          <footer className="text-center text-[var(--color-text-secondary)] text-xs py-12 font-mono">
              <p>git commit -m "Initial release" --author="Yan Yuqi"</p>
          </footer>
        </main>
      </div>

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
             className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-mono"
             onClick={() => setExpandedCard(null)}
           >
              <motion.div
                 initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                 className="bg-[#0c0c0c] w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-[#30363d] shadow-2xl relative p-8"
                 onClick={(e) => e.stopPropagation()}
              >
                  <button
                     onClick={() => setExpandedCard(null)}
                     className="absolute top-4 right-4 text-gray-500 hover:text-white"
                  >
                     <X size={20} />
                  </button>

                  <h2 className="text-2xl font-bold text-white mb-2 border-b border-[#30363d] pb-2">{expandedCard.title}</h2>
                  {expandedCard.subtitle && <p className="text-[var(--color-accent)] text-xs mb-6">{expandedCard.subtitle}</p>}

                  <div className="text-gray-300 text-sm leading-relaxed space-y-4">
                     {expandedCard.content && <p>{expandedCard.content}</p>}
                     {expandedCard.list && (
                        <ul className="space-y-2 mt-4">
                           {expandedCard.list.map((item, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="text-[var(--color-accent)]">➜</span>
                                {item}
                              </li>
                           ))}
                        </ul>
                     )}
                  </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
