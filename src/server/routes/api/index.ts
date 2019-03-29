import { Express, Router, Request, Response } from "express";
import restify from "express-restify-mongoose";
import FoodTypes from "../../models/FoodTypes";
import FoodProvider from "../../models/FoodProvider";
import * as PassportConfig from "../../config/passport";
import * as ApiController from "../../controllers/api";
import * as UserController from "../../controllers/user";
import * as ContactController from "../../controllers/contact";
import * as OrderController from "../../controllers/order";
import * as OrderRollController from "../../controllers/orderRoll";
import * as OrderFoodProviderVote from "../../controllers/orderFoodProviderVote";
import { error, success } from "../../utils/api";
import { RequestWithErm } from "../../types/request/RequestWithErm";
import FoodTypeProps from "../../../shared/types/FoodType";
import FoodProviderProps from "../../../shared/types/FoodProvider";
import socketService from "../../sockets/index";
import SocketMessageTypes from "../../../shared/types/sockets/MessageTypes";
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
	app.get("/api/v1/order", PassportConfig.isAuthenticated, OrderController.apiGet);
	app.get("/api/v1/orderRoll", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderRollController.apiGet);
	app.post("/api/v1/orderRoll", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderRollController.apiPost);
	app.delete("/api/v1/orderRoll", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderRollController.apiDelete);
	app.get("/api/v1/orderRoll/stats", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderRollController.apiGetStats);
	app.get("/api/v1/orderFoodProviderVote", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderFoodProviderVote.apiGet);
	app.post("/api/v1/orderFoodProviderVote", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderFoodProviderVote.apiPost);
	app.delete("/api/v1/orderFoodProviderVote", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderFoodProviderVote.apiDelete);
	restify.serve(router, FoodTypes, {
		middleware: PassportConfig.isAuthenticated,
		onError: (err: any, _req: Request, res: Response) => {
			error(res, err);
		},
		postCreate: (req: RequestWithErm, res: Response) => {
			const item = req.erm.result.toObject();
			success<FoodTypeProps>(res, item, "Food Type created successfully");
			socketService.dataItemMessage<FoodTypeProps>("create", req.user._id, "foodTypes", item);
			socketService.updateDataType(req.user._id, "foodTypes");
		},
		postDelete: (_req: RequestWithErm, res: Response) => {
			success<any>(res, {}, "Food Type removed successfully");
		},
	});
	restify.serve(router, FoodProvider, {
		lean: false,
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