import axios, { AxiosResponse } from "axios";
import { UserLoginResponse } from "../../types/api/responses/user";
import { config } from "../../config/http";
export interface ApiLoginProps {
	email: string;
	password: string;
}

export interface ApiSignUpProps extends ApiLoginProps {
	profile: {
		name: string;
	};
}

const handleSignResponse = (response: AxiosResponse<any>) => {
	const { data }: { data: UserLoginResponse } = response;
	localStorage.setItem("token", data.token);
	config();
	return data.user;
};

export const login = async (data: ApiLoginProps) => axios
	.post(`/api/signin`, data)
	.then(handleSignResponse);

export const signup = async (data: ApiSignUpProps) => axios
	.post(`/api/signup`, data)
	.then(response => handleSignResponse(response));

export const logout = () => {
	axios.put(`/api/logout`);
	localStorage.removeItem("token");
};

export default {
	login,
	signup,
	logout,
};