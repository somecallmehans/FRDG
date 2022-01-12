import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { ListItem, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { useEffect } from "react";
import { fetchFridge, removeFromFridge } from "../store/food";

const windowHeight = Dimensions.get("window").height;

const fridgeDisplay = (props) => {
  const [fridge, setFridge] = useState([]);
  const [day, setDay] = useState("");

  useEffect(async () => {
    await props.getUserFridge();
    const today = new Date();
    setDay(today);
  }, []);

  const setNumberOfDays = (expDate, today) => {
    const date1 = new Date(expDate);
    const date2 = new Date(today);
    const oneDay = 1000 * 60 * 60 * 24;
    const timeDiff = date1.getTime() - date2.getTime();

    return Math.round(timeDiff / oneDay);
  };

  return (
    <View style={styles.container}>
      {props.fridge.length > 0 ? (
        <FlatList
          data={props.fridge}
          extraData={props.fridge}
          renderItem={({ item }) => {
            const expTime = setNumberOfDays(item.dateExpires, day);
            return (
              <ListItem.Swipeable
                bottomDivider
                rightContent={
                  <Button
                    title="Delete"
                    titleStyle={styles.buttonTitle}
                    onPress={() => props.removeFromFridge(item.foodId)}
                    buttonStyle={styles.button}
                  />
                }
                key={item.foodId}
              >
                <ListItem.Content>
                  <ListItem.Title>{item.addedFoodName}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Title right>
                    {expTime > 0 ? expTime : "Expired!"}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem.Swipeable>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View>
          <Text>Add items to fridge to begin!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
  },
  button: {
    backgroundColor: "#FF0000",
    minHeight: "100%",
  },
  buttonTitle: {
    fontWeight: "700",
  },
});

const mapState = (state) => {
  return {
    fridge: state.foods.userFridge,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUserFridge: () => dispatch(fetchFridge()),
    removeFromFridge: (foodId) => dispatch(removeFromFridge(foodId)),
  };
};

export default connect(mapState, mapDispatch)(fridgeDisplay);
