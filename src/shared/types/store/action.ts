export interface ReduxActionPayload {
	data: any;
	error?: Error;
}
export interface ReduxAction {
	type: string;
	payload: ReduxActionPayload;
}

export default ReduxAction;