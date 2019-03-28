import axios from "axios";
import OrderFoodProviderVoteProps from "../../types/Order/OrderFoodProviderVote";

export interface OrderFoodProviderVoteApiProps {
	foodProviderId: string;
}

export const get = async () => axios
	.get(`/api/v1/OrderFoodProviderVote`)
	.then(response => response.data as Array<OrderFoodProviderVoteProps>);
export const create = async (data: OrderFoodProviderVoteApiProps) => axios
	.post(`/api/v1/OrderFoodProviderVote`, data)
	.then(response => response.data);
export const remove = async (data: OrderFoodProviderVoteApiProps) => axios
	.delete(`/api/v1/OrderFoodProviderVote`, { data })
	.then(response => response.data);
export default {
	get,
	create,
	remove,
};