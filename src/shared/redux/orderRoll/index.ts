import ReduxReducer from "../../types/store/reducer";
import OrderRollProps from "../../types/Order/OrderRoll";
import routines from "./routines";

export interface OrderRollState {
	data?: OrderRollProps;
	processing: boolean;
	loaded: boolean;
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
		case routines.remove.REQUEST: return {
			...state,
			data: undefined,
		};
		default: return state;
	}
};

export default FoodProviderReducer;