import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { tierSystem, attributes } from '../data/warriorSystem.js';

const ArenaStats = ({ warriorData }) => {
  const [selectedTab, setSelectedTab] = useState('stats');
  const { warriorName, stats, tier, xp, currentWeek, rival, primaryAttributes } = warriorData;
  const currentTier = tier || tierSystem.tier_c;

  const generateMockLeaderboard = () => {
    const names = [
      "Roronoa Zoro", "Monkey D. Luffy", "Gojo Satoru", "Guts", "Ichigo Kurosaki",
      "Naruto Uzumaki", "Levi Ackerman", "Saitama", "Ken Kaneki", "Madara Uchiha",
      "Piccolo", "Krillin", "Yujiro Hanma", "Baki Hanma", "Kengan Ashura"
    ];
    return names.slice(0, 10).map((name, i) => ({
      rank: i + 1,
      name,
      xp: Math.floor(Math.random() * 5000) + 2000,
      tier: Object.values(tierSystem)[Math.floor(Math.random() * 4)]
    })).sort((a, b) => b.xp - a.xp);
  };

  const leaderboard = generateMockLeaderboard();
  const userRank = leaderboard.findIndex(u => u.name === warriorName) + 1 || Math.floor(Math.random() * 50) + 11;

  const statLabels = {
    str: { name: 'STRENGTH', icon: '💪' },
    spd: { name: 'SPEED', icon: '⚡' },
    def: { name: 'DEFENSE', icon: '🛡️' },
    tec: { name: 'TECHNIQUE', icon: '🎯' },
    sta: { name: 'STAMINA', icon: '🔥' },
    mnt: { name: 'MENTAL', icon: '🧠' }
  };

  return (
    <div className="bg-kengan-card border border-gray-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4">
        <h2 className="text-xl font-black italic text-white">🏆 ARENA STATS</h2>
        <p className="text-purple-200 text-sm">Comparte tu progreso con otros guerreros</p>
      </div>

      {/* User Stats Summary */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-kengan-gold to-kengan-red flex items-center justify-center text-2xl">
              ⚔️
            </div>
            <div>
              <h3 className="text-white font-bold">{warriorName || 'Guerrero'}</h3>
              <p className="text-xs text-gray-400">Tu posición en el ranking</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-kengan-gold">#{userRank}</div>
            <div className="text-xs text-gray-400">/ {leaderboard.length * 5}</div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-black/30 rounded p-2 text-center">
            <div className="text-lg font-black text-kengan-gold">{xp || 0}</div>
            <div className="text-[10px] text-gray-400">XP</div>
          </div>
          <div className="bg-black/30 rounded p-2 text-center">
            <div className="text-lg font-black text-purple-400">{currentTier.name}</div>
            <div className="text-[10px] text-gray-400">Tier</div>
          </div>
          <div className="bg-black/30 rounded p-2 text-center">
            <div className="text-lg font-black text-blue-400">{currentWeek || 1}</div>
            <div className="text-[10px] text-gray-400">Semana</div>
          </div>
          <div className="bg-black/30 rounded p-2 text-center">
            <div className="text-lg font-black text-green-400">12</div>
            <div className="text-[10px] text-gray-400">Combos</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        {['stats', 'ranking', 'rival'].map(tab => (
          <button key={tab} onClick={() => setSelectedTab(tab)}
            className={`flex-1 py-3 text-center font-bold text-xs uppercase tracking-wider transition-colors ${
              selectedTab === tab ? 'bg-kengan-gold text-black' : 'text-gray-400 hover:text-white'
            }`}>
            {tab === 'stats' && '📊 Stats'}
            {tab === 'ranking' && '🏆 Ranking'}
            {tab === 'rival' && '👹 Rival'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {selectedTab === 'stats' && (
          <div className="space-y-3">
            {Object.entries(stats || {}).map(([stat, value]) => {
              const isPrimary = primaryAttributes?.includes(stat);
              return (
                <div key={stat} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className={`font-bold ${isPrimary ? 'text-kengan-gold' : 'text-gray-400'}`}>
                      {statLabels[stat]?.icon} {statLabels[stat]?.name}
                      {isPrimary && <span className="ml-1 text-[10px]">★</span>}
                    </span>
                    <span className="text-white font-bold">{value}</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${isPrimary ? 'bg-gradient-to-r from-kengan-gold to-yellow-400' : 'bg-gray-600'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedTab === 'ranking' && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {leaderboard.slice(0, 10).map((entry, i) => (
              <div key={i} className={`flex items-center justify-between p-2 rounded ${
                entry.rank <= 3 ? 'bg-yellow-900/20 border border-yellow-700/30' : 'bg-black/20'
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`font-black text-lg w-8 ${
                    entry.rank === 1 ? 'text-yellow-400' :
                    entry.rank === 2 ? 'text-gray-300' :
                    entry.rank === 3 ? 'text-orange-400' : 'text-gray-500'
                  }`}>#{entry.rank}</span>
                  <span className="text-white text-sm font-bold">{entry.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-kengan-gold font-bold text-sm">{entry.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'rival' && rival && (
          <div className="space-y-4">
            <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">👹</span>
                  <div>
                    <h3 className="text-red-400 font-black text-lg">{rival.name}</h3>
                    <p className="text-xs text-gray-400">{rival.tier?.name}</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded">
                  DESAFIAR
                </button>
              </div>
              <p className="text-red-300 text-sm italic mb-3">"{rival.quote}"</p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(rival.stats || {}).map(([stat, value]) => (
                  <div key={stat} className="bg-black/40 rounded p-2 text-center">
                    <div className="text-xs text-gray-400">{statLabels[stat]?.icon}</div>
                    <div className="text-white font-bold">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-4">
              <h4 className="text-sm font-bold text-kengan-gold mb-2">📊 Comparación</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tu XP:</span>
                  <span className="text-white font-bold">{xp || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Su XP:</span>
                  <span className="text-red-400 font-bold">{rival.stats?.str * 100 + (rival.wins || 0) * 10}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-700">
                  <span className="text-gray-400">Diferencia:</span>
                  <span className={xp > rival.stats?.str * 100 ? 'text-green-400' : 'text-red-400'}>
                    {xp > rival.stats?.str * 100 ? '+' : ''}{(xp || 0) - rival.stats?.str * 100}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArenaStats;
