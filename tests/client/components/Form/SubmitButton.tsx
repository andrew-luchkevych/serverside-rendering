import * as React from "react";
import { shallow } from "enzyme";
import Button from "@material-ui/core/Button";
import SubmitButton from "../../../../src/client/components/Form/SubmitButton";
describe("/client/components/form/submitButton", () => {
	it("should renders", () => {
		const btnText = "submit";
		const c = shallow(<SubmitButton text={btnText} />);
		expect(c.dive().is(Button)).toBe(true);
		expect(c.dive().childAt(0).text()).toBe(btnText);
	});
});