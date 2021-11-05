import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { Feather, Fontisto } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addEvent } from "../../store/actions/Booking";
import { connect } from "react-redux";

const Booking = ({ visible, setVisible, addEvent }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const newDate = new Date();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const timeSlotes = [
    { startTime: `${hours}: ${minutes}  `, endTime: `${hours}: ${minutes}  ` },
    { startTime: `${hours}: ${minutes}  `, endTime: `${hours}: ${minutes}  ` },
    { startTime: `${hours}: ${minutes}  `, endTime: `${hours}: ${minutes}  ` },
    { startTime: `${hours}: ${minutes}  `, endTime: `${hours}: ${minutes}  ` },
  ];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    addEvent();
    console.log("dateee");
  };

  const showTimepicker = () => {
    console.log("modeasdsad", mode);
    showMode("time");
  };
  return (
    <Modal transparent={true} visible={visible}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, backgroundColor: "rgba(0,0,0,.6)" }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setVisible(false)}
          ></TouchableOpacity>
        </View>
        <View style={{ flex: 4, backgroundColor: "#fff" }}>
          <View
            style={{
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 18 }}>Book</Text>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={showDatepicker}>
                  <Fontisto name="date" size={25} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 16 }}>Date</Text>
              </View>
              <Text style={{ fontSize: 16 }}>{date.toDateString()} </Text>
            </View>
            <View
              style={{ height: 5, backgroundColor: "#eee", marginTop: 20 }}
            ></View>
            <View
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Feather name="clock" size={25} />

              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: 20,
                  marginBottom: 20,
                  justifyContent: "space-between",
                }}
              >
                {timeSlotes.map((data) => (
                  <View
                    style={{
                      backgroundColor: "#eee",
                      padding: 15,
                      width: 150,
                      marginTop: 10,
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text>{data.startTime} - </Text>
                    <Text>{data.endTime} </Text>
                  </View>
                ))}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 30,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                  onPress={() => console.log("call")}
                  activeOpacity={0.3}
                >
                  <Text style={{ color: "#5dae7e" }}> Cancel</Text>
                </TouchableOpacity>
                <TouchableHighlight
                  onPress={() => console.log("helloiooooooooo")}
                  activeOpacity={0.5}
                  style={{
                    width: 100,
                    height: 40,
                    backgroundColor: "#eee",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <Text>Book</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
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
      </View>
    </Modal>
  );
};
export default connect("", { addEvent })(Booking);
