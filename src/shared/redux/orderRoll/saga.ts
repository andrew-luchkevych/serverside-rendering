import { put, call, all, takeLatest, takeEvery } from "redux-saga/effects";
import SnackService from "../../services/SnackService";
import OrderRollProps from "../../types/Order/OrderRoll";
import { ApiSuccessResponse } from "../../types/api/responses";
import BasicRoutine from "../../types/store/routine";
import DataTypes from "../../types/dataTypes";
import forceReloadRoutines from "../forceReloadData/routines";
import createPayload from "../createPayload";
import routines from "./routines";
import api from "./api";

const DataType: DataTypes = "orderRoll";

export function* getData(routine: BasicRoutine, showError = true) {
	try {
		yield put(routine.request());
		const data: OrderRollProps = yield call(api.get);
		yield put(routine.success(createPayload(data)));
		yield put(forceReloadRoutines.remove.success(createPayload({ dataType: DataType })));
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		if (showError) {
			SnackService.error(e.message);
		} else {
			console.warn(e);
		}
	} finally {
		yield put(routine.fulfill());
	}
}

export function* get() {
	yield call(getData, routines.get, true);
}

export function* hotReload() {
	yield call(getData, routines.hotReload, false);
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
		takeLatest(routines.hotReload.TRIGGER, hotReload),
		takeEvery(routines.create.TRIGGER, create),
		takeEvery(routines.remove.TRIGGER, remove),
	]);
}