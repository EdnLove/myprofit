import React from 'react';
import HackerText from './HackerText';
import Typewriter from './Typewriter';
import { ChevronRight } from 'lucide-react';

const LogoUrls = {
  GithubCat: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
};

function HeroSection({ scrollToContact, scrollToAbout, data }) {
  const { name, role } = data;
  const roles = role.split(' | ');

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-8 md:px-32 relative">
      <div className="max-w-4xl">
        <div className="inline-block relative mb-6 group">
          <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-3xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative border-2 border-[#333344] rounded-2xl px-8 py-2 neon-box bg-black/20 backdrop-blur-sm overflow-hidden">
            <HackerText
                text={name}
                className="text-6xl md:text-8xl font-bold text-[#ccff00] tracking-tighter neon-text font-mono block"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 text-2xl md:text-4xl font-light mb-8 pl-2">
          {/* 打字机效果 */}
          <Typewriter words={roles} />

          <div className="relative group transform -rotate-1 cursor-pointer">
             <div className="absolute inset-0 bg-[#ccff00] blur-md opacity-30 group-hover:opacity-60 transition-opacity"></div>
             <img src={LogoUrls.GithubCat} alt="GitHub Cat" className="w-16 h-16 object-contain relative z-10 drop-shadow-[0_0_5px_rgba(204,255,0,0.5)] invert" />
          </div>
        </div>
        <p className="text-gray-400 max-w-xl text-lg leading-relaxed mb-10 pl-2">
            {data.desc || "Self-taught programmer motivated by passion and personal projects."}
        </p>
        <div className="flex gap-6 pl-2">
          <button onClick={scrollToContact} className="bg-[#ccff00] text-black px-8 py-3 font-bold text-lg rounded hover:bg-[#b3e600] transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)]">
            Contact Me
          </button>
          <button onClick={scrollToAbout} className="border border-[#ccff00] text-[#ccff00] px-8 py-3 font-bold text-lg rounded flex items-center gap-2 hover:bg-[#ccff00] hover:text-black transition-all">
            Learn More <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#ccff00] opacity-5 rounded-full blur-[128px] pointer-events-none" />
    </section>
  );
}

export default HeroSection;
