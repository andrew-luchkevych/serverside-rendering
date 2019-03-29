import { put, call, all, takeLatest } from "redux-saga/effects";
import SnackService from "../../services/SnackService";
import createPayload from "../createPayload";
import DataTypes from "../../types/dataTypes";
import OrderProps from "../../types/Order/Order";
import BasicRoutine from "../../types/store/routine";
import forceReloadRoutines from "../forceReloadData/routines";
import routines from "./routines";
import api from "./api";

const DataType: DataTypes = "order";

export function* getData(routine: BasicRoutine, showError = true) {
	try {
		yield put(routine.request());
		const data: OrderProps = yield call(api.get);
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

export default function* root() {
	yield all([
		takeLatest(routines.get.TRIGGER, get),
		takeLatest(routines.hotReload.TRIGGER, hotReload),
	]);
}