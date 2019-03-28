import DataTypes from "../dataTypes";
import SocketMessage from "./Message";
import SocketMessageTypes from "./MessageTypes";
import { AnyObject } from "../Basic";

export interface DataItemMessage<T extends AnyObject> extends SocketMessage {
	type: SocketMessageTypes.createItem | SocketMessageTypes.updateItem;
	dataType: DataTypes;
	data: T;
}

export default DataItemMessage;