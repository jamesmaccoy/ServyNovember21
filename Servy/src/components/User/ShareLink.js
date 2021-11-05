import React, { useEffect, useState } from "react";
import { Share, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "../../styles/User/ListDestailStyle";
import { connect } from "react-redux";
const ShareLink = ({ dynamicLink, name }) => {

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: `${name}`,
        message: dynamicLink,
        url: dynamicLink,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return <Entypo onPress={onShare} style={styles.close} name="share" />;
};
const mapStateToProps = (state) => {
  return {
    dynamicLink: state.User.dynamicLink,
  };
};
export default connect(mapStateToProps)(ShareLink);
