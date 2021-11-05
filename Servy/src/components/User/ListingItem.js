import React, { useState, useEffect } from "react";
import { ImageBackground, Text } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Rating from "../Generic/Rating";
import { LinearGradient } from "expo-linear-gradient";
import bg from "../../../assets/images/bg.png";
import { connect } from "react-redux";
import { getPreciseDistance } from "geolib";
import { servicesLenght } from "../../store/actions/Services";
const stars = [1, 2, 3, 4, 5];
const ListingItem = ({
  data,
  navigation,
  pad,
  userLocation,
  initialDistance,
  servicesLenght,
  serviceAvailable,
}) => {
  const [serviceImage, setServiceImage] = useState({
    image: "",
    state: false,
  });

  const [distance, setDistance] = useState(0);
  useEffect(() => {
    if (data.imagesUrl.length !== 0) {
      setServiceImage({
        ...serviceImage,
        image: data.imagesUrl[0],
        state: true,
      });
    }
  }, [data]);
  useEffect(() => {
    if (userLocation !== null) {
      setDistance(
        getPreciseDistance(
          {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          },
          {
            latitude: data.maps.coords.latitude,
            longitude: data.maps.coords.longitude,
          }
        ) / 1609.344
      );
    }
  }, [data, userLocation]);

  useEffect(() => {
    if (serviceAvailable === false) {
      if (userLocation !== null && distance !== 0) {
        if (distance <= initialDistance) {
          servicesLenght(true);
        }
        // console.log("hereerer")
      }
    }
  }, [distance , initialDistance]);

  return (
    <>
      {/*userLocation !== null && distance <= initialDistance*/ true && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate("ListDetail", {
              data: data,
              key: data.id,
            });
          }}
        >
          <View
            style={{ paddingBottom: 20, paddingLeft: pad, paddingRight: pad }}
          >
            <Card style={{ height: 280 }}>
              <ImageBackground
                style={{ flex: 1 }}
                source={
                  serviceImage.state === true ? { uri: serviceImage.image } : bg
                }
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0.5)", "transparent"]}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 300,
                  }}
                >
                  <Text style={{ padding: 20, color: "#fff", fontSize: 18 }}>
                    {data.serviceName}
                  </Text>
                </LinearGradient>
              </ImageBackground>
              <Card.Content style={{ flexDirection: "row", padding: 20 }}>
                <FontAwesome
                  style={{ fontSize: 30, paddingTop: 10 }}
                  name="briefcase"
                />
                <Card.Content style={{ fontSize: 20 }}>
                  <Paragraph>{data.category} </Paragraph>
                  <Card.Content
                    style={{ paddingLeft: 0, flexDirection: "row" }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      {stars.map((x, index) => (
                        <TouchableOpacity key={x}>
                          <Rating
                            filled={x <= data.averageRating ? true : false}
                            name="Service"
                            size={16}
                            key={x}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                    <Paragraph style={{ paddingLeft: 5 }}>
                      Reviews ({data.totalReviews})
                    </Paragraph>
                  </Card.Content>
                </Card.Content>
              </Card.Content>
            </Card>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userLocation: state.location.userLocation,
    initialDistance: state.location.initialDistance,
    serviceAvailable: state.Service.servicesLenght,
  };
};
export default connect(mapStateToProps, { servicesLenght })(ListingItem);
