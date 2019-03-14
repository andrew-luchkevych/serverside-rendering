import axios from "axios";
import { UserLoginResponse } from "../../../shared/types/api/user";

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
			return data;
		} else {
			if (response.data.error) {
				throw new Error(response.data.error);
			}
			throw new Error();
		}
	});

export default {
	login,
};