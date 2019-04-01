import * as React from "react";
import { connect } from "react-redux";
import { FoodProvidersState } from "../../../../../../../shared/redux/foodProviders";
import WithDispatch from "../../../../../../../shared/types/store/dispatch";
import { getFoodProvidersState } from "../../../../../../../shared/redux/foodProviders/selectors";
import foodProviderRoutines from "../../../../../../../shared/redux/foodProviders/routines";
import { OrderFoodProviderVoteState } from "../../../../../../../shared/redux/orderFoodProviderVotes";
import { orderFoodProviderVotesState as orderVotesSelector } from "../../../../../../../shared/redux/orderFoodProviderVotes/selectors";
import orderVotesRoutines from "../../../../../../../shared/redux/orderFoodProviderVotes/routines";
import { Grid } from "@material-ui/core";
import FoodProviderVoteItem from "./provider";
import Loader from "../../../../../../components/Loader";
import { ReduxStoreState } from "../../../../../../../shared/types/store/RootReducer";
import { getUserId } from "../../../../../../../shared/redux/user/selectors";
import { getOrderRollStatsState } from "../../../../../../../shared/redux/orderRollStats/selectors";
import { OrderRollStatsState } from "../../../../../../../shared/redux/orderRollStats";
import { shouldDataBeReloaded } from "../../../../../../../shared/redux/forceReloadData/selectors";
import { pageDataTypes } from "../../../../../../App";
import { isParticipant } from "../../../../../../../shared/redux/orderRoll/selectors";
export interface FoodProviderVoutingReduxProps {
	userId: string;

	isParticipant: boolean;

	orderRollStats: OrderRollStatsState;
	forceReloadOrderRollStats: boolean;

	foodProviders: FoodProvidersState;
	forceReloadFoodProviders: boolean;

	orderVotes: OrderFoodProviderVoteState;
	forceReloadOrderVotes: boolean;
}

export class FoodProviderVouting extends React.PureComponent<FoodProviderVoutingReduxProps & WithDispatch> {
	componentDidMount() {
		const {
			orderRollStats,
			foodProviders,
			orderVotes,
			forceReloadOrderRollStats,
			forceReloadFoodProviders,
			forceReloadOrderVotes,
		} = this.props;
		pageDataTypes.add("orderRollStats");
		pageDataTypes.add("foodProviders");
		pageDataTypes.add("orderFoodProviderVotes");
		if (!orderRollStats.loaded || forceReloadOrderRollStats) {
			this.props.dispatch(foodProviderRoutines.get.trigger());
		}
		if (!foodProviders.loaded || forceReloadFoodProviders) {
			this.props.dispatch(foodProviderRoutines.get.trigger());
		}
		if (!orderVotes.loaded || forceReloadOrderVotes) {
			this.props.dispatch(orderVotesRoutines.get.trigger());
		}
	}
	render() {
		const { foodProviders, orderVotes, isParticipant, userId, orderRollStats } = this.props;
		return (
			<Grid container>
				<Grid item xs={12}>
					{
						foodProviders.loaded
							&& orderVotes.loaded
							&& orderRollStats.loaded
							? foodProviders
								.data
								.map(fp => (
									<FoodProviderVoteItem
										key={fp._id}
										provider={fp}
										votes={orderVotes.data.filter(v => v.foodProviderId === fp._id)}
										participants={orderRollStats.data.participants}
										isParticipant={isParticipant}
										userId={userId}
									/>
								))
							: <Loader />
					}
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = (state: ReduxStoreState): FoodProviderVoutingReduxProps => ({
	userId: getUserId(state),

	isParticipant: isParticipant(state),

	orderRollStats: getOrderRollStatsState(state),
	forceReloadOrderRollStats: shouldDataBeReloaded("orderRollStats")(state),

	foodProviders: getFoodProvidersState(state),
	forceReloadFoodProviders: shouldDataBeReloaded("foodProviders")(state),

	orderVotes: orderVotesSelector(state),
	forceReloadOrderVotes: shouldDataBeReloaded("orderFoodProviderVotes")(state),
});

export default connect<FoodProviderVoutingReduxProps, WithDispatch>(mapStateToProps)(FoodProviderVouting) as React.ComponentType<{}>;