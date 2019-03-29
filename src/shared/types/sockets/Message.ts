import { AnyObject } from "../Basic";
import SocketMessageTypes from "./MessageTypes";
type userId = string;
export type SocketMessageInitiator = "server" | userId;
export interface SocketMessage {
	type: SocketMessageTypes;
	initiator: SocketMessageInitiator;
	data: AnyObject;
}
export default SocketMessage;