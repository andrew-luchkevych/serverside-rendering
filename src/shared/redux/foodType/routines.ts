import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
export const get: BasicRoutine<void> = createRoutine("FOOD_TYPE_GET");
export default {
	get,
};