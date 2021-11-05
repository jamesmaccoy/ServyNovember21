import React from "react";
import {  StyleSheet, View } from "react-native";
import {ActivityIndicator} from 'react-native-paper'

const Loader = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator style={{ fontSize: 25 }} size={50} color="#5dae7e" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
});

export default Loader;
