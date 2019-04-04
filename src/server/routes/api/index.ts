import { Express, Router, Request, Response } from "express";
import restify from "express-restify-mongoose";
import FoodTypes from "../../models/FoodTypes";
import FoodProvider from "../../models/FoodProvider";
import Message from "../../models/Message";
import * as PassportConfig from "../../config/passport";
import * as ApiController from "../../controllers/api";
import * as UserController from "../../controllers/user";
import * as ContactController from "../../controllers/contact";
import * as OrderController from "../../controllers/order";
import * as OrderRollController from "../../controllers/orderRoll";
import * as OrderFoodProviderVote from "../../controllers/orderFoodProviderVote";
import * as MessagesController from "../../controllers/message";
import { error, success } from "../../utils/api";
import { RequestWithErm } from "../../types/request/RequestWithErm";
import FoodTypeProps from "../../../shared/types/FoodType";
import FoodProviderProps from "../../../shared/types/FoodProvider";
import socketService from "../../sockets/index";
import MessageProps from "../../../shared/types/Message";
import { RequestWithUser } from "../../types/request/RequestWithUser";
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
	app.get("/api/v1/Order", PassportConfig.isAuthenticated, OrderController.apiGet);
	app.get("/api/v1/OrderRoll", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderRollController.apiGet);
	app.post("/api/v1/OrderRoll", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderRollController.apiPost);
	app.delete("/api/v1/OrderRoll", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderRollController.apiDelete);
	app.get("/api/v1/OrderRoll/stats", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderRollController.apiGetStats);
	app.get("/api/v1/OrderFoodProviderVote", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderFoodProviderVote.apiGet);
	app.post("/api/v1/OrderFoodProviderVote", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderFoodProviderVote.apiPost);
	app.delete("/api/v1/OrderFoodProviderVote", PassportConfig.isAuthenticated, OrderController.withOrderMiddleware, OrderFoodProviderVote.apiDelete);
	restify.serve(router, FoodTypes, {
		runValidators: true,
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
		postUpdate: (req: RequestWithErm, res: Response) => {
			const item = req.erm.result.toObject();
			success<FoodTypeProps>(res, item, "Food Type updated successfully");
			socketService.dataItemMessage<FoodTypeProps>("edit", req.user._id, "foodTypes", item);
			socketService.updateDataType(req.user._id, "foodTypes");
		},
		postDelete: (req: RequestWithErm, res: Response) => {
			success<any>(res, {}, "Food Type removed successfully");
			socketService.dataItemMessage("remove", req.user._id, "foodTypes", { _id: req.params.id });
			socketService.updateDataType(req.user._id, "foodTypes");
		},
	});
	restify.serve(router, FoodProvider, {
		lean: false,
		runValidators: true,
		middleware: PassportConfig.isAuthenticated,
		onError: (err: any, _req: Request, res: Response) => {
			error(res, err);
		},
		postCreate: (req: RequestWithErm, res: Response) => {
			const item = req.erm.result.toObject();
			success<FoodProviderProps>(res, item, "Food Provider created successfully");
			socketService.dataItemMessage<FoodProviderProps>("create", req.user._id, "foodProviders", item);
			socketService.updateDataType(req.user._id, "foodProviders");
		},
		postUpdate: (req: RequestWithErm, res: Response) => {
			const item = req.erm.result.toObject();
			success<FoodProviderProps>(res, item, "Food Provider updated successfully");
			socketService.dataItemMessage<FoodProviderProps>("edit", req.user._id, "foodProviders", item);
			socketService.updateDataType(req.user._id, "foodProviders");
		},
		postDelete: (req: RequestWithErm, res: Response) => {
			success<any>(res, {}, "Food Provider removed successfully");
			socketService.dataItemMessage("remove", req.user._id, "foodProviders", { _id: req.params.id });
			socketService.updateDataType(req.user._id, "foodProviders");
		},
	});
	restify.serve(router, Message, {
		lean: false,
		runValidators: true,
		findOneAndRemove: false,
		middleware: PassportConfig.isAuthenticated,
		onError: (err: any, _req: Request, res: Response) => {
			error(res, err);
		},
		preCreate: (req: RequestWithUser, res: Response, next: Function) => {
			req.body.author = req.user._id;
			next();
		},
		preDelete: MessagesController.apiRemove,
		postCreate: (req: RequestWithErm, res: Response, _next: Function) => {
			const item = req.erm.result.toObject();
			success<MessageProps>(res, item);
			socketService.dataItemMessage<MessageProps>("create", req.user._id, "messages", item);
		},
		postUpdate: (req: RequestWithErm, res: Response, _next: Function) => {
			const item = req.erm.result.toObject();
			success<MessageProps>(res, item);
			socketService.dataItemMessage<MessageProps>("edit", req.user._id, "messages", item);
		},
	});
	app.use(router);
};

export default populateWithApiRoutes;