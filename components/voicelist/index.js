import React from "react";
import { View } from "react-native";
import styles from "./styles";
import VoiceItem from "../voiceitem";

export default function VoiceList({ items }) {
	return (
		<View style={styles.voicelist}>
			{items.map((item, i) => (
				<VoiceItem item={item} key={i} />
			))}
		</View>
	);
}
