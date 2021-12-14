import { createStore, combineReducers, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import axios from "axios"

import auth from "./auth";
import foods from "./food";

const reducer = combineReducers({
  auth: auth,
  foods: foods
});

const middleware = applyMiddleware(thunkMiddleware.withExtraArgument({ axios }))

const store = createStore(reducer, middleware)

export default store
export * from "./auth"
