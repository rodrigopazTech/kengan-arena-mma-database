import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWisdom } from './WisdomTooltip.jsx';

const FighterMatchReveal = ({ matchResult, workoutPlan }) => {
  const [currentView, setCurrentView] = useState('reveal'); // 'reveal', 'workout', 'details'
  const { fighter, score, reasoning, matchLevel } = matchResult;
  const { showWisdom, WisdomTooltip } = useWisdom();

  const handleCompleteExercise = () => {
    showWisdom();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <WisdomTooltip />
      <AnimatePresence mode="wait">
        {currentView === 'reveal' && (
          <MatchRevealView 
            key="reveal"
            fighter={fighter}
            score={score}
            matchLevel={matchLevel}
            reasoning={reasoning}
            onViewWorkout={() => setCurrentView('workout')}
          />
        )}

        {currentView === 'workout' && (
          <WorkoutPlanView
            key="workout"
            workoutPlan={workoutPlan}
            fighter={fighter}
            onBack={() => setCurrentView('reveal')}
            onViewDetails={() => setCurrentView('details')}
          />
        )}

        {currentView === 'details' && (
          <DetailedWorkoutView
            key="details"
            workoutPlan={workoutPlan}
            onBack={() => setCurrentView('workout')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const MatchRevealView = ({ fighter, score, matchLevel, reasoning, onViewWorkout }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-kengan-card border border-gray-800 rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* Background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute inset-0 bg-gradient-to-br ${fighter.color}`} />
      </div>

      {/* Header */}
      <div className="relative p-8 md:p-12 text-center border-b border-gray-800">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-4xl font-black italic text-kengan-gold mb-4 tracking-tighter">
            YOUR FIGHTER MATCH
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-bold tracking-widest uppercase">
            Biometric Analysis Complete
          </p>
        </motion.div>
      </div>

      {/* Fighter Reveal */}
      <div className="relative p-8 md:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Fighter Image & Info */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="relative w-full max-w-md mx-auto lg:mx-0 mb-8">
              <div className="relative h-96 rounded-2xl overflow-hidden border border-gray-700">
                <img 
                  src={fighter.image} 
                  alt={fighter.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x600/000000/d4af37?text=CLASSIFIED";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kengan-card to-transparent opacity-60" />
              </div>
              
              {/* Match percentage overlay */}
              <div className="absolute top-4 right-4 bg-kengan-gold text-black px-4 py-2 rounded-full font-black text-lg">
                {score}%
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-black italic text-white leading-tight">
                {fighter.name}
              </h3>
              <p className="text-kengan-red text-lg italic font-bold">
                "{fighter.title}"
              </p>
              <p className="text-kengan-gold text-sm font-black tracking-widest uppercase">
                {fighter.style}
              </p>
            </div>
          </motion.div>

          {/* Match Details */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-8"
          >
            {/* Score Circle */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="rgb(75 85 99)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#D4AF37"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "283 283", strokeDashoffset: 283 }}
                    animate={{ 
                      strokeDasharray: "283 283", 
                      strokeDashoffset: 283 - (score / 100) * 283 
                    }}
                    transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">{score}%</div>
                    <div className="text-xs text-gray-400 uppercase font-bold">Match</div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-lg font-bold text-kengan-gold">{matchLevel}</p>
            </div>

            {/* Reasoning */}
            <div className="bg-black/30 rounded-xl p-6 border border-gray-700">
              <h4 className="text-lg font-black text-kengan-gold mb-4 uppercase tracking-widest">
                Match Analysis
              </h4>
              <div className="space-y-2">
                {reasoning.slice(0, 4).map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + (index * 0.1) }}
                    className="flex items-center text-sm text-gray-300"
                  >
                    <div className="w-2 h-2 bg-kengan-gold rounded-full mr-3 flex-shrink-0" />
                    {reason}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={onViewWorkout}
            className="bg-kengan-red hover:bg-red-700 text-white px-12 py-4 rounded-xl font-black italic text-lg tracking-wider transition-all duration-300 shadow-lg hover:shadow-red-900/50 transform hover:scale-105"
          >
            VIEW YOUR TRAINING PLAN
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const WorkoutPlanView = ({ workoutPlan, fighter, onBack, onViewDetails }) => {
  const [selectedDay, setSelectedDay] = useState('monday');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="bg-kengan-card border border-gray-800 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Match
          </button>
          <button
            onClick={onViewDetails}
            className="text-kengan-gold hover:text-yellow-300 text-sm font-bold transition-colors"
          >
            View Detailed Plan →
          </button>
        </div>

        <h2 className="text-3xl font-black italic text-white mb-2">
          {workoutPlan.fighterInfo.workoutStyle}
        </h2>
        <p className="text-gray-400 text-sm mb-6 italic">
          "{workoutPlan.fighterInfo.philosophy}"
        </p>

        {/* Weekly Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
            <div className="text-2xl font-black text-kengan-gold">
              {workoutPlan.estimatedDuration.workoutDays}
            </div>
            <div className="text-xs text-gray-400 uppercase font-bold">Days/Week</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
            <div className="text-2xl font-black text-kengan-gold">
              {workoutPlan.estimatedDuration.averageSessionLength}m
            </div>
            <div className="text-xs text-gray-400 uppercase font-bold">Per Session</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
            <div className="text-2xl font-black text-kengan-gold">
              {Math.round(workoutPlan.estimatedDuration.totalWeeklyMinutes / 60)}h
            </div>
            <div className="text-xs text-gray-400 uppercase font-bold">Total/Week</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
            <div className="text-2xl font-black text-kengan-gold">
              {workoutPlan.estimatedDuration.estimatedIntensity.split('_')[0]}
            </div>
            <div className="text-xs text-gray-400 uppercase font-bold">Intensity</div>
          </div>
        </div>

        {/* Combo Progress Summary */}
        {workoutPlan.comboProgress && (
          <div className="mt-6 bg-purple-900/20 rounded-lg p-4 border border-purple-800/50">
            <h4 className="text-sm font-bold text-purple-400 mb-2 uppercase tracking-widest">
              🥊 Combo Progression - {workoutPlan.comboProgress.styleName}
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-gray-400">
                Estilos base: {workoutPlan.comboProgress.baseStyles.join(', ')}
              </span>
              <span className="text-xs text-kengan-gold">
                Total combos: {workoutPlan.comboProgress.totalCombos}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Daily Workout Selector */}
      <div className="bg-kengan-card border border-gray-800 rounded-2xl overflow-hidden">
        {/* Day Selector */}
        <div className="flex overflow-x-auto border-b border-gray-800">
          {Object.keys(workoutPlan.dailyWorkouts).map(day => {
            const dayConfig = workoutPlan.dailyWorkouts[day].dayConfig;
            const combatTypes = dayConfig?.combatTypes || [];
            const locationIcon = dayConfig?.location === 'home' ? '🏠' : '🏋️';
            const typeIcon = dayConfig?.focus === 'combate' ? '🥊' : dayConfig?.focus === 'gym' ? '💪' : '🔥';
            const combatStyleIcons = combatTypes.map(t => {
              const styleMap = { boxing: '🥊', muay_thai: '🦵', bjj: '🟢', wrestling: '🤼', hardening: '�岩石', mma: '🎯' };
              return styleMap[t] || '⚔️';
            }).join('');
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 flex flex-col items-center ${
                  selectedDay === day
                    ? 'bg-kengan-gold text-black'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <span>{day}</span>
                <span className="text-[10px] mt-1">{locationIcon} {typeIcon} {combatStyleIcons}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Day Content */}
        <div className="p-8">
          <DailyWorkoutDisplay 
            workout={workoutPlan.dailyWorkouts[selectedDay]} 
            dayName={selectedDay}
          />
        </div>
      </div>

      {/* Safety & Progression */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-kengan-card border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-black text-kengan-gold mb-4 uppercase tracking-widest">
            Progression Tips
          </h3>
          <div className="space-y-2">
            {workoutPlan.progressionTips.map((tip, index) => (
              <div key={index} className="flex items-start text-sm text-gray-300">
                <div className="w-2 h-2 bg-kengan-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                {tip}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-kengan-card border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-black text-red-400 mb-4 uppercase tracking-widest">
            Safety First
          </h3>
          <div className="space-y-2">
            {workoutPlan.safetyConsiderations.map((consideration, index) => (
              <div key={index} className="flex items-start text-sm text-gray-300">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                {consideration}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DailyWorkoutDisplay = ({ workout, dayName }) => {
  const typeLabels = {
    push: 'Push', pull: 'Pull', legs: 'Legs', upper: 'Upper', lower: 'Lower', full: 'Full Body'
  };
  const locationIcon = workout.dayConfig?.location === 'home' ? '🏠' : '🏋️';
  const locationText = workout.dayConfig?.location === 'home' ? 'Casa' : 'Gym';
  const focusText = workout.dayConfig?.focus === 'combate' ? 'Combate' : 
                   workout.dayConfig?.focus === 'gym' ? 'Gym' : 'Combate + Gym';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black italic text-white capitalize">
            {dayName} - {typeLabels[workout.dayConfig?.type] || workout.focusArea.replace('_', ' ')}
          </h3>
          <div className="flex gap-3 mt-1">
            <span className={`text-xs px-2 py-1 rounded font-bold ${
              workout.dayConfig?.location === 'home' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'
            }`}>
              {locationIcon} {locationText}
            </span>
            {workout.isGym && (
              <span className="text-xs px-2 py-1 rounded bg-kengan-gold/20 text-kengan-gold font-bold">
                💪 GYM
              </span>
            )}
            {workout.isCombat && (
              <span className="text-xs px-2 py-1 rounded bg-purple-900 text-purple-300 font-bold">
                🥊 COMBAT
              </span>
            )}
          </div>
        </div>
        <div className="text-sm">
          <span className="text-gray-400">Intensity: </span>
          <span className={`font-bold ${
            workout.intensity === 'High' || workout.intensity === 'Very High' ? 'text-red-400' :
            workout.intensity === 'Moderate' ? 'text-yellow-400' : 'text-green-400'
          }`}>
            {workout.intensity}
          </span>
        </div>
      </div>

      {/* Warm Up */}
      <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800/50">
        <h4 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">
          🏃 Warm Up (5-10 min)
        </h4>
        <div className="flex flex-wrap gap-2">
          {workout.warmUp.map((item, index) => (
            <span key={index} className="bg-blue-800/30 text-blue-200 text-xs px-2 py-1 rounded">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* GYM Exercises Section */}
      {workout.isGym && workout.gymExercises && (
        <div className="bg-kengan-gold/10 rounded-lg p-4 border border-kengan-gold/50">
          <h4 className="text-sm font-bold text-kengan-gold mb-4 uppercase tracking-widest">
            🏋️ GYM EXERCISES - {typeLabels[workout.dayConfig?.type]?.toUpperCase() || 'FULL BODY'}
          </h4>
          <div className="space-y-3">
            {workout.gymExercises.map((exercise, index) => (
              <div key={index} className="bg-black/40 rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-white text-lg">{exercise.name}</h5>
                  <div className="text-right">
                    <span className="text-kengan-gold font-bold text-sm">
                      {exercise.sets} series × {exercise.reps} reps
                    </span>
                    {exercise.weight && (
                      <span className="text-gray-400 text-xs block">
                        {exercise.weight}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {exercise.muscles?.map((muscle, i) => (
                    <span key={i} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                      {muscle}
                    </span>
                  ))}
                </div>
                {exercise.hasSubstitution && exercise.substitution && (
                  <div className="mt-2 text-xs text-yellow-400 bg-yellow-900/20 p-2 rounded border border-yellow-800">
                    ⚠️ Substitution: {exercise.substitution.name} ({exercise.substitution.reason})
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Combat Rounds Section */}
      {workout.isCombat && workout.combatRounds && (
        <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800/50">
          <h4 className="text-sm font-bold text-purple-400 mb-2 uppercase tracking-widest">
            🥊 COMBAT TRAINING
          </h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {workout.dayConfig?.combatTypes?.map((type, idx) => {
              const styleMap = { 
                boxing: { icon: '🥊', name: 'Boxeo' }, 
                muay_thai: { icon: '🦵', name: 'Muay Thai' }, 
                bjj: { icon: '🟢', name: 'BJJ' }, 
                wrestling: { icon: '🤼', name: 'Wrestling' }, 
                hardening: { icon: '🪨', name: 'Endurecimiento' },
                mma: { icon: '🎯', name: 'MMA' }
              };
              const style = styleMap[type] || { icon: '⚔️', name: type };
              return (
                <span key={idx} className="bg-purple-800/50 text-purple-200 text-xs px-2 py-1 rounded border border-purple-600">
                  {style.icon} {style.name}
                </span>
              );
            })}
          </div>
          <div className="flex gap-4 text-xs text-purple-300 mb-4">
            <span>📊 {workout.combatRounds.numRounds} Rounds</span>
            <span>⏱️ {workout.combatRounds.roundLength} min/round</span>
            <span>😴 {workout.combatRounds.restBetweenRounds} min rest</span>
          </div>
          
          <div className="space-y-3">
            {workout.combatRounds.rounds.map((round, rIndex) => (
              <div key={rIndex} className="bg-black/40 rounded-lg p-3 border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-400 font-bold">
                    Round {round.round}
                  </span>
                  <span className="text-xs text-gray-400">
                    {round.duration} min
                  </span>
                </div>
                <div className="space-y-1">
                  {round.combos.map((combo, cIndex) => (
                    <div key={cIndex} className="flex items-center text-sm">
                      <span className="text-gray-500 mr-2">▶</span>
                      <span className="text-white font-bold">{combo.name}</span>
                      <span className="text-gray-400 text-xs ml-2">- {combo.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cool Down */}
      <div className="bg-green-900/20 rounded-lg p-4 border border-green-800/50">
        <h4 className="text-sm font-bold text-green-400 mb-2 uppercase tracking-widest">
          Cool Down (5-10 min)
        </h4>
        <div className="flex flex-wrap gap-2">
          {workout.coolDown.map((item, index) => (
            <span key={index} className="bg-green-800/30 text-green-200 text-xs px-2 py-1 rounded">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Daily Notes */}
      <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-600">
        <p className="text-sm text-gray-300 italic">
          <strong className="text-kengan-gold">Today's Focus:</strong> {workout.notes}
        </p>
      </div>
    </div>
  );
};

const DetailedWorkoutView = ({ workoutPlan, onBack }) => {
  const { showWisdom, WisdomTooltip } = useWisdom();
  const [completedExercises, setCompletedExercises] = useState({});

  const toggleExercise = (dayKey, exerciseIndex) => {
    setCompletedExercises(prev => ({
      ...prev,
      [`${dayKey}-${exerciseIndex}`]: !prev[`${dayKey}-${exerciseIndex}`]
    }));
    if (!completedExercises[`${dayKey}-${exerciseIndex}`]) {
      showWisdom();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-kengan-card border border-gray-800 rounded-2xl p-8"
    >
      <WisdomTooltip />
      
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Overview
        </button>
        <button className="bg-kengan-gold text-black px-6 py-2 rounded font-bold text-sm hover:bg-yellow-500 transition-colors">
          Download PDF
        </button>
      </div>

      <h2 className="text-3xl font-black italic text-white mb-2">
        Complete Weekly Training Plan
      </h2>
      <p className="text-gray-400 mb-8 text-sm">
        {workoutPlan.fighterInfo.philosophy}
      </p>

      {/* Resumen de la semana */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-black text-kengan-gold">
            {Object.keys(workoutPlan.dailyWorkouts).filter(d => !workoutPlan.dailyWorkouts[d].dayConfig?.isRest).length}
          </div>
          <div className="text-xs text-gray-400 uppercase">Días Activos</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-black text-kengan-gold">
            {Object.values(workoutPlan.dailyWorkouts).filter(d => d.isCombat).length}
          </div>
          <div className="text-xs text-gray-400 uppercase">Días Combate</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-black text-kengan-gold">
            {Math.round(workoutPlan.estimatedDuration.totalWeeklyMinutes / 60)}h
          </div>
          <div className="text-xs text-gray-400 uppercase">Total Semanal</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-black text-kengan-gold">
            {workoutPlan.estimatedDuration.estimatedIntensity.split('_')[0]}
          </div>
          <div className="text-xs text-gray-400 uppercase">Intensidad</div>
        </div>
      </div>

      {/* Días detallados */}
      <div className="space-y-6">
        {Object.entries(workoutPlan.dailyWorkouts).map(([dayName, workout]) => {
          if (workout.dayConfig?.isRest) return null;
          
          return (
            <div key={dayName} className="bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-kengan-gold/20 to-transparent p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-white capitalize">{dayName}</h3>
                  <div className="flex gap-2">
                    {workout.isGym && <span className="bg-kengan-gold/20 text-kengan-gold text-xs px-2 py-1 rounded">💪 Gym</span>}
                    {workout.isCombat && <span className="bg-purple-600/20 text-purple-400 text-xs px-2 py-1 rounded">🥊 Combate</span>}
                    <span className={`text-xs px-2 py-1 rounded ${
                      workout.intensity === 'High' ? 'bg-red-900/30 text-red-400' :
                      workout.intensity === 'Moderate' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-green-900/30 text-green-400'
                    }`}>
                      {workout.intensity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Warm Up */}
                <div>
                  <h4 className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-2">
                    🏃 Warm Up
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {workout.warmUp.map((item, i) => (
                      <span key={i} className="bg-blue-900/30 text-blue-200 text-xs px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gym Exercises */}
                {workout.isGym && workout.gymExercises && (
                  <div>
                    <h4 className="text-sm font-bold text-kengan-gold mb-2 flex items-center gap-2">
                      🏋️ Ejercicios de Gym
                    </h4>
                    <div className="space-y-2">
                      {workout.gymExercises.map((ex, i) => (
                        <div key={i} className="bg-black/40 rounded-lg p-3 border border-gray-700">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-bold text-white">{ex.name}</h5>
                              <p className="text-xs text-gray-400 mt-1">{ex.muscles?.join(', ')}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-kengan-gold font-bold text-sm">
                                {ex.sets}×{ex.reps}
                              </span>
                              {ex.weight && (
                                <p className="text-xs text-gray-500">{ex.weight}</p>
                              )}
                            </div>
                          </div>
                          <button 
                            onClick={() => handleCompleteExercise()}
                            className="mt-2 w-full bg-green-900/30 hover:bg-green-800/50 text-green-400 text-xs py-2 rounded transition-colors flex items-center justify-center gap-2"
                          >
                            ✓ Completar - Obtener sabiduría
                          </button>
                          {ex.hasSubstitution && ex.substitution && (
                            <div className="mt-2 text-xs text-yellow-400 bg-yellow-900/20 p-2 rounded">
                              ⚠️ Sustitución: {ex.substitution.name}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Combat Rounds */}
                {workout.isCombat && workout.combatRounds && (
                  <div>
                    <h4 className="text-sm font-bold text-purple-400 mb-2 flex items-center gap-2">
                      🥊 Rondas de Combate
                    </h4>
                    <div className="flex gap-4 text-xs text-purple-300 mb-3">
                      <span>📊 {workout.combatRounds.numRounds} Rounds</span>
                      <span>⏱️ {workout.combatRounds.roundLength} min/round</span>
                    </div>
                    <div className="space-y-2">
                      {workout.combatRounds.rounds.map((round, rIdx) => (
                        <div key={rIdx} className="bg-black/40 rounded-lg p-3 border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-purple-400 font-bold">Round {round.round}</span>
                            <span className="text-xs text-gray-500">{round.duration} min</span>
                          </div>
                          <div className="space-y-1">
                            {round.combos.map((combo, cIdx) => (
                              <div key={cIdx} className="flex items-center text-sm">
                                <span className="text-gray-500 mr-2">▶</span>
                                <span className="text-white font-bold">{combo.name}</span>
                                <span className="text-gray-400 text-xs ml-2">- {combo.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cool Down */}
                <div>
                  <h4 className="text-sm font-bold text-green-400 mb-2 flex items-center gap-2">
                    ❄️ Cool Down
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {workout.coolDown.map((item, i) => (
                      <span key={i} className="bg-green-900/30 text-green-200 text-xs px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-sm text-gray-300 italic">
                    <strong className="text-kengan-gold">📝 Nota:</strong> {workout.notes}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FighterMatchReveal;