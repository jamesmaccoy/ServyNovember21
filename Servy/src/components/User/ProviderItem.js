import React, { useState, useEffect } from "react";
import { ImageBackground, Text, TouchableOpacity, Modal, StyleSheet, Pressable } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { View } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Rating from "../Generic/Rating";
import { LinearGradient } from "expo-linear-gradient";
import bg from "../../../assets/images/bg.png";
import { connect } from "react-redux";
import { selectOption } from "../../store/actions/Services";

const stars = [1, 2, 3, 4, 5];
const ProviderItem = ({
  data,
  navigation,
  pad,
  setProviderModal,
  selectOption,
}) => {
  const [serviceImage, setServiceImage] = useState({
    image: "",
    state: false,
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (data.imagesUrl.length !== 0) {
      setServiceImage({
        ...serviceImage,
        image: data.imagesUrl[0],
        state: true,
      });
    }
  }, [data]);

  const handlePreview = (e) => {
    setProviderModal(true);
    selectOption(data);
  };

  function viewEdit() {
    setModalVisible(false);
    navigation.navigate("AddService", {
      data: data,
      key: data.id,
      user: "Provider",
    });
  }

  function closeModal() {
    setModalVisible(false);
  }
  function booked() {
    setModalVisible(false);
    navigation.navigate("ProviderBookings", {
      data: data,
      key: data.id,
    });
  }

  return (
    <>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("AddService", {
          data: data,
          key: data.id,
          user: "Provider",
        });
      }}
    >
      <View>
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
                  height: 300,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ padding: 20, color: "#fff", fontSize: 18 }}>
                  {data.serviceName}
                </Text>
                <View style={{ paddingTop: 20, paddingRight: 5 }}>
                  <TouchableWithoutFeedback activeOpacity={1}>
                    <TouchableOpacity
                      onPress={(e) => {
                        handlePreview(e);
                      }}
                    >
                      <Entypo
                        size={20}
                        color="#fff"
                        name="dots-three-vertical"
                      />
                    </TouchableOpacity>
                  </TouchableWithoutFeedback>
                </View>
              </LinearGradient>
            </ImageBackground>
            <Card.Content style={{ flexDirection: "row", padding: 20 }}>
              <FontAwesome
                style={{ fontSize: 30, paddingTop: 10 }}
                name="briefcase"
              />
              <Card.Content style={{ fontSize: 20 }}>
                <Paragraph>{data.category} </Paragraph>
                <Card.Content style={{ paddingLeft: 0, flexDirection: "row" }}>
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
      </View>
    </TouchableOpacity>
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Options</Text>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => closeModal()}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => viewEdit()}>
              <Text style={styles.textStyle}>View/Edit</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => booked()}>
              <Text style={styles.textStyle}>Booked</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userLocation: state.location.userLocation,
    initialDistance: state.location.initialDistance,
  };
};
export default connect(mapStateToProps, { selectOption })(ProviderItem);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
    width: 150,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

