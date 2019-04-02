import * as React from "react";
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
export interface MessagesFooterStyleProps {
	classes: {
		footerContainer: string;
		flexOne: string;
	};
}
export interface MessagesFooterState {
	text: string;
	submitting: boolean;
}
export class MessagesFooter extends React.PureComponent<MessagesFooterStyleProps & WithDispatch, MessagesFooterState> {
	state = {
		text: "",
		submitting: false,
	};
	onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		this.setState({ text: e.target.value });
	}
	onSubmit = () => {
		const { text } = this.state;
		if (!text) {
			return;
		}
		const controller = createSubmisisonPromise();
		controller.submission
			.then(() => this.setState({ text: "", submitting: false }))
			.catch(() => this.setState({ submitting: false }));
		this.props.dispatch(routines.create.trigger({
			controller,
			data: { text },
		}));
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
					className={classes.flexOne}
				/>
				<IconButton color="primary" disabled={!this.state.submitting} onClick={this.onSubmit}>
					<SendIcon />
				</IconButton>
			</div>
		);
	}
}

export default withStyles(combineStyles(styles, layout))(MessagesFooter);