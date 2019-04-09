import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import Fab from "@material-ui/core/Fab";
import Page from "../../../../src/client/pages/FoodProviders";
import { MemoryRouter } from "react-router";
import { FoodProvidersPage, FoodProvidersPageProps } from "../../../../src/client/pages/FoodProviders/page";
describe("/client/client/pages/FoodProviders", () => {
	let c: ShallowWrapper<FoodProvidersPageProps, {}, React.Component<FoodProvidersPageProps>>;
	let router: ShallowWrapper;
	it("render", () => {
		const MiddleComponent = (props: any) => <Page {...props} />;
		router = shallow(<MemoryRouter><MiddleComponent /></MemoryRouter>);
		c = router.dive().dive().dive().dive().dive() as any;
		expect(c.is(FoodProvidersPage)).toBe(true);
	});

	it("should redirect on creation on create button click", () => {
		const stub = sinon.stub(c.instance().props.history, "push");
		c.update();
		c.dive().find(Fab).simulate("click");
		expect(stub.calledOnceWith("/food-providers/create" as any));
		stub.restore();
	});
});