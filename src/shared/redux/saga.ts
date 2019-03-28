import { all, fork } from "redux-saga/effects";
import UserSaga from "./user/saga";
import FoodTypesSaga from "./foodTypes/saga";
import FoodProvidersSaga from "./foodProviders/saga";
import ForceReloadDataSaga from "./forceReloadData/saga";
import OrderSaga from "./order/saga";
import OrderRollSaga from "./orderRoll/saga";
import OrderRollStatsSaga from "./orderRollStats/saga";
import OrderFoodProviderVotesSaga from "./orderFoodProviderVotes/saga";
export default function* root() {
	yield all([
		fork(UserSaga),
		fork(FoodTypesSaga),
		fork(FoodProvidersSaga),
		fork(ForceReloadDataSaga),
		fork(OrderSaga),
		fork(OrderRollSaga),
		fork(OrderRollStatsSaga),
		fork(OrderFoodProviderVotesSaga),
	]);
}