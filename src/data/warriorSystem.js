export const warriorSchools = {
  power_gym: {
    id: "power_gym",
    name: "Power Gym",
    icon: "🏋️",
    description: "Enfoque en fuerza bruta y desarrollo muscular",
    color: "from-orange-600 to-red-600",
    primaryFocus: ["strength", "mass"],
    secondaryFocus: ["endurance"],
    recommendedFor: ["hard_hitter", "grappler", "powerful"],
    statsBonus: { str: 20, def: 10, sta: 5, spd: -5, tec: 0, mnt: 5 }
  },
  fight_club: {
    id: "fight_club",
    name: "Fight Club",
    icon: "🥊",
    description: "Arte del combate y técnicas de MMA",
    color: "from-red-600 to-purple-600",
    primaryFocus: ["technique", "combatives"],
    secondaryFocus: ["endurance", "speed"],
    recommendedFor: ["technical", "striker", "grappler"],
    statsBonus: { str: 5, def: 10, sta: 10, spd: 15, tec: 20, mnt: 5 }
  },
  hybrid: {
    id: "hybrid",
    name: "Hybrid",
    icon: "🔥",
    description: "Combina lo mejor de ambos mundos",
    color: "from-purple-600 to-yellow-600",
    primaryFocus: ["balance", "versatility"],
    secondaryFocus: ["all"],
    recommendedFor: ["balanced_athlete", "mma_fighter"],
    statsBonus: { str: 10, def: 10, sta: 10, spd: 10, tec: 10, mnt: 10 }
  }
};

export const experienceLevels = {
  beginner: {
    id: "beginner",
    name: "Principiante",
    icon: "🔰",
    description: "Sin experiencia previa en combate o pesas",
    xpMultiplier: 1.5,
    difficulty: "easy"
  },
  intermediate: {
    id: "intermediate",
    name: "Intermedio",
    icon: "⚡",
    description: "Alguna experiencia en entrenamiento",
    xpMultiplier: 1.0,
    difficulty: "medium"
  },
  advanced: {
    id: "advanced",
    name: "Avanzado",
    icon: "💀",
    description: "Experiencia significativa en combate/pesas",
    xpMultiplier: 0.75,
    difficulty: "hard"
  }
};

export const attributes = {
  str: {
    id: "str",
    name: "STR",
    fullName: "Strength",
    icon: "💪",
    description: "Fuerza bruta y poder",
    trainsWith: ["pesas", "ejerciciosplosivos", "powerlifting"]
  },
  spd: {
    id: "spd",
    name: "SPD",
    fullName: "Speed",
    icon: "⚡",
    description: "Velocidad y explosividad",
    trainsWith: ["shadow_boxing", "sprints", "agilidad"]
  },
  def: {
    id: "def",
    name: "DEF",
    fullName: "Defense",
    icon: "🛡️",
    description: "Tolerancia al golpe y defensa",
    trainsWith: ["endurecimiento", "resistencia", "defensa"]
  },
  tec: {
    id: "tec",
    name: "TEC",
    fullName: "Technique",
    icon: "🎯",
    description: "Habilidad técnica y combos",
    trainsWith: ["drills", "combos", "sparring"]
  },
  sta: {
    id: "sta",
    name: "STA",
    fullName: "Stamina",
    icon: "🔥",
    description: "Resistencia cardiovascular",
    trainsWith: ["hiit", "rounds_largos", "cardio"]
  },
  mnt: {
    id: "mnt",
    name: "MNT",
    fullName: "Mental",
    icon: "🧠",
    description: "Voluntad, control y enfoque",
    trainsWith: ["meditación", "respiración", "visualización"]
  }
};

export const tierSystem = {
  tier_c: {
    id: "tier_c",
    name: "Tier C",
    icon: "⚪",
    color: "gray",
    weeks: [1, 2, 3, 4],
    description: "Clasificatorias - Entrenamiento básico",
    minXp: 0,
    maxXp: 1000,
    unlockedTechniques: 5,
    missionsDifficulty: "easy"
  },
  tier_b: {
    id: "tier_b",
    name: "Tier B",
    icon: "🔵",
    color: "blue",
    weeks: [5, 6, 7, 8],
    description: "Preliminares - Técnicas intermedias",
    minXp: 1001,
    maxXp: 3000,
    unlockedTechniques: 10,
    missionsDifficulty: "medium"
  },
  tier_a: {
    id: "tier_a",
    name: "Tier A",
    icon: "🟡",
    color: "yellow",
    weeks: [9, 10, 11, 12],
    description: "Eliminatorias - Técnicas avanzadas",
    minXp: 3001,
    maxXp: 6000,
    unlockedTechniques: 15,
    missionsDifficulty: "hard"
  },
  tier_s: {
    id: "tier_s",
    name: "Tier S",
    icon: "🔴",
    color: "red",
    weeks: [13, 14, 15, 16],
    description: "Gran Final - Nivel de campeón",
    minXp: 6001,
    maxXp: 10000,
    unlockedTechniques: 20,
    missionsDifficulty: "extreme"
  },
  champion: {
    id: "champion",
    name: "🏆 Kengan Champion",
    icon: "👑",
    color: "gold",
    weeks: [17],
    description: "¡Eres un leyenda del underground!",
    minXp: 10001,
    maxXp: Infinity,
    unlockedTechniques: Infinity,
    missionsDifficulty: "master"
  }
};

