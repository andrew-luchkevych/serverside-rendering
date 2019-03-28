
import { TakeableChannel } from "@redux-saga/core";
import ReduxAction, { ReduxActionPayload } from "./action";
export interface BasicRoutine<
	TriggerProps = any,
	RequestProps = any,
	SuccessProps = any,
	FailureProps = any,
	FulfillProps = any,
	> {
	TRIGGER: TakeableChannel<any>;
	REQUEST: string;
	SUCCESS: string;
	FAILURE: string;
	FULFILL: string;
	trigger: (payload: TriggerProps) => ReduxAction<TriggerProps>;
	request: (payload?: ReduxActionPayload<RequestProps>) => ReduxAction<RequestProps>;
	success: (payload?: ReduxActionPayload<SuccessProps>) => ReduxAction<SuccessProps>;
	failure: (payload?: ReduxActionPayload<FailureProps>) => ReduxAction<FailureProps>;
	fulfill: (payload?: ReduxActionPayload<FulfillProps>) => ReduxAction<FulfillProps>;
}

export default BasicRoutine;