import { Action } from "redux";
import { IUserAuthJSON, IUserJSON } from "~../../src/entity/User";

export enum UserTypes {
    USER_GET = "USER_GET",
    USER_GET_SUCCESS = "USER_GET_SUCCESS",
    USER_GET_FAIL = "USER_GET_FAIL",
    USER_LOGOUT = "USER_LOGOUT",
}

export interface IUserGetAction extends Action {
    type: UserTypes.USER_GET;
}

export interface IUserLogoutAction extends Action {
    type: UserTypes.USER_LOGOUT;
}

export interface IUserGetSuccessAction extends Action {
    type: UserTypes.USER_GET_SUCCESS;
    payload: IUserAuthJSON;
}

export interface IUserGetFailAction extends Action {
    type: UserTypes.USER_GET_FAIL;
    payload: {
        error: string;
        logout: boolean;
    };
}

export function getUser(): IUserGetAction {
    return { type: UserTypes.USER_GET };
}

export function logoutUser(): IUserLogoutAction {
    return { type: UserTypes.USER_LOGOUT };
}

export function getUserSuccess(user: IUserAuthJSON): IUserGetSuccessAction {
    return { type: UserTypes.USER_GET_SUCCESS, payload: user };
}

export function getUserFail(
    error: string,
    logout: boolean,
): IUserGetFailAction {
    return { type: UserTypes.USER_GET_FAIL, payload: { error, logout } };
}

export type UserAction =
    | IUserGetAction
    | IUserGetSuccessAction
    | IUserGetFailAction
    | IUserLogoutAction;
