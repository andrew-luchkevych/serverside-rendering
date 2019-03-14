import { Express } from "express";
import passport from "passport";
import populateWithPageRoutes from "./pages";
import populateWithApiRoutes from "./api";
const populateWithRoutes = (app: Express): void => {
	app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
	app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
		res.redirect(req.session.returnTo || "/");
	});
	populateWithPageRoutes(app);
	populateWithApiRoutes(app);
};

export default populateWithRoutes;