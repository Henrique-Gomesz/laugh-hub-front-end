import { Text, View, StyleSheet, Button } from "react-native";
global.Buffer = require("buffer").Buffer;
import { Audio } from "expo-av";
import { useState } from "react";
import React from "react";
import { Sound } from "expo-av/build/Audio";
import { storage } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  list,
} from "firebase/storage";
import axios from "axios";
import ScreenBase from "./src/screen-base/ScreenBase";
interface AudioList {
  name: string;
  url: string;
}

export default function App() {
  const [sound, setSound] = useState<Sound>();
  const audiosList: AudioList[] = [];

  const fetchAudio = async () => {
    const response = await axios(
      "https://firebasestorage.googleapis.com/v0/b/laugh-hub-102b1.appspot.com/o/audios%2Ftest.mp3?alt=media&token=d930ff0a-38cd-47c9-82c7-e85198fa8985",
      {
        responseType: "arraybuffer",
      }
    );
    const buffer = Buffer.from(response.data, "binary");
    console.log(buffer);

    const audio = new Audio.Sound();
  };

  async function storeAudio() {
    console.log("Loading Sound");

    const { sound } = await Audio.Sound.createAsync(
      {
        uri: "https://firebasestorage.googleapis.com/v0/b/laugh-hub-102b1.appspot.com/o/audios%2Ftest.mp3?alt=media&token=d930ff0a-38cd-47c9-82c7-e85198fa8985",
      },
      { shouldPlay: false }
    );
    console.log(sound);
    try {
      await AsyncStorage.setItem("nintendo", JSON.stringify(sound));
    } catch (error) {
      console.log(error);
    }

    try {
      const song = await AsyncStorage.getItem("nintendo");
      if (song) {
      }
    } catch (error) {
      console.log(error);
    }
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
    /*     <View style={styles.container}>
      <Button title="Play Sound" onPress={storeAudio} />
    </View> */
    <ScreenBase hasBack={true} hasMenu={true}></ScreenBase>
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
