import * as React from "react";
import sinon from "sinon";
import { shallow, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { App, pageDataTypes } from "../../src/client/App";

describe("Client App", () => {
	let c: ShallowWrapper;
	let middle: ShallowWrapper;
	let router: ShallowWrapper;
	it("should be App", () => {
		const MiddleComponent = (props: any) => <App {...props} />;
		router = shallow(<MemoryRouter><MiddleComponent /></MemoryRouter>);
		middle = router.find("MiddleComponent").dive();
		c = middle.find("App");
		expect(c.is(App)).toBe(true);
	});
	it("pageDataTypes should be cleared on onRouteChanged", () => {
		c = c.dive();
		pageDataTypes.add("user");
		const app = c.instance() as App;
		app.onRouteChanged();
		expect(pageDataTypes.size).toBe(0);
	});
	it("should call onRouteChanged when location changed", () => {
		const stub = sinon.stub(c.instance() as App, "onRouteChanged");
		c.update();
		expect(stub.notCalled).toBe(true);
		c.setProps({ location: "/new-location" });
		c.update();
		expect(stub.calledOnce).toBe(true);
	});
});
