import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f7f7f7",
    padding: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 40,
    alignSelf: "stretch",
    right: 20,
    left: 20,
    zIndex: 2,
    backgroundColor: "#f7f7f7",
  },
  btn: {
    color: "#000",
    backgroundColor: "#f7f7f7",
  },
  create: {
    paddingBottom: 100,
    paddingTop: 50,
  },

  heading: {
    paddingTop: 20,
    fontSize: 20,
  },

  name: {
    color: "#a9a9a9",
    paddingBottom: 5,
  },
  checkboxList: {
    flexDirection: "row",
 
    flexWrap: "wrap",
  },
  image: {
    flex: 1,
    height: 50,
    borderColor: "#a9a9a9",
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  picker: {
    marginTop: 20,
    height: 50,
    paddingLeft: 10,
    flex: 1,
    borderColor: "#a9a9a9",
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  input: {
    height: 50,
    paddingLeft: 10,
    flex: 1,

    textAlign: "center",
    paddingTop: 10,
    color: "#a9a9a9",
  },
   inputfml: {
    height: 50,
    paddingLeft: 10,
    flex: 1,
    color:'#000',

    textAlign: "center",
    paddingTop: 14,

  },
  inputContainer: {
    borderWidth: 1,
    backgroundColor: "#f7f7f7",
    borderColor: "#a9a9a9",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  showFeatures: {
  
     width:100,
     borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent:'center',
    backgroundColor: "#efefef",
    position:'relative',
    padding:8,
    position:'absolute',
    right:4,
    top:38,
  },
  addFeatures: {
    flex: 1,
    borderColor: "#a9a9a9",
    elevation: 0,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: "red",
    backgroundColor: "#f7f7f7",
  },
  nfbtn:{  borderColor: "#a9a9a9",},
  btnupr:{position:'absolute',left:8}
});
