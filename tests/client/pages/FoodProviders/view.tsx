import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Loader from "../../../../src/client/components/Loader";
import fakeFoodProvider from "../../../../fakes/foodProvider";
import { FoodProvidersView, FoodProvidersViewProps } from "../../../../src/client/pages/FoodProviders/page/view";
import FoodProviderListItem from "../../../../src/client/pages/FoodProviders/page/listItem";
describe("/client/pages/FoodProviders/page/view", () => {
	let c: ShallowWrapper<FoodProvidersViewProps, {}, FoodProvidersView>;
	let mockedProps: FoodProvidersViewProps = {
		loaded: false,
		loading: false,
		items: [],
	};
	it("should show no providers message", () => {
		c = shallow(<FoodProvidersView {...mockedProps} />);
		expect(c.is(Typography)).toBe(true);
	});
	it("should show loader", () => {
		mockedProps.loading = true;
		c = shallow(<FoodProvidersView {...mockedProps} />);
		expect(c.is(Loader)).toBe(true);
	});
	it("should map items correctly", () => {
		const item = c.instance().mapper(fakeFoodProvider);
		expect(item.type.displayName).toBe(FoodProviderListItem.displayName);
	});
	it("should render list", () => {
		mockedProps.loaded = true;
		mockedProps.loading = false;
		mockedProps.items = [fakeFoodProvider];
		c = shallow(<FoodProvidersView {...mockedProps} />);
		expect(c.is(List)).toBe(true);
	});
	it("should render list with loader", () => {
		mockedProps.loaded = true;
		mockedProps.loading = true;
		mockedProps.items = [fakeFoodProvider];
		c = shallow(<FoodProvidersView {...mockedProps} />);
		expect(c.is(List)).toBe(true);
		expect(c.find(Loader).length).toBe(1);
	});
});