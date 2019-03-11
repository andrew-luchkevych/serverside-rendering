export interface ActionPayload {
	data: any;
	error?: Error;
}
export interface Action {
	type: string;
	payload: ActionPayload;
}

export default Action;