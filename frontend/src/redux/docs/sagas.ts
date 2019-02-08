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
import { fetchAllDocs, fetchRecentDocs } from "~redux/api/docs";

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
            response: all([call(fetchRecentDocs), call(fetchAllDocs)]),
            timeout: call(delay, 10000),
        });

        yield cancel(spinner);

        if (timeout) {
            yield put(fetchDocsFail("Timeout"));
            return;
        }

        if (response) {
            if (response[0].data == null || response[1].data == null) {
                yield put(fetchDocsFail(response[0].error));
            } else {
                const recentDocs = response[0].data;
                const allDocs = response[1].data;
                yield put(fetchDocsSuccess(recentDocs, allDocs));
            }
        }
    } catch (e) {
        yield put(fetchDocsFail("Internal error"));
    }
}

export function* docsSaga() {
    yield all([takeLatest(DocsTypes.DOCS_FETCH_START, docsFetchStart)]);
}
