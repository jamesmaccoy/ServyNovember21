import { StyleSheet, Dimensions } from "react-native";
var width = Dimensions.get("window").width;
var height = Dimensions.get("screen").height;
export const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 200,
  },
  icons: {
    flexDirection: "row",
  },
  text: {
    alignItems: "center",
    fontSize: 15,
  },

  texttitle: {
    alignItems: "center",
    fontSize: 15,
    fontWeight: "bold",
  },

  usernamedetail: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
  },
  userNameDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  scriconsscroll: {
    display: "flex",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    overflow: "scroll",
  },
  centeredView: {
    marginTop: 0,
    marginBottom: 0,
  },
  imagebg: { width: width, paddingTop: 50, paddingBottom: 35 },

  modalView: {
    backgroundColor: "#efefef",
    borderRadius: 0,
    width: width,
    height: height,
    alignItems: "center",
    marginBottom: 0,
    bottom: 0,
  },
  openButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 60,
    width: 60,
    textAlign: "center",
    marginTop: -30,
    shadowColor: "#000",
  },

  modalText: {
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalTextsub: {
    color: "#fff",
    marginBottom: 15,
    fontSize: 16,
    textAlign: "center",
  },
  closeic: { color: "#78ae65", textAlign: "center" },

  listnav: {
    display: "flex",
    marginTop: 20,

    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignContent: "flex-start",
    flexWrap: "wrap",
    width: width - 50,
  },
  listnavwrapper: { padding: 20 },
  navicon: { color: "#333", width: 40 },
  navicontxt: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 20,
    color: "#333",
    marginBottom: 10,
  },
  naviconsubtxt: { fontWeight: "normal", fontSize: 14, color: "#666" },
  copyrights: { position: "absolute", bottom: 50 },
  rightstxt: { textAlign: "center", color: "#517fff" },
  switchswrap: { marginTop: 40, marginBottom: 20 },
  switchs: { textAlign: "center" },

  containerswitch: {
    borderRadius: 1,
    marginTop: 20,
    marginBottom: 5,
    position: "relative",
    width: 220,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    padding: 10,
    shadowOpacity: 0.23,
    shadowRadius: 1,
    display: "flex",
    alignItems: "center",
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  containerinset: { height: 50, display: "flex", padding: 15, borderRadius: 5 },

  containerswitchinr: {
    backgroundColor: "#fff",
    width: 100,
    paddingRight: 12,
    paddingLeft: 12,
    paddingTop: 7,
    paddingBottom: 7,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 5,
    padding: 10,
    shadowOpacity: 0.23,
    shadowRadius: 1,
    display: "flex",
    alignItems: "center",
    elevation: 4,
  },
  containerswitchinrAct: {
    width: 100,
    paddingRight: 12,
    display: "flex",
    backgroundColor: "#efefef",
    alignItems: "center",
    paddingLeft: 12,
    paddingTop: 7,
    paddingBottom: 7,
  },

  swichicon: { color: "#000" },

  swichiconAct: { color: "#9c9c9c" },

  textStyle: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 6,
    color: "#000",
  },

  textStyleAct: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 6,
    color: "#9c9c9c",
  },
});
