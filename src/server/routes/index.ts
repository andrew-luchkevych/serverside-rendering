import { Express } from "express";
import HomeController from "../controllers/home";
const populateWithRoutes = (app: Express) => {
	app.get("/", HomeController.index);
};

export default populateWithRoutes;