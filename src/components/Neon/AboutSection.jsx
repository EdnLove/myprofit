import React from 'react';
import HackerText from './HackerText';

const LogoUrls = {
    Arch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/archlinux/archlinux-original.svg"
};

function AboutSection({ data, labels }) {
  const { introText, basicInfo } = data;

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center px-8 md:px-32 py-20">
      <h2 className="text-5xl md:text-6xl font-bold text-[#ccff00] mb-20 flex items-center gap-4">
        <HackerText text={labels.about.toUpperCase()} className="" /> <span className="text-white font-light">{'{'}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl">
        <div className="space-y-6">
          <p className="text-xl md:text-2xl text-white font-medium">{basicInfo.college}</p>
          <p className="text-xl text-gray-400">{basicInfo.major}</p>
          <p className="text-lg text-gray-500">{basicInfo.gpa}</p>

          <div className="flex flex-col gap-2 mt-4">
             {basicInfo.honors.map((honor, i) => (
                <div key={i} className="text-[#ccff00]/80 text-sm border-l-2 border-[#ccff00] pl-2">{honor}</div>
             ))}
          </div>

          <div className="flex items-center gap-3 text-[#1793d1] font-bold mt-8 p-4 bg-gray-900/50 rounded-lg w-fit border border-gray-800 hover:border-[#1793d1] transition-colors cursor-default">
            <img src={LogoUrls.Arch} alt="Arch Linux" className="w-6 h-6" style={{filter: 'brightness(0) invert(1)'}} />
            <span>I use Arch btw</span>
          </div>
        </div>
        <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
          <p>{introText}</p>
        </div>
      </div>
      <div className="mt-20 text-6xl text-white font-light opacity-50">{'}'}</div>
    </section>
  );
}

export default AboutSection;
