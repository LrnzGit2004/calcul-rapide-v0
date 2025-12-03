import React from "react";
import { Text } from "react-native";


export const BalooTitle = ({ children, style }: any) => (
    <Text style={[{ fontFamily: "BalooBold", fontSize: 48 }, style]}>{children}</Text>
);


export const OutfitText = ({ children, style }: any) => (
    <Text style={[{ fontFamily: "Outfit", fontSize: 16 }, style]}>{children}</Text>
);