import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

type SelectedImage = {
  localUrl: string;
};

export default function App() {
  let [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted == false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUrl: pickerResult.uri });
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUrl }}
          style={styles.thumbnail}
        />
        <Text style={styles.insturctions}>
          To share a photo from your phone with a friend, just press the button
          below!
        </Text>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.imgur.com/TkIrScD.png" }}
        style={styles.logo}
      />
      <Text style={styles.insturctions}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10
  },
  insturctions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    color: "#fff"
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
