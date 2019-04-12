import * as React from "react";
import { shallow } from "enzyme";
import { Loading } from "../../../src/client/routes/loadable";
import Loader from "../../../src/client/components/Loader";
import { AppRoute } from "../../../src/client/routes/route";
import { Route, Redirect } from "react-router-dom";
import routes from "../../../src/client/routes";
import Bluebird from "bluebird";
describe("/client/routes", () => {
	it("LoadableComponent should loads routes", (done) => {
		const promises = routes.map(r => (r as any).component.preload());
		Bluebird.all(promises).then(() => {
			done();
		}).catch((err) => {
			throw err;
		});
	});
	it("LoadableComponent.loading should work correctly", () => {
		const c = shallow(<Loading />);
		expect(c.isEmptyRender()).toBe(true);
		c.setProps({ error: "qwer" });
		expect(c.text()).toBe("Error!");
		c.setProps({ error: null, pastDelay: true });
		expect(c.is(Loader));
	});

	it("AppRoute", () => {
		const Comp = () => null;
		const props: any = {
			component: Comp,
			isPrivate: true,
			logged: true,
		};
		const c = shallow(<AppRoute {...props} />);
		expect(c.is(Route)).toBe(true);
		expect(c.prop("render")).toBeDefined();
		expect(c.prop("component")).toBeUndefined();

		let Render = c.prop("render");
		const renderProps = {
			location: { state: { from: "fake" } },
		};
		let rendered = shallow(<Render {...renderProps} />);
		expect(rendered.is(Comp));

		c.setProps({ logged: false });
		Render = c.prop("render");
		rendered = shallow(<Render {...renderProps} />);
		expect(rendered.is(Redirect));

		c.setProps({ isPrivate: false });
		expect(c.is(Route)).toBe(true);
		expect(c.prop("component")).toBe(Comp);
	});
});