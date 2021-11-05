import React from "react";
import { View } from "react-native";
import { styles } from "../../styles/User/AddServiceStyle";
import { Picker } from "@react-native-picker/picker";

const CategoryPicker = ({
  selectedValue,
  setState,
  setSelectedValue,
  state,
  categories,
  setSelect,
  setVisible,
  stateChange,
  setStateChange,
  categoryInital,
  setCategoryInitial,
  setAddFeatureVisible,
}) => {
  return (
    <View style={styles.picker}>
      <Picker
        style={{ flex: 1, zIndex: 2 }}
        selectedValue={
          selectedValue.value !== "other" ? selectedValue : "other"
        }
        onValueChange={(itemValue, itemIndex) => {
          setStateChange(false);
          setCategoryInitial(false);
          if (stateChange === false) {
            if (itemValue !== "other") {
              setAddFeatureVisible(true);
              setSelectedValue(itemValue);
              setState({
                ...state,
                category: itemValue.label,
              });
              setSelect(true);
              setVisible(false);
            }
            if (itemValue === "other") {
              setAddFeatureVisible(true);
              setSelectedValue({
                ...selectedValue,
                other: true,
                value: "other",
                label: "other",
                features: [...checkboxPicker],
              });
              setSelect(true);
              setVisible(true);
            }
            if (itemValue === "select") {
              setAddFeatureVisible(false);
              setSelectedValue({
                ...selectedValue,
                other: true,
                value: "select",
                label: "select",
                features: [],
              });
            }
          }
        }}
        mode="dropdown"
      >
        {stateChange ? (
          <Picker.Item
            label={selectedValue.label}
            key={0}
            value={selectedValue}
          />
        ) : (
          <Picker.Item label="Select Category" key={1} value="select" />
        )}
        {categories.length !== 0 ? (
          categories.map((data, index) => {
            if (categoryInital === true) {
              if (data.label !== selectedValue.label) {
                return (
                  <Picker.Item
                    label={data.label}
                    key={index + 2}
                    value={data}
                  />
                );
              }
            } else {
              return (
                <Picker.Item label={data.label} key={index + 2} value={data} />
              );
            }
          })
        ) : (
          <Picker />
        )}
        <Picker.Item label="Other..." key="other" value="other" />
      </Picker>
    </View>
  );
};
export default CategoryPicker;

const checkboxPicker = [
  {
    label: "I come to you",
    id: "ICometoyou",
    state: true,
    attributeState: false,
  },
  {
    label: "You come to me",
    id: "Youcometome",
    state: true,
    attributeState: false,
  },
  {
    label: "Imediate Immediately",
    id: "ImediateImmediately",
    state: true,
    attributeState: false,
  },
  {
    label: "Video Streaming",
    id: "VideoStreaming",
    state: true,
    attributeState: false,
  },

  {
    label: "Remote Working",
    id: "RemoteWorking",
    state: true,
    attributeState: false,
  },

  {
    label: "Delivery Included",
    id: "DeliveryIncluded",
    state: true,
    attributeState: false,
  },
];
