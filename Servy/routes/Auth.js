import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../src/screens/Auth/LogIn";
import Signup from "../src/screens/Auth/SignUp";
import StartScreen from "../src/screens/Auth/StartScreen";

const Stack = createStackNavigator();

const AuthTab = () => {
  return (
    <Stack.Navigator initialRouteName="startscreen">
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        
        name="startscreen"
        component={StartScreen}
      />
    </Stack.Navigator>
  );
};
export default AuthTab;
