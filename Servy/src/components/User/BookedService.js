import React, { useState, useEffect } from "react";
import { ImageBackground, Text } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import bg from "../../../assets/images/bg.png";
import { useDispatch, useSelector } from "react-redux";
import { getDataByKey } from "../../store/actions/Services";

const BookedService = ({
  item
}) => {
    const dispatch = useDispatch();
    const serviceData = useSelector(state => state.Service.serviceDataByKey)
  const [serviceImage, setServiceImage] = useState({
    image: "",
    state: false,
  });
  const [serviceName, setServiceName] = useState('');
  useEffect(() => {
    if (serviceData.imagesUrl != null && serviceData.imagesUrl.length !== 0  && serviceData.id == item.serviceID) {
      setServiceImage({
        ...serviceImage,
        image: serviceData.imagesUrl[0],
        state: true,
      });
      setServiceName(serviceData.serviceName)
    }
  }, [serviceData]);
  useEffect(() => {
    dispatch(getDataByKey(item.serviceID));
  }, []);

  function getDate(date) {
    let dt = date.toDate();
    return dt.getFullYear() + "/" + (dt.getMonth() + 1).toString() + "/" + dt.getDate() + " @ " + dt.getHours() + ":" + dt.getMinutes()
  }

  return (
    <View>
    <View
      style={{ paddingBottom: 20, paddingLeft: 15, paddingRight: 15 }}
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
                  height: 300,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ padding: 20, color: "#fff", fontSize: 18 }}>
                  {serviceName}
                </Text>
              </LinearGradient>
            </ImageBackground>
            <Card.Content style={{ flexDirection: "row", padding: 20 }}>
              <FontAwesome
                style={{ fontSize: 30, paddingTop: 10 }}
                name="history"
              />
              <Card.Content style={{ fontSize: 20 }}>
                <Paragraph>{item.status}</Paragraph>
                <Card.Content style={{ paddingLeft: 0, flexDirection: "row" }}>
                    <Text>{getDate(item.date)}</Text>
                </Card.Content>
              </Card.Content>
            </Card.Content>
          </Card>      
          </View>
      </View>
  );
};
export default BookedService;
