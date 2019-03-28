import { put, call, all, takeLatest, takeEvery } from "redux-saga/effects";
import SnackService from "../../services/SnackService";
import OrderRollProps from "../../types/Order/OrderRoll";
import createPayload from "../createPayload";
import routines from "./routines";
import api from "./api";
import { ApiSuccessResponse } from "../../types/api/responses";

export function* get() {
	const { get: routine } = routines;
	try {
		yield put(routine.request());
		const data: OrderRollProps = yield call(api.get);
		yield put(routine.success(createPayload(data)));
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		SnackService.error(e.message);
	} finally {
		yield put(routine.fulfill());
	}
}

export function* create() {
	const { create: routine } = routines;
	try {
		yield put(routine.request());
		const data: OrderRollProps = yield call(api.create);
		yield put(routine.success(createPayload(data)));
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		SnackService.error(e.message);
	} finally {
		yield put(routine.fulfill());
	}
}

export function* remove() {
	const { remove: routine } = routines;
	try {
		yield put(routine.request());
		const data: ApiSuccessResponse = yield call(api.remove);
		yield put(routine.success(createPayload(data)));
		if (data.msg) {
			SnackService.success(data.msg);
		}
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		SnackService.error(e.message);
	} finally {
		yield put(routine.fulfill());
	}
}

export default function* root() {
	yield all([
		takeLatest(routines.get.TRIGGER, get),
		takeEvery(routines.create.TRIGGER, create),
		takeEvery(routines.remove.TRIGGER, remove),
	]);
}