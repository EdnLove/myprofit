import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CryptoJS from 'crypto-js';

const TerminalModal = ({ onClose, onSuccess, isOpen }) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState(['> INITIALIZING SECURITY PROTOCOL...', '> ENTER PASSWORD TO DECRYPT IDENTITY:']);
  const [isShake, setIsShake] = useState(false);

  useEffect(() => {
    if (isOpen) {
        setLogs(['> INITIALIZING SECURITY PROTOCOL...', '> ENTER PASSWORD TO DECRYPT IDENTITY:']);
        setInput('');
    }
  }, [isOpen]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const password = input.trim();
      setLogs(prev => [...prev, `> ${password.replace(/./g, '*')}`]); // Masked input in log

      if (password === '123456') {
         setLogs(prev => [...prev, '> ACCESS GRANTED.', '> DECRYPTING DATA...']);
         setTimeout(() => {
             onSuccess(); // Notify parent that authentication passed
             onClose();
         }, 800);
      } else {
        setLogs(prev => [...prev, '> ACCESS DENIED.', '> INVALID PASSWORD.']);
        setIsShake(true);
        setTimeout(() => setIsShake(false), 500);
        setInput('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, x: isShake ? [0, -10, 10, -10, 10, 0] : 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-black border border-neon-green shadow-[0_0_20px_rgba(57,255,20,0.3)] font-mono p-1"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-neon-green/10 border-b border-neon-green/30">
            <span className="text-neon-green text-xs tracking-widest">ROOT_ACCESS // RESTRICTED</span>
            <button onClick={onClose} className="text-neon-green hover:text-white">X</button>
        </div>

        {/* Terminal Body */}
        <div className="p-6 h-64 overflow-y-auto flex flex-col font-mono text-sm">
            {logs.map((log, i) => (
                <div key={i} className={`${log.includes('DENIED') ? 'text-red-500' : 'text-neon-green'} mb-1`}>
                    {log}
                </div>
            ))}

            <div className="flex items-center mt-2 text-neon-green">
                <span className="mr-2">{`>`}</span>
                <input
                    type="password"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent border-none outline-none text-white w-full font-mono caret-neon-green"
                    autoFocus
                />
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TerminalModal;
