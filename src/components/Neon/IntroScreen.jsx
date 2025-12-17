import React, { useState, useEffect, useRef } from 'react';
import { SkipForward } from 'lucide-react';

/**
 * INTRO SCREEN COMPONENT
 * 升级版：双阶段启动动画（中途清屏），更具仪式感
 */
const IntroScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef(null);

  // Use a ref to track if the USER explicitly skipped.
  // This ref persists across renders.
  const userSkippedRef = useRef(false);

  // 第一阶段：底层系统启动
  const bootPhase1 = [
    { text: "BIOS Check... OK", delay: 100 },
    { text: "Loading Kernel 5.15.0-generic...", delay: 200 },
    { text: "Mounting /dev/sda1 to /root...", delay: 150 },
    { text: "Checking file systems... [Clean]", delay: 300 },
    { text: "[ OK ] Reached Target: Graphical Interface.", delay: 600 },
  ];

  // 第二阶段：应用层加载
  const bootPhase2 = [
    { text: "Loading 'Yan_Yuqi_Portfolio_v2.0'...", delay: 300 },
    { text: "Initializing Neural Link...", delay: 300 },
    { text: "[WARN] Coffee levels critical. Proceeding anyway.", delay: 500 },
    { text: "Accessing Mainframe...", delay: 400 },
    { text: "Decrypting User Data... [Done]", delay: 200 },
    { text: "Welcome, User.", delay: 800 },
  ];

  useEffect(() => {
    let isMounted = true;

    // 模拟逐字输入的辅助函数
    const typeLine = async (lineData, id) => {
        // Stop if unmounted OR user clicked skip
        if (!isMounted || userSkippedRef.current) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) + "." + Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0');

        setLines(prev => [...prev, { id, time: timeString, text: "" }]);

        const chars = lineData.text.split("");
        let currentText = "";

        for (const char of chars) {
          if (!isMounted || userSkippedRef.current) break;
          currentText += char;

          setLines(prev => {
            const newLines = [...prev];
            const idx = newLines.findIndex(l => l.id === id);
            if (idx !== -1) {
                newLines[idx].text = currentText;
            }
            return newLines;
          });

          await new Promise(r => setTimeout(r, Math.random() * 20 + 10));
        }

        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const runSequence = async () => {
      // === PHASE 1: SYSTEM BOOT ===
      for (let i = 0; i < bootPhase1.length; i++) {
        if (!isMounted || userSkippedRef.current) break;
        await typeLine(bootPhase1[i], `p1-${i}`);
        // 进度条前半段 (0-45%)
        setProgress(prev => Math.min(prev + (45 / bootPhase1.length), 45));
        await new Promise(r => setTimeout(r, bootPhase1[i].delay));
      }

      // Check strictly for USER SKIP to call callback immediately
      if (userSkippedRef.current) {
        if (isMounted) onComplete();
        return;
      }

      // If simply unmounted, stop.
      if (!isMounted) return;

      // === CLEAR SCREEN (清屏效果) ===
      await new Promise(r => setTimeout(r, 600));
      if (!isMounted || userSkippedRef.current) {
         if (userSkippedRef.current && isMounted) onComplete();
         return;
      }

      setLines([]); // 瞬间清空所有日志
      await new Promise(r => setTimeout(r, 400));

      // === PHASE 2: APP INIT ===
      for (let i = 0; i < bootPhase2.length; i++) {
        if (!isMounted || userSkippedRef.current) break;
        await typeLine(bootPhase2[i], `p2-${i}`);
        // 进度条后半段 (45-100%)
        setProgress(prev => Math.min(prev + (55 / bootPhase2.length), 100));
        await new Promise(r => setTimeout(r, bootPhase2[i].delay));
      }

      if (userSkippedRef.current) {
         if (isMounted) onComplete();
      } else {
         if (isMounted) setTimeout(onComplete, 500);
      }
    };

    runSequence();

    return () => {
        // Cleanup: just mark as unmounted.
        // Do NOT set userSkippedRef.current = true.
        isMounted = false;
    };
  }, [onComplete]);

  const handleSkip = () => {
    userSkippedRef.current = true;
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center font-mono text-[#ccff00] p-4 md:p-8">
      {/* 右上角跳过按钮 */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 flex items-center gap-2 text-xs md:text-sm text-gray-500 hover:text-[#ccff00] transition-colors border border-transparent hover:border-[#ccff00] px-4 py-2 rounded z-50"
      >
        SKIP_BOOT <SkipForward size={14} />
      </button>

      {/* 沉浸式终端容器 */}
      <div className="w-full max-w-4xl relative">
        <div
            ref={scrollRef}
            className="space-y-2 text-sm md:text-lg font-mono h-[400px] overflow-y-auto no-scrollbar"
        >
          {lines.map((line) => (
            <div key={line.id} className="flex gap-4 animate-slide-up">
              <span className="text-gray-600 select-none shrink-0 font-light">[{line.time}]</span>
              <span className="terminal-text text-gray-300">
                {line.text.startsWith('[ OK ]') ? (
                    <>
                        <span className="text-green-500 font-bold">[ OK ]</span>
                        {line.text.substring(6)}
                    </>
                ) : line.text.startsWith('[WARN]') ? (
                    <>
                        <span className="text-yellow-500 font-bold">[WARN]</span>
                        {line.text.substring(6)}
                    </>
                ) : (
                    line.text
                )}
              </span>
            </div>
          ))}
          {/* 闪烁光标 */}
          <div className="animate-cursor inline-block w-3 h-5 bg-[#ccff00] align-middle ml-1 shadow-[0_0_8px_#ccff00]"></div>
        </div>

        {/* 底部进度条 */}
        <div className="mt-8 pt-4">
            <div className="h-0.5 w-full bg-gray-900 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#ccff00] transition-all duration-200 ease-linear shadow-[0_0_15px_#ccff00]"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="flex justify-end text-xs text-gray-600 mt-2 font-mono">
                {progress < 45 ? 'SYSTEM BOOT...' : progress < 100 ? 'LOADING MODULES...' : 'READY'} {Math.round(progress)}%
            </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
