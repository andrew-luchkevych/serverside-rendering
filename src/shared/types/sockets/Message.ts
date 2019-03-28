import { AnyObject } from "../Basic";
import SocketMessageTypes from "./MessageTypes";

export interface SocketMessage {
	type: SocketMessageTypes;
	data?: AnyObject;
}
export default SocketMessage;