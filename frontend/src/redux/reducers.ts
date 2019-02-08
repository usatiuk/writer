import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer, IAuthState } from "~redux/auth/reducer";

import { docsReducer, IDocsState } from "./docs/reducer";
import {
    ILocalSettingsState,
    localSettingsReducer,
} from "./localSettings/reducer";
import { IUserState, userReducer } from "./user/reducer";

export interface IAppState {
    auth: IAuthState;
    user: IUserState;
    docs: IDocsState;
    localSettings: ILocalSettingsState;
}

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["jwt"],
};

const localSettingsPersistConfig = {
    key: "localSettings",
    storage,
};

export const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    user: userReducer,
    docs: docsReducer,
    localSettings: persistReducer(
        localSettingsPersistConfig,
        localSettingsReducer,
    ),
});
