import ReduxReducer from "../../types/store/reducer";
import routines from "./routines";
import { OrderRollStatsProps } from "../../types/Order/OrderRollStats";
import BasicReducerState from "../../types/store/state";

export interface OrderRollStatsState extends BasicReducerState {
	data?: OrderRollStatsProps;
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
		case routines.hotReload.SUCCESS: return {
			...state,
			data: action.payload.data,
			loaded: true,
		};
		default: return state;
	}
};

export default FoodProviderReducer;