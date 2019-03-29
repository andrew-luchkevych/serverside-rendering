import { put, call, all, takeLatest, takeEvery } from "redux-saga/effects";
import SnackService from "../../services/SnackService";
import { ApiSuccessResponse } from "../../types/api/responses";
import FoodProviderProps from "../../types/FoodProvider";
import BasicRoutine from "../../types/store/routine";
import DataTypes from "../../types/dataTypes";
import forceReloadRoutines from "../forceReloadData/routines";
import createPayload from "../createPayload";
import routines, { CreateFoodProviderTriggerProps, EditFoodProviderTriggerProps, RemoveFoodProviderTriggerProps } from "./routines";
import api from "./api";

export const DataType: DataTypes = "foodProviders";

export function* getData(routine: BasicRoutine, showError: boolean = true) {
	try {
		yield put(routine.request());
		const data: Array<FoodProviderProps> = yield call(api.get);
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

export function* create({ payload }: { payload: CreateFoodProviderTriggerProps }) {
	const { create: routine } = routines;
	try {
		yield put(routine.request());
		const foodType: FoodProviderProps = yield call(api.create, payload.data);
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

export function* edit({ payload }: { payload: EditFoodProviderTriggerProps }) {
	const { edit: routine } = routines;
	try {
		yield put(routine.request());
		const foodType: FoodProviderProps = yield call(api.edit, payload.data);
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

export function* remove({ payload }: { payload: RemoveFoodProviderTriggerProps }) {
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