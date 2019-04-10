import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import Fab from "@material-ui/core/Fab";
import Page from "../../../../src/client/pages/FoodTypes";
import { MemoryRouter } from "react-router";
import { FoodTypesPage, FoodTypesPageProps } from "../../../../src/client/pages/FoodTypes/page";
describe("/client/client/pages/FoodTypes", () => {
	let c: ShallowWrapper<FoodTypesPageProps, {}, React.Component<FoodTypesPageProps>>;
	let router: ShallowWrapper;
	it("render", () => {
		const MiddleComponent = (props: any) => <Page {...props} />;
		router = shallow(<MemoryRouter><MiddleComponent /></MemoryRouter>);
		c = router.dive().dive().dive().dive().dive() as any;
		expect(c.is(FoodTypesPage)).toBe(true);
	});

	it("should redirect on creation on create button click", () => {
		const stub = sinon.stub(c.instance().props.history, "push");
		c.update();
		c.dive().find(Fab).simulate("click");
		expect(stub.calledOnceWith("/food-types/create" as any));
		stub.restore();
	});
});