export const gymExerciseDatabase = {
  upper: {
    name: "Upper Body",
    description: "Ejercicios para tren superior",
    exercises: [
      {
        id: "bench_press",
        name: "Press Banca",
        muscles: ["pecho", "tríceps", "hombros"],
        equipment: "barbell",
        difficulty: "intermediate",
        sets: 4,
        reps: "6-10",
        weightRange: { min: 40, max: 80, unit: "kg" },
        substitutions: [
          { name: "Press en Máquina", reason: "lesión hombros/espalda" },
          { name: "Press con Mancuernas", reason: "lesión muñecas" },
          { name: "Pek Deck", reason: "sin barra" }
        ]
      },
      {
        id: "military_press",
        name: "Press Militar",
        muscles: ["hombros", "tríceps"],
        equipment: "barbell",
        difficulty: "intermediate",
        sets: 4,
        reps: "6-10",
        weightRange: { min: 30, max: 60, unit: "kg" },
        substitutions: [
          { name: "Press Máquina Hombros", reason: "lesión espalda baja" },
          { name: "Press Mancuernas", reason: "flexibilidad" }
        ]
      },
      {
        id: "pull_ups",
        name: "Dominadas",
        muscles: ["espalda", "bíceps"],
        equipment: "bodyweight",
        difficulty: "intermediate",
        sets: 4,
        reps: "6-12",
        weightRange: null,
        substitutions: [
          { name: "Remo con Barra", reason: "menos fuerza" },
          { name: "Remo Polea", reason: "control" },
          { name: "Face Pulls", reason: "lesión codos" }
        ]
      },
      {
        id: "barbell_row",
        name: "Remo con Barra",
        muscles: ["espalda", "bíceps"],
        equipment: "barbell",
        difficulty: "intermediate",
        sets: 4,
        reps: "8-12",
        weightRange: { min: 40, max: 80, unit: "kg" },
        substitutions: [
          { name: "Remo Mancuerna", reason: "lesión espalda" },
          { name: "Remo Polea Baja", reason: "control" }
        ]
      },
      {
        id: "bicep_curl",
        name: "Curl con Barra",
        muscles: ["bíceps"],
        equipment: "barbell",
        difficulty: "beginner",
        sets: 3,
        reps: "8-12",
        weightRange: { min: 15, max: 40, unit: "kg" },
        substitutions: [
          { name: "Curl Mancuernas", reason: "lesión muñecas" },
          { name: "Curl Polea", reason: "control" }
        ]
      },
      {
        id: "tricep_pushdown",
        name: "Fondos en Banco",
        muscles: ["tríceps"],
        equipment: "bodyweight",
        difficulty: "beginner",
        sets: 3,
        reps: "8-15",
        weightRange: null,
        substitutions: [
          { name: "Press Francés", reason: "lesión hombros" },
          { name: "Tricep Polea", reason: "control" }
        ]
      },
      {
        id: "lateral_raise",
        name: "Elevación Lateral",
        muscles: ["hombros"],
        equipment: "dumbbell",
        difficulty: "beginner",
        sets: 3,
        reps: "10-15",
        weightRange: { min: 5, max: 15, unit: "kg" },
        substitutions: [
          { name: "Polea Lateral", reason: "lesión hombro" },
          { name: "Máquina Lateral", reason: "control" }
        ]
      }
    ]
  },

  lower: {
    name: "Lower Body",
    description: "Ejercicios para tren inferior",
    exercises: [
      {
        id: "squat",
        name: "Sentadilla",
        muscles: ["cuádriceps", "glúteos", "isquiotibiales"],
        equipment: "barbell",
        difficulty: "intermediate",
        sets: 4,
        reps: "6-10",
        weightRange: { min: 60, max: 120, unit: "kg" },
        substitutions: [
          { name: "Prensa", reason: "lesión rodillas/espalda" },
          { name: "Sentadilla Hack", reason: "lesión lumbar" },
          { name: "Goblet Squat", reason: "principiante" }
        ]
      },
      {
        id: "deadlift",
        name: "Peso Muerto",
        muscles: ["espalda", "glúteos", "isquiotibiales"],
        equipment: "barbell",
        difficulty: "advanced",
        sets: 4,
        reps: "4-8",
        weightRange: { min: 80, max: 160, unit: "kg" },
        substitutions: [
          { name: "Peso Muerto Rumano", reason: "lesión lumbar" },
          { name: "Peso Muerto con Mancuernas", reason: "lesión espalda" },
          { name: "Hip Thrust", reason: "glúteos" }
        ]
      },
      {
        id: "leg_press",
        name: "Prensa de Piernas",
        muscles: ["cuádriceps", "glúteos"],
        equipment: "machine",
        difficulty: "beginner",
        sets: 3,
        reps: "10-15",
        weightRange: { min: 100, max: 200, unit: "kg" },
        substitutions: [
          { name: "Sentadilla", reason: "disponible" },
          { name: "Hack Squat", reason: "variación" }
        ]
      },
      {
        id: "romanian_deadlift",
        name: "Peso Muerto Rumano",
        muscles: ["isquiotibiales", "glúteos"],
        equipment: "barbell",
        difficulty: "intermediate",
        sets: 3,
        reps: "8-12",
        weightRange: { min: 40, max: 80, unit: "kg" },
        substitutions: [
          { name: "Curl de Isquiotibiales", reason: "lesión lumbar" },
          { name: "Peso Muerto con Mancuernas", reason: "lesión espalda" }
        ]
      },
      {
        id: "leg_curl",
        name: "Curl de Isquiotibiales",
        muscles: ["isquiotibiales"],
        equipment: "machine",
        difficulty: "beginner",
        sets: 3,
        reps: "10-15",
        weightRange: { min: 30, max: 60, unit: "kg" },
        substitutions: [
          { name: "Peso Muerto Rumano", reason: "con peso libre" },
          { name: "Nordic Curl", reason: "sin máquina" }
        ]
      },
      {
        id: "leg_extension",
        name: "Extensión de Piernas",
        muscles: ["cuádriceps"],
        equipment: "machine",
        difficulty: "beginner",
        sets: 3,
        reps: "12-15",
        weightRange: { min: 40, max: 80, unit: "kg" },
        substitutions: [
          { name: "Sentadilla", reason: "ejercicio compuesto" },
          { name: "Sissy Squat", reason: "sin máquina" }
        ]
      },
      {
        id: "calf_raise",
        name: "Elevación de Pantorrillas",
        muscles: ["pantorrillas"],
        equipment: "machine",
        difficulty: "beginner",
        sets: 4,
        reps: "12-20",
        weightRange: { min: 50, max: 120, unit: "kg" },
        substitutions: [
          { name: "Saltos en caja", reason: "explosividad" },
          { name: "Caminata en puntas", reason: "sin equipo" }
        ]
      },
      {
        id: "walking_lunge",
        name: "Zancadas Caminando",
        muscles: ["cuádriceps", "glúteos"],
        equipment: "dumbbell",
        difficulty: "intermediate",
        sets: 3,
        reps: "10-12 cada pierna",
        weightRange: { min: 10, max: 30, unit: "kg" },
        substitutions: [
          { name: "Sentadilla", reason: "lesión rodillas" },
          { name: "Prensa", reason: "sin mancuernas" }
        ]
      }
    ]
  },

  full: {
    name: "Full Body",
    description: "Ejercicios compound para todo el cuerpo",
    exercises: [
      {
        id: "clean_and_press",
        name: "Clean and Press",
        muscles: ["piernas", "espalda", "hombros", "core"],
        equipment: "barbell",
        difficulty: "advanced",
        sets: 4,
        reps: "5-8",
        weightRange: { min: 40, max: 70, unit: "kg" },
        substitutions: [
          { name: "Press Militar + Remo", reason: "separar movimientos" },
          { name: "ManMaker", reason: "con mancuernas" }
        ]
      },
      {
        id: "thruster",
        name: "Thruster",
        muscles: ["piernas", "hombros", "core"],
        equipment: "barbell",
        difficulty: "intermediate",
        sets: 4,
        reps: "6-10",
        weightRange: { min: 40, max: 70, unit: "kg" },
        substitutions: [
          { name: "Thruster con Mancuernas", reason: "lesión espalda" },
          { name: "Front Squat + Press", reason: "ejercicios separados" }
        ]
      },
      {
        id: "burpee",
        name: "Burpee",
        muscles: ["full_body"],
        equipment: "bodyweight",
        difficulty: "intermediate",
        sets: 3,
        reps: "10-15",
        weightRange: null,
        substitutions: [
          { name: "Burpee sin salto", reason: "lesión rodillas" },
          { name: "Mountain Climber", reason: "cardio" }
        ]
      },
      {
        id: "kettlebell_swings",
        name: "Kettlebell Swing",
        muscles: ["glúteos", "isquiotibiales", "core"],
        equipment: "kettlebell",
        difficulty: "intermediate",
        sets: 4,
        reps: "12-15",
        weightRange: { min: 12, max: 32, unit: "kg" },
        substitutions: [
          { name: "Swing con Mancuerna", reason: "sin kettlebell" },
          { name: "Peso Muerto Rumano", reason: "con barra" }
        ]
      },
      {
        id: "pull_up",
        name: "Dominada",
        muscles: ["espalda", "bíceps", "core"],
        equipment: "bodyweight",
        difficulty: "intermediate",
        sets: 4,
        reps: "6-10",
        weightRange: null,
        substitutions: [
          { name: "Banda Elástica", reason: "asistencia" },
          { name: "Remo Invertido", reason: "menos difícil" }
        ]
      },
      {
        id: "dips",
        name: "Fondos",
        muscles: ["pecho", "tríceps", "hombros"],
        equipment: "bodyweight",
        difficulty: "intermediate",
        sets: 3,
        reps: "8-12",
        weightRange: null,
        substitutions: [
          { name: "Fondos en Máquina", reason: "lesión hombros" },
          { name: "Press Banca", reason: "ejercicio compuesto" }
        ]
      },
      {
        id: "box_jump",
        name: "Salto al Cajón",
        muscles: ["piernas", "explosividad"],
        equipment: "box",
        difficulty: "intermediate",
        sets: 3,
        reps: "8-12",
        weightRange: { min: 30, max: 60, unit: "cm" },
        substitutions: [
          { name: "Saltos en Cuclillas", reason: "sin cajón" },
          { name: "Multisaltos", reason: "lesión" }
        ]
      },
      {
        id: "farmer_walk",
        name: "Carga de Granjero",
        muscles: ["antebrazos", "core", "piernas"],
        equipment: "dumbbell",
        difficulty: "beginner",
        sets: 3,
        reps: "40-60 segundos",
        weightRange: { min: 20, max: 50, unit: "kg" },
        substitutions: [
          { name: "Pallof Press", reason: "core" },
          { name: "Dead Bug", reason: "sin peso" }
        ]
      }
    ]
  },

  push: {
    name: "Push (Pecho/Hombros/Tri)",
    description: "Ejercicios de empuje",
    exercises: [
      {
        id: "bench_press_push",
        name: "Press Banca",
        muscles: ["pecho", "tríceps", "hombros"],
        equipment: "barbell",
        difficulty: "intermediate",
        sets: 4,
        reps: "6-10",
        weightRange: { min: 40, max: 80, unit: "kg" },
        substitutions: [
          { name: "Press Máquina", reason: "lesión" },
          { name: "Mancuernas", reason: "flexibilidad" }
        ]
      },
      {
        id: "overhead_press",
        name: "Press de Hombros",
        muscles: ["hombros", "tríceps"],
        equipment: "barbell",
        difficulty: "intermediate",
        sets: 4,
        reps: "6-10",
        weightRange: { min: 30, max: 60, unit: "kg" },
        substitutions: [
          { name: "Mancuernas", reason: "lesión" },
          { name: "Máquina", reason: "control" }
        ]
      },
      {
        id: "incline_press",
        name: "Press Inclinado",
        muscles: ["pecho superior", "hombros"],
        equipment: "barbell",
        difficulty: "intermediate",
        sets: 3,
        reps: "8-12",
        weightRange: { min: 30, max: 60, unit: "kg" },
        substitutions: [
          { name: "Press Inclinado Mancuernas", reason: "lesión" },
          { name: "Pek Deck", reason: "máquina" }
        ]
      },
      {
        id: "tricep_pushdown_push",
        name: "Tríceps Polea",
        muscles: ["tríceps"],
        equipment: "cable",
        difficulty: "beginner",
        sets: 3,
        reps: "10-15",
        weightRange: { min: 20, max: 50, unit: "kg" },
        substitutions: [
          { name: "Fondos", reason: "bodyweight" },
          { name: "Press Francés", reason: "barra" }
        ]
      },
      {
        id: "lateral_raise_push",
        name: "Elevación Lateral",
        muscles: ["deltoides"],
        equipment: "dumbbell",
        difficulty: "beginner",
        sets: 3,
        reps: "12-15",
        weightRange: { min: 5, max: 15, unit: "kg" },
        substitutions: [
          { name: "Polea", reason: "control" },
          { name: "Máquina", reason: "lesión" }
        ]
      },
      {
        id: "push_up",
        name: "Flexiones",
        muscles: ["pecho", "tríceps"],
        equipment: "bodyweight",
        difficulty: "beginner",
        sets: 3,
        reps: "15-25",
        weightRange: null,
        substitutions: [
          { name: "Flexiones de Rodillas", reason: "principiante" },
          { name: "Press Banca", reason: "con peso" }
        ]
      }
    ]
  },

  pull: {
    name: "Pull (Espalda/Bi)",
    description: "Ejercicios de tracción",
    exercises: [
      {
        id: "deadlift_pull",
        name: "Peso Muerto",
        muscles: ["espalda", "glúteos", "isquiotibiales"],
        equipment: "barbell",
        difficulty: "advanced",
        sets: 4,
        reps: "5-8",
        weightRange: { min: 80, max: 160, unit: "kg" },
        substitutions: [
          { name: "Peso Muerto Rumano", reason: "lesión lumbar" },
          { name: "Remo", reason: "menos peso" }
        ]
      },
      {
        id: "pull_ups_pull",
        name: "Dominadas",
        muscles: ["espalda", "bíceps"],
        equipment: "bodyweight",
        difficulty: "intermediate",
        sets: 4,
        reps: "6-12",
        weightRange: null,
        substitutions: [
          { name: "Remo Barra", reason: "asistencia" },
          { name: "Banda Elástica", reason: "ayuda" }
        ]
      },
      {
        id: "barbell_row_pull",
        name: "Remo con Barra",
        muscles: ["espalda", "bíceps"],
        equipment: "barbell",
        difficulty: "intermediate",
        sets: 4,
        reps: "8-12",
        weightRange: { min: 40, max: 80, unit: "kg" },
        substitutions: [
          { name: "Remo Mancuerna", reason: "lesión" },
          { name: "Remo Polea", reason: "control" }
        ]
      },
      {
        id: "face_pull",
        name: "Face Pull",
        muscles: ["hombros posteriores", "trapecio"],
        equipment: "cable",
        difficulty: "beginner",
        sets: 3,
        reps: "15-20",
        weightRange: { min: 15, max: 30, unit: "kg" },
        substitutions: [
          { name: "Pájaro Inverso", reason: "mancuernas" },
          { name: "Bandas", reason: "sin máquina" }
        ]
      },
      {
        id: "bicep_curl_pull",
        name: "Curl de Bíceps",
        muscles: ["bíceps"],
        equipment: "barbell",
        difficulty: "beginner",
        sets: 3,
        reps: "8-12",
        weightRange: { min: 15, max: 40, unit: "kg" },
        substitutions: [
          { name: "Curl Mancuernas", reason: "lesión" },
          { name: "Curl Polea", reason: "control" }
        ]
      },
      {
        id: "hammer_curl",
        name: "Curl Martillo",
        muscles: ["bíceps", "antebrazos"],
        equipment: "dumbbell",
        difficulty: "beginner",
        sets: 3,
        reps: "10-12",
        weightRange: { min: 8, max: 20, unit: "kg" },
        substitutions: [
          { name: "Curl Polea", reason: "control" },
          { name: "Curl Barra", reason: "con peso" }
        ]
      }
    ]
  },

  legs: {
    name: "Legs (Piernas)",
    description: "Ejercicios para tren inferior",
    exercises: [
      {
        id: "squat_legs",
        name: "Sentadilla",
        muscles: ["cuádriceps", "glúteos"],
        equipment: "barbell",
        difficulty: "intermediate",
        sets: 4,
        reps: "6-10",
        weightRange: { min: 60, max: 120, unit: "kg" },
        substitutions: [
          { name: "Prensa", reason: "lesión" },
          { name: "Goblet Squat", reason: "principiante" }
        ]
      },
      {
        id: "leg_press_legs",
        name: "Prensa",
        muscles: ["cuádriceps", "glúteos"],
        equipment: "machine",
        difficulty: "beginner",
        sets: 3,
        reps: "12-15",
        weightRange: { min: 100, max: 200, unit: "kg" },
        substitutions: [
          { name: "Sentadilla", reason: "con barra" },
          { name: "Hack Squat", reason: "variación" }
        ]
      },
      {
        id: "rdl_legs",
        name: "Peso Muerto Rumano",
        muscles: ["isquiotibiales", "glúteos"],
        equipment: "barbell",
        difficulty: "intermediate",
        sets: 3,
        reps: "8-12",
        weightRange: { min: 40, max: 80, unit: "kg" },
        substitutions: [
          { name: "Curl Isquiotibiales", reason: "máquina" },
          { name: "RDL Mancuernas", reason: "lesión" }
        ]
      },
      {
        id: "leg_curl_legs",
        name: "Curl Isquiotibiales",
        muscles: ["isquiotibiales"],
        equipment: "machine",
        difficulty: "beginner",
        sets: 3,
        reps: "12-15",
        weightRange: { min: 30, max: 60, unit: "kg" },
        substitutions: [
          { name: "RDL", reason: "con peso" },
          { name: "Nordic", reason: "bodyweight" }
        ]
      },
      {
        id: "leg_extension_legs",
        name: "Extensión Piernas",
        muscles: ["cuádriceps"],
        equipment: "machine",
        difficulty: "beginner",
        sets: 3,
        reps: "12-15",
        weightRange: { min: 40, max: 80, unit: "kg" },
        substitutions: [
          { name: "Sentadilla", reason: "compound" },
          { name: "Sissy Squat", reason: "bodyweight" }
        ]
      },
      {
        id: "calf_raise_legs",
        name: "Elevación Pantorrillas",
        muscles: ["pantorrillas"],
        equipment: "machine",
        difficulty: "beginner",
        sets: 4,
        reps: "15-20",
        weightRange: { min: 50, max: 120, unit: "kg" },
        substitutions: [
          { name: "Saltos", reason: "explosividad" },
          { name: "Caminata puntas", reason: "sin equipo" }
        ]
      },
      {
        id: "hip_thrust",
        name: "Hip Thrust",
        muscles: ["glúteos", "isquiotibiales"],
        equipment: "barbell",
        difficulty: "intermediate",
        sets: 3,
        reps: "8-12",
        weightRange: { min: 40, max: 100, unit: "kg" },
        substitutions: [
          { name: "Glute Bridge", reason: "bodyweight" },
          { name: "Prensa", reason: "máquina" }
        ]
      },
      {
        id: "lunge_legs",
        name: "Zancadas",
        muscles: ["cuádriceps", "glúteos"],
        equipment: "dumbbell",
        difficulty: "intermediate",
        sets: 3,
        reps: "10-12 cada pierna",
        weightRange: { min: 10, max: 30, unit: "kg" },
        substitutions: [
          { name: "Sentadilla", reason: "menos coordinación" },
          { name: "Prensa", reason: "máquina" }
        ]
      }
    ]
  }
};

export const getExerciseForInjury = (exercise, injury) => {
  const injuryMap = {
    knee: ["squat", "leg_press", "lunge", "leg_extension"],
    back: ["deadlift", "squat", "romanian_deadlift"],
    shoulder: ["bench_press", "military_press", "overhead_press", "dips"],
    wrist: ["bench_press", "curl", "tricep_pushdown"]
  };
  
  const affectedExercises = injuryMap[injury] || [];
  return affectedExercises.includes(exercise.id) ? exercise.substitutions : [];
};

export const getExercisesByType = (type) => {
  return gymExerciseDatabase[type]?.exercises || [];
};
