import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
const CheckBoxList = ({
  head,
  array,
  label,
  select,
  index,
  state,
  id,
  initialValue,
}) => {
  const [check, setCheck] = useState(false);
  useEffect(() => {
    setCheck(false);
  }, [select]);
  useEffect(() => {
    if (array === []) {
      setCheck(false);
    }
  }, []);
  useEffect(() => {
    if (initialValue) {
      setCheck(initialValue.attributeState);
    }
  }, [initialValue]);
  const handleCheckBox = () => {
    setCheck(!check);
    array.splice(index, 1, {
      label: label,
      state: state,
      attributeState: !check,
      id: id,
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
        <Text style={styles.label}>{head}</Text>
      </View>
    </View>
  );
};
export default CheckBoxList;

const styles = StyleSheet.create({
  checkboxList: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    color: "#488d4b",
  },
  label: {
    color: "#488d4b",
    width: 70,
    fontSize: 12,
  },
});
