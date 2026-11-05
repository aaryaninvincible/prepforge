import React, { useState } from 'react';
import { Trophy, Flame, Award, Search, Sparkles, TrendingUp, ShieldCheck, UserCheck, Star } from 'lucide-react';

export interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  level: number;
  levelTitle: string;
  xp: number;
  streakDays: number;
  problemsSolved: number;
  quizzesCompleted: number;
  isCurrentUser?: boolean;
  badge: string;
}

interface LeaderboardProps {
  currentUserXp: number;
  currentUserName: string;
  currentUserStreak: number;
  currentUserProblemsSolved: number;
  currentUserQuizzes: number;
}

export const GlobalLeaderboard: React.FC<LeaderboardProps> = ({
  currentUserXp,
  currentUserName,
  currentUserStreak,
  currentUserProblemsSolved,
  currentUserQuizzes,
}) => {
  const [filter, setFilter] = useState<'all' | 'weekly' | 'daily'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample global high-ranking community members
  const baseCommunity: LeaderboardUser[] = [
    {
      id: 'u-1',
      rank: 1,
      username: 'ShadowCoder',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      level: 14,
      levelTitle: 'Grandmaster Architect',
      xp: 4850,
      streakDays: 42,
      problemsSolved: 64,
      quizzesCompleted: 18,
      badge: '👑 Legendary',
    },
    {
      id: 'u-2',
      rank: 2,
      username: 'ByteNinja',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
      level: 12,
      levelTitle: 'Code Knight',
      xp: 3920,
      streakDays: 31,
      problemsSolved: 52,
      quizzesCompleted: 14,
      badge: '⚡ Speed Demon',
    },
    {
      id: 'u-3',
      rank: 3,
      username: 'AlgoQueen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
      level: 11,
      levelTitle: 'Algorithm Specialist',
      xp: 3410,
      streakDays: 28,
      problemsSolved: 48,
      quizzesCompleted: 12,
      badge: '🧠 DSA Prodigy',
    },
    {
      id: 'u-4',
      rank: 4,
      username: 'DevVikram',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      level: 9,
      levelTitle: 'Pythonista',
      xp: 2850,
      streakDays: 19,
      problemsSolved: 39,
      quizzesCompleted: 10,
      badge: '🐍 Python Ace',
    },
    {
      id: 'u-5',
      rank: 5,
      username: 'SnehaCodes',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      level: 8,
      levelTitle: 'Backend Builder',
      xp: 2310,
      streakDays: 15,
      problemsSolved: 32,
      quizzesCompleted: 8,
      badge: '🚀 Rising Star',
    },
    {
      id: 'u-6',
      rank: 6,
      username: 'CyberRohan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      level: 7,
      levelTitle: 'Logic Warrior',
      xp: 1950,
      streakDays: 12,
      problemsSolved: 27,
      quizzesCompleted: 6,
      badge: '🛡️ Steady Grinder',
    },
    {
      id: 'u-7',
      rank: 7,
      username: 'PoojaML',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      level: 6,
      levelTitle: 'AI Explorer',
      xp: 1640,
      streakDays: 9,
      problemsSolved: 22,
      quizzesCompleted: 5,
      badge: '✨ Visionary',
    },
  ];

  // Calculate current user's level and level title
  const userLevel = Math.max(1, Math.floor(currentUserXp / 250) + 1);
  const getLevelTitle = (lvl: number) => {
    if (lvl >= 15) return 'Apex Legend ⚡';
    if (lvl >= 12) return 'Grandmaster Architect 🏛️';
    if (lvl >= 9) return 'Code Knight ⚔️';
    if (lvl >= 6) return 'Algorithm Specialist 🧠';
    if (lvl >= 3) return 'Pythonista 🐍';
    return 'Byte Cadet 🚀';
  };

  const currentUserEntry: LeaderboardUser = {
    id: 'current-user',
    rank: 0, // computed below
    username: currentUserName || 'You (Bhai Coder)',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    level: userLevel,
    levelTitle: getLevelTitle(userLevel),
    xp: currentUserXp,
    streakDays: currentUserStreak,
    problemsSolved: currentUserProblemsSolved,
    quizzesCompleted: currentUserQuizzes,
    isCurrentUser: true,
    badge: userLevel >= 5 ? '🔥 High Roller' : '🌱 Fast Learner',
  };

  // Combine and sort by XP descending
  const combined = [...baseCommunity, currentUserEntry].sort((a, b) => b.xp - a.xp);
  const rankedUsers = combined.map((user, idx) => ({
    ...user,
    rank: idx + 1,
  }));

  const filteredUsers = rankedUsers.filter(u =>
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top3 = rankedUsers.slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="relative rounded-2xl p-6 md:p-8 bg-gradient-to-r from-[#0d0d18] via-[#090912] to-[#050508] border border-cyan-500/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-3">
              <Trophy className="w-3.5 h-3.5" /> Global Placement Arena
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Community <span className="gradient-text-primary">Leaderboard</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base mt-1 max-w-xl">
              Solve problems, finish milestone quizzes, and climb the global ranks. Real-time XP, streaks, and skill badges.
            </p>
          </div>

          {/* Current user mini scorecard */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
            <div className="relative">
              <img
                src={currentUserEntry.avatar}
                alt="Your Avatar"
                className="w-12 h-12 rounded-full border-2 border-cyan-400 object-cover"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-cyan-500 text-black text-[10px] font-black rounded-full">
                L{userLevel}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-sm">{currentUserEntry.username}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                  Rank #{currentUserEntry.rank}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {currentUserXp} XP
                </span>
                <span className="flex items-center gap-1 text-rose-400 font-semibold">
                  <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> {currentUserStreak}d
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {/* Silver - Rank 2 */}
        {top3[1] && (
          <div className="order-2 md:order-1 relative rounded-xl p-5 bg-[#0a0a12]/90 border border-gray-400/20 flex flex-col items-center text-center">
            <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-gray-400/20 border border-gray-400/40 text-gray-300 text-xs font-bold flex items-center gap-1">
              🥈 2nd Place
            </div>
            <img src={top3[1].avatar} className="w-16 h-16 rounded-full border-2 border-gray-400 mt-2 object-cover" />
            <h3 className="font-bold text-white text-base mt-2">{top3[1].username}</h3>
            <span className="text-xs text-gray-400">{top3[1].levelTitle}</span>
            <div className="mt-3 px-3 py-1 rounded-lg bg-gray-500/10 text-gray-200 font-mono text-sm font-semibold">
              {top3[1].xp} XP
            </div>
            <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
              <span>{top3[1].problemsSolved} Solved</span>
              <span>•</span>
              <span className="text-rose-400 flex items-center gap-0.5">
                <Flame className="w-3 h-3 fill-rose-500" /> {top3[1].streakDays}d
              </span>
            </div>
          </div>
        )}

        {/* Gold - Rank 1 */}
        {top3[0] && (
          <div className="order-1 md:order-2 relative rounded-xl p-6 bg-gradient-to-b from-amber-500/10 via-[#0a0a14] to-[#06060c] border border-amber-500/40 flex flex-col items-center text-center shadow-[0_0_30px_rgba(245,158,11,0.15)] -translate-y-2">
            <div className="absolute -top-3.5 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-extrabold flex items-center gap-1 shadow-md">
              👑 Champion #1
            </div>
            <div className="relative mt-2">
              <img src={top3[0].avatar} className="w-20 h-20 rounded-full border-2 border-amber-400 object-cover" />
              <div className="absolute -bottom-1 -right-1 p-1 bg-amber-400 text-black rounded-full">
                <Award className="w-3.5 h-3.5" />
              </div>
            </div>
            <h3 className="font-extrabold text-white text-lg mt-2">{top3[0].username}</h3>
            <span className="text-xs text-amber-400 font-medium">{top3[0].levelTitle}</span>
            <div className="mt-3 px-4 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-base font-bold">
              {top3[0].xp} XP
            </div>
            <div className="flex items-center gap-3 mt-3 text-xs text-gray-300">
              <span>{top3[0].problemsSolved} Solved</span>
              <span>•</span>
              <span className="text-rose-400 flex items-center gap-0.5 font-semibold">
                <Flame className="w-3.5 h-3.5 fill-rose-500" /> {top3[0].streakDays}d Streak
              </span>
            </div>
          </div>
        )}

        {/* Bronze - Rank 3 */}
        {top3[2] && (
          <div className="order-3 relative rounded-xl p-5 bg-[#0a0a12]/90 border border-amber-700/20 flex flex-col items-center text-center">
            <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-700/20 border border-amber-700/40 text-amber-600 text-xs font-bold flex items-center gap-1">
              🥉 3rd Place
            </div>
            <img src={top3[2].avatar} className="w-16 h-16 rounded-full border-2 border-amber-600 mt-2 object-cover" />
            <h3 className="font-bold text-white text-base mt-2">{top3[2].username}</h3>
            <span className="text-xs text-gray-400">{top3[2].levelTitle}</span>
            <div className="mt-3 px-3 py-1 rounded-lg bg-amber-700/10 text-amber-300 font-mono text-sm font-semibold">
              {top3[2].xp} XP
            </div>
            <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
              <span>{top3[2].problemsSolved} Solved</span>
              <span>•</span>
              <span className="text-rose-400 flex items-center gap-0.5">
                <Flame className="w-3 h-3 fill-rose-500" /> {top3[2].streakDays}d
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#090910] border border-white/5">
        <div className="flex items-center gap-1 p-1 bg-black rounded-lg border border-white/5 w-full sm:w-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              filter === 'all' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:text-white'
            }`}
          >
            All-Time Global
          </button>
          <button
            onClick={() => setFilter('weekly')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              filter === 'weekly' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:text-white'
            }`}
          >
            Weekly Sprint
          </button>
          <button
            onClick={() => setFilter('daily')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              filter === 'daily' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:text-white'
            }`}
          >
            Today's Grind
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coder..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#08080f]/80 backdrop-blur-md">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#05050a] text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
            <tr>
              <th className="py-3 px-4 w-16">Rank</th>
              <th className="py-3 px-4">Coder</th>
              <th className="py-3 px-4">Level & Tier</th>
              <th className="py-3 px-4 text-right">XP</th>
              <th className="py-3 px-4 text-center">Streak</th>
              <th className="py-3 px-4 text-center">Problems</th>
              <th className="py-3 px-4 text-right">Badge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className={`transition-colors hover:bg-white/[0.02] ${
                  user.isCurrentUser ? 'bg-cyan-950/20 border-l-2 border-cyan-400' : ''
                }`}
              >
                <td className="py-3 px-4 font-mono font-bold">
                  {user.rank === 1 && <span className="text-amber-400">#1 👑</span>}
                  {user.rank === 2 && <span className="text-gray-300">#2 🥈</span>}
                  {user.rank === 3 && <span className="text-amber-600">#3 🥉</span>}
                  {user.rank > 3 && <span className="text-gray-500">#{user.rank}</span>}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                    <div>
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        {user.username}
                        {user.isCurrentUser && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            YOU
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-300 font-mono">
                    Lvl {user.level} • {user.levelTitle}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold text-cyan-400">
                  {user.xp.toLocaleString()} XP
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 px-2 py-0.5 rounded bg-rose-500/10">
                    <Flame className="w-3 h-3 fill-rose-500" /> {user.streakDays}d
                  </span>
                </td>
                <td className="py-3 px-4 text-center font-mono text-gray-300 text-xs">
                  {user.problemsSolved}
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium">
                    {user.badge}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
