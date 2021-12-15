import { SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"
import { View, Text, FlatList, StyleSheet } from "react-native"

import { fetchFoods } from '../store/food';
import { useLinkProps } from '@react-navigation/native';

const Search = (props) => {
  const [data, setData] = useState([]);
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("");
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);

  //console.log("PROPS IN SEARCH:", props.homeFoods.length);
  useEffect(() => {
    setFoods(props.homeFoods);
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
      />
      {
        query.length > 0 ? (
          <FlatList
        data={data}
        renderItem={
          ({item}) =>
          <Text style={styles.List}>{item.foodName}</Text>
        }
      />
        ) : <></>
      }

    </View>
  )
}
/*
const mapState = (state) => {
  return {
    foods: state.foods
  }
}

const mapDispatch = (dispatch) => {
  return {
    getFoods: () => dispatch(fetchFoods())
  }
} */

const styles = StyleSheet.create({
  List: {
    paddingLeft: 15,
    marginTop: 15,
    paddingBottom: 15,
    fontSize: 20,
    borderBottomColor: '#26a69a',
    borderBottomWidth: 1
  }
})

export default /* connect(mapState, mapDispatch) */(Search);
