import React, { useEffect, useState } from "react";
import { Button, Image, TouchableOpacity, ImageBackground, Text, View } from "react-native";
import { Audio } from "expo-av";
import { styles } from "./styles";

export default function VoiceItem({ item }) {
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

	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);
	return (
		<TouchableOpacity
			onPress={() => {
				playSound(item.sound);
			}}
		>
			<ImageBackground
				style={{
					height: 150,
					width: 150,
				}}
				source={{ uri: item.img }}
			/>
			<Text>{item.name}</Text>
		</TouchableOpacity>
	);
}
