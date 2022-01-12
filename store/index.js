import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import auth from "./auth";
import foods from "./food";

const persistFoodConfig = {
  key: "food",
  storage: AsyncStorage,
};

const persistAuthConfig = {
  key: "auth",
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(persistAuthConfig, auth),
  foods: persistReducer(persistFoodConfig, foods),
});

const middleware = applyMiddleware(
  thunkMiddleware.withExtraArgument({ axios })
);

export const store = createStore(reducer, middleware);
export const persistor = persistStore(store);

export * from "./auth";
