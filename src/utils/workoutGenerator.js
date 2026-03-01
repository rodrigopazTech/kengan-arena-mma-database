import { workoutStyles, filterExercises } from '../data/workouts.js';
import { comboDatabase, getComboForWeek, combatStyles, getCombosForStyle, getRoundsForTime } from '../data/combos.js';
import { gymExerciseDatabase, getExercisesByType } from '../data/gymExercises.js';

/**
 * Generate a personalized weekly workout plan based on user profile and matched fighter
 * @param {Object} userProfile - User assessment data
 * @param {Object} matchedFighter - Fighter match result
 * @returns {Object} Complete weekly workout plan
 */
export const generateWorkoutPlan = (userProfile, matchedFighter) => {
  const fighter = matchedFighter.fighter;
  const workoutStyle = workoutStyles[fighter.workoutStyle];
  
  const availableExercises = filterExercises(
    userProfile.equipment, 
    userProfile.exercisePreferences,
    userProfile.experience
  );

  const styleExercises = availableExercises.filter(exercise => 
    exercise.kenganStyle && exercise.kenganStyle.includes(fighter.workoutStyle)
  );

  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const trainingDaysConfig = userProfile.trainingDays?.days || [];
  const sessionLength = userProfile.timeAvailable.sessionLength || 45;
  
  const weeklyStructure = generateWeeklyStructure(workoutStyle, userProfile);
  const dailyWorkouts = {};
  
  for (let i = 0; i < trainingDaysConfig.length; i++) {
    const dayConfig = trainingDaysConfig[i];
    const dayName = dayNames[i] || `day${i+1}`;
    const combatTypes = dayConfig.combatTypes || [];
    const hasCombat = combatTypes.length > 0;
    const hasGym = dayConfig.type && dayConfig.type !== 'rest';
    
    const gymExercises = hasGym ? generateGymExercises(dayConfig, userProfile) : [];
    const combatRounds = hasCombat ? generateCombatRounds(combatTypes, sessionLength, fighter.workoutStyle, i) : null;
    
    dailyWorkouts[dayName] = {
      dayConfig: {
        type: dayConfig.type,
        focus: dayConfig.focus,
        location: dayConfig.location,
        combatTypes: combatTypes
      },
      focusArea: hasGym ? getFocusForDayType(dayConfig.type) : 'combat',
      warmUp: generateWarmUp(hasGym ? getFocusForDayType(dayConfig.type) : 'striking'),
      gymExercises: gymExercises,
      combatRounds: combatRounds,
      coolDown: generateCoolDown(hasGym ? getFocusForDayType(dayConfig.type) : 'striking'),
      totalEstimatedTime: sessionLength,
      intensity: getIntensityForDay(i, workoutStyle.weeklyStructure.intensity),
      notes: getDailyNotes(hasGym ? getFocusForDayType(dayConfig.type) : 'striking', workoutStyle),
      isCombat: hasCombat,
      isGym: hasGym
    };
  }

  const plan = {
    fighterInfo: {
      name: fighter.name,
      style: fighter.style,
      workoutStyle: workoutStyle.name,
      philosophy: workoutStyle.philosophy
    },
    weeklyStructure,
    dailyWorkouts,
    progressionTips: getProgressionTips(fighter, userProfile),
    safetyConsiderations: getSafetyConsiderations(userProfile),
    estimatedDuration: {
      totalWeeklyMinutes: trainingDaysConfig.length * sessionLength,
      averageSessionLength: sessionLength,
      workoutDays: trainingDaysConfig.length,
      estimatedIntensity: workoutStyle.weeklyStructure.intensity
    },
    comboProgress: getComboProgress(fighter.workoutStyle),
    preferredArts: userProfile.preferredArts || []
  };

  return plan;
};

const generateGymExercises = (dayConfig, userProfile) => {
  const exerciseType = dayConfig.type || 'full';
  const exercises = getExercisesByType(exerciseType);
  const userInjuries = userProfile.injuries || [];
  
  return exercises.map(ex => {
    const hasInjuryConflict = userInjuries.some(injury => {
      const affectedMuscles = {
        knee: ['cuádriceps', 'piernas'],
        back: ['espalda', 'core'],
        shoulder: ['hombros', 'pecho'],
        wrist: ['bíceps', 'tríceps']
      };
      return affectedMuscles[injury]?.some(m => ex.muscles.includes(m));
    });
    
    return {
      ...ex,
      weight: ex.weightRange ? `${ex.weightRange.min}-${ex.weightRange.max} ${ex.weightRange.unit}` : ' bodyweight',
      hasSubstitution: hasInjuryConflict,
      substitution: hasInjuryConflict ? ex.substitutions[0] : null
    };
  }).slice(0, 6);
};

