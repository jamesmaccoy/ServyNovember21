import React, { useEffect } from "react";
import Listing from "../src/screens/Admin/Listing";
import Categories from "../src/screens/Admin/Categoris";
import Users from "../src/screens/Admin/Users";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Logout } from "../src/store/actions/Auth";
import { connect } from "react-redux";
import AddCategory from "../src/screens/Admin/AddCategory";
import { createStackNavigator } from "@react-navigation/stack";
import { profileInformation } from "../src/store/actions/User";
import ListDetail from "../src/screens/User/ListDetail";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem onPress={props.Logout} label="Logout" />
    </DrawerContentScrollView>
  );
};
const Stack = createStackNavigator();

const category = () => {
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Categories"
        component={Categories}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AddCategory"
        component={AddCategory}
      />
    </Stack.Navigator>
  );
};

const ListingDetails = () => {
  return (
    <Stack.Navigator initialRouteName="ListingScreen">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ListingScreen"
        component={Listing}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ListingDetail"
        component={ListDetail}
      />
    </Stack.Navigator>
  );
};

const Admin = ({ navigation, Logout, profileInformation }) => {
  useEffect(() => {
    profileInformation();
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent Logout={Logout} {...props} />
      )}
      initialRouteName="Users"
    >
      <Drawer.Screen name="Users" component={Users} />
      <Drawer.Screen name="Listing" component={ListingDetails} />
      <Drawer.Screen name="Categories" component={category} />
    </Drawer.Navigator>
  );
};

export default connect("", { Logout, profileInformation })(Admin);
