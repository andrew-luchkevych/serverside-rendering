import axios from "axios";

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

export const get = async () => axios
	.get(`/api/v1/FoodType`)
	.then(response => response.data);

export const create = async (data: CreateFoodTypeApiProps) => axios
	.post(`/api/v1/FoodType`, data)
	.then(response => response.data);

export const edit = async (data: EditFoodTypeApiProps) => axios
	.patch(`/api/v1/FoodType/${data._id}`, data)
	.then(response => response.data);

export const remove = async (data: RemoveFoodTypeApiProps) => axios
	.delete(`/api/v1/FoodType/${data._id}`)
	.then(response => response.data);
export default {
	get,
	create,
	edit,
	remove,
};