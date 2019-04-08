import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import { RootLayoutProps, RootLayoutState, RootLayout } from "../../../../src/client/components/Layout";
import SnackService from "../../../../src/shared/services/SnackService";
describe("/client/components/layout", () => {
	let c: ShallowWrapper<RootLayoutProps, RootLayoutState, RootLayout>;
	let classesProp = {
		root: "root",
		nav: "nav",
		navHidden: "navHidden",
		drawer: "drawer",
		appContent: "appContent",
	};
	let onPresentSnackbar = sinon.spy();
	let enqueueSnackbar = sinon.spy();
	let closeSnackbar = sinon.spy();
	const stubInstall = sinon.stub(SnackService, "install");
	const stubUninstall = sinon.stub(SnackService, "uninstall");
	afterAll(() => {
		stubInstall.restore();
		stubUninstall.restore();
	});
	it("render", () => {
		c = shallow(
			<RootLayout
				classes={classesProp}
				onPresentSnackbar={onPresentSnackbar}
				enqueueSnackbar={enqueueSnackbar}
				closeSnackbar={closeSnackbar}
			>
				<div></div>
			</RootLayout>,
		);
		expect(stubInstall.calledOnceWith(enqueueSnackbar)).toBe(true);
	});

	it("toggle drawer", () => {
		c.instance().toggleMenu();
		c.update();
		expect(c.instance().state.showDrawer).toBe(true);
		c.instance().toggleMenu();
		c.update();
		expect(c.instance().state.showDrawer).toBe(false);
	});

	it("uninstall snack on unmount", () => {
		c.unmount();
		expect(stubUninstall.calledOnce).toBe(true);
	});
});