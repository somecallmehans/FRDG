import React from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Button,
  Image,
  TouchableOpacity,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useNavigation } from "@react-navigation/native"


const Signup = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <View>
        <Text>
          Sign Up!
        </Text>
      </View>
    </SafeAreaView>
  )

}
