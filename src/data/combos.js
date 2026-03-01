export const combatStyles = {
  boxing: {
    id: "boxing",
    name: "Boxeo",
    icon: "🥊",
    description: "Golpes de puño, footwork y defensa",
    rounds: { min: 2, max: 6, default: 3 },
    roundLength: [2, 3, 5],
    combos: {
      short: [
        { id: "box_1", name: "1-2", description: "Jab - Cross", difficulty: "beginner" },
        { id: "box_2", name: "1-2-3", description: "Jab - Cross - Hook", difficulty: "beginner" },
        { id: "box_3", name: "1-6", description: "Jab - Cross al cuerpo", difficulty: "beginner" },
        { id: "box_4", name: "3-2", description: "Hook - Cross", difficulty: "beginner" },
        { id: "box_5", name: "1-4", description: "Jab - Uppercut", difficulty: "intermediate" }
      ],
      long: [
        { id: "box_6", name: "1-2-3-2", description: "Jab - Cross - Hook - Cross", difficulty: "intermediate" },
        { id: "box_7", name: "1-2-Body-2", description: "Jab - Cross al cuerpo - Cross", difficulty: "intermediate" },
        { id: "box_8", name: "1-2-3-4-2", description: "Jab - Cross - Hook - Uppercut - Cross", difficulty: "advanced" },
        { id: "box_9", name: "1-2-3-1-2-3", description: "Doble combinación", difficulty: "advanced" },
        { id: "box_10", name: "6-3-2-1", description: "Combinación al cuerpo y cabeza", difficulty: "advanced" }
      ]
    }
  },

  muay_thai: {
    id: "muay_thai",
    name: "Muay Thai",
    icon: "🦵",
    description: "Patadas, codos, rodillas y clincha",
    rounds: { min: 2, max: 6, default: 3 },
    roundLength: [2, 3, 5],
    combos: {
      short: [
        { id: "mt_1", name: "Teep-1", description: "Teep - Jab", difficulty: "beginner" },
        { id: "mt_2", name: "1-Low", description: "Jab - Patada baja", difficulty: "beginner" },
        { id: "mt_3", name: "1-2-Low", description: "Jab - Cross - Patada baja", difficulty: "beginner" },
        { id: "mt_4", name: "Low-High", description: "Patada baja - alta", difficulty: "intermediate" },
        { id: "mt_5", name: "1-Knee", description: "Jab - Rodilla", difficulty: "intermediate" }
      ],
      long: [
        { id: "mt_6", name: "1-2-3-Low", description: "Jab - Cross - Hook - Patada baja", difficulty: "intermediate" },
        { id: "mt_7", name: "Teep-Clinch-Knee", description: "Teep - Clincha - Rodilla", difficulty: "advanced" },
        { id: "mt_8", name: "1-2-Elbow-Knee", description: "Jab - Cross - Codo - Rodilla", difficulty: "advanced" },
        { id: "mt_9", name: "Low-Low-High", description: "Triple patada baja + alta", difficulty: "advanced" },
        { id: "mt_10", name: "Clincha-3-Knees", description: "Clincha - 3 Rodillas", difficulty: "advanced" }
      ]
    }
  },

  bjj: {
    id: "bjj",
    name: "BJJ",
    icon: "🟢",
    description: "Lucha en suelo y sumisiones",
    rounds: { min: 1, max: 4, default: 2 },
    roundLength: [3, 5],
    combos: {
      short: [
        { id: "bjj_1", name: "Guard Pull", description: "Tirar a guardia", difficulty: "beginner" },
        { id: "bjj_2", name: "Sweep-Back", description: "Barrido - Toma de espalda", difficulty: "beginner" },
        { id: "bjj_3", name: "Pass-Submission", description: "Pass de guardia - Sumisión", difficulty: "intermediate" },
        { id: "bjj_4", name: "Takedown-Guard", description: "Derribo - Guardia", difficulty: "intermediate" },
        { id: "bjj_5", name: "Mount-Escape", description: "Montada - Escape", difficulty: "beginner" }
      ],
      long: [
        { id: "bjj_6", name: "Takedown-Pass-Guard", description: "Derribo - Pass - Guardia", difficulty: "advanced" },
        { id: "bjj_7", name: "Guard-Sweep-Mount-Sub", description: "Ronda completa de suelo", difficulty: "advanced" },
        { id: "bjj_8", name: "Half-guard-Pass-Sub", description: "Half guard - Pass - Sumisión", difficulty: "advanced" }
      ]
    }
  },

  wrestling: {
    id: "wrestling",
    name: "Wrestling",
    icon: "🤼",
    description: "Derribos, control y prze",
    rounds: { min: 2, max: 5, default: 3 },
    roundLength: [2, 3, 4],
    combos: {
      short: [
        { id: "wr_1", name: "Single Leg", description: "Derribo de una pierna", difficulty: "beginner" },
        { id: "wr_2", name: "Double Leg", description: "Derribo de dos piernas", difficulty: "beginner" },
        { id: "wr_3", name: "Clinch-Control", description: "Clincha - Control", difficulty: "beginner" },
        { id: "wr_4", name: "Snap down", description: "Jalón hacia abajo", difficulty: "intermediate" },
        { id: "wr_5", name: "Throw by", description: "Voltear desde clincha", difficulty: "intermediate" }
      ],
      long: [
        { id: "wr_6", name: "Shot-Double-Takedown", description: "Shot - Doble takedown", difficulty: "advanced" },
        { id: "wr_7", name: "Clinch-Throw-Control", description: "Clincha - Voltear - Control", difficulty: "advanced" },
        { id: "wr_8", name: "Takedown-Ground-Control", description: "Derribo - Suelo - Control", difficulty: "advanced" }
      ]
    }
  },

  hardening: {
    id: "hardening",
    name: "Endurecimiento",
    icon: "💪",
    description: "Condición física, potencia y tolerancia al golpe",
    rounds: { min: 2, max: 5, default: 3 },
    roundLength: [2, 3, 4],
    combos: {
      short: [
        { id: "hrd_1", name: "Shadow-Shots", description: "Shadow boxing - 50 golpes", difficulty: "beginner" },
        { id: "hrd_2", name: "Burpee-Punches", description: "Burpees - Golpes", difficulty: "beginner" },
        { id: "hrd_3", name: "Squat-Punches", description: "Sentadillas - Golpes", difficulty: "intermediate" },
        { id: "hrd_4", name: "Mountain-Climber", description: "Mountain climbers intensos", difficulty: "intermediate" },
        { id: "hrd_5", name: "Ball-Slap", description: "Golpes con mancuerna (endu rección)", difficulty: "advanced" }
      ],
      long: [
        { id: "hrd_6", name: "HIIT-Combo", description: "HIIT + Combos de striking", difficulty: "advanced" },
        { id: "hrd_7", name: "Circuit-Endurance", description: "Circuito de resistencia", difficulty: "advanced" },
        { id: "hrd_8", name: "Power-Explosivity", description: "Ejercicios de potencia + strikes", difficulty: "advanced" }
      ]
    }
  },

  counterstrike: {
    id: "counterstrike",
    name: "Contragolpe",
    icon: "🎯",
    description: "Contraataques y contra-técnicas",
    rounds: { min: 2, max: 4, default: 2 },
    roundLength: [2, 3],
    combos: {
      short: [
        { id: "cnt_1", name: "Counter-1", description: "Contraataque al jab", difficulty: "beginner" },
        { id: "cnt_2", name: "Counter-3", description: "Contraataque al hook", difficulty: "beginner" },
        { id: "cnt_3", name: "Catch-Counter", description: "Atrapar y contraatacar", difficulty: "intermediate" },
        { id: "cnt_4", name: "Parry-Counter", description: "Parry y contraatacar", difficulty: "intermediate" },
        { id: "cnt_5", name: "Footwork-Counter", description: "Movimiento + contra", difficulty: "advanced" }
      ],
      long: [
        { id: "cnt_6", name: "Counter-Combo", description: "Secuencia de contraataques", difficulty: "advanced" },
        { id: "cnt_7", name: "Counter-Defense-Strike", description: "Defensa - Contraatacar", difficulty: "advanced" }
      ]
    }
  },

  mma: {
    id: "mma",
    name: "MMA",
    icon: "🔥",
    description: "Combate completo: pie, clincha y suelo",
    rounds: { min: 2, max: 5, default: 3 },
    roundLength: [3, 5],
    combos: {
      short: [
        { id: "mma_1", name: "Punch-Takedown", description: "Golpe - Takedown", difficulty: "beginner" },
        { id: "mma_2", name: "Clincha-Submission", description: "Clincha - Sumisión", difficulty: "beginner" },
        { id: "mma_3", name: "Ground-Strike", description: "Ground and Pound", difficulty: "intermediate" },
        { id: "mma_4", name: "Wrestle-Up", description: "Wrestle-up desde suelo", difficulty: "intermediate" },
        { id: "mma_5", name: "Submission-Strike", description: "Amenaza sumisión - Strike", difficulty: "advanced" }
      ],
      long: [
        { id: "mma_6", name: "Striking-Clinch-Ground", description: "Ronda completa MMA", difficulty: "advanced" },
        { id: "mma_7", name: "Full-Fight-Simulation", description: "Simulación de combate completo", difficulty: "advanced" },
        { id: "mma_8", name: "Transition-Combo", description: "Transiciones completas", difficulty: "advanced" }
      ]
    }
  }
};

