import mongoose from "mongoose";
import moment from "moment";
import { OrderProps } from "../../shared/types/Order/Order";
import { DEFAULT_DATE_FORMAT } from "../../shared/types/date";
import transformMongooseErrors from "../utils/models/errors";
export type OrderModel = mongoose.Document & OrderProps;
const OrderSchema = new mongoose.Schema({
	date: {
		type: String,
		default: moment().format(DEFAULT_DATE_FORMAT),
	},
});
OrderSchema.pre("findOneAndUpdate", function (next) {
	(this as any).options.runValidators = true;
	next();
});
OrderSchema.post("save", transformMongooseErrors());
OrderSchema.post("findOneAndUpdate", transformMongooseErrors());
const Order = mongoose.model("Order", OrderSchema);
export default Order;
