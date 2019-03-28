export interface ReduxActionPayload<T = any> {
	data: T;
	error?: Error;
}
export interface ReduxAction<T = any> {
	type: string;
	payload: ReduxActionPayload<T>;
}

export default ReduxAction;