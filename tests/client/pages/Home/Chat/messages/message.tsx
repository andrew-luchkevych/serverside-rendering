import * as React from "react";
import { shallow } from "enzyme";
import fakeMessage from "../../../../../../fakes/message";
import { MessageItem, MessageItemProps } from "../../../../../../src/client/pages/Home/private/Chat/messages/message";
import OutcomeMessageItem from "../../../../../../src/client/pages/Home/private/Chat/messages/message/outcome";
import IncomeMessageItem from "../../../../../../src/client/pages/Home/private/Chat/messages/message/income";

describe("/client/pages/Home/private/Chat/messages/message", () => {
	it("should return correct message type", () => {
		const props: MessageItemProps = {
			message: fakeMessage,
			onEdit: () => null,
			onRemove: () => null,
			userId: fakeMessage.author._id,
		};
		const c = shallow(<MessageItem {...props} />);
		expect(c.is(OutcomeMessageItem)).toBe(true);
		c.setProps({ userId: (new Date).toString() });
		c.update();
		expect(c.is(IncomeMessageItem));
	});
});