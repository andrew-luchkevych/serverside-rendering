import * as React from "react";
import { shallow } from "enzyme";
import LinkedListItem from "../../../../components/LinkedListItem";
import PrimaryItem from "../primaryItem";
import menuItems from "../menu";

describe("Navigator Primary Item", () => {
	it("render", () => {
		const props = { ...menuItems[0] };
		const c = shallow(<PrimaryItem {...props} />).dive();
		expect(c.is(LinkedListItem)).toBe(true);
		expect(c.prop("to")).toBe(props.to);
	});
	it("should has # if link not passed", () => {
		const props = { ...menuItems[0], to: undefined };
		const c = shallow(<PrimaryItem {...props} />).dive();
		expect(c.is(LinkedListItem)).toBe(true);
		expect(c.prop("to")).toBe("#");
	});
});