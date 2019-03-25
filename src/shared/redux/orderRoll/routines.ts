import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
export const get: BasicRoutine<void> = createRoutine("ORDER_ROLL/GET");
export default {
	get,
};