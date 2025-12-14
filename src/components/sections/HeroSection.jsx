import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ data, onUnlockRequest, isUnlocked, decryptedData }) => {
  return (
    <section id="hero" className="min-h-screen w-full flex flex-col items-center justify-center relative pointer-events-auto pt-20">
      <div className="text-center z-10 mix-blend-difference px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
            <h2 className="text-neon-yellow font-mono text-xs md:text-sm tracking-[0.3em] mb-6">
                ID_CHECK :: {isUnlocked ? "VERIFIED" : "PENDING"}
            </h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
        >
          {isUnlocked ? data.unlockedTitle : data.unlockedTitle}
          {/* Always show name "YAN YUQI" as per prompt requirement "3D identity element must always render the user's name in English... regardless of language".
              Actually, the JSON data has "unlockedTitle" as the Name.
              Let's respect the data, but ensuring it looks good.
          */}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center gap-6"
        >
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-neon-magenta to-transparent" />

            <p className="font-mono text-gray-300 text-sm md:text-base max-w-lg mx-auto leading-relaxed uppercase tracking-widest">
                {data.role}
            </p>

            {/* Verification Badge / Button */}
            {!isUnlocked && (
                <button
                    onClick={onUnlockRequest}
                    className="mt-8 group relative px-6 py-2 overflow-hidden border border-neon-green text-neon-green font-mono text-xs tracking-widest hover:text-black transition-colors"
                >
                    <span className="absolute inset-0 bg-neon-green translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 flex items-center gap-2">
                        <span className="w-2 h-2 bg-neon-green rounded-full group-hover:bg-black animate-pulse" />
                        {data.unlockBtn}
                    </span>
                </button>
            )}

            {isUnlocked && (
                <div className="mt-8 p-4 border border-gray-800 bg-black/50 backdrop-blur text-left font-mono text-xs">
                    <p className="text-gray-500 mb-1">Authenticated User Data:</p>
                    <div className="grid grid-cols-1 gap-2 text-neon-green">
                        <p>{decryptedData.email}</p>
                        <p>{decryptedData.phone}</p>
                    </div>
                </div>
            )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] text-gray-600 font-mono tracking-widest">SCROLL_DOWN</span>
        <div className="w-px h-12 bg-gradient-to-b from-neon-green to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
