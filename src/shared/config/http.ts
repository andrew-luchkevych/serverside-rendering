import axios from "axios";

function getErrorFromResponse(response, defaultMessage = "Opps... Server error. Please reload page and try again.") {
	if (
		response
		&& response.data
		&& response.data.hasOwnProperty("success")
		&& response.data.success === false
	) {
		if (response.data.msg) {
			return new Error(response.data.msg);
		}
		return new Error(defaultMessage);
	}
	return false;
}
export function config() {
	const token = localStorage.getItem("token");
	axios.defaults.headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};

	axios.interceptors.response.use((response) => {
		const err = getErrorFromResponse(response);
		if (err) {
			return Promise.reject(err);
		}
		return response;
	}, (error) => {
		if (error.response && error.response.status) {
			let e: Error | false;
			switch (error.response.status) {
				case 400:
					e = getErrorFromResponse(error.response, "Hmmm... Something went wrong. Please reload page and try again.");
					break;
				case 401:
					return window.location.href = "/signin";
				default: e = getErrorFromResponse(error.response);
			}
			if (e) {
				return Promise.reject(e);
			}
		}
		return Promise.reject(error);
	});
}