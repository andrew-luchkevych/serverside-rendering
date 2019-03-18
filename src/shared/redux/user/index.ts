import ReduxReducer from "../../types/store/reducer";
import UserProps from "../../types/User";
import routines from "./routines";

export interface UserState {
	data?: UserProps;
	processing: boolean;
	logged: boolean;
}

export const userInitialState: UserState = {
	data: undefined,
	processing: false,
	logged: false,
};

const UserReducer: ReduxReducer<UserState> = (state = userInitialState, action) => {
	switch (action.type) {
		case routines.login.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.login.SUCCESS: return {
			...state,
			logged: true,
			data: action.payload.data,
		};
		case routines.login.FAILURE: return {
			...state,
			logged: false,
			data: undefined,
		};
		case routines.login.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.signup.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.signup.SUCCESS: return {
			...state,
			logged: true,
			data: action.payload.data,
		};
		case routines.signup.FAILURE: return {
			...state,
			logged: false,
			data: undefined,
		};
		case routines.signup.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.logout.SUCCESS: return {
			...userInitialState,
		};
		default: return state;
	}
};

export default UserReducer;