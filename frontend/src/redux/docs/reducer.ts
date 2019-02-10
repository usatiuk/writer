import { Reducer } from "react";
import { IDocumentJSON } from "~../../src/entity/Document";

import { DocsAction, DocsTypes } from "./actions";

export interface IDocsState {
    all: { [key: number]: IDocumentJSON };
    fetching: boolean;
    error: string | null;
    spinner: boolean;

    newDocumentID: number | null;
}

const defaultDocsState: IDocsState = {
    all: null,
    fetching: false,
    error: null,
    spinner: false,
    newDocumentID: null,
};

export const docsReducer: Reducer<IDocsState, DocsAction> = (
    state: IDocsState = defaultDocsState,
    action: DocsAction,
) => {
    switch (action.type) {
        case DocsTypes.DOCS_SHOW_SPINNER:
            return { ...state, spinner: true };
        case DocsTypes.DOCS_FETCH_START:
            return { ...defaultDocsState, fetching: true };
        case DocsTypes.DOCS_FETCH_SUCCESS: {
            const all: { [key: number]: IDocumentJSON } = {};
            action.payload.all.forEach(doc => {
                all[doc.id] = doc;
            });
            return { ...defaultDocsState, all };
        }
        case DocsTypes.DOC_NEW_SUCCESS: {
            const all = { ...state.all };
            const doc = action.payload.doc;
            all[doc.id] = doc;
            return { ...state, all, newDocumentID: doc.id };
        }
        case DocsTypes.DOC_NEW_RESET: {
            return { ...state, newDocumentID: null };
        }
        case DocsTypes.DOC_DELETE_SUCCESS: {
            const all = { ...state.all };
            delete all[action.payload.id];
            return { ...state, all };
        }
        case DocsTypes.DOCS_FETCH_FAIL:
            return { ...defaultDocsState, ...action.payload };
        default:
            return state;
            break;
    }
};
