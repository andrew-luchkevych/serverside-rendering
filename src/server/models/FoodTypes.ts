import mongoose from "mongoose";
import { FoodTypeProps } from "../../shared/types/FoodType";
import generateGravatar from "../utils/gravatar";
import transformMongooseErrors from "../utils/models/errors";

export type gravatarFunction = () => string;

export type FoodTypeModel = mongoose.Document & FoodTypeProps & {
	gravatar: gravatarFunction;
};
const FoodTypeSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		trim: true,
		required: [true, "Food Type Name is required"],
		minlength: [2, "Food Type Name is shorter than the minimum allowed length"],
		maxlength: [30, "Food Type Name is longer than the maximum allowed length"],
		validate: {
			validator: function (v: string) {
				return !(/[^a-zA-Z ]/i.test(v));
			},
			message: "Only letters allowed for name",
		},
	},
	picture: String,
});

FoodTypeSchema.pre("save", function save(next) {
	const food = this as FoodTypeModel;
	if (!food.picture) {
		food.picture = food.gravatar();
	}
	next();
});
FoodTypeSchema.pre("findOneAndUpdate", function (next) {
	(this as any).options.runValidators = true;
	next();
});
FoodTypeSchema.post("save", transformMongooseErrors("Food Type Name should be unique"));
FoodTypeSchema.post("findOneAndUpdate", transformMongooseErrors("Food Type Name should be unique"));

const gravatar: gravatarFunction = function () {
	const food = this as FoodTypeModel;
	return generateGravatar(food.name);
};
FoodTypeSchema.methods.gravatar = gravatar;

const FoodType = mongoose.model("FoodType", FoodTypeSchema);
export default FoodType;
