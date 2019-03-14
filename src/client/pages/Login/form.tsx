import * as React from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { FormTextField } from "../../components/Form/TextField";
import validator from "../../services/validator";
import { ApiLoginProps } from "../../../shared/redux/user/api";
import { Button } from "@material-ui/core";
export interface LoginFormProps extends InjectedFormProps {
	onSubmit: (values: ApiLoginProps) => Promise<boolean>;
}

export class LoginForm extends React.PureComponent<LoginFormProps> {
	render() {
		return (
			<form>
				<Field
					name="email"
					type="email"
					label="E-Mail"
					validate={[validator.required, validator.email]}
					component={FormTextField}
				/>
				<Field
					name="password"
					type="password"
					label="Password"
					validate={[validator.minLength5, validator.maxLength128]}
					component={FormTextField}
				/>
				<div>
					<Button disabled={this.props.submitting}>Login</Button>
				</div>
			</form>
		);
	}
}

export default reduxForm({
	form: "login",
})(LoginForm);
