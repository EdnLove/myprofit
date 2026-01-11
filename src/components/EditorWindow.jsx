import React from 'react';
import IdentityScene from './IdentityScene';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Helper to generate content string based on data
const generateContent = (file, data, lang) => {
  const t = data[lang];

  if (file === 'research.json') {
    return JSON.stringify(t.research, null, 2);
  }

  if (file === 'projects.json') {
    return JSON.stringify(t.projects || [], null, 2);
  }

  if (file === 'ip.md') {
    const items = (t.intellectualProperty || []).map((item) => `- ${item}`).join('\n');
    const title = lang === 'cn' ? '知识产权与成果' : 'Intellectual Property';
    const empty = lang === 'cn' ? '- 暂无数据' : '- No data available';
    return `# ${title}\n\n${items || empty}`;
  }

  if (file === 'awards.yaml') {
    let content = `# Awards & Competitions\n\n`;
    content += `National:\n`;
    t.competitions.national.forEach(c => content += `  - ${c}\n`);
    content += `\nProvincial:\n`;
    t.competitions.provincial.forEach(c => content += `  - ${c}\n`);
    content += `\nSchool:\n`;
    t.competitions.school.forEach(c => content += `  - ${c}\n`);
    return content;
  }

  if (file === 'experience.py') {
    let content = `class Experience:\n`;
    t.work.forEach((w, i) => {
      const title = w.title.replace(/[\(\)]/g, '').replace(/ /g, '_');
      content += `    def ${title}(self):\n`;
      content += `        """\n        ${w.desc}\n        """\n        pass\n\n`;
    });
    return content;
  }

  if (file === 'intro.md' || file === 'README.md') {
    if (lang === 'cn') {
      const education = (t.education || [])
        .map((item) => (
          `- ${item.school}${item.minor ? `｜${item.minor}` : ''}\n` +
          `  - 主修课程：${item.courses}\n` +
          `  - 学业成绩：${item.gpa}\n` +
          `  - 奖项荣誉：${item.honors.join('、')}`
        ))
        .join('\n');
      const skills = (t.skills || []).map((item) => `- ${item}`).join('\n');
      const work = (t.work || []).map((item) => `- ${item.title}\n  - ${item.desc}`).join('\n');
      const projects = (t.projects || t.research || [])
        .map((item) => `- ${item.title}（${item.period}）\n  - ${item.desc}`)
        .join('\n');
      const ip = (t.intellectualProperty || []).map((item) => `- ${item}`).join('\n');
      const orgs = (t.organizations || []).map((item) => `- ${item}`).join('\n');
      const selfEval = (t.selfEvaluation || []).map((item) => `- ${item}`).join('\n');

      return [
        `# ${t.sections.intro}`,
        ``,
        t.introText,
        ``,
        `## 基本信息`,
        `- 姓名：${t.basicInfo.name}`,
        `- 方向：${t.basicInfo.direction}`,
        `- 性别：${t.basicInfo.gender}`,
        `- 邮箱：${t.basicInfo.email}`,
        ``,
        `## 教育背景`,
        education,
        ``,
        `## 技术能力`,
        skills,
        ``,
        `## 工作 / 实习经历`,
        work,
        ``,
        `## 科研与项目经历`,
        projects,
        ``,
        `## 知识产权与成果`,
        ip,
        ``,
        `## 组织与实践经历`,
        orgs,
        ``,
        `## 自我评价`,
        selfEval
      ].filter(Boolean).join('\n');
    }

    return `# ${t.sections.intro}\n\n${t.introText}\n\n## Basic Info\n- Major: ${t.basicInfo.major}\n- GPA: ${t.basicInfo.gpa}\n- Honors: ${t.basicInfo.honors.join(', ')}`;
  }

  if (file === 'volunteers.log') {
    return t.volunteers.map(v => `[LOG] ${v}`).join('\n');
  }

  if (file === 'package.json') {
    return JSON.stringify({
      "name": "yan-yuqi-portfolio",
      "version": "1.0.0",
      "rank": 3,
      "total_students": 94,
      "dependencies": {
        "react": "^18.0.0",
        "three": "^0.160.0",
        "network-engineering": "expert",
        "rag-research": "active"
      }
    }, null, 2);
  }

  return "// No content";
};

const EditorWindow = ({ activeFile, data, lang, isLocked, onUnlock, decryptedContacts }) => {
  if (activeFile === 'identity.tsx') {
    return (
      <div className="w-full h-full relative bg-[#0d1117] flex flex-col">
        <div className="absolute top-4 left-4 z-10 text-xs text-gray-500 font-mono">
           // Drag to rotate. Unlock to see contact info.
        </div>
        <div className="flex-1">
           <IdentityScene isLocked={isLocked} />
        </div>
        <div className="p-8 border-t border-[#30363d] bg-[#0d1117]/90">
             <div className="max-w-4xl mx-auto">
                 <h1 className="text-3xl font-bold text-white mb-4">
                    {isLocked ? <span className="text-red-500">{data[lang].hero.lockedTitle}</span> : data[lang].hero.unlockedTitle}
                 </h1>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm">
                    <div className="space-y-2">
                        <div className="text-gray-500">// Contact Information</div>
                        <div className="flex items-center gap-2">
                            <span className="text-pink-400">const</span>
                            <span className="text-blue-300">phone</span> =
                            <span className="text-yellow-300">"{isLocked ? '****************' : decryptedContacts.phone}"</span>;
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-pink-400">const</span>
                            <span className="text-blue-300">email</span> =
                            <span className="text-yellow-300">"{isLocked ? '****************' : decryptedContacts.email}"</span>;
                        </div>
                    </div>

                    {isLocked && (
                        <div className="flex items-center justify-center md:justify-end">
                            <button
                                onClick={onUnlock}
                                className="bg-[#238636] hover:bg-[#2ea043] text-white px-6 py-2 rounded font-bold transition-colors shadow-lg shadow-green-900/20 border border-[rgba(255,255,255,0.1)]"
                            >
                                {data[lang].hero.unlockBtn}
                            </button>
                        </div>
                    )}
                 </div>
             </div>
        </div>
      </div>
    );
  }

  const content = generateContent(activeFile, data, lang);
  const language = activeFile.endsWith('.json') ? 'json' :
                   activeFile.endsWith('.py') ? 'python' :
                   activeFile.endsWith('.md') ? 'markdown' :
                   activeFile.endsWith('.yaml') ? 'yaml' : 'text';

  return (
    <div className="w-full h-full overflow-auto bg-[#1e1e1e] text-sm">
       <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{ margin: 0, padding: '2rem', height: '100%', background: 'transparent' }}
          showLineNumbers={true}
       >
          {content}
       </SyntaxHighlighter>
    </div>
  );
};

export default EditorWindow;
