import { Map } from "immutable";
import BasicReducerState from "../../types/store/state";
import ReduxReducer from "../../types/store/reducer";
import OrderFoodProviderVoteProps from "../../types/Order/OrderFoodProviderVote";
import routines from "./routines";
import { fixAfterRehydrateMap } from "../../utils/map";

export interface OrderFoodProviderVoteState extends BasicReducerState {
	data: Map<string, OrderFoodProviderVoteProps>;
}

export const orderFoodProviderVoteInitialState: OrderFoodProviderVoteState = {
	data: Map(),
	processing: false,
	loaded: false,
};

const mapKey = (v: { user: { _id: string }, foodProviderId: string }): string =>
	v.user._id + "|" + v.foodProviderId;

export const OrderFoodProviderVoteReducer: ReduxReducer<OrderFoodProviderVoteState> = (state = orderFoodProviderVoteInitialState, action) => {
	state.data = fixAfterRehydrateMap(state.data);
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
		case routines.remove.SUCCESS:
			return {
				...state,
				data: action.payload.data
					? state.data.remove(mapKey(action.payload.data))
					: state.data,
			};
		case routines.hotReload.SUCCESS: return {
			...state,
			data: Map(action.payload.data.map((vote: OrderFoodProviderVoteProps) => [mapKey(vote), vote])),
			loaded: true,
		};
		default: return state;
	}
};

export default OrderFoodProviderVoteReducer;