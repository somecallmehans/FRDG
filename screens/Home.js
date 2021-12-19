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

import Search from "../components/Search"
import FridgeDisplay from "../components/FridgeDisplay"

const Home = () => {

  return (
    <View>
      <Search />
      <FridgeDisplay />
    </View>
  )
}

/* const mapState = (state) => {
  return {
    auth: state.auth,
    fridge: state.foods.userFridge
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUserFridge: () => dispatch(fetchFridge())
  }
} */

export default /* connect(mapState, mapDispatch) */Home
