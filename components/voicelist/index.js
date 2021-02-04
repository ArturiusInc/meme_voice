import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { Audio } from "expo-av";

export default function VoiceList() {
	const [memObject, setmemObject] = useState([]);
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

	useEffect(() => {
		getDataStorage();
	}, []);

	const getDataStorage = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("item_list");
			if (jsonValue != null) {
				setmemObject(JSON.parse(jsonValue));
			}
		} catch (e) {
			/*error reading value*/
		}
	};

	return (
		<View style={styles.voicelist}>
			{memObject.map((item) => (
				<Button key={item.sound.uri} title={`${item.name}`} onPress={() => playSound(item.sound.uri)} />
			))}
		</View>
	);
}
