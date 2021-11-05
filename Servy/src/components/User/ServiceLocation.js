import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import Maps from "../Generic/Maps";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../../styles/User/AddServiceStyle";

const ServiceLocation = (props) => {
  let userLocation = props.userLocation;
  let setUserLocation = props.setUserLocation;
  let state = props.state;
  let initialValue = props.initialValue;
  const [visible, setVisible] = useState(false);

  const _getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Hey! You might want to enable notifications for my app, they are good."
      );
      setUserLocation({
        ...userLocation,
        errorMessage: "Permission Not Granted ",
      });
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    setUserLocation({
      ...userLocation,
      locationCords: currentLocation,
      maps: true,
    });
  };
  const handleMaps = () => {
    _getLocation();
  };
  useEffect(() => {
    if (props.initialValue) {
      setVisible(true);
      setUserLocation({
        ...userLocation,
        locationCords: initialValue,
        maps: true,
      });
    }
  }, [initialValue]);
  const handleEditLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Hey! You might want to enable notifications for my app, they are good."
      );
      setUserLocation({
        ...userLocation,
        errorMessage: "Permission Not Granted ",
      });
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    setUserLocation({
      ...userLocation,
      locationCords: currentLocation,
      maps: true,
    });
  };

  return (
    <View style={{ paddingTop: 20 }}>
      <TouchableOpacity style={styles.inputContainer} onPress={handleMaps}>
        <MaterialIcons
          size={25}
          style={{ position: "absolute", top: 12, left: 6 }}
          name="location-on"
        />
        <Text style={styles.inputfml}>Find my location</Text>
      </TouchableOpacity>
      <View style={{ paddingTop: 20 }}>
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {visible && (
            <AntDesign onPress={handleEditLocation} size={25} name="edit" />
          )}
        </View>
        {userLocation.maps ? (
          <Maps
            userLocation={userLocation.locationCords}
            companyName={state.serviceName}
            locationName={state.location}
            initialValue={initialValue}
          />
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};

export default ServiceLocation;
