import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import FormPage from "../../../components/Layout/FormPage";
import Form from "./form";
import { ReduxStoreState } from "../../../../shared/types/store/RootReducer";
import { getFoodProviderById } from "../../../../shared/redux/foodProviders/selectors";
import FoodProviderProps from "../../../../shared/types/FoodProvider";
import FoodTypeProps from "../../../../shared/types/FoodType";
export interface EditFoodProviderPageProps {
	foodProvider?: FoodProviderProps;
}
export const EditFoodProviderPage = (props: EditFoodProviderPageProps & RouteComponentProps) => {
	const { foodProvider: f } = props;
	const initialValues: any = { ...f };
	initialValues.foodTypes = initialValues.foodTypes.map((i: FoodTypeProps) => i._id);
	return (
		<FormPage title="Edit Food Provider" icon={<RestaurantIcon />} form={<Form initialValues={initialValues} />} />
	);
};
const mapStateToProps = (state: ReduxStoreState, props: RouteComponentProps): EditFoodProviderPageProps => {
	const r: EditFoodProviderPageProps = {};
	const { id } = props.match.params as any;
	const f = getFoodProviderById(id)(state);
	if (id && f) {
		r.foodProvider = f;
	}
	return r;
};
export default withRouter(connect(mapStateToProps)(EditFoodProviderPage));
