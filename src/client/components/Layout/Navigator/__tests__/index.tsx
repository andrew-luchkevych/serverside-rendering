import * as React from "react";
import { shallow } from "enzyme";
import Navigator from "..";
describe("<Navigator />", () => {
	it("should contain drawer", () => {
		const c = shallow(<Navigator />);
		expect(c.dive().find("Drawer")).toHaveLength(1);
	});
});