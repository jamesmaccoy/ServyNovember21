import React, { useState } from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native'

import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";


  const Search = ({ modalSearch,
  setSearchVisible}) => {


    return (
      <View style={styles.container}>
       
      
        <View style={styles.searchboxde}>
         <AntDesign name="search1" size={20} color="#000" />
          <TextInput  placeholder="Search..." style={styles.searchtextbox}/>
          <TouchableOpacity  style={styles.searchlastfindlasr}  onPress={() => setSearchVisible(!modalSearch)} >
            <Entypo name="cross" size={20}  color="#000" />
            </TouchableOpacity>
        </View>
        <View style={{marginTop:50}}>
          <Text style={{marginTop:10,color:'#aaa',}}>Browse by type</Text>
        </View>
        <ScrollView  style={styles.liststyleview} >

            <View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Fitness(3)</Text>
            </View>
            <View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Art and Craft(3)</Text>
            </View>
            <View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Plumber(3)</Text>
            </View>
            <View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Service Provider(3)</Text>
            </View>
            <View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Fitness(3)</Text>
            </View>
            <View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Fitness(3)</Text>
            </View>
            <View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Fitness(3)</Text>
            </View><View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Service Provider(3)</Text>
            </View>
            <View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Fitness(3)</Text>
            </View>
            <View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Fitness(3)</Text>
            </View>
            <View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Fitness(3)</Text>
            </View><View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Service Provider(3)</Text>
            </View>
            <View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Fitness(3)</Text>
            </View>
            <View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Fitness(3)</Text>
            </View>
            <View style={styles.liststyle}>
              <Ionicons name="build-sharp" size={20} style={styles.liststyleicon} color="#000" />
              <Text style={styles.liststyletext}>Fitness(3)</Text>
            </View>
        </ScrollView>
      </View>
    )
  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'rgba(52, 52, 52, 0.8)',
  paddingTop:50,paddingLeft:15,paddingRight:15,zIndex:99,top:0,
  },
  liststyleview:{marginBottom:144,},
  liststyleicon:{position:'absolute',left:10,top:15,},
  liststyletext:{textAlign:'center', textTransform:'uppercase',fontSize:18,color:'#60ad7f',fontWeight:'600'},
  liststyle:{textAlign:'center',padding:15,backgroundColor:'#fff',marginTop:5,},
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  },
  searchboxde:{ display: "flex",backgroundColor:'#fff',
  flexDirection: "row",
  alignItems: "center",alignContent:'flex-start',
 paddingLeft:10,
 height:60,borderRadius:5,
 marginTop:15,
  borderColor:'#999',borderWidth:1,},
  searchtextbox:{height:40,marginLeft:5,},
  searchlastfindlasr:{position:'absolute',right:10,},
})

export default Search;