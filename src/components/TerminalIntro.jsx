import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TerminalIntro = ({ onComplete }) => {
  const [lines, setLines] = useState([
    "yanyuqi@archlinux:~$ npm run dev",
  ]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const bootSequence = [
    { text: "> app@0.0.0 dev", delay: 400 },
    { text: "> vite", delay: 200 },
    { text: "", delay: 200 },
    { text: "  VITE v5.4.8  ready in 345 ms", delay: 500, color: "text-green-400" },
    { text: "", delay: 100 },
    { text: "  ➜  Local:   http://localhost:5173/", delay: 600, color: "text-cyan-400" },
    { text: "  ➜  Network: use --host to expose", delay: 200, color: "text-gray-500" },
    { text: "", delay: 300 },
    { text: "[System] Identity Matrix Loaded...", delay: 400 },
    { text: "[System] Decrypting Modules...", delay: 400 },
    { text: "[Security] Access Control: ENABLED", delay: 300, color: "text-yellow-400" },
    { text: "[Render] Initializing 3D Core...", delay: 500 },
    { text: "Done.", delay: 800, color: "text-green-500 font-bold" },
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    let timeout;
    let lineIdx = 0;

    const runSequence = async () => {
      for (const line of bootSequence) {
        await new Promise(r => setTimeout(r, line.delay));
        setLines(prev => [...prev, line]);
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }
      setTimeout(onComplete, 500);
    };

    runSequence();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0c0c0c] text-gray-300 font-mono p-6 md:p-12 overflow-hidden flex flex-col">
      <div className="flex-1 w-full max-w-4xl mx-auto overflow-y-auto" ref={scrollRef}>
        {lines.map((line, i) => (
          <div key={i} className={`${typeof line === 'string' ? '' : line.color || 'text-gray-300'} mb-1`}>
            {typeof line === 'string' ? line : line.text}
          </div>
        ))}
        <motion.div
           animate={{ opacity: [0, 1, 0] }}
           transition={{ repeat: Infinity, duration: 0.8 }}
           className="w-3 h-5 bg-gray-300 inline-block align-middle ml-1"
        />
      </div>

      <div className="w-full max-w-4xl mx-auto mt-4 flex justify-between items-center border-t border-gray-800 pt-4">
          <div className="text-xs text-gray-600">yanyuqi@archlinux: ~/portfolio</div>
          <button
             onClick={onComplete}
             className="text-xs text-gray-500 hover:text-white hover:underline transition-colors"
          >
             [SKIP BOOT SEQUENCE]
          </button>
      </div>
    </div>
  );
};

export default TerminalIntro;
