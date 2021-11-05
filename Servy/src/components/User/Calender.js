// import React, { useState } from "react";
// import { View, Text, Modal, Dimensions, TouchableOpacity } from "react-native";
// import { Button } from "native-base";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { Agenda } from "react-native-calendars";
// import { Card, Avatar } from "react-native-paper";

// const Example = ({ callCalender, setCallCalender }) => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
//   const [items, setItems] = useState({});

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };
//   const showTimePicker = () => {
//     setTimePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };
//   const hideTimePicker = () => {
//     setTimePickerVisibility(false);
//   };

//   const handleConfirmDate = (date) => {
//     console.warn("A date has been picked: ", date);
//     hideDatePicker();
//   };

//   const handleConfirmTime = (date) => {
//     console.warn("A date has been picked: ", date);
//     hideTimePicker();
//   };
//   const loadItems = (day) => {};

//   const renderItem = (item) => {
//     return (
//       <View>
//         <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
//           <Card>
//             <Card.Content>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Text>{item.name}</Text>
//                 <Avatar.Text label="J" />
//               </View>
//             </Card.Content>
//           </Card>
//         </TouchableOpacity>
//       </View>
//     );
//   };
//   return (
//     <Modal transparent={true} visible={callCalender}>
//       <View
//         style={{
//           flex: 1,
//         }}
//       >
//         <View style={{ flex: 2, backgroundColor: "rgba(0,0,0,.6)" }}>
//           <TouchableOpacity
//             style={{ flex: 1 }}
//             onPress={() => setCallCalender(false)}
//           ></TouchableOpacity>
//         </View>

//         <View style={{ flex: 3, padding: 20, backgroundColor: "#fff" }}>
//           <View>
//             <Text style={{ fontSize: 18 }}>Sart Time: </Text>
//             <Text style={{ fontSize: 18 }}>End Time: </Text>
//             <Btn fuct={showDatePicker} text={"SHow Date Picker"} />
//             <Btn fuct={showTimePicker} text={"SHow Time Picker"} />
//             <View style={{ flex: 1, marginTop: 40 }}>
//               {/* <Agenda
//                 items={items}
//                 loadItemsForMonth={loadItems}
//                 selected={"2017-05-16"}
//                 renderItem={renderItem}
//               /> */}
//             </View>
//           </View>

//           <DateTimePickerModal
//             isVisible={isDatePickerVisible}
//             mode="date"
//             onConfirm={handleConfirmDate}
//             onCancel={hideDatePicker}
//           />
//           <DateTimePickerModal
//             isVisible={isTimePickerVisible}
//             mode="time"
//             onConfirm={handleConfirmTime}
//             onCancel={hideTimePicker}
//           />
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default Example;

// const Btn = ({ fuct, text }) => {
//   return (
//     <Button
//       style={{
//         marginBottom: 20,
//         backgroundColor: "#f7f7f7",
//         borderColor: "#a9a9a9",
//         borderWidth: 1,
//         borderRadius: 5,
//         elevation: 0,
//       }}
//       full
//       onPress={fuct}
//     >
//       <Text style={{ color: "#a9a9a9" }}>{text} </Text>
//     </Button>
//   );
// };

import React, { useState } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { Agenda, Calendar } from "react-native-calendars";
import { Card, Avatar, Modal } from "react-native-paper";
let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;
const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Schedule = ({ callCalender, setCallCalender }) => {
  const [items, setItems] = useState({});
  const vacation = { key: "vacation", color: "red", selectedDotColor: "blue" };
  const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
  const workout = { key: "workout", color: "green" };

  const loadItems = (day) => {
    // setTimeout(() => {
    //   for (let i = -15; i < 85; i++) {
    //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //     const strTime = timeToString(time);
    //     if (!items[strTime]) {
    //       items[strTime] = [];
    //       const numItems = Math.floor(Math.random() * 3 + 1);
    //       for (let j = 0; j < numItems; j++) {
    //         items[strTime].push({
    //           name: "Item for " + strTime + " #" + j,
    //           height: Math.max(50, Math.floor(Math.random() * 150)),
    //         });
    //       }
    //     }
    //   }
    //   const newItems = {};
    //   Object.keys(items).forEach((key) => {
    //     newItems[key] = items[key];
    //   });
    //   setItems(newItems);
    // }, 1000);
  };

  const renderItem = (item) => {
    return (
      <View>
        <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
          <Card>
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>{item.name}</Text>
                <Avatar.Text label="J" />
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    // <Modal style={{ height: deviceHeight }} visible={callCalender}>
    <View style={{ flex: 1, marginTop: 40 }}>
      {/* <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={"2017-05-16"}
        renderItem={renderItem}
      /> */}
      <Calendar
        markedDates={{
          "2017-10-25": {
            dots: [vacation, massage, workout],
            selected: true,
            selectedColor: "red",
          },
          "2017-10-26": { dots: [massage, workout], disabled: true },
        }}
      />
    </View>
    // </Modal>
  );
};

export default Schedule;
