import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
export const DailyStats = () => (
	<Card>
		<CardContent>
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

export default DailyStats;