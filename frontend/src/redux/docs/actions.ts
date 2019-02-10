import { Action } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";

export enum DocsTypes {
    DOCS_FETCH_START = "DOCS_FETCH_START",
    DOCS_FETCH_FAIL = "DOCS_FETCH_FAIL",
    DOCS_FETCH_SUCCESS = "DOCS_FETCH_SUCCESS",

    DOC_NEW_START = "DOC_NEW_START",
    DOC_NEW_FAIL = "DOC_NEW_FAIL",
    DOC_NEW_SUCCESS = "DOC_NEW_SUCCESS",
    DOC_NEW_RESET = "DOC_NEW_RESET",

    DOC_DELETE_START = "DOC_DELETE_START",
    DOC_DELETE_FAIL = "DOC_DELETE_FAIL",
    DOC_DELETE_SUCCESS = "DOC_DELETE_SUCCESS",
    DOC_DELETE_CANCEL = "DOC_DELETE_CANCEL",

    DOCS_SHOW_SPINNER = "DOCS_SHOW_SPINNER",
}

export interface IDocsShowSpinnerAction extends Action {
    type: DocsTypes.DOCS_SHOW_SPINNER;
}

export interface IDocsFetchStartAction extends Action {
    type: DocsTypes.DOCS_FETCH_START;
}

export interface IDocsFetchFailAction extends Action {
    type: DocsTypes.DOCS_FETCH_FAIL;
    payload: {
        error: string;
    };
}

export interface IDocsFetchSuccessAction extends Action {
    type: DocsTypes.DOCS_FETCH_SUCCESS;
    payload: {
        all: IDocumentJSON[];
    };
}

export function showDocsSpinner(): IDocsShowSpinnerAction {
    return { type: DocsTypes.DOCS_SHOW_SPINNER };
}

export function fetchDocsStart(): IDocsFetchStartAction {
    return { type: DocsTypes.DOCS_FETCH_START };
}

export function fetchDocsFail(error: string): IDocsFetchFailAction {
    return { type: DocsTypes.DOCS_FETCH_FAIL, payload: { error } };
}

export function fetchDocsSuccess(
    all: IDocumentJSON[],
): IDocsFetchSuccessAction {
    return { type: DocsTypes.DOCS_FETCH_SUCCESS, payload: { all } };
}

export interface IDocNewStartAction extends Action {
    type: DocsTypes.DOC_NEW_START;
}

export interface IDocNewFailAction extends Action {
    type: DocsTypes.DOC_NEW_FAIL;
    payload: {
        error: string;
    };
}

export interface IDocNewSuccessAction extends Action {
    type: DocsTypes.DOC_NEW_SUCCESS;
    payload: {
        doc: IDocumentJSON;
    };
}

export interface IDocNewResetAction extends Action {
    type: DocsTypes.DOC_NEW_RESET;
}

export function newDocStart(): IDocNewStartAction {
    return { type: DocsTypes.DOC_NEW_START };
}

export function newDocFail(error: string): IDocNewFailAction {
    return { type: DocsTypes.DOC_NEW_FAIL, payload: { error } };
}

export function newDocSuccess(doc: IDocumentJSON): IDocNewSuccessAction {
    return { type: DocsTypes.DOC_NEW_SUCCESS, payload: { doc } };
}

export function newDocReset(): IDocNewResetAction {
    return { type: DocsTypes.DOC_NEW_RESET };
}

export interface IDocDeleteStartAction extends Action {
    type: DocsTypes.DOC_DELETE_START;
    id: number;
}

export interface IDocDeleteFailAction extends Action {
    type: DocsTypes.DOC_DELETE_FAIL;
    payload: {
        error: string;
    };
}

export interface IDocDeleteSuccessAction extends Action {
    type: DocsTypes.DOC_DELETE_SUCCESS;
    payload: {
        id: number;
    };
}

export interface IDocDeleteCancelAction extends Action {
    type: DocsTypes.DOC_DELETE_CANCEL;
}

export function deleteDocStart(id: number): IDocDeleteStartAction {
    return { type: DocsTypes.DOC_DELETE_START, id };
}

export function deleteDocFail(error: string): IDocDeleteFailAction {
    return { type: DocsTypes.DOC_DELETE_FAIL, payload: { error } };
}

export function deleteDocSuccess(id: number): IDocDeleteSuccessAction {
    return { type: DocsTypes.DOC_DELETE_SUCCESS, payload: { id } };
}

export function deleteDocCancel(): IDocDeleteCancelAction {
    return { type: DocsTypes.DOC_DELETE_CANCEL };
}

export type DocsAction =
    | IDocsFetchStartAction
    | IDocsFetchFailAction
    | IDocsFetchSuccessAction
    | IDocsShowSpinnerAction
    | IDocNewFailAction
    | IDocNewStartAction
    | IDocNewSuccessAction
    | IDocNewResetAction
    | IDocDeleteFailAction
    | IDocDeleteStartAction
    | IDocDeleteSuccessAction
    | IDocDeleteCancelAction;
