import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import { persistStore, persistCombineReducers, PersistConfig } from "redux-persist";
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "cookies-js";
import StoreConfig from "../../../config/store";
import rootSaga from "../../reducers/saga";
import rootReducer from "../../reducers";
import middleware, { sagaMiddleware } from "./middleware";
const persistConfig: PersistConfig = {
	key: StoreConfig.key,
	storage: new CookieStorage(Cookies, {}),
};

const reducer = persistCombineReducers(persistConfig, rootReducer);

const composeEnhancer = compose;
const configStore = (initialState = {}) => {
	const _store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(...middleware)));
	sagaMiddleware.run(rootSaga);
	return {
		persistor: persistStore(_store),
		store: _store,
	};
};

const { store, persistor } = configStore();
export { store, persistor };