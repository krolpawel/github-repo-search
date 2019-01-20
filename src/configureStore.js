import { createStore, compose, applyMiddleware } from 'redux';
import { Platform } from "react-native";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import devTools from "remote-redux-devtools";
import createSagaMiddleware from "redux-saga";
import repositoriesSaga from "./sagas/repositoriesSaga";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['repositories'],
}



export default () => {
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const sagaMiddleware = createSagaMiddleware();

    let store = createStore(
        persistedReducer,
        undefined,
        compose(
            applyMiddleware(sagaMiddleware),
            devTools({
                name: Platform.OS,
                realtime: true
            })
        )
    );
    let persistor = persistStore(store)

    sagaMiddleware.run(repositoriesSaga);
  return { store, persistor }
}