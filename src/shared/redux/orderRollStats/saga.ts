import { put, call, all, takeLatest } from "redux-saga/effects";
import OrderRollStatsProps from "../../types/Order/OrderRollStats";
import SnackService from "../../services/SnackService";
import BasicRoutine from "../../types/store/routine";
import DataTypes from "../../types/dataTypes";
import forceReloadRoutines from "../forceReloadData/routines";
import createPayload from "../createPayload";
import routines from "./routines";
import api from "./api";

const DataType: DataTypes = "orderRollStats";

export function* getData(routine: BasicRoutine, showError = true) {
	try {
		yield put(routine.request());
		const data: OrderRollStatsProps = yield call(api.get);
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