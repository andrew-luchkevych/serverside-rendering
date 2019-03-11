import routines from "./routines";
import Action from "../../../shared/store/action";
export interface UsersState {
	loading: boolean;
	loaded: boolean;
	items: Array<any>;
	error?: Error;
	query: string;
}
export const usersInitialState: UsersState = {
	loading: false,
	loaded: false,
	items: [],
	error: undefined,
	query: "",
};

export default (state: UsersState = usersInitialState, action: Action = { type: "", payload: { data: {} } }): UsersState => {
	switch (action.type) {
		case routines.get.REQUEST:
			return {
				...state,
				loading: true,
			};
		case routines.get.SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				items: action.payload.data.items,
				error: undefined,
			};
		case routines.get.FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
		case routines.queryChange.REQUEST:
			return {
				...state,
				query: action.payload.data.query,
			};
		default: return state;
	}
};