import axios from "axios";
import { OrderRollStatsProps } from "../../types/Order/OrderRollStats";
export const get = async (): Promise<OrderRollStatsProps> => axios
	.get(`/api/v1/OrderRoll/stats`)
	.then(response => response.data);
export default {
	get,
};