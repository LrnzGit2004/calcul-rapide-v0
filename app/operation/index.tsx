import { COLORS } from "@/constants/colors";
import { speakWithMaleVoice } from "@/utils/voice";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OperationSelect() {
  const { grade } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Lecture au chargement de l'écran
    speakWithMaleVoice("Choisis une opération pour t'entraîner", {
      language: "fr-FR",
      rate: 0.95,
    });

    return () => {
      Speech.stop();
    };
  }, []);

  const ops = [
    { label: "Addition", value: "add", color: COLORS.green },
    { label: "Soustraction", value: "sub", color: COLORS.yellow },
    { label: "Multiplication", value: "mul", color: COLORS.orange },
    { label: "Division", value: "div", color: COLORS.red },
  ];
  return (
    <View style={opStyles.container}>
      <Text style={opStyles.title}>Choisis l'opération</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Text style={opStyles.title}>+</Text>
        <Text style={opStyles.title}>-</Text>
        <Text style={opStyles.title}>x</Text>
        <Text style={opStyles.title}>/</Text>
      </View>
      <View style={opStyles.grid}>
        {ops.map((o) => (
          <TouchableOpacity
            key={o.value}
            style={[opStyles.card, { backgroundColor: o.color }]}
            onPress={() =>
              router.push(
                `/difficulty?grade=${encodeURIComponent(String(grade))}&module=operation&operation=${encodeURIComponent(o.value)}` as any
              )
            }
          >
            <Text style={opStyles.tileText}>{o.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const opStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "jeniffer",
    fontSize: 60,
    color: COLORS.text,
    marginBottom: 24,
  },
  grid: {
    maxWidth: 700,
    flexDirection: "row",
    gap: 18,
    justifyContent: "center",
    backgroundColor: COLORS.bg,
    padding: 12,
    borderRadius: 12,
    marginTop: 40,
  },
  card: { padding: 12, borderRadius: 20, width: 140, alignItems: "center" },
  tileText: { color: "white", fontFamily: "BalooBold", fontSize: 22 },
});
