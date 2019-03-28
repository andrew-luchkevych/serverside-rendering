import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
import { OrderFoodProviderVoteApiProps } from "./api";
export interface OrderFoodProviderVoteTriggerProps {
	data: OrderFoodProviderVoteApiProps;
}
export const get: BasicRoutine<void> = createRoutine("ORDER_FOOD_PROVIDER_VOTE/GET");
export const create: BasicRoutine<OrderFoodProviderVoteTriggerProps> = createRoutine("ORDER_FOOD_PROVIDER_VOTE/CREATE");
export const remove: BasicRoutine<OrderFoodProviderVoteTriggerProps> = createRoutine("ORDER_FOOD_PROVIDER_VOTE/REMOVE");
export default {
	get,
	create,
	remove,
};