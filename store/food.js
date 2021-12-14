import axios from "axios";
import Constants from 'expo-constants';
const BASE_URL = Constants.manifest.extra.BASE_URL;

const SET_FOODS = "SET_FOODS";

export const setFoods = (foods) => {
  return {
    type: SET_FOODS,
    foods
  }
}

export const fetchFoods = () => {
  return async (dispatch) => {
    const res = await axios.get(`http://${BASE_URL}/api/food`)
    dispatch(setFoods(res.data));
  }
}

const initialState = {
  foods: []
}

export default function (state = initialState, action){
  switch(action.type){
    case SET_FOODS:
      return {
        ...state,
        foods: action.foods
      }
    default:
      return state
  }
}
