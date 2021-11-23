import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  ImageBackground,
  Switch,
  Linking,
  TouchableOpacity,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { styles } from "../../styles/User/UserHeaderStyle";
import { connect } from "react-redux";
import {
  profileInformation,
  userStatus,
  switchLoader,
} from "../../store/actions/User";
import imagebg from "../../../assets/images/hamburger_BG.jpg";
import { Logout } from "../../store/actions/Auth";

const Drawer = ({
  navigation,
  profileInfo,
  modalVisible,
  setModalVisible,
  userStatus,
  checkVisible,
  switchLoader,
  Logout,
}) => {
  const signOutUser = () => {
    Logout();
  };
  const [state, setState] = useState({
    update: false,
    photo: "",
    switchValue: checkVisible,
  });
  useEffect(() => {
    profileInfo.map((data) => {
      setEmail(data.Email);
      if (data.photoURL !== "") {
        setState({ ...state, update: true, photo: data.photoURL });
      }
    });
  }, []);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    profileInfo.map((data) => {
      setEmail(data.Email);
      if (data.photoURL !== "") {
        setState({
          ...state,
          update: true,
          photo: data.photoURL,
        });
      }
      if (data.Name !== "") {
        setUserName(data.Name);
      } else if (data.firstName !== "") {
        setUserName(data.firstName);
      }
    });
  }, [profileInfo]);
  const accountpage = () => {
    navigation.dangerouslyGetParent().navigate("MyAccount");
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    userStatus(state.switchValue);
  }, [state.switchValue]);

  return (
    <>
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ImageBackground source={imagebg} style={styles.imagebg}>
                <Text style={styles.modalText}>{userName}</Text>
                <Text style={styles.modalTextsub}>{email} </Text>
              </ImageBackground>
              <TouchableHighlight
                style={{ ...styles.openButton }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Ionicons style={styles.closeic} name={"ios-close"} size={60} />
              </TouchableHighlight>
              <View style={styles.listnavwrapper}>
                <TouchableOpacity style={styles.listnav}>
                 <MaterialCommunityIcons name="hand-left"  style={styles.navicon} size={30} />
                  <Text style={styles.navicontxt}>Services</Text>
                </TouchableOpacity>

                <View style={styles.containerswitch}>
                  <TouchableOpacity
                    style={
                      state.switchValue === true
                        ? styles.containerswitchinrAct
                        : styles.containerswitchinr
                    }
                  >
                    <MaterialCommunityIcons
                      style={
                        state.switchValue === true
                          ? styles.swichiconAct
                          : styles.swichicon
                      }
                      name="pencil"
                      size={22}
                    />
                    <Text
                      style={
                        state.switchValue === true
                          ? styles.textStyleAct
                          : styles.textStyle
                      }
                    >
                      Guest
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      state.switchValue
                        ? styles.containerswitchinr
                        : styles.containerswitchinrAct
                    }
                  >
                    <MaterialIcons
                      style={
                        state.switchValue === true
                          ? styles.swichicon
                          : styles.swichiconAct
                      }
                      name="build"
                      size={22}
                    />
                    <Text
                      style={
                        state.switchValue === true
                          ? styles.textStyle
                          : styles.textStyleAct
                      }
                    >
                      Provider
                    </Text>
                  </TouchableOpacity>
                  <Switch
                    value={state.switchValue}
                    opacity={0}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: 100,
                      width: 200,
                    }}
                    onValueChange={(switchValue) => {
                      // console.log("dsfdf");
                      switchLoader(true);
                      setModalVisible(!modalVisible);
                      setState({ ...state, switchValue });
                    }}
                  />
                </View>

                <TouchableOpacity style={styles.listnav} onPress={accountpage}>
                  <FontAwesome
                    style={styles.navicon}
                    name="user-circle"
                    size={25}
                  />
                  <Text style={styles.navicontxt}>
                    My Account {"\n"}
                    <Text style={styles.naviconsubtxt}>Your profile </Text>
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listnav}>
                  <MaterialCommunityIcons
                    style={styles.navicon}
                    name="credit-card-outline"
                    size={30}
                  />
                  <Text style={styles.navicontxt}>
                    Billing {"\n"}
                    <Text style={styles.naviconsubtxt}>Your profile </Text>{" "}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={signOutUser} style={styles.listnav}>
                  <MaterialCommunityIcons
                    style={styles.navicon}
                    name="key"
                    size={30}
                  />
                  <Text style={styles.navicontxt}>Log Out </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.copyrights}>
                <Text style={styles.rightstxt}> ©2020 Servey </Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text
                    style={styles.rightstxt}
                    onPress={() =>
                      Linking.openURL("http://servy.co.za/terms-of-use/")
                    }
                  >
                    {" "}
                    Term & Conditions.{" "}
                  </Text>

                  <Text
                    style={styles.rightstxt}
                    onPress={() =>
                      Linking.openURL("http://servy.co.za/privacy-policy/")
                    }
                  >
                    Privacy policy
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    profileInfo: state.profile.profileInformation,
    checkVisible: state.User.status,
  };
};
export default connect(mapStateToProps, {
  profileInformation,
  userStatus,
  switchLoader,
  Logout,
})(Drawer);
