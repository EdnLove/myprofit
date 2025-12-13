import React from 'react';
import { X } from 'lucide-react';

const TabIcon = ({ name }) => {
  if (name.endsWith('.tsx')) return <span className="text-blue-400 mr-1">TSX</span>;
  if (name.endsWith('.json')) return <span className="text-yellow-400 mr-1">{}</span>;
  if (name.endsWith('.md')) return <span className="text-gray-400 mr-1">MD</span>;
  if (name.endsWith('.py')) return <span className="text-blue-300 mr-1">PY</span>;
  return <span className="text-gray-400 mr-1">TXT</span>;
};

const TabManager = ({ openFiles, activeFile, onTabClick, onTabClose }) => {
  return (
    <div className="flex bg-[#010409] overflow-x-auto scrollbar-hide">
      {openFiles.map(file => (
        <div
          key={file}
          onClick={() => onTabClick(file)}
          className={`
            group flex items-center min-w-[120px] max-w-[200px] px-3 py-2 text-sm border-r border-[#30363d] cursor-pointer select-none font-mono
            ${activeFile === file ? 'bg-[#0d1117] text-white border-t-2 border-t-[#f78166]' : 'bg-[#21262d] text-gray-500 border-t-2 border-t-transparent hover:bg-[#2d333b]'}
          `}
        >
          <TabIcon name={file} />
          <span className="truncate flex-1">{file}</span>
          <button
             onClick={(e) => { e.stopPropagation(); onTabClose(file); }}
             className={`ml-2 opacity-0 group-hover:opacity-100 hover:bg-[#30363d] rounded p-0.5 ${activeFile === file ? 'opacity-100' : ''}`}
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TabManager;
