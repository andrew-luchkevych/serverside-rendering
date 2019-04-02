import { Map as ImmutableMap } from "immutable";
import BasicReducerState from "../../types/store/state";
import ReduxReducer from "../../types/store/reducer";
import routines from "./routines";
import MessageProps from "../../types/Message";
import { fixAfterRehydrate } from "../../utils/map";

export interface MessagesState extends BasicReducerState {
	data: ImmutableMap<string, MessageProps>;
	page: number;
}

export const messagesInitialState: MessagesState = {
	data: ImmutableMap(),
	page: 0,
	processing: false,
	loaded: false,
};

const mapObjToImmutableMapArr = (item: MessageProps) => [item._id, item];
const mapArrToImmutableMapArr = (items: Array<MessageProps>) => items.map(mapObjToImmutableMapArr) as any;

const MessagesReducer: ReduxReducer<MessagesState> = (state = messagesInitialState, action) => {
	fixAfterRehydrate(state);
	switch (action.type) {
		case routines.get.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.get.SUCCESS: return {
			...state,
			data: ImmutableMap(mapArrToImmutableMapArr(action.payload.data.items)),
			page: 0,
			loaded: true,
		};
		case routines.get.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.more.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.more.SUCCESS: return {
			...state,
			data: state.data.merge(mapArrToImmutableMapArr(action.payload.data.items)),
			page: action.payload.data.page,
			loaded: true,
		};
		case routines.more.FULFILL: return {
			...state,
			processing: false,
		};
		case routines.create.REQUEST: return {
			...state,
			processing: true,
		};
		case routines.create.SUCCESS: return {
			...state,
			data: state.data.set(action.payload.data._id, action.payload.data),
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
				data: state.data.set(action.payload.data._id, action.payload.data),
			};
		case routines.edit.FULFILL: return {
			...state,
			processing: false,
		};
		default: return state;
	}
};

export default MessagesReducer;