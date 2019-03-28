import { put, call, all, takeLatest, takeEvery, select } from "redux-saga/effects";
import SnackService from "../../services/SnackService";
import OrderFoodProviderVoteProps from "../../types/Order/OrderFoodProviderVote";
import createPayload from "../createPayload";
import routines, { OrderFoodProviderVoteTriggerProps } from "./routines";
import api from "./api";
import { ApiSuccessResponse } from "../../types/api/responses";
import { getUserData } from "../user/selectors";
import { ReduxStoreState } from "../../types/store/RootReducer";
import { getOrderId } from "../order/selectors";

export function* get() {
	const { get: routine } = routines;
	try {
		yield put(routine.request());
		const data: Array<OrderFoodProviderVoteProps> = yield call(api.get);
		yield put(routine.success(createPayload(data)));
	} catch (e) {
		yield put(routine.failure(createPayload(undefined, e)));
		SnackService.error(e.message);
	} finally {
		yield put(routine.fulfill());
	}
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
		takeEvery(routines.create.TRIGGER, create),
		takeEvery(routines.remove.TRIGGER, remove),
	]);
}