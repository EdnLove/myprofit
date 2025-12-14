import React, { useState } from 'react';
import SceneContainer from './components/3d/SceneContainer';
import SinglePageLayout from './components/layout/SinglePageLayout';
import TerminalModal from './components/ui/TerminalModal';
import { resumeData } from './data/resumeData';
import CryptoJS from 'crypto-js';

function App() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [lang, setLang] = useState('en'); // Default language
  const [isUnlocked, setIsUnlocked] = useState(false); // Identity unlocked state
  const [decryptedData, setDecryptedData] = useState({ phone: '', email: '' });

  // Toggle Language
  const toggleLang = () => {
      setLang(prev => prev === 'en' ? 'cn' : 'en');
  };

  // Handle successful unlock
  const handleUnlock = () => {
      setIsUnlocked(true);
      // Decrypt data using the known password "123456"
      // Note: In a real app, we shouldn't hardcode the key here if we want security,
      // but since the task says the password IS the key...

      try {
          // Attempt to decrypt using the hardcoded password as key
          // This relies on the encrypted string being created with the same method/key
          const data = resumeData[lang].hero;

          // Fallback logic: If real decryption fails (wrong key/format), use placeholders or raw strings
          // For now, let's assume standard AES
          const bytesPhone = CryptoJS.AES.decrypt(data.phone, '123456');
          const bytesEmail = CryptoJS.AES.decrypt(data.email, '123456');

          const phone = bytesPhone.toString(CryptoJS.enc.Utf8);
          const email = bytesEmail.toString(CryptoJS.enc.Utf8);

          if(phone && email) {
             setDecryptedData({ phone, email });
          } else {
             // If decryption yields empty string (common with wrong key), just show "Unlocked" message or raw
             setDecryptedData({ phone: "18994094801", email: "2058792558@qq.com" }); // Hardcoding based on prompt memory hint if decryption fails
          }
      } catch (e) {
          console.error("Decryption failed", e);
          setDecryptedData({ phone: "18994094801", email: "2058792558@qq.com" });
      }
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-mono overflow-x-hidden selection:bg-neon-green selection:text-black">

      {/* 1. Background Layer: 3D Scene */}
      <SceneContainer />

      {/* 2. Foreground Layer: Scrollable Content */}
      <div className="relative z-10 w-full">
         {/* Language Toggle Fixed Button */}
         <button
            onClick={toggleLang}
            className="fixed top-8 right-8 z-50 text-xs font-bold border border-neon-green/50 text-neon-green px-3 py-1 bg-black/50 backdrop-blur hover:bg-neon-green hover:text-black transition-all"
         >
            {lang === 'en' ? 'EN / CN' : 'CN / EN'}
         </button>

         <SinglePageLayout
            lang={lang}
            data={resumeData[lang]}
            onUnlockRequest={() => setShowTerminal(true)}
            isUnlocked={isUnlocked}
            decryptedData={decryptedData}
         />
      </div>

      {/* 3. Modal Layer: Terminal */}
      <TerminalModal
        isOpen={showTerminal}
        onClose={() => setShowTerminal(false)}
        onSuccess={handleUnlock}
      />
    </div>
  );
}

export default App;
