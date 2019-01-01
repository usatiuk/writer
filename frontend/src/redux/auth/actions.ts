import { Action } from "redux";

export const AUTH_SUCCESS = "AUTH_SUCCESS";

class AuthSuccessAction implements Action {
    public readonly type = AUTH_SUCCESS;
    constructor(public jwt: string) {}
}

export type AuthAction = AuthSuccessAction;
