import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Header from "../../components/Admin/Header";
import CategoryList from "../../components/Admin/CategoryList";
import { styles } from "../../styles/Admin/categoriesStyle";
import { connect } from "react-redux";
import { getAdminCategory } from "../../store/actions/Category";
import { ScrollView } from "react-native-gesture-handler";
const Users = ({ navigation, getAdminCategory, categories }) => {
  useEffect(() => {
    getAdminCategory();
    setNewCategories(categories);
  }, []);
  const [newCatgories, setNewCategories] = useState([]);
  useEffect(() => {
    setNewCategories(categories);
  }, [categories]);
  return (
    <View style={styles.screen}>
      <Header visible={true} navigation={navigation} name="Categories" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {newCatgories.map((data, index) => (
            <CategoryList key={data.id} data={data} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    categories: state.category.adminCollection,
  };
};
export default connect(mapStateToProps, { getAdminCategory })(Users);
