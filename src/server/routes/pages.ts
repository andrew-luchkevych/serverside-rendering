import { Express } from "express";
import * as passportConfig from "../config/passport";
import * as UserController from "../controllers/user";
import * as ContactController from "../controllers/contact";
import * as FoodTypesContoroller from "../controllers/foodType";
import HomeController from "../controllers/home";
import withReduxStore from "./middleware/store";
import { ssrPage } from "../utils/ssr/response";
const populateWithPagesRoutes = (app: Express): void => {
	app.get("/", withReduxStore, HomeController.index);
	app.get("/signin", UserController.getLogin);
	app.get("/signup", UserController.getSignup);
	app.get("/forgot", UserController.getForgot);
	app.get("/reset/:token", UserController.getReset);
	app.get("/contact", withReduxStore, ContactController.getContact);
	app.get("/account", passportConfig.isAuthenticated, withReduxStore, UserController.getAccount);
	app.get("/food-types", passportConfig.isAuthenticated, withReduxStore, FoodTypesContoroller.getAll);
	app.get("/food-types/create", passportConfig.isAuthenticated, withReduxStore, FoodTypesContoroller.createPage);
	app.get("/food-types/:id", passportConfig.isAuthenticated, withReduxStore, FoodTypesContoroller.editPage);
	app.get("/404", withReduxStore, ssrPage);
};

export default populateWithPagesRoutes;