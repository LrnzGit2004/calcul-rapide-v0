import { COLORS } from "@/constants/colors";
import { speakWithMaleVoice } from "@/utils/voice";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MeasuresLevelSelect() {
  const { grade } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(
    null
  );

  const onSelectDifficulty = (d: number) => {
    setSelectedDifficulty(d);
    setModalVisible(true);
  };

  const startGame = () => {
    if (!selectedDifficulty) return;
    const url = `/game?grade=${encodeURIComponent(String(grade))}&module=measures&difficulty=${selectedDifficulty}`;

    setModalVisible(false);
    router.push(url as any);
  };

  const [page, setPage] = useState<1 | 2>(1);

  useEffect(() => {
    speakWithMaleVoice("Choisis la difficulté", {
      language: "fr-FR",
      rate: 0.95,
    });

    return () => {
      Speech.stop();
    };
  }, []);

  useEffect(() => {
    if (modalVisible) {
      // Stop toute lecture précédente
      Speech.stop();

      // Lecture du message de préparation
      speakWithMaleVoice("Prépare toi pour les calculs.", {
        language: "fr-FR",
        rate: 0.95,
      });
    }

    return () => {
      Speech.stop();
    };
  }, [modalVisible]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisis la difficulté</Text>
      <View style={diffStyles.sliderContainer}>
        {page === 1 && (
          <View style={diffStyles.slide}>
            <TouchableOpacity
              style={[diffStyles.medal, { backgroundColor: COLORS.green }]}
              onPress={() => onSelectDifficulty(1)}
            >
              <Text style={diffStyles.medalText}>Niveau 1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[diffStyles.medal, { backgroundColor: COLORS.HardGreen }]}
              onPress={() => onSelectDifficulty(2)}
            >
              <Text style={diffStyles.medalText}>Niveau 2</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={diffStyles.navButton}
              onPress={() => setPage(2)}
            >
              <Text style={diffStyles.navText}>→</Text>
            </TouchableOpacity>
          </View>
        )}

        {page === 2 && (
          <View style={diffStyles.slide}>
            <TouchableOpacity
              style={diffStyles.navButton}
              onPress={() => setPage(1)}
            >
              <Text style={diffStyles.navText}>←</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[diffStyles.medal, { backgroundColor: COLORS.yellow }]}
              onPress={() => onSelectDifficulty(3)}
            >
              <Text style={[diffStyles.medalText]}>Niveau 3</Text>
            </TouchableOpacity>
            {/* [lvlStyles.card, { backgroundColor: COLORS.yellow }] */}

            <TouchableOpacity
              style={[diffStyles.medal, { backgroundColor: COLORS.orange }]}
              onPress={() => onSelectDifficulty(4)}
            >
              <Text style={diffStyles.medalText}>Niveau 4</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[diffStyles.medal, { backgroundColor: COLORS.red }]}
              onPress={() => onSelectDifficulty(5)}
            >
              <Text style={diffStyles.medalText}>Niveau 5</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Modal de préparation */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <BlurView
            intensity={10}
            tint="light"
            style={StyleSheet.absoluteFillObject}
          />

          <View style={modalStyles.container}>
            {/* <Image
                    source={require("../../assets/images/ardoise.jpg")}
                    style={modalStyles.ardoise}
                  /> */}
            <Text style={modalStyles.title}>Prépare-toi !</Text>
            <Text style={modalStyles.subtitle}>
              La voix va te poser{"\n"}10 questions de conversion des unités.
            </Text>

            <View style={modalStyles.buttons}>
              <Pressable
                style={modalStyles.cancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={modalStyles.cancelText}>Retour</Text>
              </Pressable>
              <Pressable style={modalStyles.start} onPress={startGame}>
                <Text style={modalStyles.startText}>Je suis prêt !</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
  row: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: COLORS.bg,
    padding: 12,
    borderRadius: 12,
    marginTop: 80,
  },
  medal: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 18,
    minWidth: 100,
    alignItems: "center",
  },
  medalText: { fontFamily: "BalooBold", fontSize: 20, color: "#FAFAF5" },
});

const diffStyles = StyleSheet.create({
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
  row: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: COLORS.bg,
    padding: 12,
    borderRadius: 12,
    marginTop: 80,
  },
  medal: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 18,
    minWidth: 100,
    alignItems: "center",
  },
  medalText: { fontFamily: "BalooBold", fontSize: 20, color: "#FAFAF5" },
  sliderContainer: {
    marginTop: 80,
    backgroundColor: COLORS.bg,
    padding: 12,
    borderRadius: 12,
  },

  slide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },

  navButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: COLORS.yellow,
    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    fontFamily: "BalooBold",
    fontSize: 32,
    color: "white",
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 241, 241, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    marginTop: 20,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    padding: 28,
    borderRadius: 16,
    width: "40%",
    alignItems: "center",
  },
  title: {
    fontFamily: "BalooBold",
    fontSize: 36,
    marginBottom: 8,
    color: "#333333",
  },
  subtitle: {
    fontFamily: "Outfit",
    fontSize: 18,
    textAlign: "center",
    color: "#333333",
  },
  buttons: { flexDirection: "row", marginTop: 20, gap: 12 },
  cancel: { padding: 12, borderRadius: 40, backgroundColor: COLORS.text },
  cancelText: { fontFamily: "BalooBold", fontSize: 18 },
  start: { padding: 12, borderRadius: 40, backgroundColor: COLORS.yellow },
  startText: { fontFamily: "BalooBold", fontSize: 18, color: "white" },
});
