import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserHome from "./UserHome";
import Admin from "./Admin";
import Loader from "../src/screens/Auth/Loader";
import { connect } from "react-redux";
import { Authorization } from "../src/store/actions/Auth";
import { profileInformation } from "../src/store/actions/User";
import AddService from "../src/screens/User/AddService";
import BookingScreen from "../src/screens/User/BookingScreen";

const Stack = createStackNavigator();

const Authority = ({ type, Authorization, authCheck, profileInformation }) => {
  const [userType, setUserType] = useState("");
  useEffect(() => {
    Authorization();
  }, []);

  useEffect(() => {
    profileInformation();
  }, [authCheck]);

  useEffect(() => {
    setUserType(type);
  }, [type]);

  return (
    <>
      {authCheck ? (
        <Loader />
      ) : (
        <>
          {userType !== "" && userType == "admin" ? (
            <Stack.Navigator initialRouteName="admin">
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="admin"
                component={Admin}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="AddService"
                component={AddService}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName="user">
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="user"
                component={UserHome}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="booking"
                component={BookingScreen}
              />
            </Stack.Navigator>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    type: state.Auth.admin,
    authCheck: state.Auth.authCheck,
  };
};

export default connect(mapStateToProps, { Authorization, profileInformation })(
  Authority
);
