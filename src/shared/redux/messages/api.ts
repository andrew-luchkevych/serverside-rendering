import axios from "axios";
import { ApiSuccessResponse } from "../../types/api/responses";
import MessageProps from "../../types/Message";

export const LIMIT = 20;

export interface GetMessagesApiProps {
	page: number;
}

export interface CreateMessageApiProps {
	text: string;
}

export interface EditMessageApiProps {
	_id: string;
	text: string;
}

export interface RemoveMessageApiProps {
	_id: string;
}

export const get = async (args: GetMessagesApiProps): Promise<MessageProps[]> => axios
	.get(`/api/v1/Message`, { params: { limit: LIMIT, skip: LIMIT * args.page } })
	.then(response => response.data);

export const create = async (data: CreateMessageApiProps): Promise<MessageProps> => axios
	.post(`/api/v1/Message`, data)
	.then(response => response.data);

export const edit = async (data: EditMessageApiProps): Promise<MessageProps> => axios
	.patch(`/api/v1/Message/${data._id}`, data)
	.then(response => response.data);

export const remove = async (data: RemoveMessageApiProps): Promise<ApiSuccessResponse> => axios
	.delete(`/api/v1/Message/${data._id}`)
	.then(response => response.data);
export default {
	get,
	create,
	edit,
	remove,
};