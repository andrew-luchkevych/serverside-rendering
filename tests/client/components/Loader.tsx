import * as React from "react";
import { shallow } from "enzyme";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loader from "../../../src/client/components/Loader";
describe("/client/components/Loader", () => {
	it("render", () => {
		const c = shallow(<Loader />);
		expect(c.dive().find(CircularProgress).length).toBe(1);
	});

	it("render nopadding", () => {
		const c = shallow(<Loader nopadding />);
		expect(c.dive().prop("style")).toHaveProperty("padding", 0);
	});
});