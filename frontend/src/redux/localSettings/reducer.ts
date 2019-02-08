import { Reducer } from "react";

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
    action: LocalSettingsAction,
) => {
    switch (action.type) {
        case LocalSettingsTypes.TOGGLE_DARK_MODE:
            const { darkMode } = state;
            return { ...state, darkMode: !darkMode };
        default:
            return state;
            break;
    }
};
