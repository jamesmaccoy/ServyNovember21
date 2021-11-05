import React  from "react";
import { Card, Paragraph } from "react-native-paper";
import { View, Text, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { styles } from "../../styles/Admin/listingItemStyle";
import { currentOption } from "../../store/actions/Admin";
import { connect } from "react-redux";

const ListingItem = ({ data, setProviderModal, currentOption }) => {
  const handlePreview = () => {
    currentOption(data);
    setProviderModal(true);
  };

  return (
    <View style={{ paddingBottom: 20 }}>
      <Card style={{ height: 280 }}>
        <ImageBackground
          style={{ flex: 1 }}
          source={{ uri: data.imagesUrl[0] }}
        >
          <View
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
                  <Entypo size={20} color="#fff" name="dots-three-vertical" />
                </TouchableOpacity>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ImageBackground>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Card.Content style={styles.left}>
            <Card.Content style={{ paddingLeft: 0, paddingRight: 0 }}>
              <MaterialCommunityIcons style={styles.updateIcon} name="update" />
              <Paragraph style={styles.time}>
                {data.createdAt.toDate().toLocaleTimeString("en-US")} {"\n"}
                {data.createdAt.toDate().toLocaleDateString("en-US")}
              </Paragraph>
            </Card.Content>
            <Card.Content
              style={{ fontSize: 20, paddingLeft: 15, paddingTop: 10 }}
            >
              <Paragraph style={styles.center}>{data.providerName}</Paragraph>
              <Paragraph style={{ color: "#a9a9a9", maxWidth: 90 }}>
                {data.location}
              </Paragraph>
            </Card.Content>
          </Card.Content>
        </View>
      </Card>
    </View>
  );
};

export default connect("", { currentOption })(ListingItem);
