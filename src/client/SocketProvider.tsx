
import * as React from "react";
import SocketIO from "socket.io-client";
import { connect } from "react-redux";
import WithDispatch from "../shared/types/store/dispatch";
import SocketMessageTypes from "../shared/types/sockets/MessageTypes";
import { UpdateDataTypeMessage } from "../shared/types/sockets/messages/UpdateDataType";
import { findDependentDataTypes, dataTypesRoutines } from "./services/actualDataController";
import reloadDataRoutines from "../shared/redux/forceReloadData/routines";
import createPayload from "../shared/redux/createPayload";
import { pageDataTypes } from "./App";
import { ReduxStoreState } from "../shared/types/store/RootReducer";
import { getUserId } from "../shared/redux/user/selectors";
import DataItemMessage from "../shared/types/sockets/messages/ItemMessage";
import DataTypes from "../shared/types/dataTypes";

export interface SocketProviderOwnProps {
	children: React.ReactNode;
}
export interface SocketProviderConnectedProps {
	userId?: string;
}
export type SocketProviderProps = SocketProviderOwnProps & SocketProviderConnectedProps & WithDispatch;
export class SocketProvider extends React.PureComponent<SocketProviderProps> {
	socket: SocketIOClient.Socket;
	componentDidMount() {
		this.socket = SocketIO();
		this.socket.on(SocketMessageTypes.updateDataType, this.onUpdateDataType);
		this.socket.on(SocketMessageTypes.itemManipulation, this.onDataItemMessage);
	}
	reloadDataType = (dataType: DataTypes) => {
		if (pageDataTypes.has(dataType)) {
			const routines = dataTypesRoutines[dataType] || null;
			if (routines && routines.hotReload) {
				return this.props.dispatch(routines.hotReload.trigger());
			}
		}
		return this.props.dispatch(reloadDataRoutines.add.success(createPayload({ dataType })));
	}
	onUpdateDataType = (message: UpdateDataTypeMessage) => {
		const dataToUpdate = findDependentDataTypes(message.data.dataType);
		dataToUpdate.forEach(this.reloadDataType);
	}

	onDataItemMessage = (message: DataItemMessage<any>) => {
		const { initiator, data: { dataType, manipulation, item } } = message;
		if (initiator === this.props.userId) {
			return;
		}
		const routines = dataTypesRoutines[message.data.dataType] || undefined;
		if (!routines) {
			return;
		}
		let routine: any;
		switch (manipulation) {
			case "create":
				routine = routines.create || null;
				break;
			case "edit":
				routine = routines.edit || null;
				break;
			case "remove":
				routine = routines.remove || null;
				break;
			default: routine = null;
		}
		if (!routine) {
			this.reloadDataType(dataType);
			return;
		}
		try {
			this.props.dispatch(routine.success(createPayload(item)));
		} catch (e) {
			this.reloadDataType(dataType);
		}
	}
	componentWillUnmount() {
		this.socket.removeListener(SocketMessageTypes.updateDataType, this.onUpdateDataType);
		this.socket.removeListener(SocketMessageTypes.itemManipulation, this.onDataItemMessage);
		this.socket.close();
	}

	render() {
		return this.props.children;
	}
}
const mapStateToProps = (state: ReduxStoreState): SocketProviderConnectedProps => ({
	userId: getUserId(state),
});
export default connect(mapStateToProps)(SocketProvider) as React.ComponentType<SocketProviderOwnProps>;