import {
    all,
    call,
    cancel,
    delay,
    fork,
    put,
    race,
    take,
    takeLatest,
} from "redux-saga/effects";
import {
    createNewDoc,
    deleteDoc,
    fetchAllDocs,
    patchDoc,
} from "~redux/api/docs";

import {
    deleteDocFail,
    deleteDocSuccess,
    DocsTypes,
    fetchDocsFail,
    fetchDocsSuccess,
    IDocDeleteStartAction,
    IDocNewStartAction,
    IDocsFetchStartAction,
    IDocUpdateStartAction,
    newDocFail,
    newDocSuccess,
    showDocsSpinner,
    updateDocFail,
    updateDocSuccess,
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
            timeout: delay(2000),
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

function* docUpdateStart(action: IDocUpdateStartAction) {
    try {
        const spinner = yield fork(startSpinner);

        const { response, timeout } = yield race({
            response: call(patchDoc, action.id, action.name, action.content),
            timeout: delay(10000),
        });

        yield cancel(spinner);

        if (timeout) {
            yield put(updateDocFail("Timeout"));
            return;
        }

        if (response) {
            if (response.data == null) {
                yield put(updateDocFail(response.error));
            } else {
                const updDoc = response.data;
                yield put(updateDocSuccess(updDoc));
            }
        }
    } catch (e) {
        yield put(updateDocFail("Internal error"));
    }
}

export function* docsSaga() {
    yield all([
        takeLatest(DocsTypes.DOCS_FETCH_START, docsFetchStart),
        takeLatest(DocsTypes.DOC_NEW_START, docNewStart),
        takeLatest(DocsTypes.DOC_DELETE_START, docDeleteStart),
        takeLatest(DocsTypes.DOC_UPDATE_START, docUpdateStart),
    ]);
}
