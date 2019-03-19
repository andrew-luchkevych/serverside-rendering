import { all, fork } from "redux-saga/effects";
import UserSaga from "./user/saga";
import FoodTypeSaga from "./foodType/saga";
export default function* root() {
	yield all([
		fork(UserSaga),
		fork(FoodTypeSaga),
	]);
}