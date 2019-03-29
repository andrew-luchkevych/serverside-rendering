import ReduxReducer from "../../types/store/reducer";
import OrderProps from "../../types/Order/Order";
import routines from "./routines";
import BasicReducerState from "../../types/store/state";

export interface OrderState extends BasicReducerState {
	data?: OrderProps;
}

export const orderInitialState: OrderState = {
	data: undefined,
	processing: false,
	loaded: false,
};

const FoodProviderReducer: ReduxReducer<OrderState> = (state = orderInitialState, action) => {
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
		case routines.hotReload.SUCCESS: return {
			...state,
			data: action.payload.data,
			loaded: true,
		};
		default: return state;
	}
};

export default FoodProviderReducer;