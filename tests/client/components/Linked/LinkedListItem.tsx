import * as React from "react";
import { shallow } from "enzyme";
import ListItem from "@material-ui/core/ListItem";
import LinkedListItem from "../../../../src/client/components/Linked/LinkedListItem";
describe("/client/components/Linked/LinkedListItem", () => {
	it("render", () => {
		const c = shallow(<LinkedListItem>test</LinkedListItem>);
		expect(c.is(ListItem)).toBe(true);
	});
});