import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import reducers from "./reducers";
import middleware, { sagaMiddleware } from "./middleware";
import rootSaga from "./saga";
import { ReduxStore } from "../types/store";
const isProd = process.env.NODE_ENV === "production";
const isServer = process.env.NODE_ENV === "server";
let composeEnhancers = compose;
const configureStore = (preloadedState?: any, isBackEnd?: boolean): ReduxStore => {
	if (!isProd && !isBackEnd) {
		// tslint:disable-next-line: no-string-literal
		composeEnhancers = typeof window === "object" && window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose || compose;
	}
	const store = createStore(combineReducers({ ...reducers }), preloadedState, composeEnhancers(applyMiddleware(...middleware)));
	if (!isBackEnd) {
		sagaMiddleware.run(rootSaga);
	}
	if ((module as any).hot) {
		(module as any).hot.accept("./reducers", () => {
			const nextReducer = require("./reducers").default;
			store.replaceReducer(nextReducer);
		});
	}
	console.log({ state: store.getState() });
	return store;
};

export default configureStore;
