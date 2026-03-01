import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserProfileForm from '../components/UserProfileForm.jsx';
import FighterMatchReveal from '../components/FighterMatchReveal.jsx';
import WarriorProfile from '../components/WarriorProfile.jsx';
import { findBestMatch } from '../utils/matchAlgorithm.js';
import { generateWorkoutPlan } from '../utils/workoutGenerator.js';

const WorkoutsPage = () => {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'assessment', 'results', 'warrior'
  const [userProfile, setUserProfile] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState(null);

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleAssessmentComplete = (profileData) => {
    setUserProfile(profileData);
    
    // Calculate match
    const match = findBestMatch(profileData);
    setMatchResult(match);
    
    // Generate workout plan
    const plan = generateWorkoutPlan(profileData, match.bestMatch);
    setWorkoutPlan(plan);
    
    setCurrentView('warrior');
  };

  const handleRestart = () => {
    setCurrentView('landing');
    setUserProfile(null);
    setMatchResult(null);
    setWorkoutPlan(null);
  };

  return (
    <div className="min-h-screen bg-kengan-dark text-white pt-20 pb-12 px-6 md:px-12 selection:bg-kengan-gold selection:text-black">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <LandingView key="landing" onStartAssessment={handleStartAssessment} />
        )}

        {currentView === 'assessment' && (
          <AssessmentView 
            key="assessment" 
            onComplete={handleAssessmentComplete}
            onBack={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'warrior' && userProfile && (
          <WarriorView 
            key="warrior"
            userProfile={userProfile}
            workoutPlan={workoutPlan}
            matchResult={matchResult}
            onBack={() => setCurrentView('assessment')}
            onViewWorkouts={() => setCurrentView('results')}
            onRestart={handleRestart}
          />
        )}

        {currentView === 'results' && matchResult && workoutPlan && (
          <ResultsView 
            key="results"
            matchResult={matchResult.bestMatch}
            workoutPlan={workoutPlan}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const LandingView = ({ onStartAssessment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      {/* Hero Section */}
      <div className="text-center mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-kengan-gold/10 blur-[100px] -z-10"></div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white mb-6 leading-none">
            KENGAN<span className="text-kengan-gold">TRAINING</span>
          </h1>
          <div className="text-kengan-red text-xl md:text-2xl font-bold italic mb-8">
            "MATCH YOUR FIGHTER. FORGE YOUR DESTINY."
          </div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Unlock personalized training regimens based on the legendary fighters of the Kengan matches. 
            Our biometric analysis system will match you with your ideal fighter and create a custom workout plan 
            tailored to your goals, experience, and physical attributes.
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon="🎯"
          title="Biometric Matching"
          description="Advanced algorithm analyzes your physical stats, goals, and experience to find your perfect fighter match"
          delay={0.4}
        />
        <FeatureCard
          icon="💪"
          title="Personalized Plans"
          description="Custom weekly training schedules adapted to your equipment, time availability, and injury considerations"
          delay={0.6}
        />
        <FeatureCard
          icon="🥋"
          title="Fighter Philosophies"
          description="Train like legends with authentic workout styles inspired by each fighter's unique martial arts approach"
          delay={0.8}
        />
      </div>

      {/* Assessment Preview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-kengan-card border border-gray-800 rounded-3xl p-8 md:p-12 text-center"
      >
        <h2 className="text-3xl font-black italic text-kengan-gold mb-6">
          Ready to Find Your Fighter?
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Complete our comprehensive 4-step assessment covering physical stats, experience level, 
          training goals, equipment access, and health considerations. Takes about 3-5 minutes.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['Physical Stats', 'Experience & Goals', 'Equipment & Preferences', 'Training Schedule', 'Schedule & Health'].map((step, index) => (
            <div 
              key={step}
              className="bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300"
            >
              <span className="text-kengan-gold font-bold">{index + 1}.</span> {step}
            </div>
          ))}
        </div>

        <button
          onClick={onStartAssessment}
          className="bg-kengan-red hover:bg-red-700 text-white px-12 py-4 rounded-xl font-black italic text-lg tracking-wider transition-all duration-300 shadow-lg hover:shadow-red-900/50 transform hover:scale-105"
        >
          START FIGHTER ASSESSMENT
        </button>
      </motion.div>

      {/* Underground Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center mt-16 py-8 border-t border-gray-800"
      >
        <div className="text-kengan-gold font-black italic text-xl mb-2 tracking-tighter">
          YAMASHITA TRADING CO.
        </div>
        <div className="text-gray-700 text-xs uppercase tracking-[0.4em] font-bold">
          Underground Training Division - Confidential Access Only
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-kengan-card border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 group"
    >
      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wider">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const AssessmentView = ({ onComplete, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Overview
        </button>
      </div>

      {/* Assessment Form */}
      <UserProfileForm onComplete={onComplete} />
      
      {/* Assessment Info */}
      <div className="mt-8 bg-kengan-card/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-kengan-gold mb-3 uppercase tracking-widest">
          Assessment Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <strong className="text-white">Privacy:</strong> All data is processed locally and never stored externally
          </div>
          <div>
            <strong className="text-white">Accuracy:</strong> Based on professional fighter analysis and biomechanics
          </div>
          <div>
            <strong className="text-white">Customization:</strong> Plans adapt to injuries and equipment limitations
          </div>
          <div>
            <strong className="text-white">Flexibility:</strong> Modify intensity and schedule as needed
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ResultsView = ({ matchResult, workoutPlan, onRestart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header with restart option */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-black italic text-kengan-gold tracking-tighter">
            YOUR TRAINING DESTINY
          </h1>
          <p className="text-gray-400 mt-2">Matched and ready for underground training</p>
        </div>
        <button
          onClick={onRestart}
          className="text-gray-400 hover:text-white text-sm font-bold tracking-widest uppercase transition-colors"
        >
          New Assessment →
        </button>
      </div>

      {/* Match Results & Workout Plan */}
      <FighterMatchReveal 
        matchResult={matchResult}
        workoutPlan={workoutPlan}
      />
    </motion.div>
  );
};

export default WorkoutsPage;

const WarriorView = ({ userProfile, workoutPlan, matchResult, onBack, onViewWorkouts, onRestart }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
    <div className="flex justify-between mb-6">
      <button onClick={onBack} className="text-gray-400 hover:text-white">← Volver</button>
      <button onClick={onRestart} className="text-gray-400 hover:text-white text-sm font-bold">Nuevo →</button>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <WarriorProfile warriorData={userProfile} workoutPlan={workoutPlan} />
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-kengan-card border border-gray-800 rounded-xl p-5">
          <h3 className="text-xl font-black text-white mb-3">📋 Tu Plan</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-black/30 rounded p-3 text-center"><div className="text-xl font-black text-kengan-gold">{workoutPlan?.estimatedDuration?.workoutDays || 3}</div><div className="text-xs text-gray-400">Días/Sem</div></div>
            <div className="bg-black/30 rounded p-3 text-center"><div className="text-xl font-black text-kengan-gold">{workoutPlan?.estimatedDuration?.averageSessionLength || 45}m</div><div className="text-xs text-gray-400">Por sesión</div></div>
          </div>
          <button onClick={onViewWorkouts} className="w-full bg-kengan-red text-white py-3 rounded font-black italic">🏋️ VER RUTINAS</button>
        </div>
      </div>
    </div>
  </motion.div>
);