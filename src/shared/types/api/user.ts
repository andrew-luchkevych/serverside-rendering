import UserProps from "../User";
import { ApiResponse } from "./response";

export interface UserLoginResponse extends ApiResponse {
	user?: UserProps;
	token?: string;
}