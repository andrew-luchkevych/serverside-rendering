import axios from "axios";
export const get = async () => axios
	.get(`/api/v1/Order`)
	.then(response => response.data);
export default {
	get,
};