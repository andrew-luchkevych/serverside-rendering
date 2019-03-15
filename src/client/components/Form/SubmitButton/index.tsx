import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { styles } from "./styles";
export interface SubmitButtonStyleProps {
	classes: {
		submit: string;
	};
}
export interface SubmitButtonProps extends ButtonProps {
	text: string;
}
export const SubmitButton = (props: SubmitButtonProps & SubmitButtonStyleProps) => {
	const { text, classes, ...rest } = props;
	return (
		<Button
			type="submit"
			fullWidth
			variant="contained"
			color="primary"
			classes={{
				root: classes.submit,
				label: classes.label,
			}}
			{...rest}
		>
			{text}
		</Button>
	);
};
SubmitButton.displayName = "SubmitButton";
export default withStyles(styles)(SubmitButton);