import * as React from "react";
import { WrappedFieldMetaProps } from "redux-form";
import { TextField } from "@material-ui/core";
import { StandardTextFieldProps } from "@material-ui/core/TextField";
export interface FormTextFieldProps {
	input: StandardTextFieldProps;
	label: string;
	meta: WrappedFieldMetaProps;
}
export const FormTextField = (props: FormTextFieldProps) => {
	const { input, label, meta: { touched, error }, ...rest } = props;
	return (
		<TextField
			{...rest}
			{...input}
			label={label}
			error={touched && !!error}
			helperText={touched && error}
			defaultValue={input.defaultValue}
			value={input.value}
			onChange={input.onChange}
		/>
	);
};