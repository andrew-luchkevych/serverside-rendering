import OrderRollStatsProps from "../src/shared/types/Order/OrderRollStats";
import fakeOrder from "./fakeOrder";
export const fakeOrderRollStats: OrderRollStatsProps = {
	orderId: fakeOrder._id,
	participants: 10,
	max: 50,
	min: 10,
};

export default fakeOrderRollStats;