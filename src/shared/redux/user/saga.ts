import { put, call, all, takeLatest, takeEvery } from "redux-saga/effects";
import createPayload from "../createPayload";
import api from "./api";
import routines, { LoginTriggerProps, SignUpTriggerProps } from "./routines";
import UserProps from "../../types/User";
import SnackService from "../../services/SnackService";

export function* login({ payload }: { payload: LoginTriggerProps }) {
	const { login: routine } = routines;
	try {
		yield put(routine.request());
		const data: UserProps = yield call(api.login, payload.data);
		yield put(routine.success(createPayload(data)));
		payload.controller.success();
		SnackService.success("Logged in successfully.");
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		payload.controller.failure(e);
		SnackService.error(e.message);
	} finally {
		yield put(routine.fulfill());
	}
}

export function* signup({ payload }: { payload: SignUpTriggerProps }) {
	const { signup: routine } = routines;
	try {
		yield put(routine.request());
		const data: UserProps = yield call(api.signup, payload.data);
		yield put(routine.success(createPayload(data)));
		payload.controller.success();
		SnackService.success("Signed up successfully.");
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		payload.controller.failure(e);
		SnackService.error(e.message);
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
		takeLatest(routines.signup.TRIGGER, signup),
		takeEvery(routines.logout.TRIGGER, logout),
	]);
}