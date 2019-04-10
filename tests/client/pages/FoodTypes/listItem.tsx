import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import routines from "../../../../src/shared/redux/foodTypes/routines";
import fakeFoodType from "../../../../fakes/foodType";
import { FoodTypeListItem, FoodTypeListItemProps } from "../../../../src/client/pages/FoodTypes/page/listItem";
describe("/client/pages/FoodTypes/page/container", () => {
	let c: ShallowWrapper<FoodTypeListItemProps, {}, FoodTypeListItem>;
	const mockedProps: FoodTypeListItemProps = {
		...fakeFoodType,
		dispatch: sinon.spy(),
	};
	it("should works correctly", () => {
		c = shallow(<FoodTypeListItem {...mockedProps} />);
		expect(c.instance().removeConfirmationDialogController.open()).toBe(null);
		expect(c.instance().removeConfirmationDialogController.close()).toBe(null);
		c.instance().remove();
		expect(
			(mockedProps.dispatch as sinon.SinonSpy)
				.calledOnceWith(routines.remove.trigger({ data: { _id: fakeFoodType._id } })),
		).toBe(true);
		const stub = sinon.stub(c.instance().removeConfirmationDialogController, "open");
		c.update();
		c.instance().onRemoveClick();
		expect(stub.calledOnce).toBe(true);
	});
});