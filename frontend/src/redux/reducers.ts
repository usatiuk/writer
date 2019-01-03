import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer, IAuthState } from "~redux/auth/reducer";

export interface IAppState {
    auth: IAuthState;
}

const authPersistConfig = {
    key: "jwt",
    storage,
};

export const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
});
