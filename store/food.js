import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from 'expo-constants';
const BASE_URL = Constants.manifest.extra.BASE_URL;

const TOKEN = "token"
const SET_FOODS = "SET_FOODS";
const ADD_TO_FRIDGE = "ADD_TO_FRIDGE";

export const setFoods = (foods) => {
  return {
    type: SET_FOODS,
    foods
  }
}

export const _addToFridge = (food) => {
  return {
    type: ADD_TO_FRIDGE,
    food
  }
}

export const addToFridge = (foodId, expirationTime) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem(TOKEN);
    const res = await axios.post(`http://${BASE_URL}/api/food/${foodId}`, {
      expirationTime: expirationTime
    }, {
      headers: {
        authorization: token
      }
    })
    dispatch(_addToFridge(res.data))
  } catch (error) {
    console.log(error);
  }
}

export const fetchFoods = () => {
  return async (dispatch) => {
    const res = await axios.get(`http://${BASE_URL}/api/food`)
    dispatch(setFoods(res.data));
  }
}

const initialState = {
  foods: [],
  userFridge: []
}

export default function (state = initialState, action){
  switch(action.type){
    case SET_FOODS:
      return {
        ...state,
        foods: action.foods
      }
    case ADD_TO_FRIDGE:
      return {
        ...state,
        userFridge: [...state.userFridge, action.food]
      }
    default:
      return state
  }
}
