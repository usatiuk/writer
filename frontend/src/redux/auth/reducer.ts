import { Reducer } from "react";

import { AUTH_SUCCESS, AuthAction } from "./actions";

export interface IAuthState {
    jwt: string | null;
    inProgress: boolean;
}

const defaultAuthState: IAuthState = {
    jwt: null,
    inProgress: false,
};

export const auth: Reducer<IAuthState, AuthAction> = (
    state: IAuthState = defaultAuthState,
    action: AuthAction,
) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, jwt: action.jwt, inProgress: false };
            break;
        default:
            return state;
            break;
    }
};
