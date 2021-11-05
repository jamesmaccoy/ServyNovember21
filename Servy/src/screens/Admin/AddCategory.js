import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../styles/Admin/categoriesStyle";
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from "@expo/vector-icons";
import CheckBoxList from "../../components/Generic/CheckBoxList";
import { connect } from "react-redux";
import {
  AddCategory,
  updateCategory,
  deleteCategory,
} from "../../store/actions/Category";
import { Button } from "react-native-paper";
import Input from "../../components/Generic/AccountInput";

const AddNewCategory = ({ ...props }) => {
  let navigation = props.navigation;
  let AddCategory = props.AddCategory;
  let updateCategory = props.updateCategory;
  let deleteCategory = props.deleteCategory;

  const [state, setState] = useState({
    id: null,
    value: "",
    label: "",
  });

  const [select, setSelect] = useState(false);
  useEffect(() => {
    if (
      props.route.params.key != 1 &&
      props.route.params.data.other === false
    ) {
      setSelect(true);
      setState({
        ...state,
        value: props.route.params.data.value,
        label: props.route.params.data.label,
      });
      setOther(false);
      setVisible(false);
      setChekbox(props.route.params.data.features);
    }
    if (props.route.params.key != 1 && props.route.params.data.other === true) {
      setSelect(true);
      setOther(true);
      setVisible(true);
      setState({
        ...state,
        value: props.route.params.data.value,
        label: props.route.params.data.label,
      });
      setChekbox(props.route.params.data.features);
    }
  }, []);
  const navigationHandler = () => {
    navigation.goBack();
  };
  const [category, setCategory] = useState("");
  const [check, setCheck] = useState(true);
  const [visible, setVisible] = useState(false);
  const [other, setOther] = useState(false);

  const [checkboxPicker, setChekbox] = useState([
    {
      label: "Delivery Included",
      id: "DeliveryIncluded",
      state: false,
      attributeState: false,
    },
    {
      label: "Responds Immediately",
      id: "RespondsImmediately",
      state: false,
      attributeState: false,
    },
    {
      label: "Works Remotely",
      id: "WorksRemotely",
      state: false,
      attributeState: false,
    },
    {
      label: "We come to you",
      id: "Wecometoyou",
      state: false,
      attributeState: false,
    },
    {
      label: "Work from Home",
      id: "WorkfromHome",
      state: false,
      attributeState: false,
    },
    {
      label: "You come to me",
      id: "Youcometome",
      state: false,
      attributeState: false,
    },
  ]);
  const handleUpdateCategory = () => {
    updateCategory(category, checkboxPicker, props.route.params.data.id);
    navigation.goBack();
  };
  const handleDeleteCategory = () => {
    deleteCategory(props.route.params.data.id);
    navigation.goBack();
  };

  const handleCategory = () => {
    subCategory.unshift(category);
    AddCategory(category, checkboxPicker);
    navigation.goBack();
  };
  const [newFeature, setNewFeature] = useState({
    label: "",
    status: false,
  });
  const handleAddFeatures = () => {
    if (newFeature.label !== "") {
      setChekbox(checkboxPicker.concat(newFeature));
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.screen}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, padding: 0, margin: 0 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={navigationHandler}>
            <AntDesign name={"arrowleft"} size={25} color={"#000"} />
          </TouchableOpacity>
          {select ? (
            <TouchableOpacity onPress={handleUpdateCategory} style={styles.btn}>
              <Text>save and exit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleCategory} style={styles.btn}>
              <Text>save</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.create}>
          <Text style={styles.heading}>Category Name</Text>
          <View style={{ paddingTop: 20 }}>
            <Text style={{ color: "#a9a9a9", paddingBottom: 5 }}>Name</Text>
            <DropDownPicker
              items={subCategory}
              defaultValue={other ? "other" : state.value}
              placeholder="select categories"
              containerStyle={{ height: 50 }}
              style={{ backgroundColor: "#f7f7f7", borderColor: "#a9a9a9" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#f7f7f7" }}
              onChangeItem={(item) => {
                if (item.value !== "other") {
                  setCategory({
                    ...category,
                    value: item.value,
                    label: item.label,
                    other: false,
                  });
                  setVisible(false);
                }
                if (item.value === "other") {
                  setVisible(true);
                }
              }}
            />
          </View>
          {visible && (
            <View style={{ paddingBottom: 20 }}>
              <Input
                name="ParentCategory"
                head="Category Name"
                placeHolder="e.g Electrition"
                defaultValue={state.label}
                onChangeText={(text) =>
                  setCategory({
                    ...category,
                    value: text.replace(/\s/g, ""),
                    label: text,
                    other: true,
                  })
                }
              />
            </View>
          )}
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.heading}>
              Assign Features for This Category
            </Text>
            <View style={styles.checkboxList}>
              <FlatList
                style={{ flexDirection: "row" }}
                numColumns={3}
                data={checkboxPicker}
                renderItem={({ item, index }) => {
                  return (
                    <CheckBoxList
                      key={item.value}
                      text={item.label}
                      value={item.state}
                      checkboxPicker={checkboxPicker}
                      index={index}
                      setCheck={setCheck}
                      id={item.id}
                    />
                  );
                }}
              />
            </View>
          </View>

          <View style={{ paddingBottom: 20 }}>
            <Input
              name="Category"
              onChangeText={(text) =>
                setNewFeature({
                  ...newFeature,
                  label: text,
                  id: text.replace(/\s/g, ""),
                  state: false,
                  attributeState: false,
                })
              }
              head="Feature Name"
              placeHolder="e.g Delivery Included"
            />
          </View>

          <View style={{ paddingBottom: 40 }}>
            <TouchableOpacity activeOpacity={0.8}>
              <Button
                onPress={handleAddFeatures}
                full
                style={{
                  color: "#fff",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#5c9b84",
                }}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Add Features
                </Text>
              </Button>
            </TouchableOpacity>
          </View>
          {props.route.params.key != 1 && (
            <TouchableOpacity
              onPress={handleDeleteCategory}
              activeOpacity={0.8}
            >
              <Button
                full
                style={{
                  color: "#fff",
                  backgroundColor: "#5c9b84",
                }}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Delete
                </Text>
              </Button>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = (state) => {
  return {
    deleteMessage: state.category.deleteMessage,
  };
};
export default connect(mapStateToProps, {
  AddCategory,
  updateCategory,
  deleteCategory,
})(AddNewCategory);

const subCategory = [
  {
    label: "Plumber",
    value: "Plumber",
  },
  {
    label: "Handyman",
    value: "Handyman",
  },
  {
    label: "Painter",
    value: "Painter",
  },
  {
    label: "Electrition",
    value: "Electrition",
  },
  {
    label: "Renovator",
    value: "Renovator",
  },
  {
    label: "Water Proffing Specialist",
    value: "WaterProffingSpecialist",
  },
  {
    label: "Carpenter",
    value: "Carpenter",
  },
  {
    label: "Administrative Assistant",
    value: "AdministrativeAssistant",
  },
  {
    label: "Mover",
    value: "Mover",
  },
  {
    label: "Tax and Accounting Specialist",
    value: "TaxandAccountingSpecialist",
  },
  {
    label: "Carpet Cleaner",
    value: "CarpetCleaner",
  },
  {
    label: "Graphic Designer",
    value: "GraphicDesigner",
  },
  {
    label: "Shuttle Service",
    value: "ShuttleService",
  },
  {
    label: "Social Media and Vedio Marketer",
    value: "SocialMediaandVedioMarketer",
  },
  {
    label: "Air Conditioning",
    value: "AirConditioning",
  },
  {
    label: "DSTV Specialist",
    value: "DSTVSpecialist",
  },
  {
    label: "Lock Smith",
    value: "LockSmith",
  },
  {
    label: "Web Developer",
    value: "Web Developer",
  },
  {
    label: "Refrigrator Repairer",
    value: "RefrigratorRepairer",
  },
  {
    label: "Chef",
    value: "Chef",
  },
  {
    label: "Yoga Instructor",
    value: "YogaInstructor",
  },
  {
    label: "Therapist",
    value: "Therapist",
  },
  {
    label: "Gas Installation",
    value: "GasInstallation",
  },
  {
    label: "other",
    value: "other",
  },
];
