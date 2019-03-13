import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "../../../theme";

export interface PageWrapperProps {
	children: React.ReactNode;
	classes: {
		appContent: string;
	};
}

export const PageWrapper = (props: PageWrapperProps) => {
	const { classes, children } = props;
	return (
		<div className={classes.appContent}>
			{children}
		</div>
	);
};

export default withStyles(styles)(PageWrapper);
