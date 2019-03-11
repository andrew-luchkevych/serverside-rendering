import "regenerator-runtime/runtime";
import createSagaMiddleware from "redux-saga";

export const sagaMiddleware = createSagaMiddleware();

export const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
	// tslint:disable-next-line: no-var-requires
	const { createLogger } = require("redux-logger");
	// tslint:disable-next-line: no-var-requires
	const invariant = require("redux-immutable-state-invariant").default;
	middleware.push(invariant());
	middleware.push(createLogger({ collapsed: true }));
}
export default middleware;