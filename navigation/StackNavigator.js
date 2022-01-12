import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";

import { logout } from "../store/auth";

const stack = createNativeStackNavigator();

const StackNavigator = (props) => {
  const user = props.isLoggedIn;
  return (
    <stack.Navigator>
      {user ? (
        <>
          <stack.Screen
            name="Home"
            component={Home}
            options={{
              headerLeft: () => (
                <TouchableOpacity onPress={() => props.signOut()}>
                  <SimpleLineIcons name="logout" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
        </>
      ) : (
        <>
          <stack.Screen name="Login" component={Login} />
          <stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </stack.Navigator>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    signOut: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(StackNavigator);
