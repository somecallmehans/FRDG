import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";
//Add to db icon
//<Entypo name="add-to-list" size={24} color="black" />
import { MaterialCommunityIcons } from "@expo/vector-icons";
//add to fridge icon
//<MaterialCommunityIcons name="fridge-outline" size={24} color="black" />
import { useController, useForm } from "react-hook-form";

import { InputForm } from "../components/InputField";
import { Input } from "react-native-elements/dist/input/Input";
import { addNewFood } from "../store/food";

const FormModal = (props) => {
  const { control, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  const [addFoodToFridge, setAddFoodToFridge] = useState(false);

  const onSubmit = async (data) => {
    const currentDate = new Date();
    console.log(data, currentDate, addFoodToFridge);
    //const resStatus = await props.submitNewFood(data.foodName, data.expirationTime, currentDate, addFoodToFridge);
  };

  return (
    <View style={styles.containerView}>
      <Modal
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(!show);
        }}
      >
        <View style={styles.containerView}>
          <View style={styles.modalView}>
            <Text>
              Please enter in a food item and days until it expires (whole
              numbers only!)
            </Text>
            <InputForm
              control={control}
              name="foodName"
              placeholder="Food Name"
              type="text"
            />
            <InputForm
              control={control}
              name="expirationTime"
              placeholder="Expiration Time"
              type="number"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPressIn={() => setAddFoodToFridge(false)}
                onPress={handleSubmit(onSubmit)}
              >
                <Entypo name="add-to-list" size={48} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPressIn={() => setAddFoodToFridge(true)}
                onPress={handleSubmit(onSubmit)}
              >
                <MaterialCommunityIcons
                  name="fridge-outline"
                  size={48}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <Pressable onPress={() => setShow(!show)}>
              <Ionicons name="close" size={36} color="black" />
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setShow(true)}>
        <Ionicons name="ios-add" size={36} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.75,
    borderBottomColor: "lightgray",
    borderTopWidth: 0.75,
    borderTopColor: "lightgray",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 15,
  },
  button: {
    marginHorizontal: 20,
  },
});

const mapDispatch = (dispatch) => {
  return {
    submitNewFood: (foodName, expirationTime, currentDate, addToFridge) =>
      dispatch(addNewFood(foodName, expirationTime, currentDate, addToFridge)),
  };
};

export default connect(null, mapDispatch)(FormModal);
