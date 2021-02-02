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

	const addData = async (storeData) => {
		try {
			//const jsonValue = JSON.stringify(value);
			let newData = JSON.parse(storeData);
			newData = newData.item_list.push(file.uri);
			newData = JSON.stringify(newData);
			console.log("newData:", newData);
			await AsyncStorage.setItem("item_list", newData);
			//navigation.navigate("HomeScreen");
			console.log(3);
			navigation.navigate("Home");
			console.log(4);
		} catch (e) {
			// saving error
		}
	};
	const getData = async () => {
		try {
			await AsyncStorage.removeItem("item_list");
			const jsonValue = await AsyncStorage.getItem("item_list");
			console.log("jsonValue:", jsonValue);
			if (jsonValue != null) {
				console.log(1);
				addData(jsonValue);
			} else {
				const nullData = '{"item_list":[]}';
				console.log(2);
				addData(nullData);
			}
		} catch (e) {
			// error reading value
		}
	};

	return (
		<View style={styles.container}>
			<Button onPress={pickDocument} title="Выбрать медаи файл"></Button>
			<Button onPress={getData} title="Сохранить" />
			<StatusBar style="auto" />
		</View>
	);
}
