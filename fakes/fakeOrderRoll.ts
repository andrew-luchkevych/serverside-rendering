import OrderRollProps from "../src/shared/types/Order/OrderRoll";
import fakeUser from "./user";
import fakeOrder from "./fakeOrder";
export const fakeOrderRoll: OrderRollProps = {
	userId: fakeUser._id,
	orderId: fakeOrder._id,
	roll: 20,
	active: true,
}

export default fakeOrderRoll;