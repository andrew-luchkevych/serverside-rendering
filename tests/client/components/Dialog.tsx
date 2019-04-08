import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import Slide from "@material-ui/core/Slide";
import Dialog, { ConfirmationDialogProps, ConfirmationDialogState } from "../../../src/client/components/Dialog";
describe("Components/Dialog", () => {
	let c: ShallowWrapper<ConfirmationDialogProps, ConfirmationDialogState, Dialog>;
	const title = "Title";
	const description = "Description";
	it("should init correctly", () => {
		c = shallow(<Dialog title={title} description={description} />, { disableLifecycleMethods: true });
		expect(c.instance().props.controller.open()).toBe(null);
		expect(c.instance().props.controller.close()).toBe(null);
		expect(c.instance().props.onAgree()).toBe(null);
		expect(c.instance().props.onDisagree()).toBe(null);
		c = shallow(<Dialog title={title} description={description} />);
		expect(c.instance().props.controller.open).toBe(c.instance().open);
		expect(c.instance().props.controller.close).toBe(c.instance().close);
		const transition = shallow(c.instance().transition({
			direction: "up",
		}));
		expect(transition.is("Slide")).toBe(true);
	});

	it("should react on open/close", () => {
		c.instance().open();
		c.update();
		expect(c.state().opened).toBe(true);

		c.instance().close();
		c.update();
		expect(c.state().opened).toBe(false);
	});

	it("should call close and onAgree on agree", () => {
		const onAgree = sinon.spy();
		c = shallow(<Dialog title={title} description={description} onAgree={onAgree} />);
		const close = sinon.stub(c.instance(), "close");
		c.update();
		c.instance().agree();
		expect(close.calledOnce).toBe(true);
		expect(onAgree.calledOnce).toBe(true);
	});

	it("should call close and onDisagree on disagree", () => {
		const onDisagree = sinon.spy();
		c = shallow(<Dialog title={title} description={description} onDisagree={onDisagree} />);
		const close = sinon.stub(c.instance(), "close");
		c.update();
		c.instance().disagree();
		expect(close.calledOnce).toBe(true);
		expect(onDisagree.calledOnce).toBe(true);
	});
});