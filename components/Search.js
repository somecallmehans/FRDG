import { SearchBar, ListItem } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FridgeDisplay from "./FridgeDisplay";
import FormModal from "./Modal";

import { addToFridge, fetchFoods, fetchFridge } from "../store/food";
const windowHeight = Dimensions.get("window").height;

const Search = (props) => {
  const [data, setData] = useState([]);
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(async () => {
    let searchFoods = await props.getFoods();
    setData(searchFoods);
    setFoods(searchFoods);
  }, []);

  const searchFilterFunction = (text) => {
    setQuery(text);

    const newData = foods.filter((item) => {
      const itemData = item.foodName.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.searchContainer}>
          <SearchBar
            onChangeText={(text) => searchFilterFunction(text)}
            containerStyle={{ width: "90%", backgroundColor: "white" }}
            lightTheme
            round
            autoCorrect={false}
            placeholder="Search For Food"
            value={query}
          ></SearchBar>
          <FormModal />
        </View>
      </View>
      {query.length > 0 ? (
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <ListItem bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{item.foodName}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Content right>
                    <TouchableOpacity
                      onPress={() => {
                        props.addToFridge(
                          item.id,
                          item.expirationTime,
                          item.foodName
                        );
                      }}
                    >
                      <Ionicons
                        name="add-circle-outline"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  </ListItem.Content>
                </ListItem>
              )}
            />
          </View>
        </View>
      ) : (
        <FridgeDisplay />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  modalContainer: {
    flex: 1,
  },
  modal: {
    height: windowHeight,
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
  },
});

const mapState = (state) => {
  return {
    foods: state.foods,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getFoods: () => dispatch(fetchFoods()),
    addToFridge: (foodId, expirationTime, foodName) =>
      dispatch(addToFridge(foodId, expirationTime, foodName)),
    getUserFridge: () => dispatch(fetchFridge()),
  };
};

export default connect(mapState, mapDispatch)(Search);
