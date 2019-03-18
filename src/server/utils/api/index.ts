import { Response } from "express";
import { MappedError, Dictionary } from "express-validator/shared-typings";
import { AnyObject } from "../../../shared/types/Basic";
import { ApiErrorResponse, ApiSuccessResponse } from "../../../shared/types/api/response";
export const error = (res: Response, errors: string | Array<MappedError> | Dictionary<MappedError>, status: number = 400) => {
	const r: Partial<ApiErrorResponse> = {
		success: false,
	};
	if (typeof errors === "string") {
		r.msg = errors;
		return res.status(status).json(r);
	}
	r.msg = errors[0].msg;
	r.errors = errors;
	return res.status(status).json(r);
};

export const success = (res: Response, data: AnyObject = {}, msg: string = "") => {
	const r: ApiSuccessResponse = {
		success: true,
		msg,
		...data,
	};
	return res.json(r);
};