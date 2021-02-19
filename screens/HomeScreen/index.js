import React, { useState, useEffect } from "react";
import VoiceList from "../../components/voicelist";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import starterKit from "../../api/starter-kit.json";
import { downloadStarter } from "../../api/download";

export default function Home() {
	const [items, setItems] = useState([]);
	// проверяем есть ли запись о первом запуске в сторедж
	// загружаем список
	useEffect(() => {
		const getFirstStorage = async () => {
			try {
				await AsyncStorage.removeItem("first_start");
				await AsyncStorage.removeItem("items");
				await AsyncStorage.getItem("first_start");
				const firstStart = await AsyncStorage.getItem("first_start");
				if (firstStart === null) {
					await AsyncStorage.setItem("firstStart", "true");
					const cachList = await downloadStarter(starterKit);
					console.log("cachList:", cachList);
					const starterKitCatched = starterKit.map((item, i) => ({
						sound: cachList[i].sound,
						img: cachList[i].img,
						name: item.name,
						link: item.link,
					}));
					console.log(starterKitCatched);
					await AsyncStorage.setItem("items", JSON.stringify(starterKitCatched));
					setItems(starterKitCatched);
					return;
				}
				const storageItems = await AsyncStorage.getItem("items");
				setItems(JSON.parse(storageItems));
			} catch (error) {
				console.log("error:", error);
			}
		};
		getFirstStorage();
	}, []);

	return (
		<View style={styles.container}>
			<VoiceList items={items} />
			<StatusBar style="auto" />
		</View>
	);
}
