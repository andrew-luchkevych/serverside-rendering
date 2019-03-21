import { Express, Router, Request, Response } from "express";
import restify from "express-restify-mongoose";
import FoodTypes from "../../models/FoodTypes";
import FoodProvider from "../../models/FoodProvider";
import * as PassportConfig from "../../config/passport";
import * as ApiController from "../../controllers/api";
import * as UserController from "../../controllers/user";
import * as ContactController from "../../controllers/contact";
import { error, success } from "../../utils/api";
import { RequestWithErm } from "../../types/RequestWithErm";
import FoodTypeProps from "../../../shared/types/FoodType";
import FoodProviderProps from "../../../shared/types/FoodProvider";
const router = Router();
const populateWithApiRoutes = (app: Express): void => {
	app.get("/api", PassportConfig.isAuthenticated, ApiController.getApi);
	app.post("/api/signin", UserController.postLogin);
	app.put("/api/logout", UserController.logout);
	app.post("/api/forgot", UserController.postForgot);
	app.post("/api/reset/:token", UserController.postReset);
	app.post("/api/signup", UserController.postSignup);
	app.post("/api/contact", ContactController.postContact);
	app.post("/api/account/profile", PassportConfig.isAuthenticated, UserController.postUpdateProfile);
	app.post("/api/account/password", PassportConfig.isAuthenticated, UserController.postUpdatePassword);
	app.delete("/api/account", PassportConfig.isAuthenticated, UserController.postDeleteAccount);
	app.delete("/api/account/provider", PassportConfig.isAuthenticated, UserController.getOauthUnlink);
	restify.serve(router, FoodTypes, {
		middleware: PassportConfig.isAuthenticated,
		onError: (err: any, _req: Request, res: Response) => {
			error(res, err);
		},
		postCreate: (req: RequestWithErm, res: Response) => {
			success<FoodTypeProps>(res, { ...req.erm.result.toObject() }, "Food Type created successfully");
		},
		postDelete: (_req: RequestWithErm, res: Response) => {
			success<any>(res, {}, "Food Type removed successfully");
		},
	});
	restify.serve(router, FoodProvider, {
		middleware: PassportConfig.isAuthenticated,
		onError: (err: any, _req: Request, res: Response) => {
			error(res, err);
		},
		postCreate: (req: RequestWithErm, res: Response) => {
			success<FoodProviderProps>(res, { ...req.erm.result.toObject() }, "Food Provider created successfully");
		},
		postDelete: (_req: RequestWithErm, res: Response) => {
			success<any>(res, {}, "Food Provider removed successfully");
		},
	});
	app.use(router);
};

export default populateWithApiRoutes;