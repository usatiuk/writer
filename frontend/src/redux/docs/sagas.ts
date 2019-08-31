import {
    all,
    call,
    cancel,
    delay,
    fork,
    put,
    race,
    select,
    take,
    takeEvery,
    takeLatest,
} from "redux-saga/effects";
import {
    createNewDoc,
    deleteDoc,
    fetchAllDocs,
    patchDoc,
} from "~redux/api/docs";
import { IAppState } from "~redux/reducers";
import { IDocumentJSON } from "../../../../src/entity/Document";
import {
    deleteDocFail,
    deleteDocSuccess,
    DocsTypes,
    fetchDocsFail,
    fetchDocsSuccess,
    IDocDeleteStartAction,
    IDocNewStartAction,
    IDocsFetchStartAction,
    IDocsUploadStartAction,
    newDocFail,
    newDocSuccess,
    showDocsSpinner,
    uploadDocsFail,
    uploadDocsStart,
    uploadDocsSuccess,
} from "./actions";

function* startSpinner() {
    yield delay(300);
    yield put(showDocsSpinner());
}

function* docsFetchStart(action: IDocsFetchStartAction) {
    try {
        const spinner = yield fork(startSpinner);

        const { response, timeout } = yield race({
            response: call(fetchAllDocs),
            timeout: delay(10000),
        });

        yield cancel(spinner);

        if (timeout) {
            yield put(fetchDocsFail("Timeout"));
            return;
        }

        if (response) {
            if (response.data == null) {
                yield put(fetchDocsFail(response.error));
            } else {
                const allDocs = response.data;
                yield put(fetchDocsSuccess(allDocs));
            }
        }
    } catch (e) {
        yield put(fetchDocsFail("Internal error"));
    }
}

function* docNewStart(action: IDocNewStartAction) {
    try {
        const spinner = yield fork(startSpinner);

        const { response, timeout } = yield race({
            response: call(createNewDoc),
            timeout: delay(10000),
        });

        yield cancel(spinner);

        if (timeout) {
            yield put(newDocFail("Timeout"));
            return;
        }

        if (response) {
            if (response.data == null) {
                yield put(newDocFail(response.error));
            } else {
                const newDoc = response.data;
                yield put(newDocSuccess(newDoc));
            }
        }
    } catch (e) {
        yield put(newDocFail("Internal error"));
    }
}

function* docDeleteStart(action: IDocDeleteStartAction) {
    try {
        const { cancelled } = yield race({
            timeout: delay(3000),
            cancelled: take(DocsTypes.DOC_DELETE_CANCEL),
        });

        if (!cancelled) {
            const { response, timeout } = yield race({
                response: call(deleteDoc, action.id),
                timeout: delay(10000),
            });

            if (timeout) {
                yield put(deleteDocFail("Timeout"));
                return;
            }

            if (response) {
                if (response.data == null) {
                    yield put(deleteDocFail(response.error));
                } else {
                    yield put(deleteDocSuccess(action.id));
                }
            }
        }
    } catch (e) {
        yield put(deleteDocFail("Internal error"));
    }
}

function* docsUploadStart(action: IDocsUploadStartAction) {
    try {
        const spinner = yield fork(startSpinner);

        const state: IAppState = yield select();
        const allDocs = state.docs.all;

        const changedDocs: IDocumentJSON[] = Object.values(allDocs).filter(
            e => e.dirty,
        );

        const updatedDocs: IDocumentJSON[] = [];

        for (const doc of changedDocs) {
            const { response, timeout } = yield race({
                response: call(patchDoc, doc.id, doc.name, doc.content),
                timeout: delay(10000),
            });

            if (timeout) {
                yield put(uploadDocsFail("Timeout"));
                return;
            }

            if (response) {
                if (response.data == null) {
                    yield put(uploadDocsFail(response.error));
                } else {
                    const updDoc = response.data;
                    updatedDocs.push(updDoc);
                }
            }
        }
        yield cancel(spinner);
        yield put(uploadDocsSuccess(updatedDocs));
    } catch (e) {
        yield put(uploadDocsFail("Internal error"));
    }
}

export function* uploadDocsTimer() {
    while (true) {
        yield put(uploadDocsStart());
        yield delay(5000);
    }
}

export function* docsSaga() {
    yield all([
        takeLatest(DocsTypes.DOCS_FETCH_START, docsFetchStart),
        takeLatest(DocsTypes.DOC_NEW_START, docNewStart),
        takeEvery(DocsTypes.DOC_DELETE_START, docDeleteStart),
        takeLatest(DocsTypes.DOCS_UPLOAD_START, docsUploadStart),
    ]);
}
