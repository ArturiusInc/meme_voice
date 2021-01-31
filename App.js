import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/header";
import VoiceList from "./components/voicelist";

export default function App() {
	return (
		<View style={styles.container}>
			<Header></Header>
			<VoiceList></VoiceList>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingHorizontal: 10,
	},
});
