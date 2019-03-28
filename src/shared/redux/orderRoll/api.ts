import axios from "axios";
export const get = async () => axios
	.get(`/api/v1/OrderRoll`)
	.then(response => response.data);
export const create = async () => axios
	.post(`/api/v1/OrderRoll`)
	.then(response => response.data);
export const remove = async () => axios
	.delete(`/api/v1/OrderRoll`)
	.then(response => response.data);
export default {
	get,
	create,
	remove,
};