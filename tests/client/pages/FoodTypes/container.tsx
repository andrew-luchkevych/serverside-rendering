import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import routines from "../../../../src/shared/redux/foodTypes/routines";
import { FoodTypesContainer, FoodTypesContainerProps, mapStateToProps } from "../../../../src/client/pages/FoodTypes/page/container";
import configureStore from "../../../../src/shared/redux/configureStore";
describe("/client/pages/FoodTypes/page/container", () => {
	let c: ShallowWrapper<FoodTypesContainerProps, {}, FoodTypesContainer>;
	const mockedProps: FoodTypesContainerProps = {
		foodTypes: {
			data: [],
			loaded: false,
			processing: false,
		},
		forceReload: false,
		dispatch: sinon.spy(),
	};
	it("should load foodTypes", () => {
		c = shallow(<FoodTypesContainer {...mockedProps} />);
		expect((mockedProps.dispatch as sinon.SinonSpy).calledOnceWith({ type: routines.get.TRIGGER })).toBe(true);
	});

	it("should load foodTypes when forceReload === true", () => {
		mockedProps.foodTypes.loaded = true;
		mockedProps.forceReload = true;
		(mockedProps.dispatch as sinon.SinonSpy).resetHistory();
		c = shallow(<FoodTypesContainer {...mockedProps} />);
		expect((mockedProps.dispatch as sinon.SinonSpy).calledOnceWith({ type: routines.get.TRIGGER })).toBe(true);
	});

	it("should map redux store state", () => {
		const state = configureStore().getState();
		const mapped = mapStateToProps(state);
		expect(mapped.foodTypes).toEqual(state.foodTypes);
		expect(mapped.forceReload).toBe(false);
	});
});