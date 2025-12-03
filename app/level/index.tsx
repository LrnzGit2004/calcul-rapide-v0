import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";


export default function LevelSelect() {
    const router = useRouter();
    return (
        <View style={lvlStyles.container}>
        <Text style={lvlStyles.title}>Choisis ton niveau</Text>
    <View style={lvlStyles.row}>
    <TouchableOpacity style={[lvlStyles.card, { backgroundColor: COLORS.primary }]} onPress={() => router.push({ pathname: "/operation", params: { level: "CM1" } })}>
    <Text style={lvlStyles.cardText}>CM1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[lvlStyles.card, { backgroundColor: COLORS.green }]} onPress={() => router.push({ pathname: "/operation", params: { level: "CM2" } })}>
    <Text style={lvlStyles.cardText}>CM2</Text>
        </TouchableOpacity>
        </View>
        </View>
);
}


const lvlStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bg, alignItems: "center", justifyContent: "center" },
    title: { fontFamily: "BalooBold", fontSize: 44, color: COLORS.text, marginBottom: 24 },
    row: { flexDirection: "row", gap: 20 },
    card: { padding: 36, borderRadius: 20, width: 280, alignItems: "center" },
    cardText: { fontFamily: "BalooBold", color: "white", fontSize: 34 }
});