import { all, fork } from "redux-saga/effects";
import UserSaga from "./user/saga";
export default function* root() {
	yield all([
		fork(UserSaga),
	]);
}