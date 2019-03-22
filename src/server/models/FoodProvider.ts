import mongoose from "mongoose";
import { FoodProviderProps } from "../../shared/types/FoodProvider";
import generateGravatar from "../utils/gravatar";
import transformMongooseErrors from "../utils/models/errors";
export type gravatarFunction = () => string;

export type FoodProviderModel = mongoose.Document & FoodProviderProps & {
	gravatar: gravatarFunction;
};
const FoodProviderSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		trim: true,
		required: [true, "Food Provider Name is required"],
		minlength: [2, "Food Provider Name is shorter than the minimum allowed length (2)"],
		maxlength: [30, "Food Provider Name is longer than the maximum allowed length (30)"],
		validate: {
			validator: function (v: string) {
				return !(/[^a-zA-Z ]/i.test(v));
			},
			message: "Only letters allowed for name",
		},
	},
	description: {
		type: String,
		maxlength: [100, "Food Provider Name is longer than the maximum allowed length (100)"],
	},
	minOrderCost: {
		type: Number,
		required: [true, "Minimum order cost is required"],
	},
	picture: String,
	foodTypes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "FoodType",
	}],
});
FoodProviderSchema.pre("save", function save(next) {
	const food = this as FoodProviderModel;
	if (!food.picture) {
		food.picture = food.gravatar();
	}
	next();
});
FoodProviderSchema.pre("findOneAndUpdate", function (next) {
	(this as any).options.runValidators = true;
	next();
});
FoodProviderSchema.post("save", transformMongooseErrors("Food Provider Name should be unique"));
FoodProviderSchema.post("findOneAndUpdate", transformMongooseErrors("Food Provider Name should be unique"));
const populate = (doc: FoodProviderModel, next: Function) => {
	doc.populate("foodTypes").execPopulate().then(() => next());
};
FoodProviderSchema.post("init", populate);
FoodProviderSchema.post("save", populate);
FoodProviderSchema.post("findOneAndUpdate", populate);

const gravatar: gravatarFunction = function () {
	const food = this as FoodProviderModel;
	return generateGravatar(food.name);
};
FoodProviderSchema.methods.gravatar = gravatar;
const FoodProvider = mongoose.model("FoodProvider", FoodProviderSchema);
export default FoodProvider;
