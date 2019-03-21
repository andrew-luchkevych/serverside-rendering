import { all, fork } from "redux-saga/effects";
import UserSaga from "./user/saga";
import FoodTypesSaga from "./foodTypes/saga";
import FoodProvidersSaga from "./foodProviders/saga";
import ForceReloadDataSaga from "./forceReloadData/saga";
export default function* root() {
	yield all([
		fork(UserSaga),
		fork(FoodTypesSaga),
		fork(FoodProvidersSaga),
		fork(ForceReloadDataSaga),
	]);
}