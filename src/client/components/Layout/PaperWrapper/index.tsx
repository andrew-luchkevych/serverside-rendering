import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";

export interface PaperWrapperProps {
	children: React.ReactNode;
	classes: {
		paper: string;
	};
}
export const PaperWrapper = (props: PaperWrapperProps) => {
	const { classes, children } = props;
	return (
		<Paper className={classes.paper}>
			{children}
		</Paper>
	);
};
const StyledPaperWrapper = withStyles(styles)(PaperWrapper);
export default StyledPaperWrapper;