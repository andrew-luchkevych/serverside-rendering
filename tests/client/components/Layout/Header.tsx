import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import { user } from "../../../../fakes/user";
import { Header, HeaderProps, HeaderState } from "../../../../src/client/components/Layout/Header";
describe("/client/components/Layout/Header", () => {
	let c: ShallowWrapper<HeaderProps, HeaderState, Header>;
	const dispatch = sinon.spy();
	const onDrawerToggle = sinon.spy();
	const classes = {
		menuButton: "string",
		link: "string",
		iconButtonAvatar: "string",
		avatar: "string",
		secondaryBar: "string",
		button: "string",
	};
	beforeEach(() => {
		dispatch.resetHistory();
		onDrawerToggle.resetHistory();
	});
	it("render (user not exist)", () => {
		c = shallow(
			<Header
				onDrawerToggle={onDrawerToggle}
				dispatch={dispatch}
				logged={false}
				classes={classes}
			/>,
		);
	});
	it("render (user exist)", () => {
		c = shallow(
			<Header
				onDrawerToggle={onDrawerToggle}
				dispatch={dispatch}
				logged={true}
				classes={classes}
				user={user}
			/>,
		);
	});

	it("updateTitle", () => {
		const title = "fake title";
		c.instance().updateTitle({ title });
		c.update();
		expect(c.instance().state.title).toBe(title);
	});

	it("handleMenuToggle", () => {
		c.instance().handleMenuToggle();
		c.update();
		expect(c.instance().state.userMenuOpen).toBe(true);
	});

	it("handleMenuClose", () => {
		c.instance().handleMenuClose();
		c.update();
		expect(c.instance().state.userMenuOpen).toBe(false);
	});

	it("logout", () => {
		const closeMenuStub = sinon.stub(c.instance(), "handleMenuClose");
		c.update();
		c.instance().logout();
		expect(closeMenuStub.calledOnce).toBe(true);
		expect(dispatch.calledOnceWith({ type: "USER/LOGOUT/TRIGGER" })).toBe(true);
		closeMenuStub.restore();
	});
});