import { put, call, all, takeLatest, takeEvery } from "redux-saga/effects";
import createPayload from "../createPayload";
import api from "./api";
import routines, { LoginTriggerProps } from "./routines";
import UserProps from "../../types/User";

export function* login({ payload }: { payload: LoginTriggerProps }) {
	const { login: routine } = routines;
	try {
		yield put(routine.request());
		const data: UserProps = yield call(api.login, payload.data);
		yield put(routine.success(createPayload(data)));
		payload.controller.success();
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		payload.controller.failure(e);
	} finally {
		yield put(routine.fulfill());
	}
}

export function* logout() {
	const { logout: routine } = routines;
	api.logout();
	yield put(routine.success());
}

export default function* root() {
	yield all([
		takeLatest(routines.login.TRIGGER, login),
		takeEvery(routines.logout.TRIGGER, logout),
	]);
}