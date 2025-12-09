import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Key } from 'lucide-react';

const VerificationModal = ({ isOpen, onClose, onUnlock, lang }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '123456') {
      onUnlock();
      onClose();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1a1a1a] border border-white/20 p-8 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glossy header effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Lock className="text-blue-400" size={32} />
              </div>

              <h2 className="text-2xl font-bold text-white tracking-wide">
                {lang === 'cn' ? '身份验证' : 'Identity Verification'}
              </h2>

              <p className="text-gray-400 text-center text-sm">
                {lang === 'cn'
                  ? '请输入访问密码以查看敏感信息'
                  : 'Please enter access code to view private info'}
              </p>

              <form onSubmit={handleSubmit} className="w-full relative">
                <div className="relative">
                    <Key className="absolute left-3 top-3 text-gray-500" size={20} />
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                    className={`w-full bg-black/40 border ${error ? 'border-red-500' : 'border-white/20'} rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-all text-center tracking-[0.5em] text-lg`}
                    autoFocus
                    maxLength={6}
                    />
                </div>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-2 text-center absolute -bottom-6 w-full"
                    >
                        {lang === 'cn' ? '密码错误 (提示: 123456)' : 'Access Denied (Hint: 123456)'}
                    </motion.p>
                )}

                <button
                  type="submit"
                  className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {lang === 'cn' ? '解锁' : 'UNLOCK'}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VerificationModal;
