import * as React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { combineStyles } from "../../../../../utils/styles";
import { layout } from "../../../../../theme/index";
import { styles } from "./styles";
import WithDispatch from "../../../../../../shared/types/store/dispatch";
import routines from "../../../../../../shared/redux/messages/routines";
import { createSubmisisonPromise } from "../../../../../../shared/utils/formSubmission";
import MessageProps from "../../../../../../shared/types/Message";

export interface MessagesFooterOwnProps {
	message?: MessageProps;
	onEditComplete?: () => any;
}
export interface MessagesFooterStyleProps {
	classes: {
		footerContainer: string;
		flexOne: string;
		input: string;
	};
}
export interface MessagesFooterState {
	text: string;
	submitting: boolean;
}

export type MessagesFooterProps = MessagesFooterOwnProps & MessagesFooterStyleProps & WithDispatch;
export class MessagesFooter extends React.PureComponent<MessagesFooterProps, MessagesFooterState> {
	state = {
		text: "",
		submitting: false,
	};
	componentDidUpdate(prevProps: MessagesFooterProps) {
		if (this.props.message && this.props.message !== prevProps.message) {
			this.setState({ text: this.props.message.text });
		}
	}
	onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		this.setState({ text: e.target.value });
	}
	onSubmit = () => {
		const { text } = this.state;
		if (!text) {
			return;
		}
		const { message } = this.props;
		const isEdit = !!this.props.message;
		const controller = createSubmisisonPromise();
		controller.submission
			.then(() => {
				if (isEdit) {
					this.props.onEditComplete();
				}
				this.setState({ text: "", submitting: false });
			})
			.catch(() => this.setState({ submitting: false }));
		if (isEdit) {
			this.props.dispatch(routines.edit.trigger({
				controller,
				data: { ...message, text },
			}));
		} else {
			this.props.dispatch(routines.create.trigger({
				controller,
				data: { text },
			}));
		}
	}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.footerContainer}>
				<InputBase
					value={this.state.text}
					onChange={this.onChange}
					placeholder="Start your message here..."
					multiline
					className={classNames(classes.flexOne, classes.input)}
				/>
				<IconButton color="primary" disabled={this.state.submitting} onClick={this.onSubmit}>
					<SendIcon />
				</IconButton>
			</div>
		);
	}
}

export default connect()(withStyles(combineStyles(styles, layout))(MessagesFooter)) as React.ComponentType<MessagesFooterOwnProps>;