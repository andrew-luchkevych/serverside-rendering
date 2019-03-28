import { Express } from "express";
import * as passportConfig from "../config/passport";
import * as UserController from "../controllers/user";
import * as ContactController from "../controllers/contact";
import * as FoodTypesContoroller from "../controllers/foodType";
import * as FoodProviderContoroller from "../controllers/foodProvider";
import * as OrderController from "../controllers/order";
import * as OrderRollController from "../controllers/orderRoll";
import * as OrderFoodProviderVoteController from "../controllers/orderFoodProviderVote";
import HomeController from "../controllers/home";
import withReduxStore from "./middleware/store";
import { ssrPage } from "../utils/ssr/response";
const populateWithPagesRoutes = (app: Express): void => {
	app.get(
		"/",
		withReduxStore,
		FoodProviderContoroller.withFoodProvidersMiddleware,
		OrderController.withOrderMiddleware,
		OrderRollController.withOrderRollMiddleware,
		OrderRollController.withOrderRollStatsMiddleware,
		OrderFoodProviderVoteController.withOrderFoodProviderVotesMiddleware,
		HomeController.index,
	);
	app.get("/signin", UserController.getLogin);
	app.get("/signup", UserController.getSignup);
	app.get("/forgot", UserController.getForgot);
	app.get("/reset/:token", UserController.getReset);
	app.get("/contact", withReduxStore, ContactController.getContact);
	app.get("/account", passportConfig.isAuthenticated, withReduxStore, UserController.getAccount);
	app.get("/food-types", passportConfig.isAuthenticated, withReduxStore, FoodTypesContoroller.getAll);
	app.get("/food-types/create", passportConfig.isAuthenticated, withReduxStore, FoodTypesContoroller.createPage);
	app.get("/food-types/:id", passportConfig.isAuthenticated, withReduxStore, FoodTypesContoroller.editPage);
	app.get("/food-providers", passportConfig.isAuthenticated, withReduxStore, FoodProviderContoroller.getAll);
	app.get("/food-providers/create", passportConfig.isAuthenticated, withReduxStore, FoodProviderContoroller.createPage);
	app.get("/food-providers/:id", passportConfig.isAuthenticated, withReduxStore, FoodProviderContoroller.editPage);
	app.get("/404", withReduxStore, ssrPage);
};

export default populateWithPagesRoutes;