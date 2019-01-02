import { Reducer } from "react";

import { AuthAction, AuthTypes } from "./actions";

export interface IAuthState {
    jwt: string | null;
    inProgress: boolean;
    formError: string | null;
    formSpinner: boolean;
}

const defaultAuthState: IAuthState = {
    jwt: null,
    inProgress: false,
    formError: null,
    formSpinner: false,
};

export const auth: Reducer<IAuthState, AuthAction> = (
    state: IAuthState = defaultAuthState,
    action: AuthAction,
) => {
    switch (action.type) {
        case AuthTypes.AUTH_START:
            return { ...defaultAuthState, inProgress: true };
            break;
        case AuthTypes.AUTH_SUCCESS:
            return {
                ...defaultAuthState,
                jwt: action.payload.jwt,
            };
            break;
        case AuthTypes.AUTH_FAIL:
            return { ...defaultAuthState, formError: action.payload.error };
            break;
        case AuthTypes.AUTH_START_FORM_SPINNER:
            return { ...state, formSpinner: true };
        default:
            return state;
            break;
    }
};
