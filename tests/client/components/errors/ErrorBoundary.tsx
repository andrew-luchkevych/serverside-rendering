import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import ErrorBoundary, { ErrorBoundaryProps, ErrorBoundaryState } from "../../../../src/client/components/errors/ErrorBoundary";
describe("/client/components/errors/ErrorBoundary", () => {
	it("render", () => {
		const c: ShallowWrapper<ErrorBoundaryProps, ErrorBoundaryState, ErrorBoundary> = shallow(<ErrorBoundary><div></div></ErrorBoundary>);
		const err = new Error();
		const info: React.ErrorInfo = {
			componentStack: "fake",
		};
		c.instance().componentDidCatch(err, info);
		c.update();
		expect(c.instance().state.error).toBe(err);
		expect(c.instance().state.errorInfo).toBe(info);
	});
});