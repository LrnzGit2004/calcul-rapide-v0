// app/game/index.tsx
import { CustomKeyboard } from "@/components/CustomKeyboard";
import { COLORS } from "@/constants/colors";
import {
  generateGeometryQuestions,
  generateMeasuresQuestions,
  generateQuestions,
} from "@/constants/questions";
import { speakWithMaleVoice } from "@/utils/voice";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";

type Q = { id: number; prompt: string; audio: string; result: number };

export default function GameScreen() {
  const { grade, module, operation, difficulty } = useLocalSearchParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<Q[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);
  const [results, setResults] = useState<any[]>([]);
  const timerRef = useRef<number | null>(null);

  // Load questions based on module
  useEffect(() => {
    let qs: Q[] = [];
    const diff = Number(difficulty) || 1;

    if (module === "operation") {
      qs = generateQuestions(String(grade), String(operation), diff);
    } else if (module === "geo") {
      qs = generateGeometryQuestions(String(grade), diff);
    } else if (module === "measures") {
      qs = generateMeasuresQuestions(String(grade), diff);
    }

    setQuestions(qs);
  }, []);

  // Speak question
  useEffect(() => {
    if (!questions.length) return;

    const q = questions[index];
    Speech.stop();

    speakWithMaleVoice(q.audio, {
      language: "fr-FR",
      rate: 0.95,
    });

    setTimeLeft(20);
  }, [questions, index]);

  // Timer countdown
  useEffect(() => {
    if (!questions.length) return;
    if (timeLeft <= 0) return handleSubmit();

    timerRef.current = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, index, questions.length]);

  const handleSubmit = () => {
    const q = questions[index];
    const numeric = Number(answer);
    const correct = numeric === q.result;

    setResults((r) => [...r, { ...q, answer: numeric, correct, timeLeft }]);
    setAnswer("");
    Keyboard.dismiss();

    if (index >= 9) {
      const final = [...results, { ...q, answer: numeric, correct, timeLeft }];
      const payload = encodeURIComponent(JSON.stringify(final));
      router.replace(
        `/summary?grade=${encodeURIComponent(String(grade))}&module=${encodeURIComponent(String(module))}&payload=${payload}` as any
      );
      return;
    }

    setIndex((i) => i + 1);
  };

  if (!questions.length) return <View style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      {/* LEFT SIDE - Mascot */}
      {/* <View style={styles.left}>
        <Mascot pose={"teaching"} size={230} />
      </View> */}

      {/* RIGHT SIDE - Question */}
      <View style={styles.right}>
        <Text style={styles.header}>Question {index + 1} / 10</Text>

        <View style={styles.timerBox}>
          <Text>Temps restant :</Text>
          <Text style={styles.timerText}> {timeLeft}s</Text>
        </View>

        <Text style={styles.hint}>Écoute la voix et tape ta réponse :</Text>

        <View style={styles.answerBox}>
          <Text style={styles.answerText}>{answer || "…"}</Text>
        </View>

        <CustomKeyboard
          onPressNumber={(n) => setAnswer((prev) => prev + n)}
          onDelete={() => setAnswer((prev) => prev.slice(0, -1))}
          onValidate={handleSubmit}
          onQuit={() => router.replace("/level")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "transparent" },
  left: {
    position: "absolute",
    left: 150,
    top: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  right: { flex: 1, padding: 40, justifyContent: "center" },
  header: {
    position: "absolute",
    top: 50,
    left: "45%",
    fontFamily: "jeniffer",
    fontSize: 34,
    color: COLORS.text,
  },
  timerBox: {
    position: "absolute",
    top: 24,
    right: "5%",
    backgroundColor: "white",
    opacity: 0.9,
    padding: 10,
    width: 150,
    height: 80,
    justifyContent: "center",
    borderRadius: 100,
    alignItems: "center",
  },
  timerText: { fontFamily: "BalooBold", fontSize: 28, color: COLORS.red },
  hint: {
    position: "absolute",
    left: "40%",
    top: 100,
    fontFamily: "Outfit",
    fontSize: 20,

    color: COLORS.text,
  },
  answerBox: {
    position: "absolute",
    top: 130,
    left: "39%",
    paddingVertical: 18,
    borderRadius: 14,
    width: 260,
    alignItems: "center",
    marginBottom: 20,
    fontFamily: "jeniffer",
  },
  answerText: {
    fontFamily: "jeniffer",
    fontSize: 36,
    color: COLORS.text,
  },
});
