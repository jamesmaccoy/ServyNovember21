import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import Header from "../../components/User/Header";
import ListingItem from "../../components/User/ListingItem";
import { Text } from "native-base";
import { connect } from "react-redux";
import Loader from "../Auth/Loader";
import {
  getServices,
  getServicesByCategory,
} from "../../store/actions/Services";
import Filter from "../../components/User/Filter";
import { getAdminCategory } from "../../store/actions/Category";
import MutipleSelect from "../../components/User/Multiple";
let deviceHeight = Dimensions.get("window").height;

const Services = ({ ...props }) => {
  let navigation = props.navigation;
  let getServices = props.getServices;
  let getServicesByCategory = props.getServicesByCategory;
  let getAdminCategory = props.getAdminCategory;
  let categories = props.categories;
  let filterServices = props.filterServices;
  let services = props.services;

  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filterCategory, setFilterCategory] = useState([]);
  const [newServices, setNewServices] = useState([]);
  const [getAgain, setGetAgain] = useState(false);

  useEffect(() => {
    getAdminCategory();
    setGetAgain(false);
  }, []);
  useEffect(() => {
    setLoading(props.serviceLoader);
  }, [props.serviceLoader]);

  useEffect(() => {
    if (props.route.params.id === 2) {
      if (props.route.params.state) {
        getServicesByCategory(
          props.route.params.state,
          props.route.params.attributes
        );
      } else {
        if (services.length !== 0) {
          getServices();
        }
      }
    }
    if (props.route.params.id === 3) {
      if (services.length !== 0) {
        getServices();
      }
    }
  }, [props.route]);

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    if (props.route.params.id === 2) {
      setGetAgain(false);
      setNewServices(filterServices);
    }
    if (props.route.params.id === 3) {
      setNewServices(services);
    }
    if (filterCategory.length !== 0) {
      setNewServices(services);
    }
    if (getAgain) {
      setNewServices(services);
    }
  }, [filterCategory, filterServices, services]);

  return (
    <View style={styles.screen}>
      <Header
        filterButton={true}
        notificationButton={false}
        name="Services"
        navigation={navigation}
        visible={true}
        handleFilter={handleFilter}
      />
      <MutipleSelect
        setFilterCategory={setFilterCategory}
        categories={categories}
        setGetAgain={setGetAgain}
      />

      {loading ? (
        <View style={styles.loaderStyle}>
          <Loader />
        </View>
      ) : (
        <>
          {newServices.length === 0 ? (
            <View
              style={{
                backgroundColor: "#f7f7f7",
                paddingTop: 100,
                paddingBottom: 20,
                flexDirection: "row",
                justifyContent: "center",
                height: deviceHeight,
              }}
            >
              <Text style={{ color: "#9c9c9c" }}>No Service Available</Text>
            </View>
          ) : (
            <View style={styles.list}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingTop: 10, paddingBottom: 20 }}>
                  <Text style={{ color: "#9c9c9c" }}>Search Results</Text>
                </View>
                <View style={{ minHeight: deviceHeight }}>
                  {newServices.map((data) => {
                    if (filterCategory.includes(data.category)) {
                      return (
                        <ListingItem
                          pad={0}
                          key={data.id}
                          data={data}
                          navigation={navigation}
                        />
                      );
                    }
                    if (filterCategory.length === 0) {
                      return (
                        <ListingItem
                          pad={0}
                          key={data.id}
                          data={data}
                          navigation={navigation}
                        />
                      );
                    }
                  })}
                </View>
              </ScrollView>
            </View>
          )}
        </>
      )}
      <Filter
        navigation={navigation}
        setShowFilter={setShowFilter}
        modalVisible={showFilter}
        route={props.route}
      />
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    filterServices: state.Service.filterServices,
    serviceLoader: state.Service.serviceLoader,
    categories: state.category.adminCollection,
    services: state.Service.services,
  };
};
export default connect(mapStateToProps, {
  getServices,
  getServicesByCategory,
  getAdminCategory,
})(Services);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    paddingTop: 35,
  },
  list: {
    marginBottom: 90,
    paddingTop: 20,
  },
  loaderStyle: {
    backgroundColor: "#f7f7f7",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: deviceHeight - 100,
  },
});
