import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions, RefreshControl } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { handleRemoveNotification } from "../../store/actions/User";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getNotifications, dismissNotification } from "../../store/actions/Notifications";
import { setBookingStatus, getBookingByID } from "../../store/actions/Booking";

let deviceHeight = Dimensions.get("window").height;
const Notification = ({ /*notifications,*/ handleRemoveNotification, navigation }) => {
  const { notifications } = useSelector(state => state.notificationsReducer)
  const { booking } = useSelector(state => state.bookingsReducer)
  const [refreshing, setRefreshing] = useState(false);
  const [go, setGo] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  useEffect(() => {
    if (booking != null && go) {
      setGo(false)
      navigation.navigate("booking", {
        item: booking,
        key: booking.serviceID,
      });
    }
  }, [booking]);

  const onRemoveNotification = (id) => {
    handleRemoveNotification(id);
  };

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

  function confirm(item, status) {
    setRefreshing(true);
    dispatch(setBookingStatus(item.type, status, item.id, item.providerID));
    updateCalendar();
    onRefresh()
  }
  function dismiss(item) {
    setRefreshing(true);
    dispatch(dismissNotification(item.id));
    onRefresh()
  }
  function reject(item) {
    setRefreshing(true);
    dispatch(setBookingStatus(item.type, 'reject', item.id, item.providerID));
    onRefresh()
  }

  function view(item) {
    setGo(true)
    dispatch(getBookingByID(item.type));
  }

  function getDate(date, type) {
    let dt = date.toDate();
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
  function onRefresh() {
    setRefreshing(true);
    dispatch(getNotifications());
    setRefreshing(false);
  }

  function getOptions(item) {
    if (item.category == '1') {
      return (
        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
          <TouchableOpacity onPress={() => confirm(item, 'providerRejected')}>
            <Text style={styles.dismiss}>REJECT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => confirm(item, 'providerConfirmed')}>
            <Text style={styles.positive}>CONFIRM</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => view(item)}>
            <Text style={styles.positive}>READ MORE</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else if (item.category == '2') {
      return (
        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
          <TouchableOpacity onPress={() => view(item)}>
            <Text style={styles.positive}>READ MORE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dismiss(item)}>
            <Text style={styles.dismiss}>DISMISS</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else if (item.category == '3') {
      return (
        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
          <TouchableOpacity onPress={() => dismiss(item)}>
            <Text style={styles.dismiss}>DISMISS</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else if (item.category == '4') {
      if (item.userID == item.providerID) {
        return (
          <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
            <TouchableOpacity onPress={() => confirm(item, 'providerCompleted')}>
              <Text style={styles.positive}>COMPLETE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => view(item)}>
              <Text style={styles.positive}>READ MORE</Text>
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
            <TouchableOpacity onPress={() => view(item)}>
              <Text style={styles.positive}>READ MORE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dismiss(item)}>
              <Text style={styles.dismiss}>DISMISS</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }
    else if (item.category == '5') {
      if (item.userID == item.providerID) {
        return (
          <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
            <TouchableOpacity onPress={() => view(item)}>
              <Text style={styles.positive}>READ MORE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dismiss(item)}>
              <Text style={styles.dismiss}>DISMISS</Text>
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
            <TouchableOpacity onPress={() => confirm(item, 'close')}>
              <Text style={styles.positive}>COMPLETE & ClOSE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => view(item)}>
              <Text style={styles.positive}>READ MORE</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }
    else if (item.category == '6') {
      return (
        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
          <TouchableOpacity onPress={() => dismiss(item)}>
            <Text style={styles.dismiss}>DISMISS</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else if (item.category == '7') {
      return (
        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
          <TouchableOpacity onPress={() => dismiss(item)}>
            <Text style={styles.dismiss}>DISMISS</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else if (item.category == '10') {
      return (
        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
          <TouchableOpacity onPress={() => view(item)}>
            <Text style={styles.positive}>READ MORE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dismiss(item)}>
            <Text style={styles.dismiss}>DISMISS</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  return (
    <View style={styles.screen}>
      {notifications.length === 0 ? (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 40,
          }}
        >
          <Text style={{ color: "#a9a9a9", fontSize: 15 }}>
            No New Notification
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ minHeight: deviceHeight }}
          data={notifications}
          renderItem={({ item }) => (
            <View style={styles.notification}>
              <Text style={{ textAlign: "right", color: "#90a7b7" }}>
                {getDate(item.timestamp, "full")}
                {/*
                {timeago(item.timestamp)}
                */}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {item.category == "4" ? (<MaterialCommunityIcons
                  style={styles.cupdateIcon}
                  name="wrench"
                />) : (<MaterialCommunityIcons
                  style={styles.updateIcon}
                  name="wrench"
                />)}
                <Text style={{ paddingLeft: 10 }}>{item.message}</Text>
              </View>
              {getOptions(item)}
            </View>
          )}
          refreshControl = {<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />
      )}
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    //notifications: state.User.notifications,
  };
};
export default connect(mapStateToProps, { handleRemoveNotification })(
  Notification
);

function timeago(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 2)
    return Math.round(seconds / (60 * 60 * 24 * 365.25)) + " years ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 1)
    return "1 year ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 2)
    return Math.round(seconds / (60 * 60 * 24 * 30.4)) + " months ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 1)
    return "1 month ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 2)
    return Math.round(seconds / (60 * 60 * 24 * 7)) + " weeks ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 1) return "1 week ago";
  else if (Math.round(seconds / (60 * 60 * 24)) >= 2)
    return Math.round(seconds / (60 * 60 * 24)) + " days ago";
  else if (Math.round(seconds / (60 * 60 * 24)) >= 1) return "1 day ago";
  else if (Math.round(seconds / (60 * 60)) >= 2)
    return Math.round(seconds / (60 * 60)) + " hours ago";
  else if (Math.round(seconds / (60 * 60)) >= 1) return "1 hour ago";
  else if (Math.round(seconds / 60) >= 2)
    return Math.round(seconds / 60) + " minutes ago";
  else if (Math.round(seconds / 60) >= 1) return "1 minute ago";
  else if (seconds >= 2) return seconds + " seconds ago";
  else return seconds + "1 second ago";
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ffffff",
    padding: 5,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 80,
  },
  notification: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    marginTop: 10,
    marginBottom: 2,
    padding: 20,
    elevation: 2,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 20,
  },
  updateIcon: {
    fontSize: 25,
    backgroundColor: "#ffc40c",
    width: 45,
    padding: 10,
    borderRadius: 30,
  },
  cupdateIcon: {
    fontSize: 25,
    backgroundColor: "#61ad7f",
    width: 45,
    padding: 10,
    borderRadius: 30,
  },
  dismiss: {
    textAlign: "right",
    marginTop: 10,
    fontSize: 16,
    color: "#90a7b7",
    marginRight: 10
  },
  positive: {
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 10,
    fontSize: 16,
    color: "#61ad7f",
    marginRight: 10
  },
});
