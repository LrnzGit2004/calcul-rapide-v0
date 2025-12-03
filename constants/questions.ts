export function generateQuestions(
  level: string,
  operation: string,
  difficulty: number
) {
  // Returns 10 questions: { id, prompt (text for log), audio (fr string), result }
  const out: any[] = [];

  for (let i = 0; i < 10; i++) {
    const q = generateOne(level, operation, difficulty);
    out.push({ id: i + 1, prompt: q.prompt, audio: q.audio, result: q.result });
  }

  return out;
}

function generateOne(level: string, op: string, diff: number) {
  // Define ranges for CM1 and CM2 and per difficulty
  const ranges: any = {
    CM1: [
      [1, 10],
      [1, 20],
      [5, 30],
      [10, 60],
      [20, 100],
    ],
    CM2: [
      [1, 20],
      [1, 30],
      [5, 70],
      [10, 100],
      [20, 200],
    ],
  };

  const r = ranges[level]
    ? ranges[level][Math.max(0, diff - 1)]
    : ranges.CM1[0];
  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  let a = rand(r[0], r[1]);
  let b = rand(r[0], r[1]);
  let prompt: string;
  let audio = "";
  let result = 0;

  switch (op) {
    case "add":
      prompt = `${a} + ${b}`;
      audio = `${a} plus ${b}`;
      result = a + b;
      break;
    case "sub":
      if (b > a) [a, b] = [b, a];
      prompt = `${a} - ${b}`;
      audio = `${a} moins ${b}`;
      result = a - b;
      break;
    case "mul":
      // keep b smaller for easier mental multiplication
      b = rand(1, Math.min(12, r[1]));
      prompt = `${a} × ${b}`;
      audio = `${a} multiplié par ${b}`;
      result = a * b;
      break;
    case "div":
      b = rand(1, Math.min(12, r[1]));
      result = rand(
        Math.max(1, Math.floor(r[0] / 1)),
        Math.max(1, Math.floor(r[1] / 2))
      );
      a = b * result;
      prompt = `${a} ÷ ${b}`;
      audio = `${a} divisé par ${b}`;
      break;
    default:
      prompt = `${a} + ${b}`;
      audio = `${a} plus ${b}`;
      result = a + b;
  }

  // Append short instruction: "Écris !" is not spoken — we keep only calculation enunciation
  return { prompt, audio, result };
}

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function generateGeometryQuestions(grade: string, difficulty: number) {
  const out: any[] = [];

  for (let i = 0; i < 10; i++) {
    const q = generateOneGeometry(grade, difficulty);
    out.push({ id: i + 1, prompt: q.prompt, audio: q.audio, result: q.result });
  }

  return out;
}

function generateOneGeometry(grade: string, diff: number) {
  // Define ranges for dimensions based on grade and difficulty
  const ranges: any = {
    CM1: [
      [2, 10], // easy
      [5, 15], // medium
      [10, 20], // hard
      [10, 30], // very hard
      [15, 40], // extreme
    ],
    CM2: [
      [5, 15],
      [10, 25],
      [15, 40],
      [20, 60],
      [30, 100],
    ],
  };

  const r = ranges[grade]
    ? ranges[grade][Math.max(0, diff - 1)]
    : ranges.CM1[0];

  const types = [
    "rectangle_perim",
    "rectangle_area",
    "triangle_perim",
    "circle_perim",
  ];
  const type = types[rand(0, types.length - 1)];

  let prompt = "";
  let audio = "";
  let result = 0;

  switch (type) {
    case "rectangle_perim": {
      const w = rand(r[0], r[1]);
      const h = rand(r[0], r[1]);
      prompt = `Un rectangle a une largeur de ${w} cm et une hauteur de ${h} cm. Quel est son périmètre en cm ?`;
      audio = `Un rectangle a une largeur de ${w} centimètres et une hauteur de ${h} centimètres. Quel est son périmètre en centimètres ?`;
      result = 2 * (w + h);
      break;
    }
    case "rectangle_area": {
      const w = rand(r[0], r[1]);
      const h = rand(r[0], r[1]);
      prompt = `Un rectangle a une largeur de ${w} cm et une hauteur de ${h} cm. Quelle est sa surface en cm² ?`;
      audio = `Un rectangle a une largeur de ${w} centimètres et une hauteur de ${h} centimètres. Quelle est sa surface en centimètres carrés ?`;
      result = w * h;
      break;
    }
    case "triangle_perim": {
      const a = rand(r[0], r[1]);
      const b = rand(r[0], r[1]);
      const c = rand(r[0], r[1]);
      prompt = `Un triangle a des côtés de ${a} cm, ${b} cm et ${c} cm. Quel est son périmètre en cm ?`;
      audio = `Un triangle a des côtés de ${a} centimètres, ${b} centimètres et ${c} centimètres. Quel est son périmètre en centimètres ?`;
      result = a + b + c;
      break;
    }
    case "circle_perim": {
      const diameter = rand(r[0], r[1]);
      prompt = `Un cercle a un diamètre de ${diameter} cm. Quel est son périmètre en cm ? (Arrondir à l'entier le plus proche, π ≈ 3,14)`;
      audio = `Un cercle a un diamètre de ${diameter} centimètres. Quel est son périmètre en centimètres ? Arrondir à l'entier le plus proche.`;
      result = Math.round(diameter * 3.14);
      break;
    }
  }

  return { prompt, audio, result };
}

export function generateMeasuresQuestions(grade: string, difficulty: number) {
  const out: any[] = [];

  for (let i = 0; i < 10; i++) {
    const q = generateOneMeasures(grade, difficulty);
    out.push({ id: i + 1, prompt: q.prompt, audio: q.audio, result: q.result });
  }

  return out;
}

function generateOneMeasures(grade: string, diff: number) {
  const ranges: any = {
    CM1: [
      [1, 10],
      [5, 20],
      [10, 50],
      [20, 100],
      [50, 200],
    ],
    CM2: [
      [10, 100],
      [50, 500],
      [100, 1000],
      [500, 5000],
      [1000, 10000],
    ],
  };

  const r = ranges[grade]
    ? ranges[grade][Math.max(0, diff - 1)]
    : ranges.CM1[0];

  const types = ["length_conv", "weight_conv", "capacity_conv", "time_conv"];
  const type = types[rand(0, types.length - 1)];

  let prompt = "";
  let audio = "";
  let result = 0;

  switch (type) {
    case "length_conv": {
      const meters = rand(r[0], r[1]);
      prompt = `Convertir ${meters} mètres en centimètres.`;
      audio = `Convertir ${meters} mètres en centimètres.`;
      result = meters * 100;
      break;
    }
    case "weight_conv": {
      const kg = rand(r[0], r[1]);
      prompt = `Convertir ${kg} kilogrammes en grammes.`;
      audio = `Convertir ${kg} kilogrammes en grammes.`;
      result = kg * 1000;
      break;
    }
    case "capacity_conv": {
      const liters = rand(r[0], r[1]);
      prompt = `Convertir ${liters} litres en millilitres.`;
      audio = `Convertir ${liters} litres en millilitres.`;
      result = liters * 1000;
      break;
    }
    case "time_conv": {
      const hours = rand(1, 10);
      const minutes = rand(0, 59);
      prompt = `Convertir ${hours} heures et ${minutes} minutes en minutes.`;
      audio = `Convertir ${hours} heures et ${minutes} minutes en minutes.`;
      result = hours * 60 + minutes;
      break;
    }
  }

  return { prompt, audio, result };
}
