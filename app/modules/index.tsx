import { COLORS } from "@/constants/colors";
import { speakWithMaleVoice } from "@/utils/voice";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ModuleScreen() {
  const router = useRouter();
  const { grade } = useLocalSearchParams(); // on récupère la classe choisie

  useEffect(() => {
    // Lecture au chargement de l'écran
    speakWithMaleVoice("Choisis ton module", {
      language: "fr-FR",
      rate: 0.95,
    });

    return () => {
      Speech.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* <View style={styles.left}>
        <Mascot pose="point" size={270} />
      </View> */}

      <View style={styles.right}>
        <Text style={styles.title}>Choisis ton module</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push(
                `/operation?grade=${encodeURIComponent(String(grade))}` as any
              )
            }
          >
            <Text style={styles.buttonText}>Opérations</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push(
                `/geometry?grade=${encodeURIComponent(String(grade))}` as any
              )
            }
          >
            <Text style={styles.buttonText}>Géométrie</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push(
                `/measures?grade=${encodeURIComponent(String(grade))}` as any
              )
            }
          >
            <Text style={styles.buttonText}>Conversion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row" },

  left: { position: "absolute", left: 150, top: 60 },

  right: {
    flex: 1,
    // marginLeft: 400,
    justifyContent: "center",
    paddingHorizontal: 50,
    gap: 60,
  },

  title: {
    fontFamily: "jeniffer",
    fontSize: 46,
    color: COLORS.text,
    marginBottom: 170,
    textAlign: "center",
  },

  buttons: {
    maxWidth: 700,
    flexDirection: "row",
    gap: 18,
    justifyContent: "center",
    backgroundColor: COLORS.bg,
    padding: 12,
    borderRadius: 12,
    marginTop: 40,
    position: "absolute",
    top: 200,
    left: 95,
    right: 0,
    marginHorizontal: "auto",
  },

  button: {
    backgroundColor: COLORS.yellow,
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    width: 200,
  },

  buttonText: {
    fontSize: 25,
    color: "white",
    fontFamily: "BalooBold",
  },
});
