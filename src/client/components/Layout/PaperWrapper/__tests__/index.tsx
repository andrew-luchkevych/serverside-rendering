import * as React from "react";
import { shallow } from "enzyme";
import PaperWrapper from "..";
describe("<PaperWrapper />", () => {
	it("render", () => {
		expect(shallow(<PaperWrapper><span></span></PaperWrapper>).dive().find("WithStyles(Paper)")).toHaveLength(1);
	});
});