import axios from "axios";
import FoodTypeProps from "../../types/FoodType";
import { ApiSuccessResponse } from "../../types/api/responses";

export interface CreateFoodTypeApiProps {
	name: string;
}

export interface EditFoodTypeApiProps {
	_id: string;
	name: string;
}

export interface RemoveFoodTypeApiProps {
	_id: string;
}

export const get = async (): Promise<FoodTypeProps[]> => axios
	.get(`/api/v1/FoodType`)
	.then(response => response.data);

export const create = async (data: CreateFoodTypeApiProps): Promise<FoodTypeProps> => axios
	.post(`/api/v1/FoodType`, data)
	.then(response => response.data);

export const edit = async (data: EditFoodTypeApiProps): Promise<FoodTypeProps> => axios
	.patch(`/api/v1/FoodType/${data._id}`, data)
	.then(response => response.data);

export const remove = async (data: RemoveFoodTypeApiProps): Promise<ApiSuccessResponse> => axios
	.delete(`/api/v1/FoodType/${data._id}`)
	.then(response => response.data);
export default {
	get,
	create,
	edit,
	remove,
};