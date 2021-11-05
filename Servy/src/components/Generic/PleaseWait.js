import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { restrictNavigation } from "../../store/actions/Services";
import { connect } from "react-redux";
let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;
import { providerService } from "../../store/actions/Admin";
const PleaseWait = ({
  addServiceLoading,
  success,
  navigation,
  type,
  providerService,
  serviceMessage,
  restrictNavigation,
  saveBtn,
}) => {
  useEffect(() => {
    if (serviceMessage === true) {
      if (type === "user") {
        navigation.navigate("ServicesHome", {
          id: 121,
          messageAlert: true,
          message: saveBtn
            ? "Your Listing has been updated sucessfully"
            : "your listing was added sucessfully",
        });
        restrictNavigation();
      } else {
        navigation.navigate("Listing", {
          id: 111,
          messageAlert: true,
          message: saveBtn
            ? "Your Listing has been updated sucessfully"
            : "your listing was added sucessfully",
        });
        restrictNavigation();
        providerService();
      }
    }
  }, [serviceMessage]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={addServiceLoading || success}
    >
      {addServiceLoading && (
        <View style={styles.inputContainer}>
          <View style={styles.container}>
            <View>
              <Text style={styles.name}>This might take couple of minutes</Text>
              <Text style={styles.name}>Please Wait...</Text>
            </View>

            <ActivityIndicator color="#5dae7e" />
          </View>
        </View>
      )}
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    type: state.Auth.admin,
    serviceMessage: state.Service.serviceMessage,
  };
};
export default connect(mapStateToProps, {
  providerService,
  restrictNavigation,
})(PleaseWait);

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: deviceHeight,
    backgroundColor: "rgba(0,0,0,.5)",
  },
  container: {
    height: 120,
    elevation: 50,
    width: deviceWidth - 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  name: {
    color: "#000",
    fontSize: 15,
    paddingBottom: 5,
  },
  sucess: {
    color: "#000",
    fontSize: 17,
    paddingBottom: 5,
  },
});
