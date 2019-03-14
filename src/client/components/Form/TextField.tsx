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
	const { input, label, meta: { touched, error } } = props;
	return (
		<TextField
			label={label}
			error={touched && error}
			helperText={touched && error}
			{...input}
		/>
	);
};