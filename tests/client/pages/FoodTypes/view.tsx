import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Loader from "../../../../src/client/components/Loader";
import fakeFoodType from "../../../../fakes/foodType";
import { FoodTypesView, FoodTypesViewProps } from "../../../../src/client/pages/FoodTypes/page/view";
import FoodTypeListItem from "../../../../src/client/pages/FoodTypes/page/listItem";
describe("/client/pages/FoodTypes/page/container", () => {
	let c: ShallowWrapper<FoodTypesViewProps, {}, FoodTypesView>;
	let mockedProps: FoodTypesViewProps = {
		loaded: false,
		loading: false,
		items: [],
	};
	it("should show no providers message", () => {
		c = shallow(<FoodTypesView {...mockedProps} />);
		expect(c.is(Typography)).toBe(true);
	});
	it("should show loader", () => {
		mockedProps.loading = true;
		c = shallow(<FoodTypesView {...mockedProps} />);
		expect(c.is(Loader)).toBe(true);
	});
	it("should map items correctly", () => {
		const item = c.instance().mapper(fakeFoodType);
		expect(item.type.displayName).toBe(FoodTypeListItem.displayName);
	});
	it("should render list", () => {
		mockedProps.loaded = true;
		mockedProps.loading = false;
		mockedProps.items = [fakeFoodType];
		c = shallow(<FoodTypesView {...mockedProps} />);
		expect(c.is(List)).toBe(true);
	});
	it("should render list with loader", () => {
		mockedProps.loaded = true;
		mockedProps.loading = true;
		mockedProps.items = [fakeFoodType];
		c = shallow(<FoodTypesView {...mockedProps} />);
		expect(c.is(List)).toBe(true);
		expect(c.find(Loader).length).toBe(1);
	});
});