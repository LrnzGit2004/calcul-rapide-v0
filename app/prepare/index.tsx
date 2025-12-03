import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PrepareScreen() {
  const { level } = useLocalSearchParams();

  const startGame = () => {
    router.push("/game" as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prépare-toi !</Text>
      <Text style={styles.subtitle}>
        Monsieur Kofi va te poser{"\n"}10 questions de calcul mental.
      </Text>

      <Pressable style={styles.button} onPress={startGame}>
        <Text style={styles.buttonText}>Commencer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCEFD4",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  title: {
    fontFamily: "BalooBold",
    fontSize: 48,
    color: "#3A2E1F",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 20,
    fontFamily: "BalooBold",
    fontSize: 28,
    textAlign: "center",
    color: "#4A3A28",
  },
  button: {
    marginTop: 40,
    backgroundColor: "#FFB703",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: "BalooBold",
    fontSize: 32,
    color: "white",
  },
});
