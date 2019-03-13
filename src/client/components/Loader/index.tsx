import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./style.scss";

export interface LoaderProps {
	nopadding?: boolean;
}

export const Loader = (props: LoaderProps) => {
	let padding: string | number = "2em";
	if (props.nopadding) {
		padding = 0;
	}
	return (
		<div className="loader" style={{ padding }}>
			<CircularProgress />
		</div>
	);
};

Loader.displayName = "Loader";

export default Loader;