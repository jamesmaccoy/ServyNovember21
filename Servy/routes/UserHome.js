import React, { useEffect, useState } from "react";
import { View, Text, BackHandler } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Notification from "../src/screens/User/Notification";
import GuestTabs from "./Guest";
import MyAccount from "./AccountTab";
import * as Location from "expo-location";
import { Button } from "react-native-paper";
import { getCurrentLocation } from "../src/store/actions/Location";
import { connect } from "react-redux";
import Loader from "../src/screens/Auth/Loader";

const Stack = createStackNavigator();
const UserHome = ({ getCurrentLocation }) => {
  const [location, setLocation] = useState(null);
  const [state, setState] = useState(false);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        BackHandler.exitApp();
        return;
      }
      try {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (e) {
        setState(true);
      }
    })();
  }, []);
  useEffect(() => {
    if (location !== null) {
      getCurrentLocation(location);
    }
  }, [location]);

  const allowLocation = () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        BackHandler.exitApp();
        return;
      }
      try {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (e) {
        setState(true);
      }
    })();
  };
  return (
    <>
      {location !== null ? (
        <Stack.Navigator initialRouteName="Guest">
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            initialParams={{
              checkVisible: false,
            }}
            name="Guest"
            initialParams={{ key: 10 }}
            component={GuestTabs}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            initialParams={{ key: 15 }}
            name="MyAccount"
            component={MyAccount}
          />
          <Stack.Screen name="Notification" component={Notification} />
        </Stack.Navigator>
      ) : (
        <>
          {state ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <Text>Please Allow Location To Use This App</Text>
                <Button
                  style={{
                    marginTop: 20,
                    color: "#fff",
                    backgroundColor: "#60ad7f",
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                  full
                  success
                  onPress={allowLocation}
                >
                  <Text style={{ color: "#fff" }}>Allow Location</Text>
                </Button>
              </View>
            </View>
          ) : (
            <View style={{ backgroundColor: "#fff", flex: 1 }}>
              <Loader />
            </View>
          )}
        </>
      )}
    </>
  );
};
export default connect("", { getCurrentLocation })(UserHome);
