import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    Baloo: require("../assets/fonts/Baloo2-Regular.ttf"),
    BalooBold: require("../assets/fonts/Baloo2-Bold.ttf"),
    Outfit: require("../assets/fonts/OutfitRegular.ttf"),
    OutfitSemi: require("../assets/fonts/OutfitSemiBold.ttf"),
    jeniffer: require("../assets/fonts/jeniffer.ttf"),
    comics: require("../assets/fonts/comics.otf"),
  });

  if (!loaded) return <View style={{ flex: 1, backgroundColor: "black" }} />;

  // 👇 MASQUER LA BARRE D’ÉTAT (tous appareils)
  StatusBar.setHidden(true, "fade");

  return (
    <View style={styles.root}>
      {/* Cache la status bar côté Expo */}
      <ExpoStatusBar hidden style="auto" />

      <ImageBackground
        source={require("../assets/images/background_app.gif")}
        style={styles.background}
        resizeMode="stretch"
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
          }}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
