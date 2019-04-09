import * as React from "react";
import { shallow } from "enzyme";
import withError from "../../../../src/client/components/errors/ErrorWrapper";
describe("/client/components/errors/ErrorWrapper", () => {
	it("render", () => {
		const Comp = () => <div id="fake"></div>;
		const CompWithError = withError(Comp);
		const c = shallow(<CompWithError />);
		expect(c.is(Comp)).toBe(true);
		const err = new Error();
		const info: React.ErrorInfo = {
			componentStack: "fake",
		};
		c.instance().componentDidCatch(err, info);
		c.update();
		expect(c.is(Comp)).toBe(false);
	});
});