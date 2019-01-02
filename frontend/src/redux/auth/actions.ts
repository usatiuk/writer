import { Action } from "redux";

export enum AuthTypes {
    AUTH_START = "AUTH_START",
    SIGNUP_START = "SIGNUP_START",
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_FAIL = "AUTH_FAIL",
    AUTH_START_FORM_SPINNER = "AUTH_START_FORM_SPINNER",
}

export interface IAuthStartActionAction extends Action {
    type: AuthTypes.AUTH_START;
    payload: {
        username: string;
        password: string;
    };
}

export interface ISignupStartActionAction extends Action {
    type: AuthTypes.SIGNUP_START;
    payload: {
        username: string;
        password: string;
        email: string;
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

export interface IAuthStartFormSpinnerAction extends Action {
    type: AuthTypes.AUTH_START_FORM_SPINNER;
}

export function startFormSpinner(): IAuthStartFormSpinnerAction {
    return { type: AuthTypes.AUTH_START_FORM_SPINNER };
}

export function authStart(
    username: string,
    password: string,
): IAuthStartActionAction {
    return { type: AuthTypes.AUTH_START, payload: { username, password } };
}

export function signupStart(
    username: string,
    password: string,
    email: string,
): ISignupStartActionAction {
    return {
        type: AuthTypes.SIGNUP_START,
        payload: { username, password, email },
    };
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
    | IAuthFailureActionAction
    | IAuthStartFormSpinnerAction
    | ISignupStartActionAction;
