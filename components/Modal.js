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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";

import { useController, useForm } from "react-hook-form";

import { InputForm } from "../components/InputField";
import { Input } from "react-native-elements/dist/input/Input";
import { addNewFood, fetchFoods } from "../store/food";

const FormModal = (props) => {
  const { control, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const [addFoodToFridge, setAddFoodToFridge] = useState(false);
  const [clicks, setClicks] = useState(0);

  const onSubmit = async (data) => {
    const currentDate = new Date();

    const resStatus = await props.submitNewFood(
      data.foodName,
      data.expirationTime,
      currentDate,
      addFoodToFridge
    );
    reset({
      foodName: "",
      expirationTime: "",
    });
    setClicks(clicks + 1);
  };

  const closeActions = () => {
    setShow(!show);
    if (clicks > 0) {
      setClicks(0);
    }
  };

  return (
    <View style={styles.containerView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(!show);
        }}
      >
        <View style={styles.containerView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => closeActions()}
              style={styles.closeButton}
            >
              <MaterialCommunityIcons
                name="close-thick"
                size={36}
                color="black"
              />
            </Pressable>
            <Text style={styles.modalText}>
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
              {/*               <TouchableOpacity
                style={styles.button}
                onPressIn={() => setAddFoodToFridge(false)}
                onPress={handleSubmit(onSubmit)}
                onPressOut={() => setClicks(clicks + 1)}
              >
                <MaterialCommunityIcons
                  name="food-variant"
                  size={48}
                  color="black"
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.button}
                onPressIn={() => setAddFoodToFridge(true)}
                onPress={handleSubmit(onSubmit)}
                onPressOut={() => setClicks(clicks + 1)}
              >
                <MaterialCommunityIcons
                  name="fridge-outline"
                  size={48}
                  color="black"
                />
              </TouchableOpacity>
            </View>
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
  closeButton: {
    position: "absolute",
    right: 20,
    top: 5,
  },
  modalText: {
    margin: 15,
  },
});

const mapDispatch = (dispatch) => {
  return {
    submitNewFood: (foodName, expirationTime, currentDate, addToFridge) =>
      dispatch(addNewFood(foodName, expirationTime, currentDate, addToFridge)),
    getFoods: () => dispatch(fetchFoods()),
  };
};

export default connect(null, mapDispatch)(FormModal);
