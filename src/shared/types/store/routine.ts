
import { TakeableChannel } from "@redux-saga/core";
import ReduxAction, { ReduxActionPayload } from "./action";

export interface BasicRoutine<InputParams> {
	TRIGGER: TakeableChannel<any>;
	trigger: (params: InputParams) => ReduxAction;
	request: () => ReduxAction;
	success: (payload: ReduxActionPayload) => ReduxAction;
	failure: (payload: ReduxActionPayload) => ReduxAction;
	fulfill: () => ReduxAction;
}