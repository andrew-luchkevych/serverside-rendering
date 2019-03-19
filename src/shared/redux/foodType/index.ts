import ReduxReducer from "../../types/store/reducer";
import FoodTypeProps from "../../types/FoodType";
import routines from "./routines";

export interface FoodTypeState {
	data: Array<FoodTypeProps>;
	processing: boolean;
	loaded: boolean;
}

export const foodTypeInitialState: FoodTypeState = {
	data: [],
	processing: false,
	loaded: false,
};

const UserReducer: ReduxReducer<FoodTypeState> = (state = foodTypeInitialState, action) => {
	switch (action.type) {
		case routines.get.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.get.SUCCESS: return {
			...state,
			data: action.payload.data,
			loaded: true,
		};
		case routines.get.FULFILL: return {
			...state,
			processing: false,
		};
		default: return state;
	}
};

export default UserReducer;