import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthTab from "../routes/Auth";
import Loader from "./screens/Auth/Loader";
import { connect } from "react-redux";
import { verifyUser } from "../src/store/actions/Auth";
import Authority from "../routes/Authority";
import { profileInformation } from "../src/store/actions/User";
import { LogBox, AppState } from "react-native";
import {
  getDynamicLinkId,
  getLinkFromBackBackground,
} from "./store/actions/Services";
import * as Linking from "expo-linking";
import { createStackNavigator } from "@react-navigation/stack";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
const index = ({
  userState,
  verifyUser,
  loading,
  getDynamicLinkId,
  getLinkFromBackBackground,
}) => {
  const [isSignedIn, setSignedIn] = useState(false);
  useEffect(() => {
    getLinkFromBackBackground();
    Linking.getInitialURL().then((url) => {
      if (url !== "" && typeof url !== "object") {
        if (url.startsWith("https")) {
          getDynamicLinkId(url.substr(30));
        }
      }
    });
    Linking.addEventListener("url", (url) => {
      if (url !== "" && typeof url !== "object") {
        if (url.startsWith("https")) {
          getDynamicLinkId(url.substr(30));
        }
      }
    });

    verifyUser();
  }, []);

  const config = {
    screens: {
      user: {
        screens: {
          Guest: {
            screens: {
              Home: {
                screens: {
                  AddService: { path: "addservice" },
                  Services: { path: "Services" },
                  ListDetail: { path: "listdetail" },
                },
              },
            },
          },
          MyAccount: { name: "MyAccount", path: "MyAccount" },
        },
      },
    },
  };

  const linking = {
    prefixes: ["https://serveys.page.link", "servys://"],
    config,
  };
  useEffect(() => {
    setSignedIn(userState);
  }, [userState]);

  useEffect(() => {
    setSignedIn(userState);
  }, [userState]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <NavigationContainer linking={linking}>
          {isSignedIn ? (
            <>
              <Authority />
            </>
          ) : (
            <AuthTab />
          )}
        </NavigationContainer>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userState: state.Auth.currentUser,
    loading: state.Auth.loading,
  };
};

export default connect(mapStateToProps, {
  verifyUser,
  profileInformation,
  getDynamicLinkId,
  getLinkFromBackBackground,
})(index);
