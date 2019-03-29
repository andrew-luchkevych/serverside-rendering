import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
import { OrderRollStatsProps } from "../../types/Order/OrderRollStats";
export const get: BasicRoutine<void, void, OrderRollStatsProps> = createRoutine("ORDER_ROLL_STATS/GET");
export const hotReload: BasicRoutine<void> = createRoutine("ORDER_ROLL_STATS/HOT_RELOAD");
export default {
	get,
	hotReload,
};