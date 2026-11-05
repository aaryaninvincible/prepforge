import React, { useState } from 'react';
import {
  FileSpreadsheet, ExternalLink, Download, Filter, Search, CheckCircle2,
  Clock, AlertTriangle, Layers, Calendar, Code, Brain, BookOpen, Sparkles,
  ArrowUpRight, RefreshCw, Eye
} from 'lucide-react';
import {
  GOOGLE_SHEET_URL,
  initialRoadmapTasks,
  initialDailyTracker,
  initialPythonPractice,
  initialAIMLTasks,
  initialInterviewQBank,
  initialResources,
  SheetRoadmapTask,
  SheetDailyTrackerDay,
  SheetPythonPracticeProblem,
  SheetAIMLTask,
  SheetInterviewQuestion,
  SheetResource
} from '../data/sheetData';

interface SheetManagerProps {
  onTaskCompleted?: (taskId: string, xpEarned: number) => void;
}

export const SheetManager: React.FC<SheetManagerProps> = ({ onTaskCompleted }) => {
  const [activeSheetTab, setActiveSheetTab] = useState<
    'roadmap' | 'daily' | 'python' | 'aiml' | 'qbank' | 'resources'
  >('roadmap');

  const [roadmapTasks, setRoadmapTasks] = useState<SheetRoadmapTask[]>(() => {
    const saved = localStorage.getItem('prepforge_sheet_roadmap');
    return saved ? JSON.parse(saved) : initialRoadmapTasks;
  });

  const [dailyTracker, setDailyTracker] = useState<SheetDailyTrackerDay[]>(() => {
    const saved = localStorage.getItem('prepforge_sheet_daily');
    return saved ? JSON.parse(saved) : initialDailyTracker;
  });

  const [pythonPractice, setPythonPractice] = useState<SheetPythonPracticeProblem[]>(() => {
    const saved = localStorage.getItem('prepforge_sheet_python');
    return saved ? JSON.parse(saved) : initialPythonPractice;
  });

  const [aimlTasks, setAimlTasks] = useState<SheetAIMLTask[]>(() => {
    const saved = localStorage.getItem('prepforge_sheet_aiml');
    return saved ? JSON.parse(saved) : initialAIMLTasks;
  });

  const [interviewQBank, setInterviewQBank] = useState<SheetInterviewQuestion[]>(() => {
    const saved = localStorage.getItem('prepforge_sheet_qbank');
    return saved ? JSON.parse(saved) : initialInterviewQBank;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState<string>('All');

  // Toggle Roadmap Task Status
  const toggleRoadmapStatus = (id: string) => {
    const updated = roadmapTasks.map((t) => {
      if (t.id === id) {
        const nextStatus: 'Not Started' | 'In Progress' | 'Done' =
          t.status === 'Done' ? 'Not Started' : t.status === 'In Progress' ? 'Done' : 'In Progress';
        if (nextStatus === 'Done' && onTaskCompleted) {
          onTaskCompleted(t.id, 50);
        }
        return { ...t, status: nextStatus };
      }
      return t;
    });
    setRoadmapTasks(updated);
    localStorage.setItem('prepforge_sheet_roadmap', JSON.stringify(updated));
  };

  // Toggle Python Practice Problem Status
  const togglePythonStatus = (id: string) => {
    const updated = pythonPractice.map((p) => {
      if (p.id === id) {
        const nextStatus: 'Not Started' | 'In Progress' | 'Done' =
          p.status === 'Done' ? 'Not Started' : 'Done';
        if (nextStatus === 'Done' && onTaskCompleted) {
          onTaskCompleted(p.id, 40);
        }
        return { ...p, status: nextStatus };
      }
      return p;
    });
    setPythonPractice(updated);
    localStorage.setItem('prepforge_sheet_python', JSON.stringify(updated));
  };

  // Toggle Interview Question Status
  const toggleQBankStatus = (id: string) => {
    const updated = interviewQBank.map((q) => {
      if (q.id === id) {
        const nextStatus: 'Not Started' | 'Mastered' | 'Needs Practice' =
          q.status === 'Mastered' ? 'Not Started' : 'Mastered';
        if (nextStatus === 'Mastered' && onTaskCompleted) {
          onTaskCompleted(q.id, 30);
        }
        return { ...q, status: nextStatus };
      }
      return q;
    });
    setInterviewQBank(updated);
    localStorage.setItem('prepforge_sheet_qbank', JSON.stringify(updated));
  };

  // Export current active sheet to CSV
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    if (activeSheetTab === 'roadmap') {
      csvContent += 'ID,Track,Phase,Week,Topic,Priority,TargetTime,Status,Resource,WhatToProve\n';
      roadmapTasks.forEach((r) => {
        csvContent += `"${r.seq}","${r.track}","${r.phase}","${r.week}","${r.title}","${r.priority}","${r.targetTime}","${r.status}","${r.resourceLink}","${r.proofOfCompletion}"\n`;
      });
    } else if (activeSheetTab === 'daily') {
      csvContent += 'Date,Day,MainFocus,Python,DSA,SQL_CS,AIML,Interview\n';
      dailyTracker.forEach((d) => {
        csvContent += `"${d.date}","${d.day}","${d.focus}","${d.python}","${d.dsa}","${d.sqlCs}","${d.aiml}","${d.interview}"\n`;
      });
    } else if (activeSheetTab === 'python') {
      csvContent += 'Date,Topic,Problem,Difficulty,Link,Status,InterviewReady\n';
      pythonPractice.forEach((p) => {
        csvContent += `"${p.date}","${p.topic}","${p.problem}","${p.difficulty}","${p.link}","${p.status}","${p.ready}"\n`;
      });
    } else {
      csvContent += 'Area,Question,Status,BestAnswer\n';
      interviewQBank.forEach((q) => {
        csvContent += `"${q.area}","${q.question}","${q.status}","${q.bestAnswer}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `prepforge_${activeSheetTab}_sheet.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate Roadmap Progress
  const completedRoadmap = roadmapTasks.filter((t) => t.status === 'Done').length;
  const roadmapPercent = Math.round((completedRoadmap / roadmapTasks.length) * 100);

  // Filtered Roadmap
  const filteredRoadmap = roadmapTasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.track.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrack = trackFilter === 'All' || t.track.toLowerCase() === trackFilter.toLowerCase();
    return matchesSearch && matchesTrack;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner with Google Sheet Live Link & Stats */}
      <div className="relative rounded-2xl p-6 bg-gradient-to-r from-[#0a0a14] via-[#0d0d1a] to-[#08080f] border border-cyan-500/20 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Synchronized Google Sheet Data
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Curriculum & <span className="gradient-text-primary">Master Tracker</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1 max-w-xl">
              Fully interactive mirror of the official Google Workbook. Track roadmap tasks, daily hours, coding problem logs, and interview questions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Open Google Sheet</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-xs font-semibold transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-black text-cyan-400 font-mono">{roadmapPercent}%</div>
            <div>
              <div className="text-xs font-semibold text-white">Overall Roadmap Readiness</div>
              <div className="text-[11px] text-gray-400 font-mono">
                {completedRoadmap} of {roadmapTasks.length} tasks completed
              </div>
            </div>
          </div>
          <div className="w-full sm:w-64 h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(0,242,254,0.5)]"
              style={{ width: `${roadmapPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sheet Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 text-xs scrollbar-none">
        <button
          onClick={() => setActiveSheetTab('roadmap')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSheetTab === 'roadmap'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-[#0a0a14] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Master Roadmap ({roadmapTasks.length})</span>
        </button>

        <button
          onClick={() => setActiveSheetTab('daily')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSheetTab === 'daily'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-[#0a0a14] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>Daily Tracker ({dailyTracker.length} Days)</span>
        </button>

        <button
          onClick={() => setActiveSheetTab('python')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSheetTab === 'python'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-[#0a0a14] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <Code className="w-4 h-4 text-amber-400" />
          <span>Python Practice ({pythonPractice.length})</span>
        </button>

        <button
          onClick={() => setActiveSheetTab('aiml')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSheetTab === 'aiml'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-[#0a0a14] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <Brain className="w-4 h-4 text-purple-400" />
          <span>AIML Prep ({aimlTasks.length})</span>
        </button>

        <button
          onClick={() => setActiveSheetTab('qbank')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSheetTab === 'qbank'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-[#0a0a14] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4 text-rose-400" />
          <span>Interview Q Bank ({interviewQBank.length})</span>
        </button>

        <button
          onClick={() => setActiveSheetTab('resources')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSheetTab === 'resources'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-[#0a0a14] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Resources ({initialResources.length})</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#080810] border border-white/5 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeSheetTab} items...`}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {activeSheetTab === 'roadmap' && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-gray-400 font-semibold">Track:</span>
            {['All', 'Python', 'DSA', 'SQL', 'AIML'].map((tr) => (
              <button
                key={tr}
                onClick={() => setTrackFilter(tr)}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  trackFilter.toLowerCase() === tr.toLowerCase()
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tr}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SHEET 1: MASTER ROADMAP */}
      {activeSheetTab === 'roadmap' && (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07070e]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#040408] text-gray-400 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-3 w-12 text-center">#</th>
                <th className="py-3 px-3">Track & Phase</th>
                <th className="py-3 px-4">Topic / Task Statement</th>
                <th className="py-3 px-3 text-center">Priority</th>
                <th className="py-3 px-3 text-center">Target</th>
                <th className="py-3 px-3">What To Prove</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRoadmap.map((task) => (
                <tr
                  key={task.id}
                  className={`hover:bg-white/[0.02] transition-colors ${
                    task.status === 'Done' ? 'bg-emerald-950/10' : ''
                  }`}
                >
                  <td className="py-3 px-3 text-center font-mono font-bold text-gray-500">
                    {task.seq}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-semibold mr-1.5 border border-cyan-500/20">
                      {task.track}
                    </span>
                    <span className="text-gray-400 font-mono text-[11px]">
                      P{task.phase} W{task.week}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white text-xs">{task.title}</div>
                    {task.notes && <p className="text-[11px] text-gray-500 mt-0.5">{task.notes}</p>}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        task.priority === 'Must'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : task.priority === 'High'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-gray-400 whitespace-nowrap">
                    {task.targetTime}
                  </td>
                  <td className="py-3 px-3 text-gray-300 text-[11px] max-w-xs">
                    {task.proofOfCompletion || 'Solve problems & explain aloud'}
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => toggleRoadmapStatus(task.id)}
                      className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all flex items-center gap-1 mx-auto ${
                        task.status === 'Done'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : task.status === 'In Progress'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-black text-gray-400 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {task.status === 'Done' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Done
                        </>
                      ) : (
                        task.status
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {task.resourceLink ? (
                      <a
                        href={task.resourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 inline-flex items-center"
                        title="Open Resource"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-gray-600">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SHEET 2: DAILY TRACKER */}
      {activeSheetTab === 'daily' && (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07070e]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#040408] text-gray-400 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Date & Day</th>
                <th className="py-3 px-4">Main Focus</th>
                <th className="py-3 px-3 text-center">Python (90m)</th>
                <th className="py-3 px-3 text-center">DSA (45m)</th>
                <th className="py-3 px-3 text-center">SQL/CS (30m)</th>
                <th className="py-3 px-3 text-center">AIML (45m)</th>
                <th className="py-3 px-3 text-center">Interview (15m)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {dailyTracker.map((day) => (
                <tr key={day.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="font-semibold text-white">{day.date}</div>
                    <span className="text-[11px] text-gray-500">{day.day}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-cyan-300">
                    {day.focus}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-gray-300">
                      {day.python}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-gray-300">
                      {day.dsa}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-gray-300">
                      {day.sqlCs}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-gray-300">
                      {day.aiml}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-gray-300">
                      {day.interview}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SHEET 3: PYTHON PRACTICE */}
      {activeSheetTab === 'python' && (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07070e]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#040408] text-gray-400 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-3">Topic</th>
                <th className="py-3 px-4">Problem / Lesson</th>
                <th className="py-3 px-3 text-center">Difficulty</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-3 text-right">Practice Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pythonPractice.map((prob) => (
                <tr key={prob.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-gray-400 font-mono text-[11px] whitespace-nowrap">
                    {prob.date}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                      {prob.topic}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-white">{prob.problem}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        prob.difficulty === 'Easy'
                          ? 'bg-emerald-500/10 text-emerald-300'
                          : prob.difficulty === 'Medium'
                          ? 'bg-amber-500/10 text-amber-300'
                          : 'bg-rose-500/10 text-rose-300'
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => togglePythonStatus(prob.id)}
                      className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all inline-flex items-center gap-1 ${
                        prob.status === 'Done'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-black text-gray-400 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {prob.status === 'Done' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Done
                        </>
                      ) : (
                        'Not Started'
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <a
                      href={prob.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      <span>PySchool</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SHEET 4: AIML PREP */}
      {activeSheetTab === 'aiml' && (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07070e]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#040408] text-gray-400 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-3 text-center">Week</th>
                <th className="py-3 px-4">Topic Statement</th>
                <th className="py-3 px-3 text-center">Theory Done?</th>
                <th className="py-3 px-3 text-center">Code Done?</th>
                <th className="py-3 px-4">Mini Task & Proof</th>
                <th className="py-3 px-3 text-right">Resource</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {aimlTasks.map((task) => (
                <tr key={task.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3 text-center font-mono font-bold text-purple-400">
                    W{task.week}
                  </td>
                  <td className="py-3 px-4 font-semibold text-white">{task.topic}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        task.theoryDone
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {task.theoryDone ? 'Yes ✅' : 'No'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        task.codeDone
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {task.codeDone ? 'Yes ✅' : 'No'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{task.miniTask}</td>
                  <td className="py-3 px-3 text-right">
                    <a
                      href={task.resourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 inline-flex items-center"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SHEET 5: INTERVIEW Q BANK */}
      {activeSheetTab === 'qbank' && (
        <div className="space-y-3">
          {interviewQBank.map((q) => (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-[#090912] border border-white/5 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold text-[11px]">
                    {q.area}
                  </span>
                  <h4 className="font-bold text-white text-sm">{q.question}</h4>
                </div>
                <button
                  onClick={() => toggleQBankStatus(q.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    q.status === 'Mastered'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-black text-gray-400 border border-white/10 hover:text-white'
                  }`}
                >
                  {q.status === 'Mastered' ? 'Mastered 🎯' : 'Mark Mastered'}
                </button>
              </div>
              {q.bestAnswer && (
                <p className="mt-2 text-xs text-gray-300 bg-black/40 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                  <span className="text-cyan-400 font-bold block mb-0.5">High-Yield Points:</span>
                  {q.bestAnswer}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SHEET 6: RESOURCES */}
      {activeSheetTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initialResources.map((res) => (
            <div
              key={res.id}
              className="p-5 rounded-xl bg-[#090912] border border-white/5 hover:border-teal-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-teal-500/10 text-teal-300 font-semibold text-xs border border-teal-500/20">
                    {res.category}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-bold">
                    {res.priority}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base">{res.name}</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{res.whyUse}</p>
                {res.notes && (
                  <p className="text-[11px] text-gray-500 mt-2 font-mono">Note: {res.notes}</p>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-white/5">
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                >
                  <span>Visit Documentation / Site</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
