import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import FormPage from "../../../components/Layout/FormPage";
import Form from "./form";
import { ReduxStoreState } from "../../../../shared/types/store/RootReducer";
import { getFoodTypeById } from "../../../../shared/redux/foodTypes/selectors";
import FoodTypeProps from "../../../../shared/types/FoodType";
export interface EditFoodTypePageProps {
	foodType?: FoodTypeProps;
}
export class EditFoodTypePage extends React.PureComponent<EditFoodTypePageProps & RouteComponentProps> {
	render() {
		console.log("render");
		return (
			<FormPage title="Edit Food Type" icon={<FastfoodIcon />} form={<Form initialValues={this.props.foodType} />} />
		);
	}
}
const mapStateToProps = (state: ReduxStoreState, props: RouteComponentProps): EditFoodTypePageProps => {
	const r: EditFoodTypePageProps = {};
	const { id } = props.match.params as any;
	const f = getFoodTypeById(id)(state);
	if (id && f) {
		r.foodType = { ...f };
	}
	return r;
};
export default withRouter(connect(mapStateToProps)(EditFoodTypePage));
