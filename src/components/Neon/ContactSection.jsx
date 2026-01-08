import React from 'react';
import HackerText from './HackerText';
import { Github, Linkedin, Mail } from 'lucide-react';

function ContactSection({ data, labels }) {
  const { hero } = data; // Contact info is in hero object in resumeData for now

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-between px-8 md:px-32 pt-24 pb-8">
      <div className="flex-grow flex flex-col justify-center">
        <h2 className="text-5xl md:text-6xl font-bold text-[#ccff00] mb-12 flex items-center gap-4">
          <HackerText text={labels.contact.toUpperCase()} className="" /> <span className="text-white font-light">{'{'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-10">
            <div>
              <h3 className="text-3xl font-bold text-[#ccff00] mb-4">Have a project in mind?</h3>
              <p className="text-gray-400 text-lg">My inbox is always open for new opportunities.</p>
            </div>

            <div className="space-y-6 text-lg text-gray-300">
              <a href="#" className="flex items-center gap-4 hover:text-[#ccff00] transition-colors"><Github className="w-8 h-8" /><span>Yan Yuqi</span></a>
              <a href={`mailto:${hero.email}`} className="flex items-center gap-4 hover:text-[#ccff00] transition-colors"><Mail className="w-8 h-8" /><span>{hero.email}</span></a>
              <div className="flex items-center gap-4 hover:text-[#ccff00] transition-colors"><Linkedin className="w-8 h-8" /><span>{hero.phone}</span></div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-gray-400 text-lg font-medium ml-1">Email</label>
              <input type="email" className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:border-[#ccff00] focus:outline-none focus:ring-1 focus:ring-[#ccff00] transition-all"/>
            </div>
            <div className="space-y-2">
              <label className="text-gray-400 text-lg font-medium ml-1">Subject</label>
              <input type="text" className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:border-[#ccff00] focus:outline-none focus:ring-1 focus:ring-[#ccff00] transition-all"/>
            </div>
            <div className="space-y-2">
              <label className="text-gray-400 text-lg font-medium ml-1">Message</label>
              <textarea rows={3} className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:border-[#ccff00] focus:outline-none focus:ring-1 focus:ring-[#ccff00] transition-all"></textarea>
            </div>
            <button className="w-full bg-[#ccff00] text-black font-bold text-xl py-3 rounded hover:bg-[#b3e600] transition-transform hover:scale-[1.02] active:scale-95">Submit</button>
          </form>
        </div>

        <div className="mt-12 text-6xl text-white font-light opacity-50">{'}'}</div>
      </div>

      <footer className="w-full mt-8 relative pt-6 border-t border-gray-800/50">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ccff00] to-transparent opacity-30"></div>
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-3xl font-bold text-[#ccff00] tracking-tight">Yan Yuqi</h3>
            <p className="text-gray-400 text-xs">Designed by <a href="#" className="text-[#ccff00] underline decoration-[#ccff00] hover:text-white transition-colors">Falzo</a></p>
          </div>
          <div className="flex gap-4 pb-1">
            <a href="#" className="text-white hover:text-[#ccff00] hover:scale-110 transition-all"><Github size={20} /></a>
            <a href="#" className="text-white hover:text-[#ccff00] hover:scale-110 transition-all"><Linkedin size={20} /></a>
          </div>
          <div className="pb-1">
             <a href={`mailto:${hero.email}`} className="text-[#ccff00] underline decoration-[#ccff00] hover:text-white transition-colors text-base">{hero.email}</a>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default ContactSection;
