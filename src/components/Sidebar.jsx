import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileCode, FileJson, FileText, Folder, File, Terminal } from 'lucide-react';

const FileIcon = ({ name }) => {
  if (name.endsWith('.tsx')) return <FileCode size={14} className="text-blue-400" />;
  if (name.endsWith('.json')) return <FileJson size={14} className="text-yellow-400" />;
  if (name.endsWith('.md')) return <FileText size={14} className="text-gray-400" />;
  if (name.endsWith('.py')) return <FileCode size={14} className="text-blue-300" />;
  if (name.endsWith('.log')) return <FileText size={14} className="text-green-400" />;
  return <File size={14} className="text-gray-400" />;
};

const FileItem = ({ name, active, onClick, depth = 0 }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-1.5 py-1 px-4 hover:bg-[#2d333b] cursor-pointer text-sm ${active ? 'bg-[#373e47] text-white' : 'text-gray-400'}`}
    style={{ paddingLeft: `${depth * 12 + 16}px` }}
  >
    <FileIcon name={name} />
    <span>{name}</span>
  </div>
);

const FolderItem = ({ name, children, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 py-1 px-4 hover:bg-[#2d333b] cursor-pointer text-gray-300 text-sm select-none"
        style={{ paddingLeft: `${depth * 12 + 10}px` }}
      >
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <Folder size={14} className="text-blue-300" />
        <span className="font-bold">{name}</span>
      </div>
      {isOpen && children}
    </div>
  );
};

const Sidebar = ({ activeFile, onFileSelect }) => {
  return (
    <div className="w-64 bg-[#0d1117] border-r border-[#30363d] flex flex-col h-full hidden md:flex">
      <div className="p-3 text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center justify-between">
        <span>Explorer</span>
        <Terminal size={12} />
      </div>

      <div className="flex-1 overflow-y-auto font-mono">
        <div className="px-2 py-1 text-xs font-bold text-blue-400">PORTFOLIO-V1</div>

        <FolderItem name="src">
           <FolderItem name="pages" depth={1}>
              <FileItem
                name="identity.tsx"
                active={activeFile === 'identity.tsx'}
                onClick={() => onFileSelect('identity.tsx')}
                depth={2}
              />
              <FileItem
                name="intro.md"
                active={activeFile === 'intro.md'}
                onClick={() => onFileSelect('intro.md')}
                depth={2}
              />
              <FileItem
                name="research.json"
                active={activeFile === 'research.json'}
                onClick={() => onFileSelect('research.json')}
                depth={2}
              />
              <FileItem
                name="awards.yaml"
                active={activeFile === 'awards.yaml'}
                onClick={() => onFileSelect('awards.yaml')}
                depth={2}
              />
              <FileItem
                name="experience.py"
                active={activeFile === 'experience.py'}
                onClick={() => onFileSelect('experience.py')}
                depth={2}
              />
              <FileItem
                name="volunteers.log"
                active={activeFile === 'volunteers.log'}
                onClick={() => onFileSelect('volunteers.log')}
                depth={2}
              />
           </FolderItem>
        </FolderItem>

        <FileItem
           name="README.md"
           active={activeFile === 'README.md'}
           onClick={() => onFileSelect('README.md')}
        />
        <FileItem
           name="package.json"
           active={activeFile === 'package.json'}
           onClick={() => onFileSelect('package.json')}
        />
      </div>
    </div>
  );
};

export default Sidebar;
