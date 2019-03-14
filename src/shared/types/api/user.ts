import UserProps from "../User";

export interface UserLoginResponse {
	user: UserProps;
	token: string;
}