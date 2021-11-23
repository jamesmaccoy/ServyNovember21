import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  reviewContent: {
    paddingTop: 10,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  reviewListHead: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  reviewContainer: {
    marginTop: 20,
    paddingBottom: 10,
  },
  rating: {
    paddingTop: 20,
  },
  reviewsList: {
    paddingTop: 0,
  },
  ratingList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  ratingBox: {
    paddingLeft: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
  review: {
    paddingTop: 0,
  },
  reviewHead: {
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  categoryTitle: {
    color: "#fff",
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "bold",
    position: "absolute",
    bottom: 20,
    zIndex: 9999,
  },
  location: {
    paddingTop: 20,
    fontSize: 20,
    color: "#000",
    height: 100,
  },
  content: {
    padding: 20,
  },
  image: {
    height: 600,
    paddingLeft: 0,
    paddingRight: 0,
    resizeMode: "cover",
    flexDirection: "row",
  },
  viewsli: { marginRight: -50 },

  screenitem: {
    display: "flex",
    flexDirection: "row",
  },

  heading: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#282828",
  },
  services: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#282828",
  },

  details: {
    paddingTop: 10,
    fontSize: 16,
    lineHeight: 22,
    color: "#282828",
  },
  wrapper: {
    backgroundColor: "#fff",
    position: "relative",
  },
  HeaderContainer: {
    paddingRight: 0,
    paddingBottom: 20,
    paddingLeft: 20,
    position: "absolute",
    paddingTop: 40,
    flexDirection: "row",
    zIndex: 9999,
    justifyContent: "space-between"
  },
  brief: {
    fontSize: 30,
    color: "#fff",
  },
  headerCategory: {
    flex: 1,
    flexDirection: "row",
  },
  close: {
    fontSize: 32,
    right: 16,
    top: -3,
    color: "#fff",
    marginLeft: 10
  },
  checkboxList: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 20,
    flexWrap: "wrap",
    width:'33.333%'
  },

    fixedbuttononscreen:{
  elevation: 999,
                    position: "relative",
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
    textAlignVertical: "top",
    color: "#000",
  },
  buttons: { color: "#5c9b84", marginTop: 20, padding:25,backgroundColor: "#5c9b84" },
  buttonstxt: { color: "#fff", fontSize:22, textTransform:'uppercase' },
  viewover: { position: "absolute", top: 0, width: width, height: 600 },

  corb: { marginRight: -60 },
  buttonaddr: {
    borderWidth: 2,
    width: 100,
    paddingTop: 6,
    paddingRight: 20,
    paddingLeft: 12,
    paddingBottom: 6,
    marginTop: 20,
    borderColor: "#5c9b84",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonbook: {
    width: "100%",
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 12,
    paddingBottom: 10,
    marginTop: 20,
    backgroundColor: "#5c9b84",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  titlereviewbtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 10,

  },

  centeredView: {
    position: "absolute",
    height: "100%",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,.5)",
  },
  modalView: {
    position: "absolute",

    bottom: 0,

    width: "100%",
    margin: 0,
    backgroundColor: "white",
    borderRadius: 0,
    paddingTop: 10,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
     fawbtn:{borderWidth:2,borderColor:'#ccc', position:'relative', borderRadius:5,padding:20,marginTop:0},
      details: {
        paddingTop: 10,
        fontSize: 16,
        lineHeight: 22,
        color: "#282828",
      },
      
      iconinbtn:{   left:8,   position:'absolute',top:10,},
    textinbtn:{fontSize:18,fontWeight:'bold',color:'#61ad7f',textTransform:'uppercase',textAlign:'center'},
   buttonaddrb:{position:'absolute',right:10,marginTop:20,
 backgroundColor:'#61ad7f',paddingTop:18,zIndex:999,bottom:10,
   paddingRight:25,paddingLeft:35,paddingBottom:18,borderRadius:50,
   shadowColor: "#000",
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,},
simpleflexroe:{flexDirection:'row',justifyContent:'flex-end',},

titlereviewbtn:{flex: 1,flexDirection: "row", alignItems:'center', justifyContent:'space-between',  paddingBottom:10}, 
  
  centeredBookView: {
    position: "absolute",    height: "100%",    bottom: 0,    width: "100%",    backgroundColor: "rgba(0,0,0,.5)",
  },
  modalBookView: {    position: "absolute",    bottom: 0,    width: "100%",
    margin: 0,    backgroundColor: "white",    borderRadius: 0,    paddingTop: 10,
    padding: 0,    shadowColor: "#000",    shadowOffset: {      width: 2,
      height: 2,    },    shadowOpacity: 0.25,    shadowRadius: 3.84,    elevation: 3,  },

      moreheadingtxt:{fontSize:20,fontWeight:'bold',padding:15,borderEndWidth:1,borderColor:'#ccc'},
      bookbox:{padding:20},
      buttons:{height:60,backgroundColor:'#60ad7f'},
      fixeddcontain:{  position: 'relative',zIndex:88},
 
    bottomView:{
 
      right:10,
    
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 10
    },
 
    textStyle:{
 
      color: '#fff',
      fontSize:22
    }
});


