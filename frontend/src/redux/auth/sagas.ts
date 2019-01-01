import { delay } from "redux-saga";
import { call, put, race, takeLatest } from "redux-saga/effects";
import { login } from "~redux/api/auth";
import { setToken } from "~redux/api/utils";

import {
    authFail,
    authSuccess,
    AuthTypes,
    IAuthStartActionAction,
} from "./actions";

function* authStart(action: IAuthStartActionAction) {
    const { username, password } = action.payload;
    try {
        const { response, timeout } = yield race({
            response: call(login, username, password),
            timeout: call(delay, 1000),
        });

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
    yield takeLatest(AuthTypes.AUTH_START, authStart);
}
