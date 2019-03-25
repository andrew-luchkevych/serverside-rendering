import * as React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { layout } from "../../../../../theme/index";
export interface DailyStatsStyleProps {
	classes: {
		fullheight: string;
		flexColumn: string;
		flexRowCenter: string;
	};
}
export const DailyStats = (props: DailyStatsStyleProps) => {
	const { classes } = props;
	return (
		<Card className={classes.fullheight}>
			<CardContent className={classNames(classes.fullheight, classes.flexColumn)}>
				<Typography variant="h6" color="textSecondary">
					Daily Stats
					</Typography>
				<Typography>
					Participants: {" "}
					<b>
						10
				</b>
				</Typography>
				<Typography>
					Rolled minimum: {" "}
					<b>
						2
				</b>
				</Typography>
				<Typography>
					Rolled maximum: {" "}
					<b>
						20
				</b>
				</Typography>
			</CardContent>
		</Card>
	);
};

export default withStyles(layout)(DailyStats);