import UserProps from "../User";
export interface OrderFoodProviderVoteProps {
	user: UserProps;
	orderId: string;
	foodProviderId: string;
}

export default OrderFoodProviderVoteProps;