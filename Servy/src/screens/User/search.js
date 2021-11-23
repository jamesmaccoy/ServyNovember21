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


  const Search = () => {


    return (
      <View style={styles.container}>
       
      
        <View style={styles.searchboxde}>
         <AntDesign name="search1" size={20} color="#000" />
          <TextInput  placeholder="Search..." style={styles.searchtextbox}/>
          <TouchableOpacity  style={styles.searchlastfindlasr}  >
            <Entypo name="cross" size={20}  color="#000" />
            </TouchableOpacity>
        </View>
        <ScrollView  style={styles.liststyleview} >
          <Text style={{marginTop:10,color:'#aaa',}}>Browse by type</Text>
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
  marginTop:50,paddingLeft:15,paddingRight:15,
  },
  liststyleview:{marginBottom:67,},
  liststyleicon:{position:'absolute',left:10,top:15,},
  liststyletext:{textAlign:'center', textTransform:'uppercase',fontSize:18,color:'#60ad7f',fontWeight:'600'},
  liststyle:{textAlign:'center',padding:15,backgroundColor:'#fff',marginTop:5,},
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  },
  searchboxde:{ display: "flex",
  flexDirection: "row",
  alignItems: "center",alignContent:'flex-start',
 paddingLeft:10,
 height:50,
 marginTop:15,
  borderColor:'#999',borderWidth:1,},
  searchtextbox:{height:40,marginLeft:5,},
  searchlastfindlasr:{position:'absolute',right:10,},
})

export default Search;