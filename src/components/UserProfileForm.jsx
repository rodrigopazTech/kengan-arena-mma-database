import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { artStyles, combatStyles } from '../data/combos.js';
import { warriorSchools, experienceLevels, attributes, tierSystem, getTierForXp, generateRival } from '../data/warriorSystem.js';

const workoutStructures = {
  1: { name: "Full Body", days: [{ type: "full", focus: "gym", location: "gym", combatTypes: [] }] },
  2: { name: "Full Body x2", days: [{ type: "full", focus: "gym", location: "gym", combatTypes: [] }, { type: "full", focus: "gym", location: "gym", combatTypes: [] }] },
  3: { name: "Upper / Lower / Full Body", days: [{ type: "upper", focus: "gym", location: "gym", combatTypes: [] }, { type: "lower", focus: "gym", location: "gym", combatTypes: [] }, { type: "full", focus: "gym", location: "gym", combatTypes: [] }] },
  4: { name: "Upper / Lower / Upper / Lower", days: [{ type: "upper", focus: "gym", location: "gym", combatTypes: [] }, { type: "lower", focus: "gym", location: "gym", combatTypes: [] }, { type: "upper", focus: "gym", location: "gym", combatTypes: [] }, { type: "lower", focus: "gym", location: "gym", combatTypes: [] }] },
  5: { name: "Upper / Lower / Full / Upper / Lower", days: [{ type: "upper", focus: "gym", location: "gym", combatTypes: [] }, { type: "lower", focus: "gym", location: "gym", combatTypes: [] }, { type: "full", focus: "gym", location: "gym", combatTypes: [] }, { type: "upper", focus: "gym", location: "gym", combatTypes: [] }, { type: "lower", focus: "gym", location: "gym", combatTypes: [] }] },
  6: { name: "Push / Pull / Legs / Upper / Lower / Full", days: [{ type: "push", focus: "gym", location: "gym", combatTypes: [] }, { type: "pull", focus: "gym", location: "gym", combatTypes: [] }, { type: "legs", focus: "gym", location: "gym", combatTypes: [] }, { type: "upper", focus: "gym", location: "gym", combatTypes: [] }, { type: "lower", focus: "gym", location: "gym", combatTypes: [] }, { type: "full", focus: "gym", location: "gym", combatTypes: [] }] }
};

