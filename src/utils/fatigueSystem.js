export const calculateFatigueFromDays = (trainingDays) => {
  if (!trainingDays || !trainingDays.days) return 0;
  
  let fatigue = 0;
  
  trainingDays.days.forEach(day => {
    if (day.isRest) {
      fatigue -= 20;
    } else {
      const hasCombat = day.combatTypes && day.combatTypes.length > 0;
      const hasGym = day.type && day.type !== '';
      
      if (hasCombat && hasGym) {
        fatigue += 25;
      } else if (hasCombat) {
        fatigue += 30;
      } else if (hasGym) {
        fatigue += 20;
      }
    }
  });
  
  return Math.max(0, Math.min(100, fatigue));
};

export const getFatigueWarning = (fatigueLevel) => {
  if (fatigueLevel >= 90) {
    return {
      level: 'critical',
      message: '¡Descanso obligatorio! Tu cuerpo necesita recuperarse.',
      color: 'red',
      icon: '🛑'
    };
  }
  if (fatigueLevel >= 70) {
    return {
      level: 'warning',
      message: 'Fatiga alta. Considera un día de descanso activo.',
      color: 'orange',
      icon: '⚠️'
    };
  }
  if (fatigueLevel >= 50) {
    return {
      level: 'moderate',
      message: 'Buen ritmo. Mantén la intensidad.',
      color: 'yellow',
      icon: '💪'
    };
  }
  return {
    level: 'good',
    message: '¡Energía máxima! Listo para entrenar.',
    color: 'green',
    icon: '⚡'
  };
};

export const suggestRestDay = (fatigueLevel, consecutiveTrainingDays) => {
  if (fatigueLevel >= 80) return { shouldRest: true, reason: 'Fatiga crítica' };
  if (consecutiveTrainingDays >= 5 && fatigueLevel >= 50) return { shouldRest: true, reason: '5 días consecutivos' };
  if (consecutiveTrainingDays >= 7) return { shouldRest: true, reason: '7 días seguidos' };
  return { shouldRest: false, reason: null };
};
