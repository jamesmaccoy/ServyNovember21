import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Button, View } from "native-base";
import { connect } from "react-redux";
import { signInWithGoogle } from "../../store/actions/Auth";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const StartScreen = ({ navigation, signInWithGoogle }) => {
  const handleSignInWithGoogle = (event) => {
    event && event.preventDefault && event.preventDefault();
    signInWithGoogle();
  };
  const handleNavigation = () => {
    navigation.navigate("login");
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../../../assets/images/StartScreenBg.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <View style={styles.centerContentStyle}>
            <Image
              source={require("../../../assets/images/LogoWithText.png")}
              resizeMode="contain"
              style={styles.logoonscreen}
            />
            <Text style={styles.TextStyle}>Home & personal services.</Text>
            <Text style={styles.TextStyle}>instantly available to you.</Text>

            <Button
              onPress={handleSignInWithGoogle}
              full
              style={styles.googleBtn}
            >
              <AntDesign
                name="google"
                size={35}
                color={"#fff"}
                style={styles.socialIcon}
              />
              <Text style={styles.socialBtnText}>Sign in with Google</Text>
            </Button>

            <Button onPress={handleNavigation} full style={styles.emailbtn}>
              <FontAwesome
                name="envelope"
                size={35}
                color={"#fff"}
                style={styles.socialIcon}
              />
              <Text style={styles.socialBtnText}>Sign in with Email</Text>
            </Button>

            <View style={styles.termsandcondition}>
              <Text style={styles.rightstxt}>
                By creating an account you agree to our
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={styles.rightstxt}
                  onPress={() =>
                    Linking.openURL("http://servy.co.za/terms-of-use/")
                  }
                >
                  Term & Conditions.
                </Text>
                <Text style={styles.rightstxt}>and</Text>
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
      </ImageBackground>
    </ScrollView>
  );
};

export default connect("", {
  signInWithGoogle,
})(StartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logoonscreen: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 0,
    marginBottom: 0,
    height: 150,
    marginBottom: 15,
  },

  TextStyle: { color: "#efefef", fontSize: 20, textAlign: "center" },
  imtxc: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    width: 90,
    height: 90,
  },
  rightstxt: { textAlign: "center", color: "#ccc", fontSize: 16 },
  loginsizetxt: {
    fontSize: 18,
    textAlign: "center",
  },
  centerContentStyle: { padding: 12, marginTop: 170 },
  termsandcondition: { marginTop: 60 },
  usernamedetail: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  usernamedetailn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  otcontain: {
    padding: 10,
    marginTop: 20,
  },
  scriconsscroll: {
    display: "flex",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    overflow: "scroll",
  },
  form: {
    marginTop: 10,
  },
  googleBtn: {
    backgroundColor: "#5dae7e",
    marginTop: 40,
    position: "relative",
    paddingLeft: 20,
    borderRadius: 5,
    height: 70,
  },

  emailbtn: {
    backgroundColor: "transparent",
    marginTop: 20,
    position: "relative",
    paddingLeft: 20,
    borderRadius: 5,
    height: 70,
    borderWidth: 2,
    borderColor: "#fff",
  },

  facebookBtn: {
    backgroundColor: "#3a5592",
    marginTop: 20,
    justifyContent: "flex-start",
    paddingLeft: 20,
  },
  buttons: { color: "#fff", marginTop: 20 },
  inputtexts: { paddingBottom: 10 },
  textinfob: { color: "#666", marginTop: 50, textAlign: "center" },
  signuplink: { textAlign: "center", color: "#60ad7f" },
  buttonstxt: { color: "#fff" },
  socialBtnText: { color: "#fff", textAlign: "center", fontSize: 18 },
  socialIcon: {
    position: "absolute",
    left: 20,
  },
});
