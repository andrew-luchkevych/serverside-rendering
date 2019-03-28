import axios from "axios";
import OrderProps from "../../types/Order/Order";
export const get = async (): Promise<OrderProps> => axios
	.get(`/api/v1/Order`)
	.then(response => response.data);
export default {
	get,
};