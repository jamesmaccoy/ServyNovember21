import React, { useState } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";
import { connect } from "react-redux";
import { assignListing } from "../../store/actions/Admin";
const SelectModal = ({
  select,
  setSelect,
  users,
  assignListing,
  setProviderModal,
  currentData
}) => {
  const [state, setState] = useState("");

  const handleAssign = () => {
    setSelect(false);
    setProviderModal(false);
    assignListing(state , currentData.id);
  };

  return (
    <Modal transparent={true} visible={select}>
      <View style={styles.main}>
        <View style={styles.transparent}>
          <Picker
            style={{ maxHeight: 20, height: 100 }}
            selectedValue={state}
            onValueChange={(itemValue, itemIndex) => {
              setState(itemValue);
            }}
          >
            {users.map((data) => (
              <Picker.Item label={data.Name} value={data} />
            ))}
          </Picker>
          <View style={styles.actions}>
            <Button onPress={() => setSelect(false)}>Cancel</Button>
            <Button onPress={handleAssign}>Assign</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.Admin.users,
    currentData: state.Admin.currentData,
  };
};
export default connect(mapStateToProps, { assignListing })(SelectModal);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .5)",
    padding: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  transparent: {
    width: 300,
    height: 150,
    backgroundColor: "#fff",
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
