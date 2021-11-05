import React from "react";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ListDetail = ({ filled, size }) => {
  return (
    <TouchableOpacity>
      <Entypo
        name={filled ? "star" : "star-outlined"}
        size={size}
        color="#fbbc04"
      />
    </TouchableOpacity>
  );
};

export default ListDetail;
