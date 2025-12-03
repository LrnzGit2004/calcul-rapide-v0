import React from "react";
import { Image, StyleSheet, View } from "react-native";

// This component expects that you have exported mascot images in /assets/maskot
// e.g. assets/mascot/neutral.png, teaching.png, celebrate.png, happy.png, encourage.png

type Props = { pose?: string; size?: number };

const POSE_MAP: Record<string, any> = {
  neutral: require("../assets/mascot/neutral.png"),
  teaching: require("../assets/mascot/teaching.png"),
  celebrate: require("../assets/mascot/celebrate.png"),
  happy: require("../assets/mascot/happy.png"),
  encourage: require("../assets/mascot/encourage.png"),
  salut: require("../assets/mascot/salut.png"),
};

export default function Mascot({ pose = "neutral", size = 250 }: Props) {
  const src = POSE_MAP[pose] || POSE_MAP.neutral;
  return (
    <View style={[{ width: size, height: size }, styles.wrap]}>
      <Image
        source={src}
        style={{ width: size, height: size, resizeMode: "contain" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { justifyContent: "center", alignItems: "center" },
});
