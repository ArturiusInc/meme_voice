import React, { useState } from "react";
import { View, Text, Button, TextInput, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

export default function AddNew({ navigation }) {
	const [file, setFile] = useState(null);
	const [fileImg, setFileImg] = useState(null);
	const [memeName, setMemeName] = useState("");
	const [linkOriginal, setLinkOriginal] = useState("");

	const pickAudio = async () => {
		let result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
		if (result.type === "success") {
			setFile(result);
		}
	};

	const pickImg = async () => {
		let result = await DocumentPicker.getDocumentAsync({ type: "image/*" });
		if (result.type === "success") {
			setFileImg(result);
		}
	};

	const addDataStorage = async (storeData) => {
		try {
			let newData = JSON.parse(storeData);
			const memObject = {
				sound: file.uri,
				img: fileImg.uri,
				name: memeName,
				link: linkOriginal,
			};
			newData.push(memObject);
			newData = JSON.stringify(memObject);
			await AsyncStorage.setItem("items", newData);
			navigation.navigate("Home", { screen: "Home", params: { item: memObject } });
		} catch (e) {
			console.log("e1:", e);
		}
	};

	const getDataStorage = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("items");
			if (jsonValue != null) {
				addDataStorage(jsonValue);
			} else {
				const nullData = "[]";
				addDataStorage(nullData);
			}
		} catch (e) {
			console.log("e2:", e);
			// error reading value
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.file}>
				<Button onPress={pickAudio} title="Выбрать медаи файл" />
				<Text style={styles.selectfiletext}>{file ? file.name : "не выбрано"}</Text>
			</View>
			<View style={styles.file}>
				<Button onPress={pickImg} title="Выбрать иконку" />
				{fileImg ? <Image source={{ uri: fileImg.uri }} style={styles.icon} /> : null}
				<Text style={styles.selectfiletext}>{fileImg ? fileImg.name : "не выбрано"}</Text>
			</View>
			<TextInput
				style={styles.memename}
				value={memeName}
				onChangeText={(text) => setMemeName(text)}
				placeholder="Название мема"
			/>
			<TextInput
				style={styles.memename}
				value={linkOriginal}
				onChangeText={(text) => setLinkOriginal(text)}
				placeholder="Ссылка на оригинал"
			/>
			<Button onPress={getDataStorage} title="Сохранить" />
			<StatusBar style="auto" />
		</View>
	);
}
