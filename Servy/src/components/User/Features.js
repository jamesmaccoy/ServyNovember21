import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { connect } from "react-redux";

const FeaturesSelect = ({ setAttributes, attributes, featuresSelect }) => {
  const onSelectedItemsChange = (selectedItems) => {
    setAttributes(selectedItems);
  };

  return (
    <View
      style={{ paddingLeft: 10, paddingRight: 10, backgroundColor: "#fff" }}
    >
      <MultiSelect
        items={featuresSelect.features}
        uniqueKey="id"
        hideSubmitButton={true}
        iconSearch={false}
        hideDropdown={true}
        onSelectedItemsChange={(text) => onSelectedItemsChange(text)}
        selectedItems={attributes}
        selectText="Features"
        searchInputPlaceholderText="Search Items.."
        tagRemoveIconColor="#000"
        tagBorderColor="#eee"
        tagTextColor="#000"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#000"
        itemTextColor="#000"
        displayKey="label"
        searchInputStyle={{ color: "#000" }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
        styleListContainer={{
          justifyContent: "flex-start",
          height: 100,
        }}
        styleDropdownMenu={{ backgroundColor: "#fff" }}
        styleTextDropdown={{ paddingLeft: 5 }}
        styleTextTag={{ padding: 0 }}
        tagContainerStyle={{
          width: 120,
          padding: 0,
          margin: 2,
          height: 30,
          backgroundColor: "#eee",
        }}
        styleItemsContainer={{ backgroundColor: "#f7f7f7" }}
        styleMainWrapper={{ backgroundColor: "#fff" }}
      />
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    services: state.Service.services,
    categories: state.category.adminCollection,
  };
};
export default connect(mapStateToProps)(FeaturesSelect);
