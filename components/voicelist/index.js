import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import VoiceItem from '../voiceitem';
import { Audio } from 'expo-av';

export default function VoiceList({ items }) {
  const [soundState, setSoundState] = useState();
  async function playSound(uri) {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: uri },
        { shouldPlay: true },
      );
      await sound.playAsync();
      setSoundState(sound);
    } catch (error) {
      console.log('VoiceList error:', error);
    }
  }
  return (
    <ScrollView style={styles.w100}>
      <View style={styles.voicelist}>
        {items && items.length
          ? items.map((item, i) => (
              <VoiceItem
                item={item}
                sound={soundState}
                playsound={playSound}
                key={item.sound + item.name}
              />
            ))
          : null}
      </View>
    </ScrollView>
  );
}
