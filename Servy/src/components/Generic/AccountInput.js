import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const Input = (props) => {
  let head = props.head;
  let placeHolder = props.placeHolder;
  let setState = props.onChangeText;
  let defaultValue = props.defaultValue;

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.name}>{head}</Text>
      <TextInput
        onChangeText={(text) => setState(text)}
        placeholder={placeHolder}
        style={styles.input}
        value={props.value}
        defaultValue={defaultValue}
      />
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    height: 80,
    paddingTop: 10,
  },
  input: {
    height: 40,
    paddingLeft: 10,
    flex: 1,
    height: 100,
    borderColor: "#a9a9a9",
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  name: {
    color: "#a9a9a9",
    paddingBottom: 5,
  },
});
