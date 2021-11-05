import React, { useState, useEffect } from "react";
import { Text, View, Image, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../styles/User/AddServiceStyle";
import { Entypo } from "@expo/vector-icons";
const getImage = ({
  images,
  imgInitial,
  pickImages,
  setPickImages,
}) => {
  const [imageState, setImageState] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  useEffect(() => {
    setImageState(true);
    setPickImages(images);
  }, [imgInitial]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 5],
      multiple: true,
    });
    if (!result.cancelled) {
      setImageState(false);
      pickImages.push(result.uri);
      setImageState(true);
    }
  };
  const handleRemoveImage = async (index) => {
    setImageState(false);
    setPickImages(
      pickImages.filter((x, i) => {
        return i !== index;
      })
    );
    setImageState(true);
  };

  return (
    <>
      <View style={{ justifyContent: "center", flexDirection: "row" }}>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <TouchableOpacity style={styles.image} onPress={pickImage}>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                color: "#a9a9a9",
                paddingTop: 10,
              }}
            >
              Select Image
            </Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
      <View style={{ paddingTop: 20, flexDirection: "row", flexWrap: "wrap" }}>
        {imageState &&
          pickImages.map((url, index) => {
            return (
              <ImageBackground
                source={{ uri: url }}
                style={{
                  width: 150,
                  height: 150,
                  marginLeft: 5,
                  marginBottom: 5,
                }}
                key={index}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleRemoveImage(index)}
                  >
                    <Entypo color="#fff" size={30} name="circle-with-cross" />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            );
          })}
      </View>
    </>
  );
};

export default getImage;
