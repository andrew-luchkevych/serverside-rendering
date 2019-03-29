import FoodTypeProps from "./FoodType";
import DataTypes from "./dataTypes";

export interface FoodProviderProps {
	_id: string;
	name: string;
	picture: string;
	description: string;
	minOrderCost: number;
	foodTypes: Array<FoodTypeProps>;
}

export const dependencies: Array<DataTypes> = ["foodTypes"];
export default FoodProviderProps;