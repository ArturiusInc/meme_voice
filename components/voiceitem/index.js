import React, { useEffect } from "react";
import { TouchableOpacity, ImageBackground, Text } from "react-native";
import { styles } from "./styles";

export default function VoiceItem({ item, sound, playsound }) {
	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);
	return (
		<TouchableOpacity
			style={styles.item}
			onPress={() => {
				playsound(item.sound);
			}}
		>
			<ImageBackground
				style={styles.image}
				imageStyle={{ borderRadius: 7 }}
				source={{ uri: item.img }}
				resizeMethod={"auto"}
			/>
			<Text style={styles.text}>{item.name}</Text>
		</TouchableOpacity>
	);
}
