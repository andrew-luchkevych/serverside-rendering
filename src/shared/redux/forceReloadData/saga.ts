import { put, all, takeEvery } from "redux-saga/effects";
import createPayload from "../createPayload";
import routines, { ForceReloadDataTriggerProps } from "./routines";

export function* add({ payload }: { payload: ForceReloadDataTriggerProps }) {
	const { add: routine } = routines;
	yield put(routine.success(createPayload(payload)));
}

export function* remove({ payload }: { payload: ForceReloadDataTriggerProps }) {
	const { remove: routine } = routines;
	yield put(routine.success(createPayload(payload)));
}

export default function* root() {
	yield all([
		takeEvery(routines.add.TRIGGER, add),
		takeEvery(routines.remove.TRIGGER, remove),
	]);
}