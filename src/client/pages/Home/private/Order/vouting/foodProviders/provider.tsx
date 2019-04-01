import * as React from "react";
import { Map } from "immutable";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, LinearProgress, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import FoodProviderProps from "../../../../../../../shared/types/FoodProvider";
import OrderFoodProviderVoteProps from "../../../../../../../shared/types/Order/OrderFoodProviderVote";
import WithDispatch from "../../../../../../../shared/types/store/dispatch";
import Padder from "../../../../../../components/Layout/Padder";
import { combineStyles } from "../../../../../../utils/styles";
import { layout } from "../../../../../../theme/index";
import { providerStyles } from "./styles";
import routines from "../../../../../../../shared/redux/orderFoodProviderVotes/routines";

export interface FoodProviderVoteItemOwnProps {
	isParticipant: boolean;
	provider: FoodProviderProps;
	votes: Map<string, OrderFoodProviderVoteProps>;
	participants: number;
	userId: string;
}

export interface FoodProviderVoteItemStyleProps {
	classes: {
		progress: string;
		flexColumnVerticalCenter: string;
		flexRowCenter: string;
	};
}
export type FoodProviderVoteItemProps = FoodProviderVoteItemOwnProps &
	FoodProviderVoteItemStyleProps &
	WithDispatch;
export class FoodProviderVoteItem extends React.Component<FoodProviderVoteItemProps> {
	add = () => {
		this.props.dispatch(routines.create.trigger({ data: { foodProviderId: this.props.provider._id } }));
	}
	remove = () => {
		this.props.dispatch(routines.remove.trigger({ data: { foodProviderId: this.props.provider._id } }));
	}
	shouldComponentUpdate(nextProps: FoodProviderVoteItemProps) {
		let keys = Object.keys(this.props);
		const votesIndex = keys.indexOf("votes");
		if (votesIndex) {
			keys.splice(votesIndex, 1);
		}
		let same = true;
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			if (this.props[key] !== nextProps[key]) {
				same = false;
				break;
			}
		}
		if (same) {
			if (this.props.votes.equals(nextProps.votes)) {
				return false;
			}
		}
		return true;
	}
	render() {
		const { provider, votes, participants, classes, userId } = this.props;
		const progress = Math.round(votes.count() / participants * 100);
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
						<LinearProgress variant="determinate" value={progress} className={classes.progress} />
					</Grid>
					<Grid item md={2} sm={2} xs={2} className={classes.flexRowCenter}>
						{
							this.props.isParticipant
								? this.props.votes.find(v => v.user._id === userId)
									? (
										<Fab color="secondary" aria-label="Remove" size="small" onClick={this.remove}>
											<RemoveIcon />
										</Fab>
									) : (
										<Fab color="primary" aria-label="Add" size="small" onClick={this.add}>
											<AddIcon />
										</Fab>
									)
								: null
						}
					</Grid>
				</Grid>
			</Padder>
		);
	}
}
export default connect(null)(
	withStyles(
		combineStyles(layout, providerStyles),
	)(FoodProviderVoteItem),
) as React.ComponentType<FoodProviderVoteItemOwnProps>;