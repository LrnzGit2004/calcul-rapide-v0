import { COLORS } from "@/constants/colors";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LevelSelect() {
  const router = useRouter();
  useEffect(() => {
    // Lecture au chargement de l’écran
    Speech.speak("Choisis ta salle de classe", {
      language: "fr-FR",
      rate: 0.95,
      pitch: 0.8,

      voice: "com.apple.ttsbundle.Thomas-compact",

      onError: () => console.log("Speech error"),
    });

    return () => {
      Speech.stop();
    };
  }, []);
  // @ts-ignore
  // @ts-ignore
  return (
    <View style={lvlStyles.container}>
      <Text style={lvlStyles.title}>Choisis ta classe</Text>
      <View style={lvlStyles.row}>
        <TouchableOpacity
          style={[lvlStyles.card, { backgroundColor: COLORS.yellow }]}
          onPress={() =>
            router.push(`/modules?grade=${encodeURIComponent("CM1")}` as any)
          }
        >
          <Text style={lvlStyles.cardText}>CM1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[lvlStyles.card, { backgroundColor: COLORS.yellow }]}
          onPress={() =>
            router.push(`/modules?grade=${encodeURIComponent("CM2")}` as any)
          }
        >
          <Text style={lvlStyles.cardText}>CM2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const lvlStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    marginTop: 60,
    //justifyContent: "center",
  },
  title: {
    fontFamily: "jeniffer",
    fontSize: 60,
    color: COLORS.text,
    marginBottom: 24,
    // backgroundColor: "red",
  },
  row: {
    flexDirection: "row",
    gap: 20,
    // backgroundColor: "rgba(255, 255, 255, 0.5)",
    // padding: 12,
    borderRadius: 12,

    // backgroundColor: "green",
  },
  card: { padding: 10, borderRadius: 20, width: 100, alignItems: "center" },
  cardText: { fontFamily: "BalooBold", color: "white", fontSize: 30 },
});
