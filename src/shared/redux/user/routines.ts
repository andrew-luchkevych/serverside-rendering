import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
import { ApiLoginProps } from "./api";
import { SubmissionControlProps } from "../../utils/formSubmission";
export interface LoginTriggerProps {
	data: ApiLoginProps;
	controller: SubmissionControlProps;
}
export const login: BasicRoutine<LoginTriggerProps> = createRoutine("USER_LOGIN");
export const logout: BasicRoutine<void> = createRoutine("USER_LOGOUT");
export default {
	login,
	logout,
};