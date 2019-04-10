import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import fakeMessage from "../../../../../fakes/message";
import routines from "../../../../../src/shared/redux/messages/routines";
import { Chat, ChatProps, ChatState } from "../../../../../src/client/pages/Home/private/Chat";
describe("/client/pages/Home/private/Chat", () => {
	let c: ShallowWrapper<ChatProps, ChatState, Chat>;
	const mockedProps: ChatProps = {
		classes: {
			fullheight: "fake",
			flexColumn: "fake",
			flexOne: "fake",
			flexRow: "fake",
			fullHeightHiddenOverflow: "fake",
		},
		dispatch: sinon.spy(),
	};
	it("should init correctly", () => {
		c = shallow(<Chat {...mockedProps} />);
		expect(c.instance().removeController.open()).toBe(null);
		expect(c.instance().removeController.close()).toBe(null);
		expect(c.instance().state.messageForEdit).toBe(undefined);
		expect(c.instance().state.idForRemove).toBe(undefined);
	});

	it("onMessageEdit", () => {
		c.instance().onMessageEdit(fakeMessage);
		c.update();
		expect(c.instance().state.messageForEdit).toEqual(fakeMessage);
	});

	it("onMessageEditFinished", () => {
		c.instance().onMessageEditFinished();
		c.update();
		expect(c.instance().state.messageForEdit).toBe(undefined);
	});

	it("onMessageRemove", () => {
		const stub = sinon.stub(c.instance().removeController, "open");
		c.instance().onMessageRemove(fakeMessage._id);
		c.update();
		expect(c.instance().state.idForRemove).toBe(fakeMessage._id);
		expect(stub.calledOnce).toBe(true);
		stub.restore();
	});

	it("removeMessage", () => {
		const d = mockedProps.dispatch as sinon.SinonSpy;
		c.instance().removeMessage();
		c.update();
		expect(
			d.calledOnceWith(
				routines.remove.trigger({ data: { _id: fakeMessage._id } }),
			),
		).toBe(true);
		expect(c.instance().state.idForRemove).toBe(undefined);
		d.resetHistory();
	});
});