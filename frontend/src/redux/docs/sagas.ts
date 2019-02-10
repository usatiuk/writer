import {
    all,
    call,
    cancel,
    delay,
    fork,
    put,
    race,
    takeLatest,
} from "redux-saga/effects";
import { createNewDoc, fetchAllDocs } from "~redux/api/docs";

import {
    DocsTypes,
    fetchDocsFail,
    fetchDocsSuccess,
    IDocNewStartAction,
    IDocsFetchStartAction,
    newDocFail,
    newDocSuccess,
    showDocsSpinner,
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

export function* docsSaga() {
    yield all([
        takeLatest(DocsTypes.DOCS_FETCH_START, docsFetchStart),
        takeLatest(DocsTypes.DOC_NEW_START, docNewStart),
    ]);
}
