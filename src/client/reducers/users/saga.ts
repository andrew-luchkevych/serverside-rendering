import { put, call, all, takeLatest, select, takeEvery } from "redux-saga/effects";
import payload from "../payload";
import api from "./api";
import routines from "./routines";
import { query as querySelector } from "./selectors";
export function* get() {
	const { get } = routines;
	try {
		yield put(get.request());
		const query = yield select(querySelector);
		const data = yield call(api.get, query);
		yield put(get.success(payload(data)));
	} catch (e) {
		yield put(get.failure(payload(undefined, e)));
	} finally {
		yield put(get.fulfill());
	}
}

export function* queryChange({ payload: query }) {
	const { queryChange } = routines;
	yield put(queryChange.request(payload({ query })));
	yield call(get);
	yield put(queryChange.fulfill());
}

export default function* root() {
	yield all([
		takeLatest(routines.get.TRIGGER, get),
		takeEvery(routines.queryChange.TRIGGER, queryChange),
	]);
}