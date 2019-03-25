import ReduxReducer from "../../types/store/reducer";
import OrderProps from "../../types/Order/Order";
import routines from "./routines";

export interface OrderState {
	data?: OrderProps;
	processing: boolean;
	loaded: boolean;
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
		default: return state;
	}
};

export default FoodProviderReducer;