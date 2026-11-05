import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, ExternalLink, Sparkles } from 'lucide-react';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  summary: string;
  shareUrl?: string;
  tags?: string[];
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  title,
  summary,
  shareUrl = window.location.href,
  tags = ['PrepForge', 'Coding', 'DSA', 'TechPlacement', 'aaryaninvincible'],
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(shareUrl);
  const shareText = `🚀 Preparing for tech interviews on PrepForge by aaryaninvincible! Check out: "${title}" - ${summary}`;
  const encodedText = encodeURIComponent(shareText);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20',
    },
    {
      name: 'Twitter / X',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${tags.join(',')}`,
      color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20',
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20',
    },
    {
      name: 'Telegram',
      icon: '✈️',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: 'bg-sky-500/10 text-sky-400 border-sky-500/30 hover:bg-sky-500/20',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#090912] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,242,254,0.15)] text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Share with Friends & Cohort</h3>
            <span className="text-xs text-gray-400">Spread the knowledge & challenge peers</span>
          </div>
        </div>

        {/* Content Card Preview */}
        <div className="my-4 p-3.5 rounded-xl bg-black/60 border border-white/10">
          <div className="text-xs font-semibold text-cyan-400 mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> {title}
          </div>
          <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">{summary}</p>
          <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
            <span>PrepForge Platform</span>
            <span className="text-gray-400 font-mono">by aaryaninvincible</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-2.5 my-4">
          {shareLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${item.color}`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
              <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
            </a>
          ))}
        </div>

        {/* Copy Link Direct */}
        <div className="relative mt-4">
          <div className="flex items-center justify-between p-2 pl-3 rounded-xl bg-black border border-white/10 text-xs">
            <span className="text-gray-400 truncate max-w-[260px] font-mono">{shareUrl}</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-extrabold hover:bg-cyan-400 transition-all flex items-center gap-1 shadow-md shadow-cyan-500/20"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
