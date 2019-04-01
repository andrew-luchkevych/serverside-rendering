import ReduxReducer from "../../types/store/reducer";
import OrderRollProps from "../../types/Order/OrderRoll";
import routines from "./routines";
import BasicReducerState from "../../types/store/state";

export interface OrderRollState extends BasicReducerState {
	data?: OrderRollProps;
}

export const orderRollInitialState: OrderRollState = {
	data: undefined,
	processing: false,
	loaded: false,
};

const FoodProviderReducer: ReduxReducer<OrderRollState> = (state = orderRollInitialState, action) => {
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
			loaded: true,
			processing: false,
		};
		case routines.create.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.create.SUCCESS: return {
			...state,
			data: action.payload.data,
			loaded: true,
		};
		case routines.create.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.remove.SUCCESS: return {
			...state,
			data: undefined,
		};
		case routines.hotReload.SUCCESS: return {
			...state,
			data: action.payload.data,
			loaded: true,
		};
		default: return state;
	}
};

export default FoodProviderReducer;