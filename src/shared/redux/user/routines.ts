import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
import { ApiLoginProps } from "./api";
export const login: BasicRoutine<ApiLoginProps> = createRoutine("USER_LOGIN");

export default {
	login,
};