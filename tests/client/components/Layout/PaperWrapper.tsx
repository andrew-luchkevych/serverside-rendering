import * as React from "react";
import { shallow } from "enzyme";
import PaperWrapper from "../../../../src/client/components/Layout/PaperWrapper";
describe("/client/components/Layout/PaperWrapper", () => {
	it("render", () => {
		expect(shallow(<PaperWrapper><span id="test"></span></PaperWrapper>).dive().find("#test")).toHaveLength(1);
	});
});