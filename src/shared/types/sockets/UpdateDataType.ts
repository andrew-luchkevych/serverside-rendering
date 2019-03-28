import DataTypes from "../dataTypes";
import SocketMessage from "./Message";
import SocketMessageTypes from "./MessageTypes";

export interface UpdateDataTypeMessage extends SocketMessage {
	type: SocketMessageTypes.updateDataType;
	dataType: DataTypes;
	data: undefined;
}