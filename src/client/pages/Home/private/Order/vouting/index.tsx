import * as React from "react";
import { Grid } from "@material-ui/core";
import FoodProviderVouting from "./foodProviders";

export const Vouting = () => (
	<Grid container>
		<Grid item xs={12}>
			<FoodProviderVouting />
		</Grid>
	</Grid>
);

export default Vouting;