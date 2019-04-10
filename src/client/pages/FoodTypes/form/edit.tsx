import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import FormPage from "../../../components/Layout/FormPage";
import Form from "./form";
import { ReduxStoreState } from "../../../../shared/types/store/RootReducer";
import { getFoodTypeById } from "../../../../shared/redux/foodTypes/selectors";
import FoodTypeProps from "../../../../shared/types/FoodType";
export interface EditFoodTypePageConnectedProps {
	foodType?: FoodTypeProps;
}

export type EditFoodTypePageProps = EditFoodTypePageConnectedProps;

export class EditFoodTypePage extends React.PureComponent<EditFoodTypePageConnectedProps> {
	render() {
		return (
			<FormPage title="Edit Food Type" icon={<FastfoodIcon />} form={<Form initialValues={this.props.foodType} />} />
		);
	}
}
export const mapStateToProps = (state: ReduxStoreState, props: RouteComponentProps): EditFoodTypePageConnectedProps => {
	const r: EditFoodTypePageConnectedProps = {};
	const { id } = props.match.params as any;
	const f = getFoodTypeById(id)(state);
	if (id && f) {
		r.foodType = { ...f };
	}
	return r;
};
export default withRouter(connect(mapStateToProps)(EditFoodTypePage) as React.ComponentType<RouteComponentProps>);
