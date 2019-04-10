import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import routines from "../../../../src/shared/redux/foodProviders/routines";
import fakeFoodProvider from "../../../../fakes/foodProvider";
import { FoodProviderListItem, FoodProviderListItemProps } from "../../../../src/client/pages/FoodProviders/page/listItem";
describe("/client/pages/FoodProviders/page/listItem", () => {
	let c: ShallowWrapper<FoodProviderListItemProps, {}, FoodProviderListItem>;
	const mockedProps: FoodProviderListItemProps = {
		...fakeFoodProvider,
		classes: {
			avatar: "avatar",
		},
		dispatch: sinon.spy(),
	};
	it("should works correctly", () => {
		c = shallow(<FoodProviderListItem {...mockedProps} />);
		expect(c.instance().removeConfirmationDialogController.open()).toBe(null);
		expect(c.instance().removeConfirmationDialogController.close()).toBe(null);
		c.instance().remove();
		expect(
			(mockedProps.dispatch as sinon.SinonSpy)
				.calledOnceWith(routines.remove.trigger({ data: { _id: fakeFoodProvider._id } })),
		).toBe(true);
		const stub = sinon.stub(c.instance().removeConfirmationDialogController, "open");
		c.update();
		c.instance().onRemoveClick();
		expect(stub.calledOnce).toBe(true);
	});
});