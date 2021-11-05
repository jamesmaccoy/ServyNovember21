import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../styles/Account/AccountStyle";
import Input from "../../components/Generic/AccountInput";
import { FontAwesome5, AntDesign, Entypo } from "react-native-vector-icons";
import {
  profileInformation,
  updateInformation,
} from "../../store/actions/User";
import { connect } from "react-redux";
import Loader from "../Auth/Loader";
import Calendar from "./../../components/User/Calender";
import { Button } from "native-base";

const Account = ({ ...props }) => {
  let navigation = props.navigation;
  let profileInformation = props.profileInformation;
  let profileInfo = props.profileInfo;
  let updateInformation = props.updateInformation;
  const [Edit, setEdit] = useState(false);
  const [check, setCheck] = useState(false);
  const [state, setState] = useState({
    about: "",
    userType: "",
    firstName: "",
    lastName: "",
    Email: "",
    PhoneNumber: "",
    websiteUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    userId: "",
    imageUrl: "",
  });

  const handleNavigation = () => {
    navigation.navigate("EditImage");
  };
  useEffect(() => {
    profileInformation();
    setEdit(false);
  }, []);

  useEffect(() => {
    profileInfo.map((profile) => {
      setState({
        ...state,
        about: profile.about,
        userType: profile.userType,
        firstName: profile.firstName,
        lastName: profile.lastName,
        Email: profile.Email,
        PhoneNumber: profile.PhoneNumber,
        websiteUrl: profile.websiteUrl,
        facebookUrl: profile.websiteUrl,
        instagramUrl: profile.instagramUrl,
        userId: profile.id,
        imageUrl: profile.photoURL,
      });
    });

    setCheck(true);
  }, [profileInfo]);

  const handleAccountInfo = () => {
    updateInformation(state);
  };
  const navigationHandler = () => {
    navigation.goBack();
  };

  const [callCalender, setCallCalender] = useState(false);
  const timeSlotes = [
    { day: "Monday", timing: "3-40-2012" },
    { day: "Tuesday", timing: "3-40-2012" },
    { day: "Wednesday", timing: "3-40-2012" },
    { day: "Monday", timing: "3-40-2012" },
  ];

  return (
    <>
      {check ? (
        <ScrollView style={styles.screen}>
          <View style={styles.header}>
            <TouchableOpacity onPress={navigationHandler}>
              <AntDesign name="arrowleft" size={25} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
              <Text>Save & Exit</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View>
              <View style={styles.content}>
                <View>
                  <TouchableOpacity style={styles.imageComponent}>
                    {state.imageUrl !== "" ? (
                      <Image
                        style={{ height: 100, width: 100, borderRadius: 200 }}
                        source={{ uri: state.imageUrl }}
                      />
                    ) : (
                      <Image
                        style={{ height: 100, width: 100, borderRadius: 200 }}
                        source={require("../../../assets/images/user1.jpeg")}
                      />
                    )}
                    <View style={styles.add}>
                      <TouchableOpacity>
                        <FontAwesome5
                          onPress={handleNavigation}
                          name="user-edit"
                          width={20}
                          height={20}
                          fill="#111"
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.text}>{state.Name}</Text>
                </View>
                {Edit ? (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleAccountInfo}
                    style={{
                      paddingTop: 20,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text>Update Information</Text>
                    <AntDesign style={{ fontSize: 20 }} name="edit" />
                  </TouchableOpacity>
                ) : (
                  <Text></Text>
                )}
              </View>

              <View style={styles.info}>
                <View style={styles.inputContainer}>
                  <Text style={styles.name}>About Yourself</Text>
                  <TextInput
                    paddingVertical={0}
                    minHeight={100}
                    multiline={true}
                    numberOfLines={20}
                    defaultValue={state.about}
                    maxLength={300}
                    placeholder="Give your clients a short bio about yourself, and the service you offer?  Tell them what do you like about your service, and remember honesty goes a long way in the online world 💫"
                    style={styles.input}
                    onChangeText={(text) => {
                      setEdit(true);
                      setState({ ...state, about: text });
                    }}
                  />
                </View>
                <Text style={styles.heading}>Profile details</Text>

                <Input
                  head="User Type"
                  editable={true}
                  defaultValue={state.userType}
                  placeHolder=""
                  onChangeText={(text) => {
                    setEdit(true);
                    setState({ ...state, userType: text });
                  }}
                />
                <Input
                  head="First Name"
                  defaultValue={state.firstName}
                  editable={true}
                  placeHolder=""
                  onChangeText={(text) => {
                    setEdit(true);
                    setState({ ...state, firstName: text });
                  }}
                />
                <Input
                  head="Last Name"
                  defaultValue={state.lastName}
                  editable={true}
                  placeHolder=""
                  onChangeText={(text) => {
                    setEdit(true);
                    setState({ ...state, lastName: text });
                  }}
                />
                <Input
                  head="Email"
                  defaultValue={state.Email}
                  editable={true}
                  placeHolder=""
                  onChangeText={(text) => {
                    setEdit(true);
                    setState({ ...state, Email: text });
                  }}
                />
                <Input
                  head="Phone "
                  defaultValue={state.PhoneNumber}
                  editable={true}
                  placeHolder=""
                  onChangeText={(text) => {
                    setEdit(true);
                    setState({ ...state, PhoneNumber: text });
                  }}
                />
                <Text style={styles.heading}>Website and Account Details</Text>
                <View style={styles.textwrap}>
                  <Entypo name="globe" style={styles.texticon} />
                  <Input
                    head="Website"
                    defaultValue={state.websiteUrl}
                    editable={true}
                    placeHolder="enter url"
                    onChangeText={(text) => {
                      setEdit(true);
                      setState({ ...state, websiteUrl: text });
                    }}
                  />
                </View>
                <View style={styles.textwrap}>
                  <Entypo name="facebook" style={styles.texticon} />
                  <Input
                    head="Facebook"
                    defaultValue={state.facebookUrl}
                    editable={true}
                    placeHolder="enter url"
                    onChangeText={(text) => {
                      setEdit(true);
                      setState({ ...state, facebookUrl: text });
                    }}
                  />
                </View>
                <View style={styles.textwrap}>
                  <AntDesign name="instagram" style={styles.texticon} />
                  <Input
                    head="Instagram"
                    defaultValue={state.instagramUrl}
                    editable={true}
                    placeHolder="enter url"
                    onChangeText={(text) => {
                      setEdit(true);
                      setState({ ...state, instagramUrl: text });
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.heading}>Time Slots</Text>
                  <FlatList
                    item={timeSlotes}
                    renderItem={({ item }) => (
                      <View>
                        <Text> {item.day} </Text>
                        <Text> {item.timing} </Text>
                      </View>
                    )}
                  />

                  <Button
                    onPress={() => setCallCalender(true)}
                    style={{
                      marginTop: 10,
                      backgroundColor: "#f7f7f7",
                      elevation: 0,
                      borderRadius: 5,
                      borderColor: "#a9a9a9",
                      borderWidth: 1,
                    }}
                    full
                  >
                    <Text>Add Timing</Text>
                  </Button>
                  <Calendar
                    setCallCalender={setCallCalender}
                    callCalender={callCalender}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Loader />
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profileInfo: state.profile.profileInformation,
  };
};
export default connect(mapStateToProps, {
  profileInformation,
  updateInformation,
})(Account);
