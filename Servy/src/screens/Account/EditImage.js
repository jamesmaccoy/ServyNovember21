import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UploadProfileImage } from "../../store/actions/Account";
import { connect } from "react-redux";
import { Button } from "native-base";
const EditImage = ({ UploadProfileImage }) => {
  const [image, setImage] = useState(null);
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
  const [bool, setBool] = useState(false);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setBool(true);
      setImage(result.uri);
    }
  };
  const uploadImage = () => {
    UploadProfileImage(image);
  };
  useEffect(() => {
    setBool(false);
  }, []);

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <View style={{ height: 500 }}>
        {bool && (
          <Button
            full
            success
            onPress={uploadImage}
            style={{
              color: "#fff",
              backgroundColor: "#5c9b84",
            }}
          >
            <Text style={{ color: "#fff" }}>upload image</Text>
          </Button>
        )}
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 50,
          }}
        ></View>
        <View>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, borderRadius: 200 }}
            />
          ) : (
            <Image
              style={{ width: 200, height: 200, borderRadius: 200 }}
              source={require("../../../assets/images/user1.jpeg")}
            />
          )}
        </View>
      </View>
      <Button
        full
        style={{
          color: "#fff",
          backgroundColor: "#5c9b84",
        }}
        onPress={pickImage}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>Select Image</Text>
      </Button>
    </View>
  );
};

export default connect("", { UploadProfileImage })(EditImage);
