import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Terminal, ShieldAlert } from 'lucide-react';

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
      setPassword('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm font-mono"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#0c0c0c] border border-green-500/50 p-6 w-full max-w-md shadow-[0_0_20px_rgba(34,197,94,0.2)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between mb-6 border-b border-green-500/20 pb-2">
                <div className="flex items-center gap-2 text-green-500 text-sm">
                    <Terminal size={14} />
                    <span>sudo access required</span>
                </div>
                <button onClick={onClose} className="text-green-700 hover:text-green-400">
                    <X size={16} />
                </button>
            </div>

            <div className="space-y-4">
              <div className="text-gray-300 text-sm">
                <p className="mb-2">
                    <span className="text-green-500">root@system:~#</span> access_secure_data --target=contact_info
                </p>
                <p className="text-red-400 flex items-center gap-2">
                    <ShieldAlert size={14} />
                    PERMISSION DENIED. ELEVATED PRIVILEGES REQUIRED.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6">
                <div className="relative">
                    <span className="text-green-500 absolute left-3 top-3 text-sm">[sudo] password for yanyuqi:</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full bg-[#161b22] border ${error ? 'border-red-500' : 'border-gray-700'} p-3 pl-[240px] text-white focus:outline-none focus:border-green-500 text-sm font-mono`}
                        autoFocus
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-xs mt-2">
                        Sorry, try again.
                    </p>
                )}

                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        className="bg-green-600/20 text-green-500 border border-green-500/50 px-4 py-2 text-xs hover:bg-green-600/30 transition-colors uppercase tracking-wider"
                    >
                        Authenticate
                    </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VerificationModal;
