import * as React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { withRouter, RouteComponentProps } from "react-router";
import WithDispatch from "../../../../shared/types/store/dispatch";
import { createSubmisisonPromise } from "../../../../shared/utils/formSubmission";
import { create, edit } from "../../../../shared/redux/foodTypes/routines";
import { FormTextField } from "../../../components/Form/TextField";
import SubmitButton from "../../../components/Form/SubmitButton";
import validator from "../../../services/validator";
import { CreateFoodTypeApiProps, EditFoodTypeApiProps } from "../../../../shared/redux/foodTypes/api";
export class FoodType extends React.PureComponent<InjectedFormProps & WithDispatch & RouteComponentProps> {
	onSubmit = (data: EditFoodTypeApiProps | CreateFoodTypeApiProps) => {
		const { props: { initialValues } } = this;
		const init = initialValues as any;
		const _id = init && init._id || undefined;
		const { submission, success, failure } = createSubmisisonPromise();
		submission.then(() => {
			this.props.history.push("/food-types");
		});
		if (_id) {
			this.props.dispatch(edit.trigger({ data: data as EditFoodTypeApiProps, controller: { success, failure } }));
		} else {
			this.props.dispatch(create.trigger({ data: data as CreateFoodTypeApiProps, controller: { success, failure } }));
		}
		return submission;
	}
	render() {
		const { props: { handleSubmit, initialValues } } = this;
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
				<SubmitButton
					disabled={this.props.submitting}
					text={_id ? "Save" : "Create"}
				/>
			</form>
		);
	}
}

const ConnectedFoodType = connect(null)(FoodType);

export default reduxForm({
	form: "foodType",
})(withRouter(ConnectedFoodType));
