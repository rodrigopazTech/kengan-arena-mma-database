// Exercise database with martial arts and gym exercises
export const exerciseDatabase = {
  martialArts: [
    {
      name: "Shadow Boxing",
      category: "martial_arts",
      type: "striking",
      equipment: "none",
      difficulty: "beginner",
      duration: "3-5 minutes",
      description: "Practice punch combinations and footwork without a partner",
      targetMuscles: ["shoulders", "core", "legs"],
      kenganStyle: ["thai_boxing", "german_strength"]
    },
    {
      name: "Kata Practice",
      category: "martial_arts", 
      type: "technique",
      equipment: "none",
      difficulty: "intermediate",
      duration: "10-15 minutes",
      description: "Form practice for traditional martial arts movements",
      targetMuscles: ["full_body"],
      kenganStyle: ["kaiwan_mastery", "koei_flow"]
    },
    {
      name: "Heavy Bag Training",
      category: "martial_arts",
      type: "striking",
      equipment: "basic",
      difficulty: "intermediate",
      duration: "5-10 minutes",
      description: "Power striking and combination practice",
      targetMuscles: ["shoulders", "core", "legs"],
      kenganStyle: ["thai_boxing", "karate_strength", "german_strength"]
    },
    {
      name: "Grappling Drills",
      category: "martial_arts",
      type: "grappling",
      equipment: "none",
      difficulty: "intermediate", 
      duration: "10-15 minutes",
      description: "Solo drilling of takedowns and submissions",
      targetMuscles: ["core", "legs", "back"],
      kenganStyle: ["bjj_flexibility", "formless_mma", "kure_assassin"]
    },
    {
      name: "Flexibility Flow",
      category: "martial_arts",
      type: "flexibility",
      equipment: "none",
      difficulty: "beginner",
      duration: "15-20 minutes",
      description: "Dynamic stretching and mobility work",
      targetMuscles: ["full_body"],
      kenganStyle: ["bjj_flexibility", "koei_flow", "niko_mixed_arts"]
    },
    {
      name: "Iron Body Conditioning",
      category: "martial_arts",
      type: "conditioning",
      equipment: "basic",
      difficulty: "advanced",
      duration: "10-15 minutes",
      description: "Traditional body hardening techniques",
      targetMuscles: ["core", "arms", "legs"],
      kenganStyle: ["niko_mixed_arts", "kaiwan_mastery"]
    },
    {
      name: "Breathing Meditation",
      category: "martial_arts",
      type: "mental",
      equipment: "none", 
      difficulty: "beginner",
      duration: "10-20 minutes",
      description: "Controlled breathing and focus training",
      targetMuscles: ["diaphragm"],
      kenganStyle: ["kaiwan_mastery", "niko_mixed_arts", "koei_flow"]
    },
    {
      name: "Speed Combinations",
      category: "martial_arts",
      type: "speed",
      equipment: "basic",
      difficulty: "intermediate",
      duration: "5-8 minutes", 
      description: "Rapid-fire striking combinations",
      targetMuscles: ["shoulders", "core"],
      kenganStyle: ["thai_boxing", "koei_flow", "kure_assassin"]
    }
  ],
  
  gym: [
    {
      name: "Deadlifts",
      category: "gym",
      type: "strength",
      equipment: "full_gym",
      difficulty: "intermediate",
      duration: "20-30 minutes",
      description: "Full body compound movement for maximum strength",
      targetMuscles: ["back", "legs", "core"],
      kenganStyle: ["german_strength", "karate_strength"]
    },
    {
      name: "Squats",
      category: "gym", 
      type: "strength",
      equipment: "full_gym",
      difficulty: "beginner",
      duration: "15-25 minutes",
      description: "Lower body power development",
      targetMuscles: ["legs", "core"],
      kenganStyle: ["german_strength", "karate_strength", "kure_assassin"]
    },
    {
      name: "Pull-ups",
      category: "gym",
      type: "strength", 
      equipment: "basic",
      difficulty: "intermediate",
      duration: "10-15 minutes",
      description: "Upper body pulling strength",
      targetMuscles: ["back", "arms"],
      kenganStyle: ["kure_assassin", "bjj_flexibility", "formless_mma"]
    },
    {
      name: "Push-ups",
      category: "gym",
      type: "strength",
      equipment: "none",
      difficulty: "beginner", 
      duration: "5-10 minutes",
      description: "Bodyweight chest and arm development",
      targetMuscles: ["chest", "arms", "core"],
      kenganStyle: ["niko_mixed_arts", "kaiwan_mastery", "thai_boxing"]
    },
    {
      name: "Kettlebell Swings",
      category: "gym",
      type: "conditioning",
      equipment: "basic",
      difficulty: "intermediate",
      duration: "10-15 minutes",
      description: "Explosive hip power and conditioning",
      targetMuscles: ["legs", "core", "back"],
      kenganStyle: ["formless_mma", "kure_assassin", "german_strength"]
    },
    {
      name: "Battle Ropes",
      category: "gym",
      type: "conditioning",
      equipment: "basic", 
      difficulty: "intermediate",
      duration: "5-10 minutes",
      description: "High-intensity cardiovascular conditioning",
      targetMuscles: ["shoulders", "core"],
      kenganStyle: ["kure_assassin", "thai_boxing"]
    },
    {
      name: "Burpees",
      category: "gym",
      type: "conditioning",
      equipment: "none",
      difficulty: "intermediate",
      duration: "5-10 minutes",
      description: "Full body explosive conditioning",
      targetMuscles: ["full_body"],
      kenganStyle: ["formless_mma", "kure_assassin", "niko_mixed_arts"]
    },
    {
      name: "Farmer's Walk",
      category: "gym", 
      type: "strength",
      equipment: "basic",
      difficulty: "beginner",
      duration: "5-10 minutes",
      description: "Functional grip and core strength",
      targetMuscles: ["forearms", "core", "legs"],
      kenganStyle: ["german_strength", "karate_strength"]
    },
    {
      name: "Plank Variations",
      category: "gym",
      type: "core",
      equipment: "none",
      difficulty: "beginner",
      duration: "5-15 minutes", 
      description: "Core stability and endurance",
      targetMuscles: ["core"],
      kenganStyle: ["bjj_flexibility", "niko_mixed_arts", "kaiwan_mastery"]
    },
    {
      name: "Agility Ladder",
      category: "gym",
      type: "speed",
      equipment: "basic",
      difficulty: "beginner",
      duration: "10-15 minutes",
      description: "Footwork and coordination training",
      targetMuscles: ["legs"],
      kenganStyle: ["thai_boxing", "koei_flow", "bjj_flexibility"]
    }
  ]
};

