import * as React from "react";
import { connect } from "react-redux";
import { FoodProvidersState } from "../../../../shared/redux/foodProviders";
import { foodProviders } from "../../../../shared/redux/foodProviders/selectors";
import WithDispatch from "../../../../shared/types/store/dispatch";
import routines from "../../../../shared/redux/foodProviders/routines";
import FoodProvidersView from "./view";
import { ReduxStoreState } from "../../../../shared/types/store/RootReducer";
import { shouldDataBeReloaded } from "../../../../shared/redux/forceReloadData/selectors";
import DataTypes from "../../../../shared/redux/forceReloadData/types";
export interface FoodProvidersContainerProps {
	foodProviders: FoodProvidersState;
	forceReload: boolean;
}
export class FoodProvidersContainer extends React.PureComponent<FoodProvidersContainerProps & WithDispatch> {
	componentDidMount() {
		const { dispatch, forceReload, foodProviders: { loaded } } = this.props;
		if (!loaded || forceReload) {
			dispatch(routines.get.trigger());
		}
	}
	render() {
		const { foodProviders: f } = this.props;
		return <FoodProvidersView loaded={f.loaded} loading={f.processing} items={f.data} />;
	}
}
const mapStateToProps = (state: ReduxStoreState): FoodProvidersContainerProps => {
	return {
		...foodProviders(state),
		forceReload: shouldDataBeReloaded(DataTypes.foodType)(state),
	};
};
export default connect(mapStateToProps)(FoodProvidersContainer) as React.ComponentType;