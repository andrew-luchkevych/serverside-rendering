import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./styles";

export interface LoaderStyleProps {
	classes: {
		loader: string;
	};
}
export interface LoaderProps extends LoaderStyleProps {
	nopadding?: boolean;
}

export const Loader = (props: LoaderProps) => {
	let padding: string | number = "2em";
	if (props.nopadding) {
		padding = 0;
	}
	return (
		<div className={props.classes.loader} style={{ padding }}>
			<CircularProgress />
		</div>
	);
};

Loader.displayName = "Loader";

const StyledLoader = withStyles(styles)(Loader);
export default StyledLoader;