import * as React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, InjectedFormProps, FormSection } from "redux-form";
import { FormTextField } from "../../components/Form/TextField";
import validator from "../../services/validator";
import { ApiSignUpProps } from "../../../shared/redux/user/api";
import SubmitButton from "../../components/Form/SubmitButton";
import WithDispatch from "../../../shared/types/store/dispatch";
import { signup } from "../../../shared/redux/user/routines";
import { createSubmisisonPromise } from "../../../shared/utils/formSubmission";
import { withRouter, RouteComponentProps } from "react-router";
import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { ReduxStoreState } from "../../../shared/types/store/RootReducer";
import formValuesSelector from "../../services/formValuesSelector";

export interface ConnectedFormFields {
	formValues: {
		password: string;
	};
}
export type SignUpFormProps = InjectedFormProps & WithDispatch & RouteComponentProps & ConnectedFormFields;
export class SignUpForm extends React.PureComponent<InjectedFormProps & WithDispatch & RouteComponentProps & ConnectedFormFields> {
	onSubmit = (data: ApiSignUpProps) => {
		const { submission, success, failure } = createSubmisisonPromise();
		submission.then(() => {
			this.props.history.replace("/");
		});
		this.props.dispatch(signup.trigger({ data, controller: { success, failure } }));
		return submission;
	}
	render() {
		const { props: { handleSubmit, formValues } } = this;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<Field
					name="email"
					type="email"
					label="E-Mail"
					validate={[validator.required, validator.email]}
					component={FormTextField}
					required
					fullWidth
				/>
				<Field
					name="password"
					type="password"
					label="Password"
					validate={[validator.required, validator.minLength5, validator.maxLength128]}
					component={FormTextField}
					required
					fullWidth
				/>
				<Field
					name="confirmPassword"
					type="password"
					label="Password Confirmation"
					validate={[
						validator.required,
						validator.minLength5,
						validator.maxLength128,
						validator.match(formValues.password, "Password Confirmation should match Password"),
					]}
					component={FormTextField}
					required
					fullWidth
				/>
				<FormSection name="profile">
					<Field
						name="name"
						type="name"
						label="Name"
						validate={[validator.required, validator.letters, validator.minLength2, validator.maxLength128]}
						component={FormTextField}
						required
						fullWidth
					/>
				</FormSection>
				<SubmitButton
					disabled={this.props.submitting}
					text="Sign up"
				/>
				<Typography style={{ textAlign: "center" }}>
					Already have account?
					<NavLink to="signin"> Sign In </NavLink>
				</Typography>
			</form>
		);
	}
}
const ReduxForm = reduxForm({
	form: "signup",
})(withRouter(SignUpForm));

export const mapStateToProps = (state: ReduxStoreState): ConnectedFormFields => ({
	formValues: formValuesSelector(state, "signup", ["password"]),
});
const ConnectedSignUpForm = connect(mapStateToProps)(ReduxForm);

export default ConnectedSignUpForm;