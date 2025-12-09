import React, { useState } from 'react';
import { resumeData } from './data/resumeData';
import IdentityScene from './components/IdentityScene';
import GlassCard from './components/GlassCard';
import VerificationModal from './components/VerificationModal';
import { Mail, Phone, Globe, Lock, GraduationCap, Award, Briefcase, BookOpen, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [lang, setLang] = useState('cn');
  const [isLocked, setIsLocked] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const t = resumeData[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-blue-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-black/50 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <span className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            RESUME
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang('cn')}
              className={`text-sm font-medium transition-colors ${lang === 'cn' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              中文
            </button>
            <span className="text-gray-700">/</span>
            <button
              onClick={() => setLang('en')}
              className={`text-sm font-medium transition-colors ${lang === 'en' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-24 pb-20 px-6 max-w-6xl mx-auto space-y-20">

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-blue-400 font-mono text-sm mb-2 tracking-widest uppercase">
                {t.hero.role}
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">
                {isLocked ? (
                  <span className="flex items-center gap-4 text-gray-500">
                    {t.hero.lockedTitle} <Lock size={40} className="animate-pulse" />
                  </span>
                ) : (
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400">
                    {t.hero.unlockedTitle}
                  </span>
                )}
              </h1>
            </motion.div>

            {/* Private Info Block */}
            <div className="space-y-4">
              <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${isLocked ? 'bg-red-900/10 border-red-500/20' : 'bg-blue-900/10 border-blue-500/20'}`}>
                <Phone size={20} className={isLocked ? 'text-red-400' : 'text-blue-400'} />
                <span className={`font-mono text-lg ${isLocked ? 'blur-sm select-none text-gray-500' : 'text-white'}`}>
                  {isLocked ? '188-****-****' : t.hero.phone}
                </span>
              </div>
              <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${isLocked ? 'bg-red-900/10 border-red-500/20' : 'bg-blue-900/10 border-blue-500/20'}`}>
                <Mail size={20} className={isLocked ? 'text-red-400' : 'text-blue-400'} />
                <span className={`font-mono text-lg ${isLocked ? 'blur-sm select-none text-gray-500' : 'text-white'}`}>
                  {isLocked ? '****@qq.com' : t.hero.email}
                </span>
              </div>
            </div>

            {isLocked && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="px-8 py-3 bg-white text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2"
              >
                <Lock size={18} /> {t.hero.unlockBtn}
              </motion.button>
            )}
          </div>

          {/* 3D Scene */}
          <div className="order-1 lg:order-2 h-[400px]">
            <IdentityScene
                isLocked={isLocked}
                text={isLocked ? "LOCKED" : (lang === 'cn' ? "YAN YUQI" : "YAN YUQI")}
            />
          </div>
        </section>

        {/* Basic Info & Intro */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Info Grid */}
            <GlassCard className="col-span-1 md:col-span-2 space-y-6">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <Globe className="text-blue-400" />
                    <h3 className="text-xl font-bold text-white">{t.sections.basic}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
                    <p><strong className="text-gray-500">Gender:</strong> {t.basicInfo.gender}</p>
                    <p><strong className="text-gray-500">Born:</strong> {t.basicInfo.birth}</p>
                    <p><strong className="text-gray-500">Major:</strong> {t.basicInfo.major}</p>
                    <p><strong className="text-gray-500">Politics:</strong> {t.basicInfo.politics}</p>
                    <p className="col-span-1 sm:col-span-2"><strong className="text-gray-500">College:</strong> {t.basicInfo.college}</p>
                    <p className="col-span-1 sm:col-span-2 text-green-400">{t.basicInfo.gpa}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {t.basicInfo.honors.map((honor, i) => (
                        <span key={i} className="px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-xs">
                            {honor}
                        </span>
                    ))}
                </div>
            </GlassCard>

            {/* Intro Text */}
            <GlassCard delay={0.1} className="col-span-1 flex flex-col justify-center">
                 <div className="flex items-center gap-3 mb-4">
                    <Heart className="text-pink-400" />
                    <h3 className="text-xl font-bold text-white">{t.sections.intro}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm text-justify">
                    {t.introText}
                </p>
            </GlassCard>
        </section>

        {/* Research */}
        <section>
             <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <BookOpen className="text-purple-400" /> {t.sections.research}
            </h3>
            <div className="space-y-6">
                {t.research.map((item, i) => (
                    <GlassCard key={i} delay={i * 0.1}>
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                            <h4 className="text-lg font-bold text-white">{item.title}</h4>
                            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-mono border border-purple-500/20 whitespace-nowrap">
                                {item.period}
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </GlassCard>
                ))}
            </div>
        </section>

        {/* Competitions */}
        <section>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Award className="text-yellow-400" /> {t.sections.competitions}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard>
                    <h4 className="text-lg font-bold text-yellow-200 mb-4 border-b border-white/10 pb-2">National</h4>
                    <ul className="space-y-3">
                        {t.competitions.national.map((award, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <span className="text-yellow-500 mt-1">●</span> {award}
                            </li>
                        ))}
                    </ul>
                </GlassCard>
                <div className="space-y-6">
                    <GlassCard delay={0.1}>
                        <h4 className="text-lg font-bold text-blue-200 mb-4 border-b border-white/10 pb-2">Provincial</h4>
                         <ul className="space-y-3">
                            {t.competitions.provincial.slice(0, 5).map((award, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                    <span className="text-blue-500 mt-1">●</span> {award}
                                </li>
                            ))}
                            {t.competitions.provincial.length > 5 && (
                                <li className="text-xs text-gray-500 italic pl-4">And {t.competitions.provincial.length - 5} more...</li>
                            )}
                        </ul>
                    </GlassCard>
                    <GlassCard delay={0.2}>
                         <h4 className="text-lg font-bold text-green-200 mb-4 border-b border-white/10 pb-2">School</h4>
                         <ul className="space-y-3">
                            {t.competitions.school.map((award, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                    <span className="text-green-500 mt-1">●</span> {award}
                                </li>
                            ))}
                        </ul>
                    </GlassCard>
                </div>
            </div>
        </section>

        {/* Work & Practice */}
        <section>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Briefcase className="text-orange-400" /> {t.sections.work}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.work.map((job, i) => (
                    <GlassCard key={i} delay={i * 0.1} className="h-full">
                        <h4 className="text-lg font-bold text-white mb-2">{job.title}</h4>
                        <p className="text-gray-400 text-sm">{job.desc}</p>
                    </GlassCard>
                ))}
            </div>
        </section>

        {/* Volunteers & Ideology */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <GlassCard className="col-span-1 md:col-span-2">
                 <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Heart className="text-red-400" /> {t.sections.volunteer}
                </h3>
                <ul className="space-y-2">
                    {t.volunteers.map((v, i) => (
                        <li key={i} className="text-sm text-gray-300 py-1 border-b border-white/5 last:border-0">
                            {v}
                        </li>
                    ))}
                </ul>
             </GlassCard>

             <GlassCard delay={0.1} className="col-span-1 bg-gradient-to-br from-red-900/10 to-transparent">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <GraduationCap className="text-red-400" /> {t.sections.ideology}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed text-justify">
                    {t.ideology}
                </p>
             </GlassCard>
        </section>

        <footer className="text-center text-gray-600 text-sm py-8 border-t border-white/5">
            <p>DESIGNED & BUILT BY YAN YUQI © 2025</p>
            <p className="text-xs mt-2 opacity-50">Powered by React, Three.js & Tailwind CSS</p>
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
