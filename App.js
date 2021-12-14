import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import StackNavigator from './navigation/StackNavigator'
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from 'react-redux';
import store from './store'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
