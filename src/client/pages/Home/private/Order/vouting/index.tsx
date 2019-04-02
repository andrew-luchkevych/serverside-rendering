import * as React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FoodProviderVouting from "./foodProviders";
import { layout } from "../../../../../theme/index";
export interface VoutingStyleProps {
	classes: {
		overflowYOverlay: string;
		flexOne: string;
	}
}
export const Vouting = (props: VoutingStyleProps) => (
	<Grid container className={classNames(props.classes.overflowYOverlay, props.classes.flexOne)} style={{ marginTop: 20 }}>
		<Grid item xs={12}>
			<FoodProviderVouting />
		</Grid>
	</Grid>
);

export default withStyles(layout)(Vouting);