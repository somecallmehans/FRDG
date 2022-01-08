import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
const BASE_URL = Constants.manifest.extra.BASE_URL;

const TOKEN = "token";
const SET_FOODS = "SET_FOODS";
const SET_FRIDGE = "SET_FRIDGE";
const ADD_TO_FRIDGE = "ADD_TO_FRIDGE";
const REMOVE_FROM_FRIDGE = "REMOVE_FROM_FRIDGE";

export const setFoods = (foods) => {
  return {
    type: SET_FOODS,
    foods,
  };
};

export const setFridge = (fridgeItems) => {
  return {
    type: SET_FRIDGE,
    fridgeItems,
  };
};

export const _addToFridge = (food) => {
  return {
    type: ADD_TO_FRIDGE,
    food,
  };
};

export const _removeFromFridge = (foodId) => {
  return {
    type: REMOVE_FROM_FRIDGE,
    foodId,
  };
};

export const fetchFridge = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem(TOKEN);
      const res = await axios.get(`http://${BASE_URL}/api/food/userFridge`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setFridge(res.data));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToFridge =
  (foodId, expirationTime, foodName) => async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem(TOKEN);
      const res = await axios.post(
        `http://${BASE_URL}/api/food/${foodId}`,
        {
          expirationTime: expirationTime,
          foodName: foodName,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(_addToFridge(res.data));
    } catch (error) {
      console.log(error);
    }
  };

export const fetchFoods = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://${BASE_URL}/api/food`);
      dispatch(setFoods(res.data));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const addNewFood = (
  foodName,
  expirationTime,
  currentDate,
  addFoodToFridge
) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://${BASE_URL}/api/food`, {
        foodName: foodName,
        expirationTime: expirationTime,
        dateAdded: currentDate,
      });
      if (addFoodToFridge) {
        dispatch(
          addToFridge(res.data.id, res.data.expirationTime, res.data.foodName)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromFridge = (foodId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem(TOKEN);
    const res = await axios.put(
      `http://${BASE_URL}/api/food/${foodId}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_removeFromFridge(res.data));
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  foods: [],
  userFridge: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FOODS:
      return {
        ...state,
        foods: action.foods,
      };
    case ADD_TO_FRIDGE:
      return {
        ...state,
        userFridge: [...state.userFridge, action.food],
      };
    case SET_FRIDGE:
      return {
        ...state,
        userFridge: action.fridgeItems,
      };
    case REMOVE_FROM_FRIDGE:
      return {
        ...state,
        userFridge: state.userFridge.filter(
          (item) => item.foodId !== action.foodId.foodId
        ),
      };
    default:
      return state;
  }
}
