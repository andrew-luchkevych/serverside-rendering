import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
import { OrderFoodProviderVoteApiProps } from "./api";
import OrderFoodProviderVoteProps from "../../types/Order/OrderFoodProviderVote";
export interface OrderFoodProviderVoteTriggerProps {
	data: OrderFoodProviderVoteApiProps;
}
export const get: BasicRoutine<void> = createRoutine("ORDER_FOOD_PROVIDER_VOTE/GET");
export const create: BasicRoutine<
	OrderFoodProviderVoteTriggerProps,
	OrderFoodProviderVoteProps,
	OrderFoodProviderVoteProps
> = createRoutine("ORDER_FOOD_PROVIDER_VOTE/CREATE");
export const remove: BasicRoutine<
	OrderFoodProviderVoteTriggerProps,
	OrderFoodProviderVoteProps,
	OrderFoodProviderVoteProps
> = createRoutine("ORDER_FOOD_PROVIDER_VOTE/REMOVE");
export default {
	get,
	create,
	remove,
};