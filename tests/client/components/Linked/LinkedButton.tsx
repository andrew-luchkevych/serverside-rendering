import * as React from "react";
import { shallow } from "enzyme";
import Button from "@material-ui/core/Button";
import LinkedButton from "../../../../src/client/components/Linked/LinkedButton";
describe("/client/components/Linked/LinkedButton", () => {
	it("render", () => {
		const c = shallow(<LinkedButton>test</LinkedButton>);
		expect(c.is(Button)).toBe(true);
	});
});