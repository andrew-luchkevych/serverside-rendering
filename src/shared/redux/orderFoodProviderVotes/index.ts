import { Map, fromJS } from "immutable";
import ReduxReducer from "../../types/store/reducer";
import OrderFoodProviderVoteProps from "../../types/Order/OrderFoodProviderVote";
import routines from "./routines";
import { fixAfterRehydrate } from "../../utils/map";

export interface OrderFoodProviderVoteState {
	data: Map<string, OrderFoodProviderVoteProps>;
	processing: boolean;
	loaded: boolean;
}

export const orderFoodProviderVoteInitialState: OrderFoodProviderVoteState = {
	data: Map(),
	processing: false,
	loaded: false,
};
const mapKey = (v: { user: { _id: string }, foodProviderId: string }): string =>
	v.user._id + "|" + v.foodProviderId;
export const OrderFoodProviderVoteReducer: ReduxReducer<OrderFoodProviderVoteState> = (state = orderFoodProviderVoteInitialState, action) => {
	state.data = fixAfterRehydrate(state.data);
	switch (action.type) {
		case routines.get.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.get.SUCCESS: return {
			...state,
			data: Map(action.payload.data.map((vote: OrderFoodProviderVoteProps) => [mapKey(vote), vote])),
			loaded: true,
		};
		case routines.get.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.create.REQUEST:
			return {
				...state,
				data: action.payload.data
					? state.data.set(mapKey(action.payload.data), { ...action.payload.data })
					: state.data,
			};
		case routines.create.SUCCESS: return {
			...state,
			data: state.data.set(mapKey(action.payload.data), action.payload.data),
		};
		case routines.create.FAILURE:
			return {
				...state,
				data: action.payload.data
					? state.data.remove(mapKey(action.payload.data))
					: state.data,
			};
		case routines.create.FULFILL: return {
			...state,
		};
		case routines.remove.REQUEST:
			return {
				...state,
				data: action.payload.data
					? state.data.remove(mapKey(action.payload.data))
					: state.data,
			};
		default: return state;
	}
};

export default OrderFoodProviderVoteReducer;