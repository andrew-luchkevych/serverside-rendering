import { all, fork } from "redux-saga/effects";
import UsersSaga from "./users/saga";
export default function* root() {
	yield all([
		fork(UsersSaga),
	]);
}