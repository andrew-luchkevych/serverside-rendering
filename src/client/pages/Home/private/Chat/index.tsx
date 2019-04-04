import * as React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { layout } from "../../../../theme";
import Padder from "../../../../components/Layout/Padder";
import MessagesList from "./messages/index";
import MessagesFooter from "./footer/index";
import MessageProps from "../../../../../shared/types/Message";
import ConfirmationDialog, { ConfirmationDialogControllerProps } from "../../../../components/Dialog";
import WithDispatch from "../../../../../shared/types/store/dispatch";
import routines from "../../../../../shared/redux/messages/routines";
export interface ChatContainerStylesProps {
	classes: {
		fullheight: string;
		flexColumn: string;
		flexOne: string;
		flexRow: string;
		fullHeightHiddenOverflow: string;
	};
}

export interface ChatState {
	messageForEdit?: MessageProps;
	idForRemove?: string;
}
export class Chat extends React.PureComponent<ChatContainerStylesProps & WithDispatch, ChatState> {
	state = {
		messageForEdit: undefined,
		idForRemove: undefined,
	}
	removeController: ConfirmationDialogControllerProps = {
		open: () => null,
		close: () => null,
	};
	onMessageEdit = (messageForEdit: MessageProps) => this.setState({ messageForEdit });
	onMessageEditFinished = () => this.setState({ messageForEdit: undefined });
	onMessageRemove = (idForRemove: string) => {
		this.setState({ idForRemove }, () => {
			this.removeController.open();
		});
	}
	removeMessage = () => {
		const { idForRemove } = this.state;
		this.props.dispatch(routines.remove.trigger({ data: { _id: idForRemove } }));
		this.setState({ idForRemove: undefined });
	}
	render() {
		const { classes } = this.props;
		return (
			<Padder className={classNames(classes.fullHeightHiddenOverflow, classes.flexColumn)}>
				<Typography variant="h4" align="center" gutterBottom>
					Chat
				</Typography>
				<Card className={classNames(classes.flexRow, classes.flexOne)}>
					<CardContent className={classNames(classes.flexColumn, classes.flexOne)} style={{ paddingBottom: 0 }}>
						<MessagesList onMessageEdit={this.onMessageEdit} onMessageRemove={this.onMessageRemove} />
						<MessagesFooter message={this.state.messageForEdit} onEditComplete={this.onMessageEditFinished} />
					</CardContent>
				</Card>
				<ConfirmationDialog
					title="Removing Message"
					description="Do you really want delete message?"
					controller={this.removeController} onAgree={this.removeMessage}
				/>
			</Padder>
		);
	};
}

export default connect(null)(withStyles(layout)(Chat)) as React.ComponentType;