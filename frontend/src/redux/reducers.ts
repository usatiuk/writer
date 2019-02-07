import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer, IAuthState } from "~redux/auth/reducer";

import { docsReducer, IDocsState } from "./docs/reducer";
import { IUserState, userReducer } from "./user/reducer";

export interface IAppState {
    auth: IAuthState;
    user: IUserState;
    docs: IDocsState;
}

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["jwt"],
};

export const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    user: userReducer,
    docs: docsReducer,
});
