import axios from "axios";
import OrderFoodProviderVoteProps from "../../types/Order/OrderFoodProviderVote";
import { ApiSuccessResponse } from "../../types/api/responses";

export interface OrderFoodProviderVoteApiProps {
	foodProviderId: string;
}

export const get = async (): Promise<OrderFoodProviderVoteProps[]> => axios
	.get(`/api/v1/OrderFoodProviderVote`)
	.then(response => response.data);
export const create = async (data: OrderFoodProviderVoteApiProps): Promise<OrderFoodProviderVoteProps> => axios
	.post(`/api/v1/OrderFoodProviderVote`, data)
	.then(response => response.data);
export const remove = async (data: OrderFoodProviderVoteApiProps): Promise<ApiSuccessResponse> => axios
	.delete(`/api/v1/OrderFoodProviderVote`, { data })
	.then(response => response.data);
export default {
	get,
	create,
	remove,
};