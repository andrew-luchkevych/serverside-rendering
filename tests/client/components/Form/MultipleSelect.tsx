import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { FormSelectField, FormSelectFieldProps } from "../../../../src/client/components/Form/MultipleSelect";
describe("/client/components/TextField", () => {
	let c: ShallowWrapper<FormSelectFieldProps, {}, FormSelectField>;
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
	let optionsProp = [{
		_id: "fake",
		name: "fakeName",
	}];
	let classesProp = { chips: "chips", chip: "chip" }
	it("should wrap correctly", () => {
		c = shallow(
			<FormSelectField
				input={inputProps}
				label={label}
				meta={metaProps}
				options={optionsProp}
				classes={classesProp}
			/>,
		);
		expect(c.is(FormControl)).toBe(true);
	});

	it("renderValue should render value", () => {
		expect(shallow(c.instance().renderValue("fake")).is("Chip")).toBe(true);
	});

	it("renderValue should return null if option not exist", () => {
		expect(c.instance().renderValue("none")).toBe(null);
	});

	it("renderValues should render wrapped values", () => {
		const values = shallow(c.instance().renderValues(["fake", "none"]));
		expect(values.is("div")).toBe(true);
		expect(values.hasClass("chips")).toBe(true);
		expect(values.children.length).toBe(1);
	});

	it("should render error if it passes", () => {
		metaProps.touched = true;
		metaProps.error = "Some fake error";
		inputProps.value = undefined;
		c = shallow(
			<FormSelectField
				input={inputProps}
				label={label}
				meta={metaProps}
				options={optionsProp}
				classes={classesProp}
			/>,
		);
		expect(c.is(FormControl)).toBe(true);
		expect(c.dive().prop("error")).toBe(true);
		const errText = c.dive().find(FormHelperText);
		expect(errText.childAt(0).text()).toEqual(metaProps.error);
	});
});