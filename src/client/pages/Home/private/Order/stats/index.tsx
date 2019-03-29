import * as React from "react";
import Grid from "@material-ui/core/Grid";
import DailyStats from "./daily";
import ParticipatingStats from "./participating";
export const OrderStats = () => {
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

export default OrderStats;