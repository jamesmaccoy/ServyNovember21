import React, { useEffect, useState } from "react";
import Header from "../../components/User/Header";
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Modal, Pressable, RefreshControl } from "react-native";
import { connect, useSelector, useDispatch } from "react-redux";
import { getProviderBookings, setBookingStatus } from "../../store/actions/Booking";
import * as Calendar from 'expo-calendar';
import BookedService from "../../components/User/BookedService";
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const ProviderBookings = (props) => {

  const serviceID = props.route.params.data.id

  const { pbookings } = useSelector(state => state.bookingsReducer)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [calendarID, setCalendarID] = useState("");

  let navigation = props.navigation;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        calendars.forEach((calendar) => {
          if (calendar.title == "Servy Calendar") {
            setCalendarID(calendar.id)
          }
        });
      }
    })();
    dispatch(getProviderBookings(serviceID));
  }, []);

  function getDate(date) {
    let dt = date.toDate();
    return dt.getFullYear() + "/" + (dt.getMonth() + 1).toString() + "/" + dt.getDate() + " @ " + dt.getHours() + ":" + dt.getMinutes()
  }

  function tapped(item) {
    setSelectedBooking(item)
    navigation.navigate("booking", {
      item: item,
      key: item.serviceID,
    });
//    setModalVisible(true);
  }

  function confirm() {
    setModalVisible(false);
    dispatch(setBookingStatus(selectedBooking.id, 'confirmed', null));
    dispatch(getProviderBookings());
    updateCalendar();
  }

  function complete() {
    setModalVisible(false);
    dispatch(setBookingStatus(selectedBooking.id, 'completed', null));
    dispatch(getProviderBookings());
    updateCalendar();
  }

  function viewEdit() {
//    setModalVisible(false);
    navigation.navigate("booking", {
      item: selectedBooking,
      key: selectedBooking.serviceID,
    });
  }

  function closeModal() {
    setSelectedBooking(null);
    setModalVisible(false);
  }

  function onRefresh() {
    setRefreshing(true);
    dispatch(getProviderBookings());
    setRefreshing(false);
  }

  async function getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
    return defaultCalendars[0].source;
  }
  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Servy Calendar' };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Servy Calendar',
      color: 'red',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    return newCalendarID;
  }
  async function deleteCalendar() {
    await Calendar.deleteCalendarAsync(calendarID);
  }

  async function updateCalendar() {
    //deleteCalendar()
    let cID = calendarID
    if (cID == "") {
      cID = await createCalendar();
    }
    let dt = selectedBooking.date.toDate();
    const eventID = await Calendar.createEventAsync(cID, {
      title: "Servy Event",
      startDate: dt,
      endDate: dt,
      allDay: true,
      timeZone: 'Asia/Hong_Kong'
    })
  }

  const renderItem = ({item}) => (
    <TouchableOpacity onPress = {() => tapped(item)}>
      <BookedService
        key={item.id}
        item={item}
      />
    </TouchableOpacity>
  );

  function getButton() {
    if (selectedBooking != null) {
      if (selectedBooking.status == 'pending') {
        return (
          <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => confirm()}>
            <Text style={styles.textStyle}>Confirm</Text>
          </Pressable>
        )
      } else if (selectedBooking.status == 'confirmed') {
        return (
          <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => complete()}>
            <Text style={styles.textStyle}>Completed</Text>
          </Pressable>
        )
      }
    }
    return null
  }

  return (
    <View style={styles.screen}>
      <>
      {/*
      <Header
        filterButton={false}
        notificationButton={true}
        name="Services"
        navigation={navigation}
        visible={true}
      />
      */}
      {pbookings.length == 0 ? 
      <Text
      style={{
        paddingTop: 50,
        textAlign: "center",
        fontSize: 17,
        color: "#a9a9a9",
      }}
    >
      No active Bookings
    </Text> :
          <FlatList data={pbookings} renderItem={renderItem} keyExtractor={item => item.id} refreshControl = {<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />
      }
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Options</Text>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => closeModal()}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => viewEdit()}>
              <Text style={styles.textStyle}>View/Edit</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => closeModal()}>
              <Text style={styles.textStyle}>Reject</Text>
            </Pressable>
            {getButton()}
          </View>
        </View>
      </Modal>
      </>
    </View>
  );
};

export default ProviderBookings;
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    paddingTop: 35,
    paddingBottom: 80,
    minHeight: deviceHeight,
  },
  item: {
    padding: 20,
    backgroundColor: "#EAEAEA",
    marginBottom: 2,
  },
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
