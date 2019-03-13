import * as React from "react";
import { shallow } from "enzyme";
import ContentWrapper from "..";
describe("<ContentWrapper />", () => {
	it("render", () => {
		const c = shallow(<ContentWrapper><div id="#temporary-child"></div></ContentWrapper>);
		const main = c.dive();
		expect(main.is("main")).toBe(true);
		expect(main.childAt(0).is("#temporary-child"));
	});
});