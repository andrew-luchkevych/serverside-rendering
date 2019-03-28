import { put, call, all, takeLatest } from "redux-saga/effects";
import SnackService from "../../services/SnackService";
import createPayload from "../createPayload";
import routines from "./routines";
import api from "./api";
import OrderProps from "../../types/Order/Order";

export function* get() {
	const { get: routine } = routines;
	try {
		yield put(routine.request());
		const data: OrderProps = yield call(api.get);
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