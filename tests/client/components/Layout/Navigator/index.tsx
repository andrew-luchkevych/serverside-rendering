import * as React from "react";
import { shallow } from "enzyme";
import { Navigator } from "../../../../../src/client/components/Layout/Navigator";
describe("/client/components/Layout/Navigator", () => {
	it("logged === true", () => {
		const c = shallow(<Navigator drawer={{}} logged={true} />);
	});
	it("logged === false", () => {
		const c = shallow(<Navigator drawer={{}} logged={false} />);
	});
});