import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import routines from "../../../../src/shared/redux/foodProviders/routines";
import { FoodProvidersContainer, FoodProvidersContainerProps, mapStateToProps } from "../../../../src/client/pages/FoodProviders/page/container";
import configureStore from "../../../../src/shared/redux/configureStore";
describe("/client/pages/FoodProviders/page/container", () => {
	let c: ShallowWrapper<FoodProvidersContainerProps, {}, FoodProvidersContainer>;
	const mockedProps: FoodProvidersContainerProps = {
		foodProvidersState: {
			data: [],
			loaded: false,
			processing: false,
		},
		forceReload: false,
		dispatch: sinon.spy(),
	};
	it("should load foodProviders", () => {
		c = shallow(<FoodProvidersContainer {...mockedProps} />);
		expect((mockedProps.dispatch as sinon.SinonSpy).calledOnceWith({ type: routines.get.TRIGGER })).toBe(true);
	});

	it("should load foodProviders when forceReload === true", () => {
		mockedProps.foodProvidersState.loaded = true;
		mockedProps.forceReload = true;
		(mockedProps.dispatch as sinon.SinonSpy).resetHistory();
		c = shallow(<FoodProvidersContainer {...mockedProps} />);
		expect((mockedProps.dispatch as sinon.SinonSpy).calledOnceWith({ type: routines.get.TRIGGER })).toBe(true);
	});

	it("should map redux store state", () => {
		const state = configureStore().getState();
		const mapped = mapStateToProps(state);
		expect(mapped.foodProvidersState).toEqual(state.foodProviders);
		expect(mapped.forceReload).toBe(false);
	});
});