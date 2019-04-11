import * as React from "react";
import sinon from "sinon";
import { shallow, ShallowWrapper } from "enzyme";
import fakeMessage from "../../../../../../fakes/message";
import {
	OutcomeMessageItem,
	OutcomeMessageItemProps,
	OutcomeMessageItemState,
} from "../../../../../../src/client/pages/Home/private/Chat/messages/message/outcome";

describe("/client/pages/Home/private/Chat/messages/income", () => {
	let c: ShallowWrapper<OutcomeMessageItemProps, OutcomeMessageItemState, OutcomeMessageItem>;
	let inst: OutcomeMessageItem;
	let props: OutcomeMessageItemProps = {
		classes: {
			message: "message",
			currentUserMessage: "currentUserMessage",
			messageContainer: "messageContainer",
			currentUserMessageContainer: "currentUserMessageContainer",
			fabContainer: "fabContainer",
		},
		message: fakeMessage,
		onEdit: sinon.spy(),
		onRemove: sinon.spy(),
	};
	it("should init correctly", () => {
		c = shallow(<OutcomeMessageItem {...props} />);
		inst = c.instance();
		expect(inst.state.dialOpened).toBe(false);
		// console.log(c.find("." + props.classes.message).children());
		expect(c.find("." + props.classes.message).children().length).toBe(2);
		expect(c.find("." + props.classes.messageContainer).childAt(0).prop("color")).toBe("textPrimary");
	});

	it("dial actions should works", () => {
		inst.openDial();
		c.update();
		expect(inst.state.dialOpened).toBe(true);
		inst.closeDial();
		c.update();
		expect(inst.state.dialOpened).toBe(false);
		inst.toggleDial();
		c.update();
		expect(inst.state.dialOpened).toBe(true);
	});

	it("onEdit", () => {
		const stub = sinon.stub(inst, "closeDial");
		inst.onEdit();
		expect(stub.calledOnce).toBe(true);
		expect((props.onEdit as sinon.SinonSpy).calledOnce).toBe(true);
		stub.restore();
	});

	it("onRemove", () => {
		const stub = sinon.stub(inst, "closeDial");
		inst.onRemove();
		expect(stub.calledOnce).toBe(true);
		expect((props.onEdit as sinon.SinonSpy).calledOnce).toBe(true);
		stub.restore();
	});

	it("should hide fab and show deleted text when message deleted", () => {
		c.setProps({ message: { ...fakeMessage, deleted: true } });
		c.update();
		expect(c.find("." + props.classes.message).children().length).toBe(1);
		expect(c.find("." + props.classes.messageContainer).childAt(0).prop("color")).toBe("textSecondary");
	})
});