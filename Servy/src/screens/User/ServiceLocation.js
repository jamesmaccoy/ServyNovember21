import React from "react";

const ServiceLocation = ({ userLocation, setUserLocation, state }) => {
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

  return (
    <View style={{ paddingTop: 20 }}>
      <TouchableOpacity style={styles.inputContainer} onPress={handleMaps}>
        <Text style={styles.input}>Maps</Text>
      </TouchableOpacity>
      <View style={{ paddingTop: 20 }}>
        {userLocation.maps ? (
          <Maps
            userLocation={userLocation.locationCords}
            companyName={state.serviceName}
            locationName={state.location}
          />
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};
export default ServiceLocation;
