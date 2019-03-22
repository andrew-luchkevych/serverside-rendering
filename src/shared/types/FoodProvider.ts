import FoodTypeProps from "./FoodType";

export interface FoodProviderProps {
	_id: string;
	name: string;
	picture: string;
	description: string;
	minOrderCost: number;
	foodTypes: Array<FoodTypeProps>;
}

export default FoodProviderProps;