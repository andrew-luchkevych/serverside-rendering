import mongoose from "mongoose";
import { FoodTypeProps } from "../../shared/types/FoodType";
import generateGravatar from "../utils/gravatar";

export type gravatarFunction = () => string;

export type FoodTypeModel = mongoose.Document & FoodTypeProps & {
	gravatar: gravatarFunction;
};

const FoodTypeSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
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
const gravatar: gravatarFunction = function () {
	const food = this as FoodTypeModel;
	return generateGravatar(food.name);
};
FoodTypeSchema.methods.gravatar = gravatar;

const FoodType = mongoose.model("FoodType", FoodTypeSchema);
export default FoodType;
