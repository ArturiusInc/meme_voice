import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Header() {
	return (
		<View style={styles.header}>
			<Text style={styles.logo}>Meme voice</Text>
			<TouchableOpacity onPress={() => alert("menu open")}>
				<FontAwesome5 name="bars" size={24} color="#161924" />
			</TouchableOpacity>
		</View>
	);
}
