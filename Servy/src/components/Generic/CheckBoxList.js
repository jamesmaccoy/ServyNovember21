import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";

const CheckBoxList = ({ text, value, checkboxPicker, index, id }) => {
  const [check, setCheck] = useState(false);
  const [checkBoxText, setCheckBoxText] = useState("");

  useEffect(() => {
    setCheckBoxText(text);
  }, [text]);
  useEffect(() => {
    setCheck(value);
  }, [value]);

  const handleCheckBox = () => {
    setCheck(!check);
    checkboxPicker.splice(index, 1, {
      label: text,
      state: !check,
      id: id,
      attributeState: false,
    });
  };

  return (
    <View style={styles.checkboxList}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={check}
          onValueChange={handleCheckBox}
          style={styles.checkbox}
          key={index}
        />
        <Text style={styles.label}>{checkBoxText}</Text>
      </View>
    </View>
  );
};
export default CheckBoxList;

const styles = StyleSheet.create({
  checkboxList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {
    color: "#488d4b",
  },
  label: {
    color: "#488d4b",
    width: 70,
    textAlign: "left",
    fontSize: 12,
  },
});
