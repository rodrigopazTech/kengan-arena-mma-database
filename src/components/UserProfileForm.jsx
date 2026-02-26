import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UserProfileForm = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    bodyType: '',
    experience: '',
    goals: [],
    exercisePreferences: [],
    equipment: '',
    timeAvailable: {
      daysPerWeek: 3,
      sessionLength: 45
    },
    injuries: []
  });

  const steps = [
    {
      title: "Physical Stats",
      subtitle: "Let's start with your basic measurements",
      fields: ['height', 'weight', 'age', 'bodyType']
    },
    {
      title: "Experience & Goals",
      subtitle: "Tell us about your training background",
      fields: ['experience', 'goals']
    },
    {
      title: "Preferences & Equipment",
      subtitle: "What's your training style preference?",
      fields: ['exercisePreferences', 'equipment']
    },
    {
      title: "Schedule & Health",
      subtitle: "Final details for your personalized plan",
      fields: ['timeAvailable', 'injuries']
    }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every(field => {
      if (field === 'goals' || field === 'exercisePreferences') {
        return formData[field].length > 0;
      }
      if (field === 'timeAvailable') {
        return formData.timeAvailable.daysPerWeek && formData.timeAvailable.sessionLength;
      }
      if (field === 'injuries') {
        return true; // Optional field
      }
      return formData[field] && formData[field] !== '';
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PhysicalStatsStep formData={formData} onChange={handleInputChange} />;
      case 1:
        return <ExperienceGoalsStep formData={formData} onChange={handleInputChange} onMultiSelect={handleMultiSelect} />;
      case 2:
        return <PreferencesEquipmentStep formData={formData} onMultiSelect={handleMultiSelect} onChange={handleInputChange} />;
      case 3:
        return <ScheduleHealthStep formData={formData} onChange={handleInputChange} onMultiSelect={handleMultiSelect} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-kengan-card border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-kengan-red to-kengan-gold p-6">
        <h2 className="text-3xl font-black italic text-white mb-2">
          Fighter Assessment
        </h2>
        <p className="text-black/80 font-bold">
          {steps[currentStep].subtitle}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-bold text-kengan-gold">
            {steps[currentStep].title}
          </span>
        </div>
        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-kengan-gold"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 bg-gray-900/50 border-t border-gray-800 flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`px-6 py-2 text-sm font-black tracking-widest uppercase transition-all duration-300 ${
            currentStep === 0
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500'
          }`}
        >
          Back
        </button>

        <button
          onClick={nextStep}
          disabled={!isStepValid()}
          className={`px-8 py-2 text-sm font-black tracking-widest uppercase transition-all duration-300 ${
            isStepValid()
              ? 'bg-kengan-gold text-black hover:bg-yellow-500 shadow-lg'
              : 'bg-gray-800 text-gray-600 cursor-not-allowed'
          }`}
        >
          {currentStep === steps.length - 1 ? 'Find My Fighter' : 'Next'}
        </button>
      </div>
    </div>
  );
};

// Step Components
const PhysicalStatsStep = ({ formData, onChange }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">
          Height (cm)
        </label>
        <input
          type="number"
          value={formData.height}
          onChange={(e) => onChange('height', e.target.value)}
          className="w-full p-3 bg-black/50 border border-gray-700 rounded text-white focus:border-kengan-gold focus:outline-none"
          placeholder="175"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">
          Weight (kg)
        </label>
        <input
          type="number"
          value={formData.weight}
          onChange={(e) => onChange('weight', e.target.value)}
          className="w-full p-3 bg-black/50 border border-gray-700 rounded text-white focus:border-kengan-gold focus:outline-none"
          placeholder="70"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">
          Age
        </label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) => onChange('age', e.target.value)}
          className="w-full p-3 bg-black/50 border border-gray-700 rounded text-white focus:border-kengan-gold focus:outline-none"
          placeholder="25"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">
        Body Type
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['lean', 'athletic', 'muscular', 'powerlifter'].map(type => (
          <button
            key={type}
            onClick={() => onChange('bodyType', type)}
            className={`p-3 rounded border-2 transition-all duration-300 text-sm font-bold uppercase tracking-wider ${
              formData.bodyType === type
                ? 'border-kengan-gold bg-kengan-gold/20 text-kengan-gold'
                : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const ExperienceGoalsStep = ({ formData, onChange, onMultiSelect }) => (
  <div className="space-y-8">
    <div>
      <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">
        Experience Level
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['beginner', 'intermediate', 'advanced'].map(level => (
          <button
            key={level}
            onClick={() => onChange('experience', level)}
            className={`p-4 rounded border-2 transition-all duration-300 text-sm font-bold uppercase tracking-wider ${
              formData.experience === level
                ? 'border-kengan-gold bg-kengan-gold/20 text-kengan-gold'
                : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">
        Goals (Select all that apply)
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {['weight_loss', 'muscle_gain', 'fitness', 'strength', 'flexibility', 'endurance', 'self_defense'].map(goal => (
          <button
            key={goal}
            onClick={() => onMultiSelect('goals', goal)}
            className={`p-3 rounded border-2 transition-all duration-300 text-xs font-bold uppercase tracking-wider ${
              formData.goals.includes(goal)
                ? 'border-kengan-gold bg-kengan-gold/20 text-kengan-gold'
                : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            {goal.replace('_', ' ')}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const PreferencesEquipmentStep = ({ formData, onMultiSelect, onChange }) => (
  <div className="space-y-8">
    <div>
      <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">
        Exercise Preferences
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['martial_arts', 'gym', 'both'].map(pref => (
          <button
            key={pref}
            onClick={() => {
              if (pref === 'both') {
                onChange('exercisePreferences', ['martial_arts', 'gym']);
              } else {
                onMultiSelect('exercisePreferences', pref);
              }
            }}
            className={`p-4 rounded border-2 transition-all duration-300 text-sm font-bold uppercase tracking-wider ${
              (pref === 'both' && formData.exercisePreferences.length === 2) ||
              (pref !== 'both' && formData.exercisePreferences.includes(pref))
                ? 'border-kengan-gold bg-kengan-gold/20 text-kengan-gold'
                : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            {pref.replace('_', ' ')}
          </button>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">
        Available Equipment
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { value: 'none', label: 'Bodyweight Only' },
          { value: 'basic', label: 'Basic Equipment' },
          { value: 'full_gym', label: 'Full Gym Access' }
        ].map(equipment => (
          <button
            key={equipment.value}
            onClick={() => onChange('equipment', equipment.value)}
            className={`p-4 rounded border-2 transition-all duration-300 text-sm font-bold uppercase tracking-wider ${
              formData.equipment === equipment.value
                ? 'border-kengan-gold bg-kengan-gold/20 text-kengan-gold'
                : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            {equipment.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const ScheduleHealthStep = ({ formData, onChange, onMultiSelect }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">
          Days per Week
        </label>
        <select
          value={formData.timeAvailable.daysPerWeek}
          onChange={(e) => onChange('timeAvailable.daysPerWeek', parseInt(e.target.value))}
          className="w-full p-3 bg-black/50 border border-gray-700 rounded text-white focus:border-kengan-gold focus:outline-none"
        >
          {[1, 2, 3, 4, 5, 6].map(days => (
            <option key={days} value={days}>{days} days</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">
          Session Length (minutes)
        </label>
        <select
          value={formData.timeAvailable.sessionLength}
          onChange={(e) => onChange('timeAvailable.sessionLength', parseInt(e.target.value))}
          className="w-full p-3 bg-black/50 border border-gray-700 rounded text-white focus:border-kengan-gold focus:outline-none"
        >
          {[15, 30, 45, 60, 90, 120].map(minutes => (
            <option key={minutes} value={minutes}>{minutes} minutes</option>
          ))}
        </select>
      </div>
    </div>

    <div>
      <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">
        Current Injuries (Optional)
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['back', 'knee', 'shoulder', 'wrist', 'ankle', 'hip'].map(injury => (
          <button
            key={injury}
            onClick={() => onMultiSelect('injuries', injury)}
            className={`p-3 rounded border-2 transition-all duration-300 text-sm font-bold uppercase tracking-wider ${
              formData.injuries.includes(injury)
                ? 'border-red-500 bg-red-500/20 text-red-400'
                : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            {injury}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-2">
        Select any areas with current injuries for personalized modifications
      </p>
    </div>
  </div>
);

export default UserProfileForm;