import { COLORS } from "@/constants/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SummaryScreen() {
  const { payload, grade, module } = useLocalSearchParams();
  const router = useRouter();
  const results = payload ? JSON.parse(String(payload)) : [];

  const score = results.filter((r: any) => r.correct).length;

  // Séparation en 2 colonnes
  const leftCol = useMemo(() => results.slice(0, 5), [results]);
  const rightCol = useMemo(() => results.slice(5, 10), [results]);

  const handleReturnHome = () => {
    router.push("/level" as any);
  };

  return (
    <View style={sumStyles.container}>
      {/* Résultats */}

      <View style={sumStyles.right}>
        <View style={sumStyles.header}>
          <Text style={sumStyles.title}>Ton résultat :</Text>
          <Text style={sumStyles.score}>{score} / 10</Text>
        </View>

        {/* Deux colonnes */}
        <View style={sumStyles.columns}>
          {/* Colonne de gauche */}
          <View style={sumStyles.column}>
            {leftCol.map((item: any, idx: number) => (
              <View key={idx} style={sumStyles.row}>
                <Text style={sumStyles.q}>{idx + 1}.</Text>
                <Text style={sumStyles.qText}>{item.prompt} =</Text>
                <Text
                  style={[
                    sumStyles.qRes,
                    {
                      backgroundColor: item.correct ? COLORS.green : COLORS.red,
                    },
                  ]}
                >
                  {" "}
                  {item.answer}
                </Text>
              </View>
            ))}
          </View>

          {/* Colonne de droite */}
          <View style={sumStyles.column}>
            {rightCol.map((item: any, idx: number) => (
              <View key={idx + 5} style={sumStyles.row}>
                <Text style={sumStyles.q}>{idx + 6}.</Text>
                <Text style={sumStyles.qText}>{item.prompt} =</Text>
                <Text
                  style={[
                    sumStyles.qRes,
                    {
                      backgroundColor: item.correct ? COLORS.green : COLORS.red,
                    },
                  ]}
                >
                  {" "}
                  {item.answer}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bouton */}
        <TouchableOpacity style={sumStyles.button} onPress={handleReturnHome}>
          <Text style={sumStyles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const sumStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingBottom: 35,
  },

  left: { position: "absolute", left: 150, top: 70 },

  right: {
    flex: 1,
    // padding: 20,
    marginHorizontal: 300,
    justifyContent: "center",
    // backgroundColor: "red",
    paddingBottom: 45,
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    // marginBottom: 10,
  },

  title: {
    fontFamily: "jeniffer",
    fontSize: 30,
    color: COLORS.text,
  },
  score: {
    fontFamily: "BalooBold",
    fontSize: 36,
    color: COLORS.text,
  },

  columns: {
    flexDirection: "row",
    gap: 20,
    paddingLeft: 20,
  },

  column: {
    width: "50%",
  },

  row: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },

  q: {
    width: 20,
    fontFamily: "jeniffer",
    color: COLORS.text,
    fontSize: 14,
  },

  qText: {
    flexDirection: "row",

    fontFamily: "jeniffer",
    color: COLORS.text,
    fontSize: 14,
  },

  qRes: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
    textAlign: "center",
    fontFamily: "jeniffer",
    fontSize: 14,
    color: COLORS.text,
  },

  button: {
    marginTop: 30,
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 60,
    alignItems: "center",
    maxWidth: 200,
    alignSelf: "center",
  },

  buttonText: {
    color: "white",
    fontFamily: "BalooBold",
    fontSize: 18,
  },
});
