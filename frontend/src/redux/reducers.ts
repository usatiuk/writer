import { combineReducers } from "redux";
import { auth, IAuthState } from "~redux/auth/reducer";

export interface IAppState {
    auth: IAuthState;
}

export const rootReducer = combineReducers({ auth });
