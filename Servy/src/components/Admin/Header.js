import React, { useState, useEffect } from "react";
import { Text, Image, View } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../styles/Admin/headerStyle";
import { connect } from "react-redux";

const Header = ({ name, navigation, visible, profileInfo }) => {
  const [state, setState] = useState({
    update: false,
    photo: "",
  });
  useEffect(() => {
    profileInfo.map((data) => {
      setState({ ...state, update: true, photo: data.photoURL });
    });
  }, [profileInfo]);
  const openSideMenu = () => {
    navigation.openDrawer();
  };
  const handleCategory = () => {
    navigation.navigate("AddCategory", {
      data: null,
      key: 1,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.usernamedetail}>
        <View style={styles.userNameDetails}>
          <TouchableOpacity>
            {state.photo !== "" ? (
              <Image style={styles.image} source={{ uri: state.photo }} />
            ) : (
              <Image
                style={styles.image}
                source={require("../../../assets/images/user1.jpeg")}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.icons}>
          {visible && (
            <Feather
              style={{ paddingRight: 20 }}
              name={"plus"}
              size={25}
              color={"#000"}
              onPress={handleCategory}
            />
          )}

          <MaterialCommunityIcons
            onPress={openSideMenu}
            name={"hamburger"}
            size={25}
            color={"#000"}
          />
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    profileInfo: state.profile.profileInformation,
  };
};
export default connect(mapStateToProps)(Header);
