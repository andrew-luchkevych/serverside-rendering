import * as React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { layout } from "../../../../../theme/index";
export interface ParticipatingStatsStyleProps {
	classes: {
		fullheight: string;
		flexColumn: string;
		flexRowCenter: string;
	};
}
export const ParticipatingStats = (props: ParticipatingStatsStyleProps) => {
	const { classes } = props;
	return (
		<Card className={classes.fullheight}>
			<CardContent className={classNames(classes.fullheight, classes.flexColumn)}>
				<Typography variant="h6" color="textSecondary">
					Your stats
				</Typography>
				<Grid container direction="row" justify="flex-start" alignItems="center" style={{ flex: 1 }}>
					<Grid item style={{ paddingRight: 5 }}>
						<Typography>
							Rolled: {" "}
							<b>10 </b>
						</Typography>
						<Typography>
							Posibility of lose {" "}
							<b>50%</b>
						</Typography>
					</Grid>
					<Grid item className={classNames(classes.fullheight, classes.flexRowCenter)} style={{ flex: 1 }}>
						<Button variant="contained" color="secondary" className={classes.fullheight}>
							Cancel participation
						</Button>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default withStyles(layout)(ParticipatingStats);