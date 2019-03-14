import ReduxReducer from "../../types/store/reducer";

export interface UserState {
	data?: {
		email: string;
	};
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