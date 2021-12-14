import { SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"

import { fetchFoods } from '../store/food';

const SearchBar = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [food, setFood] = useState([]);


  return (
    <View>

    </View>
  )
}

mapState = (state) => {
  return {
    foods: state.foods
  }
}

mapDispatch = (dispatch) => {
  return {
    getFoods: () => dispatch(fetchFoods())
  }
}

export default connect(mapState, mapDispatch)(SearchBar);
