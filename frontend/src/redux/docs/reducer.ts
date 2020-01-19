import { Reducer } from "react";
import { IDocumentJSON } from "~../../src/entity/Document";
import { UserAction, UserTypes } from "~redux/user/actions";

import { DocsAction, DocsTypes } from "./actions";

export interface IDocumentEntry extends IDocumentJSON {
    remote: IDocumentJSON;
    dirty: boolean;
}

export interface IDocsState {
    all: { [key: number]: IDocumentEntry };
    dirty: boolean;

    fetching: boolean;
    uploading: boolean;
    error: string | null;
    spinner: boolean;

    newDocumentID: number | null;

    deletedDocument: IDocumentEntry | null;
}

const defaultDocsState: IDocsState = {
    all: null,
    dirty: false,
    fetching: false,
    uploading: false,
    error: null,
    spinner: false,
    newDocumentID: null,
    deletedDocument: null,
};

function isDocDirty(doc1: IDocumentJSON, doc2: IDocumentJSON) {
    return (
        doc1.content !== doc2.content ||
        doc1.name !== doc2.name ||
        doc1.shared !== doc2.shared
    );
}

export const docsReducer: Reducer<IDocsState, DocsAction> = (
    state: IDocsState = defaultDocsState,
    action: DocsAction | UserAction,
) => {
    switch (action.type) {
        case DocsTypes.DOCS_SHOW_SPINNER:
            return { ...state, spinner: true };
        case DocsTypes.DOCS_FETCH_START:
            return { ...defaultDocsState, fetching: true };
        case DocsTypes.DOCS_FETCH_SUCCESS: {
            const all: { [key: number]: IDocumentEntry } = {};
            action.payload.all.forEach(doc => {
                all[doc.id] = { ...doc, remote: doc, dirty: false };
            });
            return { ...defaultDocsState, all };
        }
        case DocsTypes.DOC_NEW_SUCCESS: {
            const all = { ...state.all };
            const doc = action.payload.doc;
            all[doc.id] = { ...doc, remote: doc, dirty: false };
            return { ...state, all, newDocumentID: doc.id };
        }
        case DocsTypes.DOC_NEW_RESET: {
            return { ...state, newDocumentID: null };
        }
        case DocsTypes.DOC_DELETE_START: {
            const doc = { ...state.all[action.id] };
            const all = { ...state.all };
            delete all[action.id];
            return { ...state, deletedDocument: doc, all };
        }
        case DocsTypes.DOC_DELETE_SUCCESS: {
            return { ...state, deletedDocument: null };
        }
        case DocsTypes.DOC_DELETE_CANCEL: {
            const deletedDocument = { ...state.deletedDocument };
            const all = { ...state.all };
            all[deletedDocument.id] = deletedDocument;
            return { ...state, deletedDocument: null, all };
        }
        case DocsTypes.DOCS_UPLOAD_START: {
            return { ...state, uploading: true };
        }
        case DocsTypes.DOCS_UPLOAD_FAIL: {
            return { ...state, uploading: false };
        }
        case DocsTypes.DOCS_UPLOAD_SUCCESS: {
            const all: { [key: number]: IDocumentEntry } = { ...state.all };
            action.payload.all.forEach(doc => {
                if (isDocDirty(all[doc.id], doc)) {
                    all[doc.id] = { ...all[doc.id], remote: doc, dirty: true };
                } else {
                    all[doc.id] = { ...all[doc.id], remote: doc, dirty: false };
                }
            });
            return { ...state, all, uploading: false, dirty: false };
        }
        case DocsTypes.DOCS_FETCH_FAIL:
            return { ...defaultDocsState, ...action.payload };
        case UserTypes.USER_LOGOUT:
            return defaultDocsState;
        case DocsTypes.DOC_UPDATE: {
            const all = { ...state.all };
            let dirty = state.dirty;
            const { payload } = action;
            const doc = all[payload.id];
            const remote = doc.remote;
            if (
                payload.content !== remote.content ||
                payload.name !== remote.name ||
                payload.shared !== remote.shared
            ) {
                all[payload.id] = {
                    ...doc,
                    content: payload.content,
                    name: payload.name,
                    shared: payload.shared,
                    dirty: true,
                };
                dirty = true;
            } else {
                all[payload.id] = {
                    ...doc,
                    content: payload.content,
                    name: payload.name,
                    shared: payload.shared,
                    dirty: false,
                };
                const dirtyDocs = Object.values(all).filter(e => e.dirty);
                dirty = dirtyDocs.length > 0;
            }
            return { ...state, all, dirty };
        }
        default:
            return state;
            break;
    }
};