const UserProfileForm = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    bodyType: '',
    warriorName: '',
    school: '',
    experience: '',
    goals: [],
    exercisePreferences: [],
    equipment: '',
    preferredArts: [],
    primaryAttributes: [],
    trainingDays: { structure: 3, days: [{ type: 'full', focus: 'gym', location: 'gym', combatTypes: [] }] },
    timeAvailable: { daysPerWeek: 3, sessionLength: 45 },
    injuries: []
  });

  const steps = [
    { title: "Warrior Identity", subtitle: "Create your fighter identity", fields: ['warriorName'] },
    { title: "Physical Stats", subtitle: "Your basic measurements", fields: ['height', 'weight', 'age', 'bodyType'] },
    { title: "School & Experience", subtitle: "Choose your path as a warrior", fields: ['school', 'experience'] },
    { title: "Attributes", subtitle: "Choose your 3 primary attributes", fields: ['primaryAttributes'] },
    { title: "Preferences", subtitle: "Training style preferences", fields: ['exercisePreferences', 'equipment'] },
    { title: "Training Schedule", subtitle: "Configure your weekly training", fields: ['trainingDays'] },
    { title: "Schedule & Health", subtitle: "Final details", fields: ['timeAvailable', 'injuries'] }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter(item => item !== value) : [...prev[field], value]
    }));
  };

  const handleAttributeSelect = (attrId) => {
    const current = formData.primaryAttributes;
    if (current.includes(attrId)) {
      handleMultiSelect('primaryAttributes', attrId);
    } else if (current.length < 3) {
      handleMultiSelect('primaryAttributes', attrId);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const stats = calculateInitialStats(formData);
      const tier = getTierForXp(0);
      const rival = generateRival(stats, formData.school);
      onComplete({ ...formData, stats, tier, rival, currentWeek: 1, xp: 0, completedMissions: [] });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every(field => {
      if (field === 'primaryAttributes') return formData.primaryAttributes.length > 0;
      if (field === 'goals' || field === 'exercisePreferences' || field === 'preferredArts') return formData[field]?.length > 0;
      if (field === 'trainingDays') return formData.trainingDays?.structure > 0;
      if (field === 'timeAvailable') return formData.timeAvailable?.daysPerWeek > 0;
      if (field === 'injuries') return true;
      return formData[field] && formData[field] !== '';
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <WarriorIdentityStep formData={formData} onChange={handleInputChange} />;
      case 1: return <PhysicalStatsStep formData={formData} onChange={handleInputChange} />;
      case 2: return <SchoolExperienceStep formData={formData} onChange={handleInputChange} />;
      case 3: return <AttributesStep formData={formData} onSelect={handleAttributeSelect} />;
      case 4: return <PreferencesEquipmentStep formData={formData} onMultiSelect={handleMultiSelect} onChange={handleInputChange} />;
      case 5: return <TrainingScheduleStep formData={formData} onChange={handleInputChange} onMultiSelect={handleMultiSelect} />;
      case 6: return <ScheduleHealthStep formData={formData} onChange={handleInputChange} onMultiSelect={handleMultiSelect} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-kengan-card border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-kengan-red to-kengan-gold p-6">
        <h2 className="text-3xl font-black italic text-white mb-2">KENGAN WARRIOR</h2>
        <p className="text-black/80 font-bold">{steps[currentStep].subtitle}</p>
      </div>
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm font-bold text-kengan-gold">{steps[currentStep].title}</span>
        </div>
        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
          <motion.div className="h-full bg-kengan-gold" initial={{ width: 0 }} animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>
      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="p-6 bg-gray-900/50 border-t border-gray-800 flex justify-between">
        <button onClick={prevStep} disabled={currentStep === 0} className={`px-6 py-2 text-sm font-black tracking-widest uppercase transition-all ${currentStep === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500'}`}>Back</button>
        <button onClick={nextStep} disabled={!isStepValid()} className={`px-8 py-2 text-sm font-black tracking-widest uppercase transition-all ${isStepValid() ? 'bg-kengan-gold text-black hover:bg-yellow-500 shadow-lg' : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}>{currentStep === steps.length - 1 ? 'BEGIN JOURNEY' : 'Next'}</button>
      </div>
    </div>
  );
};

const calculateInitialStats = (formData) => {
  const baseStats = { str: 30, spd: 30, def: 30, tec: 30, sta: 30, mnt: 30 };
  const school = warriorSchools[formData.school];
  if (school) {
    Object.keys(baseStats).forEach(key => {
      baseStats[key] += school.statsBonus[key] || 0;
    });
  }
  formData.primaryAttributes.forEach(attr => {
    baseStats[attr] = Math.min(99, baseStats[attr] + 15);
  });
  return baseStats;
};

const WarriorIdentityStep = ({ formData, onChange }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="text-6xl mb-4">⚔️</div>
      <h3 className="text-2xl font-black italic text-white mb-2">Create Your Warrior Name</h3>
      <p className="text-gray-400 text-sm">El nombre que te dará miedo en el underground</p>
    </div>
    <div>
      <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Warrior Name</label>
      <input type="text" value={formData.warriorName} onChange={(e) => onChange('warriorName', e.target.value)}
        className="w-full p-4 bg-black/50 border-2 border-kengan-gold rounded text-white text-xl font-bold focus:outline-none text-center" placeholder="The Iron Fighter" maxLength={30} />
    </div>
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
      <p className="text-xs text-gray-500 text-center italic">"En el underground, tu nombre es tu reputación. Escoge sabiamente."</p>
    </div>
  </div>
);

const PhysicalStatsStep = ({ formData, onChange }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Height (cm)</label>
        <input type="number" value={formData.height} onChange={(e) => onChange('height', e.target.value)}
          className="w-full p-3 bg-black/50 border border-gray-700 rounded text-white focus:border-kengan-gold focus:outline-none" placeholder="175" />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Weight (kg)</label>
        <input type="number" value={formData.weight} onChange={(e) => onChange('weight', e.target.value)}
          className="w-full p-3 bg-black/50 border border-gray-700 rounded text-white focus:border-kengan-gold focus:outline-none" placeholder="70" />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Age</label>
        <input type="number" value={formData.age} onChange={(e) => onChange('age', e.target.value)}
          className="w-full p-3 bg-black/50 border border-gray-700 rounded text-white focus:border-kengan-gold focus:outline-none" placeholder="25" />
      </div>
    </div>
    <div>
      <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Body Type</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['lean', 'athletic', 'muscular', 'powerlifter'].map(type => (
          <button key={type} onClick={() => onChange('bodyType', type)}
            className={`p-3 rounded border-2 transition-all duration-300 text-sm font-bold uppercase tracking-wider ${formData.bodyType === type ? 'border-kengan-gold bg-kengan-gold/20 text-kengan-gold' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
            {type}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const SchoolExperienceStep = ({ formData, onChange }) => (
  <div className="space-y-8">
    <div>
      <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Choose Your School</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(warriorSchools).map(school => (
          <button key={school.id} onClick={() => onChange('school', school.id)}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center ${formData.school === school.id ? 'border-kengan-gold bg-kengan-gold/20 scale-105' : 'border-gray-700 hover:border-gray-500'}`}>
            <div className="text-4xl mb-3">{school.icon}</div>
            <h4 className="text-lg font-black text-white mb-2">{school.name}</h4>
            <p className="text-xs text-gray-400 mb-3">{school.description}</p>
            <div className="text-[10px] text-gray-500">+{school.statsBonus.str} STR | +{school.statsBonus.tec} TEC</div>
          </button>
        ))}
      </div>
    </div>
    <div>
      <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Experience Level</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(experienceLevels).map(level => (
          <button key={level.id} onClick={() => onChange('experience', level.id)}
            className={`p-4 rounded border-2 transition-all duration-300 text-center ${formData.experience === level.id ? 'border-kengan-red bg-kengan-red/20' : 'border-gray-700 hover:border-gray-500'}`}>
            <div className="text-3xl mb-2">{level.icon}</div>
            <h4 className="text-sm font-bold text-white">{level.name}</h4>
            <p className="text-xs text-gray-400 mt-1">{level.description}</p>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const AttributesStep = ({ formData, onSelect }) => (
  <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-xl font-black text-white mb-2">Elige tus 3 Atributos Principales</h3>
      <p className="text-gray-400 text-sm">Estos definen tu estilo de combate</p>
      <p className="text-kengan-gold text-sm mt-2">({formData.primaryAttributes.length}/3 seleccionados)</p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Object.values(attributes).map(attr => (
        <button key={attr.id} onClick={() => onSelect(attr.id)}
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${formData.primaryAttributes.includes(attr.id) ? 'border-kengan-gold bg-kengan-gold/20 scale-105' : 'border-gray-700 hover:border-gray-500'}`}>
          <div className="text-3xl mb-2">{attr.icon}</div>
          <h4 className="text-lg font-black text-white">{attr.name}</h4>
          <p className="text-xs text-gray-400">{attr.fullName}</p>
        </button>
      ))}
    </div>
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
      <p className="text-xs text-gray-400">💡 Consejo: Elige atributos que complementen tu escuela. Power Gym: STR+STA+DEF. Fight Club: TEC+SPD+MNT.</p>
    </div>
  </div>
);

const PreferencesEquipmentStep = ({ formData, onMultiSelect, onChange }) => (
  <div className="space-y-8">
    <div>
      <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Exercise Preferences</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['martial_arts', 'gym', 'both'].map(pref => (
          <button key={pref} onClick={() => { if (pref === 'both') onChange('exercisePreferences', ['martial_arts', 'gym']); else onMultiSelect('exercisePreferences', pref); }}
            className={`p-4 rounded border-2 transition-all duration-300 text-sm font-bold uppercase tracking-wider ${(pref === 'both' && formData.exercisePreferences.length === 2) || (pref !== 'both' && formData.exercisePreferences.includes(pref)) ? 'border-kengan-gold bg-kengan-gold/20 text-kengan-gold' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
            {pref.replace('_', ' ')}
          </button>
        ))}
      </div>
    </div>
    <div>
      <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Available Equipment</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ value: 'none', label: 'Bodyweight' }, { value: 'basic', label: 'Basic' }, { value: 'full_gym', label: 'Full Gym' }].map(eq => (
          <button key={eq.value} onClick={() => onChange('equipment', eq.value)}
            className={`p-4 rounded border-2 transition-all duration-300 text-sm font-bold uppercase tracking-wider ${formData.equipment === eq.value ? 'border-kengan-gold bg-kengan-gold/20 text-kengan-gold' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
            {eq.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const TrainingScheduleStep = ({ formData, onChange, onMultiSelect }) => {
  const gymTypes = [{ value: 'upper', label: 'Upper' }, { value: 'lower', label: 'Lower' }, { value: 'full', label: 'Full' }, { value: 'push', label: 'Push' }, { value: 'pull', label: 'Pull' }, { value: 'legs', label: 'Legs' }];
  const combatTypeOptions = Object.values(combatStyles).map(style => ({ value: style.id, label: `${style.icon} ${style.name}` }));
  const locationTypes = [{ value: 'home', label: '🏠' }, { value: 'gym', label: '🏋️' }];
  const typeLabels = { push: 'Push', pull: 'Pull', legs: 'Legs', upper: 'Upper', lower: 'Lower', full: 'Full Body' };

  const handleStructureChange = (structure) => {
    const newDays = workoutStructures[structure].days.map((d, idx) => ({
      day: idx, type: d.type, focus: 'gym', location: formData.trainingDays.days[idx]?.location || 'gym', combatTypes: formData.trainingDays.days[idx]?.combatTypes || []
    }));
    onChange('trainingDays', { structure: parseInt(structure), days: newDays });
  };

  const handleDayChange = (dayIndex, field, value) => {
    const newDays = [...formData.trainingDays.days];
    newDays[dayIndex] = { ...newDays[dayIndex], [field]: value };
    onChange('trainingDays', { ...formData.trainingDays, days: newDays });
  };

  const toggleCombatType = (dayIndex, combatType) => {
    const newDays = [...formData.trainingDays.days];
    const currentTypes = newDays[dayIndex].combatTypes || [];
    newDays[dayIndex].combatTypes = currentTypes.includes(combatType) ? currentTypes.filter(t => t !== combatType) : [...currentTypes, combatType];
    onChange('trainingDays', { ...formData.trainingDays, days: newDays });
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Training Days per Week</label>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map(num => (
            <button key={num} onClick={() => handleStructureChange(num)}
              className={`p-3 rounded border-2 transition-all duration-300 text-sm font-bold ${formData.trainingDays.structure === num ? 'border-kengan-gold bg-kengan-gold/20 text-kengan-gold' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
              {num}d
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {formData.trainingDays.days.map((day, idx) => (
          <div key={idx} className="bg-black/40 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-bold">Day {idx + 1}: {typeLabels[day.type]}</span>
              <span className={`text-xs px-2 py-1 rounded ${day.location === 'home' ? 'bg-green-900' : 'bg-blue-900'}`}>{day.location === 'home' ? '🏠' : '🏋️'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-wrap gap-1">
                {gymTypes.slice(0, 4).map(g => (
                  <button key={g.value} onClick={() => handleDayChange(idx, 'type', g.value)}
                    className={`text-[10px] px-2 py-1 rounded ${day.type === g.value ? 'bg-kengan-gold text-black' : 'bg-gray-800'}`}>{g.label}</button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {combatTypeOptions.slice(0, 4).map(ct => (
                  <button key={ct.value} onClick={() => toggleCombatType(idx, ct.value)}
                    className={`text-[10px] px-1 py-1 rounded ${(day.combatTypes || []).includes(ct.value) ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'}`}>{ct.icon}</button>
                ))}
              </div>
              <div className="flex gap-1">
                {locationTypes.map(l => (
                  <button key={l.value} onClick={() => handleDayChange(idx, 'location', l.value)}
                    className={`text-xs px-2 py-1 rounded ${day.location === l.value ? 'bg-kengan-red text-white' : 'bg-gray-800'}`}>{l.label}</button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ScheduleHealthStep = ({ formData, onChange, onMultiSelect }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Days per Week</label>
        <select value={formData.timeAvailable.daysPerWeek} onChange={(e) => onChange('timeAvailable.daysPerWeek', parseInt(e.target.value))}
          className="w-full p-3 bg-black/50 border border-gray-700 rounded text-white focus:border-kengan-gold">
          {[1, 2, 3, 4, 5, 6].map(days => <option key={days} value={days}>{days} days</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Session (min)</label>
        <select value={formData.timeAvailable.sessionLength} onChange={(e) => onChange('timeAvailable.sessionLength', parseInt(e.target.value))}
          className="w-full p-3 bg-black/50 border border-gray-700 rounded text-white focus:border-kengan-gold">
          {[15, 30, 45, 60, 90, 120].map(m => <option key={m} value={m}>{m} min</option>)}
        </select>
      </div>
    </div>
    <div>
      <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Injuries (Optional)</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {['back', 'knee', 'shoulder', 'wrist', 'ankle', 'hip'].map(injury => (
          <button key={injury} onClick={() => onMultiSelect('injuries', injury)}
            className={`p-2 rounded border-2 text-xs font-bold uppercase ${formData.injuries.includes(injury) ? 'border-red-500 bg-red-500/20 text-red-400' : 'border-gray-700 text-gray-400'}`}>
            {injury}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default UserProfileForm;
