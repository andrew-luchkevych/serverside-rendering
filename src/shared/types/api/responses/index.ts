import { MappedError, Dictionary } from "express-validator/shared-typings";
export interface ApiResponse {
	success: boolean;
	msg: string;
}
export interface ApiErrorResponse extends ApiResponse {
	errors?: Array<MappedError> | Dictionary<MappedError>;
}
export interface ApiSuccessResponse extends ApiResponse {
}