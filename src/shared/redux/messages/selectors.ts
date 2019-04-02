import { ReduxStoreState } from "../../types/store/RootReducer";
import MessageProps from "../../types/Message";

export const getMessagesState = ({ messages }: ReduxStoreState) => messages;
export const getMessagesPage = ({ messages: { page } }: ReduxStoreState) => page;
export const getMessageById = (id: string) =>
	({ messages: { data } }: ReduxStoreState): MessageProps | undefined =>
		data.find(m => m._id === id);