import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
import OrderRollProps from "../../types/Order/OrderRoll";

export const get: BasicRoutine<void, void, OrderRollProps> = createRoutine("ORDER_ROLL/GET");
export const create: BasicRoutine<void, void, OrderRollProps> = createRoutine("ORDER_ROLL/CREATE");
export const remove: BasicRoutine<void> = createRoutine("ORDER_ROLL/REMOVE");
export const hotReload: BasicRoutine<void> = createRoutine("ORDER_ROLL/HOT_RELOAD");
export default {
	get,
	create,
	remove,
	hotReload,
};