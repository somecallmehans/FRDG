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

const Home = (props) => {
  console.log(props.auth);
  return (
    <SafeAreaView>
      <View>
        <Text>WELCOME HOME!</Text>
      </View>
    </SafeAreaView>
  )
}

const mapState = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapState)(Home)
