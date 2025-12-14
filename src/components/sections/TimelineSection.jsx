import React from 'react';
import { motion } from 'framer-motion';

const TimelineSection = ({ data, title }) => {
  if (!data) return null;

  return (
    <section id="timeline" className="min-h-screen w-full flex items-center justify-center py-20 relative pointer-events-auto">
      <div className="max-w-4xl w-full px-4">
        <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-16 flex items-center gap-4"
        >
            <span className="text-neon-yellow">{`{`}</span>
            {title}
            <span className="text-neon-yellow">{`}`}</span>
        </motion.h2>

        <div className="relative border-l border-gray-800 ml-4 md:ml-0 md:pl-0 md:border-none">
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-green to-transparent -translate-x-1/2" />

            {data.map((exp, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative mb-12 md:mb-24 flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                    {/* Content Box */}
                    <div className="md:w-1/2 pl-8 md:pl-0 md:px-12">
                        <div className={`p-6 bg-black/50 border border-gray-800 backdrop-blur-md hover:border-neon-green transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(57,255,20,0.1)]`}>
                            {/* Regex to extract date if it's in the title, else just show generic icon */}
                            {/* The data has periods in title sometimes like "Role (2023-2024)" */}
                            <span className="text-neon-magenta font-mono text-xs mb-2 block tracking-widest">
                                {exp.title.match(/\((.*?)\)/)?.[1] || "EXP_NODE_" + index}
                            </span>

                            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-neon-green transition-colors leading-tight">
                                {exp.title.replace(/\(.*?\)/, '').trim()}
                            </h3>

                            <div className="h-px w-12 bg-gray-800 my-4 group-hover:w-full group-hover:bg-neon-green/50 transition-all duration-500" />

                            <p className="text-gray-400 text-sm leading-relaxed">
                                {exp.desc}
                            </p>
                        </div>
                    </div>

                    {/* Central Node */}
                    <div className="absolute left-[-5px] md:left-1/2 top-0 md:top-8 w-2.5 h-2.5 bg-black border border-neon-green rounded-full shadow-[0_0_10px_#39ff14] z-10 md:-translate-x-1/2">
                        <div className="absolute inset-0 bg-neon-green animate-ping opacity-20 rounded-full" />
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
