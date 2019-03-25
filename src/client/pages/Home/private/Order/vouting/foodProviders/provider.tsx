import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, LinearProgress, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FoodProviderProps from "../../../../../../../shared/types/FoodProvider";
import Padder from "../../../../../../components/Layout/Padder";
import { providerStyles } from "./styles";
import { combineStyles } from "../../../../../../utils/styles";
import { layout } from "../../../../../../theme/index";
export interface FoodProviderVoteItemProps {
	provider: FoodProviderProps;
	voutes: Array<any>;
	classes: {
		progress: string;
		flexColumnVerticalCenter: string;
		flexRowCenter: string;
	};
}

export class FoodProviderVoteItem extends React.PureComponent<FoodProviderVoteItemProps> {
	render() {
		const { provider, classes } = this.props;
		return (
			<Padder>
				<Grid container>
					<Grid item md={3} sm={4} xs={12} className={classes.flexColumnVerticalCenter}>
						<Typography color="textPrimary">
							{provider.name}
						</Typography>
						<Typography color="textSecondary">
							{provider.foodTypes.map(ft => ft.name).join(", ")}
						</Typography>
					</Grid>
					<Grid item md={7} sm={6} xs={10}>
						<LinearProgress variant="determinate" value={Math.floor(Math.random() * Math.floor(100))} className={classes.progress} />
					</Grid>
					<Grid item md={2} sm={2} xs={2} className={classes.flexRowCenter}>
						<Fab color="primary" aria-label="Add" size="small">
							<AddIcon />
						</Fab>
					</Grid>
				</Grid>
			</Padder>
		);
	}
}

export default withStyles(combineStyles(layout, providerStyles))(FoodProviderVoteItem);