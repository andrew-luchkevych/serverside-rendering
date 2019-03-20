import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import FormPage from "../../../components/Layout/FormPage";
import Form from "./form";
import { ReduxStoreState } from "../../../../shared/types/store/RootReducer";
import { byId } from "../../../../shared/redux/foodTypes/selectors";
import FoodTypeProps from "../../../../shared/types/FoodType";
import Error404 from "../../../components/errors/Error404";
export interface EditFoodTypePageProps {
	foodType?: FoodTypeProps;
}
export const EditFoodTypePage = (props: EditFoodTypePageProps & RouteComponentProps) => {
	return (
		<FormPage title="Edit Food Type" icon={<FastfoodIcon />} form={<Form initialValues={props.foodType} />} />
	);
};
const mapStateToProps = (state: ReduxStoreState, props: RouteComponentProps): EditFoodTypePageProps => {
	const r: EditFoodTypePageProps = {};
	const { id } = props.match.params as any;
	const f = byId(id)(state);
	if (id && f) {
		r.foodType = { ...f };
	}
	return r;
};
export default withRouter(connect(mapStateToProps)(EditFoodTypePage));
