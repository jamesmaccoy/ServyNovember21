import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
    screen: {
      backgroundColor: "#f7f7f7",
      padding: 20,
      paddingTop: 40,
      height: 670,
      paddingBottom: 10
    },
    list:{
        paddingTop: 20
    },
    imageComponent:{
      justifyContent: "center",
      flexDirection: "row",

    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 200,
        paddingBottom: 0
      },
      content:{
        padding: 50,
        paddingBottom: 0,
        justifyContent: "center",
        alignItems: "center"
        
      },
      text:{
        textAlign: "center",
          paddingTop: 10,
          fontWeight: "bold"
      },
      heading: {
        paddingTop: 20,
        fontSize: 20,
      },
      info:{
        paddingBottom: 100
      },
      inputContainer: {
        height: 150,
        paddingTop: 10,
        marginBottom: 50
      },
      input: {
        paddingTop: 10,
        paddingLeft: 10,
        padding: 0,
        height: 150,
        borderColor: "#a9a9a9",
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        textAlignVertical: 'top',
        color: '#000'
          
      },
      name: {
        color: "#a9a9a9",
        paddingBottom: 5,
      },
      add: {
        backgroundColor: '#939393',
        position: 'absolute',
        bottom: 4,
        right: 10,
        width: 20,
        height: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
       },
       textContainer: {
        height: 80,
        paddingTop: 10
      },

      textwrap:{
        position:'relative',
      },
      texticon:{
        position:'absolute',
        right:10,
        color: "#000",
        fontSize:24,
        bottom:11,
      },
      topfunacc:{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
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
  btn: {
    color: "#000",
    backgroundColor: "#f7f7f7",
  },


 
  });
  