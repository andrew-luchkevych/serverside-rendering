import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide, { SlideProps } from "@material-ui/core/Slide";
const Transition = (props: SlideProps) => (<Slide direction="up" {...props} />);

export interface ConfirmationDialogControllerProps {
	open: () => void;
	close: () => void;
}
export interface ConfirmationDialogDefaultProps {
	controller?: ConfirmationDialogControllerProps;
	agreeLabel?: string;
	disagreeLabel?: string;
	onAgree?: () => void;
	onDisagree?: () => void;
	autoclose?: boolean;
}
export interface ConfirmationDialogProps extends ConfirmationDialogDefaultProps {
	title: string;
	description: string;
}
export interface ConfirmationDialogState {
	opened: boolean;
}
export class ConfirmationDialog extends React.Component<ConfirmationDialogProps, ConfirmationDialogState> {
	static defaultProps: ConfirmationDialogDefaultProps = {
		controller: {
			open: () => null,
			close: () => null,
		},
		agreeLabel: "Confirm",
		disagreeLabel: "Cancel",
		onAgree: () => null,
		onDisagree: () => null,
		autoclose: true,
	};
	state = { opened: false };
	componentDidMount() {
		this.props.controller.open = this.open;
		this.props.controller.close = this.close;
	}
	open = () => this.setState({ opened: true });
	close = () => this.setState({ opened: false });
	agree = () => {
		if (this.props.autoclose) {
			this.close();
		}
		this.props.onAgree();
	}
	disagree = () => {
		if (this.props.autoclose) {
			this.close();
		}
		this.props.onDisagree();
	}

	render() {
		const {
			close,
			agree,
			disagree,
			props: {
				title,
				description,
				agreeLabel,
				disagreeLabel,
			},
		} = this;
		return (
			<div>
				<Dialog
					open={this.state.opened}
					TransitionComponent={Transition}
					onClose={close}
				>
					<DialogTitle>
						{title}
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{description}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={disagree}>
							{disagreeLabel}
						</Button>
						<Button onClick={agree} variant="contained" color="primary">
							{agreeLabel}
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default ConfirmationDialog;