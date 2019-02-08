import { delay } from "redux-saga";
import {
    all,
    call,
    cancel,
    fork,
    put,
    race,
    takeLatest,
} from "redux-saga/effects";
import { fetchAllDocs } from "~redux/api/docs";

import {
    DocsTypes,
    fetchDocsFail,
    fetchDocsSuccess,
    IDocsFetchStartAction,
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
            timeout: call(delay, 10000),
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

export function* docsSaga() {
    yield all([takeLatest(DocsTypes.DOCS_FETCH_START, docsFetchStart)]);
}
