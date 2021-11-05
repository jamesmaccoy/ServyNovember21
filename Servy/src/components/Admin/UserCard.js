import * as React from "react";
import { Button, Card, Paragraph } from "react-native-paper";
import { View, TouchableOpacity, Image } from "react-native";
import { styles } from "../../styles/Admin/UserCardStyle";

const UserCard = ({ data }) => {
  return (
    <View style={styles.card}>
      <Card>
        <Card.Content style={styles.content}>
          <Card.Content style={styles.info}>
            <Paragraph>{data.Name}</Paragraph>
            <Paragraph>{data.Email} </Paragraph>
            <Paragraph>{data.PhoneNumber && data.PhoneNumber}</Paragraph>
          </Card.Content>
          <Card.Actions style={styles.action}>
            <TouchableOpacity>
              {data.photoURL !== '' ? (
                <Image style={styles.image} source={{ uri: data.photoURL }} />
              ) : (
                <Image
                  style={styles.image}
                  source={require("../../../assets/images/user1.jpeg")}
                />
              )}
            </TouchableOpacity>
            <Button style={{paddingRight: 10}}>Ok</Button>
          </Card.Actions>
        </Card.Content>
      </Card>
    </View>
  );
};

export default UserCard;
