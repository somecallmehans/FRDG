import React, { useLayoutEffect, useState } from "react"
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { useEffect } from "react"
import { fetchFridge } from '../store/food';

const fridgeDisplay = (props) => {
  const [fridge, setFridge] = useState([]);

  useEffect(async() => {
    let userFridge = await props.getUserFridge();
    if(userFridge !== undefined){
      setFridge(userFridge);
    }
  }, [])

  return (
    <View>
      {
        fridge.length > 0 ? (
          <FlatList
            data={fridge}
            renderItem={
              ({item}) =>
                <View>
                  <Text>{item.foodName}</Text>
                </View>
            }
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>Add items to fridge to begin!</Text>
        )
      }
    </View>
  )
}

const mapState = (state) => {
  return {
    fridge: state.foods.userFridge
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUserFridge: () => dispatch(fetchFridge())
  }
}

export default connect(mapState, mapDispatch)(fridgeDisplay)
