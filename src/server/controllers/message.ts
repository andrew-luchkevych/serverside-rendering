import { Response } from "express";
import { MessageModel } from "../models/Message";
import { RequestWithErm } from "../types/request/RequestWithErm";

export function apiRemove(req: RequestWithErm, res: Response, next) {
	const message = req.erm.document as MessageModel;
	console.log({ message });
}