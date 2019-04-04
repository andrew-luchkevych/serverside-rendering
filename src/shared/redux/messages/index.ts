import { OrderedMap } from "immutable";
import BasicReducerState from "../../types/store/state";
import ReduxReducer from "../../types/store/reducer";
import routines from "./routines";
import MessageProps from "../../types/Message";
import { fixAfterRehydrateOrderedMap } from "../../utils/map";
import { LIMIT } from "./api";

export interface MessagesState extends BasicReducerState {
	data: OrderedMap<string, MessageProps>;
	page: number;
	canLoadMore: boolean;
}

export const messagesInitialState: MessagesState = {
	data: OrderedMap(),
	page: 0,
	processing: false,
	loaded: false,
	canLoadMore: true,
};

const mapObjToOrderedMapArr = (item: MessageProps) => [item._id, item];
const mapArrToOrderedMapArr = (items: Array<MessageProps>) => items.map(mapObjToOrderedMapArr) as any;

const MessagesReducer: ReduxReducer<MessagesState> = (state = messagesInitialState, action) => {
	state.data = fixAfterRehydrateOrderedMap(state.data);
	switch (action.type) {
		case routines.get.REQUEST: return {
			...state,
			processing: true,
			canLoadMore: false,
		};
		case routines.get.SUCCESS: return {
			...state,
			data: OrderedMap(mapArrToOrderedMapArr(action.payload.data.items)),
			page: 0,
			loaded: true,
			canLoadMore: action.payload.data.items.length === LIMIT,
		};
		case routines.get.FAILURE: return {
			...state,
			canLoadMore: false,
		};
		case routines.get.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.more.REQUEST: return {
			...state,
			processing: true,
			canLoadMore: false,
		};
		case routines.more.SUCCESS: return {
			...state,
			data: state.data.merge(mapArrToOrderedMapArr(action.payload.data.items)),
			page: action.payload.data.page,
			loaded: true,
			canLoadMore: action.payload.data.items.length === LIMIT,
		};
		case routines.more.FAILURE: return {
			...state,
			canLoadMore: false,
		};
		case routines.more.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.create.SUCCESS: return {
			...state,
			data: state.data.set(action.payload.data._id, action.payload.data),
		};
		case routines.edit.SUCCESS:
			return {
				...state,
				data: state.data.set(action.payload.data._id, action.payload.data),
			};
		case routines.remove.REQUEST: return {
			...state,
			data: state.data.has(action.payload.data._id)
				? state.data.update(action.payload.data._id, v => ({ ...v, deleted: true }))
				: state.data,
		};
		case routines.remove.SUCCESS:
			return {
				...state,
				data: state.data.set(action.payload.data._id, action.payload.data),
			};
		default: return state;
	}
};

export default MessagesReducer;