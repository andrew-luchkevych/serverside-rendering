import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
import { CreateFoodTypeApiProps, EditFoodTypeApiProps, RemoveFoodTypeApiProps } from "./api";
import { SubmissionControlProps } from "../../utils/formSubmission";
export interface CreateFoodTypeTriggerProps {
	data: CreateFoodTypeApiProps;
	controller: SubmissionControlProps;
}
export interface EditFoodTypeTriggerProps {
	data: EditFoodTypeApiProps;
	controller: SubmissionControlProps;
}
export interface RemoveFoodTypeTriggerProps {
	data: RemoveFoodTypeApiProps;
}
export const get: BasicRoutine<void> = createRoutine("FOOD_TYPE/GET");
export const create: BasicRoutine<CreateFoodTypeTriggerProps> = createRoutine("FOOD_TYPE/CREATE");
export const edit: BasicRoutine<EditFoodTypeTriggerProps> = createRoutine("FOOD_TYPE/EDIT");
export const remove: BasicRoutine<RemoveFoodTypeTriggerProps> = createRoutine("FOOD_TYPE/REMOVE");
export default {
	get,
	create,
	edit,
	remove,
};