const generateCombatRounds = (combatTypes, sessionLength, fighterStyle, dayIndex) => {
  const totalMinutes = sessionLength;
  const roundMinutes = 3;
  const restMinutes = 1;
  const roundWithRest = roundMinutes + restMinutes;
  
  const numRounds = Math.max(2, Math.min(Math.floor((totalMinutes * 0.6) / roundWithRest), 5));
  const combosPerRound = 3;
  
  const allCombos = getCombosForStyle(combatTypes);
  const shortCombos = allCombos.short || [];
  const longCombos = allCombos.long || [];
  
  const rounds = [];
  for (let r = 0; r < numRounds; r++) {
    const isLastRound = r === numRounds - 1;
    const roundCombos = [];
    
    if (r === 0) {
      roundCombos.push({ name: "Shadow Boxing", description: "Warm-up", type: "warmup" });
    } else if (isLastRound) {
      roundCombos.push({ name: "Cool-down", description: "Light movement", type: "cooldown" });
    } else {
      const comboIndex = (r - 1) % Math.min(combosPerRound, shortCombos.length);
      roundCombos.push(shortCombos[comboIndex] || shortCombos[0]);
      if (longCombos.length > 0) {
        const longIndex = Math.floor((r - 1) / 2) % longCombos.length;
        roundCombos.push(longCombos[longIndex]);
      }
    }
    
    rounds.push({
      round: r + 1,
      duration: r === 0 || isLastRound ? 3 : roundMinutes,
      combos: roundCombos
    });
  }
  
  return {
    numRounds,
    roundLength: roundMinutes,
    restBetweenRounds: restMinutes,
    totalCombatTime: numRounds * roundMinutes,
    rounds,
    styles: combatTypes.map(t => combatStyles[t]?.name || t).join(' + ')
  };
};

const generateWeeklyStructure = (workoutStyle, userProfile) => {
  const baseStructure = {
    intensity: workoutStyle.weeklyStructure.intensity,
    workoutDays: Math.min(userProfile.timeAvailable.daysPerWeek, 6),
    restDays: [],
    focusRotation: []
  };

  // Calculate rest days
  const totalDays = 7;
  const workoutDays = baseStructure.workoutDays;
  const restDayCount = totalDays - workoutDays;
  
  // Distribute rest days evenly through the week
  const restDayInterval = Math.floor(totalDays / restDayCount);
  for (let i = 0; i < restDayCount; i++) {
    baseStructure.restDays.push((i * restDayInterval + restDayInterval) % 7);
  }

  // Create focus rotation based on workout style balance ratio
  const ratio = workoutStyle.weeklyStructure.balanceRatio;
  const focusTypes = Object.keys(ratio);
  
  for (let day = 0; day < workoutDays; day++) {
    const focusIndex = day % focusTypes.length;
    baseStructure.focusRotation.push(focusTypes[focusIndex]);
  }

  return baseStructure;
};

const getFocusForDay = (dayIndex, workoutStyle) => {
  const ratio = workoutStyle.weeklyStructure.balanceRatio;
  const focuses = Object.keys(ratio);
  return focuses[dayIndex % focuses.length];
};

const getFocusForDayType = (dayType) => {
  const typeMap = {
    push: 'strength',
    pull: 'strength',
    legs: 'strength',
    upper: 'striking',
    lower: 'strength',
    full: 'conditioning'
  };
  return typeMap[dayType] || 'conditioning';
};

const generateWarmUp = (focusArea) => {
  const warmUpOptions = {
    striking: ["Light shadow boxing", "Arm circles", "Shoulder rolls"],
    grappling: ["Hip circles", "Leg swings", "Spinal twists"], 
    strength: ["Joint mobility", "Dynamic stretching", "Bodyweight movements"],
    conditioning: ["Light jogging", "Dynamic stretching", "Activation exercises"],
    technique: ["Slow form practice", "Joint mobility", "Mental preparation"],
    speed: ["Light movement", "Dynamic warm-up", "Activation drills"],
    flexibility: ["Gentle stretching", "Joint circles", "Breath work"],
    mental: ["Breathing exercises", "Focus meditation", "Gentle movement"]
  };

  return warmUpOptions[focusArea] || warmUpOptions.conditioning;
};

