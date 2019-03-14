import { Express } from "express";
import * as passportConfig from "../config/passport";
import * as UserController from "../controllers/user";
import * as ContactController from "../controllers/contact";
import HomeController from "../controllers/home";
import withReduxStore from "./middleware/store";
const populateWithPagesRoutes = (app: Express): void => {
	app.get("/", withReduxStore, HomeController.index);
	app.get("/login", withReduxStore, UserController.getLogin);
	app.get("/forgot", UserController.getForgot);
	app.get("/reset/:token", UserController.getReset);
	app.get("/signup", UserController.getSignup);
	app.get("/contact", withReduxStore, ContactController.getContact);
	app.get("/account", passportConfig.isAuthenticated, withReduxStore, UserController.getAccount);
};

export default populateWithPagesRoutes;