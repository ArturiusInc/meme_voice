import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import VoiceList from "../../components/voicelist";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import starterKit from "../../api/starter-kit.json";
import { downloadStarter } from "../../api/download";

export default function Home({ route, navigation }) {
	const [items, setItems] = useState([]);
	const [spinner, setSpinner] = useState(true);
	// добавляем итем со скрина addnew
	useEffect(() => {
		if (route.params?.item) {
			setItems([...items, route.params?.item]);
		}
	}, [route.params?.item]);
	// проверяем есть ли запись о первом запуске в сторедж
	// загружаем список
	useEffect(() => {
		const getFirstStorage = async () => {
			try {
				// for develop
				//await AsyncStorage.removeItem("first_start");
				//await AsyncStorage.removeItem("items");

				const firstStart = await AsyncStorage.getItem("first_start");
				if (firstStart === null) {
					// загрузка с сервера
					console.log("загрузка с сервера");
					const cachList = await downloadStarter(starterKit);
					const starterKitCatched = starterKit.map((item, i) => ({
						sound: cachList[i].sound,
						img: cachList[i].img,
						name: item.name,
						link: item.link,
					}));
					await AsyncStorage.setItem("first_start", "true");
					await AsyncStorage.setItem("items", JSON.stringify(starterKitCatched));
					setItems(starterKitCatched);
					setSpinner(false);
					return;
				}
				// загрузка из кеша
				console.log("загрузка из кеша");
				const storageItems = await AsyncStorage.getItem("items");
				setItems(JSON.parse(storageItems));
				setSpinner(false);
			} catch (error) {
				console.log("error:", error);
			}
		};
		getFirstStorage();
	}, []);

	return (
		<View style={styles.container}>
			{spinner ? <ActivityIndicator size="large" color="#00ff00" /> : <VoiceList items={items} />}
			<StatusBar style="auto" />
		</View>
	);
}
