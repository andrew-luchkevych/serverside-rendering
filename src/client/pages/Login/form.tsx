import * as React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { FormTextField } from "../../components/Form/TextField";
import validator from "../../services/validator";
import { ApiLoginProps } from "../../../shared/redux/user/api";
import SubmitButton from "../../components/Form/SubmitButton";
import WithDispatch from "../../../shared/types/store/dispatch";
import { login } from "../../../shared/redux/user/routines";
import { createSubmisisonPromise } from "../../../shared/utils/formSubmission";

export class LoginForm extends React.PureComponent<InjectedFormProps & WithDispatch> {
	onSubmit = (data: ApiLoginProps) => {
		const { submission, success, failure } = createSubmisisonPromise();
		this.props.dispatch(login.trigger({ data, controller: { success, failure } }));
		return submission;
	}
	render() {
		const { props: { handleSubmit } } = this;
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
				<SubmitButton
					disabled={this.props.submitting}
					text="Sign in"
				/>
			</form>
		);
	}
}

const ConnectedLoginForm = connect(null)(LoginForm);

export default reduxForm({
	form: "login",
})(ConnectedLoginForm);
