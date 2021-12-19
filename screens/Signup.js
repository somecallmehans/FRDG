import React from "react"
import { useController, useForm } from "react-hook-form"
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
import { connect } from "react-redux"
import { InputForm } from "../components/InputField"
import { authenticate } from "../store"


const Signup = (props) => {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const method = "signup"
    const resStatus = await props.submitForm(data.email, data.password, method, data.name)

    if (resStatus === 200) {
      navigation.navigate("Home")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <InputForm
          control={control}
          name="name"
          placeholder="Name"
          type="name"
        />
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
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    width: 250,
    borderWidth: 2,
    padding: 10,
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
})

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
    auth: state.auth,
  }
}

const mapDispatch = (dispatch) => {
  return {
    submitForm: (userEmail, password, method, name) =>
      dispatch(authenticate(userEmail, password, method, name)),
  }
}

export default connect(mapSignup, mapDispatch)(Signup);
