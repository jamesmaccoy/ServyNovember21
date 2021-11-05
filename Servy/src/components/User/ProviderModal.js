import React from "react";
import {
  View,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Entypo, MaterialIcons } from "react-native-vector-icons";
import { connect } from "react-redux";
import { deletesService } from "../../store/actions/Services";
let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const ProviderModal = ({
  visible,
  setProviderModal,
  optionSelect,
  navigation,
  deletesService,
}) => {
  const handleSelect = () => {
    setProviderModal(false);
  };
  const handlePreview = () => {
    setProviderModal(false);
    navigation.navigate("ListDetail", {
      data: optionSelect,
      key: optionSelect.id,
      user: "Provider",
    });
  };

  const handleDelete = () => {
    console.log("herreee");
    Alert.alert(
      "Are You Sure You Want to Delete? ",
      ``,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setProviderModal(false);
            deletesService(optionSelect.id);
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modelStyle}>
        <TouchableOpacity
          onPress={handleSelect}
          style={styles.wrapper}
        ></TouchableOpacity>
        <View style={styles.innerWrapper}>
          <Text style={{ fontSize: 18 }}>More</Text>
          <View>
            <TouchableOpacity onPress={handlePreview} style={styles.actions}>
              <Entypo
                size={30}
                style={{ color: "#000" }}
                name="controller-play"
              />
              <Text style={{ paddingLeft: 30, fontSize: 18 }}>Preview</Text>
            </TouchableOpacity>
            {optionSelect.serviceName !== "Hoola hoop teacher" && (
              <TouchableOpacity onPress={handleDelete} style={styles.actions}>
                <MaterialIcons
                  size={30}
                  style={{ color: "#000" }}
                  name="delete"
                />
                <Text style={{ paddingLeft: 30, fontSize: 18 }}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    optionSelect: state.Service.optionSelect,
  };
};
export default connect(mapStateToProps, { deletesService })(ProviderModal);

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
    flex: 2.5,
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
