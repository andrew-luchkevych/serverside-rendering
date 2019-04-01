import UserProps from "../User";
import DataTypes from "../dataTypes";
export interface OrderFoodProviderVoteProps {
	user: UserProps;
	orderId: string;
	foodProviderId: string;
}

export const dependencies: Array<DataTypes> = ["user", "orderRoll"];
export default OrderFoodProviderVoteProps;