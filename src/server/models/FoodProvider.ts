import mongoose from "mongoose";
import { FoodProviderProps } from "../../shared/types/FoodProvider";
import generateGravatar from "../utils/gravatar";
import transformMongooseErrors from "../utils/models/errors";
import autopopulate from "mongoose-autopopulate";
export type gravatarFunction = () => string;

export type FoodProviderModel = mongoose.Document & FoodProviderProps & {
	gravatar: gravatarFunction;
};
const FoodProviderSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: [true, "Food Provider Name is required"],
		minlength: [2, "Food Provider Name is shorter than the minimum allowed length (2)"],
		maxlength: [30, "Food Provider Name is longer than the maximum allowed length (30)"],
		validate: {
			validator: function (v: string) {
				return !(/[^a-zA-Z]/i.test(v));
			},
			message: "Only letters allowed for name",
		},
	},
	description: {
		type: String,
		maxlength: [100, "Food Provider Name is longer than the maximum allowed length (100)"],
	},
	picture: String,
	foodTypes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "FoodType",
		autopopulate: true,
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

const gravatar: gravatarFunction = function () {
	const food = this as FoodProviderModel;
	return generateGravatar(food.name);
};
FoodProviderSchema.methods.gravatar = gravatar;
FoodProviderSchema.plugin(autopopulate);
const FoodProvider = mongoose.model("FoodProvider", FoodProviderSchema);
export default FoodProvider;
