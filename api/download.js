import * as FileSystem from "expo-file-system";
import shorthash from "shorthash";

export const downloadStarter = async (starterKit) => {
	const download = async (uri) => {
		const name = shorthash.unique(uri);
		const path = `${FileSystem.cacheDirectory}${name}`;
		const file = await FileSystem.downloadAsync(uri, path);
		return file.uri;
	};

	const starterKitFilesCatched = [];
	for await (let element of starterKit) {
		const uriImg = await download(element.img);
		const uriSound = await download(element.sound);
		starterKitFilesCatched.push({ sound: uriSound, img: uriImg });
	}
	return starterKitFilesCatched;
};
