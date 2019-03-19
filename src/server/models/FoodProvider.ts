import mongoose from "mongoose";
import FoodProviderProps from "../../shared/types/FoodProvider";

export type FoodProviderModel = mongoose.Document & FoodProviderProps & {
	gravatar: () => string;
};

const FoodProviderSchema = new mongoose.Schema({

});