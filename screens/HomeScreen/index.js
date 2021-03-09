import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import starterKit from '../../api/starter-kit.json';
import VoiceList from '../../components/voicelist';
import { downloadStarter } from '../../api/download';

export default function Home({ navigation }) {
  const [items, setItems] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const storageItems = await AsyncStorage.getItem('@items');
      setItems(storageItems);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const getFirstStorage = async () => {
      try {
        const firstStart = await AsyncStorage.getItem('@first_start');
        if (firstStart === null) {
          console.log('загрузка с сервера');
          const cachList = await downloadStarter(starterKit);
          const starterKitCatched = starterKit.map((item, i) => ({
            sound: cachList[i].sound,
            img: cachList[i].img,
            name: item.name,
            link: item.link,
          }));
          await AsyncStorage.setItem('@first_start', 'true');
          await AsyncStorage.setItem(
            '@items',
            JSON.stringify(starterKitCatched),
          );
          setItems(starterKitCatched);
          setSpinner(false);
          return;
        }
        console.log('загрузка из кеша');
        const storageItems = await AsyncStorage.getItem('@items');
        setItems(JSON.parse(storageItems));
        setSpinner(false);
      } catch (error) {
        console.log('error:', error);
      }
    };
    getFirstStorage();
  }, []);

  return (
    <View style={styles.container}>
      {spinner ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <VoiceList items={items} />
      )}
    </View>
  );
}
