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
import Header from "../../components/User/Header";
import { styles } from "../../styles/User/BookingScreenStyle";
import Carousel from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
import { Entypo, MaterialCommunityIcons,Foundation, Ionicons } from "@expo/vector-icons";
  const navHandler = () => {
    navigation.goBack();
  };


   
const BookingScreen = ({ navigation }) => {
  return (
   <ScrollView  style={styles.wrapper}>
            <View style={styles.viewover}>
              <SafeAreaView style={styles.HeaderContainer}>
                <View style={styles.headerCategory}>
                  <MaterialCommunityIcons
                    style={styles.brief}
                    onPress={navHandler}
                    name="arrow-left"
                  />

                  <Text style={styles.title}>#Booking {"\n"} Listing Name</Text>
                </View>

                <Entypo name="share" size={30} color={"#fff"} />
              </SafeAreaView>
              <View style={styles.borderbot}>
              <View style={styles.statusvi}><Text style={{color:'#fff'}}>Status</Text></View>
                  <View style={styles.viewposr}>
                    <Text style={styles.taskco}>Complete</Text>
                    <View style={styles.bluedot}></View>
                  </View>
              </View>
              <Text style={styles.categoryTitle}>Global status of task. Both parties </Text>
            </View>
<Image source={require('../../../assets/images/plumber.webp')} style={{ height: 500 }}
    resizeMode="cover" />


            <View style={styles.content}>
              <Text style={styles.bookingtitle}>Booking Details</Text>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignSelf: 'stretch' }} >    
                      <View>
                        <Text style={styles.bkheading}>Booking Date:</Text>         
                      </View>
                    </View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <View>
                        <Text style={styles.blacktxt}>June 12 2020</Text>         
                    </View>
                  </View>          
              </View>

              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignSelf: 'stretch' }} >    
                      <View>
                        <Text style={styles.bkheading}>Time Slot:</Text>         
                      </View>
                    </View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <View>
                        <Text style={styles.bkdescdate}>1:00 pm - 6:00 pm</Text>         
                    </View>
                  </View>          
              </View>
              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignSelf: 'stretch' }} >    
                      <View>
                        <Text style={styles.bkheading}>Client:</Text>         
                      </View>
                    </View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <View>
                        <Text style={styles.bkdesc}>jimmy MaclacHlan thankyou.digital@gmail.com +27796125991</Text>         
                    </View>
                  </View>          
              </View>
              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignSelf: 'stretch' }} >    
                      <View>
                        <Text style={styles.bkheading}>Sburb:</Text>         
                      </View>
                    </View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <View>
                        <Text style={styles.bkdesc}>Pinelands</Text>         
                    </View>
                  </View>          
              </View>
              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignSelf: 'stretch' }} >    
                      <View>
                        <Text style={styles.bkheading}>Address:</Text>         
                      </View>
                    </View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <View>
                        <Text style={styles.bkdesc}>82 Hargrave road, Llandundo 7806 ZA</Text>         
                    </View>
                  </View>          
              </View>
              <View style={styles.titlereviewbtn}>
                
                  <TouchableOpacity
                    style={{paddingBottom:70,position:'relative',width:'100%'}}
                  >
                    <View style={styles.buttonaddr}>
                      <Entypo name={"edit"} size={26} color={'#fff'} />
                      <Text
                        style={{
                          fontSize: 18,
                          paddingLeft: 5,
                          color: "#ffffff",
                          textTransform:'uppercase'
                        }}
                      >
                        Edit
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignSelf: 'stretch' }} >    
                      <View>
                        <Text style={styles.bkheading}>Booking Request On:</Text>         
                      </View>
                    </View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <View>
                        <Text style={styles.bkdesc}>June 11 2020 at 2:37 pm</Text>         
                    </View>
                  </View>          
              </View>
          
               <TouchableOpacity style={styles.fawbtn}>
               
               <Text style={styles.iconinbtn}>
               <Ionicons name="ios-hand" color={'#61ad7f'} size={40}/>
               </Text>
               <Text  style={styles.textinbtn}>
               Frequently Asked Question
               </Text>

               </TouchableOpacity>
               <TouchableOpacity style={styles.fawbtn}>
               
               <Text style={styles.iconinbtn}>
               <Foundation name="telephone" color={'#61ad7f'} size={40}/>
               </Text>
               <Text  style={styles.textinbtn}>
               Talk
               </Text>

               </TouchableOpacity>

              <View>
                <Text style={styles.services}>Location</Text>
                <Image source={require('../../../assets/images/location.jpeg')} style={{width:'100%',height:230}} />      
              </View>
              <View>
                
                
              </View>
            </View>

           
          </ScrollView>
  );
};

export default BookingScreen;

