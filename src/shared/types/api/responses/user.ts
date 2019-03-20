import UserProps from "../../User";
import { ApiResponse } from ".";

export interface UserLoginResponse extends ApiResponse {
	user?: UserProps;
	token?: string;
}