export const missions = {
  daily: [
    { id: "sparring", name: "Sparring Day", description: "Completa 3 rounds de combate", xp: { tec: 15, sta: 10 }, icon: "🥊", type: "combat" },
    { id: "strength", name: "Strength Trial", description: "Completa rutina de fuerza", xp: { str: 20 }, icon: "🏋️", type: "gym" },
    { id: "endurance", name: "Endurance Challenge", description: "5 rounds sin parar", xp: { sta: 20, def: 10 }, icon: "⏱️", type: "combat" },
    { id: "technique", name: "Technique Master", description: "Domina 3 combos nuevos", xp: { tec: 25 }, icon: "🎯", type: "combat" },
    { id: "iron_body", name: "Iron Body", description: "Sesión de endurecimiento", xp: { def: 20, mnt: 10 }, icon: "🛡️", type: "combat" }
  ],
  weekly: [
    { id: "grind", name: "The Grind", description: "Entrena 5 días esta semana", xp: { str: 30, sta: 30 }, icon: "⚙️", type: "consistency" },
    { id: "beast", name: "Become the Beast", description: "Mejora tu atributo principal", xp: { all: 50 }, icon: "🐂", type: "progression" },
    { id: "scholar", name: "Way of the Scholar", description: "Lee sobre técnicas de combate", xp: { mnt: 25, tec: 25 }, icon: "📚", type: "mental" }
  ]
};

export const getTierForXp = (xp) => {
  if (xp >= tierSystem.champion.minXp) return tierSystem.champion;
  if (xp >= tierSystem.tier_s.minXp) return tierSystem.tier_s;
  if (xp >= tierSystem.tier_a.minXp) return tierSystem.tier_a;
  if (xp >= tierSystem.tier_b.minXp) return tierSystem.tier_b;
  return tierSystem.tier_c;
};

export const getWeekForTier = (tier) => {
  if (tier.id === "tier_c") return tier.weeks[0];
  if (tier.id === "tier_b") return tier.weeks[0];
  if (tier.id === "tier_a") return tier.weeks[0];
  if (tier.id === "tier_s") return tier.weeks[0];
  return 1;
};

export const generateRival = (userStats, school) => {
  const rivalNames = [
    "The Beast", "Iron Fang", "Dark Slayer", "Steel Dragon", 
    "Phantom", "Demon King", "Thunder Claw", "Silent Death",
    "Blood Fang", "Night Hunter", "War God", "Destroyer"
  ];
  
  const stats = {};
  Object.keys(userStats).forEach(key => {
    stats[key] = Math.min(99, userStats[key] + Math.floor(Math.random() * 15) + 5);
  });
  
  return {
    id: `rival_${Date.now()}`,
    name: rivalNames[Math.floor(Math.random() * rivalNames.length)],
    school: school,
    stats: stats,
    tier: getTierForXp(stats.str * 10 + stats.spd * 10 + stats.tec * 10),
    quote: getRivalQuote(),
    wins: Math.floor(Math.random() * 50) + 10
  };
};

const getRivalQuote = () => {
  const quotes = [
    "Tu entrenamiento es inútil contra mi poder",
    "¡No tienes ninguna oportunidad!",
    "Soy imparable en el ring",
    "Tu técnica es patética",
    "¡Prepárate para ser eliminado!",
    "El miedo te hará débil",
    "Mi fuerza supera la tuya",
    "¡La muerte se acerca!"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const calculateXpForAction = (action, level) => {
  const baseXp = {
    training_completed: 10,
    combo_mastered: 15,
    mission_completed: 20,
    tier_advanced: 100,
    perfect_day: 50
  };
  
  const multiplier = experienceLevels[level]?.xpMultiplier || 1;
  return Math.floor(baseXp[action] * multiplier);
};
