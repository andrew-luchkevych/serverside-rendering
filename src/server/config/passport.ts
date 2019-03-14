import _ from "lodash";
import dotenv from "dotenv";
import passport from "passport";
import passportLocal from "passport-local";
import passportFacebook from "passport-facebook";
import passportJWT from "passport-jwt";
import { default as User, UserModel } from "../models/User";
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const FacebookStrategy = passportFacebook.Strategy;

dotenv.config({
	path: ".env.server." + (process.env.NODE_ENV === "production" ? "production" : "development"),
});

passport.serializeUser<any, any>((user, done) => {
	console.log({ user });
	done(undefined, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err: any, user: any) => {
		done(err, user);
	});
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
	User.findOne({ email: email.toLowerCase() }, (err, user?: UserModel) => {
		if (err) { return done(err); }
		if (!user) {
			return done(undefined, false, { message: `Email ${email} not found.` });
		}
		user.comparePassword(password, (err: Error, isMatch: boolean) => {
			if (err) { return done(err); }
			if (isMatch) {
				return done(undefined, user);
			}
			return done(undefined, false, { message: "Invalid email or password." });
		});
	});
}));

/**
 * Sign in with JWT
 */

passport.use(new JWTStrategy({
	jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
}, (payload, done) => {
	const { email } = payload;
	User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
		if (err) { return done(err); }
		if (!user) {
			return done(undefined, false, { message: `Email ${email} not found.` });
		}
		return done(undefined, user);
	});
}));

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
	clientID: process.env.FACEBOOK_ID,
	clientSecret: process.env.FACEBOOK_SECRET,
	callbackURL: "/auth/facebook/callback",
	profileFields: ["name", "email", "link", "locale", "timezone"],
	passReqToCallback: true,
}, (req: any, accessToken, refreshToken, profile, done) => {
	if (req.user) {
		User.findOne({ facebook: profile.id }, (err: any, existingUser: any) => {
			if (err) { return done(err); }
			if (existingUser) {
				req.flash("errors", {
					msg: "There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.",
				});
				done(err);
			} else {
				User.findById(req.user.id, (err: any, user: any) => {
					if (err) { return done(err); }
					user.facebook = profile.id;
					user.tokens.push({ kind: "facebook", accessToken });
					user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
					user.profile.gender = user.profile.gender || profile._json.gender;
					user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
					user.save((err: Error) => {
						req.flash("info", { msg: "Facebook account has been linked." });
						done(err, user);
					});
				});
			}
		});
	} else {
		User.findOne({ facebook: profile.id }, (err: any, existingUser: any) => {
			if (err) { return done(err); }
			if (existingUser) {
				return done(undefined, existingUser);
			}
			User.findOne({ email: profile._json.email }, (err: any, existingEmailUser: any) => {
				if (err) { return done(err); }
				if (existingEmailUser) {
					req.flash("errors", {
						msg: "There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.",
					});
					done(err);
				} else {
					const user: any = new User();
					user.email = profile._json.email;
					user.facebook = profile.id;
					user.tokens.push({ kind: "facebook", accessToken });
					user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
					user.profile.gender = profile._json.gender;
					user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
					user.profile.location = (profile._json.location) ? profile._json.location.name : "";
					user.save((err: Error) => {
						done(err, user);
					});
				}
			});
		});
	}
}));

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) {
		if (req.path === "/login" && req.method === "GET") {
			res.redirect("/");
		} else {
			return next();
		}
	}
	res.redirect("/login");
};

/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
	const provider = req.path.split("/").slice(-1)[0];

	if (_.find(req.user.tokens, { kind: provider })) {
		next();
	} else {
		res.redirect(`/auth/${provider}`);
	}
};