export const comboDatabase = {
  niko_mixed_arts: {
    name: "Niko Style Mixed Arts",
    baseStyles: ["boxing", "muay_thai", "bjj", "wrestling"],
    description: "Estilo versátil que combina las 4 técnicas kata",
    progression: {
      1: ["Fundamentos de pie", "Guardia básica", "呼吸 (respiración)"],
      2: ["1-2 Jab-Cross", "1-2-3 Jab-Cross-Hook", "Gancho al cuerpo"],
      3: ["Uppercut", "Combinação 1-2-Uppercut", "Clincha básico"],
      4: ["Knee strike básico", "Teep (patada push)", "Takedown básico"],
      5: ["Combinación avanzada", "Switch kick", "Slam básico"]
    },
    combos: [
      { id: "niko_1", name: "1-2-3", description: "Jab - Cross - Hook", type: "striking", difficulty: "beginner", unlockedAt: 1 },
      { id: "niko_2", name: "1-2-Body", description: "Jab - Cross - Gancho al cuerpo", type: "striking", difficulty: "beginner", unlockedAt: 1 },
      { id: "niko_3", name: "1-2-Uppercut", description: "Jab - Cross - Uppercut", type: "striking", difficulty: "intermediate", unlockedAt: 2 },
      { id: "niko_4", name: "1-2-3-2", description: "Jab - Cross - Hook - Cross", type: "striking", difficulty: "intermediate", unlockedAt: 2 },
      { id: "niko_5", name: "Teep-1-2", description: "Teep - Jab - Cross", type: "striking", difficulty: "beginner", unlockedAt: 2 },
      { id: "niko_6", name: "Body-1-2", description: "Gancho cuerpo - Jab - Cross", type: "striking", difficulty: "intermediate", unlockedAt: 3 },
      { id: "niko_7", name: "Clincha-Knee", description: "Entrar a clincha - Rodilla", type: "clinch", difficulty: "intermediate", unlockedAt: 3 },
      { id: "niko_8", name: "1-2-Leg Kick", description: "Jab - Cross - Patada baja", type: "striking", difficulty: "intermediate", unlockedAt: 3 },
      { id: "niko_9", name: "Switch-Lead Kick", description: "Switch - Patada líder", type: "striking", difficulty: "advanced", unlockedAt: 4 },
      { id: "niko_10", name: "Double Leg", description: "Takedown de piernas", type: "grappling", difficulty: "advanced", unlockedAt: 4 },
      { id: "niko_11", name: "1-2-3-High Kick", description: "Jab - Cross - Hook - Patada alta", type: "striking", difficulty: "advanced", unlockedAt: 5 },
      { id: "niko_12", name: "Arm Drag-Double", description: "Arrastrar brazo - Takedown", type: "grappling", difficulty: "advanced", unlockedAt: 5 }
    ]
  },

  thai_boxing: {
    name: "Thai God's Regiment",
    baseStyles: ["muay_thai", "boxing"],
    description: "Arte del Muay Thai con enfoque en strikes devastadores",
    progression: {
      1: ["Teep básico", "Jab recto", "Patada circular básica"],
      2: ["1-2-3 Muay Thai", "Gancho de pie", "Patada baja (low kick)"],
      3: ["Clincha dominante", "Rodilla recta", "Codazo horizontal"],
      4: ["Combos con clincha", "3 rodillas", "Patada media"],
      5: ["Combo 9-dientes", "Rodilla curva", "Elbow devastador"]
    },
    combos: [
      { id: "thai_1", name: "Teep-Jab", description: "Teep - Jab", type: "striking", difficulty: "beginner", unlockedAt: 1 },
      { id: "thai_2", name: "1-2-Low Kick", description: "Jab - Cross - Patada baja", type: "striking", difficulty: "beginner", unlockedAt: 1 },
      { id: "thai_3", name: "1-2-3 MT", description: "Jab - Cross - Gancho - Patada circular", type: "striking", difficulty: "beginner", unlockedAt: 1 },
      { id: "thai_4", name: "Low Kick-1-2", description: "Patada baja - Jab - Cross", type: "striking", difficulty: "intermediate", unlockedAt: 2 },
      { id: "thai_5", name: "Clincha-Teep", description: "Teep para entrar a clincha", type: "clinch", difficulty: "intermediate", unlockedAt: 2 },
      { id: "thai_6", name: "Knee-Roundhouse", description: "Rodilla - Patada circular", type: "striking", difficulty: "intermediate", unlockedAt: 3 },
      { id: "thai_7", name: "Elbow-1-2", description: "Codazo - Jab - Cross", type: "striking", difficulty: "intermediate", unlockedAt: 3 },
      { id: "thai_8", name: "3-Knees", description: "3 Rodillas en clincha", type: "clinch", difficulty: "advanced", unlockedAt: 4 },
      { id: "thai_9", name: "9-Count", description: "Combo de 9 golpes", type: "combo", difficulty: "advanced", unlockedAt: 5 },
      { id: "thai_10", name: "Body-Elbow", description: "Cuerpo - Codazo cortante", type: "striking", difficulty: "advanced", unlockedAt: 5 }
    ]
  },

  bjj_flexibility: {
    name: "Strangler's Flow",
    baseStyles: ["bjj", "judo", "wrestling"],
    description: "Arte del BJJ con énfasis en flexibilidad y sumisiones",
    progression: {
      1: ["Rear naked choke básico", "Guardia cerrada", "Derribes básicos"],
      2: ["Armbar desde guardia", "Triangle choke", "Pass de guardia básico"],
      3: ["Omoplata", "Ezekiel choke", "Toma de espalda"],
      4: ["Leg lock básico", "Invertido", "Transiciones avanzadas"],
      5: ["RNC avanzado", "Mataleón", "Techniques de 10th planet"]
    },
    combos: [
      { id: "bjj_1", name: "RNC", description: "Rear Naked Choke", type: "submission", difficulty: "beginner", unlockedAt: 1 },
      { id: "bjj_2", name: "Armbar", description: "Armbar desde guardia", type: "submission", difficulty: "beginner", unlockedAt: 1 },
      { id: "bjj_3", name: "Triangle", description: "Triangle Choke", type: "submission", difficulty: "intermediate", unlockedAt: 2 },
      { id: "bjj_4", name: "Guard Pass", description: "Pass de guardia básico", type: "grappling", difficulty: "intermediate", unlockedAt: 2 },
      { id: "bjj_5", name: "Omoplata", description: "Omoplata desde guardia", type: "submission", difficulty: "intermediate", unlockedAt: 3 },
      { id: "bjj_6", name: "Back Take", description: "Toma de espalda", type: "grappling", difficulty: "intermediate", unlockedAt: 3 },
      { id: "bjj_7", name: "Kimura", description: "Kimura lock", type: "submission", difficulty: "advanced", unlockedAt: 4 },
      { id: "bjj_8", name: "Leg Lock", description: "Heel hook / Toe hold", type: "submission", difficulty: "advanced", unlockedAt: 4 },
      { id: "bjj_9", name: "Mataleón", description: "Mataleón", type: "submission", difficulty: "advanced", unlockedAt: 5 },
      { id: "bjj_10", name: "Inverted Guard", description: "Guardia invertida", type: "grappling", difficulty: "advanced", unlockedAt: 5 }
    ]
  },

  formless_mma: {
    name: "Formless Evolution",
    baseStyles: ["mma", "all"],
    description: "Estilo adaptativo sin forma fija",
    progression: {
      1: ["Golpes básicos", "Defensa básica", "Movimiento"],
      2: ["Takedowns", "Ground básico", "Clincha"],
      3: ["Striking avanzado", "Transiciones", "Submission básicos"],
      4: ["MMA combo", "GnP básico", "Clinchwork"],
      5: ["Adaptación total", "Counterstrike", "Advanced ground"]
    },
    combos: [
      { id: "form_1", name: "1-2-1-2", description: "Jab - Cross - Jab - Cross", type: "striking", difficulty: "beginner", unlockedAt: 1 },
      { id: "form_2", name: "Sprawl", description: "Defensa de takedown", type: "defense", difficulty: "beginner", unlockedAt: 1 },
      { id: "form_3", name: "Punch-Takedown", description: "Golpe - Takedown", type: "mma", difficulty: "intermediate", unlockedAt: 2 },
      { id: "form_4", name: "Guard Pull", description: "Pull a guardia", type: "grappling", difficulty: "intermediate", unlockedAt: 2 },
      { id: "form_5", name: "GnP", description: "Ground and Pound básico", type: "ground", difficulty: "intermediate", unlockedAt: 3 },
      { id: "form_6", name: "Wrestle-Up", description: "Wrestle-up desde ground", type: "grappling", difficulty: "intermediate", unlockedAt: 3 },
      { id: "form_7", name: "Submission-Strike", description: "Amenaza sumisión - Strike", type: "mma", difficulty: "advanced", unlockedAt: 4 },
      { id: "form_8", name: "Trip-Ground", description: "Derrible - Ground control", type: "mma", difficulty: "advanced", unlockedAt: 4 },
      { id: "form_9", name: "Cage-Work", description: "Trabajo cerca de la reja", type: "mma", difficulty: "advanced", unlockedAt: 5 },
      { id: "form_10", name: "Complete-AD", description: "Adaptación completa", type: "mma", difficulty: "advanced", unlockedAt: 5 }
    ]
  },

  karate_strength: {
    name: "Wild Tiger Power",
    baseStyles: ["karate", "hardening"],
    description: "Poder devastador del karate con máxima fuerza",
    progression: {
      1: ["Blocks básicos", "Stances (kiba-dachi)", "Punches básicos"],
      2: ["Gyaku-tsuki", "Oi-tsuki", "Mawashi-geri"],
      3: ["Power kicks", "Uchi-uke", "Ippon-kumite"],
      4: ["One-step", "Kata avanzada", "Full-contact basics"],
      5: ["Knockout power", "Mawashi-geri al cuerpo", "Combos de potencia"]
    },
    combos: [
      { id: "kar_1", name: "Gyaku-tsuki", description: "Reversal punch", type: "striking", difficulty: "beginner", unlockedAt: 1 },
      { id: "kar_2", name: "Oi-tsuki", description: "Lunge punch", type: "striking", difficulty: "beginner", unlockedAt: 1 },
      { id: "kar_3", name: "Mawashi-geri", description: "Patada circular", type: "striking", difficulty: "intermediate", unlockedAt: 2 },
      { id: "kar_4", name: "1-2-Gyaku", description: "Jab - Cross - Reverse punch", type: "striking", difficulty: "intermediate", unlockedAt: 2 },
      { id: "kar_5", name: "Uchi-uke", description: "Inner block - Contraataque", type: "defense", difficulty: "intermediate", unlockedAt: 3 },
      { id: "kar_6", name: "Yoko-geri", description: "Patada lateral", type: "striking", difficulty: "intermediate", unlockedAt: 3 },
      { id: "kar_7", name: "Kick-Punch", description: "Kick - Punch combination", type: "striking", difficulty: "advanced", unlockedAt: 4 },
      { id: "kar_8", name: "Power-Combo", description: "Triple combo de potencia", type: "striking", difficulty: "advanced", unlockedAt: 5 },
      { id: "kar_9", name: "Head Kick", description: "Patada a la cabeza", type: "striking", difficulty: "advanced", unlockedAt: 5 },
      { id: "kar_10", name: "One-Inch Punch", description: "Golpe de una pulgada", type: "striking", difficulty: "advanced", unlockedAt: 5 }
    ]
  },

  kure_assassin: {
    name: "Kure Clan Intensity",
    baseStyles: ["mma", "hardening", "counterstrike"],
    description: "Entrenamiento extremo del clan Kure",
    progression: {
      1: ["Strikes básicos", "Movimiento silencioso", "Resistencia"],
      2: ["Technique removal", "Strikes precisos", "Speed training"],
      3: ["Counterstrikes", "Takedowns letales", "Ground avanzado"],
      4: ["Finishing moves", "Submission rápidas", "Multi-attack"],
      5: ["Techniques de muerte", "Asesinato técnico", "Perfección Kure"]
    },
    combos: [
      { id: "kure_1", name: "Quick-1-2", description: "1-2 ultrarrápido", type: "striking", difficulty: "beginner", unlockedAt: 1 },
      { id: "kure_2", name: "Squeeze", description: "Technique removal", type: "submission", difficulty: "intermediate", unlockedAt: 2 },
      { id: "kure_3", name: "Counter-1", description: "Contraataque preciso", type: "counter", difficulty: "intermediate", unlockedAt: 2 },
      { id: "kure_4", name: "Neck Crank", description: "Neck crank", type: "submission", difficulty: "intermediate", unlockedAt: 3 },
      { id: "kure_5", name: "Quick-Sub", description: "Rápido a sumisión", type: "grappling", difficulty: "advanced", unlockedAt: 3 },
      { id: "kure_6", name: "Multi-Strike", description: "Múltiples strikes precisos", type: "striking", difficulty: "advanced", unlockedAt: 4 },
      { id: "kure_7", name: "Pressure-Point", description: "Golpes a puntos de presión", type: "striking", difficulty: "advanced", unlockedAt: 4 },
      { id: "kure_8", name: "Kure-Complete", description: "Técnica completa Kure", type: "mma", difficulty: "advanced", unlockedAt: 5 }
    ]
  },

  german_strength: {
    name: "German Engineering",
    baseStyles: ["boxing", "hardening"],
    description: "Poder muscular overwhelm con boxeo",
    progression: {
      1: ["Boxeo básico", "Sombra de poder", "Footwork"],
      2: ["Power punches", "Uppercuts", "Gancho de poder"],
      3: ["Combos de poder", "Clincha de poder", "Ganchos al cuerpo"],
      4: ["Full power combo", "Dominación", "Ground and pound"],
      5: ["Overwhelm total", "One-punch knockout", "Técnica + Poder"]
    },
    combos: [
      { id: "ger_1", name: "Power-Jab", description: "Jab con poder total", type: "striking", difficulty: "beginner", unlockedAt: 1 },
      { id: "ger_2", name: "Power-Cross", description: "Cross demoledor", type: "striking", difficulty: "beginner", unlockedAt: 1 },
      { id: "ger_3", name: "Hook-Body", description: "Gancho al cuerpo - Gancho arriba", type: "striking", difficulty: "intermediate", unlockedAt: 2 },
      { id: "ger_4", name: "Uppercut-Power", description: "Uppercut de poder", type: "striking", difficulty: "intermediate", unlockedAt: 2 },
      { id: "ger_5", name: "1-2-Power", description: "Jab - Cross de poder", type: "striking", difficulty: "intermediate", unlockedAt: 3 },
      { id: "ger_6", name: "Combo-Overload", description: "Combo de overload", type: "striking", difficulty: "advanced", unlockedAt: 4 },
      { id: "ger_7", name: "Power-Body", description: "Gancho poder al cuerpo", type: "striking", difficulty: "advanced", unlockedAt: 4 },
      { id: "ger_8", name: "One-Punch-KO", description: "Gancho de knockout", type: "striking", difficulty: "advanced", unlockedAt: 5 }
    ]
  },

  kaiwan_mastery: {
    name: "Devil Lance Mastery",
    baseStyles: ["counterstrike", "boxing"],
    description: "Maestría técnica perfecta del estilo Kawaoka",
    progression: {
      1: ["Kamae (posturas)", "Kote-waza", "Techniques básicos"],
      2: ["Precision strikes", "Countering", "Timing"],
      3: ["Multi-attack", "Weapon transitions", "Advanced counters"],
      4: ["One-strike-kill", "Perfect timing", "Devil Lance"],
      5: ["Perfección total", "Arma humana", "Techniques secretos"]
    },
    combos: [
      { id: "kai_1", name: "Kamae", description: "Postura perfecta", type: "stance", difficulty: "beginner", unlockedAt: 1 },
      { id: "kai_2", name: "Strike-Counter", description: "Contraataque preciso", type: "counter", difficulty: "beginner", unlockedAt: 1 },
      { id: "kai_3", name: "Precision-1-2", description: "1-2 de precisión", type: "striking", difficulty: "intermediate", unlockedAt: 2 },
      { id: "kai_4", name: "Counter-Timing", description: "Contratiempo perfecto", type: "counter", difficulty: "intermediate", unlockedAt: 3 },
      { id: "kai_5", name: "Multi-Strike", description: "Golpes múltiples", type: "striking", difficulty: "advanced", unlockedAt: 4 },
      { id: "kai_6", name: "Devil-Lance", description: "Technique Devil Lance", type: "striking", difficulty: "advanced", unlockedAt: 5 }
    ]
  },

  koei_flow: {
    name: "Beautiful Beast Flow",
    baseStyles: ["mma", "capoeira"],
    description: "Movimiento fluido y strikes engañosos",
    progression: {
      1: ["Movimiento circular", "Ginga básica", "Kicks básicos"],
      2: ["Flow strikes", "Deceptive movement", "Flores"],
      3: ["Kick combos", "Acrobatic basics", "Ground flow"],
      4: ["Advanced flow", "Feints", "Multi-dimension"],
      5: ["Perfect flow", "Beast mode", "Beautiful death"]
    },
    combos: [
      { id: "koe_1", name: "Ginga", description: "Movimiento base de ginga", type: "movement", difficulty: "beginner", unlockedAt: 1 },
      { id: "koe_2", name: "Meia-lua", description: "Patada media luna", type: "striking", difficulty: "beginner", unlockedAt: 1 },
      { id: "koe_3", name: "Flow-1-2", description: "1-2 fluido", type: "striking", difficulty: "intermediate", unlockedAt: 2 },
      { id: "koe_4", name: "Au-Cartwheel", description: "Patada carro", type: "movement", difficulty: "intermediate", unlockedAt: 3 },
      { id: "koe_5", name: "Feint-Kick", description: "Finta - Patada", type: "striking", difficulty: "advanced", unlockedAt: 4 },
      { id: "koe_6", name: "Beast-Flow", description: "Flujo bestial completo", type: "mma", difficulty: "advanced", unlockedAt: 5 }
    ]
  }
};

