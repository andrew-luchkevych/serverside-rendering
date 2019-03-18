import * as React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { withRouter, RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { Typography } from "@material-ui/core";
import WithDispatch from "../../../shared/types/store/dispatch";
import { createSubmisisonPromise } from "../../../shared/utils/formSubmission";
import { ApiLoginProps } from "../../../shared/redux/user/api";
import { login } from "../../../shared/redux/user/routines";
import { FormTextField } from "../../components/Form/TextField";
import SubmitButton from "../../components/Form/SubmitButton";
import validator from "../../services/validator";
export class LoginForm extends React.PureComponent<InjectedFormProps & WithDispatch & RouteComponentProps> {
	onSubmit = (data: ApiLoginProps) => {
		const { submission, success, failure } = createSubmisisonPromise();
		submission.then(() => {
			if (this.props.location.state.from) {
				this.props.history.replace(this.props.location.state.from);
			} else {
				this.props.history.replace("/");
			}
		});
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
				<Typography style={{ textAlign: "center" }}>
					Have not account?
					<NavLink to="signup"> Sign Up </NavLink>
				</Typography>
			</form>
		);
	}
}

const ConnectedLoginForm = connect(null)(LoginForm);

export default reduxForm({
	form: "login",
})(withRouter(ConnectedLoginForm));
