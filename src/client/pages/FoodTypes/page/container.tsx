import * as React from "react";
import { connect } from "react-redux";
import { FoodTypesState } from "../../../../shared/redux/foodTypes";
import { foodTypes } from "../../../../shared/redux/foodTypes/selectors";
import WithDispatch from "../../../../shared/types/store/dispatch";
import routines from "../../../../shared/redux/foodTypes/routines";
import FoodTypesView from "./view";
import FoodTypeProps from "../../../../shared/types/FoodType";
import ConfirmationDialog, { ConfirmationDialogControllerProps } from "../../../components/Dialog";
export interface FoodTypesContainerProps extends WithDispatch {
	foodTypes: FoodTypesState;
}
export class FoodTypesContainer extends React.PureComponent<FoodTypesContainerProps> {
	confirmationDialogController: ConfirmationDialogControllerProps;
	componentDidMount() {
		const { dispatch, foodTypes: { loaded } } = this.props;
		if (!loaded) {
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

export default connect(foodTypes)(FoodTypesContainer) as React.ComponentType;