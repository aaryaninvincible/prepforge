import React, { useState } from 'react';
import {
  ExternalLink, Maximize2, Minimize2, Copy, Check, Sparkles,
  Terminal, Code2, RefreshCw, Layers, CheckCircle2, Cpu
} from 'lucide-react';

interface JDoodleCompilerProps {
  initialLanguage?: 'universal' | 'python' | 'cpp' | 'java' | 'nodejs' | 'c';
  snippetToCopy?: string;
  problemTitle?: string;
}

export const JDoodleCompiler: React.FC<JDoodleCompilerProps> = ({
  initialLanguage = 'universal',
  snippetToCopy,
  problemTitle,
}) => {
  const [selectedLang, setSelectedLang] = useState<
    'universal' | 'python' | 'cpp' | 'java' | 'nodejs' | 'c'
  >(initialLanguage);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const languageEndpoints: Record<
    'universal' | 'python' | 'cpp' | 'java' | 'nodejs' | 'c',
    { name: string; url: string; badge: string; icon: string }
  > = {
    universal: {
      name: 'JDoodle Universal IDE',
      url: 'https://www.jdoodle.com/start-coding',
      badge: '80+ Languages',
      icon: '🌐',
    },
    python: {
      name: 'Python 3 Compiler',
      url: 'https://www.jdoodle.com/python3-programming-online/',
      badge: 'Python 3.x',
      icon: '🐍',
    },
    cpp: {
      name: 'C++ 20 / GCC Compiler',
      url: 'https://www.jdoodle.com/online-compiler-c++/',
      badge: 'C++ 20',
      icon: '⚡',
    },
    java: {
      name: 'Java (JDK 17) Compiler',
      url: 'https://www.jdoodle.com/online-java-compiler/',
      badge: 'JDK 17',
      icon: '☕',
    },
    nodejs: {
      name: 'Node.js / JS Compiler',
      url: 'https://www.jdoodle.com/execute-nodejs-online/',
      badge: 'Node 18+',
      icon: '🟨',
    },
    c: {
      name: 'C (GCC) Compiler',
      url: 'https://www.jdoodle.com/execute-c-online/',
      badge: 'GCC 11+',
      icon: '🔧',
    },
  };

  const currentEndpoint = languageEndpoints[selectedLang];

  const handleCopyCode = () => {
    if (snippetToCopy) {
      navigator.clipboard.writeText(snippetToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReloadIframe = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      className={`flex flex-col bg-[#07070d] rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-2 z-50 bg-[#000000] border-cyan-400 shadow-[0_0_80px_rgba(0,242,254,0.3)]'
          : 'h-[620px] md:h-[720px]'
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0a0a14] border-b border-white/10 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">{currentEndpoint.icon}</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white tracking-wide">
                  {currentEndpoint.name}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {currentEndpoint.badge}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                  LIVE CLOUD
                </span>
              </div>
              {problemTitle && (
                <span className="text-[11px] text-gray-400 truncate max-w-xs">
                  Coding: <strong className="text-cyan-300">{problemTitle}</strong>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Language selector buttons */}
        <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10 overflow-x-auto">
          {(
            [
              ['universal', 'Universal IDE (start-coding)'],
              ['python', 'Python 3'],
              ['cpp', 'C++'],
              ['java', 'Java'],
              ['nodejs', 'Node.js'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedLang(key)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedLang === key
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-extrabold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {snippetToCopy && (
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              title="Copy problem starter code to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Code Copied!' : 'Copy Code for JDoodle'}</span>
            </button>
          )}

          <button
            onClick={handleReloadIframe}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            title="Reload Compiler"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <a
            href={currentEndpoint.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-1"
            title="Open in new JDoodle window"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Helpful Instructions Ribbon */}
      <div className="px-4 py-2 bg-[#05050c] border-b border-white/5 flex items-center justify-between text-[11px] text-gray-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            Real cloud compiler powered by <strong>JDoodle</strong> with interactive STDIN, terminal output, compilation flags, and instant execution.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-gray-500">
          <span>Shortcuts: Press 'Execute' in JDoodle to run</span>
        </div>
      </div>

      {/* Embedded Iframe */}
      <div className="relative flex-1 w-full bg-[#1e1e1e]">
        <iframe
          key={`${selectedLang}-${iframeKey}`}
          src={currentEndpoint.url}
          title={currentEndpoint.name}
          className="w-full h-full border-0"
          allow="clipboard-read; clipboard-write; fullscreen"
          loading="lazy"
        />
      </div>
    </div>
  );
};
