import * as React from "react";
import { shallow } from "enzyme";
import fakeFoodProvider from "../../../../fakes/foodProvider";
import FormPage from "../../../../src/client/components/Layout/FormPage";
import CreatePage from "../../../../src/client/pages/FoodProviders/form/create";
import {
	EditFoodProviderPage,
	mapStateToProps as editPageStateMapper,
} from "../../../../src/client/pages/FoodProviders/form/edit";
import Form from "../../../../src/client/pages/FoodProviders/form/form";
import { ReduxStoreState } from "../../../../src/shared/types/store/RootReducer";
import configureStore from "../../../../src/shared/redux/configureStore";
describe("/client/client/pages/FoodProviders/form", () => {
	it("create page", () => {
		const c = shallow(<CreatePage />);
		expect(c.is(FormPage));
	});

	it("edit page", () => {
		let c = shallow(<EditFoodProviderPage />);
		expect(c.is(FormPage));
		c = shallow(<EditFoodProviderPage foodProvider={fakeFoodProvider} />);
		expect(c.is(FormPage));
	});

	it("should map props correctly", () => {
		const init: Partial<ReduxStoreState> = {
			foodProviders: {
				data: [fakeFoodProvider],
				loaded: true,
				processing: false,
			},
		};
		const state = configureStore(init).getState();
		const mapped = editPageStateMapper(state, { match: { params: { id: fakeFoodProvider._id } } } as any);
		expect(mapped.foodProvider).toBe(fakeFoodProvider);
	});
});