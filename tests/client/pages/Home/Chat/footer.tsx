import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import fakeMessage from "../../../../../fakes/message";
import routines from "../../../../../src/shared/redux/messages/routines";
import { MessagesFooter, MessagesFooterProps, MessagesFooterState } from "../../../../../src/client/pages/Home/private/Chat/footer";

describe("/client/pages/Home/private/Chat/footer", () => {
	let c: ShallowWrapper<MessagesFooterProps, MessagesFooterState, MessagesFooter>;
	let props: MessagesFooterProps = {
		classes: {
			footerContainer: "string",
			flexOne: "string",
			input: "string",
		},
		dispatch: sinon.spy(),
	};
	let d = props.dispatch as sinon.SinonSpy;
	let inst: MessagesFooter;
	it("render", () => {
		c = shallow(<MessagesFooter {...props} />);
		inst = c.instance();
		expect(inst.state.submitting).toBe(false);
		expect(inst.state.text).toBe("");
	});

	it("onChange", () => {
		const value = "fake";
		let e: any = { target: { value } };
		inst.onChange(e);
		c.update();
		expect(inst.state.text).toBe(value);
	});

	it("submit (create) should be breaked on empty text", () => {
		d.resetHistory();
		inst.setState({ text: "" });
		c.update();
		inst.onSubmit();
		expect(d.called).toBe(false);

		inst.setState({ text: "       " });
		c.update();
		inst.onSubmit();
		expect(d.called).toBe(false);
	});

	it("submit (create) should call create routine", (done) => {
		d.resetHistory();
		const text = "fake";
		inst.setState({ text, submitting: false });
		c.update();
		inst.onSubmit();
		c.update();
		expect(inst.state.submitting).toBe(true);
		expect(d.calledOnce).toBe(true);
		const args = d.getCall(0).args[0];
		expect(args.type).toBe(routines.create.TRIGGER);
		expect(args.payload.data.text).toBe(text);
		setTimeout(() => {
			args.payload.controller.success();
			setTimeout(() => {
				c.update();
				expect(inst.state.text).toBe("");
				expect(inst.state.submitting).toBe(false);
				done();
			}, 1000);
		}, 1000);
	});

	it("submit (create) routine catch", (done) => {
		d.resetHistory();
		const text = "fake";
		inst.setState({ text, submitting: false });
		c.update();
		inst.onSubmit();
		c.update();
		expect(d.calledOnce).toBe(true);
		const args = d.getCall(0).args[0];
		setTimeout(() => {
			args.payload.controller.failure();
			setTimeout(() => {
				c.update();
				expect(inst.state.text).toBe(text);
				expect(inst.state.submitting).toBe(false);
				done();
			}, 1000);
		}, 1000);
	});

	it("message for edit passed", () => {
		c.setProps({ message: fakeMessage });
		c.update();
		expect(inst.state.text).toBe(fakeMessage.text);
	});

	it("submit (edit), onEditComplete not passed", (done) => {
		d.resetHistory();
		inst.onSubmit();
		c.update();
		expect(inst.state.submitting).toBe(true);
		expect(d.calledOnce).toBe(true);
		const args = d.getCall(0).args[0];
		expect(args.type).toBe(routines.edit.TRIGGER);
		expect(args.payload.data).toEqual(fakeMessage);
		setTimeout(() => {
			args.payload.controller.success();
			setTimeout(() => {
				c.update();
				expect(inst.state.text).toBe("");
				expect(inst.state.submitting).toBe(false);
				done();
			}, 1000);
		}, 1000);
	});

	it("submit (edit), onEditComplete passed", (done) => {
		d.resetHistory();
		const editComplete = sinon.spy();
		c.setProps({ onEditComplete: editComplete });
		inst.setState({ text: fakeMessage.text });
		c.update();
		inst.onSubmit();
		c.update();
		expect(d.calledOnce).toBe(true);
		const args = d.getCall(0).args[0];
		setTimeout(() => {
			args.payload.controller.success();
			setTimeout(() => {
				expect(editComplete.calledOnce).toBe(true);
				done();
			}, 1000);
		}, 1000);
	});
});