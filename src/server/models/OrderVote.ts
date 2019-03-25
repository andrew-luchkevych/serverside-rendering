import mongoose from "mongoose";
import { OrderVoteProps } from "../../shared/types/Order/OrderVote";
export type OrderVoteModel = mongoose.Document & OrderVoteProps;
const OrderVoteSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	orderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order",
	},
	foodProviderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FoodProvider",
	},
});
OrderVoteSchema.pre("findOneAndUpdate", function (next) {
	(this as any).options.runValidators = true;
	next();
});
OrderVoteSchema.index({ userId: 1, orderId: 1, foodProviderId: 1 }, { unique: true });

const OrderVote = mongoose.model("OrderVote", OrderVoteSchema);
export default OrderVote;