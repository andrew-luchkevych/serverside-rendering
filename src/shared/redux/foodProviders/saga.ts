import { put, call, all, takeLatest, takeEvery } from "redux-saga/effects";
import SnackService from "../../services/SnackService";
import { ApiSuccessResponse } from "../../types/api/responses";
import FoodProviderProps from "../../types/FoodProvider";
import createPayload from "../createPayload";
import routines, { CreateFoodProviderTriggerProps, EditFoodProviderTriggerProps, RemoveFoodProviderTriggerProps } from "./routines";
import { remove as reloaded } from "../forceReloadData/routines";
import api from "./api";
import DataTypes from "../forceReloadData/types";

export function* get() {
	const { get: routine } = routines;
	try {
		yield put(routine.request());
		const data: Array<FoodProviderProps> = yield call(api.get);
		yield put(routine.success(createPayload(data)));
		yield put(reloaded.trigger({ dataType: DataTypes.foodType }));
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		SnackService.error(e.message);
	} finally {
		yield put(routine.fulfill());
	}
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
		takeEvery(routines.create.TRIGGER, create),
		takeEvery(routines.edit.TRIGGER, edit),
		takeEvery(routines.remove.TRIGGER, remove),
	]);
}