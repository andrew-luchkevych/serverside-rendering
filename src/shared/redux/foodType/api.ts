import axios, { AxiosResponse } from "axios";
export const get = async () => axios
	.get(`/api/v1/FoodType`)
	.then(response => response.data);

export default {
	get,
};