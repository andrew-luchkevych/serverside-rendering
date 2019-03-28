import axios from "axios";
import FoodProviderProps from "../../types/FoodProvider";
import { ApiSuccessResponse } from "../../types/api/responses";

export interface CreateFoodProviderApiProps {
	name: string;
	foodTypes: Array<string>;
}

export interface EditFoodProviderApiProps {
	_id: string;
	name: string;
	foodTypes: Array<string>;
}

export interface RemoveFoodProviderApiProps {
	_id: string;
}

export const get = async (): Promise<FoodProviderProps[]> => axios
	.get(`/api/v1/FoodProvider`)
	.then(response => response.data);

export const create = async (data: CreateFoodProviderApiProps): Promise<FoodProviderProps> => axios
	.post(`/api/v1/FoodProvider`, data)
	.then(response => response.data);

export const edit = async (data: EditFoodProviderApiProps): Promise<FoodProviderProps> => axios
	.patch(`/api/v1/FoodProvider/${data._id}`, data)
	.then(response => response.data);

export const remove = async (data: RemoveFoodProviderApiProps): Promise<ApiSuccessResponse> => axios
	.delete(`/api/v1/FoodProvider/${data._id}`)
	.then(response => response.data);
export default {
	get,
	create,
	edit,
	remove,
};