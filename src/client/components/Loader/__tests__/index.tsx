import * as React from "react";
import { shallow } from "enzyme";
import Loader from "..";
describe("<Loader />", () => {
	it("render", () => {
		const c = shallow(<Loader />);
		expect(c.is("div")).toBe(true);
		expect(c.prop("style")).toHaveProperty("padding", "2em");
		const p = c.find("WithStyles(CircularProgress)");
		expect(p).toHaveLength(1);
	});

	it("render nopadding", () => {
		const c = shallow(<Loader nopadding />);
		expect(c.prop("style")).toHaveProperty("padding", 0);
	});
});