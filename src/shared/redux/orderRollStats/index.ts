import ReduxReducer from "../../types/store/reducer";
import routines from "./routines";
import { OrderRollStatsProps } from "../../types/Order/OrderRollStats";

export interface OrderRollStatsState {
	data?: OrderRollStatsProps;
	processing: boolean;
	loaded: boolean;
}

export const orderRollInitialState: OrderRollStatsState = {
	data: undefined,
	processing: false,
	loaded: false,
};

const FoodProviderReducer: ReduxReducer<OrderRollStatsState> = (state = orderRollInitialState, action) => {
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