export const artStyles = [
  { id: "boxing", name: "Boxeo", icon: "🥊", description: "Golpes de puño, footwork, defensa" },
  { id: "muay_thai", name: "Muay Thai", icon: "🦵", description: "Patadas, codos, rodillas, clincha" },
  { id: "bjj", name: "BJJ", icon: "🟢", description: "Lucha en suelo, sumisiones, guardia" },
  { id: "wrestling", name: "Wrestling", icon: "🤼", description: "Takedowns, control, wrestle-up" },
  { id: "hardening", name: "Endurecimiento", icon: "💪", description: "Condición, potencia, tolerancia" },
  { id: "counterstrike", name: "Contragolpe", icon: "🎯", description: "Contraataques y contra-técnicas" },
  { id: "mma", name: "MMA", icon: "🔥", description: "Combate completo" }
];

export const getComboForWeek = (styleKey, currentWeek) => {
  const style = comboDatabase[styleKey];
  if (!style) return [];
  return style.combos.filter(combo => combo.unlockedAt <= currentWeek);
};

export const getProgressionForWeek = (styleKey, currentWeek) => {
  const style = comboDatabase[styleKey];
  if (!style) return [];
  
  const progression = [];
  for (let week = 1; week <= currentWeek; week++) {
    if (style.progression[week]) {
      progression.push({ week, techniques: style.progression[week] });
    }
  }
  return progression;
};

export const getCombosForStyle = (styleIds) => {
  let allCombos = { short: [], long: [] };
  
  styleIds.forEach(styleId => {
    const style = combatStyles[styleId];
    if (style) {
      allCombos.short = [...allCombos.short, ...style.combos.short];
      allCombos.long = [...allCombos.long, ...style.combos.long];
    }
  });
  
  return allCombos;
};

export const getRoundsForTime = (availableTime, combatStyles) => {
  const totalMinutes = availableTime;
  const roundMinutes = 3;
  const restBetweenRounds = 1;
  const roundWithRest = roundMinutes + restBetweenRounds;
  
  const maxRounds = Math.floor(totalMinutes / roundWithRest);
  return Math.max(2, Math.min(maxRounds, 5));
};
