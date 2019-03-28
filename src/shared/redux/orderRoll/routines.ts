import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
export const get: BasicRoutine<void> = createRoutine("ORDER_ROLL/GET");
export const create: BasicRoutine<void> = createRoutine("ORDER_ROLL/CREATE");
export const remove: BasicRoutine<void> = createRoutine("ORDER_ROLL/REMOVE");
export default {
	get,
	create,
	remove,
};