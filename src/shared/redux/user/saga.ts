import { put, call, all, takeLatest } from "redux-saga/effects";
import createPayload from "../createPayload";
import api, { ApiLoginProps } from "./api";
import routines from "./routines";

export function* login({ payload }: { payload: ApiLoginProps }) {
	const { login } = routines;
	try {
		yield put(login.request());
		const data = yield call(api.login, payload);
		yield put(login.success(createPayload(data)));
	} catch (e) {
		yield put(login.failure(createPayload(undefined, e)));
	} finally {
		yield put(login.fulfill());
	}
}

export default function* root() {
	yield all([
		takeLatest(routines.login.TRIGGER, login),
	]);
}