import React, { useLayoutEffect, useState } from "react"
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { useEffect } from "react"
import { fetchFoods, fetchFridge } from '../store/food';

import Search from "../components/Search"

const Home = (props) => {
  const [homeFoods, setHomeFoods] = useState([]);
  const [userFridge, setUserFridge] = useState([]);

  useEffect(async () => {
    let data = await props.getFoods();
    setHomeFoods(data);
  }, [userFridge]);

  return (
    <View>
      <Search homeFoods={homeFoods}/>
      <Text>WELCOME HOME!</Text>
    </View>
  )
}

const mapState = (state) => {
  return {
    auth: state.auth,
    foods: state.foods,
    fridge: state.foods.userFridge
  }
}

const mapDispatch = (dispatch) => {
  return {
    getFoods: () => dispatch(fetchFoods()),
    getUserFridge: () => dispatch(fetchFridge())
  }
}

export default connect(mapState, mapDispatch)(Home)
