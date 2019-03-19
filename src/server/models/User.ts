import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import UserProps from "../../shared/types/User";
import { AuthToken } from "../types/Auth";
import generateGravatar from "../utils/gravatar";
export { AuthToken } from "../types/Auth";
export type UserModel = mongoose.Document & UserProps & {
	password: string;
	passwordResetToken: string;
	passwordResetExpires: Date;
	facebook: string;
	tokens: Array<AuthToken>;
	comparePassword: comparePasswordFunction,
	toAuthJSON: toAuthJSONFunction;
	generateJWT: generateJWTFunction;
	getData: getUserDataFunction;
	gravatar: gravatarFunction;
};
type gravatarFunction = (size?: number) => string;
type generateJWTFunction = () => string;
type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => any) => void;
type toAuthJSONFunction = () => { user: UserProps, token: string };
type getUserDataFunction = () => UserProps;
const UserSchema = new mongoose.Schema({
	email: { type: String, unique: true },
	password: String,
	passwordResetToken: String,
	passwordResetExpires: Date,

	facebook: String,
	google: String,
	tokens: Array,

	profile: {
		name: String,
		picture: String,
	},
}, { timestamps: true });

UserSchema.pre("save", function save(next) {
	const user = this as UserModel;
	if (!user.isModified("password")) { return next(); }
	bcrypt.genSalt(10, (err, salt) => {
		if (err) { return next(err); }
		bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
			if (err) { return next(err); }
			user.password = hash;
			next();
		});
	});
});

UserSchema.pre("save", function (next) {
	const user = this as UserModel;
	if (!user.profile.picture) {
		user.profile.picture = user.gravatar();
	}
	next();
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb): any {
	bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
		cb(err, isMatch);
	});
};

const generateJWT: generateJWTFunction = function () {
	const user = this as UserModel;
	console.log("jwt_secret", process.env.JWT_SECRET);
	return jwt.sign({
		email: user.email,
	}, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const toAuthJSON: toAuthJSONFunction = function () {
	const user = this as UserModel;
	return {
		user: user.getData(),
		token: user.generateJWT(),
	};
};

const getData: getUserDataFunction = function () {
	const user = this as UserModel;
	return {
		email: user.email,
		profile: user.profile,
	};
};
const gravatar: gravatarFunction = function (size: number = 200) {
	const user = this as UserModel;
	if (!user.email) {
		return `https://gravatar.com/avatar/?s=${size}&d=retro`;
	}
	if (user.profile.picture) {
		return user.profile.picture;
	}
	return generateGravatar(user.email);
};

UserSchema.methods.generateJWT = generateJWT;
UserSchema.methods.comparePassword = comparePassword;
UserSchema.methods.toAuthJSON = toAuthJSON;
UserSchema.methods.getData = getData;
UserSchema.methods.gravatar = gravatar;

// export const User: UserType = mongoose.model<UserType>('User', UserSchema);
const User = mongoose.model("User", UserSchema);
export default User;