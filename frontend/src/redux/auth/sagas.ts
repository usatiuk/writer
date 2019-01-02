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
import { login, signup } from "~redux/api/auth";
import { setToken } from "~redux/api/utils";

import {
    authFail,
    authSuccess,
    AuthTypes,
    IAuthStartActionAction,
    ISignupStartActionAction,
    startFormSpinner,
} from "./actions";

function* startSpinner() {
    yield delay(300);
    yield put(startFormSpinner());
}

function* authStart(action: IAuthStartActionAction) {
    const { username, password } = action.payload;
    try {
        const spinner = yield fork(startSpinner);

        const { response, timeout } = yield race({
            response: call(login, username, password),
            timeout: call(delay, 10000),
        });

        yield cancel(spinner);

        if (timeout) {
            yield put(authFail("Timeout"));
            return;
        }
        if (response.data) {
            const user = response.data;
            yield call(setToken, user.jwt);
            yield put(authSuccess(user.jwt));
        } else {
            yield put(authFail(response.error));
        }
    } catch (e) {
        yield put(authFail(e.toString()));
    }
}

function* signupStart(action: ISignupStartActionAction) {
    const { username, password, email } = action.payload;
    try {
        const spinner = yield fork(startSpinner);

        const { response, timeout } = yield race({
            response: call(signup, username, password, email),
            timeout: call(delay, 10000),
        });

        yield cancel(spinner);

        if (timeout) {
            yield put(authFail("Timeout"));
            return;
        }
        if (response.data) {
            const user = response.data;
            yield call(setToken, user.jwt);
            yield put(authSuccess(user.jwt));
        } else {
            yield put(authFail(response.error));
        }
    } catch (e) {
        yield put(authFail(e.toString()));
    }
}

export function* authSaga() {
    yield all([
        takeLatest(AuthTypes.AUTH_START, authStart),
        takeLatest(AuthTypes.SIGNUP_START, signupStart),
    ]);
}
