import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';

export const downloadStarter = async (starterKit) => {
  const serverRoot = 'http://b7cbe317a2a8.ngrok.io';

  const download = async (uri) => {
    const name = shorthash.unique(uri);
    const path = `${FileSystem.documentDirectory}${name}`;
    const file = await FileSystem.downloadAsync(uri, path);
    return file.uri;
  };

  const starterKitFilesCatched = [];
  for await (let element of starterKit) {
    const uriImg = await download(`${serverRoot}/${element.img}`);
    const uriSound = await download(`${serverRoot}/${element.sound}`);
    starterKitFilesCatched.push({ sound: uriSound, img: uriImg });
  }
  return starterKitFilesCatched;
};
