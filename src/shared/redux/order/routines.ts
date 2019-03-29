import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
import OrderProps from "../../types/Order/Order";
export const get: BasicRoutine<void, void, OrderProps> = createRoutine("ORDER/GET");
export const hotReload: BasicRoutine<void> = createRoutine("ORDER/HOT_RELOAD");
export default {
	get,
	hotReload,
};