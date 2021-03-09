import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

export default function AddNew({ navigation }) {
  const Types = {
    audio: 'audio/*',
    image: 'image/*',
  };
  const [sound, setSound] = useState(null);
  const [img, setImg] = useState(null);
  const [memeName, setMemeName] = useState('');
  const [linkOriginal, setLinkOriginal] = useState('');

  const pickFile = async (type) => {
    try {
      let result = await DocumentPicker.getDocumentAsync({ type: type });
      if (result.type === 'success') {
        if (type === Types.audio) {
          setSound(result.uri);
        } else {
          setImg(result.uri);
        }
      }
    } catch (error) {
      console.log('AddNew pickFile: ', JSON.stringify(error));
    }
  };

  const addDataStorage = async (storeData) => {
    try {
      let newData = storeData;
      const memObject = { sound, img, name: memeName, link: linkOriginal };
      newData.push(memObject);
      await AsyncStorage.setItem('@items', JSON.stringify(newData));
      navigation.navigate('Meme voice');
    } catch (error) {
      console.log('AddNew addDataStorage', error);
    }
  };

  const getDataStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@items');
      if (jsonValue != null) {
        const arrjson = JSON.parse(jsonValue);
        addDataStorage([...arrjson]);
      } else {
        addDataStorage([]);
      }
    } catch (e) {
      console.log('e2:', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.file}>
        <Button
          onPress={() => pickFile(Types.audio)}
          title="Выбрать медаи файл"
        />
        <Text style={styles.selectfiletext}>
          {sound ? sound : 'не выбрано'}
        </Text>
      </View>
      <View style={styles.file}>
        <Button onPress={() => pickFile(Types.image)} title="Выбрать иконку" />
        {img ? <Image source={{ uri: img }} style={styles.icon} /> : null}
        <Text style={styles.selectfiletext}>{img ? img : 'не выбрано'}</Text>
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
    </View>
  );
}
