import { Reducer } from "react";

import { AuthAction, AuthTypes } from "./actions";

export interface IAuthState {
    jwt: string | null;
    inProgress: boolean;
    error: string | null;
}

const defaultAuthState: IAuthState = {
    jwt: null,
    inProgress: false,
    error: null,
};

export const auth: Reducer<IAuthState, AuthAction> = (
    state: IAuthState = defaultAuthState,
    action: AuthAction,
) => {
    switch (action.type) {
        case AuthTypes.AUTH_START:
            return { ...state, inProgress: true };
            break;
        case AuthTypes.AUTH_SUCCESS:
            return { ...state, jwt: action.payload.jwt, inProgress: false };
            break;
        case AuthTypes.AUTH_FAIL:
            return { ...defaultAuthState, error: action.payload.error };
            break;
        default:
            return state;
            break;
    }
};
