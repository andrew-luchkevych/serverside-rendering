import * as React from "react";
import { shallow } from "enzyme";
import PageWrapper from "..";
describe("<PageWrapper />", () => {
	it("render", () => {
		expect(shallow(<PageWrapper><span></span></PageWrapper>).dive().find("div")).toHaveLength(1);
	});
});