import * as React from "react";
import { shallow } from "enzyme";
import IconButton from "@material-ui/core/IconButton";
import LinkedIconButton from "../../../../src/client/components/Linked/LinkedIconButton";
describe("/client/components/Linked/LinkedIconButton", () => {
	it("render", () => {
		const c = shallow(<LinkedIconButton>test</LinkedIconButton>);
		expect(c.is(IconButton)).toBe(true);
	});
});