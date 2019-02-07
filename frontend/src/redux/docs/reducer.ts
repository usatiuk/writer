import { Reducer } from "react";
import { IDocumentJSON } from "~../../src/entity/Document";

import { DocsAction, DocsTypes } from "./actions";

export interface IDocsState {
    recent: IDocumentJSON[] | null;
    all: IDocumentJSON[] | null;
    fetching: boolean;
    error: string | null;
}

const defaultDocsState: IDocsState = {
    recent: null,
    all: null,
    fetching: false,
    error: null,
};

export const docsReducer: Reducer<IDocsState, DocsAction> = (
    state: IDocsState = defaultDocsState,
    action: DocsAction,
) => {
    switch (action.type) {
        case DocsTypes.DOCS_FETCH_START:
            return { ...defaultDocsState, fetching: true };
        case DocsTypes.DOCS_FETCH_SUCCESS:
            return { ...defaultDocsState, ...action.payload };
        case DocsTypes.DOCS_FETCH_FAIL:
            return { ...defaultDocsState, ...action.payload };
        default:
            return state;
            break;
    }
};
