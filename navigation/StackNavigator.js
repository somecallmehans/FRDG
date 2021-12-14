import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { connect } from "react-redux"
import { View, Text } from "react-native"

import Login from "../screens/Login"
import Signup from "../screens/Signup"
import Home from "../screens/Home"

const stack = createNativeStackNavigator()

const StackNavigator = (props) => {
  const user = props.isLoggedIn
  return (
    <stack.Navigator>
      {
        user ?
        (<>
          <stack.Screen name="Home" component={Home} />
        </>) :
        (<>
          <stack.Screen name="Login" component={Login} />
          <stack.Screen name="Signup" component={Signup} />
        </>)
      }
    </stack.Navigator>
  )
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  }
}

export default connect(mapState)(StackNavigator)
