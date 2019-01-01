import { Action } from "redux";

export enum AuthTypes {
    AUTH_START = "AUTH_START",
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_FAIL = "AUTH_FAIL",
}

export interface IAuthStartActionAction extends Action {
    type: AuthTypes.AUTH_START;
    payload: {
        username: string;
        password: string;
    };
}

export interface IAuthSuccessActionAction extends Action {
    type: AuthTypes.AUTH_SUCCESS;
    payload: {
        jwt: string;
    };
}

export interface IAuthFailureActionAction extends Action {
    type: AuthTypes.AUTH_FAIL;
    payload: {
        error: string;
    };
}

export function authStart(
    username: string,
    password: string,
): IAuthStartActionAction {
    return { type: AuthTypes.AUTH_START, payload: { username, password } };
}

export function authSuccess(jwt: string): IAuthSuccessActionAction {
    return { type: AuthTypes.AUTH_SUCCESS, payload: { jwt } };
}

export function authFail(error: string): IAuthFailureActionAction {
    return { type: AuthTypes.AUTH_FAIL, payload: { error } };
}

export type AuthAction =
    | IAuthStartActionAction
    | IAuthSuccessActionAction
    | IAuthFailureActionAction;
