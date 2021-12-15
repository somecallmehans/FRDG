import React, { useLayoutEffect } from "react"
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
import { fetchFoods } from '../store/food';

import Search from "../components/Search"

const Home = (props) => {

  useEffect(() => {
    props.getFoods();
  }, []);

  return (
      <View>
        <Search homeFoods={props.foods.foods}/>
        <Text>WELCOME HOME!</Text>
      </View>
  )
}

const mapState = (state) => {
  return {
    auth: state.auth,
    foods: state.foods
  }
}

const mapDispatch = (dispatch) => {
  return {
    getFoods: () => dispatch(fetchFoods())
  }
}

export default connect(mapState, mapDispatch)(Home)
