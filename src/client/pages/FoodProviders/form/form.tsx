import * as React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { withRouter, RouteComponentProps } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import WithDispatch from "../../../../shared/types/store/dispatch";
import { createSubmisisonPromise } from "../../../../shared/utils/formSubmission";
import { create, edit } from "../../../../shared/redux/foodProviders/routines";
import { FormTextField } from "../../../components/Form/TextField";
import FormSelectField from "../../../components/Form/MultipleSelect";
import SubmitButton from "../../../components/Form/SubmitButton";
import validator from "../../../services/validator";
import { FoodTypesState } from "../../../../shared/redux/foodTypes";
import { foodTypes as foodTypesSelector } from "../../../../shared/redux/foodTypes/selectors";
import { CreateFoodProviderApiProps, EditFoodProviderApiProps } from "../../../../shared/redux/foodProviders/api";
import { get as getFoodTypes } from "../../../../shared/redux/foodTypes/routines";
import { formStyles } from "../../../components/Layout/FormPage/styles";
export interface FoodProviderFormStyleProps {
	classes: {
		form: string;
	};
}
export interface FoodProviderFormReduxProps {
	foodTypes: FoodTypesState;
}
export class FoodProviderForm extends React.PureComponent<InjectedFormProps & FoodProviderFormReduxProps & WithDispatch & RouteComponentProps> {
	componentDidMount() {
		if (!this.props.foodTypes.loaded) {
			this.props.dispatch(getFoodTypes.trigger());
		}
	}
	onSubmit = (data: EditFoodProviderApiProps | CreateFoodProviderApiProps) => {
		const { submission, success, failure } = createSubmisisonPromise();
		submission.then(() => {
			this.props.history.push("/food-providers");
		});
		if ((data as EditFoodProviderApiProps)._id) {
			this.props.dispatch(edit.trigger({ data: data as EditFoodProviderApiProps, controller: { success, failure } }));
		} else {
			this.props.dispatch(create.trigger({ data: data as CreateFoodProviderApiProps, controller: { success, failure } }));
		}
		return submission;
	}
	render() {
		const { props: { handleSubmit, initialValues, foodTypes: { data: options } } } = this;
		const init = initialValues as any;
		const _id = init && init._id || undefined;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<Field type="hidden" name="_id" component="input" />
				<Field
					name="name"
					label="Name"
					validate={[validator.required, validator.minLength2, validator.maxLength30]}
					component={FormTextField}
					required
					fullWidth
				/>
				<Field
					name="foodTypes"
					label="Food Types"
					component={FormSelectField}
					fullWidth
					options={options}
				/>
				<SubmitButton
					disabled={this.props.submitting}
					text={_id ? "Save" : "Create"}
				/>
			</form>
		);
	}
}
const StyledFoodProviderForm = withStyles(formStyles)(FoodProviderForm);
const ConnectedFoodProviderForm = connect<FoodProviderFormReduxProps, WithDispatch>(foodTypesSelector)(StyledFoodProviderForm);

export default reduxForm({
	form: "foodProvider",
})(withRouter(ConnectedFoodProviderForm));
