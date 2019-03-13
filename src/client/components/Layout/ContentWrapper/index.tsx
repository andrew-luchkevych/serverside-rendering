import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "../../../theme";
export interface ContentWrapperProps {
	children: React.ReactNode;
	classes: {
		mainContent: string;
	};
}

export const ContentWrapper = (props: ContentWrapperProps) => {
	const { classes, children } = props;
	return (
		<main className={classes.mainContent}>
			{children}
		</main>
	);
};

const StyledContentWrapper = withStyles(styles)(ContentWrapper);
export default StyledContentWrapper;