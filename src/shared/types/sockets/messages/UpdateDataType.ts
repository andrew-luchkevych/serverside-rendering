import DataTypes from "../../dataTypes";
import SocketMessage from "../Message";

export interface UpdateDataTypeMessage extends SocketMessage {
	data: {
		dataType: DataTypes,
	};
}