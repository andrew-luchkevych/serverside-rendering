import axios from "axios";
import { UserLoginResponse } from "../../../shared/types/api/user";
import { response } from "express";

export type ApiLoginProps = {
	email: string;
	password: string;
};
export const login = async (data: ApiLoginProps) => axios
	.post(`/api/login`, data)
	.then((response) => {
		if (response.status === 200) {
			const { data }: { data: UserLoginResponse } = response;
			localStorage.setItem("token", data.token);
			return data.user;
		} else {
			if (response.data.error) {
				throw new Error(response.data.error);
			}
			throw new Error();
		}
	});

export const logout = () => {
	axios.put(`/api/logout`);
	localStorage.removeItem("token");
};

export default {
	login,
	logout,
};