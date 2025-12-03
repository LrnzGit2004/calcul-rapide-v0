import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Timer({
  duration = 20,
  onFinish,
}: {
  duration?: number;
  onFinish?: () => void;
}) {
  const [time, setTime] = useState(duration);
  useEffect(() => {
    if (time <= 0) {
      onFinish?.();
      return;
    }
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time]);

  return (
    <View style={tStyles.wrap}>
      <Text style={tStyles.text}>{time}s</Text>
    </View>
  );
}

const tStyles = StyleSheet.create({
  wrap: { backgroundColor: "white", padding: 10, borderRadius: 10 },
  text: { fontSize: 22, fontFamily: "BalooBold" },
});