// Workout style templates matching each fighter
export const workoutStyles = {
  niko_mixed_arts: {
    name: "Niko Style Mixed Arts",
    description: "Balanced training combining all aspects of combat",
    philosophy: "Master all four kata: redirection, flame, adamantine, and water",
    focusAreas: ["technique", "conditioning", "mental_training"],
    weeklyStructure: {
      intensity: "high",
      balanceRatio: { striking: 30, grappling: 25, strength: 25, conditioning: 20 }
    }
  },
  
  thai_boxing: {
    name: "Thai God's Regiment", 
    description: "Elite striking focus with precision and speed",
    philosophy: "Perfect technique through relentless repetition",
    focusAreas: ["striking_technique", "speed", "precision"],
    weeklyStructure: {
      intensity: "very_high", 
      balanceRatio: { striking: 60, conditioning: 25, strength: 15, flexibility: 10 }
    }
  },
  
  bjj_flexibility: {
    name: "Strangler's Flow",
    description: "Grappling mastery through flexibility and technique",
    philosophy: "Flow like water, strike like lightning", 
    focusAreas: ["grappling", "flexibility", "technique"],
    weeklyStructure: {
      intensity: "moderate",
      balanceRatio: { grappling: 50, flexibility: 30, conditioning: 20, strength: 10 }
    }
  },
  
  formless_mma: {
    name: "Formless Evolution",
    description: "Adaptive training that evolves with each session",
    philosophy: "No fixed form, infinite adaptation",
    focusAreas: ["adaptability", "mixed_techniques", "evolution"],
    weeklyStructure: {
      intensity: "variable",
      balanceRatio: { striking: 25, grappling: 25, strength: 25, conditioning: 25 }
    }
  },
  
  karate_strength: {
    name: "Wild Tiger Power",
    description: "Maximum strength development with traditional karate", 
    philosophy: "Overwhelming power conquers all technique",
    focusAreas: ["maximum_strength", "power", "endurance"],
    weeklyStructure: {
      intensity: "high",
      balanceRatio: { strength: 50, conditioning: 30, striking: 20, flexibility: 10 }
    }
  },
  
  kure_assassin: {
    name: "Kure Clan Intensity",
    description: "Extreme conditioning for superhuman performance",
    philosophy: "Push beyond human limits through sheer will",
    focusAreas: ["extreme_conditioning", "removal_training", "intensity"],
    weeklyStructure: {
      intensity: "extreme",
      balanceRatio: { conditioning: 40, strength: 30, speed: 20, mental: 10 }
    }
  },
  
  german_strength: {
    name: "German Engineering",
    description: "Scientific approach to maximum muscle development",
    philosophy: "Pure overwhelming muscle conquers technique",
    focusAreas: ["muscle_mass", "power", "scientific_training"], 
    weeklyStructure: {
      intensity: "extreme",
      balanceRatio: { strength: 70, power: 20, conditioning: 10, recovery: 10 }
    }
  },
  
  kaiwan_mastery: {
    name: "Devil Lance Mastery",
    description: "Perfect technique through decades of discipline",
    philosophy: "Master the fundamentals, transcend the limits",
    focusAreas: ["technique_perfection", "mental_discipline", "traditional_training"],
    weeklyStructure: {
      intensity: "moderate_sustained",
      balanceRatio: { technique: 40, conditioning: 25, strength: 20, mental: 15 }
    }
  },
  
  koei_flow: {
    name: "Beautiful Beast Flow", 
    description: "Fluid movement and deadly precision",
    philosophy: "Beauty in motion, death in execution",
    focusAreas: ["flow", "speed", "deception"],
    weeklyStructure: {
      intensity: "high_variable",
      balanceRatio: { speed: 35, technique: 30, flexibility: 25, mental: 10 }
    }
  }
};

// Helper function to filter exercises by equipment and preferences
export const filterExercises = (equipment = "none", preferences = ["both"], difficulty = "all") => {
  const allExercises = [...exerciseDatabase.martialArts, ...exerciseDatabase.gym];
  
  return allExercises.filter(exercise => {
    // Equipment filter
    const equipmentMatch = equipment === "full_gym" || 
                          (equipment === "basic" && ["none", "basic"].includes(exercise.equipment)) ||
                          (equipment === "none" && exercise.equipment === "none");
    
    // Preference filter  
    const preferenceMatch = preferences.includes("both") ||
                           (preferences.includes("martial_arts") && exercise.category === "martial_arts") ||
                           (preferences.includes("gym") && exercise.category === "gym");
    
    // Difficulty filter
    const difficultyMatch = difficulty === "all" || exercise.difficulty === difficulty;
    
    return equipmentMatch && preferenceMatch && difficultyMatch;
  });
};