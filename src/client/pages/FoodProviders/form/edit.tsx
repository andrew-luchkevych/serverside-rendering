import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import FormPage from "../../../components/Layout/FormPage";
import Form from "./form";
import { ReduxStoreState } from "../../../../shared/types/store/RootReducer";
import { byId } from "../../../../shared/redux/foodProviders/selectors";
import FoodProviderProps from "../../../../shared/types/FoodProvider";
export interface EditFoodProviderPageProps {
	foodProvider?: FoodProviderProps;
}
export const EditFoodProviderPage = (props: EditFoodProviderPageProps & RouteComponentProps) => {
	return (
		<FormPage title="Edit Food Provider" icon={<RestaurantIcon />} form={<Form initialValues={props.foodProvider} />} />
	);
};
const mapStateToProps = (state: ReduxStoreState, props: RouteComponentProps): EditFoodProviderPageProps => {
	const r: EditFoodProviderPageProps = {};
	const { id } = props.match.params as any;
	const f = byId(id)(state);
	if (id && f) {
		r.foodProvider = { ...f };
	}
	return r;
};
export default withRouter(connect(mapStateToProps)(EditFoodProviderPage));
