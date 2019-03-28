import { Express } from "express";
import SocketIO from "socket.io";
import SocketMessage from "../../shared/types/sockets/Message";
import DataItemMessage from "../../shared/types/sockets/ItemMessage";
import { AnyObject } from "../../shared/types/Basic";
import { UpdateDataTypeMessage } from "../../shared/types/sockets/UpdateDataType";
class SocketService {
	private static _instance: SocketService;
	private _io: SocketIO.Server;
	public constructor() {
		if (!SocketService._instance) {
			SocketService._instance = this;
		}
		return SocketService._instance;
	}
	public init(app: Express) {
		if (!this._io) {
			this._io = SocketIO(app);
		}
		this._io.on("connection", () => {
			console.log("\nNew client socket connection\n");
		});
	}

	public general(message: SocketMessage) {
		this._io.emit(message.type, { data: message.data });
	}

	public dataItemMessage<T extends AnyObject>(message: DataItemMessage<T>) {
		const { type, ...rest } = message;
		this.general({
			type,
			data: rest,
		});
	}

	public updateDataType(message: UpdateDataTypeMessage) {
		this.general({
			type: message.type,
			data: {
				dataType: message.dataType,
			},
		});
	}
}

const socketService = new SocketService();

export default socketService;