import React, { useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native";
import { Audio } from "expo-av";
import { styles } from "./styles";

export default function VoiceItem({ item }) {
	const [sound, setSound] = useState();
	async function playSound(uri) {
		const { sound } = await Audio.Sound.createAsync({ uri: uri }, { shouldPlay: true });
		setSound(sound);
		await sound.playAsync();
	}

	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);
	return (
		<>
			<Image
				style={styles.stretch}
				source={{
					uri: item.img,
				}}
				onPress={() => {
					playSound(item.sound);
				}}
			/>
			<Button title={item.name} />
		</>
	);
}
