import { fighters } from '../data/fighters.js';

/**
 * Calculate compatibility score between user and fighter
 * @param {Object} userProfile - User's assessment data
 * @param {Object} fighter - Fighter data
 * @returns {Object} Match result with score and reasoning
 */
export const calculateMatchScore = (userProfile, fighter) => {
  let score = 0;
  let reasoning = [];
  let maxScore = 0;

  // Physical compatibility (25% of total score)
  const physicalScore = calculatePhysicalCompatibility(userProfile, fighter);
  score += physicalScore.score;
  maxScore += physicalScore.maxScore;
  reasoning.push(...physicalScore.reasoning);

  // Goal alignment (30% of total score)  
  const goalScore = calculateGoalAlignment(userProfile, fighter);
  score += goalScore.score;
  maxScore += goalScore.maxScore;
  reasoning.push(...goalScore.reasoning);

  // Experience level compatibility (20% of total score)
  const experienceScore = calculateExperienceCompatibility(userProfile, fighter);
  score += experienceScore.score;
  maxScore += experienceScore.maxScore;
  reasoning.push(...experienceScore.reasoning);

  // Training style preference (25% of total score)
  const styleScore = calculateStyleCompatibility(userProfile, fighter);
  score += styleScore.score;
  maxScore += styleScore.maxScore;
  reasoning.push(...styleScore.reasoning);

  const finalScore = Math.round((score / maxScore) * 100);

  return {
    fighter,
    score: finalScore,
    reasoning,
    matchLevel: getMatchLevel(finalScore)
  };
};

const calculatePhysicalCompatibility = (user, fighter) => {
  let score = 0;
  let maxScore = 25;
  let reasoning = [];

  // Height compatibility (within reasonable range)
  const heightDiff = Math.abs(user.height - fighter.height);
  if (heightDiff <= 10) {
    score += 8;
    reasoning.push(`Similar height builds (${heightDiff}cm difference)`);
  } else if (heightDiff <= 20) {
    score += 5;
    reasoning.push(`Compatible height range (${heightDiff}cm difference)`);
  } else {
    score += 2;
    reasoning.push(`Different height class (${heightDiff}cm difference)`);
  }

  // Weight class compatibility
  const bmi = user.weight / ((user.height / 100) ** 2);
  const fighterBMI = fighter.weight / ((fighter.height / 100) ** 2);
  const bmiDiff = Math.abs(bmi - fighterBMI);
  
  if (bmiDiff <= 2) {
    score += 8;
    reasoning.push(`Matching body composition (BMI difference: ${bmiDiff.toFixed(1)})`);
  } else if (bmiDiff <= 4) {
    score += 5;
    reasoning.push(`Compatible body type (BMI difference: ${bmiDiff.toFixed(1)})`);
  } else {
    score += 2;
    reasoning.push(`Different body composition (BMI difference: ${bmiDiff.toFixed(1)})`);
  }

  // Body type compatibility
  if (user.bodyType === fighter.bodyType) {
    score += 9;
    reasoning.push(`Perfect body type match (${user.bodyType})`);
  } else {
    // Partial compatibility between similar types
    const compatibleTypes = {
      lean: ['athletic'],
      athletic: ['lean', 'muscular'], 
      muscular: ['athletic', 'powerlifter'],
      powerlifter: ['muscular']
    };
    
    if (compatibleTypes[user.bodyType]?.includes(fighter.bodyType)) {
      score += 6;
      reasoning.push(`Compatible body types (${user.bodyType} → ${fighter.bodyType})`);
    } else {
      score += 2;
      reasoning.push(`Different body type approach (${user.bodyType} vs ${fighter.bodyType})`);
    }
  }

  return { score, maxScore, reasoning };
};

const calculateGoalAlignment = (user, fighter) => {
  let score = 0;
  let maxScore = 30;
  let reasoning = [];

  // Primary goal alignment
  const goalFighterMap = {
    weight_loss: ['lean', 'athletic'],
    muscle_gain: ['muscular', 'powerlifter', 'athletic'],
    fitness: ['athletic', 'lean'],
    strength: ['muscular', 'powerlifter'],
    flexibility: ['lean', 'athletic'],
    endurance: ['lean', 'athletic'],
    self_defense: ['athletic', 'lean', 'muscular']
  };

  user.goals.forEach(goal => {
    if (goalFighterMap[goal]?.includes(fighter.bodyType)) {
      score += 8;
      reasoning.push(`${goal.replace('_', ' ')} aligns with ${fighter.name}'s ${fighter.bodyType} build`);
    } else {
      score += 3;
      reasoning.push(`${goal.replace('_', ' ')} can be adapted from ${fighter.name}'s training`);
    }
  });

  // Training focus alignment
  const focusMap = {
    weight_loss: ['conditioning', 'technique'],
    muscle_gain: ['strength', 'power'],
    fitness: ['balanced', 'conditioning'],
    strength: ['power', 'strength'],
    flexibility: ['technique', 'agility'],
    endurance: ['conditioning', 'balanced'],
    self_defense: ['technique', 'adaptability']
  };

  user.goals.forEach(goal => {
    if (focusMap[goal]?.includes(fighter.trainingFocus)) {
      score += 6;
      reasoning.push(`Training focus matches ${goal.replace('_', ' ')} goals`);
    }
  });

  return { score: Math.min(score, maxScore), maxScore, reasoning };
};

