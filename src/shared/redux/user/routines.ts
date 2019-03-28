import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
import { ApiLoginProps, ApiSignUpProps } from "./api";
import { SubmissionControlProps } from "../../utils/formSubmission";
import UserProps from "../../types/User";
export interface LoginTriggerProps {
	data: ApiLoginProps;
	controller: SubmissionControlProps;
}
export interface SignUpTriggerProps {
	data: ApiSignUpProps;
	controller: SubmissionControlProps;
}
export const login: BasicRoutine<LoginTriggerProps, void, UserProps> = createRoutine("USER/LOGIN");
export const signup: BasicRoutine<SignUpTriggerProps, void, UserProps> = createRoutine("USER/SIGNUP");
export const logout: BasicRoutine<void> = createRoutine("USER/LOGOUT");
export default {
	login,
	signup,
	logout,
};