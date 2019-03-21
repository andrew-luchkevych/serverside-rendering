import * as React from "react";
import { WrappedFieldMetaProps, WrappedFieldInputProps } from "redux-form";
import { TextField } from "@material-ui/core";
export interface FormTextFieldProps {
	input: WrappedFieldInputProps;
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
			value={input.value}
			onChange={input.onChange}
		/>
	);
};