const calculateExperienceCompatibility = (user, fighter) => {
  let score = 0; 
  let maxScore = 20;
  let reasoning = [];

  const experienceAgeMap = {
    beginner: [19, 28],    // Younger fighters, easier to relate
    intermediate: [21, 35], // Mid-range fighters
    advanced: [26, 51]     // Experienced fighters
  };

  const userExperience = user.gymExperience || user.combatExperience || 'intermediate';
  const ageRange = experienceAgeMap[userExperience] || experienceAgeMap.intermediate;
  
  if (fighter.age >= ageRange[0] && fighter.age <= ageRange[1]) {
    score += 12;
    reasoning.push(`Experience level matches ${fighter.name}'s training era`);
  } else {
    score += 6;
    reasoning.push(`Can learn from ${fighter.name}'s ${fighter.age > ageRange[1] ? 'advanced' : 'intense'} approach`);
  }

  // Age consideration for training intensity
  const ageDiff = Math.abs(user.age - fighter.age);
  if (ageDiff <= 10) {
    score += 8;
    reasoning.push(`Similar age for training intensity (${ageDiff} year difference)`);
  } else if (ageDiff <= 20) {
    score += 5;
    reasoning.push(`Manageable age adaptation needed (${ageDiff} year difference)`);
  } else {
    score += 2; 
    reasoning.push(`Significant age consideration required (${ageDiff} year difference)`);
  }

  return { score, maxScore, reasoning };
};

const calculateStyleCompatibility = (user, fighter) => {
  let score = 0;
  let maxScore = 25;
  let reasoning = [];

  // Exercise preference alignment
  const stylePreferenceMap = {
    martial_arts: ['striking', 'grappling', 'technique', 'agility', 'adaptability'],
    gym: ['strength', 'power', 'conditioning'],
    both: ['balanced', 'intensity']
  };

  user.exercisePreferences.forEach(pref => {
    if (stylePreferenceMap[pref]?.includes(fighter.trainingFocus)) {
      score += 8;
      reasoning.push(`${pref.replace('_', ' ')} preference matches ${fighter.name}'s focus`);
    } else {
      score += 4;
      reasoning.push(`${pref.replace('_', ' ')} can be integrated with ${fighter.style}`);
    }
  });

  // Equipment compatibility
  const equipmentComplexity = {
    none: ['technique', 'agility', 'balanced'],
    basic: ['conditioning', 'strength', 'intensity'],
    full_gym: ['power', 'strength', 'conditioning']
  };

  if (equipmentComplexity[user.equipment]?.includes(fighter.trainingFocus)) {
    score += 9;
    reasoning.push(`Available equipment suits ${fighter.name}'s training methods`);
  } else {
    score += 5;
    reasoning.push(`Equipment can be adapted for ${fighter.name}'s style`);
  }

  return { score: Math.min(score, maxScore), maxScore, reasoning };
};

const getMatchLevel = (score) => {
  if (score >= 90) return "Perfect Match";
  if (score >= 80) return "Excellent Match";
  if (score >= 70) return "Great Match";
  if (score >= 60) return "Good Match";
  if (score >= 50) return "Fair Match";
  return "Challenging Match";
};

/**
 * Find the best fighter match for a user
 * @param {Object} userProfile - User's assessment data
 * @returns {Object} Best match with score and reasoning
 */
export const findBestMatch = (userProfile) => {
  const matches = fighters.map(fighter => calculateMatchScore(userProfile, fighter));
  
  // Sort by score (descending)
  matches.sort((a, b) => b.score - a.score);
  
  return {
    bestMatch: matches[0],
    allMatches: matches,
    topThree: matches.slice(0, 3)
  };
};

/**
 * Get match explanation and training approach
 * @param {Object} matchResult - Result from findBestMatch
 * @returns {Object} Detailed explanation and training philosophy
 */
export const getMatchExplanation = (matchResult) => {
  const { fighter, score, reasoning, matchLevel } = matchResult.bestMatch;
  
  return {
    summary: `You've been matched with ${fighter.name}, "${fighter.title}" with a ${score}% compatibility score.`,
    matchLevel,
    reasoning,
    trainingPhilosophy: getTrainingPhilosophy(fighter),
    nextSteps: getNextSteps(fighter, score)
  };
};

const getTrainingPhilosophy = (fighter) => {
  const philosophies = {
    1: "Master the balance of all four kata through disciplined practice and constant adaptation.",
    2: "Achieve perfection through relentless striking precision and lightning-fast combinations.",
    3: "Flow like water in grappling, using flexibility and technique over brute strength.",
    4: "Adapt to every situation with formless evolution and unlimited potential.",
    5: "Develop overwhelming power that can crush any technique through pure strength.",
    6: "Push beyond human limitations through extreme intensity and unwavering determination.",
    7: "Build pure muscle mass through scientific training and overwhelming force.",
    8: "Perfect fundamental techniques through decades of patient, disciplined practice.",
    9: "Move with beautiful fluidity while maintaining deadly precision and deceptive speed."
  };
  
  return philosophies[fighter.id] || "Train with dedication and find your own path to mastery.";
};

const getNextSteps = (fighter, score) => {
  if (score >= 80) {
    return `This is an excellent match! ${fighter.name}'s training style aligns perfectly with your goals and physical attributes. You're ready to begin intensive training immediately.`;
  } else if (score >= 60) {
    return `This is a solid match with ${fighter.name}. Some adjustments will be made to align the training with your specific needs, but the core approach will be highly effective.`;
  } else {
    return `This match with ${fighter.name} will require significant adaptations, but can still provide excellent results with proper modifications to suit your unique profile.`;
  }
};