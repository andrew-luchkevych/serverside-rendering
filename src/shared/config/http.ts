import axios from "axios";
import { ApiResponse } from "../../shared/types/api/responses";
export function config() {
	const token = localStorage.getItem("token");
	axios.defaults.headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};

	axios.interceptors.response.use(response => response, (error) => {
		// check for errorHandle config
		if (error.config && error.config.hasOwnProperty("errorHandle") && error.config.errorHandle === false) {
			return Promise.reject(error);
		}
		const { response: { data } }: { response: { data: ApiResponse } } = error;
		if (data && !data.success && data.msg) {
			return Promise.reject(new Error(data.msg));
		}
	});
}