import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
import { CreateFoodProviderApiProps, EditFoodProviderApiProps, RemoveFoodProviderApiProps } from "./api";
import { SubmissionControlProps } from "../../utils/formSubmission";
import { ReduxActionPayload } from "../../types/store/action";
import FoodProviderProps from "../../types/FoodProvider";

export interface CreateFoodProviderTriggerProps {
	data: CreateFoodProviderApiProps;
	controller: SubmissionControlProps;
}
export interface EditFoodProviderTriggerProps {
	data: EditFoodProviderApiProps;
	controller: SubmissionControlProps;
}
export interface RemoveFoodProviderTriggerProps {
	data: RemoveFoodProviderApiProps;
}

export const get: BasicRoutine<void, void, FoodProviderProps[]> = createRoutine("FOOD_PROVIDER/GET");

export const create: BasicRoutine<
	CreateFoodProviderTriggerProps,
	void,
	FoodProviderProps
> = createRoutine("FOOD_PROVIDER/CREATE");

export const edit: BasicRoutine<
	EditFoodProviderTriggerProps,
	void,
	FoodProviderProps
> = createRoutine("FOOD_PROVIDER/EDIT");
export const remove: BasicRoutine<RemoveFoodProviderTriggerProps, { _id: string }> = createRoutine("FOOD_PROVIDER/REMOVE");
export default {
	get,
	create,
	edit,
	remove,
};