import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from 'expo-constants';

const TOKEN = "token"
const SET_AUTH = "SET_AUTH"
const BASE_URL = Constants.manifest.extra.BASE_URL;


const setAuth = (auth) => ({ type: SET_AUTH, auth })

export const me = () => async (dispatch) => {
  const token = await AsyncStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get(`http://${BASE_URL}/auth/me`, {
      headers: {
        authorization: token,
      },
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (email, password, method, name) => async (dispatch) => {
  try {
    const res = await axios.post(`http://${BASE_URL}/auth/${method}`, {
      email,
      password,
      name
    })
    AsyncStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (error) {
    return dispatch(setAuth({ error: error }))
  }
}

export const logout = () => {
  AsyncStorage.removeItem(TOKEN)
  return {
    type: SET_AUTH,
    auth: {},
  }
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
