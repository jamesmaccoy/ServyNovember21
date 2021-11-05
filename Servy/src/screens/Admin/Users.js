import React, { useEffect } from "react";
import { View , ScrollView } from "react-native";
import UserCard from "../../components/Admin/UserCard";
import Header from "../../components/Admin/Header";
import { styles } from "../../styles/Admin/userStyle";
import { connect } from "react-redux";
import { getUsers } from "../../store/actions/Admin";
const Users = ({ navigation, getUsers, users }) => {
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <ScrollView style={styles.screen}>
      <Header visible={false} navigation={navigation} name="Users" />
      <View style={{paddingBottom: 60}}>
      {users.map((data) => (
        <UserCard key={data.id} data={data} />
      ))}
      </View>
    </ScrollView>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.Admin.users,
  };
};
export default connect(mapStateToProps, { getUsers })(Users);
