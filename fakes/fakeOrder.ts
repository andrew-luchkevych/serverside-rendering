import OrderProps from "../src/shared/types/Order/Order";
import moment from "moment";
import DEFAULT_DATE_FORMAT from "../src/shared/types/date";
export const fakeOrder: OrderProps = {
	_id: "fake",
	date: moment().format(DEFAULT_DATE_FORMAT),
};

export default fakeOrder;