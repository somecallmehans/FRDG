import { SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';

import { addToFridge, fetchFoods } from '../store/food';

const Search = (props) => {
  const [data, setData] = useState([]);
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(async () => {
    let searchFoods = await props.getFoods();
    setData(searchFoods);
    setFoods(searchFoods);
  } , []);

  const searchFilterFunction = (text) => {
    setQuery(text);

    const newData = foods.filter(item => {
      const itemData = item.foodName.toUpperCase()
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    })
    setData(newData);
  }

  return (
    <View>
      <SearchBar
        onChangeText={(text) => searchFilterFunction(text)}
        lightTheme
        round
        autoCorrect={false}
        placeholder="Search For Food"
        value={query}
      >
      </SearchBar>
      {
        query.length > 0 ? (
          <FlatList
            data={data}
            renderItem={
              ({item}) =>
              <View style={styles.list}>
                <Text style={styles.listText}>{item.foodName}
                  <TouchableOpacity
                    onPress={() => props.addToFridge(item.id, item.expirationTime)}>
                    <Ionicons name="add-circle-outline" size={24} color="black" />
                  </TouchableOpacity>
                </Text>
              </View>
              }
          />
        ) : <></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 15,
    marginTop: 15,
    paddingBottom: 15,
    fontSize: 20,
    backgroundColor: '#FAF9F6',
    borderBottomColor: '#808080',
    borderBottomWidth: 1
  },
  listText: {
    fontSize: 24
  }
})

const mapState = (state) => {
  return {
    foods: state.foods
  }
}

const mapDispatch = (dispatch) => {
  return {
    getFoods: () => dispatch(fetchFoods()),
    addToFridge: (foodId, expirationTime) => dispatch(addToFridge(foodId, expirationTime))
  }
}

export default connect(mapState, mapDispatch)(Search);
