import React, { useState } from 'react';
import HackerText from './HackerText';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ProjectsSection({ data, labels }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const projects = data.projects || [];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center px-8 md:px-32 py-20 relative overflow-hidden">
      <h2 className="text-5xl md:text-6xl font-bold text-[#ccff00] mb-20 flex items-center gap-4">
        <span className="relative">
          <HackerText text={labels.projects.toUpperCase()} className="" />
          <span className="absolute top-0 left-0 -ml-1 text-[#ccff00] opacity-50 animate-pulse pointer-events-none">PROJEC%5</span>
        </span>
        <span className="text-white font-light">{'{'}</span>
      </h2>
      <div className="flex items-center justify-center gap-4 md:gap-12 w-full">
        <button onClick={prevSlide} className="p-4 rounded-full hover:bg-gray-900 text-[#ccff00] transition-colors z-20"><ChevronLeft size={40} strokeWidth={3} /></button>
        <div className="w-full max-w-5xl overflow-hidden relative min-h-[500px] flex items-center">
          <div className="flex transition-transform duration-500 ease-out w-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {projects.map((project, idx) => (
              <div key={idx} className="w-full flex-shrink-0 px-4 md:px-10 flex flex-col items-center justify-center">
                <div className="w-full h-[350px] md:h-[400px] rounded-2xl shadow-2xl mb-10 flex items-center justify-center relative overflow-hidden group border border-gray-800" style={{ background: project.image }}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  <h3 className={`text-5xl font-bold ${project.color} drop-shadow-lg`}>{project.logo}</h3>
                </div>
                <div className="text-left w-full">
                  <h3 className="text-3xl font-bold text-[#ccff00] mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-xl">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={nextSlide} className="p-4 rounded-full hover:bg-gray-900 text-[#ccff00] transition-colors z-20"><ChevronRight size={40} strokeWidth={3} /></button>
      </div>
      <div className="flex justify-center gap-4 mt-8">
        {projects.map((_, idx) => (
          <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-3 h-3 rounded-full ${currentSlide === idx ? 'bg-[#ccff00]' : 'bg-gray-600'}`} />
        ))}
      </div>
      <div className="mt-10 text-6xl text-white font-light opacity-50">{'}'}</div>
    </section>
  );
}

export default ProjectsSection;
