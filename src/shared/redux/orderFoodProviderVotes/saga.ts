import { put, call, all, takeLatest, takeEvery, select } from "redux-saga/effects";
import SnackService from "../../services/SnackService";
import OrderFoodProviderVoteProps from "../../types/Order/OrderFoodProviderVote";
import { ApiSuccessResponse } from "../../types/api/responses";
import { ReduxStoreState } from "../../types/store/RootReducer";
import DataTypes from "../../types/dataTypes";
import BasicRoutine from "../../types/store/routine";
import { getUserData } from "../user/selectors";
import { getOrderId } from "../order/selectors";
import forceReloadRoutines from "../forceReloadData/routines";
import createPayload from "../createPayload";
import routines, { OrderFoodProviderVoteTriggerProps } from "./routines";
import api from "./api";

const DataType: DataTypes = "orderFoodProviderVotes";

export function* getData(routine: BasicRoutine, showError = true) {
	try {
		yield put(routine.request());
		const data: Array<OrderFoodProviderVoteProps> = yield call(api.get);
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

function* createUserVote(foodProviderId: string) {
	const selector = (state: ReduxStoreState) => {
		const user = getUserData(state);
		const orderId = getOrderId(state);
		return {
			user, orderId,
		};
	};
	const { user, orderId } = yield select(selector);
	if (user && user._id && orderId) {
		const initial: OrderFoodProviderVoteProps = {
			user,
			foodProviderId,
			orderId,
		};
		return initial;
	}
	return;
}

export function* create({ payload }: { payload: OrderFoodProviderVoteTriggerProps }) {
	const { create: routine } = routines;
	let p: OrderFoodProviderVoteProps;
	try {
		p = yield call(createUserVote, payload.data.foodProviderId);
		yield put(routine.request(createPayload(p)));
		const data: OrderFoodProviderVoteProps = yield call(api.create, payload.data);
		yield put(routine.success(createPayload(data)));
	} catch (e) {
		yield put(routine.failure(createPayload(p, e)));
		SnackService.error(e.message);
	} finally {
		yield put(routine.fulfill());
	}
}

export function* remove({ payload }: { payload: OrderFoodProviderVoteTriggerProps }) {
	const { remove: routine } = routines;
	let p: OrderFoodProviderVoteProps;
	try {
		p = yield call(createUserVote, payload.data.foodProviderId);
		yield put(routine.request(createPayload(p)));
		const data: ApiSuccessResponse = yield call(api.remove, payload.data);
		yield put(routine.success(createPayload(p)));
		if (data.msg) {
			SnackService.success(data.msg);
		}
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
		takeEvery(routines.remove.TRIGGER, remove),
	]);
}