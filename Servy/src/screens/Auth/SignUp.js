import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  View,
} from "native-base";
import { onSignUp, removeErrorMessage } from "../../store/actions/Auth";
import { connect } from "react-redux";
const SignUp = (props) => {
  let onSignUp = props.onSignUp;
  let signUpState = props.signUpState;
  let signUpFailMessage = props.signUpFailMessage;
  let removeErrorMessage = props.removeErrorMessage;
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(true);
  const [message, setMessage] = useState({
    description: "",
    status: false,
    color: false,
  });
  const [userInfo, setUserInfo] = useState({
    Name: "",
    Email: "",
    password1: "",
    password2: "",
    phoneNumber: "",
  });
  const [signUpError, setSignUpError] = useState(false);
  useEffect(() => {
    removeErrorMessage();
    setError(false);
    setSignUpError(false);
  }, []);
  useEffect(() => {
    if (signUpFailMessage !== "") {
      setSignUpError(true);
    }
  }, [signUpFailMessage]);

  const handleSignUp = (event) => {
    event && event.preventDefault && event.preventDefault();
    if (userInfo.password1 === userInfo.password2 && emailError === false) {
      onSignUp(userInfo);
    } else {
      setError(true);
    }
  };
  const handleEmail = (text) => {
    let reg = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if (reg.test(text) == false) {
      setMessage({ ...message, status: true });
      setEmailError(false);
      return false;
    } else {
      setUserInfo({ ...userInfo, Email: text });
    }
  };
  return (
    <Container style={styles.wrapper}>
      <Content style={styles.container}>
        <Form vstyle={styles.form}>
          <Item floatingLabel last style={styles.inputtexts}>
            <Label>Name</Label>
            <Input
              onChangeText={(text) => setUserInfo({ ...userInfo, Name: text })}
            />
          </Item>
          <Item floatingLabel last style={styles.inputtexts}>
            <Label>Email Address</Label>
            <Input
              keyboardType="email-address"
              onChangeText={(text) => handleEmail(text)}
            />
          </Item>

          <Item floatingLabel last style={styles.inputtexts}>
            <Label>Phone Number</Label>
            <Input
              keyboardType="phone-pad"
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, phoneNumber: text })
              }
            />
          </Item>

          <Item floatingLabel last style={styles.inputtexts}>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, password1: text })
              }
            />
          </Item>
          <Item floatingLabel last style={styles.inputtexts}>
            <Label>Confirm Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, password2: text })
              }
            />
          </Item>
          {signUpState && (
            <View style={{ padding: 0 }}>
              <Text
                style={{ color: "green", paddingTop: 10, textAlign: "center" }}
              >
                {message.description}
              </Text>
            </View>
          )}
          {error && (
            <View style={{ padding: 0 }}>
              <Text
                style={{ color: "red", paddingTop: 10, textAlign: "center" }}
              >
                Make Sure You Enter Correct Information
              </Text>
            </View>
          )}
          {signUpError !== "" && (
            <View style={{ padding: 0 }}>
              <Text
                style={{ color: "red", paddingTop: 10, textAlign: "center" }}
              >
                {signUpFailMessage}
              </Text>
            </View>
          )}
          <Button onPress={handleSignUp} full success style={styles.buttons}>
            <Text style={styles.buttonstxt}>SignUp</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    signUpFailMessage: state.Auth.signUpFailMessage,
  };
};
export default connect(mapStateToProps, { onSignUp, removeErrorMessage })(
  SignUp
);

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  imtxc: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    width: 90,
    height: 90,
  },
  loginsizetxt: {
    fontSize: 22,
    textAlign: "center",
  },
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
    marginTop: 5,
  },
  buttons: { backgroundColor: "#5dae7e", color: "#fff", marginTop: 20 },
  inputtexts: { paddingBottom: 5, borderWidth: 1 },
  textinfob: { color: "#666", marginTop: 50, textAlign: "center" },
  signuplink: { textAlign: "center", color: "#60ad7f" },
  buttonstxt: { color: "#fff" },
});
