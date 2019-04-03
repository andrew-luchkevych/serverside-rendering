import { Response } from "express";
import { MessageModel } from "../models/Message";
import { RequestWithErm } from "../types/request/RequestWithErm";
import socketService from "../sockets/index";
import { RequestWithUser } from "../types/request/RequestWithUser";
import { success } from "../utils/api/index";

export function apiRemove(req: RequestWithUser & RequestWithErm, res: Response, next) {
	const message = req.erm.document as MessageModel;
	message.deleted = true;
	message.save().then((m) => {
		const item = m.toObject();
		success(res, item);
		socketService.dataItemMessage("remove", req.user._id, "messages", item);
	});
}