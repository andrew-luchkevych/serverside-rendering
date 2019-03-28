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
export interface FoodProviderVoutingReduxProps {
	userId: string;
	orderRollStats: OrderRollStatsState;
	foodProviders: FoodProvidersState;
	orderVotes: OrderFoodProviderVoteState;
}

export class FoodProviderVouting extends React.PureComponent<FoodProviderVoutingReduxProps & WithDispatch> {
	componentDidMount() {
		if (!this.props.foodProviders.loaded) {
			this.props.dispatch(foodProviderRoutines.get.trigger());
		}
		if (!this.props.orderVotes.loaded) {
			this.props.dispatch(orderVotesRoutines.get.trigger());
		}
	}
	render() {
		const { foodProviders, orderVotes, userId, orderRollStats: { data: { participants } } } = this.props;
		return (
			<Grid container>
				<Grid item xs={12}>
					{
						foodProviders.loaded && orderVotes.loaded
							? foodProviders
								.data
								.map(fp => (
									<FoodProviderVoteItem
										key={fp._id}
										provider={fp}
										votes={orderVotes.data.filter(v => v.foodProviderId === fp._id)}
										participants={participants}
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

const mapStateToProps = (state: ReduxStoreState): FoodProviderVoutingReduxProps => {
	const foodProviders = getFoodProvidersState(state);
	const orderVotes = orderVotesSelector(state);
	const orderRollStats = getOrderRollStatsState(state);
	const userId = getUserId(state);
	return {
		foodProviders,
		orderVotes,
		orderRollStats,
		userId,
	};
};

export default connect<FoodProviderVoutingReduxProps, WithDispatch>(mapStateToProps)(FoodProviderVouting) as React.ComponentType<{}>;