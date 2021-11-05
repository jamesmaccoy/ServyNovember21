import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  card: {
    paddingBottom: 20,
  },
  container: {
    height: 280,
  },
  left: {
    flexDirection: "row",
    padding: 10,
    paddingRight: 0
  },
  updateIcon: {
    textAlign: "center",
    fontSize: 30,
  },
  time: {
    fontSize: 11,
  },
  center: {
    fontSize: 13,
    fontWeight: "bold",
    maxWidth: 80
  },
  right: {
    paddingLeft: 0,
    paddingRight: 10,
    color: "green",
    fontSize: 15,
  },
  rightContent: {
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingRight: 10,
    paddingLeft: 0,
  },
});
