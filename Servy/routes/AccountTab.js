import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditImage from "../src/screens/Account/EditImage";
import Account from "../src/screens/Account/Account";
const Stack = createStackNavigator();
const AccountTab = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileInfo">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ProfileInfo"
        component={Account}
        initialParams={{ key: 10 }}
      />
      <Stack.Screen name="EditImage" component={EditImage} />
    </Stack.Navigator>
  );
};

export default AccountTab;
