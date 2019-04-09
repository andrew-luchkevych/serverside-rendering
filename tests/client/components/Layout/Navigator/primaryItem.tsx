import * as React from "react";
import { shallow } from "enzyme";
import LinkedListItem from "../../../../../src/client/components/Linked/LinkedListItem";
import { publicPreRoutes } from "../../../../../src/client/components/Layout/Navigator/menu";
import PrimaryItem from "../../../../../src/client/components/Layout/Navigator/primaryItem";
describe("/client/components/Layout/Navigator/primaryItem", () => {
	const menuItem = { ...publicPreRoutes[0] };
	it("render", () => {
		const props = { ...menuItem };
		const c = shallow(<PrimaryItem {...props} />).dive();
		expect(c.is(LinkedListItem)).toBe(true);
		expect(c.prop("to")).toBe(props.to);
	});
	it("should has # if link not passed", () => {
		const props = { ...menuItem, to: undefined };
		const c = shallow(<PrimaryItem {...props} />).dive();
		expect(c.is(LinkedListItem)).toBe(true);
		expect(c.prop("to")).toBe("#");
	});
});