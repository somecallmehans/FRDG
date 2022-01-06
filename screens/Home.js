import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { useEffect } from "react";

//import FridgeDisplay from "../components/FridgeDisplay";
import Search from "../components/Search";

const Home = () => {
  return (
    <View>
      <Search />
    </View>
  );
};

export default Home;
