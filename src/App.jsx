import React, { useState, useEffect } from 'react';
import { resumeData } from './data/resumeData';
import Sidebar from './components/Sidebar';
import TabManager from './components/TabManager';
import EditorWindow from './components/EditorWindow';
import TerminalIntro from './components/TerminalIntro';
import VerificationModal from './components/VerificationModal';
import { Terminal, Settings, GitBranch, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CryptoJS from 'crypto-js';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [lang] = useState('en');
  const [activeFile, setActiveFile] = useState('README.md');
  const [openFiles, setOpenFiles] = useState(['README.md']);

  // Security State
  const [isLocked, setIsLocked] = useState(true);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [decryptedContacts, setDecryptedContacts] = useState({ phone: '', email: '' });

  const handleUnlock = () => {
    try {
        // Using '123456' as the password as per previous context
        const bytesPhone = CryptoJS.AES.decrypt(resumeData.cn.hero.phone, '123456');
        const bytesEmail = CryptoJS.AES.decrypt(resumeData.cn.hero.email, '123456');
        const phone = bytesPhone.toString(CryptoJS.enc.Utf8);
        const email = bytesEmail.toString(CryptoJS.enc.Utf8);

        if (phone && email) {
            setDecryptedContacts({ phone, email });
            setIsLocked(false);
            setShowUnlockModal(false);
        } else {
            alert('Decryption error');
        }
    } catch (e) {
        console.error("Decryption failed", e);
    }
  };

  const handleFileSelect = (file) => {
    if (!openFiles.includes(file)) {
      setOpenFiles([...openFiles, file]);
    }
    setActiveFile(file);
  };

  const handleTabClose = (file) => {
    const newOpen = openFiles.filter(f => f !== file);
    setOpenFiles(newOpen);
    if (activeFile === file && newOpen.length > 0) {
      setActiveFile(newOpen[newOpen.length - 1]);
    } else if (newOpen.length === 0) {
      setActiveFile(null);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100]">
             <TerminalIntro onComplete={() => setShowIntro(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-screen flex flex-col bg-[#0d1117] text-gray-300 overflow-hidden font-sans">

        {/* Top Status Bar (VS Code Style) */}
        <div className="h-8 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-3 select-none">
           <div className="flex items-center gap-4 text-xs">
              <span className="font-bold text-blue-400">File</span>
              <span>Edit</span>
              <span>Selection</span>
              <span>View</span>
              <span>Go</span>
              <span>Run</span>
              <span>Terminal</span>
              <span>Help</span>
           </div>
           <div className="text-xs text-gray-500 font-mono">
              Yan Yuqi - Portfolio Workspace
           </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex overflow-hidden">

           {/* Activity Bar (Leftmost icons) */}
           <div className="w-12 bg-[#0d1117] border-r border-[#30363d] flex flex-col items-center py-4 gap-6">
              <div className="p-2 cursor-pointer text-white border-l-2 border-[#f78166]"><Terminal size={24} /></div>
              <div className="p-2 cursor-pointer text-gray-500 hover:text-white"><GitBranch size={24} /></div>
              <div className="mt-auto p-2 cursor-pointer text-gray-500 hover:text-white"><Settings size={24} /></div>
           </div>

           {/* Sidebar (File Explorer) */}
           <Sidebar activeFile={activeFile} onFileSelect={handleFileSelect} />

           {/* Editor Area */}
           <div className="flex-1 flex flex-col min-w-0 bg-[#010409]">
              {openFiles.length > 0 ? (
                <>
                  <TabManager
                    openFiles={openFiles}
                    activeFile={activeFile}
                    onTabClick={setActiveFile}
                    onTabClose={handleTabClose}
                  />
                  <div className="flex-1 relative overflow-hidden">
                     {/* Breadcrumbs */}
                     <div className="h-6 bg-[#010409] flex items-center px-4 text-xs text-gray-500 border-b border-[#30363d]">
                        src &gt; pages &gt; {activeFile}
                     </div>

                     <EditorWindow
                        activeFile={activeFile}
                        data={resumeData}
                        lang={lang}
                        isLocked={isLocked}
                        onUnlock={() => setShowUnlockModal(true)}
                        decryptedContacts={decryptedContacts}
                     />
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                   <div className="mb-4 text-gray-700"><Terminal size={64} /></div>
                   <p>No files open</p>
                   <p className="text-xs mt-2">Open a file from the explorer to view details.</p>
                </div>
              )}
           </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="h-6 bg-[#161b22] border-t border-[#30363d] flex items-center justify-between px-3 text-[10px] select-none text-white">
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-1 bg-[#238636] px-2 h-full">
                  <GitBranch size={10} />
                  <span>main*</span>
               </div>
               <div className="flex items-center gap-1">
                  <span>0 errors</span>
                  <span>0 warnings</span>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex gap-2">
                 <span className="text-white">ENG</span>
               </div>
               <span>Ln 1, Col 1</span>
               <span>UTF-8</span>
               <span>JavaScript React</span>
               <Bell size={10} />
            </div>
        </div>

      </div>

      <VerificationModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        onUnlock={handleUnlock}
        lang={lang}
      />
    </>
  );
}

export default App;
