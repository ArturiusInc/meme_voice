import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import styles from "./styles";
import VoiceItem from "../voiceitem";
import { Audio } from "expo-av";

export default function VoiceList({ items }) {
	const [sound, setSound] = useState();
	async function playSound(urii) {
		try {
			const { sound } = await Audio.Sound.createAsync({ uri: urii }, { shouldPlay: true });
			setSound(sound);
			await sound.playAsync();
		} catch (error) {
			console.log("error:", error);
		}
	}
	return (
		<ScrollView style={{ width: "100%" }}>
			<View style={styles.voicelist}>
				{items.map((item, i) => (
					<VoiceItem item={item} sound={sound} playsound={playSound} key={i} />
				))}
			</View>
		</ScrollView>
	);
}
