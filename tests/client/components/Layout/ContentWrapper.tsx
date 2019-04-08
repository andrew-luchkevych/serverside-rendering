import * as React from "react";
import { shallow } from "enzyme";
import { ContentWrapper } from "../../../../src/client/components/Layout/ContentWrapper";
describe("/client/components/Layout/ContentWrapper", () => {
	it("render", () => {
		const c = shallow(<ContentWrapper classes={{ mainContent: "mainContent" }}><div id="child"></div></ContentWrapper>);
		expect(c.find("#child").length).toBe(1);
	});
});