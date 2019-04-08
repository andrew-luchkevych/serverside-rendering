import * as React from "react";
import { shallow } from "enzyme";
import FormTextField from "../../../../src/client/components/Form/TextField";
describe("/client/components/TextField", () => {
	let inputProps = {
		value: "fake",
		name: "fake",
		onBlur: () => null,
		onChange: () => null,
		onDragStart: () => null,
		onDrop: () => null,
		onFocus: () => null,
	};
	let label = "fake";
	let metaProps = {
		autofilled: false,
		asyncValidating: false,
		dirty: false,
		error: null,
		dispatch: () => null,
		form: "fake",
		initial: {},
		invalid: false,
		pristine: false,
		submitting: false,
		submitFailed: false,
		touched: false,
		valid: false,
		visited: false,
	};
	it("should wrap correctly", () => {
		const c = shallow(
			<FormTextField
				input={inputProps}
				label={label}
				meta={metaProps}
			/>,
		);
		expect(c.is("TextField")).toBe(true);
	});
	it("should pass error", () => {
		metaProps.touched = true;
		metaProps.error = "Fake Error";
		const c = shallow(
			<FormTextField
				input={inputProps}
				label={label}
				meta={metaProps}
			/>,
		);
		expect(c.prop("error")).toBe(true);
		expect(c.prop("helperText")).toBe(metaProps.error);
	});
});