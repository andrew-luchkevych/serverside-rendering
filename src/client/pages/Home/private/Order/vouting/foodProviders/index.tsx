import * as React from "react";
import { connect } from "react-redux";
import { FoodProvidersState } from "../../../../../../../shared/redux/foodProviders";
import WithDispatch from "../../../../../../../shared/types/store/dispatch";
import routines from "../../../../../../../shared/redux/foodProviders/routines";
import { foodProviders } from "../../../../../../../shared/redux/foodProviders/selectors";
import { Grid } from "@material-ui/core";
import FoodProviderVoteItem from "./provider";
import Loader from "../../../../../../components/Loader";
export interface FoodProviderVoutingReduxProps {
	foodProviders: FoodProvidersState;
}

export class FoodProviderVouting extends React.PureComponent<FoodProviderVoutingReduxProps & WithDispatch> {
	componentDidMount() {
		if (!this.props.foodProviders.loaded) {
			this.props.dispatch(routines.get.trigger());
		}
	}
	render() {
		const { foodProviders: { loaded, data } } = this.props;
		return (
			<Grid container>
				<Grid item xs={12}>
					{
						loaded
							? data.map(fp => <FoodProviderVoteItem provider={fp} voutes={[]} key={fp._id} />)
							: <Loader />
					}
				</Grid>
			</Grid>
		);
	}
}

export default connect<FoodProviderVoutingReduxProps, WithDispatch>(foodProviders)(FoodProviderVouting) as React.ComponentType<{}>;