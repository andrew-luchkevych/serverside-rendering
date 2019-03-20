import { Response } from "express";
import { MappedError, Dictionary } from "express-validator/shared-typings";
import { AnyObject } from "../../../shared/types/Basic";
import { ApiErrorResponse, ApiSuccessResponse } from "../../../shared/types/api/responses";
export const error = (res: Response, errors: string | Array<MappedError> | Dictionary<MappedError> | Error, status: number = 400) => {
	const r: Partial<ApiErrorResponse> = {
		success: false,
	};
	const e: any = errors;
	if (typeof e === "string") {
		r.msg = e;
		return res.status(status).json(r);
	}
	if (typeof e === "object") {
		if (e.hasOwnProperty("message")) {
			r.msg = (e as any).message;
			return res.status(status).json(r);
		}
	}
	try {
		console.log({ e });
		r.msg = e[0].msg;
		r.errors = e;
	} catch (e) {
		r.msg = "Server Error!";
	}
	return res.status(status).json(r);
};
export const success = <DataProps extends Object>(
	res: Response,
	data: DataProps = ({} as DataProps),
	msg: string = "",
): DataProps & ApiSuccessResponse => {
	const r = {
		...data,
		success: true,
		msg,
	};
	res.json(r);
	return r;
};