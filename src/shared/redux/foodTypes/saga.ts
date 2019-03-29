import { put, call, all, takeLatest, takeEvery } from "redux-saga/effects";
import SnackService from "../../services/SnackService";
import BasicRoutine from "../../types/store/routine";
import { ApiSuccessResponse } from "../../types/api/responses";
import FoodTypeProps from "../../types/FoodType";
import DataTypes from "../../types/dataTypes";
import createPayload from "../createPayload";
import forceReloadRoutines from "../forceReloadData/routines";
import routines, { CreateFoodTypeTriggerProps, EditFoodTypeTriggerProps, RemoveFoodTypeTriggerProps } from "./routines";
import forceReloadDataRoutines from "../forceReloadData/routines";
import api from "./api";

const DataType: DataTypes = "foodTypes";

export function* getData(routine: BasicRoutine, showError = true) {
	try {
		yield put(routine.request());
		const data: FoodTypeProps[] = yield call(api.get);
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

export function* create({ payload }: { payload: CreateFoodTypeTriggerProps }) {
	const { create: routine } = routines;
	try {
		yield put(routine.request());
		const foodType: FoodTypeProps = yield call(api.create, payload.data);
		yield put(routine.success(createPayload(foodType)));
		payload.controller.success();
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		SnackService.error(e.message);
		payload.controller.failure();
	} finally {
		yield put(routine.fulfill());
	}
}

export function* edit({ payload }: { payload: EditFoodTypeTriggerProps }) {
	const { edit: routine } = routines;
	const { add: forceReload } = forceReloadDataRoutines;
	try {
		yield put(routine.request());
		const foodType: FoodTypeProps = yield call(api.edit, payload.data);
		yield put(routine.success(createPayload(foodType)));
		payload.controller.success();
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		SnackService.error(e.message);
		payload.controller.failure();
	} finally {
		yield put(routine.fulfill());
	}
}

export function* remove({ payload }: { payload: RemoveFoodTypeTriggerProps }) {
	const { remove: routine } = routines;
	try {
		yield put(routine.request());
		const response: ApiSuccessResponse = yield call(api.remove, payload.data);
		SnackService.success(response.msg);
		yield put(routine.success(payload));
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
		takeEvery(routines.edit.TRIGGER, edit),
		takeEvery(routines.remove.TRIGGER, remove),
	]);
}