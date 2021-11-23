import React, { useEffect, useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from "../../styles/User/BookingScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import Maps from "../../components/Generic/Maps";
import Calender from "../../components/User/Calender";
const { width } = Dimensions.get("window");
import {
  Entypo,
  MaterialCommunityIcons,
  Foundation,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { getDataByKey, resetNewBookingID } from "../../store/actions/Services";
import { updateBooking, setBookingStatus } from "../../store/actions/Booking";
import { getUserInformation } from "../../store/actions/User";
import SnackBar from "../../components/Generic/SnackBar";
const BookingScreen = ({ route }) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  const serviceData = useSelector(state => state.Service.serviceDataByKey)
  const userData = useSelector(state => state.User.userInfo)
  
  const [callCalender, setCallCalender] = useState(true);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("Booking Request Sent Successfully")
  const [status, setStatus] = useState('');
  const scrollRef = useRef();

  const navigation = useNavigation();
  const navHandler = () => {
    navigation.goBack();
  };
  useEffect(() => {
    dispatch(getDataByKey(item.serviceID));
    //setDate(item.date.toDate());
    /*
    if (item.navigate == true) {
      setVisible(true);
    }
    */
  }, []);
  useEffect(() => {
    dispatch(getUserInformation(item.userID));
  }, []);
  useEffect(() => {
    try {
      setDate(item.date.toDate());
    } catch (error) {
      setDate(new Date());
    }
    if (item.navigate == true) {
      dispatch(resetNewBookingID());
      setSnackBarMessage("Booking Request Sent Successfully");
      setVisible(true);
    }
    setStatus(item.status)
  }, [serviceData]);

  function getDate(date, type) {
    let dt = new Date()
    try {
      dt = date.toDate()
    } catch (error) {
      dt = new Date(date)
    }
    if (type == 'full') {
      return dt.getFullYear() + "/" + (dt.getMonth() + 1).toString() + "/" + dt.getDate() + " @ " + dt.getHours() + ":" + dt.getMinutes()
    }
    else if (type == 'date') {
      return dt.getFullYear() + "/" + (dt.getMonth() + 1).toString() + "/" + dt.getDate()
    }
    else if (type == 'time') {
      return dt.getHours() + ":" + dt.getMinutes()
    }
  }
  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const showDateTimepicker = () => {
    showMode('date')
  }
  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (mode == 'date') {
      setMode('time')
      setShow(true)
    }
  };

  function updateDateTime() {
    scrollRef.current?.scrollTo({y: 0, animated: true})
    setSnackBarMessage("Date/Time has changed for the booking")
    setTimeout(() => { setVisible(true); }, 2000);
    dispatch(updateBooking(item.id, date));
//    navigation.goBack();
  }

  function updateStatus(status) {
    dispatch(setBookingStatus(item.id, status, null, serviceData.userId));
    setStatus(status)
    closeModal()
  }

  function cancelBooking() {
    if (item.cuid == item.providerID) {
      scrollRef.current?.scrollTo({y: 0, animated: true})
      setSnackBarMessage("You've cancelled the booking")
      setTimeout(() => { setVisible(true); }, 2000);
      updateStatus('providerCancelled')
    } else {
      scrollRef.current?.scrollTo({y: 0, animated: true})
      setSnackBarMessage("You've cancelled the booking")
      setTimeout(() => { setVisible(true); }, 2000);
      updateStatus('clientCancelled')
    }
  }
  function getButton() {
    if (item != null) {
      if (status == 'pending' && item.cuid == item.providerID) {
        return (
          <View>
            <Pressable style={[styles1.button, styles1.buttonOpen]} onPress={() => updateStatus('providerRejected')}>
              <Text style={styles1.textStyle}>Reject</Text>
            </Pressable>
            <Pressable style={[styles1.button, styles1.buttonOpen]} onPress={() => updateStatus('providerConfirmed')}>
              <Text style={styles1.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        )
      }
      else if (status == 'providerConfirmed' && item.cuid == item.providerID) {
        return (
          <View>
            <Pressable style={[styles1.button, styles1.buttonOpen]} onPress={() => updateStatus('providerCompleted')}>
              <Text style={styles1.textStyle}>Complete</Text>
            </Pressable>
          </View>
        )
      }
      else if (status == 'providerCompleted' && item.cuid != item.providerID) {
        return (
          <View>
            <Pressable style={[styles1.button, styles1.buttonOpen]} onPress={() => updateStatus('clientRejected')}>
              <Text style={styles1.textStyle}>Reject</Text>
            </Pressable>
            <Pressable style={[styles1.button, styles1.buttonOpen]} onPress={() => updateStatus('close')}>
              <Text style={styles1.textStyle}>Complete & Close</Text>
            </Pressable>
          </View>
        )
      }
      else if (status == 'clientRejected' && item.cuid == item.providerID) {
        return (
          <View>
            <Pressable style={[styles1.button, styles1.buttonOpen]} onPress={() => updateStatus('providerCompleted')}>
              <Text style={styles1.textStyle}>Complete</Text>
            </Pressable>
          </View>
        )
      }
    }
    return null
  }
  function closeModal() {
    setModalVisible(false);
  }

  function openModal() {
    let open = false
    if (status == 'pending' && item.cuid == item.providerID) {
      open = true
    }
    if (status == 'clientRejected') {
      open = true
    }
    if (status == 'providerConfirmed' && item.cuid == item.providerID) {
      open = true
    }
    if (status == 'providerCompleted' && item.cuid != item.providerID) {
      open = true
    }
    if (open) {
      setModalVisible(true);
    }
  }



  return (
  <View>
    <View  style={styles.buttonaddrb}>
              
              <View style={{width: 100}}>
                <TouchableOpacity onPress={showDateTimepicker} title="Edit" color="#61ad7f" style={{backgroundColor: "#61ad7f", borderRadius: 30, paddingHorizontal: 10, paddingVertical: 10}}>
                  <View style={{flex: 1, alignSelf: "center" , flexDirection: "row", paddingHorizontal: 5, paddingVertical: 5 }}>
                    <Entypo name={"edit"} size={18} color={'#fff'} />
                    <Text style={{color: "white", paddingLeft: 10}}>Edit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
    <ScrollView style={styles.wrapper} ref={scrollRef}>
      <SnackBar
        setVisible={setVisible}
        visible={visible}
        message={snackBarMessage}
      />
      <View style={styles.viewover}>
        <SafeAreaView style={styles.HeaderContainer}>
          <View style={styles.headerCategory}>
            <MaterialCommunityIcons
              style={styles.brief}
              onPress={navHandler}
              name="arrow-left"
            />
            <Text style={styles.title}>{serviceData.serviceName}</Text>
          </View>

          <Entypo name="share" size={30} color={"#fff"} />
        </SafeAreaView>
        <View style={styles.borderbot}>
          <View style={styles.statusvi}>
            <Text style={{ color: "#fff" }}>Status</Text>
          </View>
          <Pressable onPress={openModal}>
            <View style={styles.viewposr}>
              <Text style={styles.taskco}>{status}</Text>
              <View style={styles.bluedot}></View>
            </View>
          </Pressable>
        </View>
        <Text style={styles.categoryTitle}>
          Global status of task. Both parties{" "}
        </Text>
      </View>
      <Image
        source={require("../../../assets/images/plumber.webp")}
        style={{ height: 500 }}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.bookingtitle}>Booking Details</Text>
        <View style={{marginTop: 10,  flex: 1, alignSelf: "stretch" }}>
          <View style={{padding: 0, flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
            <View style={{padding: 0, flex: 1,  }}>
              <Text style={styles.bkheading}>Date & Time</Text>
            </View>
             <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
           <Text style={{marginRight: 10, paddingTop: 15, fontSize: 14}}>{getDate(date, 'full')}</Text>
           </View>
   </View>
            {/*
            <View style={{flex: 1, alignSelf: "auto", flexDirection: "row", alignSelf: "stretch", paddingRight: 5 }}>
              <TouchableOpacity onPress={showDatepicker} title="Edit" color="#61ad7f" style={{backgroundColor: "#61ad7f", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 10}}>
                <View style={{flex: 1, alignSelf: "auto", flexDirection: "row" }}>
                  <Entypo name={"edit"} size={18} color={'#fff'} />
                  <Text style={{color: "white", paddingLeft: 10}}>{getDate(item.date, 'date')}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={showTimepicker} title="Edit" color="#61ad7f" style={{marginLeft: 5, backgroundColor: "#61ad7f", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 10}}>
                <View style={{flex: 1, alignSelf: "auto", flexDirection: "row" }}>
                  <Entypo name={"edit"} size={18} color={'#fff'} />
                  <Text style={{color: "white", paddingLeft: 10}}>{getDate(item.date, 'time')}</Text>
                </View>
              </TouchableOpacity>
            </View>
            */}
          </View>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkheading}>Client:</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              {userData != null && (
                <Text style={styles.bkdesc}>
                  {userData.Name} {userData.Email} {userData.PhoneNumber}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkheading}>Sburb:</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkdesc}>Pinelands</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkheading}>Address:</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkdesc}>
                82 Hargrave road, Llandundo 7806 ZA
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkheading}>Booking Request On:</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkdesc}>{getDate(item.date,'full')}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.fawbtn}>
          <Text style={styles.iconinbtn}>
             <MaterialCommunityIcons name="hand-left"  color={"#61ad7f"} size={35} />
          </Text>
          <Text style={styles.textinbtn}>Frequently Asked Question</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fawbtn}>
          <Text style={styles.iconinbtn}>
            <Foundation name="telephone" color={"#61ad7f"} size={35} />
          </Text>
          <Text style={styles.textinbtn}>Talk</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fawbtn} onPress={updateDateTime}>
          <Text style={styles.iconinbtn}>
            <Foundation name="save" color={"#61ad7f"} size={35} />
          </Text>
          <Text style={styles.textinbtn}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fawbtn} onPress={cancelBooking}>
          <Text style={styles.iconinbtn}>
            <MaterialIcons name="cancel" size={35} color={'#61ad7f'} />
          </Text>
          <Text style={styles.textinbtn}>Cancel</Text>
        </TouchableOpacity>
          {/*

        <View>
          <Text style={styles.services}>Location</Text>
          <Maps
            userLocation={serviceData.maps}
            companyName={serviceData.serviceName}
            locationName={serviceData.location}
          />
        </View>
*/}
        <View>
            {/*
          <View style={{ marginTop: 20 }}>
            <Calendar
              setCallCalender={setCallCalender}
              callCalender={callCalender}
            />
          </View>
            */}
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles1.centeredView}>
          <View style={styles1.modalView}>
            <Text style={styles1.modalText}>Options</Text>
            <Pressable style={[styles1.button, styles1.buttonClose]} onPress={() => closeModal()}>
              <Text style={styles1.textStyle}>Cancel</Text>
            </Pressable>
            {getButton()}
          </View>
        </View>
      </Modal>

      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </ScrollView>

            </View>

);
};
const mapStateToProps = (state) => {
  return {
    serviceData: state.Service.serviceDataByKey,
  };
};
export default connect(mapStateToProps)(BookingScreen);

const styles1 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
    width: 150,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

