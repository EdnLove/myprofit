import React, { useState } from 'react';
import HackerText from './HackerText';

function WorkSection({ data, labels }) {
  // Map 'research' and 'work' data to a timeline format
  // Or use the pre-processed 'timeline' from resumeData
  const experiences = data.timeline || [];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const progressWidth = hoveredIndex !== null ? experiences[hoveredIndex].pos : '100%';

  return (
    <section id="work" className="min-h-screen flex flex-col justify-center px-8 md:px-32 py-20">
      <h2 className="text-5xl md:text-6xl font-bold text-[#ccff00] mb-12 flex items-center gap-4">
        <HackerText text={labels.work.toUpperCase()} className="" /> <span className="text-white font-light">{'{'}</span>
      </h2>

      <div className="h-24 hidden md:block"></div>

      {/* 使用 flex 容器来让年份和线条水平对齐 */}
      <div className="flex items-center gap-4 mt-20 mb-20 h-40">

        {/* 左侧年份 */}
        <span className="text-[#ccff00] text-xl font-bold">2022</span>

        {/* 中间相对定位容器，承载线条和节点 */}
        <div className="relative flex-1 h-full">

          {/* === 时间轴轨道 === */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 z-0 rounded-full overflow-hidden">
            {/* 荧光激活线 */}
            <div
              className="h-full bg-[#ccff00] transition-all duration-500 ease-out relative neon-line-active"
              style={{ width: progressWidth }}
            >
              {/* 光斑 */}
              {hoveredIndex !== null && (
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_5px_white] blur-[2px]"></div>
              )}
            </div>
          </div>

          {/* Nodes Wrapper - 覆盖在相对容器上 */}
          <div className="absolute inset-0 w-full h-full">
            {experiences.map((exp, i) => {
              const isHovered = i === hoveredIndex;
              const isActiveNode = hoveredIndex !== null ? i <= hoveredIndex : true;
              const isTop = i % 2 !== 0;

              return (
                <div
                  key={i}
                  className="absolute top-0 h-full flex flex-col items-center justify-center group w-1"
                  style={{ left: exp.pos, transform: 'translateX(-50%)', zIndex: isHovered ? 20 : 10 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* --- TOP DETAIL BOX --- */}
                  {isTop && (
                    <div
                      className={`absolute bottom-1/2 mb-10 w-[280px] md:w-[400px] text-center transition-all duration-300 pointer-events-none ${
                        isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                      }`}
                    >
                       <h3 className="text-2xl font-bold text-[#ccff00] mb-2 drop-shadow-[0_0_10px_rgba(204,255,0,0.8)]">{exp.company}</h3>
                       <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{exp.description}</p>
                       <p className="text-[#ccff00] text-sm font-bold">{exp.location} | {exp.period}</p>
                    </div>
                  )}

                  {/* --- NODE DOT --- */}
                  <div
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-4 transition-all duration-300 cursor-pointer relative z-10
                      ${isActiveNode
                        ? 'bg-[#ccff00] border-[#ccff00] neon-dot-active scale-110' // 激活
                        : 'bg-[#050505] border-gray-700 shadow-none hover:border-[#ccff00]' // 未激活
                      }
                      ${isHovered ? 'scale-150 border-white ring-2 ring-white/50' : ''}
                    `}
                  >
                    {isHovered && <div className="absolute inset-0 bg-white rounded-full opacity-80 animate-pulse"></div>}
                  </div>

                  {/* --- TITLE BELOW DOT --- */}
                  <div
                    className={`absolute top-1/2 mt-8 text-center transition-all duration-300 w-[200px]
                      ${isActiveNode ? 'opacity-100 text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]' : 'opacity-40 text-gray-500'}
                      ${isHovered ? 'opacity-100' : ''}
                    `}
                  >
                    <h3 className={`text-xl md:text-2xl font-bold mb-2 ${!isTop && isHovered ? 'opacity-0' : 'opacity-100'}`}>
                      {exp.title}
                    </h3>
                    <span className="md:hidden text-gray-500 text-sm block">{exp.year}</span>
                  </div>

                  {/* --- BOTTOM DETAIL BOX --- */}
                  {!isTop && (
                    <div
                      className={`absolute top-1/2 mt-10 w-[280px] md:w-[400px] text-center transition-all duration-300 pointer-events-none ${
                        isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'
                      }`}
                    >
                       <h3 className="text-2xl font-bold text-[#ccff00] mb-2 drop-shadow-[0_0_10px_rgba(204,255,0,0.8)]">{exp.company}</h3>
                       <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-2">{exp.description}</p>
                       <p className="text-[#ccff00] text-sm font-bold">{exp.location} | {exp.period}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 右侧年份 */}
        <span className="text-[#ccff00] text-xl font-bold">2025</span>
      </div>

      <div className="h-32 hidden md:block"></div>

      <div className="mt-20 text-6xl text-white font-light opacity-50">{'}'}</div>
    </section>
  );
}

export default WorkSection;
