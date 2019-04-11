import * as React from "react";
import { shallow } from "enzyme";
import fakeMessage from "../../../../../../fakes/message";
import { IncomeMessageItem, IncomeMessageItemProps } from "../../../../../../src/client/pages/Home/private/Chat/messages/message/income";
import Avatar from "@material-ui/core/Avatar";

describe("/client/pages/Home/private/Chat/messages/income", () => {
	let props: IncomeMessageItemProps = {
		classes: {
			message: "message",
			currentUserMessage: "currentUserMessage",
			messageContainer: "messageContainer",
			currentUserMessageContainer: "currentUserMessageContainer",
			editedText: "editedText",
		},
		message: fakeMessage,
	};
	it("should render correctly", () => {
		let c = shallow(<IncomeMessageItem {...props} />);
		let container = c.find("." + props.classes.messageContainer);
		expect(container.exists()).toBe(true);
		expect(container.childAt(1).prop("color")).toBe("textPrimary");
	});

	it("deleted", () => {
		props.message.deleted = true;
		let c = shallow(<IncomeMessageItem {...props} />);
		expect(c.find("." + props.classes.messageContainer).childAt(1).prop("color")).toBe("textSecondary");
	});

	it("edited", () => {
		props.message.deleted = false;
		props.message.updatedAt = (new Date()).toISOString();
		let c = shallow(<IncomeMessageItem {...props} />);
		expect(c.find("." + props.classes.messageContainer).childAt(2).is("." + props.classes.editedText)).toBe(true);
	});

	it("picture not exist", () => {
		props.message.author.profile.picture = undefined;
		let c = shallow(<IncomeMessageItem {...props} />);
		expect(c.find(Avatar).prop("src")).toBe("");
	});
});