import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { tierSystem, warriorSchools, attributes } from '../data/warriorSystem.js';
import MissionBoard from './MissionBoard.jsx';
import ArenaStats from './ArenaStats.jsx';
import KnowledgeBase from './KnowledgeBase.jsx';

const WarriorProfile = ({ warriorData, workoutPlan, onUpdateProgress }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const { warriorName, school, experience, stats, tier, currentWeek, xp, primaryAttributes, rival, completedMissions = [], fatigueLevel = 0, trainingHistory = [] } = warriorData;
  const schoolData = warriorSchools[school] || {};
  const currentTier = tier || getTierForXp(xp || 0);
  
  const statLabels = {
    str: { name: 'STR', icon: '💪' },
    spd: { name: 'SPD', icon: '⚡' },
    def: { name: 'DEF', icon: '🛡️' },
    tec: { name: 'TEC', icon: '🎯' },
    sta: { name: 'STA', icon: '🔥' },
    mnt: { name: 'MNT', icon: '🧠' }
  };

  const weekProgress = ((currentWeek - 1) / 16) * 100;
  const fatigue = Math.min(100, Math.max(0, fatigueLevel));
  
  const getFatigueColor = () => {
    if (fatigue < 30) return 'bg-green-500';
    if (fatigue < 60) return 'bg-yellow-500';
    if (fatigue < 80) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  const getFatigueMessage = () => {
    if (fatigue < 30) return '¡Energía maxima!';
    if (fatigue < 60) return 'Entrenamiento normal';
    if (fatigue < 80) return '⚠️ Fatiga acumulada - considera descansar';
    return '🔴¡Descanso obligatorio!';
  };

  const handleCompleteMission = (mission) => {
    if (completedMissions?.includes(mission.id)) return;
    
    const newCompleted = [...(completedMissions || []), mission.id];
    const newXp = Object.values(mission.xp).reduce((a, b) => a + b, 0) + (xp || 0);
    
    if (onUpdateProgress) {
      onUpdateProgress({ completedMissions: newCompleted, xp: newXp });
    }
  };

  const getTierForXp = (xpValue) => {
    if (xpValue >= tierSystem.champion.minXp) return tierSystem.champion;
    if (xpValue >= tierSystem.tier_s.minXp) return tierSystem.tier_s;
    if (xpValue >= tierSystem.tier_a.minXp) return tierSystem.tier_a;
    if (xpValue >= tierSystem.tier_b.minXp) return tierSystem.tier_b;
    return tierSystem.tier_c;
  };

  return (
    <div className="bg-kengan-card border border-gray-800 rounded-2xl overflow-hidden">
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-800">
        {[
          { id: 'profile', label: '⚔️', title: 'Perfil' },
          { id: 'knowledge', label: '📚', title: 'Saberes' },
          { id: 'missions', label: '📜', title: 'Misiones' },
          { id: 'arena', label: '🏆', title: 'Arena' }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-xl transition-colors ${
              activeTab === tab.id 
                ? 'bg-kengan-red text-white' 
                : 'text-gray-500 hover:text-white hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div>
          {/* Header */}
          <div className={`bg-gradient-to-r ${schoolData.color || 'from-gray-800 to-gray-900'} p-4`}>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center text-3xl border-2 border-kengan-gold">
                ⚔️
              </div>
              <div>
                <h2 className="text-xl font-black italic text-white">{warriorName || 'Unknown Warrior'}</h2>
                <p className="text-black/80 font-bold text-sm">{schoolData.name} | {experience}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${currentTier.id === 'champion' ? 'bg-yellow-500 text-black' : 'bg-white/20 text-white'}`}>
                    {currentTier.icon} {currentTier.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="p-3 border-b border-gray-800">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Progreso Tournament</span>
              <span>Sem {currentWeek || 1}/16</span>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-kengan-red to-kengan-gold"
                initial={{ width: 0 }} animate={{ width: `${weekProgress}%` }} />
            </div>
          </div>

          {/* Fatigue Bar */}
          <div className="p-3 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800/50">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                🔋 Energía
              </span>
              <span className={`text-xs font-bold ${
                fatigue < 30 ? 'text-green-400' : 
                fatigue < 60 ? 'text-yellow-400' : 
                fatigue < 80 ? 'text-orange-400' : 'text-red-400'
              }`}>
                {getFatigueMessage()}
              </span>
            </div>
            <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${getFatigueColor()}`}
                initial={{ width: 0 }} 
                animate={{ width: `${100 - fatigue}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>Agotado</span>
              <span>100%</span>
            </div>
          </div>

          {/* Stats */}
          <div className="p-3 space-y-2">
            {Object.entries(stats || {}).map(([stat, value]) => (
              <div key={stat} className="flex items-center gap-2">
                <span className={`text-xs w-12 ${primaryAttributes?.includes(stat) ? 'text-kengan-gold' : 'text-gray-400'}`}>
                  {statLabels[stat]?.icon} {statLabels[stat]?.name}
                </span>
                <div className="flex-1 bg-gray-800 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${primaryAttributes?.includes(stat) ? 'bg-kengan-gold' : 'bg-gray-600'}`}
                    initial={{ width: 0 }} animate={{ width: `${value}%` }}
                  />
                </div>
                <span className="text-xs text-white w-6 text-right">{value}</span>
              </div>
            ))}
          </div>

          {/* XP & Tier */}
          <div className="p-3 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">XP Total</span>
              <span className="text-lg font-black text-kengan-gold">{xp || 0}</span>
            </div>
          </div>

          {/* Rival */}
          {rival && (
            <div className="p-3 border-t border-gray-800 bg-red-900/10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-red-400 font-bold">👹 RIVAL</span>
                  <p className="text-white font-bold text-sm">{rival.name}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-red-900 text-red-300 rounded">{rival.tier?.name}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Knowledge Tab */}
      {activeTab === 'knowledge' && (
        <div className="p-4">
          <KnowledgeBase />
        </div>
      )}

      {/* Missions Tab */}
      {activeTab === 'missions' && (
        <div className="p-0">
          <MissionBoard 
            warriorData={warriorData} 
            onCompleteMission={handleCompleteMission}
          />
        </div>
      )}

      {/* Arena Tab */}
      {activeTab === 'arena' && (
        <div className="p-0">
          <ArenaStats warriorData={warriorData} />
        </div>
      )}
    </div>
  );
};

export default WarriorProfile;
