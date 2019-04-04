import * as React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import MenuIcon from "@material-ui/icons/Menu";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MessageProps from "../../../../../../../shared/types/Message";
import { messageStyles } from "./styles";

export interface OutcomeMessageItemOwnProps {
	message: MessageProps;
	onEdit: (message: MessageProps) => any;
	onRemove: (id: string) => any;
}

export interface OutcomeMessageItemStyleProps {
	classes: {
		message: string;
		currentUserMessage: string;
		messageContainer: string;
		currentUserMessageContainer: string;
		fabContainer: string;
	};
}
export interface OutcomeMessageItemState {
	dialOpened: boolean;
}

export type OutcomeMessageItemProps = OutcomeMessageItemOwnProps & OutcomeMessageItemStyleProps;
export class OutcomeMessageItem extends React.PureComponent<OutcomeMessageItemProps, OutcomeMessageItemState> {
	state = { dialOpened: false };
	toggleDial = () => this.setState(({ dialOpened }) => ({ dialOpened: !dialOpened }));
	openDial = () => this.setState({ dialOpened: true });
	closeDial = () => this.setState({ dialOpened: false });
	actions = [
		{
			key: "edit",
			icon: <EditIcon />,
			name: "Edit",
			action: this.props.onEdit,
		},
		{
			key: "remove",
			icon: <DeleteIcon />,
			name: "Delete",
			action: this.props.onRemove,
		},
	];
	onEdit = () => {
		this.closeDial();
		this.props.onEdit(this.props.message);
	}
	onRemove = () => {
		this.closeDial();
		this.props.onRemove(this.props.message._id);
	}
	render() {
		const { classes: c, message: m } = this.props;
		return (
			<div className={classNames(c.message, c.currentUserMessage)}>
				<div className={classNames(c.messageContainer, c.currentUserMessageContainer)}>
					<Typography color={m.deleted ? "textSecondary" : "textPrimary"}>
						{
							m.deleted
								? "Deleted"
								: m.text
						}
					</Typography>
				</div>
				{
					!m.deleted
						? (
							<div
								className={c.fabContainer}
								onBlur={this.closeDial}
								onMouseLeave={this.closeDial}
							>
								<IconButton
									onClick={this.toggleDial}
									onFocus={this.openDial}
									onMouseEnter={this.openDial}
									disableRipple
								>
									<MenuIcon />
								</IconButton>
								<SpeedDial
									icon={<MenuIcon />}
									open={this.state.dialOpened}
									onClose={this.closeDial}
									ariaLabel="Message Actions"
									direction="left"
									hidden={true}
								>
									<SpeedDialAction
										icon={<EditIcon />}
										tooltipTitle="Edit"
										tooltipPlacement="bottom"
										onClick={this.onEdit}
									/>
									<SpeedDialAction
										icon={<DeleteIcon />}
										tooltipTitle="Delete"
										tooltipPlacement="bottom"
										onClick={this.onRemove}
									/>
								</SpeedDial>
							</div>
						)
						: null
				}
			</div>
		);
	}
}
export default withStyles(messageStyles)(OutcomeMessageItem);