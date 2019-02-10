import { Reducer } from "react";
import { UserAction, UserTypes } from "~redux/user/actions";

import { LocalSettingsAction, LocalSettingsTypes } from "./actions";

export interface ILocalSettingsState {
    darkMode: boolean;
}

const defaultLocalSettingsState: ILocalSettingsState = {
    darkMode: false,
};

export const localSettingsReducer: Reducer<
    ILocalSettingsState,
    LocalSettingsAction
> = (
    state: ILocalSettingsState = defaultLocalSettingsState,
    action: LocalSettingsAction | UserAction,
) => {
    switch (action.type) {
        case LocalSettingsTypes.TOGGLE_DARK_MODE:
            const { darkMode } = state;
            return { ...state, darkMode: !darkMode };
        case UserTypes.USER_LOGOUT:
            return defaultLocalSettingsState;
        default:
            return state;
            break;
    }
};
