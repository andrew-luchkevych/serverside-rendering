import { Request } from "express";
import { UserModel } from "../models/User";

export interface RequestWithUser extends Request {
	user?: UserModel;
}