import React from "react";
import VoiceList from "../../components/voicelist";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import styles from "./styles";

export default function Home() {
	return (
		<View style={styles.container}>
			<VoiceList />
			<StatusBar style="auto" />
		</View>
	);
}
