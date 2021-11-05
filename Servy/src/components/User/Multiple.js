import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import MultiSelect from "react-native-multiple-select";
let deviceWidth = Dimensions.get("window").width;

const MutipleSelect = ({ categories, setFilterCategory, setGetAgain }) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    setGetAgain(false);
  }, []);

  const onSelectedItemsChange = (selectedItems) => {
    setState(selectedItems);
  };

  useEffect(() => {
    setFilterCategory(state);
    if (state.length === 0) {
      setGetAgain(true);
    }
  }, [state]);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,

        position: "absolute",
        top: 80,
        left: 15,
        width: deviceWidth - 30,
        zIndex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#f7f7f7",
          paddingBottom: 10,
          flexWrap: "wrap",
        }}
      ></View>
      <MultiSelect
        items={categories}
        uniqueKey="label"
        onSelectedItemsChange={(text) => onSelectedItemsChange(text)}
        selectedItems={state}
        selectText="Search"
        searchInputPlaceholderText="Search Items.."
        tagRemoveIconColor="#000"
        tagBorderColor="#CCC"
        tagTextColor="#000"
        selectedItemTextColor="#000"
        selectedItemIconColor="#000"
        itemTextColor="#000"
        displayKey="label"
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
        styleListContainer={{
          justifyContent: "flex-start",
          zIndex: 1,
          height: 200,
        }}
        fixedHeight={true}
        hideSubmitButton={true}
        styleTextDropdown={{ paddingLeft: 20 }}
        styleTextTag={{ padding: 0 }}
        tagContainerStyle={{
          padding: 0,
          margin: 2,
          marginBottom: 2,
          height: 30,
          borderWidth: 0,
          backgroundColor: "#eee",
        }}
        styleDropdownMenuSubsection={{
          backgroundColor: "#f7f7f7",
          borderWidth: 0,
        }}
        iconSearch={false}
        styleInputGroup={{ backgroundColor: "#f7f7f7" }}
        selectText={"Search"}
        searchInputStyle={{ backgroundColor: "f7f7f7" }}
        styleItemsContainer={{
          backgroundColor: "#f7f7f7",
          elevation: 2,
        }}
        searchInputStyle={{ backgroundColor: "#f7f7f7" }}
        styleSelectorContainer={{
          elevation: 0,
        }}
        submitButtonColor="red"
        styleDropdownMenu={{ backgroundColor: "#f7f7f7", margin: 0 }}
        styleMainWrapper={{ backgroundColor: "#f7f7f7" }}
      />
    </View>
  );
};

export default MutipleSelect;
