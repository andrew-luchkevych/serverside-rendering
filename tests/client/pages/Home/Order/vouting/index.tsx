import * as React from "react";
import { shallow } from "enzyme";
import Vouting from "../../../../../../src/client/pages/Home/private/Order/vouting";

describe("/client/pages/Home/private/Order/vouting", () => {
	it("render", () => {
		shallow(<Vouting />).dive();
	});
});