import * as React from "react";
import { connect } from "react-redux";
import { ReduxStoreState } from "../../../../shared/types/store/RootReducer";
import { FoodTypesState } from "../../../../shared/redux/foodTypes";
import { getFoodTypesState } from "../../../../shared/redux/foodTypes/selectors";
import WithDispatch from "../../../../shared/types/store/dispatch";
import routines from "../../../../shared/redux/foodTypes/routines";
import FoodTypesView from "./view";
import FoodTypeProps from "../../../../shared/types/FoodType";
import { shouldDataBeReloaded } from "../../../../shared/redux/forceReloadData/selectors";
import { ConfirmationDialogControllerProps } from "../../../components/Dialog";
import { pageDataTypes } from "../../../App";
export interface FoodTypesContainerConnectedProps {
	foodTypes: FoodTypesState;
	forceReload: boolean;
}
export type FoodTypesContainerProps = FoodTypesContainerConnectedProps & WithDispatch;
export class FoodTypesContainer extends React.PureComponent<FoodTypesContainerProps> {
	confirmationDialogController: ConfirmationDialogControllerProps;
	componentDidMount() {
		pageDataTypes.add("foodTypes");
		const { dispatch, forceReload, foodTypes: { loaded } } = this.props;
		if (!loaded || forceReload) {
			dispatch(routines.get.trigger());
		}
	}
	delete = (f: FoodTypeProps) => {
		this.confirmationDialogController.open();
	}
	render() {
		const { foodTypes: f } = this.props;
		return <FoodTypesView loaded={f.loaded} loading={f.processing} items={f.data} />;
	}
}
const mapStateToProps = (state: ReduxStoreState): FoodTypesContainerConnectedProps => ({
	foodTypes: getFoodTypesState(state),
	forceReload: shouldDataBeReloaded("foodTypes")(state),
});
export default connect(mapStateToProps)(FoodTypesContainer) as React.ComponentType;