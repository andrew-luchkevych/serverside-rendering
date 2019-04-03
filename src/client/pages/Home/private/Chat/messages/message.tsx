import * as React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import MenuIcon from "@material-ui/icons/Menu";
import { ReduxStoreState } from "../../../../../../shared/types/store/RootReducer";
import { getUserId } from "../../../../../../shared/redux/user/selectors";
import MessageProps from "../../../../../../shared/types/Message";
import { messageStyles } from "./styles";

export interface MessageItemProps {
	message: MessageProps;
}

export interface MessageItemConnectedProps {
	userId: string;
}

export interface MessageItemStyleProps {
	classes: {
		message: string;
		currentUserMessage: string;
		messageContainer: string;
		currentUserMessageContainer: string;
	};
}
export interface MessageItemState {
	dialOpened: boolean;
}
export class MessageItem extends React.PureComponent<MessageItemProps & MessageItemConnectedProps & MessageItemStyleProps, MessageItemState> {
	state = { dialOpened: false };
	toggleDial = () => this.setState(({ dialOpened }) => ({ dialOpened: !dialOpened }));
	openDial = () => this.setState({ dialOpened: true });
	closeDial = () => this.setState({ dialOpened: false });
	actions = [

	];
	render() {
		const { classes: c, message: m, userId } = this.props;
		const { author: { _id: authorId, profile: p } } = m;
		const own = userId === authorId;
		return (
			<div className={classNames(c.message, own ? c.currentUserMessage : undefined)}>
				<Avatar src={p.picture || ""} />
				<div className={classNames(c.messageContainer, own ? c.currentUserMessageContainer : undefined)}>
					<Typography color="secondary">
						{p.name}
					</Typography>
					<Typography>
						{m.text}
					</Typography>
				</div>
				{
					own
						? (
							<SpeedDial
								icon={<MenuIcon />}
								onBlur={this.closeDial}
								onClick={this.toggleDial}
								onClose={this.closeDial}
								onFocus={this.openDial}
								onMouseEnter={this.openDial}
								onMouseLeave={this.closeDial}
								open={this.state.dialOpened}
								direction="left"
							>

							</SpeedDial>
						)
						: null
				}
			</div>
		);
	}
}

const mapStateToProps = (state: ReduxStoreState): MessageItemConnectedProps => ({
	userId: getUserId(state),
});
export default connect(mapStateToProps)(withStyles(messageStyles)(MessageItem)) as React.ComponentType<MessageItemProps>;