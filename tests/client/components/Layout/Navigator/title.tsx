import * as React from "react";
import { shallow } from "enzyme";
import Title from "../../../../../src/client/components/Layout/Navigator/title";
import ListItem from "@material-ui/core/ListItem";
describe("/client/components/Layout/Navigator/title", () => {
	describe("Navigator menu", () => {
		it("render", () => {
			const c = shallow(<Title />).dive();
			expect(c.is(ListItem)).toBe(true);
		});
	});
});