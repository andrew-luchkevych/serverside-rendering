import OrderFoodProviderVoteProps from "../src/shared/types/Order/OrderFoodProviderVote";
import fakeUser from "./user";
import fakeOrder from "./fakeOrder";
import fakeFoodProvider from "./foodProvider";

export const fakeOrderVote: OrderFoodProviderVoteProps = {
	user: fakeUser,
	orderId: fakeOrder._id,
	foodProviderId: fakeFoodProvider._id,
};

export default fakeOrderVote;