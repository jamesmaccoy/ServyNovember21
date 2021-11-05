import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
    image: {
      width: 50,
      height: 50,
      marginRight: 10,
      borderRadius: 200,
    },
    card: {
      paddingTop: 15,
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    action: {
      flexDirection: "column",
      paddingTop: 20,
      justifyContent: "flex-end",
      position: "absolute",
      right: 8
    },
    info: {
      fontSize: 20,
      paddingTop: 10,
     
      padding: 20,
    },
  });
  