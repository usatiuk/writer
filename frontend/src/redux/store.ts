import { applyMiddleware, createStore } from "redux";
import createSagaMiddlware from "redux-saga";
import { rootReducer } from "~redux/reducers";

import { authSaga } from "./auth/sagas";

const sagaMiddleware = createSagaMiddlware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(authSaga);
