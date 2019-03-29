import { Express } from "express";
import { Server } from "http";
import SocketIO from "socket.io";
import SocketMessage, { SocketMessageInitiator } from "../../shared/types/sockets/Message";
import DataItemMessage, { ItemManipulations } from "../../shared/types/sockets/messages/ItemMessage";
import { AnyObject } from "../../shared/types/Basic";
import { UpdateDataTypeMessage } from "../../shared/types/sockets/messages/UpdateDataType";
import DataTypes from "../../shared/types/dataTypes";
import SocketMessageTypes from "../../shared/types/sockets/MessageTypes";
class SocketService {
	private static _instance: SocketService;
	private _io: SocketIO.Server;
	public constructor() {
		if (!SocketService._instance) {
			SocketService._instance = this;
		}
		return SocketService._instance;
	}
	public init(server: Server) {
		if (!this._io) {
			this._io = SocketIO(server);
		}
		this._io.on("connection", () => {
			console.log("\nNew client socket connection\n");
		});
	}

	public generalMessage(message: SocketMessage) {
		this._io.emit(message.type, message);
	}

	public dataItemMessage<T extends AnyObject>(manipulation: ItemManipulations, initiator: SocketMessageInitiator, dataType: DataTypes, item: T) {
		const m: DataItemMessage<T> = {
			type: SocketMessageTypes.itemManipulation,
			initiator,
			data: {
				dataType,
				manipulation,
				item,
			},
		};
		this.generalMessage(m);
	}

	public updateDataType(initiator: SocketMessageInitiator, dataType: DataTypes) {
		const m: UpdateDataTypeMessage = {
			type: SocketMessageTypes.updateDataType,
			initiator,
			data: {
				dataType,
			},
		};
		this.generalMessage(m);
	}
}

const socketService = new SocketService();

export default socketService;