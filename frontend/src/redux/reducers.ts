import { combineReducers } from "redux";
import { auth } from "~redux/auth/reducer";

export const rootReducer = combineReducers({ auth });
