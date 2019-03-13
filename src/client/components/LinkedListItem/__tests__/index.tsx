import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import ListItem from "@material-ui/core/ListItem";
import LinkedListItem, { LinkedListItemProps } from "..";
import { Link } from "react-router-dom";
describe("Navigator Primary Item", () => {
	const props: LinkedListItemProps = { to: "test" };
	let c: ShallowWrapper;
	it("render", () => {
		c = shallow(<LinkedListItem {...props} />);
		expect(c.is(ListItem)).toBe(true);
		expect(c.prop("component") === Link).toBe(true);
	});
});