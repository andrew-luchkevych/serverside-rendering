import { put, call, all, takeLatest, takeEvery } from "redux-saga/effects";
import SnackService from "../../services/SnackService";
import { ApiSuccessResponse } from "../../types/api/responses";
import FoodTypeProps from "../../types/FoodType";
import createPayload from "../createPayload";
import routines, { CreateFoodTypeTriggerProps, EditFoodTypeTriggerProps, RemoveFoodTypeTriggerProps } from "./routines";
import forceReloadDataRoutines from "../forceReloadData/routines";
import api from "./api";
import DataTypes from "../forceReloadData/types";

export function* get() {
	const { get: routine } = routines;
	try {
		yield put(routine.request());
		const data: FoodTypeProps[] = yield call(api.get);
		yield put(routine.success(createPayload(data)));
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		SnackService.error(e.message);
	} finally {
		yield put(routine.fulfill());
	}
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
		yield put(forceReload.trigger({ dataType: DataTypes.foodType }));
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
	const { add: forceReload } = forceReloadDataRoutines;
	try {
		yield put(routine.request());
		const response: ApiSuccessResponse = yield call(api.remove, payload.data);
		SnackService.success(response.msg);
		yield put(routine.success(payload));
		yield put(forceReload.trigger({ dataType: DataTypes.foodType }));
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