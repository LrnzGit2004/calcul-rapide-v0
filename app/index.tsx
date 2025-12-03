import { COLORS } from "@/constants/colors";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../assets/images/favicon.png")}
          style={styles.logo}
        />
      </View>

      <Link href={"/level" as any} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Commencer</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    gap: -20,
  },

  logo: {
    width: 205,
    height: 150,
    resizeMode: "contain",
  },

  button: {
    marginTop: 80,
    backgroundColor: COLORS.yellow,
    width: "25%",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "BalooBold",
    fontSize: 26,
    color: "#FAFAF5",
    textAlign: "center",
  },
});