const generateMainWorkout = (focusArea, styleExercises, allExercises, sessionLength, userProfile) => {
  // Filter exercises by focus area and type
  let relevantExercises = styleExercises.filter(ex => 
    ex.type === focusArea || 
    ex.targetMuscles.some(muscle => getFocusTargets(focusArea).includes(muscle))
  );

  // If not enough style-specific exercises, supplement with general exercises
  if (relevantExercises.length < 3) {
    const supplementExercises = allExercises.filter(ex => 
      ex.type === focusArea || 
      ex.targetMuscles.some(muscle => getFocusTargets(focusArea).includes(muscle))
    );
    relevantExercises = [...relevantExercises, ...supplementExercises];
  }

  // Remove duplicates and limit based on session length
  relevantExercises = [...new Map(relevantExercises.map(ex => [ex.name, ex])).values()];
  
  const exerciseCount = getExerciseCount(sessionLength);
  const selectedExercises = relevantExercises.slice(0, exerciseCount);

  return selectedExercises.map(exercise => ({
    ...exercise,
    sets: getSetsForExercise(exercise, focusArea, userProfile.experience),
    reps: getRepsForExercise(exercise, focusArea, userProfile.experience), 
    restPeriod: getRestPeriod(exercise, focusArea),
    modifications: getModifications(exercise, userProfile)
  }));
};

const getFocusTargets = (focusArea) => {
  const targetMap = {
    striking: ["shoulders", "core", "legs"],
    grappling: ["core", "legs", "back", "arms"],
    strength: ["chest", "back", "legs", "shoulders"],
    conditioning: ["full_body", "core"],
    technique: ["full_body"],
    speed: ["legs", "shoulders", "core"],
    flexibility: ["full_body"],
    mental: ["diaphragm"]
  };

  return targetMap[focusArea] || ["full_body"];
};

const getExerciseCount = (sessionLength) => {
  if (sessionLength <= 30) return 3;
  if (sessionLength <= 45) return 4;
  if (sessionLength <= 60) return 5;
  return 6;
};

const getSetsForExercise = (exercise, focusArea, experience) => {
  const baseSetMap = {
    beginner: { strength: 3, conditioning: 3, technique: 2 },
    intermediate: { strength: 4, conditioning: 4, technique: 3 },
    advanced: { strength: 5, conditioning: 5, technique: 4 }
  };

  const category = exercise.type === 'strength' ? 'strength' : 
                  exercise.type === 'conditioning' ? 'conditioning' : 'technique';

  return baseSetMap[experience][category] || 3;
};

const getRepsForExercise = (exercise, focusArea, experience) => {
  const repRanges = {
    strength: { beginner: "8-12", intermediate: "6-10", advanced: "5-8" },
    conditioning: { beginner: "30s", intermediate: "45s", advanced: "60s" },
    technique: { beginner: "5-8", intermediate: "8-12", advanced: "10-15" },
    speed: { beginner: "10-15", intermediate: "15-20", advanced: "20-25" },
    flexibility: { beginner: "30s hold", intermediate: "45s hold", advanced: "60s hold" }
  };

  return repRanges[exercise.type]?.[experience] || repRanges.technique[experience];
};

const getRestPeriod = (exercise, focusArea) => {
  const restMap = {
    strength: "2-3 minutes",
    conditioning: "30-60 seconds", 
    technique: "1-2 minutes",
    speed: "1-2 minutes",
    flexibility: "30 seconds",
    mental: "As needed"
  };

  return restMap[exercise.type] || "1-2 minutes";
};

const getModifications = (exercise, userProfile) => {
  const modifications = [];

  // Add injury-specific modifications
  if (userProfile.injuries && userProfile.injuries.length > 0) {
    userProfile.injuries.forEach(injury => {
      switch(injury) {
        case 'back':
          if (exercise.targetMuscles.includes('back')) {
            modifications.push("Reduce range of motion, focus on form");
          }
          break;
        case 'knee':
          if (exercise.targetMuscles.includes('legs')) {
            modifications.push("Avoid deep knee bends, use half range");
          }
          break;
        case 'shoulder':
          if (exercise.targetMuscles.includes('shoulders')) {
            modifications.push("Limit overhead movements, focus on stability");
          }
          break;
        case 'wrist':
          if (exercise.name.toLowerCase().includes('push') || exercise.targetMuscles.includes('arms')) {
            modifications.push("Use wrist supports or modify grip");
          }
          break;
      }
    });
  }

  // Add beginner modifications
  if (userProfile.experience === 'beginner') {
    modifications.push("Start with lighter intensity, focus on proper form");
  }

  return modifications;
};

