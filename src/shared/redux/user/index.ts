import ReduxReducer from "../../types/store/reducer";
import UserProps from "../../types/User";

export interface UserState {
	data?: UserProps;
	logged: boolean;
}

export const userInitialState: UserState = {
	data: undefined,
	logged: false,
};

const UserReducer: ReduxReducer<UserState> = (state = userInitialState, action) => {
	switch (action.type) {
		default: return state;
	}
};

export default UserReducer;