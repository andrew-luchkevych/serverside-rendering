import { put, call, all, takeLatest, takeEvery } from "redux-saga/effects";
import createPayload from "../createPayload";
import api from "./api";
import routines from "./routines";
import FoodTypeProps from "../../types/FoodType";
import SnackService from "../../services/SnackService";

export function* get() {
	const { get: routine } = routines;
	try {
		yield put(routine.request());
		const data: Array<FoodTypeProps> = yield call(api.get);
		yield put(routine.success(createPayload(data)));
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
	]);
}