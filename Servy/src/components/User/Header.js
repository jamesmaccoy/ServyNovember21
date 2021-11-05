import React, { useEffect, useState } from "react";
import { Text, Image, View, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Drawer from "./Drawer";
import { connect } from "react-redux";
import {
  profileInformation,
  userNotifications,
} from "../../store/actions/User";
import { styles } from "../../styles/User/UserHeaderStyle";
const Header = ({ ...props }) => {
  let navigation = props.navigation;
  let profileInfo = props.profileInfo;
  let checkVisible = props.checkVisible;
  let filterButton = props.filterButton;
  let notificationButton = props.notificationButton;
  let notifications = props.notifications;
  let userNotifications = props.userNotifications;

  const [state, setState] = useState({
    update: false,
    photo: "",
    switchValue: false,
  });
  const [userName, setUserName] = useState("");
  const [check, setCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    userNotifications();
  }, []);

  useEffect(() => {
    profileInfo.map((data) => {
      if (data.photoURL !== "") {
        setState({
          ...state,
          update: true,
          photo: data.photoURL,
        });
      }
      if (data.firstName === "") {
        setUserName(data.Name);
      }
      if (data.firstName !== "") {
        setUserName(data.firstName);
      }
    });
  }, [profileInfo]);

  useEffect(() => {
    setCheck(checkVisible);
  }, [checkVisible]);

  const navigationHanlder = () => {
    navigation.navigate("AddService", {
      key: 2,
    });
  };

  const handleNotification = () => {
    navigation.navigate("Notification", {navigation: navigation});
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.usernamedetail}>
          <View style={styles.userNameDetails}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              {state.update === true ? (
                <Image style={styles.image} source={{ uri: state.photo }} />
              ) : (
                <Image
                  style={styles.image}
                  source={require("../../../assets/images/user1.jpeg")}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.text}>
              Welcome Back{"\n"} {userName}
            </Text>
          </View>
          <View style={styles.icons}>
            {filterButton !== true && check && (
              <Entypo
                onPress={navigationHanlder}
                name="plus"
                size={25}
                color={"#000"}
                style={{ paddingRight: 12 }}
              />
            )}
            {notificationButton && (
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                }}
                onPress={handleNotification}
              >
                {notifications.length !== 0 && (
                  <Text
                    style={{
                      backgroundColor: "#e84b19",
                      position: "absolute",
                      left: -8,
                      top: -10,
                      width: 20,
                      textAlign: "center",
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      color: "#fff",
                      zIndex: 1,
                    }}
                  >
                    {notifications.length}
                  </Text>
                )}
                <Ionicons name={"ios-notifications"} size={25} color={"#000"} />
              </TouchableOpacity>
            )}
          </View>
          {filterButton && (
            <MaterialCommunityIcons
              onPress={props.handleFilter}
              style={{ fontSize: 25 }}
              name="filter-variant"
            />
          )}
        </View>
      </View>
      <Drawer
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    profileInfo: state.profile.profileInformation,
    checkVisible: state.User.status,
    notifications: state.User.notifications,
  };
};
export default connect(mapStateToProps, {
  profileInformation,
  userNotifications,
})(Header);
