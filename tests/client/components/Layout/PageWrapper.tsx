import * as React from "react";
import { shallow } from "enzyme";
import PageWrapper from "../../../../src/client/components/Layout/PageWrapper";
describe("/client/components/Layout/PageWrapper", () => {
	it("render", () => {
		expect(shallow(<PageWrapper><span id="test"></span></PageWrapper>).dive().find("#test")).toHaveLength(1);
	});
});