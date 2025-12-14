import React from 'react';
import { motion } from 'framer-motion';

const ProjectsSection = ({ projects, awards, titles }) => {
  if (!projects) return null;

  return (
    <section id="projects" className="min-h-screen w-full flex flex-col items-center justify-center py-20 relative pointer-events-auto">
      <div className="max-w-6xl w-full px-4">

        {/* PROJECTS HEADER */}
        <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-16 flex items-center gap-4 justify-end"
        >
            <span className="text-neon-magenta">{`{`}</span>
            {titles.projects}
            <span className="text-neon-magenta">{`}`}</span>
        </motion.h2>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
            {projects.map((p, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative flex flex-col bg-gray-900/40 border border-gray-800 hover:border-neon-magenta transition-all duration-500 overflow-hidden min-h-[300px]"
                >
                    {/* Header Strip */}
                    <div className="h-1 w-full bg-gradient-to-r from-neon-magenta to-transparent" />

                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                             <span className="text-xs font-mono text-gray-500">RES_NODE_{i}</span>
                             <span className="text-xs font-mono text-neon-magenta">{p.period}</span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-magenta transition-colors">
                            {p.title}
                        </h3>

                        <p className="text-gray-400 text-sm font-mono leading-relaxed flex-1">
                            {p.desc}
                        </p>

                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-xs text-gray-600 font-mono">STATUS: COMPLETE</span>
                            <div className="w-2 h-2 bg-neon-magenta rounded-full shadow-[0_0_5px_#ff00ff]" />
                        </div>
                    </div>

                    {/* Glitch Overlay */}
                    <div className="absolute inset-0 bg-neon-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay pointer-events-none" />
                </motion.div>
            ))}
        </div>

        {/* AWARDS HEADER */}
        <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-4"
        >
            <span className="text-neon-green">{`{`}</span>
            {titles.awards}
            <span className="text-neon-green">{`}`}</span>
        </motion.h2>

        {/* Awards Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
             {[
                { label: 'TOTAL_AWARDS', value: awards.national.length + awards.provincial.length + awards.school.length, color: 'text-white' },
                { label: 'NATIONAL', value: awards.national.length, color: 'text-neon-yellow' },
                { label: 'PROVINCIAL', value: awards.provincial.length, color: 'text-neon-green' },
                { label: 'UNIVERSITY', value: awards.school.length, color: 'text-neon-magenta' },
             ].map((stat, i) => (
                 <div key={i} className="bg-gray-900/30 border border-gray-800 p-4 text-center">
                     <div className="text-xs text-gray-500 mb-1 tracking-widest">{stat.label}</div>
                     <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
                 </div>
             ))}
        </div>

        {/* AWARDS LIST (Terminal / Data Dump Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 font-mono text-sm">
            {/* National */}
            <div>
                <h3 className="text-neon-yellow mb-4 text-xs tracking-widest border-b border-gray-800 pb-2">LEVEL: NATIONAL</h3>
                <ul className="space-y-4">
                    {awards.national.map((award, i) => (
                        <li key={i} className="flex gap-4 text-gray-400 hover:text-white transition-colors">
                            <span className="text-gray-600 min-w-[20px] text-right">{`0${i+1}`}</span>
                            <span>{award}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Provincial & School (Combined or Split) */}
            <div className="space-y-12">
                <div>
                    <h3 className="text-neon-green mb-4 text-xs tracking-widest border-b border-gray-800 pb-2">LEVEL: PROVINCIAL</h3>
                    <div className="max-h-[300px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                        <ul className="space-y-4">
                            {awards.provincial.map((award, i) => (
                                <li key={i} className="flex gap-4 text-gray-400 hover:text-white transition-colors">
                                    <span className="text-gray-600 min-w-[20px] text-right">{i < 9 ? `0${i+1}` : i+1}</span>
                                    <span>{award}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                 <div>
                    <h3 className="text-neon-magenta mb-4 text-xs tracking-widest border-b border-gray-800 pb-2">LEVEL: UNIVERSITY</h3>
                    <ul className="space-y-4">
                        {awards.school.map((award, i) => (
                            <li key={i} className="flex gap-4 text-gray-400 hover:text-white transition-colors">
                                <span className="text-gray-600 min-w-[20px] text-right">{`0${i+1}`}</span>
                                <span>{award}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
