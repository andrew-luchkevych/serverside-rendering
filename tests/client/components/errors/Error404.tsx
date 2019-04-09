import * as React from "react";
import { shallow } from "enzyme";
import Error404 from "../../../../src/client/components/errors/Error404";
describe("/client/components/errors/Error404", () => {
	it("render", () => {
		const context = {
			status: 200,
		};
		shallow(<Error404 staticContext={context} />);
		expect(context.status).toBe(404);
	});
});