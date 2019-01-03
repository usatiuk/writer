import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddlware from "redux-saga";
import { rootReducer } from "~redux/reducers";

import { setToken } from "./api/utils";
import { authSaga } from "./auth/sagas";
import { getUser } from "./user/actions";
import { userSaga } from "./user/sagas";

const sagaMiddleware = createSagaMiddlware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export const persistor = persistStore(store, null, () => {
    const state = store.getState();
    if (state.auth.jwt) {
        setToken(state.auth.jwt);
        store.dispatch(getUser());
    }
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(userSaga);
