import React, { useState } from "react";
import { Text, StyleSheet, View , Image} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Avatar from "../../../assets/images/user1.jpeg";
const Review = ({ data }) => {
  return (
    <View  style={styles.reviewContainer}>
      <View style={styles.reviewListHead}>
        {data.photoURL !== "" ? (
          <Image style={styles.avatarImage} source={{ uri: data.photoURL }} />
        ) : (
          <Image style={styles.avatarImage} source={Avatar} />
        )}
        <View style={{ paddingLeft: 10, flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "#404145",
            }}
          >
            {data.Name}
          </Text>

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
      </View>
      <View style={styles.reviewContent}>
        <Text
          style={{
            color: "#404145",
            paddingTop: 0,
            paddingBottom: 10,
          }}
        >
          {data.comment}
        </Text>
        <Text
          style={{
            paddingTop: 20,
            color: "#a9a9a9",
          }}
        >
          Published at:
          {data.createdAt.toDate().toLocaleDateString("en-US")}
        </Text>
      </View>
    </View>
  );
};
export default Review;

const styles = StyleSheet.create({
  reviewListHead: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#a9a9a9",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  reviewContainer: {
    marginTop: 20,
    padding: 10,
    borderColor: "#a9a9a9",
    borderWidth: 1,
    paddingBottom: 10,
  },
  reviewContent: {
    paddingTop: 10,
  },
  reviewsList: {
    paddingTop: 0,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
