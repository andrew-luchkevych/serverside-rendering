import ReduxReducer from "../../types/store/reducer";
import FoodProviderProps from "../../types/FoodProvider";
import { findAndReplaceImmutable, findAndRemoveImmutable } from "../../utils/array";
import routines from "./routines";

export interface FoodProvidersState {
	data: Array<FoodProviderProps>;
	processing: boolean;
	loaded: boolean;
}

export const foodTypeInitialState: FoodProvidersState = {
	data: [],
	processing: false,
	loaded: false,
};

const FoodProviderReducer: ReduxReducer<FoodProvidersState> = (state = foodTypeInitialState, action) => {
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
		case routines.create.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.create.SUCCESS: return {
			...state,
			data: [...state.data, action.payload.data],
		};
		case routines.create.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.edit.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.edit.SUCCESS:
			return {
				...state,
				data: findAndReplaceImmutable<FoodProviderProps>(action.payload.data, state.data, el => el._id === action.payload.data._id),
			};
		case routines.edit.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.remove.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.remove.SUCCESS: return {
			...state,
			data: findAndRemoveImmutable<FoodProviderProps>(state.data, el => el._id === action.payload.data._id),
		};
		case routines.remove.FULFILL: return {
			...state,
			processing: false,
		};
		default: return state;
	}
};

export default FoodProviderReducer;