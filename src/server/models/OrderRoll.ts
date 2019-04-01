import mongoose from "mongoose";
import { OrderRollProps } from "../../shared/types/Order/OrderRoll";
export type OrderRollModel = mongoose.Document & OrderRollProps;
const OrderRollSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	orderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order",
	},
	roll: Number,
	active: {
		type: Boolean,
		default: true,
	},
});
OrderRollSchema.pre("findOneAndUpdate", function (next) {
	(this as any).options.runValidators = true;
	next();
});
OrderRollSchema.index({ userId: 1, orderId: 1 }, { unique: true });

const OrderRoll = mongoose.model("OrderRoll", OrderRollSchema);
export default OrderRoll;