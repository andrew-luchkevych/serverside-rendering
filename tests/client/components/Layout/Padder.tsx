import * as React from "react";
import { shallow } from "enzyme";
import Padder from "../../../../src/client/components/Layout/Padder";
describe("/client/components/Layout/Padder", () => {
	it("should render", () => {
		const c = shallow(<Padder />);
		expect(c.is("div")).toBe(true);
	});
	it("should render children inside", () => {
		const c = shallow(<Padder><span>text</span><div></div></Padder>);
		expect(c.childAt(0).is("span")).toBe(true);
		expect(c.childAt(1).is("div")).toBe(true);
	});
});