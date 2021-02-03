import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";
/*
Object {
  "type": "cancel",
}
Object {
  "name": "Сергей Бодров - Родина (Tribute Mix) (vevioz.com).mp3",
  "size": 5733074,
  "type": "success",
  "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fmeme_voice-f7395932-c0b9-4f35-92ff-ca98d9093d9a/DocumentPicker/3a21bf3f-2264-4941-976d-d7f7c3ea4a78.mp3",
}
*/
export default function AddNew({ navigation }) {
	const [file, setFile] = useState(null);

	const pickDocument = async () => {
		let result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
		if (result.type === "success") {
			setFile(result);
		}
	};

	const addDataStorage = async (storeData) => {
		try {
			let newData = JSON.parse(storeData);
			newData.item_list.push(file.uri);
			newData = JSON.stringify(newData);
			await AsyncStorage.setItem("item_list", newData);
			navigation.navigate("Home");
		} catch (e) {
			// saving error
		}
	};
	const getDataStorage = async () => {
		try {
			await AsyncStorage.removeItem("item_list");
			const jsonValue = await AsyncStorage.getItem("item_list");
			if (jsonValue != null) {
				addData(jsonValue);
			} else {
				const nullData = '{"item_list":[]}';
				addDataStorage(nullData);
			}
		} catch (e) {
			// error reading value
		}
	};

	return (
		<View style={styles.container}>
			<Button onPress={pickDocument} title="Выбрать медаи файл"></Button>
			<Button onPress={getDataStorage} title="Сохранить" />
			<StatusBar style="auto" />
		</View>
	);
}
