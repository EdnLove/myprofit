import React from 'react';
import HackerText from './HackerText';

function SkillsSection({ data, labels }) {
  const { skills } = data;
  const skillsLeft = skills?.left || [];
  const skillsRight = skills?.right || [];

  // 统一的渲染组件
  const SkillItem = ({ name, url }) => (
    <div className="flex items-center gap-4 text-xl text-white hover:translate-x-2 transition-transform cursor-default group">
      <div className="w-12 h-12 flex items-center justify-center p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-[#ccff00]/50 transition-colors">
        <img
          src={url}
          alt={name}
          className={`w-full h-full object-contain ${name === 'Rust' ? 'invert' : ''}`}
        />
      </div>
      <span className="group-hover:text-[#ccff00] transition-colors">{name}</span>
    </div>
  );

  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center px-8 md:px-32 py-20 bg-[#050505]">
      <h2 className="text-5xl md:text-6xl font-bold text-[#ccff00] mb-20 flex items-center gap-4">
        <HackerText text={labels.skills.toUpperCase()} className="" /> <span className="text-white font-light">{'{'}</span>
      </h2>
      <div className="flex flex-col md:flex-row gap-20 max-w-7xl mx-auto w-full items-center">
        <div className="md:w-1/2 text-gray-400 text-lg leading-relaxed space-y-6">
          <p>I excel in dissecting complex problems into manageable tasks, essential for crafting robust, maintainable code in large-scale projects.</p>
          <p>I'm driven by challenges, always seeking opportunities to enhance my skills. My self-directed learning approach empowers me to quickly grasp and adapt to new technologies autonomously.</p>
        </div>
        <div className="hidden md:block w-1 h-64 bg-gray-800 relative mx-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-3/4 bg-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.5)] rounded-full"></div>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-8">
            {skillsLeft.map((skill) => (
              <SkillItem key={skill.name} name={skill.name} url={skill.url} />
            ))}
          </div>
          <div className="space-y-8">
            {skillsRight.map((skill) => (
              <SkillItem key={skill.name} name={skill.name} url={skill.url} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-20 text-6xl text-white font-light opacity-50">{'}'}</div>
    </section>
  );
}

export default SkillsSection;
