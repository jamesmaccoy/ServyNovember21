import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./HomeTab";
import Services from "./ProviderServices";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProviderTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: "#000",
        activeTintColor: "#666",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={Services}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default ProviderTab;
