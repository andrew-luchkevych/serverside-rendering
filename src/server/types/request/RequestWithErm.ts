import { Request } from "express";
import { Document } from "mongoose";
export interface RequestWithErm extends Request {
	erm: {
		result: Document;
	};
}