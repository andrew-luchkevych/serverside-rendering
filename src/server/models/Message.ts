import mongoose from "mongoose";
import MessageProps from "../../shared/types/Message";
import transformMongooseErrors from "../utils/models/errors";
export type gravatarFunction = () => string;

export type MessageModel = mongoose.Document & MessageProps;
const MessageSchema = new mongoose.Schema({
	text: {
		type: String,
		trim: true,
		required: [true, "Message text is required"],
		maxlength: [600, "Message is longer than the maximum allowed length (600)"],
	},
	author: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	}],
	deleted: {
		type: Boolean,
		default: false,
	},
}, { timestamps: true });
MessageSchema.pre("findOneAndUpdate", function (next) {
	(this as any).options.runValidators = true;
	next();
});
MessageSchema.post("save", transformMongooseErrors());
MessageSchema.post("findOneAndUpdate", transformMongooseErrors());
const populate = (doc: MessageModel, next: Function) => {
	doc.populate("foodTypes").execPopulate().then(() => next());
};
MessageSchema.post("init", populate);
MessageSchema.post("save", populate);
MessageSchema.post("findOneAndUpdate", populate);

const Message = mongoose.model("Message", MessageSchema);
export default Message;
