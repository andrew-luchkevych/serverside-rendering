import axios from "axios";
import OrderRollProps from "../../types/Order/OrderRoll";
import { ApiSuccessResponse } from "../../types/api/responses";
export const get = async (): Promise<OrderRollProps> => axios
	.get(`/api/v1/OrderRoll`)
	.then(response => response.data);
export const create = async (): Promise<OrderRollProps> => axios
	.post(`/api/v1/OrderRoll`)
	.then(response => response.data);
export const remove = async (): Promise<ApiSuccessResponse> => axios
	.delete(`/api/v1/OrderRoll`)
	.then(response => response.data);
export default {
	get,
	create,
	remove,
};