import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import { useState } from "react";
import React from "react";
import { Sound } from "expo-av/build/Audio";
import { storage } from "./firebaseConfig";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  list,
} from "firebase/storage";
import axios from "axios";
interface AudioList {
  name: string;
  url: string;
}

export default function App() {
  const [sound, setSound] = useState<Sound>();
  const audiosList: AudioList[] = [];

  const fetchAudio = async () => {
    const audio = await axios({
      url: "https://firebasestorage.googleapis.com/v0/b/laugh-hub-102b1.appspot.com/o/audios%2Ftest.mp3?alt=media&token=d930ff0a-38cd-47c9-82c7-e85198fa8985",
      method: "GET",
      responseType: "blob",
    });

    console.log(audio.data);
  };

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/test.mp3")
    );
    const audio = require("./assets/test.mp3");
    setSound(sound);
    console.log(sound);
    console.log("Playing Sound");
    await sound.playAsync();
    await sound.stopAsync();
  }

  async function dowloadFile() {
    const audioFolder = ref(storage, "audios");
    console.log(audioFolder, "<<< audio foledr");
    const audioList = await listAll(audioFolder);
    console.log(audioList.items, "<<< items ");

    audioList.items.forEach(async (item) => {
      const audioUrl = await getDownloadURL(item);
      console.log(audioUrl, "<<<<audio URL");
      audiosList.push({
        name: item.name,
        url: audioUrl,
      });
    });
  }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={fetchAudio} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});
