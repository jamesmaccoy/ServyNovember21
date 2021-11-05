import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import Header from "../../components/User/Header";
import { Text } from "native-base";
import { connect } from "react-redux";
import Loader from "../Auth/Loader";
import {
  getServices,
  getServicesByProvider,
} from "../../store/actions/Services";
import { switchLoader } from "../../store/actions/User";
import ProviderItem from "../../components/User/ProviderItem";
import ProviderModal from "../../components/User/ProviderModal";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const Services = (props) => {
  let navigation = props.navigation;
  let serviceLoader = props.serviceLoader;
  let switchLoading = props.switchLoading;
  let getServicesByProvider = props.getServicesByProvider;
  let providerServices = props.providerServices;
  const [providerModal, setProviderModal] = useState(false);

  useEffect(() => {
    if (providerServices.length === 0) {
      getServicesByProvider();
    }
  }, []);

  return (
    <View>
      {switchLoading && (
        <View
          style={{
            zIndex: 1,
            width: deviceWidth,
            height: deviceHeight,
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Switching...</Text>
        </View>
      )}
      <View style={styles.screen}>
        <Header
          filterButton={false}
          notificationButton={true}
          name="Services"
          navigation={navigation}
          visible={true}
        />
        {serviceLoader ? (
          <View style={styles.loading}>
            <Loader />
          </View>
        ) : (
          <>
            {providerServices.length === 0 ? (
              <View style={styles.noService}>
                <Text style={{ textAlign: "center", color: "#a9a9a9" }}>
                  No Service Available
                </Text>
              </View>
            ) : (
              <View style={{ paddingTop: 30, paddingBottom: 80 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ minHeight: deviceHeight }}>
                    {providerServices.map((data) => {
                      return (
                        <ProviderItem
                          setProviderModal={setProviderModal}
                          pad={0}
                          key={data.id}
                          data={data}
                          navigation={navigation}
                        />
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            )}
          </>
        )}
        <ProviderModal
          navigation={navigation}
          setProviderModal={setProviderModal}
          visible={providerModal}
        />
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    services: state.Service.services,
    serviceLoader: state.Service.serviceLoader,
    categories: state.category.adminCollection,
    switchLoading: state.User.switchLoader,
    checkVisible: state.User.status,
    currentUser: state.Auth.user,
    providerServices: state.Service.userServices,
  };
};
export default connect(mapStateToProps, {
  getServices,
  switchLoader,
  getServicesByProvider,
})(Services);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    paddingTop: 20,
    paddingBottom: 80,
  },

  noService: {
    backgroundColor: "#f7f7f7",
    paddingTop: 80,
    paddingBottom: 20,
    height: deviceHeight,
  },
  proService: {
    backgroundColor: "#f7f7f7",
    height: deviceHeight,
  },
  loading: {
    backgroundColor: "#f7f7f7",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: deviceHeight - 100,
  },
});
