import UserProps from "./User";

export interface MessageProps {
	_id: string;
	author: UserProps;
	text: string;
	deleted?: boolean;
}

export default MessageProps;