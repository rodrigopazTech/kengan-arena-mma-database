import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { missions as missionData, tierSystem } from '../data/warriorSystem.js';

const MissionBoard = ({ warriorData, onCompleteMission }) => {
  const [selectedTab, setSelectedTab] = useState('daily');
  const { currentWeek, tier, xp, completedMissions = [] } = warriorData;
  
  const currentTier = tier || tierSystem.tier_c;
  const isDaily = selectedTab === 'daily';
  const missionList = isDaily ? missionData.daily : missionData.weekly;
  
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-orange-400';
      case 'extreme': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getXpReward = (xp) => {
    if (typeof xp === 'object') {
      return Object.entries(xp).map(([stat, value]) => `${value} ${stat.toUpperCase()}`).join(' + ');
    }
    return `${xp} XP`;
  };

  return (
    <div className="bg-kengan-card border border-gray-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-kengan-red to-red-800 p-4">
        <h2 className="text-xl font-black italic text-white">📜 MISSION BOARD</h2>
        <p className="text-red-200 text-sm">Completa misiones para ganar XP</p>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-900 p-3 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400">XP:</span>
          <span className="text-kengan-gold font-bold">{xp || 0}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400">Tier:</span>
          <span className={`px-2 py-1 rounded text-xs font-bold ${
            currentTier.id === 'champion' ? 'bg-yellow-500 text-black' :
            currentTier.id === 'tier_s' ? 'bg-red-600 text-white' :
            currentTier.id === 'tier_a' ? 'bg-yellow-500 text-black' :
            currentTier.id === 'tier_b' ? 'bg-blue-500 text-white' :
            'bg-gray-500 text-white'
          }`}>
            {currentTier.icon} {currentTier.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400">Semana:</span>
          <span className="text-white font-bold">{currentWeek || 1}/16</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button onClick={() => setSelectedTab('daily')}
          className={`flex-1 py-3 text-center font-bold text-sm uppercase tracking-wider transition-colors ${
            isDaily ? 'bg-kengan-gold text-black' : 'text-gray-400 hover:text-white'
          }`}>
          📅 Daily Missions
        </button>
        <button onClick={() => setSelectedTab('weekly')}
          className={`flex-1 py-3 text-center font-bold text-sm uppercase tracking-wider transition-colors ${
            !isDaily ? 'bg-kengan-gold text-black' : 'text-gray-400 hover:text-white'
          }`}>
          📆 Weekly Missions
        </button>
      </div>

      {/* Missions List */}
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {missionList.map((mission) => {
          const isCompleted = completedMissions?.includes(mission.id);
          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-black/40 rounded-xl p-4 border ${
                isCompleted ? 'border-green-800 opacity-50' : 'border-gray-700 hover:border-kengan-gold'
              } transition-all`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{mission.icon}</span>
                  <div>
                    <h3 className={`font-bold ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                      {mission.name}
                    </h3>
                    <p className="text-xs text-gray-400">{mission.description}</p>
                  </div>
                </div>
                {isCompleted ? (
                  <span className="text-green-400 text-xl">✅</span>
                ) : (
                  <button
                    onClick={() => onCompleteMission?.(mission)}
                    className="px-3 py-1 bg-kengan-red text-white text-xs font-bold rounded hover:bg-red-600 transition"
                  >
                    COMPLETE
                  </button>
                )}
              </div>
              
              {/* XP Rewards */}
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(mission.xp).map(([stat, value]) => (
                  <span key={stat} className={`text-xs px-2 py-1 rounded bg-gray-800 ${getDifficultyColor(mission.difficulty)}`}>
                    +{value} {stat.toUpperCase()}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Progreso {isDaily ? 'Diario' : 'Semanal'}</span>
          <span>{completedMissions?.filter(id => missionList.find(m => m.id === id)).length || 0}/{missionList.length}</span>
        </div>
        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-kengan-gold"
            initial={{ width: 0 }}
            animate={{ width: `${((completedMissions?.filter(id => missionList.find(m => m.id === id)).length || 0) / missionList.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MissionBoard;
