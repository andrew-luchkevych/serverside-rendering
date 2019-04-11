import * as React from "react";
import { connect } from "react-redux";
import MessageProps from "../../../../../../../shared/types/Message";
import IncomeMessageItem from "./income";
import OutcomeMessageItem from "./outcome";
import { getUserId } from "../../../../../../../shared/redux/user/selectors";
import { ReduxStoreState } from "../../../../../../../shared/types/store/RootReducer";

export interface MessageItemOwnProps {
	message: MessageProps;
	onEdit: (message: MessageProps) => any;
	onRemove: (id: string) => any;
}

export interface MessageItemConnectedProps {
	userId: string;
}
export type MessageItemProps = MessageItemOwnProps & MessageItemConnectedProps;
export class MessageItem extends React.PureComponent<MessageItemProps> {
	render() {
		const { message, onEdit, onRemove } = this.props;
		return this.props.message.author._id === this.props.userId
			? <OutcomeMessageItem message={message} onEdit={onEdit} onRemove={onRemove} />
			: <IncomeMessageItem message={message} />;
	}
}

export const mapStateToProps = (state: ReduxStoreState): MessageItemConnectedProps => ({
	userId: getUserId(state),
});
export default connect(mapStateToProps)(MessageItem) as React.ComponentType<MessageItemOwnProps>;