const generateCoolDown = (focusArea) => {
  const coolDownOptions = {
    striking: ["Arm stretches", "Shoulder stretches", "Deep breathing"],
    grappling: ["Hip stretches", "Spinal twists", "Relaxation"],
    strength: ["Static stretching", "Foam rolling", "Gentle movement"],
    conditioning: ["Walking cool-down", "Static stretching", "Breathing exercises"],
    technique: ["Slow form review", "Meditation", "Reflection"],
    speed: ["Walking", "Dynamic stretching", "Cool-down breathing"],
    flexibility: ["Extended stretching", "Relaxation", "Mindfulness"],
    mental: ["Deep meditation", "Gratitude practice", "Peaceful rest"]
  };

  return coolDownOptions[focusArea] || coolDownOptions.conditioning;
};

const getIntensityForDay = (dayIndex, baseIntensity) => {
  const intensityMap = {
    very_high: ["High", "Very High", "High", "Moderate", "High", "Very High"],
    high: ["Moderate", "High", "Moderate", "Low", "High", "Moderate"],
    moderate: ["Low", "Moderate", "Low", "Rest", "Moderate", "Low"],
    variable: ["High", "Low", "Moderate", "High", "Low", "Moderate"]
  };

  return intensityMap[baseIntensity]?.[dayIndex] || "Moderate";
};

const getDailyNotes = (focusArea, workoutStyle) => {
  const notes = {
    striking: `Focus on technique over power. ${workoutStyle.philosophy}`,
    grappling: `Flow between movements smoothly. ${workoutStyle.philosophy}`,
    strength: `Progressive overload is key. ${workoutStyle.philosophy}`,
    conditioning: `Push your limits safely. ${workoutStyle.philosophy}`,
    technique: `Perfect practice makes perfect. ${workoutStyle.philosophy}`,
    speed: `Explosive movements with control. ${workoutStyle.philosophy}`,
    flexibility: `Consistent practice yields results. ${workoutStyle.philosophy}`,
    mental: `Mind and body are one. ${workoutStyle.philosophy}`
  };

  return notes[focusArea] || workoutStyle.philosophy;
};

const getProgressionTips = (fighter, userProfile) => {
  return [
    `Start with ${fighter.name}'s foundational techniques and gradually increase intensity`,
    "Track your progress weekly and adjust difficulty based on performance",
    "Focus on form over speed/power in the first 2-4 weeks",
    `Embody ${fighter.name}'s training philosophy: patience and consistency`,
    "Listen to your body and take rest days when needed"
  ];
};

const getSafetyConsiderations = (userProfile) => {
  const considerations = [
    "Always warm up thoroughly before intense training",
    "Stay hydrated throughout your workout sessions",
    "Stop immediately if you feel pain (not to be confused with muscle fatigue)"
  ];

  // Add injury-specific considerations
  if (userProfile.injuries && userProfile.injuries.length > 0) {
    considerations.push("Follow modifications for your specific injuries");
    considerations.push("Consider consulting a physiotherapist for injury-specific guidance");
  }

  if (userProfile.experience === 'beginner') {
    considerations.push("Focus on learning proper form before increasing intensity");
    considerations.push("Start with shorter sessions and gradually increase duration");
  }

  return considerations;
};

const calculateWeeklyDuration = (workoutStyle, timeAvailable) => {
  const totalMinutes = timeAvailable.daysPerWeek * timeAvailable.sessionLength;
  return {
    totalWeeklyMinutes: totalMinutes,
    averageSessionLength: timeAvailable.sessionLength,
    workoutDays: timeAvailable.daysPerWeek,
    estimatedIntensity: workoutStyle.weeklyStructure.intensity
  };
};

const generateCombosForDay = (workoutStyle, userProfile, dayIndex) => {
  const currentWeek = Math.floor(dayIndex / 3) + 1;
  const combos = getComboForWeek(workoutStyle, currentWeek);
  
  if (!combos || combos.length === 0) {
    return {
      available: [],
      newUnlocks: [],
      message: "Practice your fundamentals first"
    };
  }

  const previousWeekCombos = getComboForWeek(workoutStyle, currentWeek - 1);
  const previousComboIds = new Set(previousWeekCombos?.map(c => c.id) || []);
  const newUnlocks = combos.filter(c => !previousComboIds.has(c.id));

  return {
    available: combos.slice(0, 4),
    newUnlocks: newUnlocks.slice(0, 2),
    week: currentWeek,
    message: currentWeek === 1 
      ? "Master these basics before advancing" 
      : `Week ${currentWeek} - Keep building your arsenal!`
  };
};

const getComboProgress = (workoutStyle) => {
  const style = comboDatabase[workoutStyle];
  if (!style) return null;

  return {
    styleName: style.name,
    baseStyles: style.baseStyles,
    totalCombos: style.combos.length,
    progression: style.progression,
    allCombos: style.combos
  };
};