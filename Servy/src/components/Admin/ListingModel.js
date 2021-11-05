import React from "react";
import {
  View,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { connect } from "react-redux";
import { sendPushNotification } from "../../store/actions/Auth";
import { duplicateListing } from "../../store/actions/Admin";
import { useNavigation } from "@react-navigation/native";
let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const ListingModal = ({
  visible,
  setProviderModal,
  currentData,
  sendPushNotification,
  duplicateListing,
  setSelect,
}) => {
  const navigation = useNavigation();
  const handleSelect = () => {
    setProviderModal(false);
  };
  const handleApprove = () => {
    sendPushNotification(
      currentData.userId,
      currentData.serviceName,
      currentData.id
    );
    setProviderModal(false);
  };
  const handleAssign = () => {
    setSelect(true);
  };
  const handleDuplicate = () => {
    setProviderModal(false);
    duplicateListing(currentData);
  };
  const handleEdit = () => {
    setProviderModal(false);
    navigation.navigate("AddService", {
      data: currentData,
      key: currentData.id,
      user: "Provider",
    });
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modelStyle}>
        <TouchableOpacity
          onPress={handleSelect}
          style={styles.wrapper}
        ></TouchableOpacity>
        <View style={styles.innerWrapper}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: "#eee" }}>
            <Text style={{ fontSize: 18, paddingBottom: 20 }}>
              More Options
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleApprove} style={styles.actions}>
              <MaterialCommunityIcons
                size={30}
                style={{ color: "#000" }}
                name="hand"
              />
              <Text style={{ paddingLeft: 20, fontSize: 18 }}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDuplicate} style={styles.actions}>
              <MaterialCommunityIcons
                size={30}
                style={{ color: "#000" }}
                name="hand"
              />
              <Text style={{ paddingLeft: 20, fontSize: 18 }}>Duplicate</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAssign} style={styles.actions}>
              <MaterialCommunityIcons
                size={30}
                style={{ color: "#000" }}
                name="hand"
              />
              <View
                style={{
                  paddingLeft: 20,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>Assign</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEdit} style={styles.actions}>
              <MaterialCommunityIcons
                size={30}
                style={{ color: "#000" }}
                name="hand"
              />

              <Text style={{ paddingLeft: 20, fontSize: 18 }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    optionSelect: state.Service.optionSelect,
    currentData: state.Admin.currentData,
  };
};
export default connect(mapStateToProps, {
  sendPushNotification,
  duplicateListing,
})(ListingModal);

export const styles = StyleSheet.create({
  modelStyle: {
    height: deviceHeight,
    width: deviceWidth,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  wrapper: {
    flex: 8,
    width: deviceWidth,
    backgroundColor: "rgba(0,0,0,.5)",
  },
  innerWrapper: {
    flex: 7,
    width: deviceWidth,
    backgroundColor: "#fff",
    padding: 20,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});
