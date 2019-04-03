import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
import { CreateMessageApiProps, EditMessageApiProps, RemoveMessageApiProps } from "./api";
import MessageProps from "../../types/Message";
import { SubmissionControlProps } from "../../utils/formSubmission";

export interface CreateMessageTriggerProps {
	data: CreateMessageApiProps;
	controller: SubmissionControlProps;
}
export interface EditMessageTriggerProps {
	data: EditMessageApiProps;
	controller: SubmissionControlProps;
}
export interface RemoveMessageTriggerProps {
	data: RemoveMessageApiProps;
}

export interface GetMessagesSuccessProps {
	items: MessageProps[];
}

export interface MoreMessagesSuccessProps {
	items: MessageProps[];
	page: number;
}
export const get: BasicRoutine<void, void, GetMessagesSuccessProps> = createRoutine("MESSAGES/GET");

export const more: BasicRoutine<void, void, MoreMessagesSuccessProps> = createRoutine("MESSAGES/MORE");

export const create: BasicRoutine<
	CreateMessageTriggerProps,
	void,
	MessageProps
> = createRoutine("MESSAGES/CREATE");

export const edit: BasicRoutine<
	EditMessageTriggerProps,
	void,
	MessageProps
> = createRoutine("MESSAGES/EDIT");

export const remove: BasicRoutine<RemoveMessageTriggerProps, { _id: string }, MessageProps> = createRoutine("MESSAGES/REMOVE");

export default {
	get,
	more,
	create,
	edit,
	remove,
};