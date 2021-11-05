import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
    screen: {
      backgroundColor: "#f7f7f7",
      padding: 20,
      paddingTop: 40,
      height: 670,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      top: 0,
      alignSelf: "stretch",
      right: 0,
      left: 0,
      zIndex: 2,
      backgroundColor: "#f7f7f7",
    },
    list:{
        paddingTop: 20
    },
    inputContainer: {
      borderColor: "#a9a9a9",
      borderWidth: 1,
      backgroundColor: "#f7f7f7",
    },
    name: {
      color: "#a9a9a9",
      paddingBottom: 5,
    },
    checkboxList: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 20,
      paddingBottom: 20,
    },
    btn: {
      color: "#000",
      backgroundColor: "#f7f7f7",
    },
    create: {
      paddingTop: 50,
    },
    heading: {
      fontSize: 20,
    },
    checkboxList: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 20,
      paddingBottom: 20,
      flexWrap: "wrap"
    },
    input:{
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
    }
  });
  