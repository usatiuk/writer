import { Action } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";

export enum DocsTypes {
    DOCS_FETCH_START = "DOCS_FETCH_START",
    DOCS_FETCH_FAIL = "DOCS_FETCH_FAIL",
    DOCS_FETCH_SUCCESS = "DOCS_FETCH_SUCCESS",
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
        recent: IDocumentJSON[];
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
    recent: IDocumentJSON[],
    all: IDocumentJSON[],
): IDocsFetchSuccessAction {
    return { type: DocsTypes.DOCS_FETCH_SUCCESS, payload: { recent, all } };
}

export type DocsAction =
    | IDocsFetchStartAction
    | IDocsFetchFailAction
    | IDocsFetchSuccessAction
    | IDocsShowSpinnerAction;
