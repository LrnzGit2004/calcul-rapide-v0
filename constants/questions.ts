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
