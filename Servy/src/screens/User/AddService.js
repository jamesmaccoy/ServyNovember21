import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Animated,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Input from "../../components/Generic/Input";
import { AntDesign, Entypo } from "@expo/vector-icons";
import CheckBoxList from "../../components/User/CheckBoxList";
import { styles } from "../../styles/User/AddServiceStyle";
import { AddNewService, updateService } from "../../store/actions/Services";
import { getAdminCategory } from "../../store/actions/Category";
import { connect } from "react-redux";
import PickImage from "../../components/User/PickImage";
import ServiceLocation from "../../components/User/ServiceLocation";
import CategoryPicker from "../../components/User/CategoryPicker";
import PleaseWait from "../../components/Generic/PleaseWait";

const AddService = ({ ...props }) => {
  let navigation = props.navigation;
  let AddNewService = props.AddNewService;
  let serviceMessage = props.serviceMessage;
  let getAdminCategory = props.getAdminCategory;
  let categories = props.categories;
  let serviceLoading = props.serviceLoading;
  let updateService = props.updateService;

  const [array, setArray] = useState([]);
  const [initState, setIniState] = useState(0);
  const [goBack, setGoBack] = useState(false);
  const [pickImages, setPickImages] = useState([]);
  const [select, setSelect] = useState(false);
  const [cat, setCat] = useState([]);
  const [message, setMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [addServiceLoading, setAddServiceLoading] = useState(false);
  const [stateChange, setStateChange] = useState(false);
  const [saveBtn, setSaveBtn] = useState(false);
  const [sample, setSample] = useState(false);
  const [state, setState] = useState({
    serviceName: "",
    location: "",
    maps: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [imgInitial, setImgInitial] = useState(false);
  const [selectedValue, setSelectedValue] = useState({
    other: true,
    label: "",
    value: "",
    features: "",
  });
  const [userLocation, setUserLocation] = useState({
    errorMessage: "",
    locationCords: {},
    map: false,
  });
  const [newFeature, setNewFeature] = useState({
    label: "",
    state: false,
    attributeState: false,
    id: "",
  });
  const [featureVisible, setFeatureVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [categoryInital, setCategoryInitial] = useState(false);
  const [addfeatureVisible, setAddFeatureVisible] = useState(false);
  useEffect(() => {
    getAdminCategory();
    setGoBack(false);
    setCat(categories);
    setAddServiceLoading(false);
    setMessage(false);
  }, []);
  useEffect(() => {
    if (props.route.params.key !== 2) {
      let data = props.route.params.data;
      if (data.id === "snmpjSLY6rnMC39rxi9F") {
        setSample(true);
      }
      setSaveBtn(true);
      setState({
        ...state,
        serviceName: data.serviceName,
        location: data.location,
        maps: data.maps,
        category: data.category,
      });
      setCategoryInitial(true);
      setStateChange(true);
      setSelectedValue({
        ...selectedValue,
        other: true,
        label: data.category,
        value: data.category,
        features: data.attributes,
      });
      setImgInitial(true);
      setImages(data.imagesUrl);
      const tempArray = [];
      data.attributes.forEach((newElement) => {
        tempArray.push(newElement);
      });
      setIniState(1);
      setArray(tempArray);
    }
  }, []);
  useEffect(() => {
    setCat(categories);
  }, [categories]);

  useEffect(() => {
    setAddServiceLoading(serviceLoading);
    if (goBack === true) {
      setMessage(serviceMessage);
    }
  }, [serviceLoading, serviceMessage]);
  const navigationHandler = () => {
    navigation.goBack();
  };

  const handleInfo = () => {
    if (
      state.serviceName !== "" &&
      state.location !== "" &&
      state.maps !== null &&
      state.category !== "" &&
      array !== [] &&
      Object.keys(userLocation.locationCords).length !== 0 &&
      images.length !== 0
    ) {
      setAddServiceLoading(true);
      setGoBack(true);
      AddNewService(state, array, userLocation, pickImages, selectedValue);
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
      setMessage(false);
    }
  };

  const showFeature = () => {
    setFeatureVisible(!featureVisible);
  };
  const AddFeature = () => {
    if (newFeature.label !== "" && selectedValue.value !== "") {
      setStateChange(true);
      setCategoryInitial(true);
      setSelectedValue({
        ...selectedValue,
        other: selectedValue.other,
        value: selectedValue.value,
        label: selectedValue.label,
        features: selectedValue.features.concat(newFeature),
      });
    }
  };

  useEffect(() => {
    if (initState === 2) {
      setArray([]);
    }
    setSelect(false);
  }, [select]);
  const handleUpdateInfo = () => {
    if (
      state.serviceName !== "" &&
      state.location !== "" &&
      state.maps !== null &&
      state.category !== "" &&
      array !== [] &&
      Object.keys(userLocation.locationCords).length !== 0 &&
      images.length !== 0
    ) {
      setAddServiceLoading(true);
      setGoBack(true);
      updateService(
        state,
        array,
        userLocation,
        pickImages,
        selectedValue,
        props.route.params.data.id,
        sample
      );

      setErrorMessage(false);
    } else {
      setErrorMessage(true);
      setMessage(false);
    }
  };
  return (
    <View>
      <PleaseWait
        saveBtn={saveBtn}
        navigation={navigation}
        success={message}
        addServiceLoading={addServiceLoading}
      />
      <View style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigationHandler}>
            <AntDesign name="arrowleft" size={25} color="#000" />
          </TouchableOpacity>
          {errorMessage && (
            <Text style={{ color: "red" }}>Provide All Information</Text>
          )}
          {saveBtn ? (
            <TouchableOpacity onPress={handleUpdateInfo} style={styles.btn}>
              <Text>Save & Exit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleInfo} style={styles.btn}>
              <Text>Save & Exit</Text>
            </TouchableOpacity>
          )}
        </View>
        <Animated.ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.create}>
            <KeyboardAvoidingView keyboardVerticalOffset={20}>
              <Text style={styles.heading}>Create a service</Text>
              <Input
                name="service"
                head="Give your service a name"
                placeHolder="e.g Hoola Hoop teacher"
                initialValue={state.serviceName}
                onChangeText={(serviceName) =>
                  setState({ ...state, serviceName: serviceName })
                }
              />
              <Text
                style={{
                  color: "#a9a9a9",
                  paddingTop: 10,
                }}
              >
                Category
              </Text>
              <CategoryPicker
                selectedValue={selectedValue}
                initState={initState}
                setState={setState}
                categoryInital={categoryInital}
                setCategoryInitial={setCategoryInitial}
                categories={cat}
                setSelectedValue={setSelectedValue}
                state={state}
                setArray={setArray}
                setSelect={setSelect}
                setVisible={setVisible}
                visible={visible}
                stateChange={stateChange}
                array={array}
                setStateChange={setStateChange}
                setAddFeatureVisible={setAddFeatureVisible}
              />
              {visible && (
                <Input
                  name="NewCateogry"
                  head="Suggest a new Category"
                  placeHolder="eg. Electrition"
                  onChangeText={(text) =>
                    setState({ ...state, category: text })
                  }
                />
              )}

              <View>
                <Text style={styles.heading}>Features</Text>
                <View style={styles.checkboxList}>
                  {selectedValue.value !== "select" &&
                    selectedValue.features.length !== 0 &&
                    selectedValue.features.map((subValue, index) => {
                      return (
                        <>
                          {subValue.state && (
                            <CheckBoxList
                              select={select}
                              index={index}
                              head={subValue.label}
                              key={index}
                              array={array}
                              setArray={setArray}
                              label={subValue.label}
                              subValue={selectedValue.features}
                              state={subValue.state}
                              id={subValue.id}
                              initialArray={selectedValue.features}
                              initialValue={subValue}
                            />
                          )}
                        </>
                      );
                    })}
                </View>
              </View>
              <View>
                {addfeatureVisible && (
                  <View style={styles.nfbtn}>
                    <Input
                      name="Feature"
                      head=""
                      placeHolder="eg. DeliveryIncluded"
                      onChangeText={(values) =>
                        setNewFeature({
                          ...newFeature,
                          attributeState: false,
                          label: values,
                          state: true,
                          id: values.replace(/\s/g, ""),
                        })
                      }
                    />

                    <TouchableOpacity
                      style={styles.showFeatures}
                      onPress={AddFeature}
                      full
                    >
                      <Entypo
                        name="plus"
                        color={"#000"}
                        style={styles.btnupr}
                        size={20}
                      />
                      <Text
                        style={{
                          textAlign: "center",
                          paddingLeft: 8,
                          color: "#000",
                          fontSize: 15,
                        }}
                      >
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <Text style={styles.heading}>Location</Text>
              <Input
                name="location"
                initialValue={state.location}
                head="Suburb"
                placeHolder="eg. Rondebosch"
                onChangeText={(location) => setState({ ...state, location })}
              />
              <ServiceLocation
                userLocation={userLocation}
                setUserLocation={setUserLocation}
                state={state}
                initialValue={state.maps}
              />

              <Text style={styles.heading}>Gallery</Text>
              <PickImage
                pickImages={pickImages}
                setPickImages={setPickImages}
                setImages={setImages}
                images={images}
                imgInitial={imgInitial}
              />
            </KeyboardAvoidingView>
          </View>
        </Animated.ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    serviceMessage: state.Service.serviceMessage,
    serviceLoading: state.Service.serviceLoading,
    categories: state.category.adminCollection,
    categoryFeatures: state.Service.categoryFeatures,
    loading: state.Service.loading,
  };
};
export default connect(mapStateToProps, {
  AddNewService,
  getAdminCategory,
  updateService,
})(AddService);
