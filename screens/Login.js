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
import { useController, useForm } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"
import { connect } from "react-redux"
import { authenticate } from "../store"

import {InputForm} from "../components/InputField";


const Login = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const method = "login"
    const name = null
    const res = await props.submitForm(
      data.email,
      data.password,
      method,
      name
    )

    if (res === 405) {
      Alert.alert("Wrong email password")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <InputForm
          control={control}
          name="email"
          placeholder="Email"
          type="email-address"
        />
        <InputForm
          name="password"
          placeholder="password"
          type="password"
          control={control}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#288cd7",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 0.6,
    width: "100%",
    height: "100%",
    backgroundColor: "#288cd7",
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#288cd7",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  buttonSignUp: {
    backgroundColor: "#f3bae5",
    padding: 10,
    marginTop: 20,
    width: "30%",
  },
})

const mapState = (state) => {
  return {
    name: "login",
    displayName: "Login",
  }
}

const mapDispatch = (dispatch) => {
  return {
    submitForm: (email, password, method) =>
      dispatch(authenticate(email, password, method)),
  }
}

export default connect(mapState, mapDispatch)(Login)
