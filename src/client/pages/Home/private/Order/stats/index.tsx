import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DailyStats from "./daily";
import ParticipatingStats from "./participating";
import { layout } from "../../../../../theme";
export interface OrderStatsStyleProps {
	classes: {
		fullheight: string;
	};
}
export const OrderStats = (props: OrderStatsStyleProps) => {
	const { classes: { fullheight } } = props;
	return (
		<Grid container spacing={16}>
			<Grid item md={6} sm={12} xs={12}>
				<DailyStats />
			</Grid>
			<Grid item md={6} sm={12} xs={12}>
				<ParticipatingStats />
			</Grid>
		</Grid>
	);
};

export default withStyles(layout)(OrderStats);