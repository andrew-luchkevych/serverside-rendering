import FoodProviderProps from "../src/shared/types/FoodProvider";
import fakeFoodType from "./foodType";

export const fakeFoodProvider: FoodProviderProps = {
	_id: "fake",
	picture: "https://fake.com",
	name: "fake name",
	description: "fake description",
	minOrderCost: 150,
	foodTypes: [fakeFoodType],
};

export default fakeFoodProvider;