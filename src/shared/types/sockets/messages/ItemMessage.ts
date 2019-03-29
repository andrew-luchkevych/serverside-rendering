import DataTypes from "../../dataTypes";
import SocketMessage from "../Message";
import SocketMessageTypes from "../MessageTypes";
import { AnyObject } from "../../Basic";

export type ItemManipulations = "create" | "edit" | "remove";

export interface DataItemMessage<T extends AnyObject> extends SocketMessage {
	type: SocketMessageTypes.itemManipulation | SocketMessageTypes.info;
	data: {
		dataType: DataTypes,
		manipulation: ItemManipulations,
		item: T,
	};
}

export default DataItemMessage;