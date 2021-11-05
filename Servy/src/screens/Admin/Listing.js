import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import Header from "../../components/Admin/Header";
import { styles } from "../../styles/Admin/ListingStyle";
import ListingItem from "../../components/Admin/ListingItem";
import { providerService } from "../../store/actions/Admin";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import ListingModel from "../../components/Admin/ListingModel";
import Loader from "../../screens/Auth/Loader";
import SelectModal from "../../components/Admin/SelectModal";

const Listing = ({ ...props }) => {
  let navigation = props.navigation;
  let providerService = props.providerService;
  let servicesList = props.servicesList;
  let loading = props.loading;
  const [providerModal, setProviderModal] = useState(false);
  const [select, setSelect] = useState(false);

  useEffect(() => {
    providerService();
  }, []);

  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <Loader />
        </View>
      ) : (
        <ScrollView style={styles.screen}>
          <Header visible={false} navigation={navigation} name="Listing" />
          <View style={styles.list}>
            {servicesList.map((item) => (
              <TouchableOpacity key={item.id} activeOpacity={1}>
                <ListingItem
                  setSelect={setSelect}
                  setProviderModal={setProviderModal}
                  data={item}
                  key={item.id}
                />
              </TouchableOpacity>
            ))}
          </View>
          {providerModal && (
            <ListingModel
              setProviderModal={setProviderModal}
              visible={providerModal}
              navigation={navigation}
              setSelect={setSelect}
            />
          )}
          <SelectModal
            setProviderModal={setProviderModal}
            select={select}
            setSelect={setSelect}
          />
        </ScrollView>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    servicesList: state.Admin.servicesList,
    users: state.Admin.users,
    loading: state.Admin.adminLoading,
  };
};
export default connect(mapStateToProps, { providerService })(Listing);
