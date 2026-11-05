import React, { useState, useEffect } from 'react';
import {
  Code2, BookOpen, Trophy, FileSpreadsheet, Sparkles, Terminal,
  CheckCircle2, Flame, Award, Share2, Heart, ExternalLink, Play,
  RotateCcw, Search, Filter, Layers, Brain, Check, Copy, ArrowRight,
  ShieldCheck, User, LogIn, LogOut, ChevronRight, Star, AlertCircle,
  HelpCircle, Laptop, Cpu, Database
} from 'lucide-react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { CodeCompiler } from './components/CodeCompiler';
import { GlobalLeaderboard } from './components/GlobalLeaderboard';
import { SheetManager } from './components/SheetManager';
import { SocialShareModal } from './components/SocialShareModal';
import { JDoodleCompiler } from './components/JDoodleCompiler';
import { CURRICULUM_TOPICS, CurriculumTopic } from './data/curriculumData';
import { PLATFORM_PROBLEMS, PlatformCodingProblem } from './data/codingProblems';
import { MILESTONE_QUIZZES, MilestoneQuiz } from './data/milestoneQuizzes';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'sheet' | 'learn' | 'compiler' | 'jdoodle' | 'quizzes' | 'leaderboard'>('sheet');
  const [jdoodleInitialSnippet, setJdoodleInitialSnippet] = useState<string>('');
  const [jdoodleInitialTitle, setJdoodleInitialTitle] = useState<string>('');

  // User Profile & Gamification State
  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
    isLoggedIn: boolean;
    xp: number;
    streakDays: number;
    problemsSolved: number;
    quizzesCompleted: number;
    bookmarkedTopics: string[];
    likedTopics: string[];
  }>(() => {
    const saved = localStorage.getItem('prepforge_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      name: 'CoderBhai',
      email: 'student@prepforge.io',
      isLoggedIn: true,
      xp: 650,
      streakDays: 4,
      problemsSolved: 6,
      quizzesCompleted: 2,
      bookmarkedTopics: ['topic-1'],
      likedTopics: ['topic-1', 'topic-4'],
    };
  });

  // Save user profile changes
  useEffect(() => {
    localStorage.setItem('prepforge_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Selected Topic in Learn View
  const [selectedTopicId, setSelectedTopicId] = useState<string>('topic-1');
  const [topicLangMode, setTopicLangMode] = useState<'bhai' | 'english'>('bhai');

  // Selected Problem in Compiler View
  const [selectedProblemId, setSelectedProblemId] = useState<string>('prob-2');

  // Milestone Quiz Runner State
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Social Share Modal State
  const [shareModalConfig, setShareModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    summary: string;
  }>({
    isOpen: false,
    title: '',
    summary: '',
  });

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add XP and trigger milestone confetti
  const addXp = (amount: number, reason: string) => {
    setUserProfile((prev) => ({
      ...prev,
      xp: prev.xp + amount,
    }));
    showToast(`+${amount} XP! ${reason}`);
  };

  const handleProblemSolved = (probId: string, earnedXp: number) => {
    setUserProfile((prev) => ({
      ...prev,
      xp: prev.xp + earnedXp,
      problemsSolved: prev.problemsSolved + 1,
    }));
    showToast(`🔥 Problem Solved! +${earnedXp} XP Awarded!`);
  };

  const toggleTopicLike = (id: string) => {
    setUserProfile((prev) => {
      const alreadyLiked = prev.likedTopics.includes(id);
      const updated = alreadyLiked
        ? prev.likedTopics.filter((t) => t !== id)
        : [...prev.likedTopics, id];
      if (!alreadyLiked) {
        showToast('Liked! Added to favorites ❤️');
      }
      return { ...prev, likedTopics: updated };
    });
  };

  const toggleTopicBookmark = (id: string) => {
    setUserProfile((prev) => {
      const alreadyBookmarked = prev.bookmarkedTopics.includes(id);
      const updated = alreadyBookmarked
        ? prev.bookmarkedTopics.filter((t) => t !== id)
        : [...prev.bookmarkedTopics, id];
      showToast(alreadyBookmarked ? 'Bookmark removed' : 'Topic bookmarked! 📌');
      return { ...prev, bookmarkedTopics: updated };
    });
  };

  // Quiz submission handler
  const handleQuizSubmit = (quiz: MilestoneQuiz) => {
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);

    const xpEarned = score * 25 + (score === quiz.questions.length ? 100 : 0);
    setUserProfile((prev) => ({
      ...prev,
      xp: prev.xp + xpEarned,
      quizzesCompleted: prev.quizzesCompleted + 1,
    }));

    if (score >= Math.ceil(quiz.questions.length * 0.7)) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00f2fe', '#f59e0b', '#10b981'],
        });
      } catch {}
    }
  };

  // Active topic & problem objects
  const currentTopic =
    CURRICULUM_TOPICS.find((t) => t.id === selectedTopicId) || CURRICULUM_TOPICS[0];
  const currentProblem =
    PLATFORM_PROBLEMS.find((p) => p.id === selectedProblemId) || PLATFORM_PROBLEMS[0];
  const currentQuiz =
    MILESTONE_QUIZZES.find((q) => q.id === activeQuizId) || MILESTONE_QUIZZES[0];

  const userLevel = Math.max(1, Math.floor(userProfile.xp / 250) + 1);

  return (
    <div className="min-h-screen bg-[#000000] text-gray-100 flex flex-col font-sans relative selection:bg-cyan-500 selection:text-black">
      {/* Signature Particle Canvas */}
      <ParticleCanvas />

      {/* Cyber Subtle Grid Texture */}
      <div className="fixed inset-0 pointer-events-none cyber-grid-bg opacity-40 z-0" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs flex items-center gap-2 shadow-[0_0_30px_rgba(0,242,254,0.4)] animate-slide-up">
          <Sparkles className="w-4 h-4 fill-black" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#000000]/90 backdrop-blur-xl border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Creator Badge */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => setActiveTab('sheet')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-purple-600 p-0.5 shadow-[0_0_20px_rgba(0,242,254,0.35)] group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-white font-sans">
                    Prep<span className="text-cyan-400">Forge</span>
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    PRO
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 flex items-center gap-1 font-mono">
                  <span>Built by</span>
                  <span className="text-amber-400 font-bold hover:underline">aaryaninvincible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#090912] p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('sheet')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'sheet'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sheet & Roadmap</span>
            </button>

            <button
              onClick={() => setActiveTab('learn')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'learn'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Learn (Bhai Mode)</span>
            </button>

            <button
              onClick={() => setActiveTab('compiler')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'compiler'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Practice & Solve</span>
            </button>

            <button
              onClick={() => {
                setJdoodleInitialSnippet('');
                setJdoodleInitialTitle('Free Practice Arena');
                setActiveTab('jdoodle');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'jdoodle'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-black shadow-md font-extrabold'
                  : 'text-cyan-300 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>JDoodle Compiler</span>
              <span className="px-1 py-0.2 rounded text-[9px] bg-black/40 text-cyan-200 font-mono">LIVE</span>
            </button>

            <button
              onClick={() => setActiveTab('quizzes')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'quizzes'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>Quizzes (10-Topic)</span>
            </button>

            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'leaderboard'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>Leaderboard</span>
            </button>
          </nav>

          {/* Right Action: User XP, Streak, Level & Auth */}
          <div className="flex items-center gap-3">
            {/* Streak */}
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold"
              title={`${userProfile.streakDays} Day Grind Streak`}
            >
              <Flame className="w-4 h-4 fill-rose-500" />
              <span>{userProfile.streakDays}d</span>
            </div>

            {/* XP Points */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono font-bold"
              title="Experience Points"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{userProfile.xp} XP</span>
            </div>

            {/* User Level Profile Pill */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0d0d18] border border-white/10 hover:border-cyan-500/40 transition-all text-xs"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-black font-extrabold text-[10px]">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-semibold text-white max-w-[80px] truncate hidden sm:inline">
                {userProfile.name}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                L{userLevel}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around pt-3 mt-2 border-t border-white/5 text-[11px] font-bold">
          <button
            onClick={() => setActiveTab('sheet')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'sheet' ? 'text-cyan-400' : 'text-gray-400'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Sheet</span>
          </button>
          <button
            onClick={() => setActiveTab('learn')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'learn' ? 'text-cyan-400' : 'text-gray-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Learn</span>
          </button>
          <button
            onClick={() => setActiveTab('compiler')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'compiler' ? 'text-cyan-400' : 'text-gray-400'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Practice</span>
          </button>
          <button
            onClick={() => {
              setJdoodleInitialSnippet('');
              setJdoodleInitialTitle('Free Practice Arena');
              setActiveTab('jdoodle');
            }}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'jdoodle' ? 'text-cyan-400 font-bold' : 'text-cyan-300'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>JDoodle</span>
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'quizzes' ? 'text-cyan-400' : 'text-gray-400'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Quiz</span>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'leaderboard' ? 'text-cyan-400' : 'text-gray-400'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Ranks</span>
          </button>
        </div>
      </header>

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 relative z-10">
        {/* ======================================================== */}
        {/* VIEW 1: GOOGLE SHEET & MASTER ROADMAP MIRROR */}
        {/* ======================================================== */}
        {activeTab === 'sheet' && (
          <SheetManager
            onTaskCompleted={(taskId, xp) => addXp(xp, 'Roadmap Milestone Achieved!')}
          />
        )}

        {/* ======================================================== */}
        {/* VIEW 2: LEARN TOPICS (BHAI LANGUAGE + ENGLISH DUAL MODE) */}
        {/* ======================================================== */}
        {activeTab === 'learn' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            {/* Left Sidebar: Topics List */}
            <div className="lg:col-span-4 space-y-3">
              <div className="p-4 rounded-xl bg-[#090912] border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" /> Syllabus Topics
                  </h3>
                  <span className="text-[11px] text-gray-500 font-mono">
                    {CURRICULUM_TOPICS.length} Modules
                  </span>
                </div>
                <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
                  {CURRICULUM_TOPICS.map((topic) => {
                    const isSelected = topic.id === selectedTopicId;
                    const isBookmarked = userProfile.bookmarkedTopics.includes(topic.id);
                    return (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopicId(topic.id)}
                        className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/10 border border-cyan-500/40 text-white shadow-md'
                            : 'bg-black/40 hover:bg-white/[0.03] text-gray-300 border border-white/5'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-white/5 text-gray-400">
                              #{topic.order}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-cyan-500/10 text-cyan-300">
                              {topic.track}
                            </span>
                          </div>
                          <div className="font-bold text-xs leading-snug line-clamp-1">
                            {topic.title}
                          </div>
                          <span className="text-[10px] text-gray-500 mt-1 block">
                            ⏱️ {topic.estimatedMinutes} mins • {topic.difficulty}
                          </span>
                        </div>
                        {isBookmarked && (
                          <span className="text-amber-400 text-xs">📌</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Main Panel: Topic Explanation */}
            <div className="lg:col-span-8 space-y-5">
              {/* Top Banner with Toggle: Bhai vs English */}
              <div className="p-6 rounded-2xl bg-[#080810] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {currentTopic.track}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-300">
                      Module {currentTopic.order}
                    </span>
                  </div>
                  <h1 className="text-2xl font-black text-white">{currentTopic.title}</h1>
                </div>

                {/* Bhai Mode vs Formal English Switcher */}
                <div className="flex items-center gap-2 bg-black p-1 rounded-xl border border-white/10 self-start sm:self-auto">
                  <button
                    onClick={() => setTopicLangMode('bhai')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                      topicLangMode === 'bhai'
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-black shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>🚀 Bhai's Take (Hinglish)</span>
                  </button>
                  <button
                    onClick={() => setTopicLangMode('english')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      topicLangMode === 'english'
                        ? 'bg-cyan-500 text-black shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>📘 Formal English</span>
                  </button>
                </div>
              </div>

              {/* ACTION BAR: Likes, Bookmarks, Share, Practice */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleTopicLike(currentTopic.id)}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-semibold ${
                      userProfile.likedTopics.includes(currentTopic.id)
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        userProfile.likedTopics.includes(currentTopic.id)
                          ? 'fill-rose-500 text-rose-500'
                          : ''
                      }`}
                    />
                    <span>{currentTopic.likes + (userProfile.likedTopics.includes(currentTopic.id) ? 1 : 0)}</span>
                  </button>

                  <button
                    onClick={() => toggleTopicBookmark(currentTopic.id)}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-semibold ${
                      userProfile.bookmarkedTopics.includes(currentTopic.id)
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        userProfile.bookmarkedTopics.includes(currentTopic.id)
                          ? 'fill-amber-400 text-amber-400'
                          : ''
                      }`}
                    />
                    <span>Bookmark</span>
                  </button>

                  <button
                    onClick={() =>
                      setShareModalConfig({
                        isOpen: true,
                        title: currentTopic.title,
                        summary: currentTopic.english.summary,
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-1.5 font-semibold"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setJdoodleInitialSnippet(currentTopic.english.codeSnippet);
                      setJdoodleInitialTitle(currentTopic.title);
                      setActiveTab('jdoodle');
                      showToast('Code loaded for JDoodle Compiler! ⚡');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-extrabold transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Run in JDoodle</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('compiler')}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 font-bold transition-all flex items-center gap-1.5"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Practice & Solve</span>
                  </button>
                </div>
              </div>

              {/* CONTENT BODY: BHAI LANGUAGE MODE */}
              {topicLangMode === 'bhai' && (
                <div className="space-y-4 animate-fade-in font-sans">
                  {/* Headline Callout */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border border-amber-500/30">
                    <div className="text-xs uppercase tracking-wider font-extrabold text-amber-400 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Seedhi Baat No Bakwaas
                    </div>
                    <p className="text-base md:text-lg font-extrabold text-amber-100">
                      "{currentTopic.bhaiLanguage.headline}"
                    </p>
                  </div>

                  {/* Intuition Breakdown */}
                  <div className="p-6 rounded-2xl bg-[#090912] border border-white/5 space-y-4">
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      ☕ Chai Pe Charcha (Asli Intuition)
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                      {currentTopic.bhaiLanguage.intuition}
                    </p>
                  </div>

                  {/* Mast Analogy */}
                  <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2">
                    <h4 className="font-bold text-purple-300 text-sm flex items-center gap-1.5">
                      🍕 Mast Real-Life Analogy
                    </h4>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                      {currentTopic.bhaiLanguage.mastAnalogy}
                    </p>
                  </div>

                  {/* Trap Alert */}
                  <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2">
                    <h4 className="font-bold text-rose-300 text-sm flex items-center gap-1.5">
                      ⚠️ Trap Alert! (Ye Galti Bilkul Mat Karna Bhai)
                    </h4>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                      {currentTopic.bhaiLanguage.trapAlert}
                    </p>
                  </div>

                  {/* Interviewer Hack */}
                  <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
                    <h4 className="font-bold text-cyan-300 text-sm flex items-center gap-1.5">
                      🎯 Interviewer Ke Saamne Kya Bolna Hai (Pro Tip)
                    </h4>
                    <p className="text-cyan-100 text-xs md:text-sm font-mono leading-relaxed bg-black/40 p-3 rounded-xl border border-cyan-500/20">
                      "{currentTopic.bhaiLanguage.interviewerHack}"
                    </p>
                  </div>

                  {/* Code snippet with output */}
                  <div className="rounded-2xl border border-white/10 bg-[#050508] overflow-hidden">
                    <div className="px-4 py-2.5 bg-[#0a0a14] border-b border-white/10 flex items-center justify-between text-xs">
                      <span className="font-mono text-gray-400">Executable Example</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(currentTopic.english.codeSnippet);
                          showToast('Code copied to clipboard!');
                        }}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto">
                      {currentTopic.english.codeSnippet}
                    </pre>
                    <div className="p-3 bg-black border-t border-white/5 font-mono text-xs text-gray-400">
                      <span className="text-gray-500 block text-[10px]">Expected Output:</span>
                      <pre className="text-emerald-400 mt-1">{currentTopic.english.expectedOutput}</pre>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTENT BODY: FORMAL ENGLISH MODE */}
              {topicLangMode === 'english' && (
                <div className="space-y-4 animate-fade-in font-sans">
                  <div className="p-6 rounded-2xl bg-[#090912] border border-white/5 space-y-3">
                    <h3 className="font-bold text-white text-base">Executive Summary</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {currentTopic.english.summary}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#090912] border border-white/5 space-y-3">
                    <h3 className="font-bold text-white text-base">Deep Technical Mechanism</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {currentTopic.english.explanation}
                    </p>
                  </div>

                  {/* Code Snippet */}
                  <div className="rounded-2xl border border-white/10 bg-[#050508] overflow-hidden">
                    <div className="px-4 py-2.5 bg-[#0a0a14] border-b border-white/10 flex items-center justify-between text-xs">
                      <span className="font-mono text-gray-400">Reference Implementation</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(currentTopic.english.codeSnippet);
                          showToast('Code copied to clipboard!');
                        }}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto">
                      {currentTopic.english.codeSnippet}
                    </pre>
                    <div className="p-3 bg-black border-t border-white/5 font-mono text-xs text-gray-400">
                      <span className="text-gray-500 block text-[10px]">Output:</span>
                      <pre className="text-emerald-400 mt-1">{currentTopic.english.expectedOutput}</pre>
                    </div>
                  </div>

                  {/* Key Takeaways & Mistakes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-black/60 border border-white/5">
                      <h4 className="font-bold text-cyan-300 text-xs mb-2">Key Engineering Takeaways</h4>
                      <ul className="space-y-1.5 text-xs text-gray-300 list-disc list-inside">
                        {currentTopic.english.keyTakeaways.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-black/60 border border-white/5">
                      <h4 className="font-bold text-rose-300 text-xs mb-2">Common Pitfalls & Bugs</h4>
                      <ul className="space-y-1.5 text-xs text-gray-300 list-disc list-inside">
                        {currentTopic.english.commonMistakes.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: CODE COMPILER / LEETCODE SANDBOX */}
        {/* ======================================================== */}
        {activeTab === 'compiler' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            {/* Left: Problem Statement & Bhai Editorial */}
            <div className="lg:col-span-5 space-y-4">
              {/* Problem Selector Bar */}
              <div className="p-3 rounded-xl bg-[#090912] border border-white/10 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-semibold">Select Problem:</span>
                <select
                  value={selectedProblemId}
                  onChange={(e) => setSelectedProblemId(e.target.value)}
                  className="bg-black border border-white/10 text-cyan-300 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none"
                >
                  {PLATFORM_PROBLEMS.map((prob) => (
                    <option key={prob.id} value={prob.id}>
                      {prob.title} ({prob.difficulty})
                    </option>
                  ))}
                </select>
              </div>

              {/* Problem Info Card */}
              <div className="p-6 rounded-2xl bg-[#080810] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold ${
                        currentProblem.difficulty === 'Easy'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {currentProblem.difficulty}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {currentProblem.category}
                    </span>
                  </div>

                  <span className="text-[11px] text-gray-500 font-mono">
                    Acceptance: {currentProblem.acceptanceRate}
                  </span>
                </div>

                <h2 className="text-xl font-black text-white">{currentProblem.title}</h2>
                <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">
                  {currentProblem.description}
                </p>

                {/* Company Tags */}
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
                    Asked in Companies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProblem.companies.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded bg-white/5 text-gray-300 text-[10px] font-semibold"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Constraints */}
                <div className="p-3 bg-black/60 rounded-xl border border-white/5 text-xs text-gray-400 font-mono space-y-1">
                  <span className="text-gray-500 text-[10px] block font-sans">Constraints:</span>
                  {currentProblem.constraints.map((c, i) => (
                    <div key={i}>• {c}</div>
                  ))}
                </div>

                {/* Bhai Logic Callout */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
                  <span className="font-extrabold text-amber-300 block flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Bhai Ka Logic & Intuition
                  </span>
                  <p className="text-gray-300 leading-relaxed">
                    {currentProblem.bhaiBreakdown.optimalBhaiLogic}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: In-Browser Code Compiler */}
            <div className="lg:col-span-7">
              <CodeCompiler
                problem={currentProblem}
                onProblemSolved={handleProblemSolved}
              />
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: JDOODLE REAL CLOUD COMPILER */}
        {/* ======================================================== */}
        {activeTab === 'jdoodle' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-[#0a0a14] to-black border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
                  <Cpu className="w-3.5 h-3.5" /> Powered by JDoodle Start-Coding Engine
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-white">
                  Real Online <span className="gradient-text-primary">Cloud Compiler & IDE</span>
                </h1>
                <p className="text-gray-400 text-xs md:text-sm mt-1 max-w-xl">
                  Fully interactive compiler with real-time execution, standard input (STDIN), command-line arguments, compiler flags, and 80+ programming languages.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://www.jdoodle.com/start-coding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all flex items-center gap-2"
                >
                  <span>Open Fullscreen Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <JDoodleCompiler
              initialLanguage="universal"
              snippetToCopy={jdoodleInitialSnippet}
              problemTitle={jdoodleInitialTitle}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 5: 10-TOPIC MILESTONE QUIZZES */}
        {/* ======================================================== */}
        {activeTab === 'quizzes' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/20 via-[#0a0a14] to-black border border-purple-500/20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
                <Award className="w-3.5 h-3.5" /> Placement Milestones
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">
                10-Topic <span className="gradient-text-purple">Milestone Quizzes</span>
              </h1>
              <p className="text-gray-400 text-sm mt-1 max-w-xl">
                Test your mastery after every 10 topics. Complete each milestone to earn unique badges, unlock ranks, and review instant Bhai explanations for every question.
              </p>
            </div>

            {/* Quiz Selector Cards */}
            {!activeQuizId && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MILESTONE_QUIZZES.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="p-6 rounded-2xl bg-[#080812] border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-bold font-mono">
                          {quiz.rangeTopics}
                        </span>
                        <span className="text-xs font-semibold text-amber-400">
                          +{quiz.totalXp} XP
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-white">{quiz.title}</h3>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        {quiz.subtitle}
                      </p>
                      <div className="mt-4 flex items-center gap-3 text-xs text-gray-500 font-mono">
                        <span>📝 {quiz.questions.length} Questions</span>
                        <span>•</span>
                        <span>⏱️ {quiz.timeLimitMinutes} Mins</span>
                        <span>•</span>
                        <span className="text-purple-400">{quiz.badgeAwarded}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveQuizId(quiz.id);
                        setQuizQuestionIndex(0);
                        setSelectedAnswers({});
                        setQuizSubmitted(false);
                      }}
                      className="mt-6 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5" /> Start Milestone Quiz
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Active Quiz Question Runner */}
            {activeQuizId && (
              <div className="p-6 md:p-8 rounded-2xl bg-[#090914] border border-purple-500/30 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs text-purple-400 font-mono font-bold">
                      {currentQuiz.title}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      Question {quizQuestionIndex + 1} of {currentQuiz.questions.length}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveQuizId(null)}
                    className="text-xs text-gray-400 hover:text-white px-3 py-1 rounded-lg bg-white/5"
                  >
                    Exit Quiz
                  </button>
                </div>

                {/* Question Statement */}
                <div className="space-y-3">
                  <p className="text-base font-bold text-white">
                    {currentQuiz.questions[quizQuestionIndex].question}
                  </p>
                  {currentQuiz.questions[quizQuestionIndex].code && (
                    <pre className="p-4 rounded-xl bg-black border border-white/10 text-cyan-300 font-mono text-xs overflow-x-auto">
                      {currentQuiz.questions[quizQuestionIndex].code}
                    </pre>
                  )}
                </div>

                {/* 4 Options */}
                <div className="space-y-2.5">
                  {currentQuiz.questions[quizQuestionIndex].options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[quizQuestionIndex] === optIdx;
                    const isCorrect = currentQuiz.questions[quizQuestionIndex].correctAnswer === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => {
                          if (!quizSubmitted) {
                            setSelectedAnswers((prev) => ({
                              ...prev,
                              [quizQuestionIndex]: optIdx,
                            }));
                          }
                        }}
                        className={`w-full text-left p-4 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                          quizSubmitted
                            ? isCorrect
                              ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                              : isSelected
                              ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                              : 'bg-black/40 border-white/5 text-gray-400'
                            : isSelected
                            ? 'bg-purple-600/20 border-purple-500 text-purple-200 shadow-md'
                            : 'bg-black/60 border-white/10 text-gray-300 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center font-mono font-bold text-gray-400">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {quizSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Bhai Explanation Box if quiz is submitted */}
                {quizSubmitted && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                    <span className="font-bold text-amber-300 block flex items-center gap-1">
                      💡 Bhai Ka Explanation:
                    </span>
                    <p className="text-gray-300 leading-relaxed">
                      {currentQuiz.questions[quizQuestionIndex].bhaiExplanation}
                    </p>
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    disabled={quizQuestionIndex === 0}
                    onClick={() => setQuizQuestionIndex((i) => Math.max(0, i - 1))}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {!quizSubmitted && quizQuestionIndex === currentQuiz.questions.length - 1 ? (
                    <button
                      onClick={() => handleQuizSubmit(currentQuiz)}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/20"
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <button
                      disabled={quizQuestionIndex === currentQuiz.questions.length - 1}
                      onClick={() =>
                        setQuizQuestionIndex((i) =>
                          Math.min(currentQuiz.questions.length - 1, i + 1)
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white disabled:opacity-40"
                    >
                      Next
                    </button>
                  )}
                </div>

                {/* Final Score Report */}
                {quizSubmitted && (
                  <div className="p-6 rounded-2xl bg-black border border-emerald-500/30 text-center space-y-2">
                    <h4 className="text-xl font-black text-white">Quiz Completed!</h4>
                    <p className="text-sm text-emerald-400 font-bold font-mono">
                      Your Score: {quizScore} / {currentQuiz.questions.length} (
                      {Math.round((quizScore / currentQuiz.questions.length) * 100)}%)
                    </p>
                    <p className="text-xs text-gray-400">
                      Badge Earned: <span className="text-purple-300 font-bold">{currentQuiz.badgeAwarded}</span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 5: GLOBAL COMMUNITY LEADERBOARD */}
        {/* ======================================================== */}
        {activeTab === 'leaderboard' && (
          <GlobalLeaderboard
            currentUserXp={userProfile.xp}
            currentUserName={userProfile.name}
            currentUserStreak={userProfile.streakDays}
            currentUserProblemsSolved={userProfile.problemsSolved}
            currentUserQuizzes={userProfile.quizzesCompleted}
          />
        )}
      </main>

      {/* FOOTER: Signature aaryaninvincible Attribution */}
      <footer className="mt-16 border-t border-white/10 bg-[#000000] py-8 px-4 text-center relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide">PrepForge</span>
            <span>• Next-Gen Placement Preparation</span>
          </div>

          {/* User's signature attribution badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <span>Crafted with ⚡ by</span>
            <span className="text-white font-extrabold font-mono tracking-wider">
              aaryaninvincible
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <button onClick={() => setActiveTab('sheet')} className="hover:text-cyan-400">
              Google Sheet
            </button>
            <button onClick={() => setActiveTab('compiler')} className="hover:text-cyan-400">
              Sandbox
            </button>
            <button onClick={() => setActiveTab('leaderboard')} className="hover:text-cyan-400">
              Leaderboard
            </button>
          </div>
        </div>
      </footer>

      {/* SOCIAL SHARE MODAL */}
      <SocialShareModal
        isOpen={shareModalConfig.isOpen}
        onClose={() => setShareModalConfig((prev) => ({ ...prev, isOpen: false }))}
        title={shareModalConfig.title}
        summary={shareModalConfig.summary}
      />

      {/* USER AUTH & PROFILE MODAL */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm p-6 rounded-2xl bg-[#090912] border border-cyan-500/30 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" /> Coder Profile
              </h3>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Your Display Name</label>
                <input
                  type="text"
                  value={authName}
                  placeholder={userProfile.name}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Email / Firebase Sync</label>
                <input
                  type="email"
                  value={authEmail}
                  placeholder={userProfile.email}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-3 bg-white/5 rounded-xl text-gray-400 space-y-1">
                <div>Current Tier: <span className="text-cyan-300 font-bold">Level {userLevel}</span></div>
                <div>Lifetime Points: <span className="text-amber-400 font-bold">{userProfile.xp} XP</span></div>
                <div>Streak: <span className="text-rose-400 font-bold">{userProfile.streakDays} Days</span></div>
              </div>

              <button
                onClick={() => {
                  if (authName.trim()) {
                    setUserProfile((prev) => ({ ...prev, name: authName.trim() }));
                  }
                  if (authEmail.trim()) {
                    setUserProfile((prev) => ({ ...prev, email: authEmail.trim() }));
                  }
                  setIsAuthModalOpen(false);
                  showToast('Profile updated!');
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold transition-all"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
