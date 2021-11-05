import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Button } from "native-base";
import { Entypo, MaterialCommunityIcons, Ionicons, Foundation } from "@expo/vector-icons";
import tick from "../../../assets/images/tick.png";
import Filter from "../../components/User/Filter";
import { connect } from "react-redux";
import {
  serviceProviderInformation,
  shareDynamicLinks,
} from "../../store/actions/User";
import {
  addServiceReview,
  getServiceReview,
  getDataByKey,
  resetDynamicLinkId,
} from "../../store/actions/Services";
import Rating from "../../components/Generic/Rating";
import Maps from "../../components/Generic/Maps";
import Loader from "../../screens/Auth/Loader";
import Carousel from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../../styles/User/ListDestailStyle";
import ShareLink from "../../components/User/ShareLink";

const { width } = Dimensions.get("window");
const ListDetail = ({ ...props }) => {
  let navigation = props.navigation;
  let addServiceReview = props.addServiceReview;
  let getServiceReview = props.getServiceReview;
  let ReviewsList = props.ReviewsList;
  let dataLoader = props.loader;
  let shareDynamicLinks = props.shareDynamicLinks;
  let getDataByKey = props.getDataByKey;
  let serviceData = props.serviceData;
  let resetDynamicLinkId = props.resetDynamicLinkId;

  const [information, setInformation] = useState({
    about: "",
  });
  const stars = [1, 2, 3, 4, 5];
  const [Review, setReview] = useState({
    service: 0,
    comment: "",
  });
  const [data, setData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleText, setTextVisible] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [serviceLoader, setServiceLoader] = useState(true);

  useEffect(() => {
    setServiceLoader(true);
    getDataByKey(props.route.params.key);
  }, []);

  useEffect(() => {
    setServiceLoader(dataLoader);
  }, [dataLoader]);

  useEffect(() => {
    if (serviceData) {
      setData(serviceData);
      props.serviceProviderInformation(serviceData.userId);
      getServiceReview(serviceData.id);
    }
  }, [serviceData]);

  useEffect(() => {
    if (data) {
      shareDynamicLinks(data.id);
      if (data.attributes) {
        if (data.attributes.length !== 0) {
          setTextVisible(false);
        }
        if (data.attributes.length === 0) {
          setTextVisible(true);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    props.serviceProviderInfo.map((providerData) => {
      setInformation({ ...information, about: providerData.about });
    });
  }, [props.serviceProviderInfo]);

  const navHandler = () => {
    navigation.goBack();
    resetDynamicLinkId();
  };

  const handleRatingService = (star) => {
    setReview({ ...Review, service: star });
  };
  const handleReview = () => {
    addServiceReview(Review, data.id);
    setModalVisible(!modalVisible);
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <ImageBackground
          source={{ uri: item }}
          style={styles.image}
        ></ImageBackground>
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 300,
          }}
        />
      </>
    );
  };

  return (
    <>
      {serviceLoader == true ? (
        <Loader />
      ) : (
        <View>
          <ScrollView opacity={showFilter ? 0.8 : 1} style={styles.wrapper}>
            <View style={styles.viewover}>
              <SafeAreaView style={styles.HeaderContainer}>
                <View style={styles.headerCategory}>
                  <MaterialCommunityIcons
                    style={styles.brief}
                    onPress={navHandler}
                    name="arrow-left"
                  />

                  <Text style={styles.title}>{data.category}</Text>
                </View>
                <View style={styles.icons}>
                  <MaterialCommunityIcons
                    style={styles.close}
                    name="filter-variant"
                    onPress={handleFilter}
                  />
                  <TouchableOpacity>
                    <ShareLink name={data.serviceName} />
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
              <Text style={styles.categoryTitle}>{data.serviceName} </Text>
            </View>

            <Carousel
              layout={"default"}
              loop={true}
              data={data.imagesUrl}
              renderItem={renderItem}
              sliderWidth={width}
              sliderHeight={300}
              itemWidth={width - 30}
              autoplay={true}
              activeSlideAlignment={"start"}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              activeSlideOffset={0}
            />

            <View style={styles.content}>
              <Text style={styles.details}>{information.about}</Text>

              <Text style={styles.services}>Services</Text>

              {visibleText && (
                <Text style={{ fontSize: 14, color: "#282828" }}>
                  No Features for this service
                </Text>
              )}

              <View style={styles.checkboxList}>
                {data.attributes.length !== 0 &&
                  data.attributes.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          paddingTop: 10,
                          paddingLeft: 0,
                        }}
                      >
                        <Image
                          style={{ width: 20, height: 20 }}
                          source={tick}
                        />

                        <Text
                          style={{
                            color: "#282828",
                            fontSize: 16,
                            width: 150,
                            textAlign: "left",
                            paddingLeft: 10,
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    );
                  })}
              </View>
                <View style={styles.titlereviewbtn}>
                      <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);

                    }}
                     style={{paddingBottom:100,position:'relative',width:'100%'}}
                  >

                    <View style={styles.buttonaddrb}>
                         <Ionicons name="ios-hand" size={30} color={'#fff'} />
                      <Text
                        style={{
                          fontSize: 18,
                          paddingLeft: 5,
                          color: "#ffffff",
                          textTransform:'uppercase'
                        }}
                      >
                        Book
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>



              <View>
              <TouchableOpacity style={styles.fawbtn}>
               
               <Text style={styles.iconinbtn}>
               <Foundation name="telephone" color={'#61ad7f'} size={40}/>
               </Text>
               <Text  style={styles.textinbtn}>
               Talk
               </Text>

               </TouchableOpacity>
               </View>

              <View>
                <Text style={styles.services}>Location</Text>
                <View>
                  <Maps
                    userLocation={data.maps}
                    companyName={data.serviceName}
                    locationName={data.location}
                  />
                </View>
              </View>
              <View>
                <View style={styles.titlereviewbtn}>
                  <Text style={styles.services}>Reviews</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                    }}
                  >
                    <View style={styles.buttonaddr}>
                      <Entypo name={"plus"} size={26} />
                      <Text
                        style={{
                          fontSize: 18,
                          paddingLeft: 5,
                          color: "#5c9b84",
                        }}
                      >
                        Add
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                  
                  
        {/*        <View>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                    }}
                  >
                    <View style={styles.buttonbook}>
                      <MaterialCommunityIcons
                        name={"calendar"}
                        size={30}
                        color={"#fff"}
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          paddingLeft: 5,
                          color: "#ffffff",
                        }}
                      >
                        Book
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
*/}
                <View style={styles.review}>
                  <View style={styles.reviewsList}>
                    {ReviewsList.map((data, index) => (
                      <View key={index} style={styles.reviewContainer}>
                        <View style={styles.reviewListHead}>
                          <View
                            style={{ paddingLeft: 0, flexDirection: "row" }}
                          >
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "#404145",
                                marginBottom: 0,
                              }}
                            >
                              {data.Name}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.reviewContent}>
                          <Text
                            style={{
                              color: "#404145",
                              paddingTop: 0,
                              paddingBottom: 15,
                            }}
                          >
                            {data.comment}
                          </Text>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              textAlign: "center",
                            }}
                          >
                            <Entypo
                              style={{ paddingLeft: 5 }}
                              name="star"
                              size={18}
                              color="#fbbc04"
                            />
                            <Text style={{ paddingLeft: 5, color: "#fbbc04" }}>
                              {data.totalRating}
                            </Text>
                          </View>
                          <View
                            style={{
                              borderBottomColor: "#979797",
                              borderBottomWidth: 1,
                              marginTop: 10,
                            }}
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
          

                  
           
              </View>
            </View>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableHighlight
                    style={{
                      textAlign: "right",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      background: "#555",
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text>Close</Text>
                  </TouchableHighlight>
                  <View style={{ paddingTop: 20, width: "100%" }}>
                    <Text style={{ paddingLeft: 0, paddingBottom: 5 }}>
                      Add a Review
                    </Text>
                    <TextInput
                      paddingVertical={0}
                      minHeight={100}
                      multiline={true}
                      numberOfLines={20}
                      maxLength={300}
                      placeholder="What was your experience"
                      style={styles.input}
                      onChangeText={(text) =>
                        setReview({ ...Review, comment: text })
                      }
                    />
                    <View style={styles.rating}>
                      <View style={styles.ratingBox}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                          Rate the Service
                        </Text>
                        <Text style={{ fontSize: 15 }}>
                          Quality of customer service
                        </Text>
                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                          {stars.map((x, index) => (
                            <TouchableOpacity
                              style={{}}
                              key={index}
                              onPress={() => handleRatingService(x)}
                            >
                              <Rating
                                filled={x <= Review.service ? true : false}
                                name="Service"
                                size={40}
                                key={index}
                              />
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    </View>
                    <Button onPress={handleReview} full style={styles.buttons}>
                      <Text style={styles.buttonstxt}>Add</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
          <Filter
            route={props.route}
            navigation={navigation}
            setShowFilter={setShowFilter}
            modalVisible={showFilter}
          />
        </View>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    serviceProviderInfo: state.Service.serviceProviderInfo,
    ReviewsList: state.Service.reviewsList,
    loader: state.Service.loader,
    serviceData: state.Service.serviceDataByKey,
    dynamicLink: state.User.dynamicLink,
  };
};
export default connect(mapStateToProps, {
  serviceProviderInformation,
  addServiceReview,
  getServiceReview,
  shareDynamicLinks,
  resetDynamicLinkId,
  getDataByKey,
})(ListDetail);
