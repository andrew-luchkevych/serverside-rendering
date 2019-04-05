import { put, call, select, all, takeLatest, takeEvery } from "redux-saga/effects";
import SnackService from "../../services/SnackService";
import { ApiSuccessResponse } from "../../types/api/responses";
import MessageProps from "../../types/Message";
import DataTypes from "../../types/dataTypes";
import createPayload from "../createPayload";
import routines, { CreateMessageTriggerProps, EditMessageTriggerProps, RemoveMessageTriggerProps } from "./routines";
import api from "./api";
import { getMessagesPage } from "./selectors";

export const DataType: DataTypes = "messages";

export function* get() {
	const { get: routine } = routines;
	try {
		yield put(routine.request());
		const items: Array<MessageProps> = yield call(api.get, { page: 0 });
		yield put(routine.success(createPayload({ items })));
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		SnackService.error(e.message);
	} finally {
		yield put(routine.fulfill());
	}
}

export function* more() {
	const { more: routine } = routines;
	try {
		let page = yield select(getMessagesPage) as any;
		console.log({ page });
		page++;
		yield put(routine.request());
		const items: Array<MessageProps> = yield call(api.get, { page });
		yield put(routine.success(createPayload({ items, page })));
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		SnackService.error(e.message);
	} finally {
		yield put(routine.fulfill());
	}
}

export function* create({ payload }: { payload: CreateMessageTriggerProps }) {
	const { create: routine } = routines;
	try {
		yield put(routine.request());
		const item: MessageProps = yield call(api.create, payload.data);
		yield put(routine.success(createPayload(item)));
		payload.controller.success();
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		SnackService.error(e.message);
		payload.controller.failure();
	} finally {
		yield put(routine.fulfill());
	}
}

export function* edit({ payload }: { payload: EditMessageTriggerProps }) {
	const { edit: routine } = routines;
	try {
		yield put(routine.request());
		const item: MessageProps = yield call(api.edit, payload.data);
		yield put(routine.success(createPayload(item)));
		payload.controller.success();
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		SnackService.error(e.message);
		payload.controller.failure();
	} finally {
		yield put(routine.fulfill());
	}
}

export function* remove({ payload }: { payload: RemoveMessageTriggerProps }) {
	const { remove: routine } = routines;
	try {
		yield put(routine.request(createPayload(payload.data)));
		const item: MessageProps = yield call(api.remove, payload.data);
		yield put(routine.success(createPayload(item)));
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
		takeLatest(routines.more.TRIGGER, more),
		takeEvery(routines.create.TRIGGER, create),
		takeEvery(routines.edit.TRIGGER, edit),
		takeEvery(routines.remove.TRIGGER, remove),
	]);
}