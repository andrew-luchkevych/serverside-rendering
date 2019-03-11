import { createRoutine } from "redux-saga-routines";

export const get = createRoutine("USERS_GET");
export const queryChange = createRoutine("USERS_QUERY_CHANGE");

export default {
	get,
	queryChange,
};