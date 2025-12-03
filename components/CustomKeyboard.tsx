import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  onPressNumber: (n: string) => void;
  onDelete: () => void;
  onValidate: () => void;
  onQuit: () => void;
}

export const CustomKeyboard = ({
  onPressNumber,
  onDelete,
  onValidate,
  onQuit,
}: Props) => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {numbers.map((n) => (
          <Pressable
            key={n}
            style={styles.key}
            onPress={() => onPressNumber(n)}
          >
            <Text style={styles.keyText}>{n}</Text>
          </Pressable>
        ))}
        <Pressable
          style={{
            backgroundColor: "#FB8500",

            borderRadius: 100,
            width: "25%",
            margin: "1.5%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onDelete}
        >
          <Text style={styles.actionText}>
            <Image
              source={require("../assets/images/delete.png")}
              style={{ width: 30, height: 30 }}
            />
          </Text>
        </Pressable>
        <Pressable
          style={{
            borderRadius: 100,
            width: "25%",
            margin: "1.5%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#2A9D8F",
          }}
          onPress={onValidate}
        >
          <Text style={styles.actionText}>Ok</Text>
        </Pressable>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.actionKey, { backgroundColor: "#D62828" }]}
          onPress={onQuit}
        >
          <Text style={styles.actionText}>Quitter</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "30%",
    justifyContent: "center",
    marginTop: 100,
    // paddingLeft: 0,
    position: "relative",
    left: 610,
    alignSelf: "flex-start",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: "white",
    opacity: 0.9,
    paddingVertical: 10,
    borderRadius: 20,
  },
  key: {
    width: "25%",
    margin: "1.5%",
    backgroundColor: "#FFF7E0",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E0C391",
  },
  keyText: {
    fontFamily: "BalooBold",
    fontSize: 32,
  },
  actions: {
    marginTop: 20,
    position: "absolute",
    bottom: -7,
    left: -600,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "green",
    maxWidth: 180,
  },
  actionKey: {
    position: "relative",
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
  actionText: {
    fontFamily: "BalooBold",
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
});
