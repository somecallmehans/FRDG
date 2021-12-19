import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from 'expo-constants';
const BASE_URL = Constants.manifest.extra.BASE_URL;

const TOKEN = "token"
const SET_FOODS = "SET_FOODS";
const SET_FRIDGE = "SET_FRIDGE";
const ADD_TO_FRIDGE = "ADD_TO_FRIDGE";

export const setFoods = (foods) => {
  return {
    type: SET_FOODS,
    foods
  }
}

export const setFridge = (fridgeItems) => {
  return {
    type: SET_FRIDGE,
    fridgeItems
  }
}

export const _addToFridge = (food) => {
  return {
    type: ADD_TO_FRIDGE,
    food
  }
}

export const fetchFridge = () => {
  return async (dispatch) => {
    try {
      console.log("Got this far");
      const token = await AsyncStorage.getItem(TOKEN);
      const res = await axios.get(`http://192.168.1.181:8080/api/food/userFridge`, {
        headers: {
          authorization: token
        }
      })
      dispatch(setFridge(res.data));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const addToFridge = (foodId, expirationTime) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem(TOKEN);
    const res = await axios.post(`http://192.168.1.181:8080/api/food/${foodId}`, {
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
    try {
      const res = await axios.get(`http://192.168.1.181:8080/api/food`)
      dispatch(setFoods(res.data));
      return res.data;
    } catch (error) {
      console.log(error);
    }
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
