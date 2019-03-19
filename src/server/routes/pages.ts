import { Express } from "express";
import * as passportConfig from "../config/passport";
import * as UserController from "../controllers/user";
import * as ContactController from "../controllers/contact";
import * as FoodTypesContoroller from "../controllers/foodType";
import HomeController from "../controllers/home";
import withReduxStore from "./middleware/store";
const populateWithPagesRoutes = (app: Express): void => {
	app.get("/", withReduxStore, HomeController.index);
	app.get("/signin", UserController.getLogin);
	app.get("/signup", UserController.getSignup);
	app.get("/forgot", UserController.getForgot);
	app.get("/reset/:token", UserController.getReset);
	app.get("/contact", withReduxStore, ContactController.getContact);
	app.get("/account", passportConfig.isAuthenticated, withReduxStore, UserController.getAccount);
	app.get("/food-types", passportConfig.isAuthenticated, withReduxStore, FoodTypesContoroller.getAll);
};

export default populateWithPagesRoutes;